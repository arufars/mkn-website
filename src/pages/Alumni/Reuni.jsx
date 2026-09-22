import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import GaleriGeser from "../../components/ui/GaleriGeser";
import { useT, useLanguage } from "../../i18n/languageContext";

// ─── Glob foto dari folder ikanot (dummy untuk reuni) ─────────────────────────
const berkasReuni = import.meta.glob(
  "../../assets/images/ikanot/*/*.{jpg,jpeg,png,webp}",
  { eager: true, import: "default" }
);

function fotoGaleri(folder) {
  return Object.entries(berkasReuni)
    .filter(([path]) => path.includes(`/ikanot/${folder}/`))
    .sort(([a], [b]) => a.localeCompare(b, "id", { numeric: true }))
    .map(([, url]) => url);
}

// ─── Motion Variants (mengikuti pola Ikanotsula) ──────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: typeof i === "number" ? i * 0.12 : 0,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: typeof i === "number" ? i * 0.12 : 0,
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

// ─── Data Dummy ────────────────────────────────────────────────────────────────

const reuniData = {
  title: "Reuni Akbar Alumni MKn UNISSULA 2025",
  category: { id: "REUNI ALUMNI", en: "ALUMNI REUNION" },
  meta: [
    {
      label: { id: "Tanggal Pelaksanaan", en: "Event Date" },
      value: { id: "20 Desember 2025", en: "December 20, 2025" },
    },
    {
      label: { id: "Lokasi", en: "Venue" },
      value: "Ballroom Hotel Grand Candi, Semarang",
    },
    {
      label: { id: "Tema", en: "Theme" },
      value: {
        id: "\"Bersatu dalam Ikatan, Berkarya untuk Bangsa\"",
        en: "\"United in Bond, Contributing to the Nation\"",
      },
    },
    {
      label: { id: "Peserta", en: "Participants" },
      value: { id: "Seluruh Angkatan (2010–2025)", en: "All Cohorts (2010–2025)" },
    },
  ],
  targetReuni: new Date("2025-12-20T08:00:00"),
  sambutan: {
    teks: {
      id: "Reuni ini bukan sekadar pertemuan. Ini adalah momen kita merajut kembali tali persaudaraan yang telah terjalin selama bertahun-tahun di bangku kuliah, memperkuat jejaring profesi yang telah kita bangun bersama, dan menghidupkan kembali semangat Khaira Ummah yang menjadi landasan kita sebagai alumni Magister Kenotariatan UNISSULA. Mari kita jadikan momen ini sebagai titik tolak kebangkitan bersama.",
      en: "This reunion is not merely a gathering. It is a moment to reweave the bonds of brotherhood forged over years of study together, to strengthen the professional networks we have built, and to reignite the spirit of Khaira Ummah that forms our foundation as alumni of the Master of Notarial Law UNISSULA. Let us make this moment a starting point for collective resurgence.",
    },
    penulis: "Fatiroh, S.H., M.Hum., M.Kn.",
    jabatan: { id: "Ketua Panitia Reuni Akbar 2025", en: "Chairperson, Grand Reunion 2025 Committee" },
  },
  targetDonasi: 150000000,
  terkumpul: 97500000,
  donatur: [
    { peringkat: 1, nama: "Dr. Agus Wijayanto, S.H., M.Kn.", angkatan: "2012", nominal: 10000000, keterangan: { id: "Semoga reuni ini membawa manfaat", en: "May this reunion be beneficial" } },
    { peringkat: 2, nama: "Frans Ferbianto, S.H., M.Kn.", angkatan: "2014", nominal: 7500000, keterangan: { id: "Bangga menjadi alumni MKn UNISSULA", en: "Proud to be an MKn UNISSULA alumnus" } },
    { peringkat: 3, nama: "Dr. Rahardian Ayu Saputri, S.H., M.Kn.", angkatan: "2013", nominal: 6000000, keterangan: { id: "Untuk generasi penerus yang lebih baik", en: "For a better next generation" } },
    { peringkat: 4, nama: "Eka Hendra Muspiyanto, S.H., M.Kn.", angkatan: "2015", nominal: 5000000, keterangan: { id: "Semangat almamater!", en: "Alma mater spirit!" } },
    { peringkat: 5, nama: "Laeli Nurchamidah, S.H., M.Kn.", angkatan: "2016", nominal: 4500000, keterangan: { id: "Dukung reuni akbar kita", en: "Support our grand reunion" } },
    { peringkat: 6, nama: "Widyawati, S.H., M.Kn.", angkatan: "2017", nominal: 3500000, keterangan: { id: "Semoga lancar dan berkesan", en: "Hope it goes smoothly and memorably" } },
    { peringkat: 7, nama: "Rustiana Apri Setiaji, S.H., M.Kn.", angkatan: "2018", nominal: 3000000, keterangan: { id: "Kontribusi kecil untuk acara besar", en: "A small contribution for a grand event" } },
    { peringkat: 8, nama: "Nurchasanah, S.H., M.Kn.", angkatan: "2019", nominal: 2500000, keterangan: { id: "Alumni peduli sesama alumni", en: "Alumni caring for fellow alumni" } },
    { peringkat: 9, nama: "Mauliwati Alifah, S.H., M.Kn.", angkatan: "2020", nominal: 2000000, keterangan: { id: "Untuk kebersamaan kita", en: "For our togetherness" } },
    { peringkat: 10, nama: "Ikayanti, S.H., M.Kn.", angkatan: "2021", nominal: 1500000, keterangan: { id: "Semoga sukses reuni akbarnya", en: "Hope the grand reunion is a success" } },
  ],
  rundown: [
    { waktu: "07.00 – 08.00", kegiatan: { id: "Registrasi Peserta & Welcome Drink", en: "Participant Registration & Welcome Drink" }, keterangan: { id: "Lobi Ballroom Hotel Grand Candi", en: "Grand Candi Hotel Ballroom Lobby" } },
    { waktu: "08.00 – 08.30", kegiatan: { id: "Pembukaan & Doa Bersama", en: "Opening & Prayer" }, keterangan: { id: "MC: Moch. Nur Ali Zamroni, S.H., M.Kn.", en: "MC: Moch. Nur Ali Zamroni, S.H., M.Kn." } },
    { waktu: "08.30 – 09.00", kegiatan: { id: "Menyanyikan Lagu Indonesia Raya & Mars UNISSULA", en: "Indonesian National Anthem & UNISSULA March" }, keterangan: { id: "Seluruh peserta", en: "All participants" } },
    { waktu: "09.00 – 09.30", kegiatan: { id: "Sambutan Ketua Panitia Reuni", en: "Chairperson's Welcome Speech" }, keterangan: { id: "Fatiroh, S.H., M.Hum., M.Kn.", en: "Fatiroh, S.H., M.Hum., M.Kn." } },
    { waktu: "09.30 – 10.00", kegiatan: { id: "Sambutan Dekan Fakultas Hukum UNISSULA", en: "Dean's Welcome Address" }, keterangan: { id: "Prof. Dr. H. Gunarto, S.H., M.H.", en: "Prof. Dr. H. Gunarto, S.H., M.H." } },
    { waktu: "10.00 – 11.00", kegiatan: { id: "Talkshow: \"Peluang dan Tantangan Notaris di Era Digital\"", en: "Talkshow: \"Opportunities & Challenges of Notaries in the Digital Era\"" }, keterangan: { id: "Narasumber: Dr. Habib Adjie, S.H., M.Hum.", en: "Speaker: Dr. Habib Adjie, S.H., M.Hum." } },
    { waktu: "11.00 – 12.30", kegiatan: { id: "Sesi Foto Bersama per Angkatan", en: "Group Photo Session by Cohort" }, keterangan: { id: "Halaman depan hotel", en: "Hotel front yard" } },
    { waktu: "12.30 – 13.30", kegiatan: { id: "Makan Siang & Ramah Tamah", en: "Lunch & Fellowship" }, keterangan: { id: "Ballroom utama — prasmanan", en: "Main ballroom — buffet" } },
    { waktu: "13.30 – 15.00", kegiatan: { id: "Penyerahan Penghargaan Alumni Berprestasi", en: "Outstanding Alumni Award Ceremony" }, keterangan: { id: "5 kategori penghargaan", en: "5 award categories" } },
    { waktu: "15.00 – 15.30", kegiatan: { id: "Shalat Ashar Berjamaah", en: "Asr Prayer" }, keterangan: { id: "Musholla Hotel Grand Candi", en: "Grand Candi Hotel Prayer Room" } },
    { waktu: "15.30 – 17.00", kegiatan: { id: "Hiburan & Lelang Amal", en: "Entertainment & Charity Auction" }, keterangan: { id: "Penampilan seni & musik alumni", en: "Alumni arts & music performances" } },
    { waktu: "17.00 – 17.30", kegiatan: { id: "Penutupan & Doa", en: "Closing & Prayer" }, keterangan: { id: "MC: Nur Sofiatun, S.H., M.Kn.", en: "MC: Nur Sofiatun, S.H., M.Kn." } },
  ],
  penghargaan: [
    { kategori: { id: "Alumni Inspiratif", en: "Inspirational Alumni" }, penerima: "Dr. Agus Wijayanto, S.H., M.Kn.", angkatan: "2012" },
    { kategori: { id: "Notaris Berprestasi", en: "Outstanding Notary" }, penerima: "Dr. Dwi Pratiwi Markus, S.H., M.Kn.", angkatan: "2013" },
    { kategori: { id: "Kontributor IKANOTSULA Terbaik", en: "Best IKANOTSULA Contributor" }, penerima: "Frans Ferbianto, S.H., M.Kn.", angkatan: "2014" },
    { kategori: { id: "Alumni Pengabdi Masyarakat", en: "Community Service Alumni" }, penerima: "Nurchasanah, S.H., M.Kn.", angkatan: "2018" },
    { kategori: { id: "Generasi Muda Berprestasi", en: "Outstanding Young Generation" }, penerima: "Mauliwati Alifah, S.H., M.Kn.", angkatan: "2021" },
  ],
  summary: [
    { number: "15+", label: { id: "Angkatan Alumni", en: "Alumni Cohorts" } },
    { number: "500+", label: { id: "Peserta Terdaftar", en: "Registered Participants" } },
    { number: "Rp 150 Jt", label: { id: "Target Dana Reuni", en: "Reunion Fund Target" } },
  ],
  galeri: [
    {
      judul: { id: "Dialog Alumni & Reuni Angkatan", en: "Alumni Dialogue & Cohort Reunion" },
      tahun: "2025",
      folder: "reuni-2025",
    },
    {
      judul: { id: "Halal Bihalal IKANOTSULA", en: "IKANOTSULA Halal Bihalal" },
      tahun: "2026",
      folder: "halal-bihalal-2026",
    },
    {
      judul: { id: "Jalan Sehat & Silaturahmi Alumni", en: "Health Walk & Alumni Gathering" },
      tahun: "2024",
      folder: "jalan-sehat-2024",
    },
    {
      judul: { id: "Pelantikan Pengurus IKANOTSULA", en: "IKANOTSULA Board Inauguration" },
      tahun: "2024",
      folder: "pelantikan-2024",
    },
  ],
};

