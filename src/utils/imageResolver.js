/**
 * Smart Image Resolver untuk Modul Berita
 * Mendukung:
 * 1. URL eksternal (API integration ready: http:// / https://)
 * 2. Path lengkap: "src/assets/images/berita/news/berita1.jpg"
 * 3. Nama file dengan ekstensi bebas: "berita4.jpg" padahal aslinya "berita4.jpeg"
 * 4. Nama file tanpa ekstensi: "berita1", "berita2", dll.
 */

const beritaImages = import.meta.glob(
  "/src/assets/images/**/*.{jpg,jpeg,png,webp,avif}",
  { eager: true, import: "default" }
);

export function getBeritaImage(gambarPath) {
  if (!gambarPath) return "";

  // 1. Jika URL eksternal (API Ready)
  if (gambarPath.startsWith("http://") || gambarPath.startsWith("https://")) {
    return gambarPath;
  }

  // 2. Cek kecocokan langsung path
  const normalized = gambarPath.startsWith("/") ? gambarPath : `/${gambarPath}`;
  if (beritaImages[normalized]) {
    return beritaImages[normalized];
  }

  // 3. Ambil nama file dasar tanpa ekstensi gambar
  // Hanya potong jika merupakan ekstensi gambar yang valid (.jpg, .jpeg, .png, dsb.)
  // agar nama file yang mengandung titik seperti "mkn-1.1" tidak terpotong menjadi "mkn-1"
  const IMAGE_EXT_REGEX = /\.(jpe?g|png|webp|avif|gif|svg)$/i;
  const rawFileName = (gambarPath.split("/").pop() || "").trim().toLowerCase();
  const baseName = rawFileName.replace(IMAGE_EXT_REGEX, "");

  if (!baseName) return "";

  // 4. Cari file di folder aset yang nama dasarnya sama
  for (const assetPath in beritaImages) {
    const assetFileName = (assetPath.split("/").pop() || "").trim().toLowerCase();
    const assetBaseName = assetFileName.replace(IMAGE_EXT_REGEX, "");

    if (assetBaseName === baseName) {
      return beritaImages[assetPath];
    }
  }

  // 5. Fallback ke gambar berita utama jika tidak ditemukan
  for (const assetPath in beritaImages) {
    if (assetPath.includes("berita-utama")) {
      return beritaImages[assetPath];
    }
  }

  return gambarPath;
}
