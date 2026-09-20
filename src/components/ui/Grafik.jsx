import { motion } from "framer-motion";
import { WARNA } from "./grafikWarna";

/**
 * Grafik ringan untuk halaman data (Tracer Study, Tingkat Kelulusan).
 *
 * Aturannya mengikuti pedoman visualisasi yang sama di seluruh situs:
 *   - Batang tipis (≤ 24px), ujung data membulat 4px, pangkal tetap siku.
 *   - Segmen bertumpuk dipisah celah 2px, bukan garis tepi.
 *   - Satu seri memakai satu warna; skala berurutan memakai ramp satu hue
 *     terang → gelap. Ramp di bawah lolos `validate_palette.js --ordinal`.
 *   - Teks nilai memakai warna teks, bukan warna data.
 *   - Tooltip hanya pelengkap: setiap nilai juga tertulis di sebelah batang,
 *     sehingga tidak ada angka yang hanya bisa dibaca dengan menyorot.
 */

const tumbuh = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const viewport = { once: true, amount: 0.5 };

/** Tinta untuk label di dalam segmen, dipilih dari kecerahan warna isinya. */
function tintaUntuk(hex) {
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.6 ? "#1a1a1a" : "#ffffff";
}

/**
 * Pembungkus tanda data yang bisa disorot maupun difokus papan ketik.
 * Pemanggil wajib memberi kelas posisi (`relative` atau `absolute`) karena
 * tooltip diposisikan terhadap elemen ini; kelas posisi sengaja tidak dipasang
 * di sini agar tidak bertabrakan dengan milik pemanggil.
 *
 * Tooltip memakai `hidden`/`block`, bukan sekadar transparan, supaya saat
 * tersembunyi ia tidak ikut melebarkan area gulir halaman di layar sempit.
 */
function Petunjuk({ nilai, label, className = "", style, children }) {
  return (
    <span
      tabIndex={0}
      aria-label={`${label}: ${nilai}`}
      className={`group/tip outline-none focus-visible:ring-2 focus-visible:ring-heading/40 ${className}`}
      style={style}
    >
      {children}
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded-xs bg-heading px-2 py-1 text-[11px] leading-tight text-white shadow-sm group-hover/tip:block group-focus-visible/tip:block"
      >
        <strong className="font-semibold">{nilai}</strong>{" "}
        <span className="text-white/75">{label}</span>
      </span>
    </span>
  );
}

/** Deretan angka utama. `butir`: [{ nilai, label, keterangan? }] dalam teks jadi. */
export function KotakStatistik({ butir }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 border border-gray-200 rounded-xs overflow-hidden shadow-2xs">
      {butir.map((b) => (
        <div key={b.label} className="bg-white p-4 sm:p-5 flex flex-col">
          <span className="text-xs font-medium text-body leading-snug">{b.label}</span>
          <span className="mt-2 font-body font-semibold text-2xl sm:text-3xl text-heading leading-none">
            {b.nilai}
          </span>
          {b.keterangan && (
            <span className="mt-2 text-xs text-body/80 leading-snug">{b.keterangan}</span>
          )}
        </div>
      ))}
    </div>
  );
}

/** Legenda untuk grafik berseri lebih dari satu. `butir`: [{ label, warna }]. */
export function Legenda({ butir }) {
  return (
    <ul className="flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-body">
      {butir.map((b) => (
        <li key={b.label} className="inline-flex items-center gap-2">
          <span
            aria-hidden="true"
            className="h-2.5 w-2.5 shrink-0 rounded-xs"
            style={{ backgroundColor: b.warna }}
          />
          {b.label}
        </li>
      ))}
    </ul>
  );
}

/**
 * Batang mendatar satu seri, berskala 0–`maks` (bawaan 0–100%).
 * `butir`: [{ label, nilai, warna?, teks? }]. `teks` menggantikan label nilai
 * bawaan `${nilai}%`, misalnya untuk skor berdesimal pada skala 1–5.
 */
export function DaftarBatang({ butir, maks = 100 }) {
  return (
    <ul className="space-y-3.5">
      {butir.map((b) => {
        const warna = b.warna ?? WARNA.utama;
        const lebar = (b.nilai / maks) * 100;
        const teks = b.teks ?? `${b.nilai}%`;
        return (
          <li
            key={b.label}
            className="grid gap-1.5 sm:grid-cols-[minmax(0,14rem)_1fr] sm:items-center sm:gap-4"
          >
            <span className="text-sm text-heading leading-snug">{b.label}</span>
            {/* mr-12 menyisakan ruang label nilai bila batang mendekati 100%. */}
            <span className="relative mr-12 block h-3">
              {b.nilai > 0 && (
                <Petunjuk
                  nilai={teks}
                  label={b.label}
                  className="absolute inset-y-0 left-0 block"
                  style={{ width: `${lebar}%` }}
                >
                  <motion.span
                    variants={tumbuh}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewport}
                    className="block h-full rounded-r-sm"
                    style={{ backgroundColor: warna, transformOrigin: "left" }}
                  />
                </Petunjuk>
              )}
              <span
                className="absolute top-1/2 -translate-y-1/2 text-sm font-semibold text-heading tabular-nums whitespace-nowrap"
                style={{ left: b.nilai > 0 ? `calc(${lebar}% + 8px)` : 0 }}
              >
                {teks}
              </span>
            </span>
          </li>
        );
      })}
    </ul>
  );
}

/**
 * Batang bertumpuk 100% untuk skala berurutan.
 *
 * `skala`: [{ kunci, label, warna }] dalam urutan tampil kiri → kanan.
 * `butir`: [{ label, nilai: { [kunci]: persen } }].
 * Label angka hanya ditaruh di dalam segmen yang cukup lebar; seluruh nilai
 * tetap tertulis pada baris rincian di bawah batang.
 */
export function BatangBertumpuk({ skala, butir }) {
  return (
    <ul className="space-y-4">
      {butir.map((b) => {
        const segmen = skala
          .map((s) => ({ ...s, nilai: b.nilai[s.kunci] ?? 0 }))
          .filter((s) => s.nilai > 0);

        return (
          <li
            key={b.label}
            className="grid gap-1.5 sm:grid-cols-[minmax(0,14rem)_1fr] sm:items-start sm:gap-4"
          >
            <span className="text-sm text-heading leading-snug sm:pt-0.5">{b.label}</span>
            <div className="min-w-0">
              <motion.div
                variants={tumbuh}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                className="flex h-5 gap-0.5"
                style={{ transformOrigin: "left" }}
              >
                {segmen.map((s, i) => (
                  <Petunjuk
                    key={s.kunci}
                    nilai={`${s.nilai}%`}
                    label={s.label}
                    className={`relative flex h-full min-w-0 items-center justify-center ${
                      i === segmen.length - 1 ? "rounded-r-sm" : ""
                    }`}
                    style={{ flex: `${s.nilai} ${s.nilai} 0%`, backgroundColor: s.warna }}
                  >
                    {s.nilai >= 12 && (
                      <span
                        className="text-[11px] font-semibold tabular-nums"
                        style={{ color: tintaUntuk(s.warna) }}
                      >
                        {s.nilai}%
                      </span>
                    )}
                  </Petunjuk>
                ))}
              </motion.div>
              <p className="mt-1.5 text-xs text-body leading-snug">
                {segmen.map((s) => `${s.label} ${s.nilai}%`).join(" · ")}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
