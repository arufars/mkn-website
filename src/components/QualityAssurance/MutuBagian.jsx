import { lazy, Suspense, useState } from "react";
import { FiDownload, FiBookOpen } from "react-icons/fi";
import { useT } from "../../i18n/languageContext";
import { motion } from "framer-motion";

// Pembaca PDF membawa pdf.js; dimuat hanya ketika tombol Baca ditekan.
const FlipbookModal = lazy(() => import("../ui/FlipbookModal"));

/**
 * Potongan tampilan bersama untuk menu Penjaminan Mutu.
 *
 * Seluruh dokumen mutu memakai pola yang sama: berkode, bertahap PPEPP, dan
 * selalu menyebut identitas dokumen (kode, revisi, tanggal). Komponen di sini
 * menjaga kelima halaman tampil seragam.
 */

// Shared animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const itemVariant = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const rowVariant = {
  hidden: { opacity: 0, x: -14 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Kepala halaman: eyebrow, judul, garis, dan pengantar. */
export function KepalaMutu({ eyebrow = "PENJAMINAN MUTU", judul, pengantar }) {
  const t = useT();
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={staggerContainer}
    >
      <motion.span
        variants={fadeUp}
        className="text-[11px] font-bold tracking-[0.16em] uppercase text-primary block mb-2"
      >
        {t(eyebrow)}
      </motion.span>
      <motion.h1
        variants={fadeUp}
        className="text-3xl sm:text-4xl md:text-[42px] font-heading font-bold text-heading tracking-normal"
      >
        {t(judul)}
      </motion.h1>
      <motion.div
        variants={{
          hidden: { scaleX: 0, originX: 0 },
          visible: {
            scaleX: 1,
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 },
          },
        }}
        className="w-full h-[2px] bg-primary mt-4 mb-5"
      />
      {pengantar && (
        <motion.p
          variants={fadeUp}
          className="text-sm sm:text-base text-body text-justify leading-relaxed"
        >
          {t(pengantar)}
        </motion.p>
      )}
    </motion.div>
  );
}

/** Judul seksi dengan garis bawah tipis. */
export function JudulMutu({ judul, keterangan }) {
  const t = useT();
  return (
    <motion.div
      className="space-y-2"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={staggerContainer}
    >
      <motion.h2
        variants={fadeUp}
        className="text-xl sm:text-2xl font-heading font-semibold text-heading tracking-normal"
      >
        {t(judul)}
      </motion.h2>
      <motion.div
        variants={{
          hidden: { scaleX: 0, originX: 0 },
          visible: {
            scaleX: 1,
            transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
          },
        }}
        className="w-full h-[1.5px] bg-heading"
      />
      {keterangan && (
        <motion.p
          variants={fadeUp}
          className="text-sm sm:text-base text-body text-justify leading-relaxed pt-2"
        >
          {t(keterangan)}
        </motion.p>
      )}
    </motion.div>
  );
}

