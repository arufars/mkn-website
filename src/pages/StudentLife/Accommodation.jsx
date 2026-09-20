import { Helmet } from "react-helmet-async";
import { useParams, Link } from "react-router-dom";
import { FiCheck } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PageTabs from "../../components/ui/PageTabs";
import HeroSlideshow from "../../components/ui/HeroSlideshow";
import FacilitySectionHeader from "../../components/Fasilitas/FacilitySectionHeader";
import FacilityGallery from "../../components/Fasilitas/FacilityGallery";
import { akomodasiData, akomodasiHeroSlides } from "../../data/akomodasiData";
import { useT } from "../../i18n/languageContext";

const akomodasiTabs = [
  {
    label: { id: "ASRAMA MAHASISWA", en: "STUDENT BOARDING HOUSE" },
    path: "/mahasiswa/akomodasi/asrama",
  },
  // "Guest House" dipertahankan di kedua bahasa: itu nama resmi fasilitasnya.
  {
    label: { id: "GUEST HOUSE", en: "GUEST HOUSE" },
    path: "/mahasiswa/akomodasi/guest-house",
  },
  // Fasilitas pendukung kampus.
  {
    label: { id: "SPORT CENTER", en: "SPORT CENTER" },
    path: "/mahasiswa/akomodasi/sport-center",
  },
  {
    label: { id: "GYM", en: "GYM" },
    path: "/mahasiswa/akomodasi/gym",
  },
  {
    label: { id: "LAPANGAN BASKET", en: "BASKETBALL COURT" },
    path: "/mahasiswa/akomodasi/lapangan-basket",
  },
  {
    label: { id: "COFFEE SHOP", en: "COFFEE SHOP" },
    path: "/mahasiswa/akomodasi/coffee-shop",
  },
  {
    label: { id: "KANTIN", en: "CANTEEN" },
    path: "/mahasiswa/akomodasi/kantin",
  },
  {
    label: { id: "KLINIK", en: "CLINIC" },
    path: "/mahasiswa/akomodasi/klinik",
  },
  {
    label: { id: "MINI MARKET", en: "MINIMARKET" },
    path: "/mahasiswa/akomodasi/mini-market",
  },
  {
    label: { id: "MASJID", en: "MOSQUE" },
    path: "/mahasiswa/akomodasi/masjid",
  },
];

const viewportSettings = {
  once: true,
  amount: 0.15,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
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

const tabContentVariants = {
  initial: { opacity: 0, y: 15 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.25,
      ease: "easeIn",
    },
  },
};

export default function Accommodation() {
  const t = useT();
  const { tab } = useParams();

  // Tab dicocokkan lewat slug pada data; slug tidak dikenal atau kosong jatuh ke asrama.
  const item =
    Object.values(akomodasiData).find((entri) => entri.id === tab) ?? akomodasiData.asrama;

  return (
    <>
      <Helmet>
        <title>{`${t(item.title)} | ${t({
          id: "Akomodasi MKn UNISSULA",
          en: "MKn UNISSULA Accommodation",
        })}`}</title>
        <meta name="description" content={t(item.header.paragraphs[0])} />
      </Helmet>

      <main className="flex flex-col min-h-screen bg-banner font-body text-body">
        {/* Header Navbar */}
        <Navbar />

        {/* Hero Section — komponen yang sama dengan hero Fasilitas. Putaran
            fotonya tetap sama di semua tab, jadi latarnya tidak ikut berganti
            saat pengunjung berpindah tab. */}
        <HeroSlideshow
          fotoLatar={akomodasiHeroSlides}
          eyebrow={{ id: "Akomodasi", en: "Accommodation" }}
          judul={{
            id: "Hunian & Fasilitas Kampus",
            en: "On-Campus Living & Facilities",
          }}
          deskripsi={{
            id: "Akomodasi dan fasilitas pendukung di lingkungan kampus menopang kenyamanan studi dan aktivitas di Magister Kenotariatan, dari asrama mahasiswa berkarakter islami dan wisma tamu representatif hingga sarana olahraga, kuliner, kesehatan, kebutuhan harian, dan ibadah.",
            en: "On-campus accommodation and supporting facilities sustain postgraduate study and daily life, from an Islamic student residence and a distinguished guest house to sports, dining, health, daily-needs, and worship facilities.",
          }}
        />

        {/* Sticky Page Tabs (Persis sama dengan komponen tab di Fasilitas) */}
        <PageTabs tabs={akomodasiTabs} ariaLabel="Akomodasi Tabs" />

        {/* Main Content Area (Full-Width, No Sidebar, Persis seperti Fasilitas) */}
        <div className="w-full flex-grow max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={item.id}
              variants={tabContentVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-12 sm:space-y-16"
            >
              {/* Section 1: Intro Heading (Animasi stagger kategori, judul, dan paragraf) */}
              <FacilitySectionHeader
                category={item.header.category}
                title={item.header.title}
                paragraphs={item.header.paragraphs}
              />

              {/* Galeri foto akomodasi — dengan animasi gambar utama & grid bertingkat (stagger) */}
              <FacilityGallery galeri={item.galeri} />

              {/*
                Fasilitas Utama.

                Kartu bercentang mengikuti susunan semula. Grid-nya dua kolom, bukan
                empat: butir fasilitas pada dokumen program studi berupa kalimat
                penuh, bukan frasa pendek, sehingga empat kolom membuatnya terpotong.
              */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={viewportSettings}
                className="space-y-4 pt-2"
              >
                <motion.h3
                  variants={cardVariants}
                  className="text-xs sm:text-sm font-bold uppercase tracking-wider text-heading pb-3 border-b border-gray-200"
                >
                  {t({ id: "Fasilitas Utama", en: "Main Facilities" })}
                </motion.h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {item.fasilitas.map((feat, idx) => (
                    <motion.div
                      key={idx}
                      variants={cardVariants}
                      whileHover={{ y: -2, transition: { duration: 0.2 } }}
                      className="flex items-start gap-3 p-3.5 bg-white border border-gray-200/80 rounded-sm shadow-2xs hover:border-primary/40 hover:shadow-xs transition-all"
                    >
                      <div className="w-6 h-6 rounded-full bg-red-50 text-primary flex items-center justify-center shrink-0 mt-0.5">
                        <FiCheck className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>
                      <span className="text-xs sm:text-sm text-heading font-medium leading-relaxed">
                        {t(feat)}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Navigasi Kemahasiswaan Bawah */}
              <motion.div
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={viewportSettings}
                className="pt-8 border-t border-gray-200 flex flex-wrap gap-4 items-center justify-between text-xs sm:text-sm"
              >
                <motion.div whileHover={{ x: -4 }} transition={{ duration: 0.2 }}>
                  <Link
                    to="/mahasiswa/organisasi"
                    className="inline-flex items-center font-semibold text-primary hover:underline transition-colors"
                  >
                    {t({
                      id: "← Organisasi Mahasiswa (IMANU)",
                      en: "← Student Organization (IMANU)",
                    })}
                  </Link>
                </motion.div>
                <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                  <Link
                    to="/"
                    className="inline-flex items-center font-medium text-body hover:text-primary transition-colors"
                  >
                    {t({
                      id: "Kembali ke Beranda →",
                      en: "Back to Home →",
                    })}
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <Footer />
      </main>
    </>
  );
}
