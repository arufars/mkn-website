import { strapiFetch } from "../api/strapiClient.js";
import { buildListQuery, buildDetailByFieldQuery } from "../api/strapiQuery.js";
import {
  STRAPI_ENDPOINTS,
  STRAPI_POPULATE,
  STRAPI_SORT,
  STRAPI_DEFAULTS,
} from "../config/strapi.js";
import {
  normalizeBerita,
  normalizeLocalBerita,
} from "../utils/beritaFormatters.js";
import { generateSlug } from "../utils/slugHelper.js";
import localBeritaData from "../data/berita.json" with { type: "json" };

/**
 * =========================================================
 * KONFIGURASI MIGRASI HYBRID BERITA
 * =========================================================
 * Set ke 'true' selama masa transisi migrasi (Strapi + Local JSON).
 * Set ke 'false' jika seluruh data berita sudah 100% dipindahkan ke Strapi CMS.
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
 * Helper untuk mengubah string tanggal (ISO atau format teks "18 Agustus 2026" / "Oktober 2022")
 * menjadi timestamp milidetik agar pengurutan (sorting) akurat.
 * @param {string} dateStr
 * @returns {number} Timestamp milidetik
 */
export function parseDateToTimestamp(dateStr) {
  if (!dateStr) return 0;

  // 1. Coba parse format ISO standar (2026-08-18 / 2026-08-18T...)
  const isoTime = Date.parse(dateStr);
  if (!isNaN(isoTime)) return isoTime;

  // 2. Parse format teks Indonesia ("18 Agustus 2026" atau "Oktober 2022")
  try {
    const parts = dateStr.trim().toLowerCase().split(/\s+/);
    if (parts.length >= 3) {
      // Contoh: "18 Agustus 2026"
      const day = parseInt(parts[0], 10);
      const monthName = parts[1];
      const year = parseInt(parts[2], 10);
      if (!isNaN(day) && !isNaN(year) && BULAN_INDO[monthName] !== undefined) {
        return new Date(year, BULAN_INDO[monthName], day).getTime();
      }
    } else if (parts.length === 2) {
      // Contoh: "Oktober 2022"
      const monthName = parts[0];
      const year = parseInt(parts[1], 10);
      if (!isNaN(year) && BULAN_INDO[monthName] !== undefined) {
        return new Date(year, BULAN_INDO[monthName], 1).getTime();
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
 * @param {string} title
 * @returns {string}
 */
export function normalizeTitleKey(title = "") {
  return String(title || "")
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Mengambil daftar berita gabungan (Hybrid: Strapi CMS + Local JSON)
 * dengan aturan deduplikasi cerdas (prioritas versi Strapi).
 *
 * @param {object} [options={}]
 * @param {string} [options.locale="id"] - Bahasa aktif ("id" atau "en")
 * @returns {Promise<Array>} Daftar berita terpadu dan terurut
 */
export async function getHybridBeritaList({ locale = "id" } = {}) {
  let strapiItems = [];
  const activeLocale = locale || STRAPI_DEFAULTS.LOCALE;

  // 1. Ambil data dari Strapi CMS (Prioritas Utama)
  try {
    const query = buildListQuery({
      populate: STRAPI_POPULATE.BERITA_FULL,
      sort: STRAPI_SORT.BERITA_DEFAULT,
      locale: activeLocale,
    });

    const res = await strapiFetch(`${STRAPI_ENDPOINTS.BERITA}?${query}`);
    let rawList = Array.isArray(res?.data) ? res.data : [];

    // Fallback locale: jika locale aktif ("en") belum ada di Strapi, ambil dari "id"
    if (rawList.length === 0 && activeLocale !== STRAPI_DEFAULTS.LOCALE) {
      try {
        const fallbackQuery = buildListQuery({
          populate: STRAPI_POPULATE.BERITA_FULL,
          sort: STRAPI_SORT.BERITA_DEFAULT,
          locale: STRAPI_DEFAULTS.LOCALE,
        });
        const fbRes = await strapiFetch(
          `${STRAPI_ENDPOINTS.BERITA}?${fallbackQuery}`
        );
        rawList = Array.isArray(fbRes?.data) ? fbRes.data : [];
      } catch (_) {}
    }

    strapiItems = rawList.map(normalizeBerita).filter(Boolean);
  } catch (err) {
    console.warn(
      "[beritaService] Strapi CMS tidak dapat diakses, beralih ke data lokal:",
      err.message
    );
  }

  // 2. Jika Local Fallback tidak aktif, langsung kembalikan data Strapi
  if (!ENABLE_LOCAL_FALLBACK) {
    return strapiItems;
  }

  // 3. Ambil data berita lokal (bukan pengumuman)
  const localRaw = (localBeritaData || []).filter(
    (item) => item.tags !== "Pengumuman"
  );
  const localItems = localRaw.map(normalizeLocalBerita).filter(Boolean);

  // 4. Deduplikasi cerdas (Prioritas Utama: TITLE MATCHING)
  // Strapi menang jika judul sama dengan data lokal
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

  // Saring data lokal: buang yang sudah ada di Strapi (berdasarkan title utama atau slug)
  const filteredLocalItems = localItems.filter((local) => {
    const titleKey = normalizeTitleKey(local.title);
    const slugKey = (local.slug || "").toLowerCase().trim();

    const isDuplicateTitle = Boolean(titleKey && strapiTitles.has(titleKey));
    const isDuplicateSlug = Boolean(slugKey && strapiSlugs.has(slugKey));

    return !isDuplicateTitle && !isDuplicateSlug;
  });

  // 5. Gabungkan data Strapi (terdepan) + data lokal yang tersisa
  const combined = [...strapiItems, ...filteredLocalItems];

  // 6. Urutkan: Pinned selalu terdepan, lalu Tanggal Terbaru
  combined.sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;

    const timeA = parseDateToTimestamp(a.tanggal);
    const timeB = parseDateToTimestamp(b.tanggal);
    return timeB - timeA;
  });

  return combined;
}

/**
 * Mengambil satu detail berita berdasarkan slug (Hybrid)
 * Mencari di Strapi terlebih dahulu; jika tidak ditemukan / Strapi offline,
 * mencari di berkas lokal berita.json.
 *
 * @param {string} slugParam - Slug, documentId, atau ID berita
 * @param {object} [options={}]
 * @param {string} [options.locale="id"] - Kode bahasa aktif
 * @returns {Promise<object|null>} Objek berita ternormalisasi atau null
 */
export async function getHybridBeritaBySlug(
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
        populate: STRAPI_POPULATE.BERITA_FULL,
        locale: activeLocale,
      });
      const res = await strapiFetch(`${STRAPI_ENDPOINTS.BERITA}?${q}`);
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
          populate: STRAPI_POPULATE.BERITA_FULL,
          locale: activeLocale,
        });
        const res = await strapiFetch(`${STRAPI_ENDPOINTS.BERITA}?${q}`);
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
          populate: STRAPI_POPULATE.BERITA_FULL,
          locale: STRAPI_DEFAULTS.LOCALE,
        });
        const res = await strapiFetch(`${STRAPI_ENDPOINTS.BERITA}?${q}`);
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
          populate: STRAPI_POPULATE.BERITA_FULL,
          locale: STRAPI_DEFAULTS.LOCALE,
        });
        const res = await strapiFetch(`${STRAPI_ENDPOINTS.BERITA}?${q}`);
        if (Array.isArray(res?.data) && res.data.length > 0) {
          foundStrapi = res.data[0];
        }
      } catch (_) {}
    }

    if (foundStrapi) {
      return normalizeBerita(foundStrapi);
    }
  } catch (err) {
    console.warn(
      "[beritaService] Gagal memuat berita dari Strapi:",
      err.message
    );
  }

  // 2. Jika tidak ditemukan di Strapi (atau Strapi offline), cari di berkas lokal
  if (ENABLE_LOCAL_FALLBACK) {
    const localRaw = (localBeritaData || []).filter(
      (item) => item.tags !== "Pengumuman"
    );

    const matchLower = rawParam.toLowerCase();

    const localFound = localRaw.find((item) => {
      const generated = generateSlug(item.title, item.slug).toLowerCase();
      const slugMatch = (item.slug || "").toLowerCase() === matchLower;
      const idMatch = String(item.id || "").toLowerCase() === matchLower;
      const titleMatch = (item.title || "").toLowerCase() === matchLower;
      return generated === matchLower || slugMatch || idMatch || titleMatch;
    });

    if (localFound) {
      // Jika item lokal memiliki kesamaan judul dengan item yang ada di Strapi,
      // selalu prioritaskan data dari Strapi (Strapi Wins)
      try {
        const hybridList = await getHybridBeritaList({ locale: activeLocale });
        const strapiMatch = hybridList.find(
          (h) =>
            h.source === "strapi" &&
            normalizeTitleKey(h.title) === normalizeTitleKey(localFound.title)
        );
        if (strapiMatch) {
          return strapiMatch;
        }
      } catch (_) {}

      return normalizeLocalBerita(localFound);
    }
  }

  return null;
}

