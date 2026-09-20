import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FiCalendar, FiChevronLeft, FiChevronRight, FiRefreshCw, FiAlertCircle } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import EventCalendarSidebar from "../../../components/Event/EventCalendarSidebar";
import SubmitEventModal from "../../../components/Event/SubmitEventModal";
import { useT, useLanguage } from "../../../i18n/languageContext";

import { strapiFetch } from "../../../api/strapiClient";
import { buildListQuery } from "../../../api/strapiQuery";
import { STRAPI_ENDPOINTS, STRAPI_POPULATE, STRAPI_DEFAULTS } from "../../../config/strapi";
import {
  getStrapiImageUrl,
  formatAgendaDate,
  formatIndoDate,
  getIndoDayName,
  blocksToPlainText,
} from "./utils/agendaFormatters";

/* =========================================================
   ANIMATION VARIANTS (identik dengan /event)
========================================================= */
const viewportSettings = { once: true, amount: 0.15 };

const topControlVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] } },
};

const dateGroupVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.52, ease: [0.22, 1, 0.36, 1] } },
};

const compactRowVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: typeof i === "number" ? i * 0.05 : 0, duration: 0.42, ease: [0.22, 1, 0.36, 1] },
  }),
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: typeof i === "number" ? i * 0.08 : 0, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

/* =========================================================
   HELPERS
========================================================= */
/* Normalisasi field Strapi → format yang sama dengan eventData lama */
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
    date: item.date ? item.date.split("T")[0] : null,  // ambil hanya YYYY-MM-DD
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
    pinned: item.pinned || item.isFeatured || false,
  };
}

