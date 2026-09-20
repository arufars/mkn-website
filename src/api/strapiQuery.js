import qs from "qs";
import { STRAPI_DEFAULTS, STRAPI_QS_OPTIONS } from "../config/strapi.js";

/**
 * =========================================================
 * UNIVERSAL STRAPI QUERY BUILDER (MENGGUNAKAN 'qs')
 * =========================================================
 * Kumpulan fungsi penyusun query string umum yang dapat
 * digunakan ulang (reusable) untuk SEMUA koleksi Strapi
 * (Berita, Agenda, Dosen, Alumni, Fasilitas, dll).
 */

/**
 * 1. Penyusun Query List/Katalog Umum
 * Mendukung paginasi, sorting, deep populate, dan filter kustom
 *
 * @param {object} params
 * @param {object|string} [params.populate="*"] - Objek atau string populate
 * @param {object} [params.filters={}] - Filter kustom Strapi
 * @param {string[]} [params.sort] - Array string pengurutan (misal: ['createdAt:desc'])
 * @param {number} [params.page=1] - Nomor halaman
 * @param {number} [params.pageSize=25] - Jumlah entri per halaman
 * @param {string} [params.locale="id"] - Kode bahasa
 * @returns {string} Query string siap pakai
 */
export function buildListQuery({
  populate = "*",
  filters = {},
  sort = ["createdAt:desc"],
  page = STRAPI_DEFAULTS.PAGE,
  pageSize = STRAPI_DEFAULTS.PAGE_SIZE,
  locale,
} = {}) {
  const queryObj = {
    populate,
    sort,
    pagination: {
      page,
      pageSize,
    },
  };

  // Hanya tambahkan locale jika secara eksplisit diberikan
  // Tanpa locale → Strapi mengembalikan SEMUA artikel terlepas dari locale-nya
  if (locale) {
    queryObj.locale = locale;
  }

  if (filters && Object.keys(filters).length > 0) {
    queryObj.filters = filters;
  }

  return qs.stringify(queryObj, STRAPI_QS_OPTIONS);
}

/**
 * 2. Penyusun Query Detail Berdasarkan Field Apapun ($eq)
 * Sangat reusable: bisa untuk 'title', 'slug', 'documentId', 'id', 'email', dll.
 *
 * @param {object} params
 * @param {string} [params.field="slug"] - Nama field yang ingin dicocokkan (misal: "title", "slug")
 * @param {string|number} params.value - Nilai yang dicari
 * @param {object|string} [params.populate="*"] - Relasi yang ingin di-populate
 * @param {string} [params.locale="id"] - Kode bahasa
 * @returns {string} Query string filter persis ($eq)
 */
export function buildDetailByFieldQuery({
  field = "slug",
  value,
  populate = "*",
  locale,
} = {}) {
  const queryObj = {
    populate,
    filters: {
      [field]: {
        $eq: value,
      },
    },
  };

  // Hanya tambahkan locale jika secara eksplisit diberikan
  if (locale) {
    queryObj.locale = locale;
  }

  return qs.stringify(queryObj, STRAPI_QS_OPTIONS);
}

/**
 * 3. Penyusun Query Item Terkait / Lainnya (Related Items)
 * Mengambil item selain item yang sedang aktif ($ne: excludeId)
 *
 * @param {object} params
 * @param {string|number} [params.excludeId] - ID artikel/acara yang sedang aktif (agar tidak muncul lagi)
 * @param {object|string} [params.populate="*"] - Relasi yang di-populate
 * @param {object} [params.filters={}] - Filter tambahan (misal kategori sama)
 * @param {number} [params.limit=3] - Jumlah item terkait yang diambil
 * @param {string[]} [params.sort] - Aturan pengurutan
 * @param {string} [params.locale="id"] - Kode bahasa
 * @returns {string} Query string item terkait
 */
export function buildRelatedQuery({
  excludeId = null,
  populate = "*",
  filters = {},
  limit = STRAPI_DEFAULTS.RELATED_LIMIT,
  sort = ["createdAt:desc"],
  locale,
} = {}) {
  const mergedFilters = { ...filters };

  if (excludeId) {
    mergedFilters.id = {
      $ne: excludeId,
    };
  }

  const queryObj = {
    populate,
    filters: mergedFilters,
    pagination: {
      pageSize: limit,
    },
    sort,
  };

  // Hanya tambahkan locale jika secara eksplisit diberikan
  if (locale) {
    queryObj.locale = locale;
  }

  return qs.stringify(queryObj, STRAPI_QS_OPTIONS);
}

export default {
  buildListQuery,
  buildDetailByFieldQuery,
  buildRelatedQuery,
};
