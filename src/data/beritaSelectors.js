import beritaList from "./berita.json";

/**
 * Sumber tunggal untuk memilah dan mengurutkan isi `berita.json`.
 *
 * Sebelumnya tiap tempat menyusun daftarnya sendiri: halaman Berita memfilter
 * per `tags` lalu mengurutkan per tanggal, sementara section di Beranda hanya
 * mengambil potongan awal berkas apa adanya. Akibatnya "Berita Terbaru" di
 * Beranda bisa memuat pengumuman dan tidak menampilkan entri terbaru. Semua
 * konsumen kini membaca dari berkas ini agar isinya selalu sinkron.
 */

/** Nilai `tags` yang menandai sebuah entri sebagai pengumuman, bukan berita. */
export const TAG_PENGUMUMAN = "Pengumuman";

const BULAN_ID = {
  januari: 0,
  februari: 1,
  maret: 2,
  april: 3,
  mei: 4,
  juni: 5,
  juli: 6,
  agustus: 7,
  september: 8,
  oktober: 9,
  november: 10,
  desember: 11,
};

/**
 * Konversi string tanggal format Indonesia ("30 Oktober 2022") ke Date.
 *
 * Entri dengan tanggal kosong atau tidak terbaca jatuh ke epoch, sehingga
 * terdorong ke urutan paling belakang alih-alih mengacaukan pengurutan.
 */
export function parseIndonesianDate(str) {
  if (!str) return new Date(0);

  const parts = str.trim().split(/\s+/);
  if (parts.length !== 3) return new Date(0);

  const [day, monthStr, year] = parts;
  const month = BULAN_ID[monthStr.toLowerCase()];
  if (month === undefined) return new Date(0);

  return new Date(Number(year), month, Number(day));
}

/**
 * Comparator: item dengan `isPinned: true` naik ke atas,
 * sisanya diurutkan dari terbaru ke terlama.
 */
const terbaruDuluan = (a, b) => {
  const aPin = Boolean(a.isPinned || a.pinned);
  const bPin = Boolean(b.isPinned || b.pinned);
  if (aPin && !bPin) return -1;
  if (!aPin && bPin) return 1;
  return parseIndonesianDate(b.tanggal) - parseIndonesianDate(a.tanggal);
};

const isPengumuman = (item) => item.tags === TAG_PENGUMUMAN;

// Dihitung sekali saat modul dimuat: `berita.json` statis, jadi tidak ada
// gunanya mengurutkan ulang pada tiap render.

/**
 * Mengambil daftar berita lokal berdasarkan bahasa aktif (id / en).
 * Pinned selalu diprioritaskan di awal, lalu diurutkan tanggal terbaru.
 * @param {string} [locale="id"]
 * @returns {Array}
 */
export const getBeritaByLocale = (locale = "id") =>
  beritaList
    .filter(
      (item) => !isPengumuman(item) && (item.locale || "id") === (locale || "id")
    )
    .sort(terbaruDuluan);

/**
 * Mengambil daftar pengumuman lokal berdasarkan bahasa aktif (id / en).
 * Pinned selalu diprioritaskan di awal, lalu diurutkan tanggal terbaru.
 * @param {string} [locale="id"]
 * @returns {Array}
 */
export const getPengumumanByLocale = (locale = "id") =>
  beritaList
    .filter(
      (item) => isPengumuman(item) && (item.locale || "id") === (locale || "id")
    )
    .sort(terbaruDuluan);

/** Seluruh berita bahasa Indonesia (non-pengumuman), pinned dulu lalu terbaru lebih dulu. */
export const berita = getBeritaByLocale("id");

/** Seluruh pengumuman bahasa Indonesia, pinned dulu lalu terbaru lebih dulu. */
export const pengumuman = getPengumumanByLocale("id");

/**
 * Berita yang sedang dipin (`isPinned: true`). Jika tidak ada,
 * kembalikan `null` agar konsumen bisa fallback ke item terbaru.
 * @param {string} [locale="id"]
 */
export const getPinnedBerita = (locale = "id") =>
  getBeritaByLocale(locale).find((item) => item.isPinned || item.pinned) ?? null;

/**
 * Pengumuman yang sedang dipin (`isPinned: true`). Jika tidak ada, kembalikan `null`.
 * @param {string} [locale="id"]
 */
export const getPinnedPengumuman = (locale = "id") =>
  getPengumumanByLocale(locale).find((item) => item.isPinned || item.pinned) ?? null;
