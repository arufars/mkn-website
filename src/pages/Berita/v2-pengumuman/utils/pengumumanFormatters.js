import { STRAPI_BASE_URL } from "../../../../config/strapi";

/**
 * Mendapatkan URL absolut untuk berkas media Strapi (lokal atau CDN)
 * @param {object|string|null} media
 * @returns {string}
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
 * Ekstraksi teks polos dari struktur Strapi Blocks (Rich Text)
 * @param {Array|string|null} blocks
 * @returns {string}
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
 * Format tanggal pengumuman menjadi teks yang mudah dibaca
 * Contoh: "24 Agustus 2026" / "August 24, 2026"
 * @param {string} dateStr - Format ISO (YYYY-MM-DD)
 * @param {string} lang - "id" atau "en"
 * @returns {string}
 */
export function formatPengumumanDate(dateStr, lang = "id") {
  if (!dateStr) return "—";
  try {
    const d = new Date(dateStr.includes("T") ? dateStr : `${dateStr}T00:00:00`);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString(lang === "en" ? "en-US" : "id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

/**
 * Format masa berlaku pengumuman
 * Contoh: "30 Sep 2026" / "Sep 30, 2026"
 * @param {string} dateStr
 * @param {string} lang
 * @returns {string}
 */
export function formatBerlakuHingga(dateStr, lang = "id") {
  if (!dateStr || dateStr === "—") return "";
  try {
    const d = new Date(dateStr.includes("T") ? dateStr : `${dateStr}T00:00:00`);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString(lang === "en" ? "en-US" : "id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

/**
 * Normalisasi objek pengumuman dari respon Strapi CMS
 * @param {object} item
 * @returns {object}
 */
export function normalizePengumuman(item) {
  if (!item) return null;

  // Resolusi Kategori (bisa array relasi, objek, atau string)
  let kategori = "";
  if (Array.isArray(item.kategori) && item.kategori.length > 0) {
    kategori = item.kategori
      .map((k) => k.nama || k.name || "")
      .filter(Boolean)
      .join(", ");
  } else if (typeof item.kategori === "object" && item.kategori !== null) {
    kategori = item.kategori.nama || item.kategori.name || "";
  } else if (typeof item.kategori === "string") {
    kategori = item.kategori;
  }

  // Resolusi Tags
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
    tags = ["Pengumuman"];
  }

  // Resolusi Lampiran
  const rawLampiran = Array.isArray(item.lampiran) ? item.lampiran : [];
  const lampiran = rawLampiran.map((file) => {
    const ext = file.ext ? file.ext.replace(".", "").toUpperCase() : "";
    const format = ext || (file.mime?.includes("pdf") ? "PDF" : "BERKAS");
    const sizeKb = typeof file.size === "number" ? file.size : 0;
    const ukuran =
      sizeKb >= 1024
        ? `${(sizeKb / 1024).toFixed(1)} MB`
        : sizeKb > 0
        ? `${Math.round(sizeKb)} KB`
        : "";

    return {
      id: file.id,
      documentId: file.documentId,
      nama: file.name || "lampiran.pdf",
      judul:
        file.caption ||
        file.alternativeText ||
        file.name ||
        "Berkas Pengumuman",
      format,
      ukuran,
      url: getStrapiMediaUrl(file),
    };
  });

  const plainContent = blocksToPlainText(item.content);

  // Resolusi Author / Pembuat dari Strapi (mengambil username dari createdBy)
  const author =
    item.createdBy?.username ||
    item.createdBy?.data?.attributes?.username ||
    (typeof item.author === "string" && item.author.trim() ? item.author : null) ||
    item.author?.username ||
    item.author?.name ||
    item.createdBy?.firstname ||
    "admkn";

  return {
    id: item.id,
    documentId: item.documentId,
    title: item.title || "",
    slug: item.slug || item.documentId || String(item.id),
    tanggal: item.tanggal ? item.tanggal.split("T")[0] : "",
    berlakuHingga: item.berlakuHingga
      ? item.berlakuHingga.split("T")[0]
      : "",
    content: item.content || [],
    plainContent,
    author,
    authorRole: {
      id: "Redaksi MKn UNISSULA",
      en: "MKn UNISSULA Editorial",
    },
    tags,
    kategori: kategori || "Pengumuman",
    gambar: item.gambar ? getStrapiMediaUrl(item.gambar) : null,
    lampiran,
    locale: item.locale || "id",
  };
}
