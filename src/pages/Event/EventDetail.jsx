import { useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FiArrowLeft, FiPlus, FiExternalLink } from "react-icons/fi";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import {
  eventData,
  formatIndoDate,
  getIndoDayName,
  generateGoogleCalendarUrl,
  downloadIcsFile,
} from "../../data/eventData";

export default function EventDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();

  // Cari event berdasarkan slug
  const event = useMemo(() => {
    return eventData.find((item) => item.slug === slug);
  }, [slug]);

  // Daftar upcoming events lainnya untuk sidebar kiri
  const upcomingEvents = useMemo(() => {
    return eventData
      .filter((item) => item.slug !== slug)
      .slice(0, 6);
  }, [slug]);

  // Fallback jika event tidak ditemukan
  if (!event) {
    return (
      <>
        <Helmet>
          <title>Agenda Tidak Ditemukan | MKn UNISSULA</title>
        </Helmet>
        <div className="flex flex-col min-h-screen bg-white font-body text-body">
          <Navbar />
          <div className="flex-grow max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
            <h1 className="text-3xl font-heading font-bold text-heading">
              Agenda Acara Tidak Ditemukan
            </h1>
            <p className="text-gray-600">
              Agenda yang Anda cari mungkin telah berakhir atau tautan tidak valid.
            </p>
            <div>
              <Link
                to="/event"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-[#680000] text-white text-sm font-semibold rounded-xs transition-colors"
              >
                <FiArrowLeft className="w-4 h-4" />
                <span>Kembali ke Kalender Agenda</span>
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
        <title>{`${event.title} | Agenda MKn UNISSULA`}</title>
        <meta
          name="description"
          content={event.description || "Agenda kegiatan Magister Kenotariatan UNISSULA."}
        />
      </Helmet>

      <main className="flex flex-col min-h-screen bg-white font-body text-body">
        {/* Header Navbar */}
        <Navbar />

        {/* Full-bleed Split Layout (Mentok Kanan-Kiri Persis Harvard Law School) */}
        <div className="w-full flex-grow flex flex-col lg:flex-row items-stretch border-t border-gray-200">
          {/* Kolom Kiri: Dark Sidebar (Upcoming Events) */}
          <div className="w-full lg:w-[380px] xl:w-[420px] shrink-0 bg-[#111c24] border-r border-black/20">
            <div className="lg:sticky lg:top-[calc(var(--header-h)+0.5rem)] lg:max-h-[calc(100vh-var(--header-h)-1rem)] lg:overflow-y-auto scrollbar-thin px-6 sm:px-8 lg:px-10 pt-10 sm:pt-14 lg:pt-16 pb-16 space-y-8 text-white">
              {/* Header Sidebar Kiri */}
              <div className="border-b border-white/10 pb-4">
                <Link
                  to="/event"
                  className="text-2xl sm:text-3xl font-heading font-normal tracking-tight text-white hover:text-gray-200 transition-colors block"
                >
                  Events Calendar
                </Link>
                <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold block mt-1">
                  Upcoming Events
                </span>
              </div>

              {/* Daftar Acara Mendatang Lainnya */}
              <div className="space-y-6">
                {upcomingEvents.map((item) => (
                  <article
                    key={item.id}
                    onClick={() => navigate(`/event/${item.slug}`)}
                    className="group cursor-pointer space-y-1 block pb-4 border-b border-white/5 last:border-0"
                  >
                    <h3 className="font-heading font-medium text-sm sm:text-base text-white group-hover:text-primary transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-400 font-normal">
                      {formatIndoDate(item.date)} • {item.time}
                    </p>
                  </article>
                ))}
              </div>

              {/* Tombol Lihat Semua Kalender */}
              <div className="pt-2">
                <Link
                  to="/event"
                  className="w-full py-2.5 px-4 rounded-full border border-white/20 hover:border-white text-xs font-semibold text-white transition-colors flex items-center justify-center gap-2"
                >
                  <FiArrowLeft className="w-3.5 h-3.5" />
                  <span>Lihat Kalender Lengkap</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Detail Acara Lengkap (Putih Bersih) */}
          <div className="flex-grow min-w-0 bg-white px-6 sm:px-10 lg:px-14 xl:px-20 py-8 sm:py-12 space-y-10">
            {/* Tautan Navigasi Kembali */}
            <div>
              <Link
                to="/event"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-primary hover:underline transition-colors"
              >
                <FiArrowLeft className="w-4 h-4" />
                <span>Back to events list</span>
              </Link>
            </div>

            {/* Flyer / Dokumentasi Acara — banner besar selebar kolom konten.
                object-contain + max-h menjaga poster potret maupun banner lanskap
                tampil utuh tanpa terpotong. */}
            {event.image && (
              <figure className="w-full overflow-hidden rounded-xs border border-gray-200 bg-gray-50 shadow-2xs">
                <a
                  href={event.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Buka gambar ukuran penuh"
                  className="block group/flyer"
                >
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-auto max-h-[78vh] object-contain mx-auto transition-transform duration-500 group-hover/flyer:scale-[1.015]"
                  />
                </a>
              </figure>
            )}

            {/* Header Acara */}
            <div className="space-y-4 pb-8 border-b border-gray-200">
              <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-heading font-medium text-heading leading-[1.15] tracking-tight max-w-4xl">
                {event.title}
              </h1>

              <div className="space-y-0.5 pt-1">
                <div className="text-base sm:text-lg font-bold text-heading">
                  {formatIndoDate(event.date)}
                </div>
                <div className="text-sm text-gray-600 font-normal">
                  {getIndoDayName(event.date)}, {event.time}
                </div>
              </div>
            </div>

            {/* Konten Utama & Metadata Sidebar (Sub-grid) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
              {/* Kolom Kiri Sub-grid: Link Lokasi / Zoom & Deskripsi Lengkap */}
              <div className="lg:col-span-8 space-y-6 text-sm sm:text-base text-gray-700 leading-relaxed font-body">
                {/* Informasi Lokasi / Ruang / Zoom */}
                {event.venue && (
                  <div className="p-4 bg-gray-50 rounded-xs border border-gray-200/90 text-sm">
                    <span className="font-bold text-heading">Lokasi / Ruang: </span>
                    <span>{event.venue}</span>
                  </div>
                )}

                {/* Paragraf Narasi Acara — fullDescription dipecah per paragraf
                    agar naskah panjang tetap enak dibaca. */}
                <div className="space-y-4 pt-1">
                  <p className="font-medium text-heading">
                    {event.description}
                  </p>

                  {(event.fullDescription || event.description)
                    .split(/\n\s*\n/)
                    .filter((paragraf) => paragraf.trim())
                    .map((paragraf, idx) => (
                      <p
                        key={idx}
                        className="text-gray-600 text-[15px] leading-7 text-justify"
                      >
                        {paragraf.trim()}
                      </p>
                    ))}
                </div>

                {/* Informasi Narasumber */}
                {event.speaker && (
                  <div className="pt-4 border-t border-gray-150 space-y-1 text-sm">
                    <span className="text-xs uppercase tracking-wider font-bold text-gray-500 block">
                      Narasumber & Pakar
                    </span>
                    <p className="font-medium text-heading">
                      {event.speaker}
                    </p>
                  </div>
                )}
              </div>

              {/* Kolom Kanan Sub-grid: Metadata Singkat (Website, Contact, Organizer) */}
              <div className="lg:col-span-4 space-y-6 pt-1 text-xs sm:text-sm border-t lg:border-t-0 lg:border-l lg:border-gray-200 lg:pl-8">
                {/* Website / Pendaftaran */}
                {event.registrationUrl && (
                  <div className="space-y-1">
                    <span className="font-bold text-heading uppercase tracking-wider text-xs block">
                      Website
                    </span>
                    <a
                      href={event.registrationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-primary hover:underline font-medium"
                    >
                      <span>Event Information</span>
                      <FiExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}

                {/* Contact */}
                <div className="space-y-1">
                  <span className="font-bold text-heading uppercase tracking-wider text-xs block">
                    Contact
                  </span>
                  <div className="text-gray-600 font-normal">
                    {event.cp || "Sekretariat Program Studi MKn UNISSULA"}
                  </div>
                </div>

                {/* Penyelenggara */}
                <div className="space-y-1">
                  <span className="font-bold text-heading uppercase tracking-wider text-xs block">
                    Student Organizations / Unit
                  </span>
                  <div className="text-gray-600 font-normal">
                    {event.organizer}
                  </div>
                </div>

                {/* Kategori */}
                <div className="space-y-1">
                  <span className="font-bold text-heading uppercase tracking-wider text-xs block">
                    Kategori Agenda
                  </span>
                  <div className="text-gray-600 font-normal">
                    {event.category}
                  </div>
                </div>
              </div>
            </div>

            {/* Bagian Bawah: Add to Calendar (Persis Screenshot 2) */}
            <div className="pt-10 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="space-y-0.5">
                <span className="font-heading font-bold text-sm text-heading block">
                  Add to Calendar
                </span>
                <p className="text-xs text-gray-500 font-normal">
                  {formatIndoDate(event.date)}, {event.time}
                </p>
              </div>

              {/* Tombol Pil Add to Calendar */}
              <div className="flex flex-wrap items-center gap-3">
                {/* Google Calendar */}
                <a
                  href={googleCalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2 rounded-full border border-gray-300 hover:border-primary hover:text-primary text-xs font-semibold text-heading transition-colors inline-flex items-center gap-1.5 bg-white shadow-2xs"
                >
                  <FiPlus className="w-3.5 h-3.5 text-primary" />
                  <span>Google Calendar</span>
                </a>

                {/* iCal / Outlook */}
                <button
                  type="button"
                  onClick={() => downloadIcsFile(event)}
                  className="px-5 py-2 rounded-full border border-gray-300 hover:border-primary hover:text-primary text-xs font-semibold text-heading transition-colors inline-flex items-center gap-1.5 bg-white shadow-2xs cursor-pointer"
                >
                  <FiPlus className="w-3.5 h-3.5 text-primary" />
                  <span>iCal/Outlook</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </main>
    </>
  );
}
