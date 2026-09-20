/**
 * =========================================================
 * HYBRID EVENT & AGENDA SERVICE
 * =========================================================
 * Menggabungkan data Event / Agenda dari Strapi CMS (/api/agenda)
 * dan arsip data lokal (src/data/eventData.js) secara transparan.
 *
 * Aturan Deduplikasi: Title-Matching (Strapi Wins)
 * Apabila judul acara di berkas lokal sudah ada di Strapi CMS,
 * maka versi Strapi yang dimenangkan dan versi lokal diabaikan.
 */

import { strapiFetch } from "../api/strapiClient.js";
import { buildListQuery, buildDetailByFieldQuery } from "../api/strapiQuery.js";
import { STRAPI_ENDPOINTS, STRAPI_POPULATE, STRAPI_DEFAULTS } from "../config/strapi.js";
import { eventData as localEventData } from "../data/eventData.js";
import {
  normalizeEvent,
  normalizeLocalEvent,
  normalizeTitleKey,
} from "../utils/eventFormatters.js";

/**
 * Saklar fallback lokal selama transisi
 */
export const ENABLE_LOCAL_FALLBACK = true;

/**
 * Parse tanggal YYYY-MM-DD ke timestamp numerik untuk sorting
 */
function parseDateToTimestamp(dateStr) {
  if (!dateStr) return 0;
  const d = new Date(dateStr + "T00:00:00");
  return isNaN(d.getTime()) ? 0 : d.getTime();
}

/**
 * Mengambil daftar seluruh event secara hybrid (Strapi CMS + Local)
 * dengan aturan deduplikasi cerdas (Strapi Wins) dan pengurutan presisi.
 *
 * @param {object} options
 * @param {string} [options.locale="id"]
 * @returns {Promise<Array>}
 */
export async function getHybridEventList({
  locale = STRAPI_DEFAULTS.LOCALE,
} = {}) {
  let strapiItems = [];

  // 1. Ambil data dari Strapi CMS
  try {
    const query = buildListQuery({
      populate: STRAPI_POPULATE.AGENDA_FULL,
      sort: ["pinned:desc", "date:asc", "createdAt:desc"],
      locale,
      pageSize: 50,
    });

    const response = await strapiFetch(`${STRAPI_ENDPOINTS.AGENDA}?${query}`);
    const rawData = Array.isArray(response?.data) ? response.data : [];
    strapiItems = rawData.map(normalizeEvent).filter(Boolean);
  } catch (err) {
    console.warn("[eventService] Strapi agenda unavailable, using local fallback only:", err?.message);
    strapiItems = [];
  }

  // Jika fallback lokal dinonaktifkan, kembalikan data Strapi saja
  if (!ENABLE_LOCAL_FALLBACK) {
    return strapiItems;
  }

  // 2. Siapkan data lokal
  const localItems = (localEventData || []).map(normalizeLocalEvent).filter(Boolean);

  // 3. Deduplikasi cerdas (Title-Matching: Strapi Wins)
  const strapiTitles = new Set(
    strapiItems.map((item) => normalizeTitleKey(item.title))
  );

  const filteredLocalItems = localItems.filter((local) => {
    const titleKey = normalizeTitleKey(local.title);
    return !strapiTitles.has(titleKey);
  });

  // 4. Gabungkan dan Urutkan
  const combined = [...strapiItems, ...filteredLocalItems];

  combined.sort((a, b) => {
    // A. Item yang dipin selalu berada di atas
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;

    // B. Urutkan berdasarkan tanggal acara terdekat
    const timeA = parseDateToTimestamp(a.date);
    const timeB = parseDateToTimestamp(b.date);
    if (timeA !== timeB) return timeA - timeB;

    return (b.id || 0) - (a.id || 0);
  });

  return combined;
}

/**
 * Mengambil satu event berdasarkan slug atau documentId
 * dengan mekanisme pencarian berjenjang (Strapi -> Local Fallback -> Title Deduplication)
 *
 * @param {string} slugParam - Slug atau ID event
 * @param {object} options
 * @param {string} [options.locale="id"]
 * @returns {Promise<object|null>}
 */
export async function getHybridEventBySlug(
  slugParam,
  { locale = STRAPI_DEFAULTS.LOCALE } = {}
) {
  if (!slugParam) return null;

  const cleanSlug = decodeURIComponent(slugParam).trim();

  // 1. Cari di Strapi CMS berdasarkan slug
  try {
    const slugQuery = buildDetailByFieldQuery({
      field: "slug",
      value: cleanSlug,
      populate: STRAPI_POPULATE.AGENDA_FULL,
      locale,
    });

    const res = await strapiFetch(`${STRAPI_ENDPOINTS.AGENDA}?${slugQuery}`);
    if (Array.isArray(res?.data) && res.data.length > 0) {
      return normalizeEvent(res.data[0]);
    }

    // Coba cari berdasarkan documentId jika tidak ketemu via slug
    if (cleanSlug.length >= 16) {
      const docQuery = buildDetailByFieldQuery({
        field: "documentId",
        value: cleanSlug,
        populate: STRAPI_POPULATE.AGENDA_FULL,
        locale,
      });
      const docRes = await strapiFetch(`${STRAPI_ENDPOINTS.AGENDA}?${docQuery}`);
      if (Array.isArray(docRes?.data) && docRes.data.length > 0) {
        return normalizeEvent(docRes.data[0]);
      }
    }
  } catch (err) {
    console.warn("[eventService] Failed fetching event from Strapi by slug:", err?.message);
  }

  // 2. Cari di Berkas Lokal (Fallback)
  if (!ENABLE_LOCAL_FALLBACK) return null;

  const localMatch = (localEventData || []).find((item) => {
    return (
      item.slug === cleanSlug ||
      String(item.id) === cleanSlug
    );
  });

  if (!localMatch) return null;

  const normalizedLocal = normalizeLocalEvent(localMatch);

  // 3. Periksa apakah item lokal ini sebetulnya sudah ada di Strapi (Strapi Wins)
  try {
    const strapiList = await getHybridEventList({ locale });
    const localTitleKey = normalizeTitleKey(normalizedLocal.title);

    const strapiEquivalent = strapiList.find(
      (item) => item.source === "strapi" && normalizeTitleKey(item.title) === localTitleKey
    );

    if (strapiEquivalent) {
      return strapiEquivalent; // Kembalikan versi Strapi yang lebih kaya data
    }
  } catch {
    // Abaikan jika pengecekan gagal, lanjutkan dengan data lokal
  }

  return normalizedLocal;
}

/**
 * Mengambil daftar event mendatang lainnya (selain event yang sedang aktif dibaca)
 *
 * @param {object} currentEvent - Objek event yang sedang dibuka
 * @param {object} options
 * @param {number} [options.limit=6]
 * @param {string} [options.locale="id"]
 * @returns {Promise<Array>}
 */
export async function getUpcomingEvents(
  currentEvent,
  { limit = 6, locale = STRAPI_DEFAULTS.LOCALE } = {}
) {
  try {
    const allEvents = await getHybridEventList({ locale });
    const currentSlug = currentEvent?.slug;
    const currentId = currentEvent?.id;

    return allEvents
      .filter((ev) => ev.slug !== currentSlug && ev.id !== currentId)
      .slice(0, limit);
  } catch (err) {
    console.warn("[eventService] Failed fetching upcoming events:", err?.message);
    return [];
  }
}
