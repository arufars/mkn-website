import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { prestasiEvents } from "../../data/prestasiGalleryData";
import { useT, useLanguage } from "../../i18n/languageContext";
import GaleriGeser from "../../components/ui/GaleriGeser";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Breadcrumb from "../../components/ui/Breadcrumb";

const viewportSettings = { once: true, amount: 0.1 };

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function Prestasi() {
  const t = useT();
  const { lang } = useLanguage();

  const totalFoto = prestasiEvents.reduce((acc, ev) => acc + ev.foto.length, 0);

  return (
    <>
      <Helmet>
        <html lang={lang} />
        <title>
          {lang === "en"
            ? "Student Achievements Gallery | MKn UNISSULA"
            : "Galeri Prestasi Mahasiswa | MKn UNISSULA"}
        </title>
        <meta
          name="description"
          content={
            lang === "en"
              ? "Photo gallery of achievements by MKn UNISSULA students at national and regional competitions."
              : "Galeri foto prestasi mahasiswa MKn UNISSULA dalam berbagai lomba tingkat nasional dan regional."
          }
        />
      </Helmet>

      <main className="flex flex-col min-h-screen bg-banner font-body text-body">
        <Navbar />

        <div className="w-full flex-grow max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <Breadcrumb />

          <div className="space-y-10 mt-6">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          <motion.span
            variants={itemVariants}
            className="text-xs font-bold tracking-wider uppercase text-primary block"
          >
            {t({ id: "MAHASISWA", en: "STUDENTS" })}
          </motion.span>

          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-4xl lg:text-[40px] font-heading font-bold text-heading tracking-tight leading-tight"
          >
            {t({ id: "Galeri Prestasi", en: "Achievements Gallery" })}
          </motion.h1>

          <motion.div
            variants={itemVariants}
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
            className="h-[2px] bg-primary"
          />

          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-base text-body leading-relaxed max-w-2xl"
          >
            {t({
              id: `Dokumentasi prestasi mahasiswa MKn UNISSULA dalam berbagai ajang lomba kenotariatan tingkat nasional dan regional. Total ${totalFoto} foto dari ${prestasiEvents.length} event.`,
              en: `Photo documentation of MKn UNISSULA student achievements at national and regional notarial competitions. A total of ${totalFoto} photos from ${prestasiEvents.length} events.`,
            })}
          </motion.p>
        </motion.div>

        {/* Events */}
        {prestasiEvents.map((event) => (
          <motion.section
            key={event.id}
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            className="space-y-5"
          >
            {/* Event Header */}
            <div className="space-y-1 pb-3 border-b-2 border-heading">
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-heading">
                {t(event.nama)}
              </h2>
              <p className="text-sm text-body">{t(event.keterangan)}</p>
              <span className="text-xs text-body/60">
                {event.foto.length} {t({ id: "foto", en: "photos" })}
              </span>
            </div>

            {/* Galeri per event — tampilan dan pengaturannya sama dengan galeri
                IKANOTSULA: geser mendatar per halaman, klik untuk memperbesar. */}
            <GaleriGeser
              foto={event.foto.map((foto) => ({
                src: foto.src,
                alt: t(foto.caption),
              }))}
              ariaLabel={`${t({ id: "Galeri", en: "Gallery" })} ${t(event.nama)}`}
              otomatis={false}
              tampilkanJudul={false}
              kelasTrek="gap-4"
              kelasBasis="basis-full sm:basis-[calc((100%-1rem)/2)] md:basis-[calc((100%-2rem)/3)]"
              kelasKartu="aspect-[4/3] rounded-md border border-gray-200 shadow-2xs"
            />
          </motion.section>
        ))}
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}
