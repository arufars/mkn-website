import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { FiMapPin, FiClock, FiCalendar, FiArrowRight, FiSearch } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useT, useLanguage } from "../../i18n/languageContext";

const viewportSettings = {
  once: true,
  amount: 0.15,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const lineVariants = {
  hidden: { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    originX: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const searchInputVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const filterChipVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.32 + i * 0.06,
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const jobItemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (args = 0) => {
    const idx =
      typeof args === "object" && args !== null
        ? args.idx ?? 0
        : typeof args === "number"
        ? args
        : 0;
    const hasLoaded =
      typeof args === "object" && args !== null ? !!args.hasLoaded : false;
    return {
      opacity: 1,
      y: 0,
      transition: {
        delay: !hasLoaded ? 0.42 + idx * 0.12 : (idx % 3) * 0.1,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    };
  },
};

const vacancies = [
  {
    id: 1,
    title: { id: "Notaris Junior", en: "Junior Notary" },
    company: "Kantor Notaris & PPAT Ahmad Fauzan, S.H., M.Kn.",
    location: "Jakarta Selatan",
    type: "Full-time",
    deadline: { id: "Ditutup: 15 Nov 2024", en: "Deadline: 15 Nov 2024" },
    description: {
      id: "Dibutuhkan lulusan MKn untuk membantu penyusunan draf akta otentik, pengecekan keabsahan sertipikat tanah, dan koordinasi dengan kantor BPN.",
      en: "Seeking MKn graduates to assist in drafting authentic deeds, verifying land certificate validity, and coordinating with the BPN office.",
    },
    link: "#",
  },
  {
    id: 2,
    title: { id: "Konsultan Hukum (Real Estat Korporat)", en: "Legal Consultant (Corporate Real Estate)" },
    company: "Baskoro & Partners Law Firm",
    location: "Semarang",
    type: "Full-time",
    deadline: { id: "Ditutup: 20 Nov 2024", en: "Deadline: 20 Nov 2024" },
    description: {
      id: "Menangani legal audit / due diligence proyek properti komersial, perizinan pengembang, dan perjanjian kerjasama akuisisi lahan.",
      en: "Handling legal audit/due diligence for commercial property projects, developer licensing, and land acquisition agreements.",
    },
    link: "#",
  },
  {
    id: 3,
    title: { id: "Staf Ahli PPAT", en: "PPAT Expert Staff" },
    company: "Kantor Pertanahan Kota Surakarta",
    location: "Surakarta",
    type: "Contract",
    deadline: { id: "Ditutup: 30 Nov 2024", en: "Deadline: 30 Nov 2024" },
    description: {
      id: "Mendukung verifikasi berkas pendaftaran hak tanah, roya, hak tanggungan elektronik, dan penyusunan berita acara pengukuran.",
      en: "Supporting verification of land registration rights, roya, electronic mortgage rights, and drafting measurement reports.",
    },
    link: "#",
  },
  {
    id: 4,
    title: { id: "Senior In-House Legal Officer (Perbankan)", en: "Senior In-House Legal Officer (Banking)" },
    company: "PT Bank Syariah Indonesia Tbk",
    location: "Semarang",
    type: "Full-time",
    deadline: { id: "Ditutup: 05 Des 2024", en: "Deadline: 05 Dec 2024" },
    description: {
      id: "Review akad pembiayaan syariah, verifikasi legalitas jaminan agunan kebendaan (Fidusia & HT), serta mitigasi risiko hukum pembiayaan.",
      en: "Reviewing sharia financing contracts, verifying collateral legality (Fiduciary & HT), and mitigating financing legal risks.",
    },
    link: "#",
  },
  {
    id: 5,
    title: { id: "Asisten Notaris Bidang Akta Badan Usaha", en: "Notary Assistant - Business Entity Deeds" },
    company: "Kantor Notaris Hendra Kusuma, S.H., M.Kn.",
    location: "Surabaya",
    type: "Full-time",
    deadline: { id: "Ditutup: 12 Des 2024", en: "Deadline: 12 Dec 2024" },
    description: {
      id: "Membuat akta pendirian PT/CV/Yayasan, perubahan anggaran dasar, pelaporan sistem AHU Online, dan legalitas OSS.",
      en: "Drafting incorporation deeds for PT/CV/Foundations, articles of association amendments, AHU Online system reporting, and OSS licensing.",
    },
    link: "#",
  },
  {
    id: 6,
    title: { id: "Magang Calon Notaris", en: "Legal Internship (Notary Candidate)" },
    company: "Kantor Notaris & PPAT Siti Rahmawati, S.H., M.Kn.",
    location: "Semarang",
    type: "Internship",
    deadline: { id: "Ditutup: 20 Des 2024", en: "Deadline: 20 Dec 2024" },
    description: {
      id: "Program magang praktek kemahiran kenotariatan terstruktur bagi mahasiswa semester akhir atau lulusan baru MKn UNISSULA.",
      en: "Structured practical notarial internship program for final-year students or fresh graduates of MKn UNISSULA.",
    },
    link: "#",
  },
];

const KONTEN_SIAP = true;

export default function JobVacancies() {
  const t = useT();
  const { lang } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHasLoaded(true), 900);
    return () => clearTimeout(timer);
  }, []);

  const filteredJobs = vacancies.filter((job) => {
    const titleStr = typeof job.title === "object" ? (job.title[lang] || job.title.id || "") : job.title;
    const matchesSearch =
      titleStr.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "all" || job.type.toLowerCase() === selectedType.toLowerCase();
    return matchesSearch && matchesType;
  });

  if (!KONTEN_SIAP) {
    return (
      <>
        <Helmet>
          <title>
            {lang === "en"
              ? "Job Vacancies & Internships | MKn UNISSULA"
              : "Lowongan Pekerjaan & Magang | MKn UNISSULA"}
          </title>
          <meta
            name="description"
            content={
              lang === "en"
                ? "Career positions for Master of Notarial Law graduates from networks of law firms, notary offices, banking institutions, and agrarian partners of UNISSULA."
                : "Posisi karir bagi lulusan Magister Kenotariatan dari jaringan firma hukum, kantor notaris, institusi perbankan, dan instansi agraria mitra UNISSULA."
            }
          />
        </Helmet>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          viewport={viewportSettings}
          className="space-y-6"
        >
          <div className="space-y-2">
            <motion.span
              variants={itemVariants}
              className="text-xs font-bold tracking-wider uppercase text-primary block"
            >
              {t({ id: "Alumni & Karier", en: "Alumni & Careers" })}
            </motion.span>
            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-4xl lg:text-[40px] font-heading font-bold text-heading tracking-tight leading-tight"
            >
              {t({
                id: "Lowongan Pekerjaan & Magang",
                en: "Job Vacancies & Internships",
              })}
            </motion.h1>
          </div>

          <motion.div variants={lineVariants} className="w-full h-[2px] bg-primary my-4" />

          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-base text-body text-justify leading-relaxed"
          >
            {t({
              id: "Posisi karir bagi lulusan Magister Kenotariatan dari jaringan firma hukum, kantor notaris, institusi perbankan, dan instansi agraria mitra UNISSULA.",
              en: "Career positions for Master of Notarial Law graduates from networks of law firms, notary offices, banking institutions, and agrarian partners of UNISSULA.",
            })}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="p-12 text-center text-gray-400 border border-dashed border-gray-200 rounded-sm bg-white"
          >
            <p className="text-sm font-medium">
              {t({
                id: "Informasi lowongan pekerjaan dan magang akan segera diperbarui di sini.",
                en: "Job vacancy and internship information will be updated here soon.",
              })}
            </p>
          </motion.div>
        </motion.div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>
          {lang === "en"
            ? "Job Vacancies & Internships | MKn UNISSULA"
            : "Lowongan Pekerjaan & Magang | MKn UNISSULA"}
        </title>
        <meta
          name="description"
          content={
            lang === "en"
              ? "Job vacancies for junior notaries, PPAT staff, in-house legal officers, and notary internships for MKn UNISSULA graduates."
              : "Informasi lowongan kerja notaris junior, staf PPAT, in-house legal officer, dan magang calon notaris bagi lulusan MKn UNISSULA."
          }
        />
      </Helmet>

      <div className="space-y-6">
        {/* Header & Filter Container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="space-y-4">
            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-heading tracking-tight leading-tight"
            >
              {t({
                id: "Lowongan Pekerjaan & Magang",
                en: "Job Vacancies & Internships",
              })}
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-sm sm:text-base text-body text-justify leading-relaxed"
            >
              {t({
                id: "Eksplorasi posisi karir eksklusif bagi lulusan Magister Kenotariatan dari jaringan firma hukum, kantor notaris terakreditasi, institusi perbankan, dan instansi agraria mitra UNISSULA.",
                en: "Explore exclusive career positions for Master of Notarial Law graduates from partnered networks of law firms, accredited notary offices, banking institutions, and agrarian agencies.",
              })}
            </motion.p>
          </motion.div>

          <motion.div variants={lineVariants} className="w-full h-[2px] bg-primary my-4" />

          {/* Search & Filter Bar */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2"
          >
            {/* Search Input */}
            <motion.div variants={searchInputVariants} className="relative flex-grow max-w-md">
              <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={
                  lang === "en"
                    ? "Search position, notary office, or city..."
                    : "Cari posisi, kantor notaris, atau kota..."
                }
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 text-xs sm:text-sm text-heading placeholder-gray-400 focus:outline-none focus:border-primary focus:bg-white transition-colors"
              />
            </motion.div>

            {/* Filter Buttons */}
            <motion.div variants={itemVariants} className="flex items-center space-x-2 text-xs font-semibold overflow-x-auto pb-1 sm:pb-0">
              {["all", "Full-time", "Contract", "Internship"].map((type, idx) => (
                <motion.button
                  key={type}
                  type="button"
                  custom={idx}
                  variants={filterChipVariants}
                  onClick={() => setSelectedType(type)}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className={`px-3.5 py-2 transition-colors cursor-pointer shrink-0 ${
                    selectedType === type
                      ? "bg-primary text-white shadow-2xs"
                      : "bg-gray-100 text-heading hover:bg-gray-200"
                  }`}
                >
                  {type === "all" ? t({ id: "Semua Tipe", en: "All Types" }) : type}
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Vacancy Items */}
        <div className="divide-y divide-gray-200 pt-2">
          <AnimatePresence mode="popLayout">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job, idx) => (
                <motion.div
                  key={job.id}
                  layout
                  custom={{ idx, hasLoaded }}
                  variants={jobItemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                  exit={{ opacity: 0, y: -10 }}
                  whileHover={{ x: 4, transition: { duration: 0.2 } }}
                  className="py-7 flex flex-col md:flex-row md:items-start justify-between gap-5 group transition-colors hover:bg-white/40 px-2 rounded-xs"
                >
                  <div className="space-y-2.5 max-w-2xl">
                    <h3 className="font-heading font-medium text-xl sm:text-2xl text-primary group-hover:text-[#5a0000] transition-colors leading-snug">
                      {t(job.title)}
                    </h3>
                    <p className="text-sm sm:text-[14.5px] font-medium text-heading">
                      {job.company}
                    </p>
                    <p className="text-xs sm:text-sm text-body leading-relaxed">
                      {t(job.description)}
                    </p>

                    {/* Meta Tags */}
                    <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-xs sm:text-[13px] text-gray-500 pt-1">
                      <span className="flex items-center gap-1.5">
                        <FiMapPin className="text-sm shrink-0" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <FiClock className="text-sm shrink-0" />
                        {job.type}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <FiCalendar className="text-sm shrink-0" />
                        {t(job.deadline)}
                      </span>
                    </div>
                  </div>

                  <div className="shrink-0 pt-2 md:pt-0">
                    <motion.a
                      href={job.link}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      className="inline-flex items-center justify-center space-x-2 bg-primary hover:bg-[#570000] text-white px-6 py-2.5 text-xs font-semibold tracking-wider uppercase transition-colors shadow-2xs cursor-pointer"
                    >
                      <span>Apply</span>
                      <FiArrowRight className="text-sm" />
                    </motion.a>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-12 text-center text-gray-500 text-sm"
              >
                {t({
                  id: "Tidak ada lowongan yang sesuai dengan kriteria pencarian Anda.",
                  en: "No job vacancies matched your search criteria.",
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
