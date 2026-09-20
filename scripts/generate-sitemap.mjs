/**
 * Pembangkit public/sitemap.xml dan public/robots.txt.
 *
 * Dijalankan otomatis sebelum `npm run build` (lihat skrip "prebuild"), atau
 * manual lewat `npm run sitemap`. Keduanya sengaja ditulis ke public/ dan ikut
 * masuk repositori supaya perubahannya terlihat di diff — bukan berkas siluman
 * yang hanya muncul di hasil build.
 *
 * Daftar URL-nya diturunkan dari dua sumber, bukan diketik ulang:
 *   1. Rute statis dibaca langsung dari src/App.jsx.
 *   2. Rute berparameter (:slug) diperluas dari modul data yang sama dengan
 *      yang dipakai halamannya, dimuat lewat Vite agar impor gambar di dalam
 *      modul tersebut tetap bisa diselesaikan.
 *
 * Alamat situs bisa ditimpa lewat variabel lingkungan SITE_URL, misalnya untuk
 * lingkungan pementasan: SITE_URL=https://staging.example.id npm run sitemap
 */

import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { createServer } from "vite";

import { generateSlug } from "../src/utils/slugHelper.js";

const AKAR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SITE_URL = (process.env.SITE_URL || "https://mkn.unissula.ac.id").replace(/\/+$/, "");

/**
 * Prioritas dan frekuensi khusus. Sisanya diturunkan dari kedalaman URL, dengan
 * anggapan makin dalam sebuah halaman makin jarang berubah dan makin rendah
 * kepentingannya bagi mesin pencari.
 */
const KHUSUS = {
  "/": { changefreq: "weekly", priority: "1.0" },
  "/informasi/penerimaan-mahasiswa": { changefreq: "weekly", priority: "0.9" },
  "/berita": { changefreq: "daily", priority: "0.9" },
  "/event": { changefreq: "weekly", priority: "0.8" },
  "/download": { changefreq: "monthly", priority: "0.7" },
};

/**
 * Alamat yang sengaja tidak dimasukkan meski rutenya sah.
 *
 * /staff/faculty-directory menampilkan komponen yang sama dengan /staff/dosen —
 * nama lama yang masih dilayani demi tautan luar, tapi tidak perlu diindeks dua
 * kali sebagai isi ganda.
 */
const DIKECUALIKAN = new Set([
  "/staff/faculty-directory",
  // Halaman berkata sandi khusus mahasiswa; tidak perlu ditemukan mesin pencari.
  "/akademik/panduan-akademik/pendaftaran-tesis",
]);

const bobot = (url) => {
  if (KHUSUS[url]) return KHUSUS[url];
  const kedalaman = url.split("/").filter(Boolean).length;
  if (kedalaman <= 1) return { changefreq: "monthly", priority: "0.8" };
  if (kedalaman === 2) return { changefreq: "monthly", priority: "0.7" };
  return { changefreq: "yearly", priority: "0.6" };
};

/* ------------------------------------------------- Rute statis dari App.jsx */

/**
 * Menelusuri <Route> di App.jsx sambil menjaga tumpukan induk, sehingga rute
 * bersarang seperti <Route path="/staff"><Route path="dosen" /></Route> ikut
 * terbaca sebagai /staff/dosen.
 *
 * Yang dilewati: rute berparameter (ditangani terpisah di bawah), penampung
 * wildcard, dan rute yang elemennya <Navigate> — sebuah pengalihan bukan
 * halaman tersendiri dan tidak pantas masuk sitemap.
 */
/**
 * Mencari ">" penutup sebuah tag JSX.
 *
 * Tidak bisa sekadar mencari ">" terdekat: atribut element={<Sejarah />} juga
 * mengandung ">", dan itu membuat tag induk salah dibaca sebagai tag yang
 * menutup sendiri sehingga rute anaknya kehilangan awalan. Karena itu kurung
 * kurawal dan tanda kutip ikut dihitung.
 */
