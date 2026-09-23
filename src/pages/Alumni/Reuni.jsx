import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { FiArrowRight, FiCalendar, FiMail, FiPhone } from "react-icons/fi";
import ZoomableImg from "../../components/ui/ZoomableImg";
import GaleriGeser from "../../components/ui/GaleriGeser";
import { useT, useLanguage } from "../../i18n/languageContext";
import {
  reuniMendatang,
  narasiReuni,
  yangMenanti,
  sambutan,
  rangkaianAcara,
  kadoReuni,
  reuniTerdahulu,
  kontakReuni,
} from "../../data/alumni/reuniData";

/**
 * Foto reuni terdahulu dibaca dari folder kegiatan IKANOTSULA, sama seperti
 * galeri di halaman IKANOTSULA.
 */
const berkasKegiatan = import.meta.glob(
  "../../assets/images/ikanot/*/*.{jpg,jpeg,png,webp}",
  { eager: true, import: "default" }
);

function fotoKegiatan(folder) {
  return Object.entries(berkasKegiatan)
    .filter(([path]) => path.includes(`/ikanot/${folder}/`))
    .sort(([a], [b]) => a.localeCompare(b, "id", { numeric: true }))
    .map(([, url]) => url);
}

const viewportSettings = { once: true, amount: 0.15 };

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const lineVariants = {
  hidden: { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    originX: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

// Offset tautan jangkar agar judul seksi tidak tertutup header sticky.
const jangkar = "scroll-mt-6 lg:scroll-mt-[calc(var(--header-h)+1.5rem)]";

/** Satu seksi: judul bergaris, pengantar singkat, lalu isinya. */
function Seksi({ id, judul, pengantar, children }) {
  return (
    <motion.section
      id={id}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={viewportSettings}
      className={`space-y-6 ${id ? jangkar : ""}`}
    >
      <motion.div variants={itemVariants} className="space-y-3">
        <h2 className="text-2xl sm:text-3xl font-heading font-bold text-heading">{judul}</h2>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
          className="h-[1.5px] bg-heading mt-1 mb-3"
        />
        {pengantar && (
          <p className="text-sm sm:text-base text-body leading-relaxed">{pengantar}</p>
        )}
      </motion.div>
      {children}
    </motion.section>
  );
}

/** Label kecil berhuruf kapital, dipakai sebagai kepala kelompok isi. */
function Label({ children, className = "" }) {
  return (
    <p className={`text-[11px] font-bold tracking-[0.14em] uppercase text-primary ${className}`}>
      {children}
    </p>
  );
}

/** Tombol utama dan sekunder, selaras dengan tombol di halaman lain. */
function Tombol({ href, sekunder = false, children, ...props }) {
  return (
    <motion.a
      href={href}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={
        sekunder
          ? "inline-flex items-center gap-2 border border-primary text-primary font-semibold text-sm px-5 py-2.5 rounded-xs hover:bg-primary/5 transition-colors"
          : "inline-flex items-center gap-2 bg-btn text-white font-semibold text-sm px-5 py-2.5 rounded-xs hover:bg-primary transition-colors shadow-2xs"
      }
      {...props}
    >
      {children}
    </motion.a>
  );
}

/** Format tanggal ISO menjadi cap waktu UTC yang dipakai Google Calendar. */
function capKalender(iso) {
  return new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

/** Keadaan reuni terhadap hari ini: sisa hari, sedang berlangsung, atau selesai. */
function statusReuni(mulai, selesai) {
  const sekarang = Date.now();
  if (sekarang > new Date(selesai).getTime()) return { tahap: "selesai" };
  const sisa = Math.ceil((new Date(mulai).getTime() - sekarang) / 86_400_000);
  return sisa > 0 ? { tahap: "mendatang", sisa } : { tahap: "berlangsung" };
}

/** Nama tanpa gelar depan, untuk mengurutkan menurut abjad. */
const kunciAbjad = (nama) => nama.replace(/^((Prof|Dr|Drs|Hj?)\.\s*)+/i, "");

/**
 * Kontributor dikelompokkan per angkatan, lalu diurutkan menurut abjad di
 * dalam tiap angkatan. Tidak ada nominal maupun urutan besar-kecil.
 */
function kelompokkanKontributor(daftar) {
  const kelompok = new Map();
  [...daftar]
    .sort(
      (a, b) =>
        a.angkatan.localeCompare(b.angkatan) ||
        kunciAbjad(a.nama).localeCompare(kunciAbjad(b.nama), "id")
    )
    .forEach((k) => {
      if (!kelompok.has(k.angkatan)) kelompok.set(k.angkatan, []);
      kelompok.get(k.angkatan).push(k.nama);
    });
  return [...kelompok.entries()];
}

export default function Reuni() {
  const t = useT();
  const { lang } = useLanguage();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  const reuni = reuniMendatang;
  const status = statusReuni(reuni.mulai, reuni.selesai);

  const galeri = reuniTerdahulu
    .map((kegiatan) => {
      const namaLengkap = `${t(kegiatan.judul)} ${kegiatan.tahun}`;
      return {
        ...kegiatan,
        foto: fotoKegiatan(kegiatan.folder).map((src, idx) => ({
          src,
          alt: `${namaLengkap} — ${lang === "en" ? "photo" : "foto"} ${idx + 1}`,
          caption: `${namaLengkap} — ${lang === "en" ? "photo" : "foto"} ${idx + 1}`,
        })),
      };
    })
    .filter((kegiatan) => kegiatan.foto.length > 0);

  const fotoSampul = galeri[0]?.foto[0];
  const kontributorPerAngkatan = kelompokkanKontributor(kadoReuni.kontributor);

  const surelPendaftaran = `mailto:${kontakReuni.surel}?subject=${encodeURIComponent(
    `Pendaftaran ${reuni.nama.id}`
  )}`;
  const tautanDaftar = reuni.tautanPendaftaran || surelPendaftaran;
  const tautanKalender =
    "https://calendar.google.com/calendar/render?action=TEMPLATE" +
    `&text=${encodeURIComponent(t(reuni.nama))}` +
    `&dates=${capKalender(reuni.mulai)}/${capKalender(reuni.selesai)}` +
    `&location=${encodeURIComponent(t(reuni.detail.find((d) => d.label.id === "Tempat")?.nilai ?? ""))}` +
    `&details=${encodeURIComponent(`“${t(reuni.tema)}” — ${t({ id: "Magister Kenotariatan UNISSULA", en: "Master of Notarial Law UNISSULA" })}`)}`;

  const aksiCepat = [
    {
      judul: t({ id: "Kado Reuni Angkatan", en: "Your Reunion Gift" }),
      isi: t({
        id: "Rayakan reuni dengan kado atas nama angkatan Anda.",
        en: "Celebrate your reunion with a gift in honour of your cohort.",
      }),
      tautan: "#kado-reuni",
      teksTautan: t({ id: "Cara berkontribusi", en: "How to give" }),
    },
    {
      judul: t({ id: "Perbarui Data Alumni", en: "Update Your Details" }),
      isi: t({
        id: "Pastikan undangan dan kabar reuni sampai kepada Anda.",
        en: "Make sure reunion invitations and news reach you.",
      }),
      tautan: `mailto:${kontakReuni.surel}?subject=${encodeURIComponent("Pembaruan Data Alumni")}`,
      teksTautan: t({ id: "Kirim pembaruan", en: "Send an update" }),
    },
    {
      judul: t({ id: "Reuni Terdahulu", en: "Past Reunions" }),
      isi: t({
        id: "Terlewat reuni sebelumnya? Lihat kembali kebersamaannya.",
        en: "Missed the last one? Look back at the gathering.",
      }),
      tautan: "#reuni-terdahulu",
      teksTautan: t({ id: "Lihat galeri", en: "View gallery" }),
    },
  ];

  return (
    <>
      <Helmet>
        <title>
          {lang === "en" ? "Alumni Reunion | MKn UNISSULA" : "Reuni Alumni | MKn UNISSULA"}
        </title>
        <meta
          name="description"
          content={
            lang === "en"
              ? "Return to campus and reconnect with classmates at the Master of Notarial Law UNISSULA alumni reunion: event details, schedule, reunion gift, and past reunions."
              : "Kembali ke kampus dan bertemu teman seangkatan di Reuni Alumni Magister Kenotariatan UNISSULA: informasi acara, rangkaian kegiatan, kado reuni angkatan, dan reuni terdahulu."
          }
        />
      </Helmet>

      <div className="space-y-12 sm:space-y-16">
        {/* ── PEMBUKA ─────────────────────────────────────────────────────── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          <div className="space-y-2">
            <motion.span
              variants={itemVariants}
              className="text-xs font-bold tracking-wider uppercase text-primary block"
            >
              {t({ id: "Reuni Alumni", en: "Alumni Reunion" })}
            </motion.span>
            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-4xl lg:text-[40px] font-heading font-bold text-heading tracking-tight leading-tight"
            >
              {t({
                id: "Reuni Alumni Magister Kenotariatan UNISSULA",
                en: "Master of Notarial Law UNISSULA Alumni Reunion",
              })}
            </motion.h1>
          </div>

          <motion.div variants={lineVariants} className="w-full h-[2px] bg-primary my-4" />

          <motion.p
            variants={itemVariants}
            className="font-heading text-lg sm:text-xl text-special leading-snug"
          >
            {t({
              id: "Kembali ke kampus dan rayakan tempat perjalanan kenotariatan Anda dimulai. Bertemu lagi dengan teman seangkatan, menjalin relasi baru, dan saksikan perkembangan terbaru di Magister Kenotariatan UNISSULA.",
              en: "Return to campus and celebrate where your notarial journey began. Reconnect with classmates, build new relationships, and discover what's new at the Master of Notarial Law, UNISSULA.",
            })}
          </motion.p>

          {fotoSampul && (
            <motion.figure variants={itemVariants} className="space-y-2">
              <div className="w-full aspect-video sm:aspect-21/9 overflow-hidden rounded-md border border-gray-200 bg-gray-50">
                <ZoomableImg
                  src={fotoSampul.src}
                  alt={fotoSampul.alt}
                  caption={fotoSampul.caption}
                  className="w-full h-full object-cover"
                  eager
                />
              </div>
              <figcaption className="text-xs text-body">
                {t(galeri[0].judul)} {galeri[0].tahun}
              </figcaption>
            </motion.figure>
          )}

          {/* Tiga aksi cepat, padanan baris aksi di halaman reuni HLS */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-200 border border-gray-200 rounded-xs overflow-hidden shadow-2xs"
          >
            {aksiCepat.map((aksi) => (
              <a
                key={aksi.tautan}
                href={aksi.tautan}
                className="group bg-white p-5 flex flex-col gap-2 hover:bg-gray-50/80 transition-colors"
              >
                <span className="font-heading font-bold text-base sm:text-lg text-heading leading-snug">
                  {aksi.judul}
                </span>
                <span className="text-xs sm:text-sm text-body leading-relaxed flex-1">
                  {aksi.isi}
                </span>
                <span className="inline-flex items-center gap-1.5 text-primary font-semibold text-xs sm:text-sm pt-1">
                  <span className="group-hover:underline">{aksi.teksTautan}</span>
                  <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                </span>
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* ── REUNI MENDATANG ─────────────────────────────────────────────── */}
        <Seksi
          id="reuni-mendatang"
          judul={t(reuni.nama)}
          pengantar={
            <>
              {t({ id: "Mengusung tema", en: "Under the theme" })}{" "}
              <span className="font-heading italic text-special">“{t(reuni.tema)}”</span>.{" "}
              {t({
                id: `Tahun ini kami merayakan secara khusus angkatan ${reuni.angkatanLustrum.join(", ")} — lima belas, sepuluh, dan lima tahun bersama keluarga besar MKn UNISSULA.`,
                en: `This year we give special recognition to the cohorts of ${reuni.angkatanLustrum.join(", ")} — fifteen, ten, and five years in the MKn UNISSULA family.`,
              })}
            </>
          }
        >
          <motion.dl
            variants={itemVariants}
            className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 border border-gray-200 rounded-xs overflow-hidden shadow-2xs"
          >
            {reuni.detail.map((d) => (
              <div key={d.label.id} className="bg-white p-4 sm:p-5">
                <dt className="text-xs font-medium text-body">{t(d.label)}</dt>
                <dd className="mt-1.5 font-semibold text-sm sm:text-base text-heading leading-snug">
                  {t(d.nilai)}
                </dd>
              </div>
            ))}
          </motion.dl>

          <motion.div variants={itemVariants} className="grid gap-8 md:grid-cols-2">
            <div>
              <Label className="pb-2 mb-1 border-b border-gray-200">
                {t({ id: "Tanggal Penting", en: "Key Dates" })}
              </Label>
              <ul className="divide-y divide-gray-100 text-sm">
                {reuni.tanggalPenting.map((tp) => (
                  <li key={tp.label.id} className="py-2.5 flex items-baseline justify-between gap-4">
                    <span className="text-body">{t(tp.label)}</span>
                    <span className="font-semibold text-heading text-right tabular-nums">
                      {t(tp.tanggal)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <Label className="pb-2 mb-3 border-b border-gray-200">
                {t({ id: "Biaya Pendaftaran", en: "Registration Fee" })}
              </Label>
              <p className="font-heading font-bold text-2xl text-heading">
                {reuni.biaya.nilai}{" "}
                <span className="font-body font-normal text-sm text-body">
                  {t(reuni.biaya.satuan)}
                </span>
              </p>
              <p className="text-xs sm:text-sm text-body leading-relaxed mt-1">
                {t(reuni.biaya.keterangan)}
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-3 pt-5 border-t border-gray-200"
          >
            {status.tahap === "selesai" ? (
              <p className="text-sm text-body">
                {t({
                  id: "Reuni ini telah berlangsung. Terima kasih kepada seluruh alumni yang hadir.",
                  en: "This reunion has taken place. Thank you to everyone who joined us.",
                })}
              </p>
            ) : (
              <>
                <Tombol
                  href={tautanDaftar}
                  {...(reuni.tautanPendaftaran && { target: "_blank", rel: "noopener noreferrer" })}
                >
                  {t({ id: "Daftar Reuni", en: "Register" })}
                  <FiArrowRight />
                </Tombol>
                <Tombol href={tautanKalender} sekunder target="_blank" rel="noopener noreferrer">
                  <FiCalendar />
                  {t({ id: "Simpan ke Kalender", en: "Add to Calendar" })}
                </Tombol>
                <span className="text-xs sm:text-sm text-body sm:ml-auto">
                  {status.tahap === "berlangsung"
                    ? t({ id: "Reuni sedang berlangsung hari ini.", en: "The reunion is happening today." })
                    : t({
                        id: `${status.sisa} hari lagi menuju reuni.`,
                        en: `${status.sisa} ${status.sisa === 1 ? "day" : "days"} to go.`,
                      })}
                </span>
              </>
            )}
          </motion.div>
        </Seksi>

        {/* ── MENYAMBUNG KEMBALI ──────────────────────────────────────────── */}
        <Seksi judul={t({ id: "Menyambung Kembali, Merayakan Bersama", en: "Reconnect. Celebrate." })}>
          <motion.div
            variants={itemVariants}
            className="space-y-4 text-sm sm:text-base text-body leading-relaxed"
          >
            {narasiReuni.map((paragraf) => (
              <p key={paragraf.id}>{t(paragraf)}</p>
            ))}
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="font-heading font-bold text-lg sm:text-xl text-heading mb-3">
              {t({ id: "Yang Menanti Anda", en: "What to Expect" })}
            </h3>
            <ul className="grid gap-x-8 sm:grid-cols-2 text-sm sm:text-base text-body">
              {yangMenanti.map((butir) => (
                <li
                  key={butir.id}
                  className="flex gap-3 py-2.5 border-b border-gray-100 leading-relaxed"
                >
                  <span aria-hidden="true" className="mt-[0.6em] h-1.5 w-1.5 shrink-0 bg-primary" />
                  {t(butir)}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.blockquote
            variants={itemVariants}
            className="border-l-4 border-primary pl-6 py-3 bg-white/50 rounded-r-lg shadow-2xs"
          >
            <p className="font-heading italic text-lg sm:text-xl md:text-2xl text-special leading-snug">
              “{t(sambutan.teks)}”
            </p>
            <footer className="text-xs sm:text-sm text-body mt-4">
              <span className="block font-semibold text-heading">{sambutan.penulis}</span>
              {t(sambutan.jabatan)}
            </footer>
          </motion.blockquote>
        </Seksi>

        {/* ── RANGKAIAN ACARA ─────────────────────────────────────────────── */}
        <Seksi
          judul={t({ id: "Rangkaian Acara", en: "Programme" })}
          pengantar={t({
            id: "Susunan acara dapat berubah; pembaruan akan disampaikan kepada peserta terdaftar.",
            en: "The programme may change; updates will be shared with registered attendees.",
          })}
        >
          <motion.div
            variants={itemVariants}
            className="overflow-x-auto bg-white rounded-lg border border-gray-200 shadow-2xs"
          >
            <table className="w-full text-left border-collapse min-w-[520px]">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 text-[11px] font-bold tracking-[0.14em] uppercase text-heading">
                  <th className="py-3 px-4 w-36">{t({ id: "Waktu", en: "Time" })}</th>
                  <th className="py-3 px-4">{t({ id: "Acara", en: "Session" })}</th>
                  <th className="py-3 px-4 w-5/12">{t({ id: "Keterangan", en: "Details" })}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-xs sm:text-sm">
                {rangkaianAcara.map((baris) => (
                  <tr key={baris.waktu} className="hover:bg-gray-50/60 transition-colors">
                    <td className="py-3.5 px-4 text-body align-top tabular-nums whitespace-nowrap">
                      {baris.waktu}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-heading align-top">
                      {t(baris.acara)}
                    </td>
                    <td className="py-3.5 px-4 text-body align-top">
                      {baris.keterangan ? t(baris.keterangan) : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </Seksi>

        {/* ── KADO REUNI ANGKATAN ─────────────────────────────────────────── */}
        <Seksi
          id="kado-reuni"
          judul={t({ id: "Kado Reuni Angkatan", en: "Reunion Gift" })}
          pengantar={t(kadoReuni.pengantar)}
        >
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-200 border border-gray-200 rounded-xs overflow-hidden shadow-2xs"
          >
            {kadoReuni.peruntukan.map((p) => (
              <div key={p.judul.id} className="bg-white p-5">
                <h3 className="font-heading font-bold text-base text-heading leading-snug">
                  {t(p.judul)}
                </h3>
                <p className="text-xs sm:text-sm text-body leading-relaxed mt-1.5">{t(p.isi)}</p>
              </div>
            ))}
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="p-5 sm:p-6 border-l-3 border-l-primary border border-gray-200 bg-gray-50/70 rounded-xs space-y-3"
          >
            <p className="text-sm text-body leading-relaxed">{t(kadoReuni.caraBerkontribusi)}</p>
            <a
              href={`mailto:${kontakReuni.surel}?subject=${encodeURIComponent("Kado Reuni Angkatan")}`}
              className="inline-flex items-center gap-1.5 text-primary hover:text-btn font-semibold text-xs sm:text-sm group"
            >
              <FiMail />
              <span className="group-hover:underline">{kontakReuni.surel}</span>
            </a>
          </motion.div>

          {kontributorPerAngkatan.length > 0 && (
            <motion.div variants={itemVariants} className="space-y-4 pt-2">
              <div>
                <h3 className="font-heading font-bold text-lg sm:text-xl text-heading">
                  {t({ id: "Dengan Terima Kasih", en: "With Gratitude" })}
                </h3>
                <p className="text-xs sm:text-sm text-body leading-relaxed mt-1">
                  {t({
                    id: "Kepada para alumni yang telah memberikan kado reuni. Nama disusun menurut angkatan dan abjad.",
                    en: "To the alumni who have made a reunion gift. Names are listed by cohort and in alphabetical order.",
                  })}
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg shadow-2xs p-5 sm:p-6 columns-1 sm:columns-2 xl:columns-3 gap-8">
                {kontributorPerAngkatan.map(([angkatan, daftarNama]) => (
                  <div key={angkatan} className="break-inside-avoid mb-5 last:mb-0">
                    <Label className="mb-1.5">
                      {t({ id: `Angkatan ${angkatan}`, en: `Class of ${angkatan}` })}
                    </Label>
                    <ul className="space-y-1 text-sm text-heading">
                      {daftarNama.map((nama) => (
                        <li key={nama}>{nama}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </Seksi>

        {/* ── REUNI TERDAHULU ─────────────────────────────────────────────── */}
        {galeri.length > 0 && (
          <Seksi
            id="reuni-terdahulu"
            judul={t({ id: "Reuni Terdahulu", en: "Past Reunions" })}
            pengantar={t({
              id: "Terlewat reuni sebelumnya, atau ingin melihat suasananya? Berikut kebersamaan alumni dari tahun-tahun lalu.",
              en: "Missed a reunion, or curious what it's like? Here are alumni gatherings from past years.",
            })}
          >
            {galeri.map((kegiatan) => (
              <motion.div key={kegiatan.folder} variants={itemVariants} className="space-y-4">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 pb-2 border-b border-gray-200">
                  <h3 className="font-heading font-bold text-lg sm:text-xl text-heading leading-snug">
                    {t(kegiatan.judul)}
                  </h3>
                  <span className="text-[11px] font-bold tracking-wider text-primary uppercase bg-red-50 border border-primary/20 px-2 py-0.5 rounded-xs tabular-nums">
                    {kegiatan.tahun}
                  </span>
                  <span className="text-xs text-gray-400 ml-auto tabular-nums">
                    {kegiatan.foto.length} {lang === "en" ? "photos" : "foto"}
                  </span>
                </div>
                <GaleriGeser
                  foto={kegiatan.foto}
                  ariaLabel={`${t({ id: "Galeri", en: "Gallery" })} ${t(kegiatan.judul)} ${kegiatan.tahun}`}
                  otomatis={false}
                  tampilkanJudul={false}
                  kelasTrek="gap-4"
                  kelasBasis="basis-full sm:basis-[calc((100%-1rem)/2)] md:basis-[calc((100%-2rem)/3)]"
                  kelasKartu="aspect-[4/3] rounded-md border border-gray-200 shadow-2xs"
                />
              </motion.div>
            ))}
          </Seksi>
        )}

        {/* ── KONTAK ──────────────────────────────────────────────────────── */}
        <Seksi
          judul={t({ id: "Ada Pertanyaan?", en: "Questions?" })}
          pengantar={t({
            id: "Kami menantikan kehadiran Anda. Untuk pertanyaan seputar reuni, atau bila Anda bersedia menjadi penghubung angkatan yang membantu mengajak teman seangkatan, silakan hubungi sekretariat.",
            en: "We look forward to welcoming you back. For questions about the reunion, or if you would like to serve as a cohort liaison and help bring your classmates together, please contact the secretariat.",
          })}
        >
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-x-8 gap-y-3 text-sm pt-1"
          >
            <a
              href={`mailto:${kontakReuni.surel}`}
              className="inline-flex items-center gap-2 text-heading hover:text-primary font-semibold transition-colors"
            >
              <FiMail className="text-primary" />
              {kontakReuni.surel}
            </a>
            {kontakReuni.telepon.map((tel) => (
              <a
                key={tel.href}
                href={tel.href}
                className="inline-flex items-center gap-2 text-heading hover:text-primary font-semibold transition-colors tabular-nums"
              >
                <FiPhone className="text-primary" />
                {tel.tampilan}
              </a>
            ))}
          </motion.div>
        </Seksi>
      </div>
    </>
  );
}