/* =========================================================
   KOMPONEN UTAMA
========================================================= */
export default function AgendaV2Index() {
  const navigate = useNavigate();
  const t = useT();
  const { lang } = useLanguage();

  // ---- Kalender state ----
  const now = new Date();
  const [currentMonthDate, setCurrentMonthDate] = useState(new Date(now.getFullYear(), now.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isCompactView, setIsCompactView] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  // ---- Strapi data state ----
  const [rawAgendas, setRawAgendas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadAgendas = async () => {
    setLoading(true);
    setError(null);
    try {
      const activeLocale = lang || STRAPI_DEFAULTS.LOCALE;
      const query = buildListQuery({
        populate: STRAPI_POPULATE.AGENDA_V2_FULL,
        sort: ["pinned:desc", "isFeatured:desc", "date:asc", "createdAt:desc"],
        pageSize: 100,
        locale: activeLocale,
      });
      let result = await strapiFetch(`${STRAPI_ENDPOINTS.AGENDA_V2}?${query}`);
      let list = Array.isArray(result?.data) ? result.data : [];

      // Fallback ke locale "id" jika locale aktif (EN) kosong
      if (list.length === 0 && activeLocale !== STRAPI_DEFAULTS.LOCALE) {
        const fbQuery = buildListQuery({
          populate: STRAPI_POPULATE.AGENDA_V2_FULL,
          sort: ["pinned:desc", "isFeatured:desc", "date:asc", "createdAt:desc"],
          pageSize: 100,
          locale: STRAPI_DEFAULTS.LOCALE,
        });
        const fbResult = await strapiFetch(`${STRAPI_ENDPOINTS.AGENDA_V2}?${fbQuery}`);
        list = Array.isArray(fbResult?.data) ? fbResult.data : [];
      }

      setRawAgendas(list.map(normalizeAgenda));
    } catch (err) {
      console.error("[AgendaV2Index] Gagal memuat:", err);
      setError(err.message || "Koneksi ke Strapi gagal. Pastikan Strapi berjalan di http://localhost:1337");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadAgendas(); }, [lang]);

  // ---- Semua tanggal yang punya event (untuk kalender) ----
  const allEventDates = useMemo(() =>
    Array.from(new Set(rawAgendas.map((a) => a.date).filter(Boolean))),
    [rawAgendas]
  );

  // ---- Filter agenda ----
  const filteredAgendas = useMemo(() => {
    return rawAgendas.filter((item) => {
      if (selectedDate && item.date !== selectedDate) return false;
      if (selectedCategory && item.category !== selectedCategory) return false;
      if (searchKeyword.trim()) {
        const q = searchKeyword.toLowerCase();
        if (
          !(item.title || "").toLowerCase().includes(q) &&
          !(item.description || "").toLowerCase().includes(q) &&
          !(item.venue || "").toLowerCase().includes(q) &&
          !(item.organizer || "").toLowerCase().includes(q)
        ) return false;
      }
      return true;
    });
  }, [rawAgendas, selectedDate, selectedCategory, searchKeyword]);

  // ---- Kelompokkan berdasarkan tanggal ----
  const groupedAgendas = useMemo(() => {
    const groups = {};
    filteredAgendas.forEach((item) => {
      const key = item.date || "tanpa-tanggal";
      if (!groups[key]) groups[key] = [];
      groups[key].push(item);
    });
    return Object.keys(groups)
      .sort()
      .reverse()
      .map((dateKey) => ({
        date: dateKey,
        events: groups[dateKey].sort((a, b) => {
          if (a.pinned && !b.pinned) return -1;
          if (!a.pinned && b.pinned) return 1;
          return 0;
        }),
      }));
  }, [filteredAgendas]);

  // ---- Handlers ----
  const handleChangeMonth = (offset) => {
    setCurrentMonthDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + offset, 1));
  };

  const handleTodayClick = () => {
    const today = new Date();
    const y = today.getFullYear();
    const m = String(today.getMonth() + 1).padStart(2, "0");
    const d = String(today.getDate()).padStart(2, "0");
    const todayStr = `${y}-${m}-${d}`;
    setSelectedDate(todayStr);
    setCurrentMonthDate(new Date(today.getFullYear(), today.getMonth(), 1));
  };

  const handleStepDay = (direction) => {
    const base = selectedDate ? new Date(selectedDate + "T00:00:00") : new Date();
    base.setDate(base.getDate() + direction);
    const y = base.getFullYear();
    const m = String(base.getMonth() + 1).padStart(2, "0");
    const d = String(base.getDate()).padStart(2, "0");
    const nextStr = `${y}-${m}-${d}`;
    setSelectedDate(nextStr);
    setCurrentMonthDate(new Date(base.getFullYear(), base.getMonth(), 1));
  };

  const handleResetAll = () => {
    setSelectedDate(null);
    setSearchKeyword("");
    setSelectedCategory(null);
    const now = new Date();
    setCurrentMonthDate(new Date(now.getFullYear(), now.getMonth(), 1));
  };

  return (
    <>
      <Helmet>
        <html lang={lang} />
        <title>{lang === "en" ? "Events V2 (Strapi) | MKn UNISSULA" : "Agenda V2 (Strapi) | MKn UNISSULA"}</title>
        <meta
          name="description"
          content={t({
            id: "Kalender kegiatan agenda terkini Magister Kenotariatan UNISSULA langsung dari Strapi CMS.",
            en: "Latest event calendar of Master of Notarial Law UNISSULA served directly from Strapi CMS.",
          })}
        />
      </Helmet>

      <main className="flex flex-col min-h-screen bg-white font-body text-body">
        <Navbar />

        <div className="w-full flex-grow flex flex-col lg:flex-row items-stretch border-t border-gray-200">
          {/* ===================== SIDEBAR KIRI (dark panel) ===================== */}
          <div className="w-full lg:w-[380px] xl:w-[420px] shrink-0 bg-[#111c24] border-r border-black/20">
            <div className="lg:sticky lg:top-[calc(var(--header-h)+0.5rem)] lg:max-h-[calc(100vh-var(--header-h)-1rem)] lg:overflow-y-auto scrollbar-thin">
              <EventCalendarSidebar
                currentMonthDate={currentMonthDate}
                onChangeMonth={handleChangeMonth}
                selectedDate={selectedDate}
                onSelectDate={(date) => setSelectedDate(date === selectedDate ? null : date)}
                searchKeyword={searchKeyword}
                onSearchChange={setSearchKeyword}
                onResetAll={handleResetAll}
                eventDates={allEventDates}
                onSubmitEventClick={() => setIsSubmitModalOpen(true)}
              />
            </div>
          </div>

          {/* ===================== KOLOM KANAN (feed) ===================== */}
          <div className="flex-grow min-w-0 bg-white px-4 sm:px-8 lg:px-12 xl:px-16 py-8 sm:py-10 space-y-8">

            {/* ---- Strapi badge & indikator loading ---- */}
            <div className="flex items-center justify-between gap-3 text-xs text-gray-400">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Strapi CMS · /api/agenda
              </span>
              {!loading && !error && (
                <button
                  type="button"
                  onClick={loadAgendas}
                  title="Refresh data dari Strapi"
                  className="inline-flex items-center gap-1 text-gray-400 hover:text-primary transition-colors cursor-pointer"
                >
                  <FiRefreshCw className="w-3 h-3" />
                  <span>Refresh</span>
                </button>
              )}
            </div>

            {/* ---- Bar Kontrol Atas ---- */}
            <motion.div
              variants={topControlVariants}
              initial="hidden"
              animate="visible"
              className="pb-4 border-b border-gray-200 flex flex-wrap items-center justify-between gap-4"
            >
              {/* Kiri: Today + Semua */}
              <div className="flex items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  type="button" onClick={handleTodayClick}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xs border border-gray-300 hover:border-primary hover:text-primary text-heading text-xs sm:text-sm font-medium transition-colors cursor-pointer bg-white shadow-2xs"
                >
                  <FiCalendar className="w-4 h-4 text-primary" />
                  <span>{lang === "en" ? "Today" : "Hari Ini (Today)"}</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => { setSelectedDate(null); }}
                  className={`text-xs sm:text-sm px-3.5 py-1.5 rounded-xs font-medium transition-colors cursor-pointer ${
                    !selectedDate ? "bg-primary text-white shadow-2xs" : "text-body hover:text-heading bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {t({ id: "Semua Agenda", en: "All Events" })}
                </motion.button>
              </div>

              {/* Kanan: Prev/Next + Compact Toggle */}
              <div className="flex items-center gap-5 text-xs sm:text-sm">
                <div className="flex items-center gap-3 text-heading font-medium">
                  <button type="button" onClick={() => handleStepDay(-1)} className="inline-flex items-center gap-1 hover:text-primary transition-colors cursor-pointer">
                    <FiChevronLeft className="w-4 h-4" />
                    <span>{t({ id: "Sebelumnya", en: "Previous" })}</span>
                  </button>
                  <span className="text-gray-300">|</span>
                  <button type="button" onClick={() => handleStepDay(1)} className="inline-flex items-center gap-1 hover:text-primary transition-colors cursor-pointer">
                    <span>{t({ id: "Berikutnya", en: "Next" })}</span>
                    <FiChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-2 pl-2 border-l border-gray-200">
                  <span className="text-gray-600 text-xs">{t({ id: "Tampilan Ringkas", en: "Compact View" })}</span>
                  <button
                    type="button" role="switch" aria-checked={isCompactView}
                    onClick={() => setIsCompactView(!isCompactView)}
                    className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ${isCompactView ? "bg-primary" : "bg-gray-300"}`}
                  >
                    <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ${isCompactView ? "translate-x-4" : "translate-x-0"}`} />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* ---- Filter badge aktif ---- */}
            <AnimatePresence>
              {(selectedDate || searchKeyword) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex flex-wrap items-center gap-2 text-xs overflow-hidden"
                >
                  <span className="text-gray-500">{t({ id: "Filter aktif:", en: "Active filters:" })}</span>
                  {selectedDate && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-primary border border-red-200 rounded-full font-medium">
                      {t({ id: "Tanggal:", en: "Date:" })} {formatIndoDate(selectedDate, lang)}
                      <button type="button" onClick={() => setSelectedDate(null)} className="hover:font-bold cursor-pointer">×</button>
                    </span>
                  )}
                  {searchKeyword && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 text-heading border border-gray-300 rounded-full font-medium">
                      {t({ id: "Kata Kunci:", en: "Keyword:" })} &quot;{searchKeyword}&quot;
                      <button type="button" onClick={() => setSearchKeyword("")} className="hover:font-bold cursor-pointer">×</button>
                    </span>
                  )}
                  <button type="button" onClick={handleResetAll} className="text-primary hover:underline ml-1 font-medium cursor-pointer">
                    {t({ id: "Reset semua", en: "Reset all" })}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ---- STATE LOADING ---- */}
            {loading && (
              <div className="space-y-10 animate-pulse">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-10 items-start">
                    <div className="lg:col-span-3 space-y-2">
                      <div className="w-36 h-6 bg-gray-200 rounded" />
                      <div className="w-24 h-4 bg-gray-200 rounded" />
                    </div>
                    <div className="lg:col-span-9 space-y-4">
                      <div className="w-3/4 h-7 bg-gray-200 rounded" />
                      <div className="w-full h-4 bg-gray-200 rounded" />
                      <div className="w-2/3 h-4 bg-gray-200 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ---- STATE ERROR ---- */}
            {!loading && error && (
              <div className="p-6 rounded-md bg-amber-50 border border-amber-200 text-amber-900 space-y-4">
                <div className="flex items-start gap-3">
                  <FiAlertCircle className="text-2xl text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-heading font-semibold text-lg">Gagal Terhubung ke Strapi</h3>
                    <p className="text-sm text-amber-800">{error}</p>
                  </div>
                </div>
                <button type="button" onClick={loadAgendas}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white text-xs font-bold tracking-wider uppercase rounded-xs hover:bg-[#680000] transition-colors cursor-pointer"
                >
                  <FiRefreshCw className="text-xs" /> Coba Muat Ulang
                </button>
              </div>
            )}

            {/* ---- FEED AGENDA ---- */}
            {!loading && !error && (
              groupedAgendas.length > 0 ? (
                isCompactView ? (
                  /* COMPACT VIEW */
                  <div className="divide-y divide-gray-200 border-t border-b border-gray-200">
                    {groupedAgendas.map((group) => (
                      <motion.div
                        key={group.date}
                        initial="hidden" whileInView="visible" viewport={viewportSettings}
                        variants={dateGroupVariants}
                        className="py-5 grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-8 items-start hover:bg-gray-50/70 transition-colors px-2 rounded-xs"
                      >
                        <div className="md:col-span-3 space-y-0.5">
                          <h3 className="font-heading font-bold text-sm sm:text-base text-heading">
                            {group.date !== "tanpa-tanggal" ? formatIndoDate(group.date, lang) : t({ id: "Tanpa Tanggal", en: "No Date" })}
                          </h3>
                          <p className="text-xs text-gray-500">
                            {group.date !== "tanpa-tanggal" ? getIndoDayName(group.date, lang) + " • " : ""}
                            {group.events.length} {lang === "en" ? "events" : "acara"}
                          </p>
                        </div>

                        <div className="md:col-span-9 space-y-3">
                          {group.events.map((item, idx) => (
                            <motion.div
                              key={item.id} custom={idx} variants={compactRowVariants}
                              whileHover={{ x: 4, transition: { duration: 0.2 } }}
                              onClick={() => navigate(`/event-v2/${item.slug}`)}
                              className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-8 group cursor-pointer py-1"
                            >
                              <span className="text-xs sm:text-sm text-body sm:w-44 shrink-0 font-medium">{item.time}</span>
                              <h4 className="font-heading font-bold text-xs sm:text-sm text-heading group-hover:text-primary transition-colors leading-relaxed">
                                {item.title}
                              </h4>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  /* STANDARD VIEW */
                  <div className="space-y-14 divide-y divide-gray-200/80">
                    {groupedAgendas.map((group) => (
                      <motion.div
                        key={group.date}
                        initial="hidden" whileInView="visible" viewport={viewportSettings}
                        variants={dateGroupVariants}
                        className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 pt-12 first:pt-2 items-start"
                      >
                        {/* Kolom Tanggal */}
                        <div className="lg:col-span-3 lg:sticky lg:top-32 space-y-1">
                          <h2 className="text-2xl sm:text-3xl font-heading font-medium text-heading tracking-tight">
                            {group.date !== "tanpa-tanggal" ? formatIndoDate(group.date, lang) : t({ id: "Tanpa Tanggal", en: "No Date" })}
                          </h2>
                          <p className="text-xs sm:text-sm text-gray-500 font-normal">
                            {group.date !== "tanpa-tanggal" ? getIndoDayName(group.date, lang) + " • " : ""}
                            {group.events.length} {lang === "en" ? "events" : "acara"}
                          </p>
                          <div className="w-12 h-[2px] bg-primary mt-3" />
                        </div>

                        {/* Kolom Kartu Event */}
                        <div className="lg:col-span-9 space-y-10 sm:space-y-12">
                          {group.events.map((item, idx) => (
                            <motion.article
                              key={item.id}
                              custom={idx} variants={cardVariants}
                              initial="hidden" whileInView="visible" viewport={viewportSettings}
                              whileHover={{ x: 4, transition: { duration: 0.2 } }}
                              onClick={() => navigate(`/event-v2/${item.slug}`)}
                              className={`group cursor-pointer transition-all rounded-xs p-2 -mx-2 hover:bg-gray-50/70 ${
                                item.pinned ? "border-l-2 border-primary pl-3 -ml-1" : ""
                              }`}
                            >
                              <div className="flex flex-col-reverse md:flex-row gap-6 lg:gap-8 items-start justify-between">
                                {/* Teks */}
                                <div className="flex-grow space-y-1.5 max-w-2xl">
                                  <div className="inline-flex items-baseline gap-2 flex-wrap">
                                    <h3 className="font-heading font-medium text-xl sm:text-[22px] lg:text-2xl text-heading group-hover:text-primary transition-colors leading-snug">
                                      {item.title}
                                    </h3>
                                    <span className="text-primary font-light text-lg sm:text-xl group-hover:translate-x-1.5 transition-transform shrink-0">→</span>
                                    {item.pinned && (
                                      <span className="inline-flex items-center gap-1 text-[9px] font-bold tracking-wider uppercase bg-primary text-white px-1.5 py-0.5 rounded-xs self-center">
                                        DIPIN
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-xs sm:text-sm text-gray-500 font-normal">{item.time}</div>
                                  {item.description && (
                                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed pt-2 line-clamp-3 font-normal">
                                      {item.description}
                                    </p>
                                  )}
                                </div>

                                {/* Thumbnail */}
                                {item.image && (
                                  <div className="w-full md:w-48 lg:w-56 aspect-[4/3] shrink-0 bg-gray-50 rounded-xs overflow-hidden shadow-2xs group-hover:shadow-sm transition-all">
                                    <img
                                      src={item.image}
                                      alt={item.title}
                                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 rounded-md"
                                      loading="lazy"
                                    />
                                  </div>
                                )}
                              </div>
                            </motion.article>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )
              ) : (
                /* EMPTY STATE */
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="bg-white border border-gray-200 rounded-sm p-12 text-center space-y-4 shadow-2xs"
                >
                  <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-400 mx-auto flex items-center justify-center">
                    <FiCalendar className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-heading font-bold text-heading">
                    {t({ id: "Tidak Ada Agenda Ditemukan", en: "No Events Found" })}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto">
                    {rawAgendas.length === 0
                      ? t({ id: "Belum ada agenda di Strapi. Tambahkan dan publikasikan agenda di Strapi Admin Panel.", en: "No events in Strapi yet. Add and publish events in the Strapi Admin Panel." })
                      : t({ id: "Tidak ada agenda yang cocok dengan filter yang dipilih.", en: "No events match your selected filters." })
                    }
                  </p>
                  <div className="pt-2">
                    <motion.button
                      whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                      type="button" onClick={handleResetAll}
                      className="px-5 py-2.5 bg-primary hover:bg-[#680000] text-white text-xs sm:text-sm font-semibold rounded-xs transition-colors cursor-pointer shadow-xs"
                    >
                      {t({ id: "Tampilkan Semua Agenda", en: "Show All Events" })}
                    </motion.button>
                  </div>
                </motion.div>
              )
            )}
          </div>
        </div>

        {/* Modal Submit */}
        <SubmitEventModal isOpen={isSubmitModalOpen} onClose={() => setIsSubmitModalOpen(false)} />

        <Footer />
      </main>
    </>
  );
}
