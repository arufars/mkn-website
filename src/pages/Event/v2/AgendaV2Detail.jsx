import { useState, useEffect, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FiArrowLeft, FiPlus, FiExternalLink } from "react-icons/fi";
import { motion } from "framer-motion";

import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import ZoomableImg from "../../../components/ui/ZoomableImg";
import { useT, useLanguage } from "../../../i18n/languageContext";

import { strapiFetch } from "../../../api/strapiClient";
import { buildDetailByFieldQuery, buildRelatedQuery } from "../../../api/strapiQuery";
import { STRAPI_ENDPOINTS, STRAPI_POPULATE, STRAPI_DEFAULTS } from "../../../config/strapi";
import {
  getStrapiImageUrl,
  formatAgendaDate,
  getIndoDayName,
  blocksToPlainText,
  generateGoogleCalendarUrl,
  downloadIcsFile,
} from "./utils/agendaFormatters";
import StrapiArticleBlocks from "../../../components/Strapi/StrapiArticleBlocks";

/* =========================================================
   ANIMATION VARIANTS (identik dengan EventDetail.jsx)
========================================================= */
const viewportSettings = { once: true, amount: 0.15 };

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const flyerVariants = {
  hidden: { opacity: 0, y: 25, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

/* =========================================================
   HELPERS
========================================================= */
function normalizeAgenda(item) {
  if (!item) return null;
  const desc = typeof item.description === "string"
    ? item.description
    : (blocksToPlainText(item.description) || "");

  return {
    id: item.id,
    documentId: item.documentId,
    slug: item.slug || item.documentId || String(item.id),
    title: item.title || "",
    date: item.date ? item.date.split("T")[0] : null,
    time: item.time || "",
    venue: item.venue || "",
    organizer: item.organizer || "",
    category: typeof item.category === "object"
      ? (item.category?.name || item.category?.nama || "")
      : (item.category || ""),
    description: desc,
    fullDescription: item.fullDescription || "",
    image: getStrapiImageUrl(item.image),
    cp: item.cp || "",
    speaker: item.speaker || "",
    registrationUrl: item.registrationUrl || "",
    pinned: item.pinned || item.isFeatured || false,
  };
}

/* =========================================================
   KOMPONEN UTAMA
========================================================= */
export default function AgendaV2Detail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const t = useT();
  const { lang } = useLanguage();

  const [agenda, setAgenda] = useState(null);
  const [upcomingAgendas, setUpcomingAgendas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Scroll ke atas setiap kali slug berubah
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [slug]);

  const loadDetail = async () => {
    if (!slug) return;
    setLoading(true);
    setError(null);

    const slugParam = decodeURIComponent(slug).trim();
    const activeLocale = lang || STRAPI_DEFAULTS.LOCALE;

    try {
      let found = null;

      // 1. Cari via slug + locale aktif
      try {
        const q = buildDetailByFieldQuery({ field: "slug", value: slugParam, populate: STRAPI_POPULATE.AGENDA_V2_FULL, locale: activeLocale });
        const res = await strapiFetch(`${STRAPI_ENDPOINTS.AGENDA_V2}?${q}`);
        if (Array.isArray(res?.data) && res.data.length > 0) found = res.data[0];
      } catch (_) {}

      // 2. Fallback: documentId + locale aktif
      if (!found) {
        try {
          const q = buildDetailByFieldQuery({ field: "documentId", value: slugParam, populate: STRAPI_POPULATE.AGENDA_V2_FULL, locale: activeLocale });
          const res = await strapiFetch(`${STRAPI_ENDPOINTS.AGENDA_V2}?${q}`);
          if (Array.isArray(res?.data) && res.data.length > 0) found = res.data[0];
        } catch (_) {}
      }

      // 3. Fallback: slug + locale "id"
      if (!found && activeLocale !== STRAPI_DEFAULTS.LOCALE) {
        try {
          const q = buildDetailByFieldQuery({ field: "slug", value: slugParam, populate: STRAPI_POPULATE.AGENDA_V2_FULL, locale: STRAPI_DEFAULTS.LOCALE });
          const res = await strapiFetch(`${STRAPI_ENDPOINTS.AGENDA_V2}?${q}`);
          if (Array.isArray(res?.data) && res.data.length > 0) found = res.data[0];
        } catch (_) {}
      }

      // 4. Fallback: documentId + locale "id"
      if (!found && activeLocale !== STRAPI_DEFAULTS.LOCALE) {
        try {
          const q = buildDetailByFieldQuery({ field: "documentId", value: slugParam, populate: STRAPI_POPULATE.AGENDA_V2_FULL, locale: STRAPI_DEFAULTS.LOCALE });
          const res = await strapiFetch(`${STRAPI_ENDPOINTS.AGENDA_V2}?${q}`);
          if (Array.isArray(res?.data) && res.data.length > 0) found = res.data[0];
        } catch (_) {}
      }

      setAgenda(found ? normalizeAgenda(found) : null);

      // 5. Ambil agenda terkait (untuk sidebar kiri)
      if (found) {
        const relQuery = buildRelatedQuery({
          excludeId: found.id,
          populate: STRAPI_POPULATE.AGENDA_V2_CARD,
          sort: ["pinned:desc", "date:asc", "createdAt:desc"],
          limit: 6,
          locale: activeLocale,
        });
        const relRes = await strapiFetch(`${STRAPI_ENDPOINTS.AGENDA_V2}?${relQuery}`);
        let relList = Array.isArray(relRes?.data) ? relRes.data : [];

        if (relList.length === 0 && activeLocale !== STRAPI_DEFAULTS.LOCALE) {
          const relFbQuery = buildRelatedQuery({
            excludeId: found.id,
            populate: STRAPI_POPULATE.AGENDA_V2_CARD,
            sort: ["pinned:desc", "date:asc", "createdAt:desc"],
            limit: 6,
            locale: STRAPI_DEFAULTS.LOCALE,
          });
          const relFbRes = await strapiFetch(`${STRAPI_ENDPOINTS.AGENDA_V2}?${relFbQuery}`);
          relList = Array.isArray(relFbRes?.data) ? relFbRes.data : [];
        }

        setUpcomingAgendas(relList.map(normalizeAgenda));
      }
    } catch (err) {
      console.error("[AgendaV2Detail] Gagal memuat:", err);
      setError(err.message || "Gagal mengambil data dari Strapi CMS.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadDetail(); }, [slug, lang]);

  // ---- Fallback NOT FOUND ----
  if (!loading && !error && !agenda) {
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
              {t({ id: "Agenda yang Anda cari mungkin telah berakhir atau tautan tidak valid.", en: "The event you are looking for may have concluded or the link is invalid." })}
            </p>
            <div>
              <Link to="/event-v2" className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-[#680000] text-white text-sm font-semibold rounded-xs transition-colors">
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

  return (
    <>
      <Helmet>
        <html lang={lang} />
        <title>{agenda ? `${agenda.title} | ${lang === "en" ? "MKn UNISSULA Event" : "Agenda MKn UNISSULA"}` : "Agenda V2 | MKn UNISSULA"}</title>
        <meta name="description" content={agenda?.description || blocksToPlainText(agenda?.fullDescription) || "Agenda kegiatan Magister Kenotariatan UNISSULA."} />
      </Helmet>

      <main className="flex flex-col min-h-screen bg-white font-body text-body">
        <Navbar />

        {/* Full-bleed Split Layout — persis seperti EventDetail */}
        <div className="w-full flex-grow flex flex-col lg:flex-row items-stretch border-t border-gray-200">

          {/* =================== SIDEBAR KIRI (dark) =================== */}
          <div className="w-full lg:w-[380px] xl:w-[420px] shrink-0 bg-[#111c24] border-r border-black/20">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="lg:sticky lg:top-[calc(var(--header-h)+0.5rem)] lg:max-h-[calc(100vh-var(--header-h)-1rem)] lg:overflow-y-auto scrollbar-thin px-6 sm:px-8 lg:px-10 pt-10 sm:pt-14 lg:pt-16 pb-16 space-y-8 text-white"
            >
              {/* Header sidebar */}
              <motion.div variants={itemVariants} className="border-b border-white/10 pb-4">
                <Link to="/event-v2" className="text-2xl sm:text-3xl font-heading font-normal tracking-tight text-white hover:text-gray-200 transition-colors block">
                  {t({ id: "Kalender Agenda", en: "Events Calendar" })}
                </Link>
                <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold block mt-1">
                  {t({ id: "Agenda Mendatang", en: "Upcoming Events" })}
                </span>
              </motion.div>

              {/* Loading state sidebar */}
              {loading && (
                <div className="space-y-4 animate-pulse">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="space-y-2">
                      <div className="w-3/4 h-4 bg-white/10 rounded" />
                      <div className="w-1/2 h-3 bg-white/10 rounded" />
                    </div>
                  ))}
                </div>
              )}

              {/* Daftar agenda lainnya */}
              {!loading && (
                <div className="space-y-4">
                  {upcomingAgendas.length > 0 ? (
                    upcomingAgendas.map((item, idx) => (
                      <motion.article
                        key={item.id}
                        custom={idx}
                        variants={itemVariants}
                        whileHover={{ x: 4, transition: { duration: 0.2 } }}
                        onClick={() => navigate(`/event-v2/${item.slug}`)}
                        className="group cursor-pointer space-y-1 block p-3 rounded-xs hover:bg-white/5 pb-4 border-b border-white/5 last:border-0 transition-colors"
                      >
                        <h3 className="font-heading font-medium text-sm sm:text-base text-white group-hover:text-primary transition-colors leading-snug">
                          {item.title}
                        </h3>
                        <p className="text-xs text-gray-400 font-normal">
                          {item.date ? formatAgendaDate(item.date, lang) : ""}
                          {item.time ? ` • ${item.time}` : ""}
                        </p>
                      </motion.article>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500 italic">
                      {t({ id: "Tidak ada agenda lain.", en: "No other events." })}
                    </p>
                  )}
                </div>
              )}

              {/* Tombol kembali ke kalender */}
              <motion.div variants={itemVariants} className="pt-2">
                <Link
                  to="/event-v2"
                  className="w-full py-2.5 px-4 rounded-full border border-white/20 hover:border-white hover:bg-white/10 text-xs font-semibold text-white transition-all flex items-center justify-center gap-2"
                >
                  <FiArrowLeft className="w-3.5 h-3.5" />
                  <span>{t({ id: "Lihat Kalender Lengkap", en: "View Full Calendar" })}</span>
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* =================== KOLOM KANAN (detail) =================== */}
          <div className="flex-grow min-w-0 bg-white px-6 sm:px-10 lg:px-14 xl:px-20 py-8 sm:py-12 space-y-10">

            {/* Loading skeleton kanan */}
            {loading && (
              <div className="space-y-8 animate-pulse">
                <div className="w-32 h-4 bg-gray-200 rounded" />
                <div className="w-full aspect-[16/9] bg-gray-200 rounded-md" />
                <div className="w-3/4 h-10 bg-gray-200 rounded" />
                <div className="w-1/2 h-6 bg-gray-200 rounded" />
                <div className="space-y-3">
                  {[...Array(5)].map((_, i) => <div key={i} className="w-full h-4 bg-gray-200 rounded" />)}
                </div>
              </div>
            )}

            {/* Konten detail */}
            {!loading && agenda && (
              <>
                {/* Tautan kembali */}
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
                  <Link to="/event-v2" className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-primary hover:underline transition-colors group">
                    <FiArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span>{t({ id: "Kembali ke daftar agenda", en: "Back to events list" })}</span>
                  </Link>
                </motion.div>

                {/* Flyer / Gambar */}
                {agenda.image && (
                  <motion.figure
                    variants={flyerVariants} initial="hidden" animate="visible"
                    className="w-full overflow-hidden rounded-xs bg-gray-50 border border-gray-100 p-2 shadow-2xs group"
                  >
                    <ZoomableImg
                      src={agenda.image}
                      alt={agenda.title}
                      caption={agenda.title}
                      className="w-full h-auto max-h-[calc(100vh-var(--header-h)-18rem)] object-contain mx-auto transition-transform duration-500 group-hover:scale-[1.01]"
                    />
                  </motion.figure>
                )}

                {/* Header acara */}
                <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-4 pb-8 border-b border-gray-200">
                  <motion.h1
                    variants={itemVariants}
                    className="text-3xl sm:text-4xl lg:text-[44px] font-heading font-medium text-heading leading-[1.15] tracking-tight max-w-4xl"
                  >
                    {agenda.title}
                  </motion.h1>

                  <motion.div variants={itemVariants} className="space-y-0.5 pt-1">
                    {agenda.date && (
                      <div className="text-base sm:text-lg font-bold text-heading">{formatAgendaDate(agenda.date, lang)}</div>
                    )}
                    <div className="text-sm text-gray-600 font-normal">
                      {agenda.date ? getIndoDayName(agenda.date, lang) : ""}
                      {agenda.time ? `, ${agenda.time}` : ""}
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ width: 0 }} animate={{ width: "100%" }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="h-[2px] bg-primary mt-3"
                  />
                </motion.div>

                {/* Konten utama + metadata sidebar */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
                  {/* Kolom kiri: deskripsi */}
                  <div className="lg:col-span-8 space-y-6 text-sm sm:text-base text-gray-700 leading-relaxed font-body">
                    {/* Lokasi */}
                    {agenda.venue && (
                      <motion.div
                        initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
                        viewport={viewportSettings} transition={{ duration: 0.45 }}
                        className="p-4 bg-gray-50 rounded-xs border border-gray-200/90 text-sm flex items-baseline gap-2 shadow-2xs"
                      >
                        <span className="font-bold text-heading shrink-0">
                          {t({ id: "Lokasi / Ruang:", en: "Location / Venue:" })}{" "}
                        </span>
                        <span className="text-body font-medium">{agenda.venue}</span>
                      </motion.div>
                    )}

                    {/* Deskripsi */}
                    <motion.div
                      variants={containerVariants} initial="hidden" whileInView="visible" viewport={viewportSettings}
                      className="space-y-4 pt-1"
                    >
                      {agenda.description && (
                        <motion.p variants={itemVariants} className="font-medium text-heading">
                          {agenda.description}
                        </motion.p>
                      )}

                      {/* Render jika fullDescription berupa Strapi Rich Text Blocks */}
                      {Array.isArray(agenda.fullDescription) && agenda.fullDescription.length > 0 && (
                        <motion.div variants={itemVariants}>
                          <StrapiArticleBlocks content={agenda.fullDescription} />
                        </motion.div>
                      )}

                      {/* Render jika fullDescription berupa string biasa */}
                      {typeof agenda.fullDescription === "string" && agenda.fullDescription.trim() && (
                        agenda.fullDescription
                          .split(/\n\s*\n/)
                          .filter((p) => p.trim())
                          .map((para, idx) => (
                            <motion.p key={idx} variants={itemVariants} className="text-gray-600 text-[15px] leading-7 text-justify">
                              {para.trim()}
                            </motion.p>
                          ))
                      )}
                    </motion.div>

                    {/* Narasumber & Pakar jika ada */}
                    {agenda.speaker && (
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
                          {agenda.speaker}
                        </p>
                      </motion.div>
                    )}
                  </div>

                  {/* Kolom kanan: metadata */}
                  <motion.div
                    variants={containerVariants} initial="hidden" whileInView="visible" viewport={viewportSettings}
                    className="lg:col-span-4 space-y-4 pt-1 text-xs sm:text-sm border-t lg:border-t-0 lg:border-l lg:border-gray-200 lg:pl-8"
                  >
                    {/* Website / Pendaftaran */}
                    {agenda.registrationUrl && (
                      <motion.div
                        variants={itemVariants}
                        className="space-y-1 p-3.5 bg-gray-50/80 rounded-xs border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-colors shadow-2xs"
                      >
                        <span className="font-bold text-heading uppercase tracking-wider text-[11px] block text-gray-500">
                          Website
                        </span>
                        <a
                          href={agenda.registrationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-primary hover:underline font-semibold"
                        >
                          <span>{t({ id: "Informasi Acara", en: "Event Information" })}</span>
                          <FiExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </motion.div>
                    )}

                    {/* Narahubung */}
                    <motion.div variants={itemVariants} className="space-y-1 p-3.5 bg-gray-50/80 rounded-xs border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-colors shadow-2xs">
                      <span className="font-bold text-heading uppercase tracking-wider text-[11px] block text-gray-500">
                        {t({ id: "Narahubung", en: "Contact" })}
                      </span>
                      <div className="text-gray-700 font-medium">
                        {agenda.cp || t({ id: "Sekretariat Program Studi MKn UNISSULA", en: "MKn UNISSULA Secretariat" })}
                      </div>
                    </motion.div>

                    {/* Penyelenggara */}
                    {agenda.organizer && (
                      <motion.div variants={itemVariants} className="space-y-1 p-3.5 bg-gray-50/80 rounded-xs border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-colors shadow-2xs">
                        <span className="font-bold text-heading uppercase tracking-wider text-[11px] block text-gray-500">
                          {t({ id: "Penyelenggara / Unit", en: "Organizer / Unit" })}
                        </span>
                        <div className="text-gray-700 font-medium">{agenda.organizer}</div>
                      </motion.div>
                    )}

                    {/* Kategori */}
                    {agenda.category && (
                      <motion.div variants={itemVariants} className="space-y-1 p-3.5 bg-gray-50/80 rounded-xs border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-colors shadow-2xs">
                        <span className="font-bold text-heading uppercase tracking-wider text-[11px] block text-gray-500">
                          {t({ id: "Kategori Agenda", en: "Event Category" })}
                        </span>
                        <div className="text-gray-700 font-medium">{agenda.category}</div>
                      </motion.div>
                    )}
                  </motion.div>
                </div>

                {/* Add to Calendar (sama persis dengan EventDetail) */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportSettings} transition={{ duration: 0.5 }}
                  className="pt-10 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-6"
                >
                  <div className="space-y-0.5">
                    <span className="font-heading font-bold text-sm text-heading block">
                      {t({ id: "Tambahkan ke Kalender", en: "Add to Calendar" })}
                    </span>
                    <p className="text-xs text-gray-500 font-normal">
                      {agenda.date ? formatAgendaDate(agenda.date, lang) : ""}
                      {agenda.time ? `, ${agenda.time}` : ""}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    {/* Google Calendar */}
                    {agenda.date && (
                      <motion.a
                        whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                        href={generateGoogleCalendarUrl(agenda)}
                        target="_blank" rel="noopener noreferrer"
                        className="px-5 py-2 rounded-full border border-gray-300 hover:border-primary hover:text-primary text-xs font-semibold text-heading transition-colors inline-flex items-center gap-1.5 bg-white shadow-2xs cursor-pointer"
                      >
                        <FiPlus className="w-3.5 h-3.5 text-primary" />
                        <span>Google Calendar</span>
                      </motion.a>
                    )}

                    {/* iCal / Outlook */}
                    {agenda.date && (
                      <motion.button
                        whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                        type="button"
                        onClick={() => downloadIcsFile(agenda)}
                        className="px-5 py-2 rounded-full border border-gray-300 hover:border-primary hover:text-primary text-xs font-semibold text-heading transition-colors inline-flex items-center gap-1.5 bg-white shadow-2xs cursor-pointer"
                      >
                        <FiPlus className="w-3.5 h-3.5 text-primary" />
                        <span>iCal/Outlook</span>
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              </>
            )}
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}
