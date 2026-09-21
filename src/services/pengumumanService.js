import { strapiFetch } from "../api/strapiClient.js";
import { buildListQuery, buildDetailByFieldQuery } from "../api/strapiQuery.js";
import {
  STRAPI_ENDPOINTS,
  STRAPI_POPULATE,
  STRAPI_DEFAULTS,
  STRAPI_SORT,
} from "../config/strapi.js";
import {
  normalizePengumuman,
  normalizeLocalPengumuman,
} from "../utils/pengumumanFormatters.js";
import { generateSlug } from "../utils/slugHelper.js";
import localBeritaData from "../data/berita.json" with { type: "json" };

/**
 * =========================================================
 * KONFIGURASI MIGRASI HYBRID
 * =========================================================
 * Set ke 'true' selama masa transisi migrasi (Strapi + Local JSON).
 * Set ke 'false' jika seluruh data pengumuman sudah 100% dipindahkan ke Strapi CMS.
 */
export const ENABLE_LOCAL_FALLBACK = true;

/**
 * Peta bulan bahasa Indonesia untuk konversi tanggal teks lokal ke Date object
 */
const BULAN_INDO = {
  januari: 0,
  februari: 1,
  maret: 2,
  april: 3,
  mei: 4,
  juni: 5,
  juli: 6,
  agustus: 7,
  september: 8,
  oktober: 9,
  november: 10,
  desember: 11,
};

/**
 * Helper untuk mengubah string tanggal (ISO atau format teks "24 Agustus 2026")
 * menjadi timestamp milidetik agar pengurutan (sorting) akurat.
 * @param {string} dateStr
 * @returns {number} Timestamp milidetik
 */
function parseDateToTimestamp(dateStr) {
  if (!dateStr) return 0;

  // 1. Coba parse format ISO standar (2026-08-24 / 2026-08-24T...)
  const isoTime = Date.parse(dateStr);
  if (!isNaN(isoTime)) return isoTime;

  // 2. Parse format teks Indonesia ("24 Agustus 2026")
  try {
    const parts = dateStr.trim().toLowerCase().split(/\s+/);
    if (parts.length >= 3) {
      const day = parseInt(parts[0], 10);
      const monthName = parts[1];
      const year = parseInt(parts[2], 10);
      if (!isNaN(day) && !isNaN(year) && BULAN_INDO[monthName] !== undefined) {
        return new Date(year, BULAN_INDO[monthName], day).getTime();
      }
    }
  } catch (_) {}

  return 0;
}

/**
 * Normalisasi judul untuk perbandingan yang robust:
 * - Huruf kecil
 * - Ubah semua tanda baca/simbol menjadi spasi
 * - Satukan spasi berlebih
 */
