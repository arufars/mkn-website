import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Breadcrumb from "../../components/ui/Breadcrumb";
import { studentOrganizationsData } from "../../data/studentOrganizationsData";
import ZoomableImg from "../../components/ui/ZoomableImg";
import GaleriGeser from "../../components/ui/GaleriGeser";
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
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const heroContentContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const lineVariants = {
  hidden: { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    originX: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/** Judul seksi dengan garis hitam animasi, dipakai berulang di kolom utama. */
function JudulSeksi({ children }) {
  return (
    <div className="mb-6">
      <motion.h2
        variants={itemVariants}
        className="text-2xl sm:text-3xl font-heading font-bold text-heading"
      >
        {children}
      </motion.h2>
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: "100%" }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
        className="h-[1.5px] bg-heading mt-2"
      />
    </div>
  );
}

/**
 * Satu baris nama pengurus. NIM ditampilkan hanya bila dokumen sumber
 * mencantumkannya — beberapa nama memang belum memilikinya.
 */
function BarisNama({ name, nim, role }) {
  const t = useT();
  return (
    <div className="py-2.5 flex items-baseline justify-between gap-4">
      <div className="min-w-0">
        {role && (
          <span className="block text-[10px] font-bold tracking-[0.14em] uppercase text-primary mb-0.5">
            {t(role)}
          </span>
        )}
        <span className="text-sm sm:text-[15px] font-medium text-heading leading-snug">
          {name}
        </span>
      </div>
      {nim && (
        <span className="text-xs text-body tabular-nums shrink-0">{nim}</span>
      )}
    </div>
  );
}

export default function StudentOrganizationDetail() {
  const t = useT();
  const { lang } = useLanguage();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  const organization = studentOrganizationsData[0];

  return (
    <>
      <Helmet>
        <title>{`${organization.shortName} | ${t({
          id: "MKn UNISSULA",
          en: "MKn UNISSULA",
        })}`}</title>
        <meta name="description" content={t(organization.description)} />
      </Helmet>

      {/*
        overflow-x-CLIP, bukan -hidden.

        `overflow-x: hidden` membuat overflow-y ikut terhitung `auto`, sehingga
        <main> berubah menjadi kotak penggulung. Navbar yang `sticky top-0` lalu
        menempel pada kotak itu — yang ikut tergulung — bukan pada viewport,
        jadi navbar-nya tampak tidak sticky. `clip` menahan luapan mendatar
        tanpa menjadikan elemen ini kotak penggulung.
      */}
      <main className="flex flex-col min-h-screen bg-banner font-body text-body overflow-x-clip">
        <Navbar />

        {/* ========================================================================= */}
        {/* BREADCRUMB (Aligned with 1600px Max-Width) */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full flex-grow max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12"
        >
          <Breadcrumb />
        </motion.div>

        {/* ========================================================================= */}
        {/* HERO SECTION: Asymmetrical Layout (Left in Container, Right Full Bleed) */}
        {/* ========================================================================= */}
        <section className="w-full border-b border-gray-100/80">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Left Info Column (7 cols): Aligned with 1600px grid margin */}
            <motion.div
              variants={heroContentContainer}
              initial="hidden"
              animate="visible"
              className="lg:col-span-7 pl-4 sm:pl-6 lg:pl-[max(2rem,calc((100vw-1600px)/2+2rem))] pr-4 sm:pr-8 lg:pr-14 py-6 sm:py-10 space-y-6 flex flex-col justify-center"
            >
              <motion.div variants={heroContentContainer}>
                <motion.span
                  variants={itemVariants}
                  className="text-[11px] sm:text-xs font-bold tracking-[0.16em] uppercase text-primary block mb-2"
                >
                  {t(organization.category)}
                </motion.span>
                <motion.h1
                  variants={itemVariants}
                  className="text-3xl sm:text-4xl lg:text-[44px] font-heading font-bold text-heading leading-[1.15] tracking-normal"
                >
                  {organization.shortName}
                </motion.h1>
                <motion.p
                  variants={itemVariants}
                  className="mt-2 text-sm sm:text-base font-heading text-special leading-snug max-w-xl"
                >
                  {t(organization.title)}
                </motion.p>
                <motion.div
                  variants={lineVariants}
                  className="w-full max-w-xl h-[2px] bg-primary mt-4 mb-5"
                />
                <motion.p
                  variants={itemVariants}
                  className="text-sm sm:text-base text-body text-justify leading-relaxed max-w-xl"
                >
                  {t(organization.description)}
                </motion.p>
              </motion.div>

              {/* Metadata Table */}
              {organization.meta?.length > 0 && (
                <motion.div
                  variants={itemVariants}
                  className="w-full max-w-xl border-t border-gray-200 divide-y divide-gray-200 text-xs sm:text-sm pt-1"
                >
                  {organization.meta.map((m, idx) => (
                    <div key={typeof m.label === "string" ? m.label : idx} className="py-2.5 flex items-center justify-between gap-4">
                      <span className="text-body font-normal">{t(m.label)}</span>
                      <span className="font-semibold text-heading text-right">{t(m.value)}</span>
                    </div>
                  ))}
                </motion.div>
              )}
            </motion.div>

            {/* Right Photo Column (5 cols): Full Bleed Right */}
            <motion.div
              variants={scaleIn}
              initial="hidden"
              animate="visible"
              className="lg:col-span-5 w-full bg-[#eaeaea] relative min-h-[300px] sm:min-h-[380px] lg:min-h-full overflow-hidden flex items-center justify-center"
            >
              <ZoomableImg
                src={organization.image}
                alt={t(organization.imageCaption) || t(organization.title)}
                caption={t(organization.imageCaption)}
                className="w-full h-full object-cover object-center rounded-md hover:scale-105 transition-transform duration-500"
                eager
              />
            </motion.div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* MIDDLE 2-COLUMN MAIN CONTENT: Left Content Sections & Right Sidebar */}
        {/* ========================================================================= */}
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 my-10 sm:my-14 items-start">
            {/* Left Column (8 cols): Sejarah, Fungsi & Tujuan, Program Kerja */}
            <div className="lg:col-span-8 space-y-12 sm:space-y-16 text-sm sm:text-base text-body leading-relaxed">
              {/* SEJARAH */}
              {organization.narrative?.length > 0 && (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportSettings}
                >
                  <JudulSeksi>{t({ id: "Sejarah", en: "History" })}</JudulSeksi>
                  <motion.div variants={itemVariants} className="space-y-5 text-justify">
                    {organization.narrative.map((paragraph, idx) => (
                      <p key={idx}>{t(paragraph)}</p>
                    ))}
                  </motion.div>
                </motion.div>
              )}

              {/* FUNGSI DAN TUJUAN */}
              {organization.fungsi?.length > 0 && (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportSettings}
                >
                  <JudulSeksi>{t({ id: "Fungsi dan Tujuan", en: "Functions and Objectives" })}</JudulSeksi>
                  <motion.div
                    variants={containerVariants}
                    className="grid grid-cols-1 sm:grid-cols-3 border-t border-l border-gray-200 bg-white"
                  >
                    {organization.fungsi.map((fungsi, idx) => (
                      <motion.div
                        key={idx}
                        variants={cardVariants}
                        whileHover={{ y: -3, transition: { duration: 0.2 } }}
                        className="p-5 sm:p-6 border-r border-b border-gray-200 space-y-2 transition-colors hover:bg-neutral-50/70"
                      >
                        <span className="text-sm font-bold text-primary tabular-nums">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <p className="text-sm text-body leading-relaxed">{t(fungsi)}</p>
                      </motion.div>
                    ))}
                  </motion.div>
                  {organization.tujuan && (
                    <motion.p
                      variants={itemVariants}
                      className="mt-6 text-sm sm:text-base text-justify leading-relaxed"
                    >
                      {t(organization.tujuan)}
                    </motion.p>
                  )}
                </motion.div>
              )}

              {/* PROGRAM KERJA — dikelompokkan per divisi, sesuai hasil RAKER */}
              {organization.programKerja?.length > 0 && (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportSettings}
                >
                  <JudulSeksi>
                    {t({
                      id: `Program Kerja ${organization.periode}`,
                      en: `Work Programmes ${organization.periode}`,
                    })}
                  </JudulSeksi>
                  <div className="space-y-8">
                    {organization.programKerja.map((group, idx) => (
                      <motion.div
                        key={idx}
                        variants={cardVariants}
                        className="p-4 sm:p-5 rounded-xs bg-white border border-gray-100 hover:border-gray-200 hover:shadow-2xs transition-all"
                      >
                        <div className="flex items-baseline gap-3 pb-2 mb-3 border-b border-gray-200">
                          <span className="font-heading text-lg font-bold text-primary tabular-nums leading-none">
                            {String(idx + 1).padStart(2, "0")}
                          </span>
                          <h3 className="font-heading font-bold text-base sm:text-lg text-heading leading-snug">
                            {t(group.divisi)}
                          </h3>
                        </div>
                        <ul className="space-y-2.5 pl-1">
                          {group.items.map((item, i) => (
                            <li key={i} className="flex gap-3 text-sm leading-relaxed">
                              <span className="text-primary shrink-0 mt-[3px]">—</span>
                              <span>{t(item)}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Right Column (4 cols): Ringkasan & Landasan */}
            <aside className="lg:col-span-4 space-y-8 pl-0 lg:pl-6 lg:border-l border-gray-200 lg:sticky lg:top-[calc(var(--header-h)+0.5rem)] lg:self-start">
              {/* RINGKASAN */}
              {organization.summary?.length > 0 && (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportSettings}
                  className="space-y-4"
                >
                  <motion.h3
                    variants={itemVariants}
                    className="text-[11px] font-bold tracking-[0.16em] uppercase text-body pb-3 border-b border-gray-200"
                  >
                    {t({ id: "RINGKASAN", en: "SUMMARY" })}
                  </motion.h3>
                  <div className="space-y-5">
                    {organization.summary.map((stat, idx) => (
                      <motion.div
                        key={idx}
                        variants={itemVariants}
                        whileHover={{ x: 3, transition: { duration: 0.2 } }}
                        className="space-y-0.5"
                      >
                        <div className="font-heading text-3xl sm:text-4xl font-bold text-primary leading-none">
                          {stat.number}
                        </div>
                        <div className="text-xs sm:text-sm text-body">{t(stat.label)}</div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* LANDASAN */}
              {organization.landasan?.length > 0 && (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportSettings}
                  className="space-y-4 pt-2"
                >
                  <motion.h3
                    variants={itemVariants}
                    className="text-[11px] font-bold tracking-[0.16em] uppercase text-body pb-3 border-b border-gray-200"
                  >
                    {t({ id: "LANDASAN", en: "FOUNDATIONS" })}
                  </motion.h3>
                  <ul className="space-y-2">
                    {organization.landasan.map((nilai, idx) => (
                      <motion.li
                        key={idx}
                        variants={itemVariants}
                        whileHover={{ x: 4, transition: { duration: 0.2 } }}
                        className="text-xs sm:text-sm text-heading font-medium border-l-2 border-primary pl-3 py-0.5 transition-colors"
                      >
                        {t(nilai)}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </aside>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* FULL BLEED GALLERY: dipisah per kegiatan seperti pola Ikanotsula */}
        {/* ========================================================================= */}
        {(() => {
          // Foto tiap kegiatan diambil langsung dari data organisasi.
          const galeri = (organization.galeri ?? [])
            .map((kegiatan) => {
              const judulText = t(kegiatan.judul);
              const namaLengkap = kegiatan.tahun ? `${judulText} ${kegiatan.tahun}` : judulText;
              return {
                ...kegiatan,
                foto: (kegiatan.foto ?? []).map((src, idx) => ({
                  src,
                  alt: `${namaLengkap} — ${lang === "en" ? "photo" : "foto"} ${idx + 1}`,
                  caption: `${namaLengkap} — ${lang === "en" ? "photo" : "foto"} ${idx + 1}`,
                })),
              };
            })
            .filter((kg) => kg.foto.length > 0);

          if (galeri.length === 0) return null;

          return (
            <div className="w-full my-8 sm:my-14 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
              <motion.section
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={viewportSettings}
                className="space-y-10"
              >
                <JudulSeksi>{t({ id: "Galeri Kegiatan", en: "Activity Gallery" })}</JudulSeksi>

                {galeri.map((kegiatan) => (
                  <motion.div
                    key={kegiatan.id}
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportSettings}
                    className="space-y-4"
                  >
                    {/* Kepala kegiatan: nama acara, tahun, dan jumlah foto */}
                    <motion.div
                      variants={itemVariants}
                      className="flex flex-wrap items-baseline gap-x-3 gap-y-1 pb-2 border-b border-gray-200"
                    >
                      <h3 className="font-heading font-bold text-lg sm:text-xl text-heading leading-snug">
                        {t(kegiatan.judul)}
                      </h3>

                      {/* Lencana tahun hanya tampil bila tahunnya diisi. */}
                      {kegiatan.tahun && (
                        <span className="text-[11px] font-bold tracking-wider text-primary uppercase bg-red-50 border border-primary/20 px-2 py-0.5 rounded-xs tabular-nums">
                          {kegiatan.tahun}
                        </span>
                      )}

                      <span className="text-xs text-gray-400 ml-auto tabular-nums">
                        {kegiatan.foto.length} {lang === "en" ? "photos" : "foto"}
                      </span>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <GaleriGeser
                        foto={kegiatan.foto}
                        ariaLabel={`${t({ id: "Galeri", en: "Gallery" })} ${t(kegiatan.judul)} ${kegiatan.tahun}`.trim()}
                        otomatis={false}
                        tampilkanJudul={false}
                        kelasTrek="gap-4"
                        kelasBasis="basis-full sm:basis-[calc((100%-1rem)/2)] md:basis-[calc((100%-2rem)/3)]"
                        kelasKartu="aspect-[4/3] rounded-md border border-gray-200 shadow-2xs"
                      />
                    </motion.div>
                  </motion.div>
                ))}
              </motion.section>
            </div>
          );
        })()}

        {/* ========================================================================= */}
        {/* STRUKTUR ORGANISASI (Pengurus Inti & Divisi) */}
        {/* ========================================================================= */}
        <div className="w-full flex-grow max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
          <motion.section
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
          >
            <JudulSeksi>
              {t({
                id: `Struktur Organisasi ${organization.periode}`,
                en: `Organisational Structure ${organization.periode}`,
              })}
            </JudulSeksi>

            {/* Pengurus Inti — tanpa foto, program studi belum menyerahkan pas foto */}
            {organization.pengurusInti?.length > 0 && (
              <motion.div
                variants={containerVariants}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-gray-200 bg-white"
              >
                {organization.pengurusInti.map((member) => (
                  <motion.div
                    key={member.name}
                    variants={cardVariants}
                    whileHover={{ y: -2, transition: { duration: 0.2 } }}
                    className="px-5 py-4 sm:px-6 sm:py-5 border-r border-b border-gray-200 transition-colors hover:bg-neutral-50/70"
                  >
                    <BarisNama {...member} />
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Divisi beserta koordinator dan anggotanya */}
            {organization.divisi?.length > 0 && (
              <motion.div
                variants={containerVariants}
                className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6"
              >
                {organization.divisi.map((div, idx) => (
                  <motion.div
                    key={idx}
                    variants={cardVariants}
                    whileHover={{ y: -4, transition: { duration: 0.25 } }}
                    className="bg-white border border-gray-200 rounded-xs p-6 flex flex-col hover:shadow-sm hover:border-gray-300 transition-all"
                  >
                    <h3 className="font-heading font-bold text-base sm:text-lg text-heading leading-snug pb-3 border-b-2 border-primary">
                      {t(div.nama)}
                    </h3>

                    <div className="mt-4">
                      <BarisNama
                        role={{ id: "Koordinator", en: "Coordinator" }}
                        name={div.koordinator.name}
                        nim={div.koordinator.nim}
                      />
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <span className="block text-[10px] font-bold tracking-[0.14em] uppercase text-body mb-1">
                        {t({ id: "Anggota", en: "Members" })}
                      </span>
                      <ol className="divide-y divide-gray-100">
                        {div.anggota.map((anggota, i) => (
                          <li key={i} className="flex gap-3 items-baseline">
                            <span className="text-xs text-gray-400 tabular-nums w-4 shrink-0">
                              {i + 1}.
                            </span>
                            <div className="flex-1 min-w-0">
                              <BarisNama name={anggota.name} nim={anggota.nim} />
                            </div>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.section>

          {/* Navigasi Kemahasiswaan Lainnya */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            className="mt-14 pt-8 border-t border-gray-200 flex flex-wrap gap-4 items-center justify-end text-xs sm:text-sm"
          >
            <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
              <Link
                to="/mahasiswa/akomodasi"
                className="inline-flex items-center font-semibold text-primary hover:underline transition-colors"
              >
                {t({
                  id: "Informasi Akomodasi Mahasiswa →",
                  en: "Student Accommodation Info →",
                })}
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <Footer />
      </main>
    </>
  );
}