function ujungTag(sumber, mulai) {
  let kutip = null;
  let kurung = 0;

  for (let i = mulai; i < sumber.length; i += 1) {
    const c = sumber[i];

    if (kutip) {
      if (c === kutip) kutip = null;
    } else if (c === '"' || c === "'" || c === "`") {
      kutip = c;
    } else if (c === "{") {
      kurung += 1;
    } else if (c === "}") {
      kurung -= 1;
    } else if (c === ">" && kurung === 0) {
      return i;
    }
  }

  return -1;
}

/**
 * Menelusuri <Route> di App.jsx sambil menjaga tumpukan induk, sehingga rute
 * bersarang seperti <Route path="/staff"><Route path="dosen" /></Route> ikut
 * terbaca sebagai /staff/dosen.
 *
 * Yang dilewati: rute berparameter (ditangani terpisah di bawah), penampung
 * wildcard, dan rute yang elemennya <Navigate> — sebuah pengalihan bukan
 * halaman tersendiri dan tidak pantas masuk sitemap. Induk yang rute index-nya
 * berupa <Navigate> ikut dicoret: alamat induknya sendiri hanya mengalihkan.
 */
async function ruteStatis() {
  const sumber = await readFile(path.join(AKAR, "src/App.jsx"), "utf8");
  const hasil = new Set();
  const indukTumpukan = [];

  let i = 0;

  while (i < sumber.length) {
    const buka = sumber.indexOf("<Route", i);
    const tutup = sumber.indexOf("</Route>", i);
    if (buka === -1 && tutup === -1) break;

    if (tutup !== -1 && (buka === -1 || tutup < buka)) {
      indukTumpukan.pop();
      i = tutup + "</Route>".length;
      continue;
    }

    const ujung = ujungTag(sumber, buka + "<Route".length);
    if (ujung === -1) break;

    const atribut = sumber.slice(buka + "<Route".length, ujung);
    const menutupSendiri = sumber[ujung - 1] === "/";
    const induk = indukTumpukan[indukTumpukan.length - 1] ?? "";

    const jalurCocok = atribut.match(/\bpath="([^"]*)"/);
    const pengalihan = /<Navigate\b/.test(atribut);

    if (jalurCocok) {
      const jalur = jalurCocok[1];
      const gabungan = jalur.startsWith("/") ? jalur : `${induk}/${jalur}`;
      const penuh = gabungan.replace(/\/{2,}/g, "/");
      const bersih = penuh.length > 1 ? penuh.replace(/\/+$/, "") : penuh;

      if (bersih && !bersih.includes(":") && !bersih.includes("*") && !pengalihan) {
        hasil.add(bersih);
      }
      if (!menutupSendiri) indukTumpukan.push(bersih || induk);
    } else {
      // Rute index: mewakili alamat induknya sendiri.
      if (pengalihan) hasil.delete(induk);
      else if (induk) hasil.add(induk);
      if (!menutupSendiri) indukTumpukan.push(induk);
    }

    i = ujung + 1;
  }

  return [...hasil];
}

/* ---------------------------------------------- Rute berparameter dari data */

/** Nama bulan pada berita.json ditulis dalam bahasa Indonesia, bukan ISO. */
const BULAN = [
  "januari", "februari", "maret", "april", "mei", "juni",
  "juli", "agustus", "september", "oktober", "november", "desember",
];

/** "26 Mei 2026" -> "2026-05-26". Mengembalikan null bila formatnya lain. */
function keTanggalIso(teks) {
  const cocok = String(teks || "").trim().match(/^(\d{1,2})\s+([A-Za-zÀ-ÿ]+)\s+(\d{4})$/);
  if (!cocok) return null;

  const bulan = BULAN.indexOf(cocok[2].toLowerCase());
  if (bulan < 0) return null;

  return `${cocok[3]}-${String(bulan + 1).padStart(2, "0")}-${cocok[1].padStart(2, "0")}`;
}

