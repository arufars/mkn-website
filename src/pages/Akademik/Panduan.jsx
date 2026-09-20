import { Fragment } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FiBookOpen, FiFileText, FiDownload, FiLock, FiArrowRight } from "react-icons/fi";
import { useT } from "../../i18n/languageContext";
import { useUi } from "../../i18n/useUi";
import { rutePendaftaranTesis } from "../../data/akademik/panduanTesisData";

import pedomanAkademik from "../../assets/pdf/Pedoman Akademik 2021.pdf";
import pedomanLaboratorium from "../../assets/pdf/Pedoman Praktek Laboratorium Manajemen Kantor Notaris & PPAT.pdf";
import pedomanProposalTesis from "../../assets/pdf/Pedoman Penulisan Proposal & Tesis.pdf";
import sopYudisiumWisuda from "../../assets/pdf/Standar Operasional Prosedur (SOP) Yudisium & Wisuda.pdf";

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

const contentVariants = {
  hidden: {
    opacity: 0,
    y: 15,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

/**
 * Dokumen pedoman akademik.
 *
 * Berkas PDF diterima dari program studi dan disimpan di `src/assets/pdf`.
 * `fileName` dipakai sebagai nama berkas hasil unduhan agar rapi tanpa spasi.
 */
const academicGuidelines = [
  {
    id: 1,
    title: { id: "Pedoman Akademik", en: "Academic Guidelines" },
    fileUrl: pedomanAkademik,
    fileName: "Pedoman-Akademik-MKn-UNISSULA.pdf",
  },
  {
    id: 2,
    title: {
      id: "Pedoman Praktek Laboratorium Manajemen Kantor Notaris/PPAT",
      en: "Guidelines for the Notary/PPAT Office Management Laboratory",
    },
    fileUrl: pedomanLaboratorium,
    fileName:
      "Pedoman-Praktek-Laboratorium-Manajemen-Kantor-Notaris-PPAT.pdf",
  },
  {
    id: 3,
    title: {
      id: "Pedoman Penulisan Proposal & Tesis",
      en: "Guidelines for Writing Proposals & Theses",
    },
    fileUrl: pedomanProposalTesis,
    fileName: "Pedoman-Penulisan-Proposal-dan-Tesis.pdf",
    diikutiFormIzinRiset: true,
  },
  {
    id: 4,
    title: {
      id: "Standar Operasional Prosedur (SOP) Yudisium & Wisuda",
      en: "Standard Operating Procedure (SOP) for Yudisium & Graduation",
    },
    fileUrl: sopYudisiumWisuda,
    fileName: "SOP-Yudisium-dan-Wisuda-MKn.pdf",
  },
];

/** Teks halaman Panduan Akademik. */
const halaman = {
  meta: {
    title: {
      id: "Panduan Akademik & Prosedur | MKn UNISSULA",
      en: "Academic Guidelines & Procedures | MKn UNISSULA",
    },
    description: {
      id:
        "Daftar dokumen pedoman akademik Program Studi Magister Kenotariatan UNISSULA " +
        "serta pengajuan izin riset, wawancara, dan penelitian.",
      en:
        "The academic guideline documents of the UNISSULA Master of Notarial Law Study " +
        "Programme, together with applications for research and interview permits.",
    },
  },
  judul: {
    id: "Panduan Akademik",
    en: "Academic Guidelines",
  },
  intro: {
    id:
      "Panduan akademik memuat ketentuan penyelenggaraan pendidikan Magister Kenotariatan: " +
      "beban dan masa studi, registrasi, perkuliahan, cuti akademik, hingga kelulusan.",
    en:
      "The academic guidelines set out the provisions for delivering the Master of Notarial " +
      "Law programme: study load and duration, registration, teaching, academic leave, and " +
      "graduation.",
  },
  unduh: {
    id: "Unduh PDF",
    en: "Download PDF",
  },
  belumTersedia: {
    id: "Belum tersedia",
    en: "Not yet available",
  },
  izinRiset: {
    judul: {
      id: "Pengajuan Izin Riset, Wawancara, dan Penelitian",
      en: "Applications for Research and Interview Permits",
    },
    keterangan: {
      id:
        "Permohonan surat izin riset, wawancara, dan penelitian diajukan secara daring " +
        "melalui formulir yang disediakan program studi. Berkas pengajuan diperiksa dan " +
        "ditindaklanjuti oleh bagian akademik.",
      en:
        "Applications for research and interview permit letters are submitted online " +
        "through the form provided by the study programme. Submissions are reviewed and " +
        "processed by the academic office.",
    },
    tombol: {
      id: "Formulir akan segera tersedia",
      en: "Form will be available soon",
    },
  },
  pendaftaranTesis: {
    judul: {
      id: "Pengajuan Judul Tesis & Pendaftaran Ujian",
      en: "Thesis Title Submission & Examination Registration",
    },
    keterangan: {
      id:
        "Formulir pengajuan judul tesis serta pendaftaran ujian pra proposal, proposal, " +
        "dan tesis. Khusus mahasiswa — halaman ini dibuka dengan kata sandi dari bagian " +
        "akademik.",
      en:
        "Forms for thesis title submission and registration for the pre-proposal, " +
        "proposal, and thesis examinations. Students only — the page is opened with a " +
        "password from the academic office.",
    },
    tombol: {
      id: "Buka Formulir",
      en: "Open Forms",
    },
  },
};

/** Satu kartu dokumen pedoman beserta tautan unduhan berkasnya. */
function KartuPedoman({ item }) {
  const t = useT();

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
      {/* Sisi Kiri: Ikon Buku + Judul */}
      <div className="flex items-center gap-4 sm:gap-5 flex-1 min-w-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
          }}
          viewport={viewportSettings}
          className="text-primary text-2xl sm:text-3xl shrink-0 flex items-center justify-center"
        >
          <FiBookOpen />
        </motion.div>

        <motion.div
          variants={contentVariants}
          className="flex-1 min-w-0 max-w-2xl"
        >
          <h2 className="font-heading font-bold text-base sm:text-[18px] text-heading leading-snug group-hover:text-primary transition-colors">
            {t(item.title)}
          </h2>
        </motion.div>
      </div>

      {/* Sisi Kanan: Keadaan berkas */}
      <motion.div
        variants={contentVariants}
        className="shrink-0 flex items-center self-start sm:self-center pl-10 sm:pl-0"
      >
        {item.fileUrl ? (
          <motion.a
            href={item.fileUrl}
            download={item.fileName}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{
              scale: 1.03,
            }}
            whileTap={{
              scale: 0.97,
            }}
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 border border-primary bg-primary text-white hover:bg-primary/90 rounded-xs text-xs sm:text-sm font-semibold transition-colors"
          >
            <motion.span
              whileHover={{ y: -1 }}
              transition={{ duration: 0.2 }}
            >
              <FiDownload className="text-base" />
            </motion.span>

            <span>{t(halaman.unduh)}</span>
          </motion.a>
        ) : (
          <span className="inline-flex items-center justify-center gap-2 px-6 py-2.5 border border-dashed border-gray-300 bg-gray-50 text-gray-400 rounded-xs text-xs sm:text-sm font-semibold cursor-not-allowed select-none">
            {t(halaman.belumTersedia)}
          </span>
        )}
      </motion.div>
    </motion.div>
  );
}

