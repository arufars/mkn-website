import {
  getStrapiMediaUrl,
  blocksToPlainText,
  formatStrapiDate,
} from "./strapiHelpers.js";
import { getBeritaImage } from "./imageResolver.js";
import { generateSlug } from "./slugHelper.js";

// Re-export helper global Strapi
export { getStrapiMediaUrl, blocksToPlainText, formatStrapiDate };

/**
 * Pemetaan nama bulan Indonesia ke Inggris untuk format tanggal teks
 */
const MONTH_MAP_EN = {
  januari: "January",
  februari: "February",
  maret: "March",
  april: "April",
  mei: "May",
  juni: "June",
  juli: "July",
  agustus: "August",
  september: "September",
  oktober: "October",
  november: "November",
  desember: "December",
};

/**
 * Format tanggal berita (mendukung format ISO "2026-08-18" maupun teks lokal "Oktober 2022" / "18 Agustus 2026")
 * @param {string} dateStr
 * @param {string} lang - "id" atau "en"
 * @returns {string}
 */
export function formatBeritaDate(dateStr, lang = "id") {
  if (!dateStr) return "—";

  // 1. Jika format ISO (berisi YYYY-MM-DD)
  if (/^\d{4}-\d{2}-\d{2}/.test(dateStr)) {
    return formatStrapiDate(dateStr, lang);
  }

  // 2. Jika format teks ("18 Agustus 2026" / "Oktober 2022")
  if (lang === "en") {
    return dateStr.replace(
      /januari|februari|maret|april|mei|juni|juli|agustus|september|oktober|november|desember/gi,
      (matched) => {
        const lower = matched.toLowerCase();
        return MONTH_MAP_EN[lower] || matched;
      }
    );
  }

  return dateStr;
}

/**
 * Normalisasi satu objek artikel berita dari Strapi CMS
 * @param {object} item
 * @returns {object|null}
 */
export function normalizeBerita(item) {
  if (!item) return null;

  // Resolusi Tags (bisa relasi Strapi bertingkat atau array string)
  let tags = [];
  if (Array.isArray(item.tags)) {
    tags = item.tags
      .map((t) => (typeof t === "object" ? t.nama || t.name : t))
      .filter(Boolean);
  } else if (typeof item.tags === "string" && item.tags.trim()) {
    tags = item.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
  }
  if (tags.length === 0) {
    tags = ["Berita"];
  }

  // Resolusi Galeri Foto
  const rawGaleri = Array.isArray(item.galeri) ? item.galeri : [];
  const galeri = rawGaleri.map((g, idx) => {
    const media = g.gambar || g.foto || g.media || g.image;
    return {
      id: g.id || `strapi-galeri-${item.id}-${idx}`,
      keterangan: g.keterangan || "",
      gambar: media,
      imageUrl: getStrapiMediaUrl(media),
    };
  });

  // Resolusi Sumber Berita
  let sumber = null;
  if (item.sumber) {
    if (typeof item.sumber === "object") {
      sumber = {
        nama: item.sumber.nama || item.sumber.name || item.sumber.url || "",
        url: item.sumber.url || "",
      };
    } else if (typeof item.sumber === "string") {
      sumber = {
        nama: item.sumber,
        url: item.sumber.startsWith("http") ? item.sumber : "",
      };
    }
  }

  // Resolusi Author / Kontributor
  const author =
    item.author ||
    item.createdBy?.username ||
    item.createdBy?.data?.attributes?.username ||
    item.createdBy?.firstname ||
    "admkn";

  const plainContent = blocksToPlainText(item.content);
  const imageUrl = getStrapiMediaUrl(item.gambar);
  const slug = item.slug || generateSlug(item.title);

  return {
    id: item.id,
    documentId: item.documentId || null,
    title: item.title || "",
    slug,
    tanggal: item.tanggal ? item.tanggal.split("T")[0] : "",
    content: item.content || [],
    plainContent,
    author,
    authorRole: {
      id: "Redaksi MKn UNISSULA",
      en: "MKn UNISSULA Editorial",
    },
    tags,
    category: tags[0] || "Berita",
    gambar: item.gambar,
    imageUrl,
    galeri,
    sumber,
    isPinned: Boolean(item.isPinned || item.pinned),
    pinned: Boolean(item.isPinned || item.pinned),
    locale: item.locale || "id",
    source: "strapi",
    lampiran: [],
  };
}

/**
 * Normalisasi satu objek artikel berita dari berkas data lokal (berita.json)
 * @param {object} item
 * @returns {object|null}
 */
export function normalizeLocalBerita(item) {
  if (!item) return null;

  // Resolusi Tags
  let tags = [];
  if (Array.isArray(item.tags)) {
    tags = item.tags.filter(Boolean);
  } else if (typeof item.tags === "string" && item.tags.trim()) {
    tags = [item.tags.trim()];
  }
  if (tags.length === 0) {
    tags = ["Berita"];
  }

  // Resolusi Galeri Foto
  const rawGaleri = Array.isArray(item.galeri) ? item.galeri : [];
  const galeri = rawGaleri.map((g, idx) => {
    const rawImg = g.gambar || g.foto || g.media || g.image;
    const resolvedUrl = typeof rawImg === "string" ? getBeritaImage(rawImg) : "";
    return {
      id: g.id || `local-galeri-${item.id}-${idx}`,
      keterangan: g.keterangan || "",
      gambar: rawImg,
      imageUrl: resolvedUrl,
    };
  });

  // Resolusi Sumber
  let sumber = null;
  if (item.sumber) {
    if (typeof item.sumber === "object") {
      sumber = {
        nama: item.sumber.nama || item.sumber.name || item.sumber.url || "",
        url: item.sumber.url || "",
      };
    } else if (typeof item.sumber === "string") {
      sumber = {
        nama: item.sumber,
        url: item.sumber.startsWith("http") ? item.sumber : "",
      };
    }
  }

  const plainContent =
    typeof item.content === "string"
      ? item.content
      : blocksToPlainText(item.content);

  const localImg = getBeritaImage(item.gambar);
  const slug = generateSlug(item.title, item.slug);

  return {
    id: item.id,
    documentId: item.documentId || String(item.id),
    title: item.title || "",
    slug,
    tanggal: item.tanggal || "",
    content: item.content || "",
    plainContent,
    author: item.author || "admkn",
    authorRole: {
      id: "Redaksi MKn UNISSULA",
      en: "MKn UNISSULA Editorial",
    },
    tags,
    category: tags[0] || "Berita",
    gambar: item.gambar,
    imageUrl: localImg,
    galeri,
    sumber,
    isPinned: Boolean(item.pinned || item.isPinned),
    pinned: Boolean(item.pinned || item.isPinned),
    locale: item.locale || "id",
    source: "local",
    lampiran: Array.isArray(item.lampiran) ? item.lampiran : [],
  };
}

export default {
  getStrapiMediaUrl,
  blocksToPlainText,
  formatStrapiDate,
  formatBeritaDate,
  normalizeBerita,
  normalizeLocalBerita,
};
