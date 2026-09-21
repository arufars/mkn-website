import { STRAPI_BASE_URL } from "../config/strapi.js";

/**
 * =========================================================
 * STRAPI GLOBAL HELPERS
 * Fungsi utilitas umum dan reusable untuk integrasi Strapi CMS
 * Digunakan lintas modul (Berita, Agenda, Pengumuman, dll)
 * =========================================================
 */

/**
 * Mendapatkan URL absolut untuk berkas media Strapi (gambar, pdf, audio, dll)
 * Mendukung format string parsial, objek media tunggal, atau format responsif (large/medium/small).
 *
 * @param {object|string|null} media - Objek media Strapi atau path string
 * @returns {string} URL absolut siap pakai
 */
export function getStrapiMediaUrl(media) {
  if (!media) return "";
  if (typeof media === "string") {
    return media.startsWith("http") ? media : `${STRAPI_BASE_URL}${media}`;
  }
  const url =
    media.formats?.large?.url ||
    media.formats?.medium?.url ||
    media.formats?.small?.url ||
    media.url;
  if (!url) return "";
  return url.startsWith("http") ? url : `${STRAPI_BASE_URL}${url}`;
}

/**
 * Ekstraksi teks polos dari struktur Strapi Blocks (Rich Text).
 * Berguna untuk cuplikan ringkasan (excerpt), meta description, dan estimasi reading time.
 *
 * @param {Array|string|null} blocks - Struktur blocks dari Strapi atau teks biasa
 * @returns {string} Teks polos terformat
 */
export function blocksToPlainText(blocks) {
  if (!blocks) return "";
  if (typeof blocks === "string") return blocks;
  if (!Array.isArray(blocks)) return "";
  return blocks
    .map((block) => {
      if (block?.children && Array.isArray(block.children)) {
        return block.children.map((c) => c?.text || "").join("");
      }
      return "";
    })
    .filter(Boolean)
    .join("\n\n");
}

/**
 * Format tanggal ISO dari Strapi menjadi teks yang ramah dibaca
 *
 * @param {string} dateStr - Format tanggal ISO (YYYY-MM-DD atau ISO Timestamp)
 * @param {string} [lang="id"] - "id" atau "en"
 * @param {object} [options={}] - Opsi tambahan untuk toLocaleDateString
 * @returns {string} Tanggal terformat (misal: "24 Agustus 2026")
 */
export function formatStrapiDate(dateStr, lang = "id", options = {}) {
  if (!dateStr) return "—";
  try {
    const d = new Date(dateStr.includes("T") ? dateStr : `${dateStr}T00:00:00`);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString(lang === "en" ? "en-US" : "id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      ...options,
    });
  } catch {
    return dateStr;
  }
}
