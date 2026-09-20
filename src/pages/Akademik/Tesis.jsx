import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Link, NavLink, Outlet } from "react-router-dom";
import { FiLock, FiArrowRight } from "react-icons/fi";
import {
  KartuSorot,
  JudulSeksi,
  KartuRingkas,
  AlurTahap,
} from "../../components/Akademik/panduan/PanduanSorot";
import { useT } from "../../i18n/languageContext";
import {
  sorotTesis,
  alurTahap,
  tigaUjian,
  halamanTesis,
  rutePendaftaranTesis,
  infoPendaftaranTesis,
} from "../../data/akademik/panduanTesisData";

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

const sectionVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const tabVariants = {
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

const contentVariants = {
  hidden: {
    opacity: 0,
    y: 20,
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

const ALUR = {
  judul: {
    id: "Alur Penyelesaian Tesis",
    en: "The Thesis Pathway",
  },
  keterangan: {
    id:
      "Delapan tahap sejak pengajuan judul hingga ujian tesis, ditempuh dalam waktu dua " +
      "semester.",
    en:
      "Eight stages from submitting the title to the thesis examination, completed over " +
      "two semesters.",
  },
};

const TIGA = {
  judul: {
    id: "Tiga Ujian dalam Penyelesaian Tesis",
    en: "Three Examinations Along the Thesis Pathway",
  },
  keterangan: {
    id:
      "Seluruh pembimbing tesis bergelar Doktor, dan setiap ujian memiliki ketentuannya " +
      "sendiri.",
    en:
      "Every thesis supervisor holds a doctorate, and each examination has its own rules.",
  },
};

const subTab = [
  {
    path: "pra-proposal",
    label: halamanTesis.tab.praProposal,
  },
  {
    path: "proposal",
    label: halamanTesis.tab.proposal,
  },
  {
    path: "ujian-tesis",
    label: halamanTesis.tab.tesis,
  },
];

/**
 * Induk Panduan Ujian Tesis.
 *
 * Bagian yang berlaku untuk ketiga ujian — angka kunci, alur delapan tahap, dan
 * gambaran ketiga ujian — ditampilkan di sini. Ketentuan khusus tiap ujian
 * berada di tab masing-masing.
 */
export default function Tesis() {
  const t = useT();

  return (
    <>
      <Helmet>
        <title>{t(halamanTesis.meta.title)}</title>
        <meta
          name="description"
          content={t(halamanTesis.meta.description)}
        />
      </Helmet>

      <div className="space-y-12 sm:space-y-14">
        {/* Angka kunci */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
        >
          <KartuSorot butir={sorotTesis} />
        </motion.div>

        {/* Alur delapan tahap */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          className="space-y-6"
        >
          <motion.div
            variants={headerItemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
          >
            <JudulSeksi
              judul={ALUR.judul}
              keterangan={ALUR.keterangan}
            />
          </motion.div>

          <motion.div
            variants={contentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
          >
            <AlurTahap tahap={alurTahap} />
          </motion.div>
        </motion.section>

        {/* Rujukan ke formulir pengajuan & pendaftaran di Panduan Akademik */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          className="bg-primary/5 border border-primary/30 rounded-xs p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-6 lg:gap-12"
        >
          <div className="flex items-start gap-4 sm:gap-5 flex-1 min-w-0">
            <div className="text-primary text-2xl sm:text-3xl mt-0.5 shrink-0">
              <FiLock />
            </div>

            <div className="space-y-2 flex-1 min-w-0 max-w-2xl">
              <h2 className="font-heading font-bold text-base sm:text-[18px] text-heading leading-snug">
                {t(infoPendaftaranTesis.judul)}
              </h2>
              <p className="text-xs sm:text-sm text-body leading-relaxed">
                {t(infoPendaftaranTesis.keterangan)}
              </p>
            </div>
          </div>

          <div className="shrink-0 flex items-center self-start sm:self-center pl-10 sm:pl-0">
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Link
                to={rutePendaftaranTesis}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 border border-primary bg-primary text-white hover:bg-primary/90 rounded-xs text-xs sm:text-sm font-semibold transition-colors"
              >
                <span>{t(infoPendaftaranTesis.tombol)}</span>
                <FiArrowRight className="text-base" />
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Tiga jenis ujian */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          className="space-y-5"
        >
          <motion.div
            variants={headerItemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
          >
            <JudulSeksi
              judul={TIGA.judul}
              keterangan={TIGA.keterangan}
            />
          </motion.div>

          <motion.div
            variants={contentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
          >
            <KartuRingkas
              butir={tigaUjian}
              kolom={3}
            />
          </motion.div>
        </motion.section>

        {/* Ketentuan khusus tiap ujian */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          className="space-y-7 pt-1"
        >
          <motion.nav
            variants={sectionVariants}
            className="flex gap-2 border-b border-gray-200 overflow-x-auto scrollbar-none"
            aria-label="Jenis Ujian Tesis"
          >
            {subTab.map((item) => (
              <motion.div
                key={item.path}
                variants={tabVariants}
                whileHover={{
                  y: -2,
                  transition: {
                    duration: 0.2,
                  },
                }}
              >
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `shrink-0 whitespace-nowrap inline-block px-4 py-3 text-xs sm:text-sm font-semibold tracking-[0.08em] uppercase transition-colors border-b-2 ${
                      isActive
                        ? "border-primary text-primary"
                        : "border-transparent text-body hover:text-heading hover:border-gray-300"
                    }`
                  }
                >
                  {t(item.label)}
                </NavLink>
              </motion.div>
            ))}
          </motion.nav>

          <motion.div
            variants={contentVariants}
            className="min-w-0"
          >
            <Outlet />
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}