/** Angka kunci pada kepala halaman ikhtisar. */
export function AngkaMutu({ butir }) {
  const t = useT();
  return (
    <motion.div
      className="grid grid-cols-2 lg:grid-cols-4 border-t border-l border-gray-200 bg-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={staggerContainer}
    >
      {butir.map((b, idx) => (
        <motion.div
          key={idx}
          variants={itemVariant}
          className="p-5 sm:p-6 border-r border-b border-gray-200"
        >
          <div className="font-heading font-bold text-2xl sm:text-3xl text-primary leading-none">
            {t(b.value)}
          </div>
          <p className="mt-2 text-[11px] font-semibold tracking-wider uppercase text-gray-500 leading-snug">
            {t(b.label)}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
}

/**
 * Tabel identitas dokumen — label di kiri, nilai di kanan.
 */
export function IdentitasDokumen({ baris }) {
  const t = useT();
  return (
    <motion.div
      className="border border-gray-200 bg-white rounded-xs overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={staggerContainer}
    >
      <table className="w-full text-left border-collapse text-sm">
        <tbody className="divide-y divide-gray-200">
          {baris.map((b, idx) => (
            <motion.tr key={idx} variants={rowVariant}>
              <th
                scope="row"
                className="align-top py-3 px-4 sm:px-5 w-2/5 sm:w-1/3 bg-gray-50/70 font-semibold text-heading text-xs sm:text-sm"
              >
                {t(b.label)}
              </th>
              <td className="py-3 px-4 sm:px-5 text-body leading-relaxed">{t(b.value)}</td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}

/**
 * Daftar dokumen berkode.
 *
 * Berkas yang belum diunggah (`fileUrl` kosong) menampilkan keadaan tidak
 * aktif, bukan tautan mati.
 */
export function DaftarDokumen({ butir }) {
  const t = useT();
  // Dokumen yang sedang dibuka di pembaca layar penuh; null berarti tertutup.
  const [dokumenDibaca, setDokumenDibaca] = useState(null);

  return (
    <motion.div
      className="space-y-3"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={staggerContainer}
    >
      {butir.map((d, idx) => (
        <motion.div
          key={idx}
          variants={itemVariant}
          whileHover={{ y: -2, transition: { duration: 0.2 } }}
          className="bg-white border border-gray-200 rounded-xs p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-8 hover:border-gray-300 transition-colors shadow-2xs"
        >
          <div className="space-y-1.5 min-w-0 flex-1">
            <span className="font-mono text-[11px] text-primary tracking-wide block">
              {d.code}
            </span>
            <h3 className="font-heading font-semibold text-[15px] sm:text-base text-heading leading-snug">
              {t(d.title)}
            </h3>
            {d.meta && <p className="text-xs text-gray-500 leading-relaxed">{t(d.meta)}</p>}
          </div>

          <div className="shrink-0 flex items-center gap-2">
            {/*
              Tombol baca hanya muncul untuk dokumen yang ditandai `flipbook`.
              Pembacanya berat (pdf.js ± 300 KB gzip), jadi jangan dinyalakan
              untuk berkas yang lazimnya cukup diunduh lalu dicetak.
            */}
            {d.fileUrl && d.flipbook && (
              <button
                type="button"
                onClick={() => setDokumenDibaca(d)}
                className="inline-flex items-center justify-center gap-2 px-5 py-2 bg-primary border border-primary hover:bg-[#570000] hover:border-[#570000] text-white rounded-xs text-xs font-semibold transition-colors shadow-2xs cursor-pointer"
              >
                <span>{t({ id: "Baca", en: "Read" })}</span>
                <FiBookOpen className="text-sm" />
              </button>
            )}

            {d.fileUrl ? (
              <a
                href={d.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2 bg-white border border-gray-300 hover:border-primary hover:bg-primary hover:text-white text-heading rounded-xs text-xs font-semibold transition-colors shadow-2xs"
              >
                <span>{t({ id: "Unduh", en: "Download" })}</span>
                <FiDownload className="text-sm" />
              </a>
            ) : (
              <span className="inline-flex items-center justify-center px-5 py-2 border border-dashed border-gray-300 bg-gray-50 text-gray-400 rounded-xs text-xs font-semibold cursor-not-allowed select-none">
                {t({ id: "Belum diunggah", en: "Not yet uploaded" })}
              </span>
            )}
          </div>
        </motion.div>
      ))}

      {dokumenDibaca && (
        <Suspense fallback={null}>
          <FlipbookModal
            fileUrl={dokumenDibaca.fileUrl}
            judul={t(dokumenDibaca.title)}
            onClose={() => setDokumenDibaca(null)}
          />
        </Suspense>
      )}
    </motion.div>
  );
}

/** Kartu bernomor/berkode — dipakai untuk asas, prinsip, dan tahap siklus. */
export function KartuMutu({ butir, kolom = 3 }) {
  const t = useT();
  const grid =
    kolom === 2
      ? "sm:grid-cols-2"
      : kolom === 4
      ? "sm:grid-cols-2 lg:grid-cols-4"
      : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <motion.div
      className={`grid grid-cols-1 ${grid} gap-5`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={staggerContainer}
    >
      {butir.map((b, idx) => (
        <motion.div
          key={idx}
          variants={itemVariant}
          whileHover={{ y: -3, scale: 1.01, transition: { duration: 0.2 } }}
          className="bg-white border border-gray-200 rounded-xs p-5 sm:p-6 space-y-3 hover:border-primary/40 transition-colors shadow-2xs"
        >
          {b.code && (
            <span className="inline-flex items-center justify-center min-w-9 h-9 px-2.5 rounded-xs bg-primary/10 text-primary font-heading font-bold text-sm">
              {b.code}
            </span>
          )}
          <h3 className="font-heading font-semibold text-base text-heading leading-snug">
            {t(b.title || b.stage)}
          </h3>
          {b.desc && <p className="text-sm text-body leading-relaxed">{t(b.desc)}</p>}
          {b.ayat && (
            <p className="text-xs text-gray-500 leading-relaxed pt-1 border-t border-gray-100">
              {b.ayat}
            </p>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
}

/** Daftar bernomor sederhana. */
export function DaftarNomor({ butir }) {
  const t = useT();
  return (
    <motion.ol
      className="space-y-2.5"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={staggerContainer}
    >
      {butir.map((b, idx) => (
        <motion.li
          key={idx}
          variants={rowVariant}
          className="flex gap-3 text-sm sm:text-[15px] text-body leading-relaxed"
        >
          <span className="shrink-0 tabular-nums text-gray-400 select-none min-w-[1.75rem]">
            {idx + 1}.
          </span>
          <span>{t(b)}</span>
        </motion.li>
      ))}
    </motion.ol>
  );
}

/**
 * Tabel teks sederhana. `kolom`: [{ id, en }] judul kolom; `baris`: larik sel
 * per baris, tiap sel berupa { id, en }. Sel pertama dicetak tebal.
 */
export function TabelMutu({ kolom, baris }) {
  const t = useT();
  return (
    <div className="border border-gray-200 bg-white rounded-xs overflow-x-auto">
      <table className="w-full text-left border-collapse text-sm">
        <thead>
          <tr className="border-b-2 border-heading text-[11px] font-bold tracking-wider uppercase text-heading">
            {kolom.map((k) => (
              <th key={k.id} className="py-3 px-3 sm:px-4 align-bottom">
                {t(k)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {baris.map((sel, idx) => (
            <tr key={idx}>
              {sel.map((s, i) => (
                <td
                  key={i}
                  className={`py-3 px-3 sm:px-4 align-top leading-relaxed min-w-40 ${
                    i === 0 ? "font-medium text-heading" : "text-body"
                  }`}
                >
                  {t(s)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * Kartu rencana tindak lanjut hasil survei.
 * `butir`: [{ temuan, tindakan, penanggungJawab, tenggat }]; bila `tenggat`
 * null (kosong di laporan), barisnya tidak ditampilkan.
 */
export function DaftarTindakLanjut({ butir }) {
  const t = useT();
  return (
    <motion.ol
      className="space-y-4"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={staggerContainer}
    >
      {butir.map((x, idx) => (
        <motion.li
          key={x.temuan.id}
          variants={itemVariant}
          className="bg-white border border-gray-200 rounded-xs p-5 sm:p-6 shadow-2xs"
        >
          <p className="flex gap-3 font-medium text-heading leading-snug">
            <span className="shrink-0 tabular-nums text-primary">{idx + 1}.</span>
            <span>{t(x.temuan)}</span>
          </p>
          <dl className={`mt-4 grid gap-3 text-sm ${x.tenggat ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
            <div>
              <dt className="text-xs font-semibold text-heading">
                {t({ id: "Tindakan", en: "Action" })}
              </dt>
              <dd className="mt-0.5 text-body leading-relaxed">{t(x.tindakan)}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold text-heading">
                {t({ id: "Penanggung jawab", en: "Responsible" })}
              </dt>
              <dd className="mt-0.5 text-body leading-relaxed">{t(x.penanggungJawab)}</dd>
            </div>
            {x.tenggat && (
              <div>
                <dt className="text-xs font-semibold text-heading">
                  {t({ id: "Tenggat dan indikator", en: "Deadline and indicator" })}
                </dt>
                <dd className="mt-0.5 text-body leading-relaxed">{t(x.tenggat)}</dd>
              </div>
            )}
          </dl>
        </motion.li>
      ))}
    </motion.ol>
  );
}

/** Blok placeholder untuk halaman yang dokumennya belum diterima. */
export function BelumTersedia({ keterangan }) {
  const t = useT();
  return (
    <motion.div
      className="border border-dashed border-gray-300 bg-white p-10 sm:p-14 text-center rounded-xs"
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className="text-sm font-medium text-gray-500">
        {t({
          id: "Konten akan segera ditambahkan.",
          en: "Content will be added soon.",
        })}
      </p>
      {keterangan && (
        <p className="mt-1.5 text-xs text-gray-400 max-w-lg mx-auto leading-relaxed">
          {t(keterangan)}
        </p>
      )}
    </motion.div>
  );
}
