import {
  getStrapiMediaUrl,
  blocksToPlainText,
  formatStrapiDate,
} from "./strapiHelpers.js";

// Re-export fungsi utilitas global Strapi agar tetap backward-compatible
export { getStrapiMediaUrl, blocksToPlainText, formatStrapiDate };

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
    source: "strapi",
    isPinned: Boolean(item.isPinned || item.pinned),
  };
}

/**
 * Normalisasi objek pengumuman dari berkas data lokal (berita.json)
 * agar memiliki kontrak data yang identik dengan objek dari Strapi CMS
 * @param {object} item
 * @returns {object|null}
 */
export function normalizeLocalPengumuman(item) {
  if (!item) return null;

  const rawLampiran = Array.isArray(item.lampiran) ? item.lampiran : [];
  const lampiran = rawLampiran.map((file, idx) => ({
    id: file.id || `local-att-${item.id || ""}-${idx}`,
    documentId: file.documentId || null,
    nama: file.nama || file.name || "lampiran.pdf",
    judul: file.judul || file.caption || file.nama || "Berkas Pengumuman",
    format: file.format || (file.url?.endsWith(".pdf") ? "PDF" : "BERKAS"),
    ukuran: file.ukuran || "",
    url: file.url || "",
  }));

  const plainContent =
    typeof item.content === "string"
      ? item.content
      : blocksToPlainText(item.content);

  return {
    id: item.id,
    documentId: item.documentId || String(item.id),
    title: item.title || "",
    slug: item.slug || String(item.id),
    tanggal: item.tanggal || "",
    berlakuHingga: item.berlakuHingga || "",
    content: item.content || "",
    plainContent,
    author: item.author || "admkn",
    authorRole: {
      id: "Redaksi MKn UNISSULA",
      en: "MKn UNISSULA Editorial",
    },
    tags: Array.isArray(item.tags)
      ? item.tags
      : [item.tags || "Pengumuman"],
    kategori: item.kategori || "Pengumuman",
    gambar: item.gambar || null,
    lampiran,
    locale: item.locale || "id",
    source: "local",
    isPinned: Boolean(item.pinned || item.isPinned),
  };
}
