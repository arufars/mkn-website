import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FiCalendar, FiChevronLeft, FiChevronRight, FiRefreshCw, FiAlertCircle } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import EventCalendarSidebar from "../../components/Event/EventCalendarSidebar";
import EventCard from "../../components/Event/EventCard";
import EventDetailModal from "../../components/Event/EventDetailModal";
import SubmitEventModal from "../../components/Event/SubmitEventModal";
import { eventCategories } from "../../data/eventData";
import { getHybridEventList } from "../../services/eventService";
import {
  formatEventDate as formatIndoDate,
  getEventDayName as getIndoDayName,
} from "../../utils/eventFormatters";
import { useT, useLanguage } from "../../i18n/languageContext";

const viewportSettings = {
  once: true,
  amount: 0.15,
};

const topControlVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.48,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const dateGroupVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.52,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const compactRowVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: typeof i === "number" ? i * 0.05 : 0,
      duration: 0.42,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function EventPage() {
  const navigate = useNavigate();
  const t = useT();
  const { lang } = useLanguage();

  // State data hybrid
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Bulan default kalender: September 2026
  const defaultYear = 2026;
  const defaultMonth = 8; // 0-indexed: 8 = September

  const [currentMonthDate, setCurrentMonthDate] = useState(
    new Date(defaultYear, defaultMonth, 1)
  );

  // Filter state — selectedDate null berarti tampilkan semua agenda
  const [selectedDate, setSelectedDate] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isCompactView, setIsCompactView] = useState(false);
  const [viewMode, setViewMode] = useState("all"); // "day" or "all"

  // Modal states
  const [activeEventModal, setActiveEventModal] = useState(null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  // Fetch data hybrid (Strapi CMS + Local)
  const fetchEvents = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getHybridEventList({ locale: lang });
      setEvents(data);
    } catch (err) {
      console.error("[EventPage] Error fetching hybrid events:", err);
      setError(err?.message || "Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [lang]);

  // Ambil semua daftar tanggal unik yang memiliki event
  const allEventDates = useMemo(() => {
    return Array.from(new Set(events.map((e) => e.date).filter(Boolean)));
  }, [events]);

  // Filter event berdasarkan kriteria
  const filteredEvents = useMemo(() => {
    return events.filter((item) => {
      // Filter tanggal — hanya aktif jika selectedDate dipilih (tidak null)
      if (selectedDate && item.date !== selectedDate) {
        return false;
      }

      // Filter kategori
      if (selectedCategory) {
        const catVal =
          typeof item.category === "object" && item.category !== null
            ? item.category.id || item.category.name
            : item.category;
        if (catVal !== selectedCategory) return false;
      }

      // Filter keyword
      if (searchKeyword.trim()) {
        const q = searchKeyword.toLowerCase();
        const titleId = typeof item.title === "object" ? item.title.id : item.title || "";
        const titleEn = typeof item.title === "object" ? item.title.en : "";
        const descId = typeof item.description === "object" ? item.description.id : item.description || "";
        const descEn = typeof item.description === "object" ? item.description.en : "";
        const matchSpeaker = (
          typeof item.speaker === "object"
            ? (item.speaker.id || "") + " " + (item.speaker.en || "")
            : item.speaker || ""
        )
          .toLowerCase()
          .includes(q);
        const matchVenue = (
          typeof item.venue === "object"
            ? (item.venue.id || "") + " " + (item.venue.en || "")
            : item.venue || ""
        )
          .toLowerCase()
          .includes(q);

        if (
          !titleId.toLowerCase().includes(q) &&
          !titleEn.toLowerCase().includes(q) &&
          !descId.toLowerCase().includes(q) &&
          !descEn.toLowerCase().includes(q) &&
          !matchSpeaker &&
          !matchVenue
        ) {
          return false;
        }
      }

      return true;
    });
  }, [events, selectedDate, selectedCategory, searchKeyword]);

  // Kelompokkan event berdasarkan tanggal
  const groupedEvents = useMemo(() => {
    const groups = {};
    filteredEvents.forEach((ev) => {
      if (!groups[ev.date]) {
        groups[ev.date] = [];
      }
      groups[ev.date].push(ev);
    });

    // Urutkan tanggal sesuai kronologis atau terbaru
    return Object.keys(groups)
      .sort()
      .map((dateKey) => ({
        date: dateKey,
        events: groups[dateKey].sort((a, b) => {
          if (a.pinned && !b.pinned) return -1;
          if (!a.pinned && b.pinned) return 1;
          return 0;
        }),
      }));
  }, [filteredEvents]);

  // Handler pergantian bulan kalender
  const handleChangeMonth = (offset) => {
    setCurrentMonthDate((prev) => {
      const nextDate = new Date(prev.getFullYear(), prev.getMonth() + offset, 1);
      return nextDate;
    });
  };

  // Handler tombol "Today"
  const handleTodayClick = () => {
    const todayStr = "2026-09-01";
    setSelectedDate(todayStr);
    setCurrentMonthDate(new Date(2026, 8, 1));
  };

  // Handler Prev / Next day
  const handleStepDay = (direction) => {
    if (!selectedDate) {
      setSelectedDate("2026-09-01");
      return;
    }

    const current = new Date(selectedDate + "T00:00:00");
    current.setDate(current.getDate() + direction);

    const y = current.getFullYear();
    const m = String(current.getMonth() + 1).padStart(2, "0");
    const d = String(current.getDate()).padStart(2, "0");
    const nextDateStr = `${y}-${m}-${d}`;

    setSelectedDate(nextDateStr);
    setCurrentMonthDate(new Date(y, current.getMonth(), 1));
  };

  // Reset all filters
  const handleResetAll = () => {
    setSelectedDate(null);
    setSearchKeyword("");
    setSelectedCategory(null);
    setViewMode("all");
    setCurrentMonthDate(new Date(defaultYear, defaultMonth, 1));
  };

  return (
    <>
      <Helmet>
        <html lang={lang} />
        <title>{lang === "en" ? "Events & Activity Calendar | MKn UNISSULA" : "Agenda & Kalender Kegiatan | MKn UNISSULA"}</title>
        <meta
          name="description"
          content={t({
            id: "Kalender kegiatan akademik, seminar nasional, kuliah pakar, workshop akta, dan agenda kemahasiswaan Magister Kenotariatan UNISSULA.",
            en: "Activity calendar for academic events, national seminars, expert lectures, deed drafting workshops, and student affairs of Master of Notarial Law UNISSULA.",
          })}
        />
      </Helmet>

      <main className="flex flex-col min-h-screen bg-white font-body text-body">
        {/* Header Navbar */}
        <Navbar />

        {/* Konten Utama: Full-bleed Split Layout Harvard Law School (Mentok Kiri & Kanan Penuh) */}
        <div className="w-full flex-grow flex flex-col lg:flex-row items-stretch border-t border-gray-200">
          {/* Kolom Kiri: Sidebar Dark Panel (Mentok Kiri Layar Penuh) */}
          <div className="w-full lg:w-[380px] xl:w-[420px] shrink-0 bg-[#111c24] border-r border-black/20">
            <div className="lg:sticky lg:top-[calc(var(--header-h)+0.5rem)] lg:max-h-[calc(100vh-var(--header-h)-1rem)] lg:overflow-y-auto scrollbar-thin">
              <EventCalendarSidebar
                currentMonthDate={currentMonthDate}
                onChangeMonth={handleChangeMonth}
                selectedDate={selectedDate}
                onSelectDate={(date) => {
                  setSelectedDate(date === selectedDate ? null : date);
                }}
                searchKeyword={searchKeyword}
                onSearchChange={setSearchKeyword}
                onResetAll={handleResetAll}
                eventDates={allEventDates}
                onSubmitEventClick={() => setIsSubmitModalOpen(true)}
              />
            </div>
          </div>

          {/* Kolom Kanan: Feed Acara (Mentok Kanan Layar Penuh) */}
          <div className="flex-grow min-w-0 bg-white px-4 sm:px-8 lg:px-12 xl:px-16 py-8 sm:py-10 space-y-8">
            {/* Bar Kontrol Atas (Persis Baris Atas di Screenshot Harvard) */}
            <motion.div
              variants={topControlVariants}
              initial="hidden"
              animate="visible"
              className="pb-4 border-b border-gray-200 flex flex-wrap items-center justify-between gap-4"
            >
              {/* Bagian Kiri: Tombol Today */}
              <div className="flex items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={handleTodayClick}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xs border border-gray-300 hover:border-primary hover:text-primary text-heading text-xs sm:text-sm font-medium transition-colors cursor-pointer bg-white shadow-2xs"
                >
                  <FiCalendar className="w-4 h-4 text-primary" />
                  <span>{lang === "en" ? "Today" : "Hari Ini (Today)"}</span>
                </motion.button>

                {/* Tombol Tampilkan Semua */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => {
                    setSelectedDate(null);
                    setViewMode("all");
                  }}
                  className={`text-xs sm:text-sm px-3.5 py-1.5 rounded-xs font-medium transition-colors cursor-pointer ${
                    !selectedDate
                      ? "bg-primary text-white shadow-2xs"
                      : "text-body hover:text-heading bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {t({ id: "Semua Agenda Mendatang", en: "All Upcoming Events" })}
                </motion.button>
              </div>

              {/* Bagian Kanan: Navigasi Prev/Next & Toggle Compact View */}
              <div className="flex items-center gap-5 text-xs sm:text-sm">
                {/* Panah Prev / Next */}
                <div className="flex items-center gap-3 text-heading font-medium">
                  <button
                    type="button"
                    onClick={() => handleStepDay(-1)}
                    className="inline-flex items-center gap-1 hover:text-primary transition-colors cursor-pointer"
                  >
                    <FiChevronLeft className="w-4 h-4" />
                    <span>{t({ id: "Sebelumnya", en: "Previous" })}</span>
                  </button>
                  <span className="text-gray-300">|</span>
                  <button
                    type="button"
                    onClick={() => handleStepDay(1)}
                    className="inline-flex items-center gap-1 hover:text-primary transition-colors cursor-pointer"
                  >
                    <span>{t({ id: "Berikutnya", en: "Next" })}</span>
                    <FiChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Toggle Compact View */}
                <div className="flex items-center gap-2 pl-2 border-l border-gray-200">
                  <span className="text-gray-600 text-xs">
                    {t({ id: "Tampilan Ringkas", en: "Compact View" })}
                  </span>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={isCompactView}
                    onClick={() => setIsCompactView(!isCompactView)}
                    className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      isCompactView ? "bg-primary" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
                        isCompactView ? "translate-x-4" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Status Filter Aktif (jika ada filter yang sedang aktif) */}
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
                      <button
                        type="button"
                        onClick={() => setSelectedDate(null)}
                        className="hover:font-bold cursor-pointer"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {searchKeyword && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 text-heading border border-gray-300 rounded-full font-medium">
                      {t({ id: "Kata Kunci:", en: "Keyword:" })} &quot;{searchKeyword}&quot;
                      <button
                        type="button"
                        onClick={() => setSearchKeyword("")}
                        className="hover:font-bold cursor-pointer"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={handleResetAll}
                    className="text-primary hover:underline ml-1 font-medium cursor-pointer"
                  >
                    {t({ id: "Reset semua", en: "Reset all" })}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Feed Agenda (Dikelompokkan Berdasarkan Tanggal) */}
            {loading ? (
              <div className="py-20 text-center space-y-4">
                <div className="inline-block w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
                <p className="text-sm text-gray-500 font-medium">
                  {t({ id: "Memuat agenda kegiatan...", en: "Loading events calendar..." })}
                </p>
              </div>
            ) : error && events.length === 0 ? (
              <div className="p-8 bg-red-50 border border-red-200 rounded-sm text-center space-y-4">
                <FiAlertCircle className="w-8 h-8 text-primary mx-auto" />
                <h3 className="font-heading font-bold text-heading">
                  {t({ id: "Gagal Memuat Agenda", en: "Failed to Load Events" })}
                </h3>
                <p className="text-xs text-gray-600 max-w-md mx-auto">{error}</p>
                <button
                  type="button"
                  onClick={fetchEvents}
                  className="px-4 py-2 bg-primary text-white text-xs font-semibold rounded-xs shadow-xs hover:bg-[#680000] cursor-pointer inline-flex items-center gap-1.5"
                >
                  <FiRefreshCw className="w-3.5 h-3.5" />
                  <span>{t({ id: "Coba Lagi", en: "Try Again" })}</span>
                </button>
              </div>
            ) : groupedEvents.length > 0 ? (
              isCompactView ? (
                /* COMPACT VIEW */
                <div className="divide-y divide-gray-200 border-t border-b border-gray-200">
                  {groupedEvents.map((group) => (
                    <motion.div
                      key={group.date}
                      initial="hidden"
                      whileInView="visible"
                      viewport={viewportSettings}
                      variants={dateGroupVariants}
                      className="py-5 grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-8 items-start hover:bg-gray-50/70 transition-colors px-2 rounded-xs"
                    >
                      {/* Kolom 1: Tanggal & Jumlah Acara */}
                      <div className="md:col-span-3 lg:col-span-3 space-y-0.5">
                        <h3 className="font-heading font-bold text-sm sm:text-base text-heading">
                          {formatIndoDate(group.date, lang)}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {getIndoDayName(group.date, lang)} • {group.events.length} {lang === "en" ? "events" : "acara"}
                        </p>
                      </div>

                      {/* Kolom 2 & 3: Jam dan Judul Acara Berdampingan */}
                      <div className="md:col-span-9 lg:col-span-9 space-y-3">
                        {group.events.map((event, idx) => (
                          <motion.div
                            key={event.id}
                            custom={idx}
                            variants={compactRowVariants}
                            whileHover={{ x: 4, transition: { duration: 0.2 } }}
                            onClick={() => navigate(`/event/${event.slug}`)}
                            className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-8 group cursor-pointer py-1"
                          >
                            <span className="text-xs sm:text-sm text-body sm:w-44 shrink-0 font-medium">
                              {t(event.time)}
                            </span>
                            <h4 className="font-heading font-bold text-xs sm:text-sm text-heading group-hover:text-primary transition-colors leading-relaxed">
                              {t(event.title)}
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
                  {groupedEvents.map((group) => (
                    <motion.div
                      key={group.date}
                      initial="hidden"
                      whileInView="visible"
                      viewport={viewportSettings}
                      variants={dateGroupVariants}
                      className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 pt-12 first:pt-2 items-start"
                    >
                      {/* Kolom Kiri: Tanggal & Jumlah Event */}
                      <div className="lg:col-span-3 lg:sticky lg:top-32 space-y-1">
                        <h2 className="text-2xl sm:text-3xl font-heading font-medium text-heading tracking-tight">
                          {formatIndoDate(group.date, lang)}
                        </h2>
                        <p className="text-xs sm:text-sm text-gray-500 font-normal">
                          {getIndoDayName(group.date, lang)} • {group.events.length} {lang === "en" ? "events" : "acara"}
                        </p>
                        <div className="w-12 h-[1.5px] bg-heading mt-3" />
                      </div>

                      {/* Kolom Kanan: Daftar Acara di Tanggal Ini */}
                      <div className="lg:col-span-9 space-y-10 sm:space-y-12">
                        {group.events.map((event, idx) => (
                          <EventCard
                            key={event.id}
                            event={event}
                            index={idx}
                            onSelect={() => navigate(`/event/${event.slug}`)}
                            compact={false}
                          />
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )
            ) : (
              /* Empty State Ketika Tidak Ada Event yang Sesuai */
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
                  {t({
                    id: "Tidak ada agenda kegiatan yang cocok dengan kriteria filter atau tanggal yang Anda pilih.",
                    en: "No event activities match your selected filter criteria or chosen date.",
                  })}
                </p>
                <div className="pt-2">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    type="button"
                    onClick={handleResetAll}
                    className="px-5 py-2.5 bg-primary hover:bg-[#680000] text-white text-xs sm:text-sm font-semibold rounded-xs transition-colors cursor-pointer shadow-xs"
                  >
                    {t({ id: "Tampilkan Semua Agenda", en: "Show All Events" })}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>
          </div>

        {/* Modal Detail Event */}
        {activeEventModal && (
          <EventDetailModal
            event={activeEventModal}
            onClose={() => setActiveEventModal(null)}
          />
        )}

        {/* Modal Submit Event */}
        <SubmitEventModal
          isOpen={isSubmitModalOpen}
          onClose={() => setIsSubmitModalOpen(false)}
        />

        {/* Footer */}
        <Footer />
      </main>
    </>
  );
}
