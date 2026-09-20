import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useParams, Link, Navigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { facultyData } from "../../data/facultyData";
import Img from "../../components/ui/Img";
import { useT, useLanguage } from "../../i18n/languageContext";
import DosenChatSidebar from "../../components/Staff/chat/DosenChatSidebar";
import DosenChatInline from "../../components/Staff/chat/DosenChatInline";
import DosenChatFloating from "../../components/Staff/chat/DosenChatFloating";
import DosenChatDrawer from "../../components/Staff/chat/DosenChatDrawer";
import DosenChatTab from "../../components/Staff/chat/DosenChatTab";

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

const listContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
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

const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const rowVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const lineVariants = {
  hidden: { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    originX: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function FacultyDetail() {
  const t = useT();
  const { lang } = useLanguage();
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  // Varian tampilan chatbot untuk peragaan ke klien:
  //   /staff/dosen/<slug>                   -> kartu sidebar (bawaan)
  //   /staff/dosen/<slug>?chat=inline       -> prompt menyatu setelah biografi
  //   /staff/dosen/<slug>?chat=drawer       -> tombol di hero, panel meluncur dari kanan
  //   /staff/dosen/<slug>?chat=tab          -> sidebar bertab bersama Riwayat Pendidikan
  //   /staff/dosen/<slug>?chat=floating     -> gelembung mengambang
  //   /staff/dosen/<slug>?chat=off          -> tanpa chatbot
  const varianChat = searchParams.get("chat") || "sidebar";

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [slug]);

  // Cari dosen berdasarkan slug atau id
  const faculty = facultyData.find(
    (f) => f.slug === slug || String(f.id) === slug
  );

  // Jika tidak ditemukan, redirect kembali ke direktori dosen
  if (!faculty) {
    return <Navigate to="/staff/dosen" replace />;
  }

  // Ambil 3 rekomendasi dosen lain
  const otherLecturers = facultyData
    .filter((f) => f.id !== faculty.id)
    .slice(0, 3);

  return (
    <>
      <Helmet>
        <html lang={lang} />
        <title>{`${faculty.name} | ${lang === "en" ? "Faculty Profile | MKn UNISSULA" : "MKn UNISSULA"}`}</title>
        <meta
          name="description"
          content={
            lang === "en"
              ? `Profile of ${faculty.name}, ${faculty.title} of Master of Notarial Law (MKn) UNISSULA.`
              : `Profil ${faculty.name}, ${faculty.title} Program Studi Magister Kenotariatan (MKn) UNISSULA.`
          }
        />
      </Helmet>

      <div className="w-full font-body text-body">
        {/* ========================================================================= */}
        {/* HERO SECTION: Asymmetrical Layout (Left Aligned Container, Right Full-Bleed) */}
        {/* ========================================================================= */}
        <section className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Kolom Kiri (7 Cols): Teks & Data Rapat Sejajar Margin Container 1600px */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="lg:col-span-7 pl-4 sm:pl-6 lg:pl-[max(2rem,calc((100vw-1600px)/2+2rem))] pr-4 sm:pr-8 lg:pr-14 py-6 sm:py-8 space-y-6"
            >
              <div className="space-y-2.5">
                <motion.span
                  variants={itemVariants}
                  className="text-xs font-bold tracking-[0.16em] uppercase text-primary block"
                >
                  {t({ id: "STAF · DOSEN", en: "STAFF · FACULTY" })}
                </motion.span>

                <motion.h1
                  variants={itemVariants}
                  className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-heading tracking-tight leading-tight"
                >
                  {faculty.name}
                </motion.h1>

                <motion.p
                  variants={itemVariants}
                  className="font-heading italic text-lg sm:text-xl text-special"
                >
                  {t(faculty.title)}
                </motion.p>

                <motion.div
                  variants={lineVariants}
                  className="w-full max-w-xl h-[2px] bg-primary my-3.5"
                />

                <motion.p
                  variants={itemVariants}
                  className="text-sm sm:text-base text-body leading-relaxed max-w-xl"
                >
                  {t(faculty.bio)}
                </motion.p>
              </div>

              {varianChat === "drawer" && (
                <motion.div variants={itemVariants} className="pt-1">
                  <DosenChatDrawer dosen={faculty} />
                </motion.div>
              )}

              {/* Metadata Rows - Dibatasi max-w-xl agar tidak melebar mendekati foto */}
              <motion.div
                variants={itemVariants}
                className="w-full max-w-xl pt-2 divide-y border-gray-100 border-t text-xs sm:text-sm"
              >
                {faculty.nidn && (
                  <div className="py-2.5 flex items-center justify-between">
                    <span className="text-body font-medium">NIDN</span>
                    <span className="font-semibold text-heading">{faculty.nidn}</span>
                  </div>
                )}
                {faculty.nip && (
                  <div className="py-2.5 flex items-center justify-between">
                    <span className="text-body font-medium">NIP / NIK</span>
                    <span className="font-semibold text-heading">{faculty.nip}</span>
                  </div>
                )}
                {faculty.joinedYear && (
                  <div className="py-2.5 flex items-center justify-between">
                    <span className="text-body font-medium">{t({ id: "Almamater / Bergabung", en: "Alma Mater / Joined" })}</span>
                    <span className="font-semibold text-heading">{faculty.joinedYear}</span>
                  </div>
                )}
                {faculty.email && (
                  <div className="py-2.5 flex items-center justify-between">
                    <span className="text-body font-medium">{t({ id: "Surel", en: "Email" })}</span>
                    <a
                      href={`mailto:${faculty.email}`}
                      className="font-semibold text-heading hover:text-primary transition-colors"
                    >
                      {faculty.email}
                    </a>
                  </div>
                )}
                {faculty.phone && (
                  <div className="py-2.5 flex items-center justify-between">
                    <span className="text-body font-medium">{t({ id: "Kontak / HP", en: "Contact / Phone" })}</span>
                    <span className="font-semibold text-heading">{faculty.phone}</span>
                  </div>
                )}
                {faculty.sintaId && (
                  <div className="py-2.5 flex items-center justify-between">
                    <span className="text-body font-medium">SINTA ID</span>
                    <span className="font-semibold text-heading">{faculty.sintaId}</span>
                  </div>
                )}
                {faculty.scopusId && (
                  <div className="py-2.5 flex items-center justify-between">
                    <span className="text-body font-medium">Scopus ID</span>
                    <span className="font-semibold text-heading">{faculty.scopusId}</span>
                  </div>
                )}
                {faculty.scholarId && (
                  <div className="py-2.5 flex items-center justify-between">
                    <span className="text-body font-medium">Google Scholar ID</span>
                    <span className="font-semibold text-heading">{faculty.scholarId}</span>
                  </div>
                )}
              </motion.div>
            </motion.div>

            {/* Kolom Kanan (5 Cols): Mentok sampai Ujung Kanan Layar (Full Bleed Right) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5 w-full bg-[#eaeaea] relative min-h-75 sm:min-h-90 lg:min-h-full overflow-hidden flex items-center justify-center"
            >
              {faculty.image ? (
                <Img
                  src={faculty.image}
                  alt={faculty.name}
                  className="w-full h-full object-cover object-[center_15%] contrast-105 rounded-md hover:scale-105 transition-transform duration-500"
                  eager
                />
              ) : (
                <span className="text-xs sm:text-sm text-gray-500 font-medium tracking-wide">
                  {t(faculty.imageCaption) || `Potret ${faculty.shortName || faculty.name}`}
                </span>
              )}
            </motion.div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* KONTEN UTAMA & SIDEBAR (Di dalam container standar 1600px) */}
        {/* ========================================================================= */}
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-16 sm:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Kolom Kiri (8 Cols): Biografi, Mata Kuliah, Publikasi, Pengabdian */}
            <div className="lg:col-span-8 space-y-12 sm:space-y-16">
              {/* Paragraf Biografi Lengkap */}
              {faculty.fullBio && faculty.fullBio.length > 0 && (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportSettings}
                  className="space-y-4 text-sm sm:text-base text-body leading-relaxed"
                >
                  {faculty.fullBio.map((paragraph, idx) => (
                    <motion.p variants={itemVariants} key={idx} className="leading-relaxed">
                      {t(paragraph)}
                    </motion.p>
                  ))}
                </motion.div>
              )}

              {varianChat === "inline" && <DosenChatInline dosen={faculty} />}

              {/* Mata Kuliah yang Diampu */}
              {faculty.courses && faculty.courses.length > 0 && (
                <motion.section
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportSettings}
                  className="space-y-4"
                >
                  <motion.h2
                    variants={itemVariants}
                    className="text-2xl sm:text-3xl font-heading font-normal text-heading tracking-tight pb-2 border-b-2 border-heading"
                  >
                    {t({ id: "Mata Kuliah yang Diampu", en: "Courses Taught" })}
                  </motion.h2>

                  <motion.div variants={itemVariants} className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs sm:text-sm">
                      <thead>
                        <tr className="border-b-2 border-heading text-xs font-bold tracking-wider text-heading uppercase">
                          <th className="py-3 pr-4 font-bold">{t({ id: "MATA KULIAH", en: "COURSE" })}</th>
                          <th className="py-3 px-4 font-bold">{t({ id: "PENEMPATAN", en: "PLACEMENT" })}</th>
                          <th className="py-3 pl-4 font-bold text-right">{t({ id: "SKS", en: "CREDITS" })}</th>
                        </tr>
                      </thead>
                      <motion.tbody
                        variants={listContainerVariants}
                        className="divide-y divide-gray-200"
                      >
                        {faculty.courses.map((course, idx) => (
                          <motion.tr
                            key={idx}
                            variants={rowVariants}
                            className="text-body hover:bg-gray-50/50 transition-colors"
                          >
                            <td className="py-3.5 pr-4 font-medium text-heading">
                              {t(course.name)}
                            </td>
                            <td className="py-3.5 px-4">{t(course.placement)}</td>
                            <td className="py-3.5 pl-4 text-right font-medium">
                              {course.sks}
                            </td>
                          </motion.tr>
                        ))}
                      </motion.tbody>
                    </table>
                  </motion.div>
                </motion.section>
              )}

              {/* Publikasi Terpilih */}
              {faculty.publications?.length > 0 && (
                <motion.section
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportSettings}
                  className="space-y-4"
                >
                  <motion.div variants={itemVariants} className="pb-2 border-b-2 border-heading">
                    <h2 className="text-2xl sm:text-3xl font-heading font-normal text-heading tracking-tight">
                      {t({ id: "Publikasi Terpilih", en: "Selected Publications" })}
                    </h2>
                  </motion.div>

                  <motion.div
                    variants={listContainerVariants}
                    className="divide-y divide-gray-100"
                  >
                    {faculty.publications.map((pub, idx) => (
                      <motion.div
                        key={idx}
                        variants={cardVariants}
                        whileHover={{ x: 4, transition: { duration: 0.2 } }}
                        className="py-5 space-y-1.5 transition-colors"
                      >
                        <span className="text-xs font-bold text-primary tracking-wider block">
                          {pub.year}
                        </span>
                        <h3 className="font-heading italic text-base sm:text-lg text-heading leading-snug">
                          {pub.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-body leading-relaxed">
                          {pub.journal}
                        </p>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.section>
              )}

              {/* Pengalaman Penelitian */}
              {faculty.researches?.length > 0 && (
                <motion.section
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportSettings}
                  className="space-y-4"
                >
                  <motion.h2
                    variants={itemVariants}
                    className="text-2xl sm:text-3xl font-heading font-normal text-heading tracking-tight pb-2 border-b-2 border-heading"
                  >
                    {t({ id: "Pengalaman Penelitian", en: "Research Experience" })}
                  </motion.h2>

                  <motion.div variants={itemVariants} className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs sm:text-sm">
                      <thead>
                        <tr className="border-b-2 border-heading text-xs font-bold tracking-wider text-heading uppercase">
                          <th className="py-3 pr-4 font-bold">{t({ id: "JUDUL PENELITIAN", en: "RESEARCH TITLE" })}</th>
                          <th className="py-3 px-4 font-bold">{t({ id: "SUMBER DANA", en: "FUNDING SOURCE" })}</th>
                          <th className="py-3 pl-4 font-bold text-right sm:text-left">{t({ id: "TAHUN", en: "YEAR" })}</th>
                        </tr>
                      </thead>
                      <motion.tbody
                        variants={listContainerVariants}
                        className="divide-y divide-gray-200"
                      >
                        {faculty.researches.map((res, idx) => (
                          <motion.tr
                            key={idx}
                            variants={rowVariants}
                            className="text-body hover:bg-gray-50/50 transition-colors"
                          >
                            <td className="py-3.5 pr-4 font-medium text-heading">
                              {res.title}
                            </td>
                            <td className="py-3.5 px-4 whitespace-nowrap">
                              <div>{res.funder}</div>
                              {res.amount && (
                                <div className="text-xs text-primary font-medium">{res.amount}</div>
                              )}
                            </td>
                            <td className="py-3.5 pl-4 text-right sm:text-left font-medium">
                              {res.year}
                            </td>
                          </motion.tr>
                        ))}
                      </motion.tbody>
                    </table>
                  </motion.div>
                </motion.section>
              )}

              {/* Pengabdian dan Penugasan */}
              {faculty.communityServices?.length > 0 && (
                <motion.section
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportSettings}
                  className="space-y-4"
                >
                  <motion.h2
                    variants={itemVariants}
                    className="text-2xl sm:text-3xl font-heading font-normal text-heading tracking-tight pb-2 border-b-2 border-heading"
                  >
                    {t({ id: "Pengabdian dan Penugasan", en: "Community Service and Assignments" })}
                  </motion.h2>

                  <motion.div variants={itemVariants} className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs sm:text-sm">
                      <thead>
                        <tr className="border-b-2 border-heading text-xs font-bold tracking-wider text-heading uppercase">
                          <th className="py-3 pr-4 font-bold">{t({ id: "PENUGASAN", en: "ASSIGNMENT" })}</th>
                          <th className="py-3 px-4 font-bold">{t({ id: "INSTITUSI / TOPIK", en: "INSTITUTION / TOPIC" })}</th>
                          <th className="py-3 pl-4 font-bold text-right sm:text-left">{t({ id: "PERIODE", en: "PERIOD" })}</th>
                        </tr>
                      </thead>
                      <motion.tbody
                        variants={listContainerVariants}
                        className="divide-y divide-gray-200"
                      >
                        {faculty.communityServices.map((service, idx) => (
                          <motion.tr
                            key={idx}
                            variants={rowVariants}
                            className="text-body hover:bg-gray-50/50 transition-colors"
                          >
                            <td className="py-3.5 pr-4 font-medium text-heading">
                              {t(service.role)}
                            </td>
                            <td className="py-3.5 px-4">{t(service.institution)}</td>
                            <td className="py-3.5 pl-4 text-right sm:text-left">
                              {t(service.period)}
                            </td>
                          </motion.tr>
                        ))}
                      </motion.tbody>
                    </table>
                  </motion.div>
                </motion.section>
              )}

              {/* Pemakalah Seminar Ilmiah */}
              {faculty.seminars?.length > 0 && (
                <motion.section
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportSettings}
                  className="space-y-4"
                >
                  <motion.h2
                    variants={itemVariants}
                    className="text-2xl sm:text-3xl font-heading font-normal text-heading tracking-tight pb-2 border-b-2 border-heading"
                  >
                    {t({ id: "Pemakalah Seminar Ilmiah (Oral Presentation)", en: "Scientific Seminar Presenter (Oral Presentation)" })}
                  </motion.h2>

                  <motion.div variants={itemVariants} className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs sm:text-sm">
                      <thead>
                        <tr className="border-b-2 border-heading text-xs font-bold tracking-wider text-heading uppercase">
                          <th className="py-3 pr-4 font-bold">{t({ id: "NAMA TEMU ILMIAH / SEMINAR", en: "SEMINAR / CONFERENCE NAME" })}</th>
                          <th className="py-3 px-4 font-bold">{t({ id: "JUDUL ARTIKEL ILMIAH", en: "SCIENTIFIC ARTICLE TITLE" })}</th>
                          <th className="py-3 pl-4 font-bold text-right sm:text-left">{t({ id: "WAKTU & TEMPAT", en: "TIME & LOCATION" })}</th>
                        </tr>
                      </thead>
                      <motion.tbody
                        variants={listContainerVariants}
                        className="divide-y divide-gray-200"
                      >
                        {faculty.seminars.map((sem, idx) => (
                          <motion.tr
                            key={idx}
                            variants={rowVariants}
                            className="text-body hover:bg-gray-50/50 transition-colors"
                          >
                            <td className="py-3.5 pr-4 font-medium text-heading">
                              {sem.event}
                            </td>
                            <td className="py-3.5 px-4">{sem.title}</td>
                            <td className="py-3.5 pl-4 text-right sm:text-left">
                              {sem.timePlace}
                            </td>
                          </motion.tr>
                        ))}
                      </motion.tbody>
                    </table>
                  </motion.div>
                </motion.section>
              )}

              {/* Karya Buku */}
              {/* Seksi disembunyikan sepenuhnya bila dosen belum punya karya buku */}
              {faculty.books?.length > 0 && (
                <motion.section
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportSettings}
                  className="space-y-4"
                >
                  <motion.h2
                    variants={itemVariants}
                    className="text-2xl sm:text-3xl font-heading font-normal text-heading tracking-tight pb-2 border-b-2 border-heading"
                  >
                    {t({ id: "Karya Buku", en: "Book Publications" })}
                  </motion.h2>

                  <motion.div variants={itemVariants} className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs sm:text-sm">
                      <thead>
                        <tr className="border-b-2 border-heading text-xs font-bold tracking-wider text-heading uppercase">
                          <th className="py-3 pr-4 font-bold">{t({ id: "JUDUL BUKU", en: "BOOK TITLE" })}</th>
                          <th className="py-3 px-4 font-bold">{t({ id: "PENERBIT", en: "PUBLISHER" })}</th>
                          <th className="py-3 px-4 font-bold text-center">{t({ id: "JUMLAH HALAMAN", en: "PAGES" })}</th>
                          <th className="py-3 pl-4 font-bold text-right sm:text-left">{t({ id: "TAHUN", en: "YEAR" })}</th>
                        </tr>
                      </thead>
                      <motion.tbody
                        variants={listContainerVariants}
                        className="divide-y divide-gray-200"
                      >
                        {faculty.books.map((book, idx) => (
                          <motion.tr
                            key={idx}
                            variants={rowVariants}
                            className="text-body hover:bg-gray-50/50 transition-colors"
                          >
                            <td className="py-3.5 pr-4 font-medium text-heading">
                              {book.title}
                            </td>
                            <td className="py-3.5 px-4">{book.publisher}</td>
                            <td className="py-3.5 px-4 text-center">
                              {book.pages || "—"}
                            </td>
                            <td className="py-3.5 pl-4 text-right sm:text-left font-medium">
                              {book.year}
                            </td>
                          </motion.tr>
                        ))}
                      </motion.tbody>
                    </table>
                  </motion.div>
                </motion.section>
              )}

              {/* Perolehan HKI */}
              {/* Begitu pula HKI: tanpa data, seksinya tidak dirender */}
              {faculty.hki?.length > 0 && (
                <motion.section
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportSettings}
                  className="space-y-4"
                >
                  <motion.h2
                    variants={itemVariants}
                    className="text-2xl sm:text-3xl font-heading font-normal text-heading tracking-tight pb-2 border-b-2 border-heading"
                  >
                    {t({ id: "Perolehan HKI (Hak Kekayaan Intelektual)", en: "Intellectual Property Rights (IPR)" })}
                  </motion.h2>

                  <motion.div variants={itemVariants} className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs sm:text-sm">
                      <thead>
                        <tr className="border-b-2 border-heading text-xs font-bold tracking-wider text-heading uppercase">
                          <th className="py-3 pr-4 font-bold">{t({ id: "JUDUL / TEMA HKI", en: "IPR TITLE / THEME" })}</th>
                          <th className="py-3 px-4 font-bold">{t({ id: "JENIS", en: "TYPE" })}</th>
                          <th className="py-3 px-4 font-bold">{t({ id: "NOMOR P/ID", en: "P/ID NUMBER" })}</th>
                          <th className="py-3 pl-4 font-bold text-right sm:text-left">{t({ id: "TAHUN", en: "YEAR" })}</th>
                        </tr>
                      </thead>
                      <motion.tbody
                        variants={listContainerVariants}
                        className="divide-y divide-gray-200"
                      >
                        {faculty.hki.map((item, idx) => (
                          <motion.tr
                            key={idx}
                            variants={rowVariants}
                            className="text-body hover:bg-gray-50/50 transition-colors"
                          >
                            <td className="py-3.5 pr-4 font-medium text-heading">
                              {item.title}
                            </td>
                            <td className="py-3.5 px-4">{item.type}</td>
                            <td className="py-3.5 px-4 font-mono text-xs">
                              {item.number}
                            </td>
                            <td className="py-3.5 pl-4 text-right sm:text-left font-medium">
                              {item.year}
                            </td>
                          </motion.tr>
                        ))}
                      </motion.tbody>
                    </table>
                  </motion.div>
                </motion.section>
              )}
            </div>

            {/* Kolom Kanan / Sidebar (4 Cols): Riwayat Pendidikan & Dosen Lain */}
            <motion.aside
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={viewportSettings}
              className="lg:col-span-4 space-y-10 lg:pl-2"
            >
              {varianChat === "sidebar" && <DosenChatSidebar dosen={faculty} />}
              {varianChat === "tab" && <DosenChatTab dosen={faculty} />}

              {/* Riwayat Pendidikan — disembunyikan pada varian tab karena
                  sudah tampil di dalam komponen bertab di atas. */}
              {varianChat !== "tab" && faculty.education && faculty.education.length > 0 && (
                <motion.div variants={itemVariants} className="space-y-4">
                  <h3 className="text-xs font-bold tracking-[0.14em] uppercase text-body pb-2 border-b border-gray-200">
                    {t({ id: "RIWAYAT PENDIDIKAN", en: "EDUCATION HISTORY" })}
                  </h3>
                  <motion.div
                    variants={listContainerVariants}
                    className="space-y-5 pt-1"
                  >
                    {faculty.education.map((edu, idx) => (
                      <motion.div key={idx} variants={cardVariants} className="space-y-0.5">
                        {edu.year && edu.year !== "—" && (
                          <span className="text-xs sm:text-sm font-bold text-primary block">
                            {edu.year}
                          </span>
                        )}
                        <h4 className="font-heading font-bold text-sm sm:text-base text-heading">
                          {t(edu.degree)}
                        </h4>
                        <p className="text-xs sm:text-sm text-body">
                          {edu.university}
                        </p>
                        {edu.thesis && (
                          <p className="text-xs text-special italic pt-0.5">
                            &ldquo;{t(edu.thesis)}&rdquo;
                          </p>
                        )}
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              )}

              {/* Dosen Lain */}
              {otherLecturers.length > 0 && (
                <motion.div variants={itemVariants} className="space-y-4 pt-2">
                  <h3 className="text-xs font-bold tracking-[0.14em] uppercase text-body pb-2 border-b border-gray-200">
                    {t({ id: "DOSEN LAIN", en: "OTHER FACULTY" })}
                  </h3>
                  <motion.div
                    variants={listContainerVariants}
                    className="space-y-4 pt-1"
                  >
                    {otherLecturers.map((other) => (
                      <motion.div key={other.id} variants={cardVariants}>
                        <Link
                          to={`/staff/dosen/${other.slug || other.id}`}
                          className="block group"
                        >
                          <h4 className="text-xs sm:text-sm font-semibold text-heading group-hover:text-primary transition-colors">
                            {other.shortName || other.name}
                          </h4>
                          <p className="text-xs text-body mt-0.5">
                            {t(other.title)}
                          </p>
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>

                  <div className="pt-2">
                    <Link
                      to="/staff/dosen"
                      className="block w-full py-2.5 px-4 bg-white border border-gray-300 hover:bg-gray-50 text-heading text-xs font-medium text-center rounded-xs transition-colors shadow-2xs"
                    >
                      {t({ id: "Semua dosen", en: "All faculty" })}
                    </Link>
                  </div>
                </motion.div>
              )}
            </motion.aside>
          </div>
        </div>
      </div>

      {varianChat === "floating" && <DosenChatFloating dosen={faculty} />}
    </>
  );
}