// ─── Countdown Hook ────────────────────────────────────────────────────────────

function useCountdown(targetDate) {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(targetDate));

  function getTimeLeft(target) {
    const diff = target - Date.now();
    if (diff <= 0) return { hari: 0, jam: 0, menit: 0, detik: 0, selesai: true };
    return {
      hari: Math.floor(diff / (1000 * 60 * 60 * 24)),
      jam: Math.floor((diff / (1000 * 60 * 60)) % 24),
      menit: Math.floor((diff / (1000 * 60)) % 60),
      detik: Math.floor((diff / 1000) % 60),
      selesai: false,
    };
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return timeLeft;
}

// ─── Sub-komponen: Countdown Box ──────────────────────────────────────────────

function CountdownBox({ value, label }) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -3 }}
      className="flex flex-col items-center justify-center bg-white border border-gray-200 rounded-lg p-4 sm:p-6 shadow-2xs hover:border-primary/40 hover:shadow-md transition-all min-w-[80px]"
    >
      <span className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-primary tabular-nums leading-none">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-[10px] sm:text-xs text-body font-bold uppercase tracking-widest mt-2">
        {label}
      </span>
    </motion.div>
  );
}

// ─── Sub-komponen: Progress Bar Donasi ────────────────────────────────────────

function ProgressDonasi({ terkumpul, target, lang }) {
  const persen = Math.min(Math.round((terkumpul / target) * 100), 100);

  function formatRupiah(num) {
    if (num >= 1000000) return `Rp ${(num / 1000000).toFixed(1).replace(".0", "")} Jt`;
    return `Rp ${num.toLocaleString("id-ID")}`;
  }

  return (
    <motion.div
      variants={cardVariants}
      className="bg-white border border-gray-200 rounded-lg p-5 sm:p-6 shadow-2xs space-y-4"
    >
      <div className="flex items-baseline justify-between gap-4 flex-wrap">
        <div>
          <p className="text-xs text-body uppercase tracking-widest font-bold mb-1">
            {lang === "en" ? "Total Funds Collected" : "Total Dana Terkumpul"}
          </p>
          <p className="font-heading font-bold text-2xl sm:text-3xl text-primary">
            {formatRupiah(terkumpul)}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-body uppercase tracking-widest font-bold mb-1">
            {lang === "en" ? "Target" : "Target"}
          </p>
          <p className="font-heading font-bold text-lg sm:text-xl text-heading">
            {formatRupiah(target)}
          </p>
        </div>
      </div>

      {/* Bar */}
      <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden border border-gray-200">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${persen}%` }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, amount: 0.5 }}
          className="h-3 rounded-full bg-gradient-to-r from-primary to-overlay"
        />
      </div>

      <p className="text-xs sm:text-sm text-body font-medium">
        <span className="font-bold text-primary">{persen}%</span>{" "}
        {lang === "en" ? "of target achieved" : "dari target tercapai"}
        {" · "}
        <span className="font-semibold text-heading">{formatRupiah(target - terkumpul)}</span>{" "}
        {lang === "en" ? "remaining" : "lagi menuju target"}
      </p>
    </motion.div>
  );
}

