/**
 * Format string ke Title Case (contoh: "KEHIDUPAN MAHASISWA" -> "Kehidupan Mahasiswa")
 * @param {string} str
 * @returns {string}
 */
export function toTitleCase(str) {
  if (!str) return "";
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Menghitung estimasi waktu baca (Reading Time) dari teks biasa atau Strapi Blocks
 * Menggunakan standar industri rata-rata membaca orang dewasa (200 kata/menit).
 *
 * @param {string|Array|null} content - Konten teks atau array Rich Text Blocks Strapi
 * @param {number} [wordsPerMinute=200] - Kecepatan baca kata per menit (default 200)
 * @returns {{ minutes: number, wordCount: number, text: { id: string, en: string } }}
 */
export function calculateReadingTime(content, wordsPerMinute = 200) {
  if (!content) {
    return {
      minutes: 1,
      wordCount: 0,
      text: { id: "1 menit baca", en: "1 min read" },
    };
  }

  let text = "";

  if (typeof content === "string") {
    text = content;
  } else if (Array.isArray(content)) {
    // Ekstraksi teks dari struktur Strapi Rich Text Blocks
    text = content
      .map((block) => {
        if (block?.children && Array.isArray(block.children)) {
          return block.children.map((child) => child?.text || "").join("");
        }
        return "";
      })
      .filter(Boolean)
      .join(" ");
  }

  // Hitung jumlah kata dengan memisahkan berdasarkan whitespace
  const words = text.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  // Rumus: Word Count / WPM, dibulatkan ke bilangan bulat terdekat (minimal 1 menit)
  const minutes = Math.max(1, Math.round(wordCount / wordsPerMinute));

  return {
    minutes,
    wordCount,
    text: {
      id: `${minutes} menit baca`,
      en: `${minutes} min read`,
    },
  };
}