/**
 * Jalan masuk pengajuan izin riset, wawancara, dan penelitian.
 *
 * Formulir dan dashboard pengelolaannya belum dibangun, sehingga tombolnya
 * sengaja tidak aktif — lebih baik daripada tautan yang menuju halaman kosong.
 */
function PengajuanIzinRiset() {
  const t = useT();

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{
        y: -3,
        transition: {
          duration: 0.25,
        },
      }}
      className="bg-primary/5 border border-primary/30 rounded-xs p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-6 lg:gap-12"
    >
      <div className="flex items-start gap-4 sm:gap-5 flex-1 min-w-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
          }}
          viewport={viewportSettings}
          className="text-primary text-2xl sm:text-3xl mt-0.5 shrink-0"
        >
          <FiFileText />
        </motion.div>

        <motion.div
          variants={contentVariants}
          className="space-y-2 flex-1 min-w-0 max-w-2xl"
        >
          <h2 className="font-heading font-bold text-base sm:text-[18px] text-heading leading-snug">
            {t(halaman.izinRiset.judul)}
          </h2>

          <p className="text-xs sm:text-sm text-body leading-relaxed">
            {t(halaman.izinRiset.keterangan)}
          </p>
        </motion.div>
      </div>

      <motion.div
        variants={contentVariants}
        className="shrink-0 flex items-center self-start sm:self-center pl-10 sm:pl-0"
      >
        <span className="inline-flex items-center justify-center gap-2 px-6 py-2.5 border border-dashed border-gray-300 bg-white/60 text-gray-400 rounded-xs text-xs sm:text-sm font-semibold cursor-not-allowed select-none">
          {t(halaman.izinRiset.tombol)}
        </span>
      </motion.div>
    </motion.div>
  );
}

/**
 * Jalan masuk formulir pengajuan judul dan pendaftaran ujian tesis.
 *
 * Kotaknya sengaja sama dengan kotak izin riset di atasnya; tombolnya aktif
 * karena menuju halaman berkata sandi yang sudah tersedia.
 */
function PendaftaranTesisMasuk() {
  const t = useT();

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{
        y: -3,
        transition: {
          duration: 0.25,
        },
      }}
      className="bg-primary/5 border border-primary/30 rounded-xs p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-6 lg:gap-12"
    >
      <div className="flex items-start gap-4 sm:gap-5 flex-1 min-w-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
          }}
          viewport={viewportSettings}
          className="text-primary text-2xl sm:text-3xl mt-0.5 shrink-0"
        >
          <FiLock />
        </motion.div>

        <motion.div
          variants={contentVariants}
          className="space-y-2 flex-1 min-w-0 max-w-2xl"
        >
          <h2 className="font-heading font-bold text-base sm:text-[18px] text-heading leading-snug">
            {t(halaman.pendaftaranTesis.judul)}
          </h2>

          <p className="text-xs sm:text-sm text-body leading-relaxed">
            {t(halaman.pendaftaranTesis.keterangan)}
          </p>
        </motion.div>
      </div>

      <motion.div
        variants={contentVariants}
        className="shrink-0 flex items-center self-start sm:self-center pl-10 sm:pl-0"
      >
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <Link
            to={rutePendaftaranTesis}
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 border border-primary bg-primary text-white hover:bg-primary/90 rounded-xs text-xs sm:text-sm font-semibold transition-colors"
          >
            <span>{t(halaman.pendaftaranTesis.tombol)}</span>
            <FiArrowRight className="text-base" />
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function Panduan() {
  const t = useT();
  const ui = useUi();

  return (
    <>
      <Helmet>
        <title>{t(halaman.meta.title)}</title>
        <meta
          name="description"
          content={t(halaman.meta.description)}
        />
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

        {/* List Card Panduan Akademik */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          className="space-y-4"
        >
          {academicGuidelines.map((item) => (
            <Fragment key={item.id}>
              <KartuPedoman item={item} />

              {item.diikutiFormIzinRiset && (
                <>
                  <PengajuanIzinRiset />
                  <PendaftaranTesisMasuk />
                </>
              )}
            </Fragment>
          ))}
        </motion.div>
      </div>
    </>
  );
}