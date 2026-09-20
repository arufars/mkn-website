/**
 * =========================================================
 * KONFIGURASI GLOBAL STRAPI CMS
 * =========================================================
 * File ini memusatkan seluruh konfigurasi koneksi, endpoint,
 * preset populate, pengurutan (sort), dan opsi serialisasi 'qs'
 * untuk seluruh aplikasi frontend MKN UNISSULA.
 */

// 1. BASE URL SERVER STRAPI
export const STRAPI_BASE_URL =
  import.meta.env?.VITE_STRAPI_URL || "http://localhost:1337";

// 2. ENDPOINT API STRAPI
export const STRAPI_ENDPOINTS = {
  BERITA: "/api/beritas",
  AGENDA: "/api/agendas",
  AGENDA_V2: "/api/agenda",
  PENGUMUMAN: "/api/pengumumen",
  PENGUMUMAN_V2: "/api/pengumumen",
  KATEGORI: "/api/kategoris",
  MEDIA: "/api/upload/files",
};

// 3. OPSI SERIALISASI QS (LIBRARY 'qs')
// encodeValuesOnly: true menghasilkan query string bersih dan sesuai standar Strapi
export const STRAPI_QS_OPTIONS = {
  encodeValuesOnly: true,
};

// 4. NILAI DEFAULT QUERY
export const STRAPI_DEFAULTS = {
  LOCALE: "id",
  PAGE: 1,
  PAGE_SIZE: 25,
  RELATED_LIMIT: 3,
};

// 5. PRESET PENGURUTAN (SORTING)
export const STRAPI_SORT = {
  // Prioritaskan artikel yang di-pin, lalu tanggal acara/berita terbaru, lalu waktu entri dibuat
  BERITA_DEFAULT: ["isPinned:desc", "tanggal:desc", "createdAt:desc"],
  TERBARU: ["tanggal:desc", "createdAt:desc"],
  TERLAMA: ["tanggal:asc", "createdAt:asc"],
};

// 6. PRESET DEEP POPULATE
// Sesuai referensi dokumentasi strapi.md (relasi bertingkat / deep population)
export const STRAPI_POPULATE = {
  // Populate lengkap untuk halaman detail & katalog penuh berita
  BERITA_FULL: {
    gambar: {
      populate: "*",
    },
    galeri: {
      populate: "*",
    },
    sumber: {
      populate: "*",
    },
    tags: {
      populate: "*",
    },
  },

  // Populate ringan untuk kartu ringkasan atau widget berita terkait
  BERITA_CARD: {
    gambar: {
      populate: "*",
    },
    tags: {
      populate: "*",
    },
  },

  // Populate lengkap untuk Agenda V2 (Strapi /api/agenda)
  // Field: title, slug, date, time, category, venue, organizer,
  //        description, fullDescription, image, cp, isFeatured, pinned
  // Catatan: category adalah field skalar (string/enum), bukan relasi, jadi tidak di-populate
  AGENDA_V2_FULL: {
    image: {
      populate: "*",
    },
  },

  // Populate ringan untuk kartu/grid agenda terkait
  AGENDA_V2_CARD: {
    image: {
      populate: "*",
    },
  },

  // Populate lengkap untuk Pengumuman (Strapi /api/pengumumen)
  // Menggunakan wildcard '*' agar seluruh relasi & media otomatis terambil secara dinamis
  PENGUMUMAN: "*",
  PENGUMUMAN_V2: "*",

  // Preset untuk Agenda / Event mendatang (lama)
  AGENDA_FULL: {
    gambar: {
      populate: "*",
    },
    kategori: {
      populate: "*",
    },
    lampiran: {
      populate: "*",
    },
  },
};

export default {
  BASE_URL: STRAPI_BASE_URL,
  ENDPOINTS: STRAPI_ENDPOINTS,
  QS_OPTIONS: STRAPI_QS_OPTIONS,
  DEFAULTS: STRAPI_DEFAULTS,
  SORT: STRAPI_SORT,
  POPULATE: STRAPI_POPULATE,
};
