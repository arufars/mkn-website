/**
 * Pembangkit src/data/akademik/tautanTesisTerenkripsi.js.
 *
 * Tautan Google Form pengajuan judul dan pendaftaran ujian tesis hanya boleh
 * dibuka mahasiswa. Situs ini statis, jadi tautannya tidak boleh ikut masuk
 * bundel JS dalam bentuk terbaca: skrip ini mengenkripsinya dengan kata sandi
 * (PBKDF2-SHA256 → AES-256-GCM), dan halaman Pendaftaran Tesis membukanya
 * kembali di peramban memakai kata sandi yang diketik mahasiswa.
 *
 * Kata sandi dan tautan asli tidak pernah masuk repositori. Keduanya dibaca
 * dari variabel PASSWORD_TESIS, TAUTAN_JUDUL_TESIS, TAUTAN_PRA_PROPOSAL,
 * TAUTAN_PROPOSAL, dan TAUTAN_UJIAN_TESIS (contoh: .env.example). Sumbernya
 * berkas .env di akar proyek (di-gitignore) atau variabel lingkungan sistem,
 * misalnya pengaturan Environment Variables di Vercel; yang terakhir menang.
 *
 * Skrip ini dijalankan otomatis saat "prebuild" dengan --opsional: bila
 * PASSWORD_TESIS tidak diisi, berkas terenkripsi yang sudah ada dibiarkan apa
 * adanya. Bila kata sandi dan tautannya tidak berubah, berkas juga tidak
 * ditulis ulang, supaya tiap build tidak memunculkan diff baru.
 *
 * Jangan beri awalan VITE_ pada variabel-variabel ini: awalan itu membuat Vite
 * menanamkan nilainya ke bundel JS yang bisa dibaca publik.
 */

import { writeFile } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";
import { webcrypto as crypto } from "node:crypto";
import { loadEnv } from "vite";

import { bukaTautanTerenkripsi } from "../src/utils/bukaTautanTerenkripsi.js";

const AKAR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const TUJUAN = path.join(AKAR, "src/data/akademik/tautanTesisTerenkripsi.js");

/** Makin besar makin lambat ditebak berulang-ulang; ±0,3 detik di peramban. */
const ITERASI = 310000;

const OPSIONAL = process.argv.includes("--opsional");

/** Isi .env, .env.local, dan .env.production, ditimpa variabel lingkungan sistem. */
const env = loadEnv("production", AKAR, "");

const kataSandi = env.PASSWORD_TESIS;
if (!kataSandi) {
  if (OPSIONAL) {
    console.log("tautan-tesis: PASSWORD_TESIS kosong, memakai berkas terenkripsi yang sudah ada.");
    process.exit(0);
  }
  console.error("PASSWORD_TESIS belum diisi. Lihat petunjuk di kepala berkas ini.");
  process.exit(1);
}

/** Variabel lingkungan untuk tiap kunci tautan. */
const VARIABEL_TAUTAN = {
  judulTesis: "TAUTAN_JUDUL_TESIS",
  praProposal: "TAUTAN_PRA_PROPOSAL",
  proposal: "TAUTAN_PROPOSAL",
  ujianTesis: "TAUTAN_UJIAN_TESIS",
};

const tautan = Object.fromEntries(
  Object.entries(VARIABEL_TAUTAN).map(([kunci, nama]) => [kunci, env[nama]?.trim()]),
);
const kurang = Object.entries(VARIABEL_TAUTAN)
  .filter(([kunci]) => !tautan[kunci])
  .map(([, nama]) => nama);
if (kurang.length > 0) {
  console.error(`Variabel tautan belum diisi: ${kurang.join(", ")}`);
  process.exit(1);
}

/** Lewati penulisan bila berkas yang ada sudah terbuka dengan data yang sama. */
try {
  const { tautanTesisTerenkripsi } = await import(pathToFileURL(TUJUAN).href);
  const lama = await bukaTautanTerenkripsi(tautanTesisTerenkripsi, kataSandi);
  if (JSON.stringify(lama) === JSON.stringify(tautan)) {
    console.log("tautan-tesis: kata sandi dan tautan tidak berubah.");
    process.exit(0);
  }
} catch {
  // Berkas belum ada atau rusak — tulis baru.
}

const keBase64 = (bytes) => Buffer.from(bytes).toString("base64");

const garam = crypto.getRandomValues(new Uint8Array(16));
const iv = crypto.getRandomValues(new Uint8Array(12));

const bahanKunci = await crypto.subtle.importKey(
  "raw",
  new TextEncoder().encode(kataSandi),
  "PBKDF2",
  false,
  ["deriveKey"],
);
const kunci = await crypto.subtle.deriveKey(
  { name: "PBKDF2", salt: garam, iterations: ITERASI, hash: "SHA-256" },
  bahanKunci,
  { name: "AES-GCM", length: 256 },
  false,
  ["encrypt"],
);
const sandi = await crypto.subtle.encrypt(
  { name: "AES-GCM", iv },
  kunci,
  new TextEncoder().encode(JSON.stringify(tautan)),
);

const isi = `/**
 * Tautan formulir pengajuan dan pendaftaran ujian tesis, dalam bentuk terenkripsi.
 *
 * Dibuat otomatis oleh scripts/enkripsi-tautan-tesis.mjs — jangan disunting manual.
 */
export const tautanTesisTerenkripsi = {
  iterasi: ${ITERASI},
  garam: "${keBase64(garam)}",
  iv: "${keBase64(iv)}",
  data: "${keBase64(new Uint8Array(sandi))}",
};
`;

await writeFile(TUJUAN, isi, "utf8");
console.log(`Tautan terenkripsi ditulis ke ${path.relative(AKAR, TUJUAN)}`);
