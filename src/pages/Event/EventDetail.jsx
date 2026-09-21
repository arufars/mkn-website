import { useState, useEffect, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FiArrowLeft, FiPlus, FiExternalLink, FiRefreshCw, FiAlertCircle } from "react-icons/fi";
import { motion } from "framer-motion";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ZoomableImg from "../../components/ui/ZoomableImg";
import StrapiArticleBlocks from "../../components/Strapi/StrapiArticleBlocks";
import { getHybridEventBySlug, getUpcomingEvents } from "../../services/eventService";
import {
  formatEventDate as formatIndoDate,
  getEventDayName as getIndoDayName,
  generateGoogleCalendarUrl,
  downloadIcsFile,
} from "../../utils/eventFormatters";
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

const flyerVariants = {
  hidden: { opacity: 0, y: 25, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function EventDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const t = useT();
  const { lang } = useLanguage();

  const [event, setEvent] = useState(null);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Scroll to top saat slug berubah
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [slug]);

  // Ambil detail event hybrid
  useEffect(() => {
    let isMounted = true;
    async function loadDetail() {
      if (!slug) return;
      setLoading(true);
      setError(null);
      try {
        const data = await getHybridEventBySlug(slug, { locale: lang });
        if (!isMounted) return;
        setEvent(data);
        if (data) {
          const upcoming = await getUpcomingEvents(data, { limit: 6, locale: lang });
          if (isMounted) setUpcomingEvents(upcoming);
        }
      } catch (err) {
        if (isMounted) {
          console.error("[EventDetail] Error fetching event:", err);
          setError(err?.message || "Failed to load event");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadDetail();
    return () => {
      isMounted = false;
    };
  }, [slug, lang]);

  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-white font-body text-body">
        <Navbar />
        <div className="flex-grow flex items-center justify-center py-28">
          <div className="text-center space-y-4">
            <div className="inline-block w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-gray-500 font-medium">
              {t({ id: "Memuat detail agenda...", en: "Loading event details..." })}
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Fallback jika event tidak ditemukan
  if (!event) {
    return (
      <>
        <Helmet>
          <html lang={lang} />
          <title>{lang === "en" ? "Event Not Found | MKn UNISSULA" : "Agenda Tidak Ditemukan | MKn UNISSULA"}</title>
        </Helmet>
        <div className="flex flex-col min-h-screen bg-white font-body text-body">
          <Navbar />
          <div className="flex-grow max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
            <h1 className="text-3xl font-heading font-bold text-heading">
              {t({ id: "Agenda Acara Tidak Ditemukan", en: "Event Not Found" })}
            </h1>
            <p className="text-gray-600">
              {t({
                id: "Agenda yang Anda cari mungkin telah berakhir atau tautan tidak valid.",
                en: "The event you are looking for may have concluded or the link is invalid.",
              })}
            </p>
            <div>
              <Link
                to="/event"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-[#680000] text-white text-sm font-semibold rounded-xs transition-colors"
              >
                <FiArrowLeft className="w-4 h-4" />
                <span>{t({ id: "Kembali ke Kalender Agenda", en: "Back to Events Calendar" })}</span>
              </Link>
            </div>
          </div>
          <Footer />
        </div>
      </>
    );
  }

  const googleCalUrl = generateGoogleCalendarUrl(event);

  return (
    <>
      <Helmet>
        <html lang={lang} />
        <title>{`${t(event.title)} | ${lang === "en" ? "MKn UNISSULA Event" : "Agenda MKn UNISSULA"}`}</title>
        <meta
          name="description"
          content={t(event.description) || "Agenda kegiatan Magister Kenotariatan UNISSULA."}
        />
      </Helmet>

      <main className="flex flex-col min-h-screen bg-white font-body text-body">
        {/* Header Navbar */}
        <Navbar />

        {/* Full-bleed Split Layout (Mentok Kanan-Kiri Persis Harvard Law School) */}
        <div className="w-full flex-grow flex flex-col lg:flex-row items-stretch border-t border-gray-200">
          {/* Kolom Kiri: Dark Sidebar (Upcoming Events) */}
          <div className="w-full lg:w-[380px] xl:w-[420px] shrink-0 bg-[#111c24] border-r border-black/20">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="lg:sticky lg:top-[calc(var(--header-h)+0.5rem)] lg:max-h-[calc(100vh-var(--header-h)-1rem)] lg:overflow-y-auto scrollbar-thin px-6 sm:px-8 lg:px-10 pt-10 sm:pt-14 lg:pt-16 pb-16 space-y-8 text-white"
            >
              {/* Header Sidebar Kiri */}
              <motion.div variants={itemVariants} className="border-b border-white/10 pb-4">
                <Link
                  to="/event"
                  className="text-2xl sm:text-3xl font-heading font-normal tracking-tight text-white hover:text-gray-200 transition-colors block"
                >
                  {t({ id: "Kalender Agenda", en: "Events Calendar" })}
                </Link>
                <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold block mt-1">
                  {t({ id: "Agenda Mendatang", en: "Upcoming Events" })}
                </span>
              </motion.div>

              {/* Daftar Acara Mendatang Lainnya */}
              <div className="space-y-4">
                {upcomingEvents.map((item, idx) => (
                  <motion.article
                    key={item.id}
                    custom={idx}
                    variants={itemVariants}
                    whileHover={{ x: 4, transition: { duration: 0.2 } }}
                    onClick={() => navigate(`/event/${item.slug}`)}
                    className="group cursor-pointer space-y-1 block p-3 rounded-xs hover:bg-white/5 pb-4 border-b border-white/5 last:border-0 transition-colors"
                  >
                    <h3 className="font-heading font-medium text-sm sm:text-base text-white group-hover:text-primary transition-colors leading-snug">
                      {t(item.title)}
                    </h3>
                    <p className="text-xs text-gray-400 font-normal">
                      {formatIndoDate(item.date, lang)} • {t(item.time)}
                    </p>
                  </motion.article>
                ))}
              </div>

              {/* Tombol Lihat Semua Kalender */}
              <motion.div variants={itemVariants} className="pt-2">
                <Link
                  to="/event"
                  className="w-full py-2.5 px-4 rounded-full border border-white/20 hover:border-white hover:bg-white/10 text-xs font-semibold text-white transition-all flex items-center justify-center gap-2"
                >
                  <FiArrowLeft className="w-3.5 h-3.5" />
                  <span>{t({ id: "Lihat Kalender Lengkap", en: "View Full Calendar" })}</span>
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Kolom Kanan: Detail Acara Lengkap (Putih Bersih) */}
          <div className="flex-grow min-w-0 bg-white px-6 sm:px-10 lg:px-14 xl:px-20 py-8 sm:py-12 space-y-10">
            {/* Tautan Navigasi Kembali */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Link
                to="/event"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-primary hover:underline transition-colors group"
              >
                <FiArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span>{t({ id: "Kembali ke daftar agenda", en: "Back to events list" })}</span>
              </Link>
            </motion.div>

            {/* Flyer / Dokumentasi Acara — banner selebar kolom konten */}
            {event.image && (
              <motion.figure
                variants={flyerVariants}
                initial="hidden"
                animate="visible"
                className="w-full overflow-hidden rounded-xs bg-gray-50 border border-gray-100 p-2 shadow-2xs group"
              >
                <ZoomableImg
                  src={event.image}
                  alt={t(event.title)}
                  caption={t(event.title)}
                  className="w-full h-auto max-h-[calc(100vh-var(--header-h)-18rem)] object-contain mx-auto transition-transform duration-500 group-hover:scale-[1.01]"
                />
              </motion.figure>
            )}

            {/* Header Acara */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4 pb-8 border-b border-gray-200"
            >
              <motion.h1
                variants={itemVariants}
                className="text-3xl sm:text-4xl lg:text-[44px] font-heading font-medium text-heading leading-[1.15] tracking-tight max-w-4xl"
              >
                {t(event.title)}
              </motion.h1>

              <motion.div variants={itemVariants} className="space-y-0.5 pt-1">
                <div className="text-base sm:text-lg font-bold text-heading">
                  {formatIndoDate(event.date, lang)}
                </div>
                <div className="text-sm text-gray-600 font-normal">
                  {getIndoDayName(event.date, lang)}, {t(event.time)}
                </div>
              </motion.div>

              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="h-[2px] bg-primary mt-3"
              />
            </motion.div>

            {/* Konten Utama & Metadata Sidebar (Sub-grid) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
              {/* Kolom Kiri Sub-grid: Link Lokasi / Zoom & Deskripsi Lengkap */}
              <div className="lg:col-span-8 space-y-6 text-sm sm:text-base text-gray-700 leading-relaxed font-body">
                {/* Informasi Lokasi / Ruang / Zoom */}
                {event.venue && (
                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={viewportSettings}
                    transition={{ duration: 0.45 }}
                    className="p-4 bg-gray-50 rounded-xs border border-gray-200/90 text-sm flex items-baseline gap-2 shadow-2xs"
                  >
                    <span className="font-bold text-heading shrink-0">
                      {t({ id: "Lokasi / Ruang:", en: "Location / Venue:" })}{" "}
                    </span>
                    <span className="text-body font-medium">{t(event.venue)}</span>
                  </motion.div>
                )}

                {/* Paragraf Narasi Acara — fullDescription (Strapi Blocks atau string) */}
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportSettings}
                  className="space-y-4 pt-1"
                >
                  <motion.p variants={itemVariants} className="font-medium text-heading">
                    {t(event.description)}
                  </motion.p>

                  {Array.isArray(event.fullDescription) ? (
                    <motion.div variants={itemVariants} className="pt-2 text-base text-body leading-relaxed">
                      <StrapiArticleBlocks content={event.fullDescription} />
                    </motion.div>
                  ) : (
                    (t(event.fullDescription) || t(event.description))
                      .split(/\n\s*\n/)
                      .filter((paragraf) => paragraf.trim())
                      .map((paragraf, idx) => (
                        <motion.p
                          key={idx}
                          variants={itemVariants}
                          className="text-gray-600 text-[15px] leading-7 text-justify"
                        >
                          {paragraf.trim()}
                        </motion.p>
                      ))
                  )}
                </motion.div>

                {/* Informasi Narasumber */}
                {event.speaker && (
                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={viewportSettings}
                    transition={{ duration: 0.45 }}
                    className="pt-4 border-t border-gray-150 space-y-1 text-sm bg-gray-50/50 p-4 rounded-xs border border-gray-100"
                  >
                    <span className="text-xs uppercase tracking-wider font-bold text-gray-500 block">
                      {t({ id: "Narasumber & Pakar", en: "Speaker & Resource Person" })}
                    </span>
                    <p className="font-medium text-heading text-base">
                      {t(event.speaker)}
                    </p>
                  </motion.div>
                )}
              </div>

              {/* Kolom Kanan Sub-grid: Metadata Singkat (Website, Contact, Organizer, Category) */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={viewportSettings}
                className="lg:col-span-4 space-y-4 pt-1 text-xs sm:text-sm border-t lg:border-t-0 lg:border-l lg:border-gray-200 lg:pl-8"
              >
                {/* Website / Pendaftaran */}
                {event.registrationUrl && (
                  <motion.div
                    variants={itemVariants}
                    className="space-y-1 p-3.5 bg-gray-50/80 rounded-xs border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-colors shadow-2xs"
                  >
                    <span className="font-bold text-heading uppercase tracking-wider text-[11px] block text-gray-500">
                      Website
                    </span>
                    <a
                      href={event.registrationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-primary hover:underline font-semibold"
                    >
                      <span>{t({ id: "Informasi Acara", en: "Event Information" })}</span>
                      <FiExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </motion.div>
                )}

                {/* Contact */}
                <motion.div
                  variants={itemVariants}
                  className="space-y-1 p-3.5 bg-gray-50/80 rounded-xs border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-colors shadow-2xs"
                >
                  <span className="font-bold text-heading uppercase tracking-wider text-[11px] block text-gray-500">
                    {t({ id: "Narahubung", en: "Contact" })}
                  </span>
                  <div className="text-gray-700 font-medium">
                    {event.cp || t({ id: "Sekretariat Program Studi MKn UNISSULA", en: "MKn UNISSULA Secretariat" })}
                  </div>
                </motion.div>

                {/* Penyelenggara */}
                <motion.div
                  variants={itemVariants}
                  className="space-y-1 p-3.5 bg-gray-50/80 rounded-xs border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-colors shadow-2xs"
                >
                  <span className="font-bold text-heading uppercase tracking-wider text-[11px] block text-gray-500">
                    {t({ id: "Penyelenggara / Unit", en: "Student Organizations / Unit" })}
                  </span>
                  <div className="text-gray-700 font-medium">
                    {t(event.organizer)}
                  </div>
                </motion.div>

                {/* Kategori */}
                <motion.div
                  variants={itemVariants}
                  className="space-y-1 p-3.5 bg-gray-50/80 rounded-xs border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-colors shadow-2xs"
                >
                  <span className="font-bold text-heading uppercase tracking-wider text-[11px] block text-gray-500">
                    {t({ id: "Kategori Agenda", en: "Event Category" })}
                  </span>
                  <div className="text-gray-700 font-medium">
                    {t(event.category)}
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Bagian Bawah: Add to Calendar */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportSettings}
              transition={{ duration: 0.5 }}
              className="pt-10 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-6"
            >
              <div className="space-y-0.5">
                <span className="font-heading font-bold text-sm text-heading block">
                  {t({ id: "Tambahkan ke Kalender", en: "Add to Calendar" })}
                </span>
                <p className="text-xs text-gray-500 font-normal">
                  {formatIndoDate(event.date, lang)}, {t(event.time)}
                </p>
              </div>

              {/* Tombol Pil Add to Calendar */}
              <div className="flex flex-wrap items-center gap-3">
                {/* Google Calendar */}
                <motion.a
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  href={googleCalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2 rounded-full border border-gray-300 hover:border-primary hover:text-primary text-xs font-semibold text-heading transition-colors inline-flex items-center gap-1.5 bg-white shadow-2xs cursor-pointer"
                >
                  <FiPlus className="w-3.5 h-3.5 text-primary" />
                  <span>Google Calendar</span>
                </motion.a>

                {/* iCal / Outlook */}
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  type="button"
                  onClick={() => downloadIcsFile(event)}
                  className="px-5 py-2 rounded-full border border-gray-300 hover:border-primary hover:text-primary text-xs font-semibold text-heading transition-colors inline-flex items-center gap-1.5 bg-white shadow-2xs cursor-pointer"
                >
                  <FiPlus className="w-3.5 h-3.5 text-primary" />
                  <span>iCal/Outlook</span>
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </main>
    </>
  );
}
