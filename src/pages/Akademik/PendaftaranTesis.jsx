import { useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import {
  FiLock,
  FiUnlock,
  FiEdit3,
  FiFileText,
  FiExternalLink,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import { useT } from "../../i18n/languageContext";
import { useUi } from "../../i18n/useUi";
import { tautanTesisTerenkripsi } from "../../data/akademik/tautanTesisTerenkripsi";
import { bukaTautanTerenkripsi } from "../../utils/bukaTautanTerenkripsi";

/* =========================
   Animation Settings
========================= */

const viewportSettings = {
  once: true,
  amount: 0.2,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const headerItemVariants = {
  hidden: {
    opacity: 0,
    x: -30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

/**
 * Formulir yang dibuka setelah kata sandi benar, berurutan sesuai alur tesis.
 *
 * `kunci` merujuk ke isi tautanTesisTerenkripsi — tautannya sendiri tidak
 * ditulis di sini agar tidak terbaca di bundel JS.
 */
const daftarFormulir = [
  {
    kunci: "judulTesis",
    ikon: FiEdit3,
    judul: { id: "Pengajuan Judul Tesis", en: "Thesis Title Submission" },
  },
  {
    kunci: "praProposal",
    ikon: FiFileText,
    judul: {
      id: "Pendaftaran Ujian Pra Proposal",
      en: "Pre-Proposal Examination Registration",
    },
  },
  {
    kunci: "proposal",
    ikon: FiFileText,
    judul: {
      id: "Pendaftaran Ujian Proposal",
      en: "Proposal Examination Registration",
    },
  },
  {
    kunci: "ujianTesis",
    ikon: FiFileText,
    judul: {
      id: "Pendaftaran Ujian Tesis",
      en: "Thesis Examination Registration",
    },
  },
];

/** Teks halaman Pendaftaran Tesis. */
const halaman = {
  meta: {
    title: {
      id: "Pengajuan & Pendaftaran Ujian Tesis | MKn UNISSULA",
      en: "Thesis Submission & Examination Registration | MKn UNISSULA",
    },
    description: {
      id:
        "Formulir pengajuan judul tesis serta pendaftaran ujian pra proposal, proposal, " +
        "dan tesis khusus mahasiswa Magister Kenotariatan UNISSULA.",
      en:
        "Forms for thesis title submission and registration for the pre-proposal, " +
        "proposal, and thesis examinations, for UNISSULA Master of Notarial Law students only.",
    },
  },
  judul: {
    id: "Pengajuan & Pendaftaran Ujian Tesis",
    en: "Thesis Submission & Examination Registration",
  },
  kunci: {
    judul: { id: "Khusus Mahasiswa", en: "Students Only" },
    keterangan: {
      id:
        "Masukkan kata sandi untuk membuka formulir. Kata sandi dibagikan kepada mahasiswa " +
        "melalui bagian akademik program studi.",
      en:
        "Enter the password to open the forms. The password is shared with students " +
        "through the study programme's academic office.",
    },
    label: { id: "Kata sandi", en: "Password" },
    tombol: { id: "Buka Formulir", en: "Open Forms" },
    memeriksa: { id: "Memeriksa…", en: "Checking…" },
    salah: {
      id: "Kata sandi tidak sesuai. Silakan periksa kembali.",
      en: "Incorrect password. Please check and try again.",
    },
    tampilkan: { id: "Tampilkan kata sandi", en: "Show password" },
    sembunyikan: { id: "Sembunyikan kata sandi", en: "Hide password" },
  },
  terbuka: {
    keterangan: {
      id:
        "Formulir berikut dibuka di Google Form. Isi sesuai tahap tesis yang sedang " +
        "ditempuh dan pastikan persyaratannya telah dipenuhi.",
      en:
        "The following forms open in Google Forms. Complete the one for your current " +
        "thesis stage and make sure its requirements are met.",
    },
    tombol: { id: "Isi Formulir", en: "Fill In Form" },
  },
};

/** Satu kartu formulir yang sudah terbuka. */
function KartuFormulir({ item, url }) {
  const t = useT();
  const Ikon = item.ikon;

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{
        y: -4,
        transition: {
          duration: 0.25,
        },
      }}
      className="bg-white border border-gray-200 rounded-xs p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-6 lg:gap-12 hover:border-gray-300 transition-all duration-200 shadow-2xs group"
    >
      <div className="flex items-center gap-4 sm:gap-5 flex-1 min-w-0">
        <div className="text-primary text-2xl sm:text-3xl shrink-0 flex items-center justify-center">
          <Ikon />
        </div>

        <h2 className="font-heading font-bold text-base sm:text-[18px] text-heading leading-snug group-hover:text-primary transition-colors">
          {t(item.judul)}
        </h2>
      </div>

      <div className="shrink-0 flex items-center self-start sm:self-center pl-10 sm:pl-0">
        <motion.a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center justify-center gap-2 px-6 py-2.5 border border-primary bg-primary text-white hover:bg-primary/90 rounded-xs text-xs sm:text-sm font-semibold transition-colors"
        >
          <FiExternalLink className="text-base" />
          <span>{t(halaman.terbuka.tombol)}</span>
        </motion.a>
      </div>
    </motion.div>
  );
}

/** Kotak kata sandi sebelum formulir dibuka. */
function KotakKataSandi({ onTerbuka }) {
  const t = useT();
  const [kataSandi, setKataSandi] = useState("");
  const [terlihat, setTerlihat] = useState(false);
  const [memeriksa, setMemeriksa] = useState(false);
  const [salah, setSalah] = useState(false);

  const kirim = async (e) => {
    e.preventDefault();
    if (!kataSandi || memeriksa) return;

    setMemeriksa(true);
    setSalah(false);
    const tautan = await bukaTautanTerenkripsi(tautanTesisTerenkripsi, kataSandi.trim());
    setMemeriksa(false);

    if (tautan) onTerbuka(tautan);
    else setSalah(true);
  };

  return (
    <motion.form
      variants={cardVariants}
      onSubmit={kirim}
      className="bg-primary/5 border border-primary/30 rounded-xs p-6 sm:p-7 space-y-5"
    >
      <div className="flex items-start gap-4 sm:gap-5">
        <div className="text-primary text-2xl sm:text-3xl mt-0.5 shrink-0">
          <FiLock />
        </div>

        <div className="space-y-2 flex-1 min-w-0 max-w-2xl">
          <h2 className="font-heading font-bold text-base sm:text-[18px] text-heading leading-snug">
            {t(halaman.kunci.judul)}
          </h2>
          <p className="text-xs sm:text-sm text-body leading-relaxed">
            {t(halaman.kunci.keterangan)}
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:pl-12">
        <label className="sr-only" htmlFor="kata-sandi-tesis">
          {t(halaman.kunci.label)}
        </label>
        <div className="relative flex-1 sm:max-w-sm">
          <input
            id="kata-sandi-tesis"
            type={terlihat ? "text" : "password"}
            autoComplete="off"
            value={kataSandi}
            onChange={(e) => {
              setKataSandi(e.target.value);
              setSalah(false);
            }}
            placeholder={t(halaman.kunci.label)}
            aria-invalid={salah}
            aria-describedby={salah ? "kata-sandi-tesis-galat" : undefined}
            className={`w-full bg-white border rounded-xs pl-4 pr-11 py-2.5 text-sm text-heading placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 ${
              salah ? "border-red-400" : "border-gray-300 focus:border-primary"
            }`}
          />
          <button
            type="button"
            onClick={() => setTerlihat((v) => !v)}
            aria-label={t(terlihat ? halaman.kunci.sembunyikan : halaman.kunci.tampilkan)}
            className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-primary transition-colors"
          >
            {terlihat ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>

        <motion.button
          type="submit"
          disabled={!kataSandi || memeriksa}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center justify-center gap-2 px-6 py-2.5 border border-primary bg-primary text-white hover:bg-primary/90 rounded-xs text-xs sm:text-sm font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <FiUnlock className="text-base" />
          <span>{t(memeriksa ? halaman.kunci.memeriksa : halaman.kunci.tombol)}</span>
        </motion.button>
      </div>

      {salah && (
        <p
          id="kata-sandi-tesis-galat"
          role="alert"
          className="text-xs sm:text-sm text-red-600 sm:pl-12"
        >
          {t(halaman.kunci.salah)}
        </p>
      )}
    </motion.form>
  );
}

/**
 * Halaman formulir pengajuan judul dan pendaftaran ujian tesis, khusus mahasiswa.
 *
 * Tautan disimpan terenkripsi dan baru dibuka di peramban setelah kata sandi
 * benar. Hasilnya hanya disimpan di state, jadi kata sandi diminta lagi setiap
 * kali halaman dimuat ulang.
 */
export default function PendaftaranTesis() {
  const t = useT();
  const ui = useUi();
  const [tautan, setTautan] = useState(null);

  return (
    <>
      <Helmet>
        <title>{t(halaman.meta.title)}</title>
        <meta
          name="description"
          content={t(halaman.meta.description)}
        />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="space-y-10 font-body text-body">
        {/* Header Title Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
        >
          <motion.span
            variants={headerItemVariants}
            className="text-xs font-bold tracking-[0.16em] uppercase text-primary block"
          >
            {ui("sectionAcademic")}
          </motion.span>

          <motion.h1
            variants={headerItemVariants}
            className="text-3xl sm:text-4xl lg:text-[40px] font-heading font-bold text-heading tracking-tight leading-tight"
          >
            {t(halaman.judul)}
          </motion.h1>

          <motion.div
            initial={{
              width: 0,
            }}
            whileInView={{
              width: "100%",
            }}
            transition={{
              duration: 0.9,
              ease: "easeOut",
              delay: 0.15,
            }}
            viewport={viewportSettings}
            className="h-[2px] bg-primary my-4"
          />
        </motion.div>

        {tautan ? (
          <motion.div
            key="terbuka"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            <p className="text-sm text-body leading-relaxed max-w-3xl">
              {t(halaman.terbuka.keterangan)}
            </p>

            {daftarFormulir.map((item) =>
              tautan[item.kunci] ? (
                <KartuFormulir
                  key={item.kunci}
                  item={item}
                  url={tautan[item.kunci]}
                />
              ) : null,
            )}
          </motion.div>
        ) : (
          <motion.div
            key="terkunci"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <KotakKataSandi onTerbuka={setTautan} />
          </motion.div>
        )}
      </div>
    </>
  );
}