export function normalizeTitleKey(title = "") {
  return String(title || "")
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Mengambil daftar pengumuman gabungan (Hybrid: Strapi CMS + Local JSON)
 * dengan aturan deduplikasi cerdas (prioritas versi Strapi).
 *
 * @param {object} [options={}]
 * @param {string} [options.locale="id"] - Bahasa aktif ("id" atau "en")
 * @returns {Promise<Array>} Daftar pengumuman terpadu dan terurut
 */
export async function getHybridPengumumanList({ locale = "id" } = {}) {
  let strapiItems = [];
  const activeLocale = locale || STRAPI_DEFAULTS.LOCALE;

  // 1. Ambil data dari Strapi CMS (Prioritas Utama)
  try {
    const query = buildListQuery({
      populate: STRAPI_POPULATE.PENGUMUMAN,
      sort: STRAPI_SORT.PENGUMUMAN_DEFAULT,
      locale: activeLocale,
    });

    const res = await strapiFetch(`${STRAPI_ENDPOINTS.PENGUMUMAN}?${query}`);
    let rawList = Array.isArray(res?.data) ? res.data : [];

    // Fallback locale: jika locale aktif ("en") belum ada di Strapi, ambil dari "id"
    if (rawList.length === 0 && activeLocale !== STRAPI_DEFAULTS.LOCALE) {
      try {
        const fallbackQuery = buildListQuery({
          populate: STRAPI_POPULATE.PENGUMUMAN,
          sort: STRAPI_SORT.PENGUMUMAN_DEFAULT,
          locale: STRAPI_DEFAULTS.LOCALE,
        });
        const fbRes = await strapiFetch(
          `${STRAPI_ENDPOINTS.PENGUMUMAN}?${fallbackQuery}`
        );
        rawList = Array.isArray(fbRes?.data) ? fbRes.data : [];
      } catch (_) {}
    }

    strapiItems = rawList.map(normalizePengumuman);
  } catch (err) {
    console.warn(
      "[pengumumanService] Strapi CMS tidak dapat diakses, beralih ke data lokal:",
      err.message
    );
  }

  // 2. Jika Local Fallback tidak aktif, langsung kembalikan data Strapi
  if (!ENABLE_LOCAL_FALLBACK) {
    return strapiItems;
  }

  // 3. Ambil data pengumuman dari file lokal (berita.json) sesuai bahasa aktif
  const localRaw = (localBeritaData || []).filter((item) => {
    if (item.tags !== "Pengumuman") return false;
    const itemLocale = item.locale || "id";
    return itemLocale === activeLocale;
  });
  const localItems = localRaw.map(normalizeLocalPengumuman);

  // 4. Deduplikasi cerdas (Prioritas Utama: TITLE / SLUG / ID MATCHING)
  // Strapi menang jika judul, slug, atau ID sama dengan data lokal
  const strapiTitles = new Set(
    strapiItems
      .map((item) => normalizeTitleKey(item.title))
      .filter(Boolean)
  );
  const strapiSlugs = new Set(
    strapiItems
      .map((item) => (item.slug || "").toLowerCase().trim())
      .filter(Boolean)
  );
  const strapiIds = new Set(
    strapiItems
      .map((item) => String(item.id || ""))
      .filter(Boolean)
  );

  // Saring data lokal: buang yang sudah ada di Strapi (berdasarkan title utama, slug, atau ID)
  // Sekaligus sinkronkan status isPinned dari data lokal ke Strapi jika di Strapi belum diatur (default false/null)
  localItems.forEach((local) => {
    if (Boolean(local.isPinned || local.pinned)) {
      const titleKey = normalizeTitleKey(local.title);
      const slugKey = (local.slug || "").toLowerCase().trim();
      const idKey = String(local.id || "");
      const match = strapiItems.find((s) => {
        const sTitle = normalizeTitleKey(s.title);
        const sSlug = (s.slug || "").toLowerCase().trim();
        const sId = String(s.id || "");
        return (
          (titleKey && sTitle === titleKey) ||
          (slugKey && sSlug === slugKey) ||
          (idKey && sId === idKey)
        );
      });
      if (match && !Boolean(match.isPinned || match.pinned)) {
        match.isPinned = true;
        match.pinned = true;
      }
    }
  });

  const filteredLocalItems = localItems.filter((local) => {
    const titleKey = normalizeTitleKey(local.title);
    const slugKey = (local.slug || "").toLowerCase().trim();
    const idKey = String(local.id || "");

    const isDuplicateTitle = Boolean(titleKey && strapiTitles.has(titleKey));
    const isDuplicateSlug = Boolean(slugKey && strapiSlugs.has(slugKey));
    const isDuplicateId = Boolean(idKey && strapiIds.has(idKey));

    return !isDuplicateTitle && !isDuplicateSlug && !isDuplicateId;
  });

  // 5. Gabungkan data Strapi (terdepan) + data lokal yang tersisa
  const combined = [...strapiItems, ...filteredLocalItems];

  // 6. Urutkan: Pinned lebih dulu, lalu Tanggal Terbaru
  combined.sort((a, b) => {
    // Pinned selalu paling atas
    const aPin = Boolean(a.isPinned || a.pinned);
    const bPin = Boolean(b.isPinned || b.pinned);
    if (aPin && !bPin) return -1;
    if (!aPin && bPin) return 1;

    // Tanggal terbaru lebih dulu
    const timeA = parseDateToTimestamp(a.tanggal);
    const timeB = parseDateToTimestamp(b.tanggal);
    return timeB - timeA;
  });

  return combined;
}

/**
 * Mengambil satu detail pengumuman berdasarkan slug (Hybrid)
 * Mencari di Strapi terlebih dahulu; jika tidak ditemukan / Strapi offline,
 * mencari di berkas lokal berita.json.
 *
 * @param {string} slugParam - Slug atau documentId atau ID pengumuman
 * @param {object} [options={}]
 * @param {string} [options.locale="id"] - Kode bahasa aktif
 * @returns {Promise<object|null>} Objek pengumuman ternormalisasi atau null jika tidak ditemukan
 */
export async function getHybridPengumumanBySlug(
  slugParam,
  { locale = "id" } = {}
) {
  if (!slugParam) return null;

  const rawParam = decodeURIComponent(slugParam).trim();
  const activeLocale = locale || STRAPI_DEFAULTS.LOCALE;

  // 1. Cari di Strapi CMS (Prioritas Utama)
  try {
    let foundStrapi = null;

    // A. Cari via slug + active locale
    try {
      const q = buildDetailByFieldQuery({
        field: "slug",
        value: rawParam,
        populate: STRAPI_POPULATE.PENGUMUMAN,
        locale: activeLocale,
      });
      const res = await strapiFetch(`${STRAPI_ENDPOINTS.PENGUMUMAN}?${q}`);
      if (Array.isArray(res?.data) && res.data.length > 0) {
        foundStrapi = res.data[0];
      }
    } catch (_) {}

    // B. Fallback: documentId + active locale
    if (!foundStrapi) {
      try {
        const q = buildDetailByFieldQuery({
          field: "documentId",
          value: rawParam,
          populate: STRAPI_POPULATE.PENGUMUMAN,
          locale: activeLocale,
        });
        const res = await strapiFetch(`${STRAPI_ENDPOINTS.PENGUMUMAN}?${q}`);
        if (Array.isArray(res?.data) && res.data.length > 0) {
          foundStrapi = res.data[0];
        }
      } catch (_) {}
    }

    // C. Fallback: slug + locale "id"
    if (!foundStrapi && activeLocale !== STRAPI_DEFAULTS.LOCALE) {
      try {
        const q = buildDetailByFieldQuery({
          field: "slug",
          value: rawParam,
          populate: STRAPI_POPULATE.PENGUMUMAN,
          locale: STRAPI_DEFAULTS.LOCALE,
        });
        const res = await strapiFetch(`${STRAPI_ENDPOINTS.PENGUMUMAN}?${q}`);
        if (Array.isArray(res?.data) && res.data.length > 0) {
          foundStrapi = res.data[0];
        }
      } catch (_) {}
    }

    // D. Fallback: documentId + locale "id"
    if (!foundStrapi && activeLocale !== STRAPI_DEFAULTS.LOCALE) {
      try {
        const q = buildDetailByFieldQuery({
          field: "documentId",
          value: rawParam,
          populate: STRAPI_POPULATE.PENGUMUMAN,
          locale: STRAPI_DEFAULTS.LOCALE,
        });
        const res = await strapiFetch(`${STRAPI_ENDPOINTS.PENGUMUMAN}?${q}`);
        if (Array.isArray(res?.data) && res.data.length > 0) {
          foundStrapi = res.data[0];
        }
      } catch (_) {}
    }

    if (foundStrapi) {
      return normalizePengumuman(foundStrapi);
    }
  } catch (err) {
    console.warn(
      "[pengumumanService] Gagal memuat pengumuman dari Strapi:",
      err.message
    );
  }

  // 2. Jika tidak ditemukan di Strapi (atau Strapi offline), cari di berkas lokal sesuai bahasa aktif
  if (ENABLE_LOCAL_FALLBACK) {
    const localRaw = (localBeritaData || []).filter((item) => {
      if (item.tags !== "Pengumuman") return false;
      const itemLocale = item.locale || "id";
      return itemLocale === activeLocale;
    });

    const matchLower = rawParam.toLowerCase();

    const localFound = localRaw.find((item) => {
      const generated = generateSlug(item.title, item.slug).toLowerCase();
      const slugMatch = (item.slug || "").toLowerCase() === matchLower;
      const idMatch = String(item.id || "").toLowerCase() === matchLower;
      const baseIdMatch = String(item.id || "").replace(/-en$/, "").toLowerCase() === matchLower;
      const titleMatch = (item.title || "").toLowerCase() === matchLower;
      return generated === matchLower || slugMatch || idMatch || baseIdMatch || titleMatch;
    });

    if (localFound) {
      // Jika item lokal memiliki kesamaan judul dengan item yang ada di Strapi,
      // selalu prioritaskan data dari Strapi (Strapi Wins)
      try {
        const hybridList = await getHybridPengumumanList({ locale: activeLocale });
        const strapiMatch = hybridList.find(
          (h) =>
            h.source === "strapi" &&
            normalizeTitleKey(h.title) === normalizeTitleKey(localFound.title)
        );
        if (strapiMatch) {
          return strapiMatch;
        }
      } catch (_) {}

      return normalizeLocalPengumuman(localFound);
    }

    // Fallback: jika bahasa aktif "en" tapi tidak ada di lokal/strapi, cari versi "id"
    if (activeLocale !== STRAPI_DEFAULTS.LOCALE) {
      const fallbackLocal = (localBeritaData || []).filter(
        (item) => item.tags === "Pengumuman" && (item.locale || "id") === STRAPI_DEFAULTS.LOCALE
      );
      const fallbackFound = fallbackLocal.find((item) => {
        const generated = generateSlug(item.title, item.slug).toLowerCase();
        const slugMatch = (item.slug || "").toLowerCase() === matchLower;
        const idMatch = String(item.id || "").toLowerCase() === matchLower;
        return generated === matchLower || slugMatch || idMatch;
      });
      if (fallbackFound) {
        return normalizeLocalPengumuman(fallbackFound);
      }
    }
  }

  return null;
}

export default {
  ENABLE_LOCAL_FALLBACK,
  getHybridPengumumanList,
  getHybridPengumumanBySlug,
};
