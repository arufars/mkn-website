import { STRAPI_BASE_URL } from "../../../../config/strapi";

/**
 * Menyelesaikan URL media gambar dari Strapi (lokal vs eksternal)
 * @param {object|string} gambar - Objek media gambar dari respons Strapi atau URL string
 * @returns {string|null} URL lengkap gambar yang siap dirender di browser
 */
export function getStrapiMediaUrl(gambar) {
  if (!gambar) return null;

  if (typeof gambar === "string") {
    return gambar.startsWith("http") ? gambar : `${STRAPI_BASE_URL}${gambar}`;
  }

  const url =
    gambar.formats?.large?.url ||
    gambar.formats?.medium?.url ||
    gambar.formats?.small?.url ||
    gambar.url;

  if (!url) return null;
  return url.startsWith("http") ? url : `${STRAPI_BASE_URL}${url}`;
}

/**
 * Memformat tanggal ISO menjadi tanggal bahasa Indonesia yang rapi
 * @param {string} dateString - String tanggal (ISO atau format teks)
 * @returns {string} Tanggal terformat (contoh: "18 Agustus 2026")
 */
export function formatTanggal(dateString) {
  if (!dateString) return "—";
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return d.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return dateString;
  }
}