// ─── Halaman Utama ─────────────────────────────────────────────────────────────

export default function Reuni() {
  const t = useT();
  const { lang } = useLanguage();
  const countdown = useCountdown(reuniData.targetReuni);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  function formatRupiah(num) {
    return `Rp ${num.toLocaleString("id-ID")}`;
  }

  const medaliIcon = ["🥇", "🥈", "🥉"];

  // Bangun daftar galeri dengan foto
  const galeri = (reuniData.galeri ?? [])
    .map((item) => {
      const judulText = t(item.judul);
      const namaLengkap = `${judulText} ${item.tahun}`;
      return {
        ...item,
        foto: fotoGaleri(item.folder).map((src, idx) => ({
          src,
          alt: `${namaLengkap} — ${lang === "en" ? "photo" : "foto"} ${idx + 1}`,
          caption: `${namaLengkap} — ${lang === "en" ? "photo" : "foto"} ${idx + 1}`,
        })),
      };
    })
    .filter((item) => item.foto.length > 0);

  return (
    <>
      <Helmet>
        <title>{`Alumni Reunion | MKn UNISSULA`}</title>
        <meta
          name="description"
          content={
            lang === "en"
              ? "Grand Reunion of Master of Notarial Law UNISSULA Alumni 2025 — complete with donation leaderboard, event schedule, awards, and memorial gallery."
              : "Reuni Akbar Alumni Magister Kenotariatan UNISSULA 2025 — lengkap dengan leaderboard donasi, rundown acara, penghargaan, dan galeri kenangan."
          }
        />
      </Helmet>

      {/* ── HERO HEADER ─────────────────────────────────────────────────────── */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full"
      >
        <div className="mx-auto space-y-6">
          {/* Badge + Judul */}
          <motion.div variants={itemVariants} className="space-y-2">
            <motion.span
              variants={itemVariants}
              className="inline-block text-xs font-bold tracking-wider uppercase text-primary"
            >
              {t(reuniData.category)}
            </motion.span>
            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-4xl lg:text-[40px] font-heading font-bold text-heading tracking-tight leading-tight"
            >
              {reuniData.title}
            </motion.h1>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
              viewport={{ once: true, amount: 0.2 }}
              className="h-[2px] bg-primary mt-2"
            />
          </motion.div>

          {/* Metadata Bar */}
          {reuniData.meta.length > 0 && (
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-gray-200"
            >
              {reuniData.meta.map((m, idx) => (
                <motion.div
                  key={idx}
                  custom={idx}
                  variants={cardVariants}
                  whileHover={{ y: -2 }}
                  className="p-3 bg-gray-50/80 rounded border border-gray-100 flex flex-col justify-between shadow-2xs hover:border-primary/40 transition-colors"
                >
                  <span className="text-xs text-body font-normal uppercase tracking-wider mb-1">
                    {t(m.label)}
                  </span>
                  <span className="font-semibold text-heading text-sm sm:text-base">
                    {t(m.value)}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </motion.section>

      {/* ── KONTEN UTAMA ────────────────────────────────────────────────────── */}
      <div className="w-full mx-auto py-10 sm:py-14 space-y-12 sm:space-y-16">

        {/* STATISTIK RINGKASAN */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="bg-white p-6 sm:p-8 rounded-lg border border-gray-200 shadow-2xs"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
            {reuniData.summary.map((stat, idx) => (
              <motion.div
                key={idx}
                custom={idx}
                variants={cardVariants}
                whileHover={{ y: -2 }}
                className={`space-y-1 transition-transform ${idx !== 0 ? "pt-4 sm:pt-0 sm:pl-6" : ""}`}
              >
                <div className="font-heading text-3xl sm:text-4xl font-bold text-primary">
                  {stat.number}
                </div>
                <div className="text-xs sm:text-sm text-body font-medium">
                  {t(stat.label)}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* COUNTDOWN TIMER */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="space-y-6"
        >
          <motion.div variants={itemVariants} className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-heading">
              {lang === "en" ? "Countdown to Reunion" : "Hitung Mundur Menuju Reuni"}
            </h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.2 }}
              className="h-[1.5px] bg-heading mt-1 mb-3"
            />
            <p className="text-sm text-body">
              {lang === "en"
                ? "Mark your calendar! The Grand Reunion will be held on December 20, 2025."
                : "Tandai kalendermu! Reuni Akbar akan diselenggarakan pada 20 Desember 2025."}
            </p>
          </motion.div>

          {countdown.selesai ? (
            <motion.div
              variants={cardVariants}
              className="bg-primary/5 border border-primary/20 rounded-lg p-6 text-center"
            >
              <p className="font-heading font-bold text-xl sm:text-2xl text-primary">
                {lang === "en" ? "🎉 The Reunion Has Begun!" : "🎉 Reuni Telah Dimulai!"}
              </p>
            </motion.div>
          ) : (
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-4 gap-3 sm:gap-4 max-w-lg"
            >
              <CountdownBox
                value={countdown.hari}
                label={lang === "en" ? "Days" : "Hari"}
              />
              <CountdownBox
                value={countdown.jam}
                label={lang === "en" ? "Hours" : "Jam"}
              />
              <CountdownBox
                value={countdown.menit}
                label={lang === "en" ? "Minutes" : "Menit"}
              />
              <CountdownBox
                value={countdown.detik}
                label={lang === "en" ? "Seconds" : "Detik"}
              />
            </motion.div>
          )}
        </motion.section>

        {/* KATA SAMBUTAN / PIDATO */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="space-y-6"
        >
          <motion.div variants={itemVariants} className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-heading">
              {lang === "en" ? "Chairperson's Welcome Speech" : "Kata Sambutan Ketua Panitia"}
            </h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.2 }}
              className="h-[1.5px] bg-heading mt-1 mb-3"
            />
          </motion.div>

          <motion.blockquote
            variants={cardVariants}
            className="border-l-4 border-primary pl-6 py-3 my-4 bg-white/50 rounded-r-lg shadow-2xs"
          >
            <p className="font-heading italic text-lg sm:text-xl md:text-2xl text-special leading-snug">
              "{t(reuniData.sambutan.teks)}"
            </p>
            <footer className="text-xs sm:text-sm text-body font-normal mt-4 space-y-0.5">
              <p className="font-semibold text-heading not-italic">
                — {reuniData.sambutan.penulis}
              </p>
              <p className="not-italic">{t(reuniData.sambutan.jabatan)}</p>
            </footer>
          </motion.blockquote>
        </motion.section>

        {/* DONASI — PROGRESS + LEADERBOARD */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="space-y-6"
        >
          <motion.div variants={itemVariants} className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-heading">
              {lang === "en" ? "Donation & Fund" : "Donasi & Dana Reuni"}
            </h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.2 }}
              className="h-[1.5px] bg-heading mt-1 mb-3"
            />
            <p className="text-sm text-body">
              {lang === "en"
                ? "Every contribution, big or small, helps make this reunion memorable. Thank you to all donors!"
                : "Setiap kontribusi, besar maupun kecil, membantu mewujudkan reuni yang berkesan. Terima kasih kepada seluruh donatur!"}
            </p>
          </motion.div>

          {/* Progress Bar */}
          <ProgressDonasi
            terkumpul={reuniData.terkumpul}
            target={reuniData.targetDonasi}
            lang={lang}
          />

          {/* Leaderboard */}
          <motion.div
            variants={itemVariants}
            className="pt-2"
          >
            <h3 className="font-heading font-bold text-lg sm:text-xl text-heading mb-4">
              {lang === "en" ? "Donor Leaderboard" : "Leaderboard Donatur"}
            </h3>
          </motion.div>

          {/* ── TOP 3 DONATUR — Podium Cards ── */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            {reuniData.donatur.slice(0, 3).map((donatur, idx) => {
              const initials = donatur.nama
                .replace(/(Dr\.|Prof\.|S\.H\.|M\.Kn\.|M\.Hum\.|S\.H)/gi, "")
                .trim()
                .split(" ")
                .filter(Boolean)
                .slice(0, 2)
                .map((w) => w[0])
                .join("");
              const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=800000&color=fff&size=128&bold=true&font-size=0.45`;
              const podiumOrder = [1, 0, 2]; // tampilkan peringkat 2 di kiri, 1 di tengah, 3 di kanan
              const sorted = [reuniData.donatur[1], reuniData.donatur[0], reuniData.donatur[2]];
              const d = sorted[idx];
              const rank = [2, 1, 3][idx];
              const isCrown = rank === 1;
              const medalEmoji = ["🥇", "🥈", "🥉"];
              const rankIdx = rank - 1;
              const dInitials = d.nama
                .replace(/(Dr\.|Prof\.|S\.H\.|M\.Kn\.|M\.Hum\.|S\.H)/gi, "")
                .trim()
                .split(" ")
                .filter(Boolean)
                .slice(0, 2)
                .map((w) => w[0])
                .join("");
              const dAvatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(dInitials)}&background=800000&color=fff&size=128&bold=true&font-size=0.45`;

              return (
                <motion.div
                  key={d.nama}
                  custom={idx}
                  variants={cardVariants}
                  whileHover={{ y: -4 }}
                  className={`relative flex flex-col items-center text-center rounded-xl border shadow-sm p-5 pt-8 transition-all ${
                    isCrown
                      ? "bg-gradient-to-b from-amber-50 to-white border-amber-300 shadow-md order-first sm:order-none sm:-mt-4"
                      : "bg-white border-gray-200 hover:border-primary/30 hover:shadow-md"
                  }`}
                >
                  {/* Medali badge */}
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-2xl">
                    {medalEmoji[rankIdx]}
                  </span>

                  {/* Avatar */}
                  <div className={`relative mb-3 ${
                    isCrown ? "ring-4 ring-amber-400 ring-offset-2" : "ring-2 ring-gray-200 ring-offset-1"
                  } rounded-full`}>
                    <img
                      src={dAvatarUrl}
                      alt={d.nama}
                      className="w-16 h-16 rounded-full object-cover"
                      loading="lazy"
                    />
                    {isCrown && (
                      <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-xl">👑</span>
                    )}
                  </div>

                  {/* Nama */}
                  <p className="font-heading font-bold text-sm text-heading leading-snug mb-0.5">
                    {d.nama}
                  </p>
                  <p className="text-[11px] text-body mb-2">
                    {lang === "en" ? `Class of ${d.angkatan}` : `Angkatan ${d.angkatan}`}
                  </p>

                  {/* Nominal */}
                  <p className={`font-bold text-base tabular-nums ${
                    isCrown ? "text-amber-600" : "text-primary"
                  }`}>
                    {formatRupiah(d.nominal)}
                  </p>

                  {/* Keterangan */}
                  {d.keterangan && (
                    <p className="text-[11px] text-body italic mt-2 leading-relaxed px-1">
                      "{t(d.keterangan)}"
                    </p>
                  )}
                </motion.div>
              );
            })}
          </motion.div>

          {/* ── DONATUR #4–10 — Compact List ── */}
          <motion.div
            variants={cardVariants}
            className="bg-white rounded-lg border border-gray-200 shadow-2xs overflow-hidden"
          >
            <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
              <p className="text-[11px] font-bold tracking-[0.14em] uppercase text-heading">
                {lang === "en" ? "Other Donors" : "Donatur Lainnya"}
              </p>
            </div>
            <ul className="divide-y divide-gray-100">
              {reuniData.donatur.slice(3).map((donatur, idx) => {
                const initials = donatur.nama
                  .replace(/(Dr\.|Prof\.|S\.H\.|M\.Kn\.|M\.Hum\.|S\.H)/gi, "")
                  .trim()
                  .split(" ")
                  .filter(Boolean)
                  .slice(0, 2)
                  .map((w) => w[0])
                  .join("");
                const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=800000&color=fff&size=64&bold=true&font-size=0.45`;
                const rank = idx + 4;

                return (
                  <motion.li
                    key={donatur.nama}
                    custom={idx}
                    variants={itemVariants}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50/60 transition-colors"
                  >
                    {/* Nomor */}
                    <span className="shrink-0 w-6 text-center text-xs font-bold text-body tabular-nums">
                      #{rank}
                    </span>

                    {/* Avatar kecil */}
                    <img
                      src={avatarUrl}
                      alt={donatur.nama}
                      className="w-9 h-9 rounded-full object-cover shrink-0 ring-1 ring-gray-200"
                      loading="lazy"
                    />

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-heading truncate">{donatur.nama}</p>
                      {donatur.keterangan && (
                        <p className="text-[11px] text-body italic truncate">
                          "{t(donatur.keterangan)}"
                        </p>
                      )}
                    </div>

                    {/* Angkatan */}
                    <span className="text-[11px] text-body shrink-0 hidden sm:inline">
                      {lang === "en" ? `Class of ${donatur.angkatan}` : `Angk. ${donatur.angkatan}`}
                    </span>

                    {/* Nominal */}
                    <span className="font-bold text-sm text-primary tabular-nums shrink-0">
                      {formatRupiah(donatur.nominal)}
                    </span>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>

          {/* Tombol Donasi */}
          <motion.div variants={itemVariants} className="flex gap-3 flex-wrap pt-2">
            <motion.button
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 bg-btn text-white font-bold text-sm px-6 py-3 rounded hover:bg-primary transition-colors shadow-sm"
            >
              <span>💝</span>
              {lang === "en" ? "Donate Now" : "Donasi Sekarang"}
            </motion.button>
            <motion.button
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 border border-primary text-primary font-bold text-sm px-6 py-3 rounded hover:bg-primary/5 transition-colors"
            >
              <span>📋</span>
              {lang === "en" ? "View All Donors" : "Lihat Semua Donatur"}
            </motion.button>
          </motion.div>
        </motion.section>

        {/* RUNDOWN ACARA — VERTICAL TIMELINE */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="space-y-6"
        >
          <motion.div variants={itemVariants} className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-heading">
              {lang === "en" ? "Event Schedule" : "Rundown Acara"}
            </h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.2 }}
              className="h-[1.5px] bg-heading mt-1 mb-3"
            />
            <p className="text-sm text-body">
              {lang === "en"
                ? "Saturday, December 20, 2025 · Grand Candi Hotel Ballroom, Semarang"
                : "Sabtu, 20 Desember 2025 · Ballroom Hotel Grand Candi, Semarang"}
            </p>
          </motion.div>

          <div className="relative space-y-0">
            {/* Garis vertikal timeline */}
            <div className="absolute left-[85px] sm:left-[100px] top-0 bottom-0 w-[2px] bg-gray-200 hidden sm:block" />

            {reuniData.rundown.map((item, idx) => (
              <motion.div
                key={idx}
                custom={idx}
                variants={cardVariants}
                className="relative flex gap-4 sm:gap-6 group"
              >
                {/* Waktu */}
                <div className="shrink-0 w-[85px] sm:w-[100px] pt-4 text-right">
                  <span className="text-[11px] sm:text-xs font-bold text-primary tabular-nums">
                    {item.waktu}
                  </span>
                </div>

                {/* Titik */}
                <div className="hidden sm:flex shrink-0 flex-col items-center pt-[18px]">
                  <div className="w-3 h-3 rounded-full bg-primary border-2 border-white shadow-sm ring-1 ring-primary/30 group-hover:scale-125 transition-transform z-10" />
                </div>

                {/* Konten */}
                <div className={`flex-1 pb-6 ${idx < reuniData.rundown.length - 1 ? "border-b border-gray-100 sm:border-0" : ""}`}>
                  <div className="bg-white border border-gray-200 rounded-md p-3 sm:p-4 shadow-2xs hover:border-primary/30 hover:shadow-md transition-all">
                    <p className="font-heading font-bold text-sm sm:text-base text-heading leading-snug">
                      {t(item.kegiatan)}
                    </p>
                    <p className="text-xs text-body mt-1 italic">
                      {t(item.keterangan)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* PENGHARGAAN ALUMNI */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="space-y-6"
        >
          <motion.div variants={itemVariants} className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-heading">
              {lang === "en" ? "Outstanding Alumni Awards" : "Penghargaan Alumni Berprestasi"}
            </h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.2 }}
              className="h-[1.5px] bg-heading mt-1 mb-3"
            />
            <p className="text-sm text-body">
              {lang === "en"
                ? "Recognizing alumni who have made significant contributions in their fields."
                : "Menghargai alumni yang telah memberikan kontribusi nyata di bidangnya."}
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {reuniData.penghargaan.map((item, idx) => (
              <motion.div
                key={idx}
                custom={idx}
                variants={cardVariants}
                whileHover={{ y: -3 }}
                className="bg-white border border-gray-200 rounded-md p-4 shadow-2xs hover:border-primary/40 hover:shadow-md transition-all"
              >
                <span className="text-2xl mb-2 block">🏆</span>
                <p className="text-[11px] font-bold text-primary tracking-wider uppercase mb-1">
                  {t(item.kategori)}
                </p>
                <p className="font-heading font-bold text-sm sm:text-base text-heading leading-snug">
                  {item.penerima}
                </p>
                <p className="text-xs text-body mt-1">
                  {lang === "en" ? `Class of ${item.angkatan}` : `Angkatan ${item.angkatan}`}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* GALERI KENANGAN ─── persis pola Ikanotsula */}
        {galeri.length > 0 && (
          <section className="space-y-10">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-2xl sm:text-3xl font-heading font-bold text-heading"
            >
              {lang === "en" ? "Photo Gallery" : "Galeri Kenangan"}
            </motion.h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.2 }}
              className="h-[1.5px] bg-heading mt-1 mb-3"
            />

            {galeri.map((item) => (
              <motion.div
                key={item.folder}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                className="space-y-4"
              >
                {/* Kepala kegiatan */}
                <motion.div
                  variants={itemVariants}
                  className="flex flex-wrap items-baseline gap-x-3 gap-y-1 pb-2 border-b border-gray-200"
                >
                  <h3 className="font-heading font-bold text-lg sm:text-xl text-heading leading-snug">
                    {t(item.judul)}
                  </h3>
                  <span className="text-[11px] font-bold tracking-wider text-primary uppercase bg-red-50 border border-primary/20 px-2 py-0.5 rounded-xs tabular-nums">
                    {item.tahun}
                  </span>
                  <span className="text-xs text-gray-400 ml-auto tabular-nums">
                    {item.foto.length} {lang === "en" ? "photos" : "foto"}
                  </span>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <GaleriGeser
                    foto={item.foto}
                    ariaLabel={`${lang === "en" ? "Gallery" : "Galeri"} ${t(item.judul)} ${item.tahun}`}
                    otomatis={false}
                    tampilkanJudul={false}
                    kelasTrek="gap-4"
                    kelasBasis="basis-full sm:basis-[calc((100%-1rem)/2)] md:basis-[calc((100%-2rem)/3)]"
                    kelasKartu="aspect-[4/3] rounded-md border border-gray-200 shadow-2xs"
                  />
                </motion.div>
              </motion.div>
            ))}
          </section>
        )}

        {/* CTA — DAFTAR & INFORMASI */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="space-y-6"
        >
          <motion.div variants={itemVariants} className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-heading">
              {lang === "en" ? "Join the Reunion" : "Ikut Bergabung"}
            </h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.2 }}
              className="h-[1.5px] bg-heading mt-1 mb-3"
            />
          </motion.div>

          <motion.div
            variants={cardVariants}
            className="bg-white border border-gray-200 rounded-lg p-6 sm:p-8 shadow-2xs space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-body">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold uppercase tracking-widest text-primary">
                  {lang === "en" ? "Registration Fee" : "Biaya Pendaftaran"}
                </span>
                <span className="font-heading font-bold text-heading text-base">
                  Rp 350.000 / {lang === "en" ? "person" : "orang"}
                </span>
                <span className="text-xs text-body">
                  {lang === "en" ? "Includes gala dinner & souvenir" : "Termasuk gala dinner & souvenir"}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold uppercase tracking-widest text-primary">
                  {lang === "en" ? "Registration Deadline" : "Batas Pendaftaran"}
                </span>
                <span className="font-heading font-bold text-heading text-base">
                  {lang === "en" ? "December 10, 2025" : "10 Desember 2025"}
                </span>
                <span className="text-xs text-body">
                  {lang === "en" ? "Limited seats available" : "Tempat terbatas"}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold uppercase tracking-widest text-primary">
                  {lang === "en" ? "Contact Secretariat" : "Hubungi Sekretariat"}
                </span>
                <span className="font-heading font-bold text-heading text-base">
                  IKANOTSULA
                </span>
                <span className="text-xs text-body">
                  ikanotsula.mkn@unissula.ac.id
                </span>
              </div>
            </div>

            <div className="flex gap-3 flex-wrap pt-2 border-t border-gray-200">
              <motion.button
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 bg-btn text-white font-bold text-sm px-6 py-3 rounded hover:bg-primary transition-colors shadow-sm"
              >
                <span>📝</span>
                {lang === "en" ? "Register Now" : "Daftar Sekarang"}
              </motion.button>
              <motion.button
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 border border-primary text-primary font-bold text-sm px-6 py-3 rounded hover:bg-primary/5 transition-colors"
              >
                <span>💬</span>
                {lang === "en" ? "Join WhatsApp Group" : "Gabung Grup WhatsApp"}
              </motion.button>
            </div>
          </motion.div>
        </motion.section>

      </div>
    </>
  );
}