/**
 * Mengambil artikel terkait dari daftar hybrid (mengecualikan artikel aktif)
 * @param {object} currentArticle - Artikel yang sedang dibuka
 * @param {object} [options={}]
 * @param {number} [options.limit=3]
 * @param {string} [options.locale="id"]
 * @returns {Promise<Array>}
 */
export async function getRelatedBerita(
  currentArticle,
  { limit = 3, locale = "id" } = {}
) {
  if (!currentArticle) return [];

  try {
    const list = await getHybridBeritaList({ locale });
    const currentTitleKey = normalizeTitleKey(currentArticle.title);
    const currentSlug = (currentArticle.slug || "").toLowerCase();

    return list
      .filter((item) => {
        if (item.id === currentArticle.id) return false;
        if (item.documentId && item.documentId === currentArticle.documentId)
          return false;
        if ((item.slug || "").toLowerCase() === currentSlug) return false;
        if (normalizeTitleKey(item.title) === currentTitleKey) return false;
        return true;
      })
      .slice(0, limit);
  } catch (err) {
    console.warn("[beritaService] Gagal mengambil berita terkait:", err);
    return [];
  }
}

export default {
  ENABLE_LOCAL_FALLBACK,
  normalizeTitleKey,
  parseDateToTimestamp,
  getHybridBeritaList,
  getHybridBeritaBySlug,
  getRelatedBerita,
};
