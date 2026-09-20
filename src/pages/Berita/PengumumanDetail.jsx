import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  FiArrowLeft,
  FiCalendar,
  FiClock,
  FiUser,
  FiDownload,
  FiFileText,
  FiPaperclip,
  FiShare2,
  FiCheck,
  FiAlertCircle,
  FiRefreshCw,
} from "react-icons/fi";
import { FaWhatsapp, FaTwitter } from "react-icons/fa";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useT, useLanguage } from "../../i18n/languageContext";
import { getHybridPengumumanBySlug } from "../../services/pengumumanService";
import {
  formatPengumumanDate,
  blocksToPlainText,
} from "../../utils/pengumumanFormatters";
import { calculateReadingTime } from "../../utils/format";
import StrapiArticleBlocks from "../../components/Strapi/StrapiArticleBlocks";

const viewportSettings = { once: true, amount: 0.15 };

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function PengumumanDetail() {
  const { slug } = useParams();
  const t = useT();
  const { lang } = useLanguage();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  // Scroll ke paling atas saat slug berubah
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [slug]);

  const loadDetail = async () => {
    if (!slug) return;
    setLoading(true);
    setError(null);

    try {
      const found = await getHybridPengumumanBySlug(slug, { locale: lang });
      setItem(found);
    } catch (err) {
      console.error("[PengumumanDetail] Gagal memuat pengumuman:", err);
      setError(err.message || "Gagal mengambil data pengumuman.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDetail();
  }, [slug, lang]);

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = encodeURIComponent(item?.title || "Pengumuman MKn UNISSULA");

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (_) {}
  };

  // Hitung estimasi waktu baca menggunakan helper global
  const readingTime = calculateReadingTime(item?.content);

  // ---- NOT FOUND STATE ----
  if (!loading && !error && !item) {
    return (
      <>
        <Helmet>
          <html lang={lang} />
          <title>
            {lang === "en"
              ? "Announcement Not Found | Master of Notary UNISSULA"
              : "Pengumuman Tidak Ditemukan | MKn UNISSULA"}
          </title>
        </Helmet>
        <div className="flex flex-col min-h-screen bg-white font-body text-body">
          <Navbar />
          <div className="flex-grow max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
            <h1 className="text-3xl font-heading font-bold text-heading">
              {t({ id: "Pengumuman Tidak Ditemukan", en: "Announcement Not Found" })}
            </h1>
            <p className="text-gray-600">
              {t({
                id: "Pengumuman yang Anda cari mungkin telah kedaluwarsa atau tautan tidak valid.",
                en: "The announcement you are looking for may have expired or the link is invalid.",
              })}
            </p>
            <div>
              <Link
                to="/berita?kategori=pengumuman"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-[#680000] text-white text-sm font-semibold rounded-xs transition-colors"
              >
                <FiArrowLeft className="w-4 h-4" />
                <span>
                  {t({
                    id: "Kembali ke Semua Pengumuman",
                    en: "Back to All Announcements",
                  })}
                </span>
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
        <title>
          {item
            ? `${item.title} | ${
                lang === "en"
                  ? "Announcement MKn UNISSULA"
                  : "Pengumuman MKn UNISSULA"
              }`
            : "Pengumuman | MKn UNISSULA"}
        </title>
        <meta
          name="description"
          content={
            item?.plainContent
              ? item.plainContent.slice(0, 160)
              : "Pengumuman resmi Magister Kenotariatan UNISSULA."
          }
        />
      </Helmet>

      <main className="flex flex-col min-h-screen bg-white font-body text-body">
        <Navbar />

        <div className="flex-grow w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Tombol Navigasi Kembali */}
          <div className="mb-6">
            <Link
              to="/berita?kategori=pengumuman"
              className="inline-flex items-center space-x-2 text-xs font-semibold text-gray-500 hover:text-primary transition-colors"
            >
              <FiArrowLeft className="text-sm" />
              <span>
                {t({
                  id: "KEMBALI KE SEMUA PENGUMUMAN",
                  en: "BACK TO ALL ANNOUNCEMENTS",
                })}
              </span>
            </Link>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xs flex items-center justify-between text-xs sm:text-sm text-red-700">
              <div className="flex items-center gap-2">
                <FiAlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{error}</span>
              </div>
              <button
                type="button"
                onClick={loadDetail}
                className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <FiRefreshCw className="w-3.5 h-3.5" />
                <span>{t({ id: "Muat Ulang", en: "Retry" })}</span>
              </button>
            </div>
          )}

          {/* Loading Skeleton */}
          {loading && (
            <div className="bg-white border border-gray-200 rounded-xs p-6 sm:p-10 lg:p-14 shadow-2xs space-y-6 animate-pulse">
              <div className="w-24 h-5 bg-gray-200 rounded" />
              <div className="w-3/4 h-10 bg-gray-200 rounded" />
              <div className="w-1/2 h-5 bg-gray-100 rounded" />
              <div className="space-y-3 pt-4 border-t border-gray-100">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="w-full h-4 bg-gray-200 rounded" />
                ))}
              </div>
            </div>
          )}

          {/* Kartu Detail Artikel Utama */}
          {!loading && item && (
            <motion.article
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="bg-white border border-gray-200 rounded-xs p-6 sm:p-10 lg:p-14 shadow-2xs"
            >
              {/* ================= HEADER DETAIL ================= */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-4 pb-6 border-b border-gray-200"
              >
                {/* Badge Kategori */}
                <motion.span
                  variants={itemVariants}
                  className="inline-block bg-red-50 text-primary border border-primary/20 text-xs font-bold px-3 py-1 uppercase tracking-wider rounded-xs"
                >
                  {item.kategori || t({ id: "Pengumuman", en: "Announcement" })}
                </motion.span>

                {/* Judul Pengumuman */}
                <motion.h1
                  variants={itemVariants}
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-heading font-normal text-heading leading-tight tracking-tight"
                >
                  {item.title}
                </motion.h1>

                {/* Bar Penulis, Tanggal, Waktu Baca, & Share */}
                <motion.div
                  variants={itemVariants}
                  className="flex flex-wrap items-center justify-between gap-4 pt-2 text-xs sm:text-[13px] text-gray-500"
                >
                  {/* Penulis & Tanggal */}
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                        <FiUser />
                      </div>
                      <div>
                        <p className="font-semibold text-heading">{item.author}</p>
                        <p className="text-[11px] text-gray-400">
                          {t(item.authorRole)}
                        </p>
                      </div>
                    </div>

                    <span className="hidden sm:inline text-gray-300">|</span>

                    <div className="flex items-center space-x-3 text-gray-500">
                      <span className="flex items-center gap-1.5">
                        <FiCalendar className="text-primary text-xs" />
                        {formatPengumumanDate(item.tanggal, lang)}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1.5">
                        <FiClock className="text-primary text-xs" />
                        {t(readingTime.text)}
                      </span>
                    </div>
                  </div>

                  {/* Tombol Bagikan */}
                  <div className="flex items-center space-x-2">
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-gray-400 mr-1">
                      {t({ id: "BAGIKAN:", en: "SHARE:" })}
                    </span>

                    <a
                      href={`https://api.whatsapp.com/send?text=${shareText}%20${encodeURIComponent(
                        currentUrl
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-7 h-7 rounded-xs bg-[#25D366] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
                      title="WhatsApp"
                    >
                      <FaWhatsapp className="text-sm" />
                    </a>

                    <a
                      href={`https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(
                        currentUrl
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-7 h-7 rounded-xs bg-[#1DA1F2] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
                      title="Twitter / X"
                    >
                      <FaTwitter className="text-xs" />
                    </a>

                    <button
                      type="button"
                      onClick={handleCopyLink}
                      className="w-7 h-7 rounded-xs bg-gray-600 text-white flex items-center justify-center hover:bg-primary transition-colors cursor-pointer"
                      title={t({ id: "Salin Tautan", en: "Copy Link" })}
                    >
                      {copied ? (
                        <FiCheck className="text-xs text-white" />
                      ) : (
                        <FiShare2 className="text-xs" />
                      )}
                    </button>
                  </div>
                </motion.div>
              </motion.div>

              {/* Flyer Gambar jika ada */}
              {item.gambar && (
                <div className="my-8 overflow-hidden rounded-xs border border-gray-200">
                  <img
                    src={item.gambar}
                    alt={item.title}
                    className="w-full h-auto max-h-[500px] object-cover mx-auto"
                  />
                </div>
              )}

              {/* ================= KONTEN TEKS PENGUMUMAN ================= */}
              <div className="pt-6 text-gray-700 leading-relaxed space-y-4">
                {/* Render via StrapiArticleBlocks jika bertipe Blocks */}
                {Array.isArray(item.content) && item.content.length > 0 && (
                  <StrapiArticleBlocks content={item.content} />
                )}

                {/* Render fallback jika content berupa string biasa */}
                {typeof item.content === "string" &&
                  item.content.trim() &&
                  item.content
                    .split(/\n\s*\n/)
                    .filter((p) => p.trim())
                    .map((para, idx) => (
                      <p
                        key={idx}
                        className="text-base sm:text-[16.5px] text-gray-700 leading-relaxed mb-5 text-justify"
                      >
                        {para.trim()}
                      </p>
                    ))}
              </div>

              {/* ================= DOKUMEN & BERKAS LAMPIRAN ================= */}
              {item.lampiran && item.lampiran.length > 0 && (
                <div className="mt-10 p-5 sm:p-7 bg-red-50/40 border border-red-200/80 rounded-xs space-y-4">
                  <div>
                    <div className="flex items-center gap-2.5 mb-1.5 text-heading font-heading text-lg sm:text-xl font-normal">
                      <FiPaperclip className="text-primary text-xl" />
                      <span>
                        {t({
                          id: "Dokumen & Berkas Lampiran",
                          en: "Attached Documents & Files",
                        })}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-body/80">
                      {t({
                        id: "Silakan unduh dokumen resmi terkait pengumuman ini melalui tautan di bawah:",
                        en: "Please download the official documents related to this announcement via the links below:",
                      })}
                    </p>
                  </div>

                  {/* Daftar Berkas */}
                  <div className="space-y-3">
                    {item.lampiran.map((file, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-white border border-gray-200 rounded-xs hover:border-primary/50 transition-colors shadow-2xs"
                      >
                        <div className="flex items-center gap-3.5 min-w-0">
                          <div className="w-11 h-11 rounded-xs bg-red-50 border border-primary/20 text-primary flex items-center justify-center shrink-0">
                            <FiFileText className="text-xl" />
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-sm sm:text-base font-semibold text-heading truncate">
                              {file.judul || file.nama}
                            </h4>
                            <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 mt-0.5">
                              <span className="uppercase font-bold text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
                                {file.format || "PDF"}
                              </span>
                              {file.ukuran && (
                                <>
                                  <span>&bull;</span>
                                  <span>{file.ukuran}</span>
                                </>
                              )}
                              {file.nama && (
                                <>
                                  <span className="hidden sm:inline">&bull;</span>
                                  <span className="hidden sm:inline truncate max-w-[280px] text-gray-400">
                                    {file.nama}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <a
                            href={file.url}
                            download={file.nama}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-[#680000] text-white text-xs font-semibold rounded-xs transition-colors shadow-2xs"
                          >
                            <FiDownload className="text-sm" />
                            <span>
                              {t({ id: "Unduh Berkas", en: "Download File" })}
                            </span>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ================= TAGS ================= */}
              {item.tags && item.tags.length > 0 && (
                <div className="mt-8 pt-6 border-t border-gray-200 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider mr-2">
                    TAGS:
                  </span>
                  {item.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-xs font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* ================= AUTHOR PROFILE ================= */}
              <div className="mt-8 bg-gray-50 border border-gray-200 p-6 rounded-xs flex flex-col sm:flex-row items-center sm:items-start gap-4">
                <div className="w-14 h-14 rounded-full bg-primary/10 text-primary font-bold text-2xl flex items-center justify-center shrink-0">
                  <FiUser />
                </div>
                <div className="space-y-1 text-center sm:text-left">
                  <span className="text-[10px] font-bold tracking-wider uppercase text-primary block">
                    {t({
                      id: "PENULIS / KONTRIBUTOR",
                      en: "AUTHOR / CONTRIBUTOR",
                    })}
                  </span>
                  <h4 className="font-heading font-semibold text-base text-heading">
                    {item.author}
                  </h4>
                  <p className="text-xs text-gray-500">
                    {t(item.authorRole)}
                  </p>
                  <p className="text-xs text-body leading-relaxed pt-1">
                    {t({
                      id: "Kabar berita dan publikasi kegiatan Program Studi Magister (S2) Kenotariatan Fakultas Hukum Universitas Islam Sultan Agung (UNISSULA) Semarang.",
                      en: "News and activity publications of the Master of Notarial Law Programme, Faculty of Law, Sultan Agung Islamic University (UNISSULA) Semarang.",
                    })}
                  </p>
                </div>
              </div>
            </motion.article>
          )}
        </div>

        <Footer />
      </main>
    </>
  );
}