async function ruteDinamis() {
  const berita = JSON.parse(await readFile(path.join(AKAR, "src/data/berita.json"), "utf8"));

  // facultyData.js dan eventData.js mengimpor berkas gambar, jadi tidak bisa
  // diimpor Node begitu saja. Vite yang menyelesaikan impor tersebut.
  const server = await createServer({
    root: AKAR,
    server: { middlewareMode: true },
    appType: "custom",
    logLevel: "error",
  });

  try {
    const { eventData } = await server.ssrLoadModule("/src/data/eventData.js");
    const { facultyData } = await server.ssrLoadModule("/src/data/facultyData.js");

    const url = [];

    for (const b of berita) {
      const slug = generateSlug(b.title, b.slug);
      if (slug) url.push({ url: `/berita/${slug}`, lastmod: keTanggalIso(b.tanggal) });
    }

    for (const e of eventData ?? []) {
      if (e.slug) url.push({ url: `/event/${e.slug}`, lastmod: e.date ?? null });
    }

    // Dosen punya dua alamat yang sah; hanya /staff/dosen yang didaftarkan
    // (lihat DIKECUALIKAN) agar tidak menjadi isi ganda di mesin pencari.
    for (const d of facultyData ?? []) {
      if (d.slug) url.push({ url: `/staff/dosen/${d.slug}` });
    }

    // Akomodasi memakai satu rute bertab; daftar tabnya dibaca dari halamannya
    // sendiri supaya tidak perlu disalin ke sini.
    const halamanAkomodasi = await readFile(
      path.join(AKAR, "src/pages/StudentLife/Accommodation.jsx"),
      "utf8"
    );
    for (const [, tab] of halamanAkomodasi.matchAll(/"(\/mahasiswa\/akomodasi\/[\w-]+)"/g)) {
      url.push({ url: tab });
    }

    return url;
  } finally {
    await server.close();
  }
}

/* ------------------------------------------------------------------ Keluaran */

const lolosXml = (teks) =>
  teks.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function susunSitemap(butir) {
  const baris = butir.map(({ url, lastmod }) => {
    const { changefreq, priority } = bobot(url);
    const loc = lolosXml(`${SITE_URL}${url === "/" ? "/" : url}`);

    return [
      "  <url>",
      `    <loc>${loc}</loc>`,
      lastmod ? `    <lastmod>${lastmod}</lastmod>` : null,
      `    <changefreq>${changefreq}</changefreq>`,
      `    <priority>${priority}</priority>`,
      "  </url>",
    ]
      .filter(Boolean)
      .join("\n");
  });

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<!-- Dibuat otomatis oleh scripts/generate-sitemap.mjs — jangan disunting manual. -->',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...baris,
    "</urlset>",
    "",
  ].join("\n");
}

function susunRobots() {
  return [
    "# Dibuat otomatis oleh scripts/generate-sitemap.mjs — jangan disunting manual.",
    "User-agent: *",
    "Allow: /",
    "",
    "# Tidak ada yang ditutup: berkas PDF prodi justru berguna bila ditemukan",
    "# lewat pencarian. Perlu diperhatikan bila suatu saat ingin menutup folder",
    "# unduhan — awalan /quality-assurance/ dipakai bersama oleh berkas PDF dan",
    "# halaman Penjaminan Mutu, jadi melarangnya ikut memblokir halamannya.",
    "",
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    "",
  ].join("\n");
}

/* -------------------------------------------------------------------- Utama */

const statis = await ruteStatis();
const dinamis = await ruteDinamis();

// Diurutkan supaya keluarannya stabil: perubahan pada berkas ini selalu berarti
// rutenya memang berubah, bukan sekadar urutan yang bergeser.
const semua = [...new Map(
  [...statis.map((url) => ({ url })), ...dinamis]
    .filter((butir) => !DIKECUALIKAN.has(butir.url))
    .map((butir) => [butir.url, butir])
).values()].sort((a, b) => a.url.localeCompare(b.url));

await writeFile(path.join(AKAR, "public/sitemap.xml"), susunSitemap(semua), "utf8");
await writeFile(path.join(AKAR, "public/robots.txt"), susunRobots(), "utf8");

console.log(
  `sitemap.xml: ${semua.length} URL (${statis.length} halaman statis, ${dinamis.length} dari data)\n` +
    `robots.txt: menunjuk ke ${SITE_URL}/sitemap.xml`
);
