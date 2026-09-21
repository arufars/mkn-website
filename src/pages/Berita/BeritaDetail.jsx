import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useT, useLanguage } from "../../i18n/languageContext";
import { useUi } from "../../i18n/useUi";
import {
  FiArrowLeft,
  FiCalendar,
  FiClock,
  FiUser,
  FiArrowRight,
  FiDownload,
  FiPaperclip,
  FiFileText,
  FiExternalLink,
  FiAlertCircle,
  FiRefreshCw,
} from "react-icons/fi";
import { TbPinFilled } from "react-icons/tb";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Breadcrumb from "../../components/ui/Breadcrumb";
import Img from "../../components/ui/Img";
import StrapiArticleBlocks from "../../components/Strapi/StrapiArticleBlocks";
import BeritaGallery from "./components/BeritaGallery";
import BeritaShareButtons from "./components/BeritaShareButtons";

import {
  getHybridBeritaBySlug,
  getRelatedBerita,
} from "../../services/beritaService";
import { formatBeritaDate } from "../../utils/beritaFormatters";
import { calculateReadingTime } from "../../utils/format";
import { getBeritaImage } from "../../utils/imageResolver";

/* =========================================================
   ANIMATION & VIEWPORT SETTINGS
========================================================= */

const viewportSettings = {
  once: true,
  amount: 0.2,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: "easeOut",
    },
  },
};

const leftVariants = {
  hidden: {
    opacity: 0,
    x: -35,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const scaleVariants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

export default function BeritaDetail() {
  const t = useT();
  const ui = useUi();
  const { lang } = useLanguage();
  const { slug } = useParams();
  const navigate = useNavigate();

  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Scroll ke atas saat berganti slug berita
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [slug]);

  // Muat data artikel hybrid
  const loadDetailData = async () => {
    if (!slug) return;
    setLoading(true);
    setError(null);

    try {
      const data = await getHybridBeritaBySlug(slug, { locale: lang });
      setArticle(data);

      if (data) {
        const related = await getRelatedBerita(data, {
          limit: 3,
          locale: lang,
        });
        setRelatedArticles(related);
      } else {
        setRelatedArticles([]);
      }
    } catch (err) {
      console.error("[BeritaDetail] Gagal memuat artikel:", err);
      setError(
        err.message ||
          "Gagal memuat berita dari server. Silakan periksa koneksi Anda."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDetailData();
  }, [slug, lang]);

  const currentUrl =
    typeof window !== "undefined" ? window.location.href : "";

  // Resolusi featured image
  const featuredImg = article
    ? article.imageUrl ||
      (typeof article.gambar === "string" ? getBeritaImage(article.gambar) : "")
    : "";

  const readingTimeObj = calculateReadingTime(
    article?.plainContent || article?.content
  );

  return (
    <>
      <Helmet>
        <html lang={lang} />
        <title>
          {article
            ? `${article.title} | ${
                lang === "en" ? "MKn UNISSULA News" : "Berita MKn UNISSULA"
              }`
            : t({
                id: "Detail Berita | Magister Kenotariatan UNISSULA",
                en: "News Detail | Master of Notarial Law UNISSULA",
              })}
        </title>
        {article && (
          <>
            <meta
              name="description"
              content={article.plainContent?.slice(0, 160) || article.title}
            />
            <meta property="og:title" content={article.title} />
            <meta
              property="og:description"
              content={article.plainContent?.slice(0, 160) || article.title}
            />
            {featuredImg && <meta property="og:image" content={featuredImg} />}
          </>
        )}
      </Helmet>

      <div className="flex flex-col min-h-screen bg-banner font-body text-body">
        <Navbar />

        <main className="w-full flex-grow max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
          {/* =====================================================
              STATE LOADING
          ===================================================== */}
          {loading && (
            <div className="space-y-6 animate-pulse py-8">
              <div className="w-48 h-5 bg-gray-200 rounded" />
              <div className="w-32 h-4 bg-gray-200 rounded" />
              <div className="w-3/4 h-10 bg-gray-200 rounded" />
              <div className="w-full aspect-[16/9] bg-gray-200 rounded-md" />
              <div className="space-y-3 pt-4">
                <div className="w-full h-4 bg-gray-200 rounded" />
                <div className="w-full h-4 bg-gray-200 rounded" />
                <div className="w-5/6 h-4 bg-gray-200 rounded" />
              </div>
            </div>
          )}

          {/* =====================================================
              STATE ERROR
          ===================================================== */}
          {!loading && error && (
            <div className="p-6 sm:p-8 rounded-md bg-amber-50 border border-amber-200 text-amber-900 space-y-4">
              <div className="flex items-start gap-3">
                <FiAlertCircle className="text-2xl text-amber-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h3 className="font-heading font-semibold text-lg">
                    {t({
                      id: "Gagal Mengambil Artikel",
                      en: "Failed to Load Article",
                    })}
                  </h3>
                  <p className="text-sm text-amber-800 leading-relaxed">
                    {error}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={loadDetailData}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white text-xs font-bold tracking-wider uppercase rounded-xs hover:bg-[#680000] transition-colors cursor-pointer"
                >
                  <FiRefreshCw className="text-xs" />
                  {t({ id: "Coba Muat Ulang", en: "Retry" })}
                </button>
                <Link
                  to="/berita"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-heading text-xs font-semibold rounded-xs hover:bg-gray-50 transition-colors"
                >
                  <FiArrowLeft className="text-xs" />
                  {t({
                    id: "Kembali ke Berita",
                    en: "Back to News",
                  })}
                </Link>
              </div>
            </div>
          )}

          {/* =====================================================
              STATE NOT FOUND
          ===================================================== */}
          {!loading && !error && !article && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="py-16 text-center space-y-4 border border-dashed border-gray-300 rounded-lg bg-white p-8"
            >
              <h1 className="font-heading text-2xl sm:text-3xl font-bold text-heading">
                {t({
                  id: "Artikel Tidak Ditemukan",
                  en: "Article Not Found",
                })}
              </h1>
              <p className="text-sm text-gray-600 max-w-md mx-auto">
                {t({
                  id: `Artikel "${decodeURIComponent(
                    slug || ""
                  )}" tidak ditemukan atau telah dipindahkan.`,
                  en: `Article "${decodeURIComponent(
                    slug || ""
                  )}" was not found or has been moved.`,
                })}
              </p>
              <div className="pt-2">
                <Link
                  to="/berita"
                  className="inline-flex items-center gap-2 bg-primary text-white text-xs font-semibold px-5 py-2.5 rounded-xs hover:bg-[#680000] transition-colors"
                >
                  <FiArrowLeft className="text-sm" />
                  <span>
                    {t({
                      id: "Kembali ke Indeks Berita",
                      en: "Back to News Index",
                    })}
                  </span>
                </Link>
              </div>
            </motion.div>
          )}

          {/* =====================================================
              DETAIL VIEW
          ===================================================== */}
          {!loading && !error && article && (
            <div className="space-y-6">
              {/* BREADCRUMB */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                <Breadcrumb customTitle={article.title} />
              </motion.div>

              {/* BACK BUTTON */}
              <motion.div
                initial={{ opacity: 0, x: -25 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
                className="mb-6"
              >
                <button
                  onClick={() =>
                    navigate("/berita", { state: { restore: true } })
                  }
                  className="inline-flex items-center space-x-2 text-xs font-semibold text-gray-500 hover:text-primary transition-colors cursor-pointer"
                >
                  <FiArrowLeft className="text-sm" />
                  <span>
                    {t({
                      id: "KEMBALI KE SEMUA BERITA",
                      en: "BACK TO ALL NEWS",
                    })}
                  </span>
                </button>
              </motion.div>

              {/* ARTICLE CARD */}
              <motion.article
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                className="bg-white border border-gray-200 rounded-xs p-6 sm:p-10 lg:p-14 shadow-2xs space-y-8"
              >
                {/* HEADER */}
                <div className="space-y-4 pb-6 border-b border-gray-200">
                  {/* CATEGORY BADGE */}
                  <span className="inline-block bg-red-50 text-primary border border-primary/20 text-xs font-bold px-3 py-1 uppercase tracking-wider rounded-xs">
                    {article.category || article.tags?.[0] || "Berita"}
                  </span>

                  {/* TITLE */}
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-heading font-normal text-heading leading-tight tracking-tight">
                    {article.title}
                  </h1>

                  {/* AUTHOR, DATE & SHARE */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-2 text-xs sm:text-[13px] text-gray-500">
                    <div className="flex flex-wrap items-center gap-4">
                      {/* Author Avatar */}
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                          <FiUser />
                        </div>
                        <div>
                          <p className="font-semibold text-heading">
                            {article.author || "admkn"}
                          </p>
                          <p className="text-[11px] text-gray-400">
                            {t(article.authorRole)}
                          </p>
                        </div>
                      </div>

                      <span className="hidden sm:inline text-gray-300">|</span>

                      {/* Tanggal, Waktu Baca, & Status Pin */}
                      <div className="flex items-center space-x-3 text-gray-500">
                        <span className="flex items-center gap-1.5">
                          <FiCalendar className="text-primary text-xs" />
                          {formatBeritaDate(article.tanggal, lang)}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1.5">
                          <FiClock className="text-primary text-xs" />
                          {t(readingTimeObj.text)}
                        </span>
                        {article.isPinned && (
                          <>
                            <span>•</span>
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold tracking-wider uppercase bg-primary text-white px-2 py-0.5 rounded-xs">
                              <TbPinFilled className="text-[10px]" />
                              {t({ id: "DIPIN", en: "PINNED" })}
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* SHARE BUTTONS */}
                    <BeritaShareButtons
                      title={article.title}
                      currentUrl={currentUrl}
                    />
                  </div>
                </div>

                {/* FEATURED IMAGE */}
                {featuredImg && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-2"
                  >
                    <div className="w-full aspect-[16/9] sm:aspect-[21/9] bg-gray-100 rounded-xs overflow-hidden border border-gray-200">
                      <Img
                        eager
                        src={featuredImg}
                        alt={article.title}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                    {article.gambar?.caption ? (
                      <p className="text-xs text-gray-500 italic text-center">
                        {article.gambar.caption}
                      </p>
                    ) : (
                      <p className="p-2 text-center text-xs text-gray-500 bg-gray-50/80 italic border-t border-gray-100">
                        {t({
                          id: "Dokumentasi Program Studi Magister Kenotariatan (MKn) Fakultas Hukum UNISSULA Semarang.",
                          en: "Documentation of the Master of Notarial Law (MKn) Programme, Faculty of Law, UNISSULA Semarang.",
                        })}
                      </p>
                    )}
                  </motion.div>
                )}

                {/* CONTENT (STRAPI BLOCKS OR LOCAL TEXT) */}
                <div className="pt-2 text-base text-body leading-relaxed">
                  {Array.isArray(article.content) ? (
                    <StrapiArticleBlocks content={article.content} />
                  ) : (
                    <div className="space-y-5 text-base sm:text-[16.5px] text-body leading-relaxed">
                      {(typeof article.content === "string"
                        ? article.content
                            .split(/\n+/)
                            .map((p) => p.trim())
                            .filter(Boolean)
                        : []
                      ).map((paragraph, idx) => (
                        <p key={idx} className="leading-relaxed">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  )}
                </div>

                {/* PHOTO GALLERY */}
                <BeritaGallery items={article.galeri} />

                {/* SOURCE */}
                {article.sumber && (
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    viewport={viewportSettings}
                    className="pt-4 text-sm text-body border-t border-gray-100"
                  >
                    {t({ id: "Sumber:", en: "Source:" })}{" "}
                    {article.sumber.url ? (
                      <a
                        href={article.sumber.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-primary hover:underline underline-offset-4 inline-flex items-center gap-1"
                      >
                        <span>
                          {article.sumber.nama || article.sumber.url}
                        </span>
                        <FiExternalLink className="text-xs" />
                      </a>
                    ) : (
                      <span className="font-semibold">
                        {article.sumber.nama}
                      </span>
                    )}
                  </motion.p>
                )}

                {/* ATTACHMENTS (IF ANY) */}
                {Array.isArray(article.lampiran) &&
                  article.lampiran.length > 0 && (
                    <div className="my-8 pt-6 border-t border-gray-200">
                      <div className="bg-red-50/40 border border-primary/20 rounded-xs p-5 sm:p-7 space-y-4">
                        <div className="flex items-center gap-2.5 text-heading font-heading text-lg sm:text-xl font-normal">
                          <FiPaperclip className="text-primary text-xl" />
                          <span>
                            {t({
                              id: "Dokumen & Berkas Lampiran",
                              en: "Attached Documents & Files",
                            })}
                          </span>
                        </div>
                        <div className="space-y-3">
                          {article.lampiran.map((file, idx) => (
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
                                        <span>•</span>
                                        <span>{file.ukuran}</span>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <a
                                href={file.url}
                                download={file.nama}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-[#680000] text-white text-xs font-semibold rounded-xs transition-colors shadow-2xs shrink-0 self-start sm:self-auto"
                              >
                                <FiDownload className="text-sm" />
                                <span>
                                  {t({
                                    id: "Unduh Berkas",
                                    en: "Download File",
                                  })}
                                </span>
                              </a>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                {/* TAGS */}
                {Array.isArray(article.tags) && article.tags.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={viewportSettings}
                    className="pt-6 border-t border-gray-200 flex flex-wrap items-center gap-2"
                  >
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider mr-2">
                      TAGS:
                    </span>
                    {article.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-xs font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </motion.div>
                )}

                {/* AUTHOR PROFILE CARD */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  viewport={viewportSettings}
                  className="mt-8 bg-gray-50 border border-gray-200 p-6 rounded-xs flex flex-col sm:flex-row items-center sm:items-start gap-4"
                >
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
                      {article.author || "admkn"}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {t(article.authorRole)}
                    </p>
                    <p className="text-xs text-body leading-relaxed pt-1">
                      {t({
                        id: "Kabar berita dan publikasi kegiatan Program Studi Magister (S2) Kenotariatan Fakultas Hukum Universitas Islam Sultan Agung (UNISSULA) Semarang.",
                        en: "News updates and activity publications of the Master of Notarial Law Programme, Faculty of Law, Sultan Agung Islamic University (UNISSULA) Semarang.",
                      })}
                    </p>
                  </div>
                </motion.div>
              </motion.article>

              {/* RELATED ARTICLES */}
              {relatedArticles.length > 0 && (
                <motion.section
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportSettings}
                  className="mt-14 space-y-6"
                >
                  <motion.div
                    variants={itemVariants}
                    className="flex items-center justify-between border-b border-gray-200 pb-3"
                  >
                    <h3 className="font-heading font-semibold text-xl sm:text-2xl text-heading">
                      {t({ id: "Berita Lainnya", en: "More News" })}
                    </h3>

                    <Link
                      to="/berita"
                      className="text-xs font-semibold text-primary hover:underline flex items-center space-x-1"
                    >
                      <span>{ui("viewAll")}</span>
                      <FiArrowRight />
                    </Link>
                  </motion.div>

                  <motion.div
                    variants={containerVariants}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                  >
                    {relatedArticles.map((rel) => {
                      const relImg =
                        rel.imageUrl ||
                        (typeof rel.gambar === "string"
                          ? getBeritaImage(rel.gambar)
                          : "");
                      const relSlug = rel.slug;

                      return (
                        <motion.div
                          key={rel.id}
                          variants={itemVariants}
                          whileHover={{ y: -5 }}
                          transition={{ duration: 0.25, ease: "easeOut" }}
                        >
                          <Link
                            to={`/berita/${relSlug}`}
                            className="bg-white border border-gray-200 rounded-xs overflow-hidden group hover:border-primary/50 transition-colors flex flex-col shadow-2xs h-full"
                          >
                            <div className="aspect-[16/10] bg-gray-100 overflow-hidden relative">
                              <motion.div
                                initial={{
                                  opacity: 0,
                                  scale: 1.08,
                                  filter: "grayscale(100%) blur(4px)",
                                }}
                                whileInView={{
                                  opacity: 1,
                                  scale: 1,
                                  filter: "grayscale(0%) blur(0px)",
                                }}
                                transition={{
                                  duration: 1.2,
                                  ease: "easeOut",
                                }}
                                viewport={viewportSettings}
                                className="w-full h-full"
                              >
                                {relImg ? (
                                  <Img
                                    src={relImg}
                                    alt={rel.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 rounded-md"
                                    onError={(e) => {
                                      e.currentTarget.style.display = "none";
                                    }}
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                                    {t({
                                      id: "Tidak ada gambar",
                                      en: "No image",
                                    })}
                                  </div>
                                )}
                              </motion.div>
                            </div>

                            <div className="p-4 space-y-2 flex-grow flex flex-col justify-between">
                              <span className="text-[11px] font-semibold text-primary uppercase tracking-wider block">
                                {rel.tags?.[0] || rel.tags || "BERITA"}
                              </span>

                              <h4 className="font-heading font-semibold text-sm sm:text-base text-heading group-hover:text-primary transition-colors line-clamp-2">
                                {rel.title}
                              </h4>

                              <span className="text-[11px] text-gray-400 block pt-1">
                                {formatBeritaDate(rel.tanggal, lang)}
                              </span>
                            </div>
                          </Link>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                </motion.section>
              )}
            </div>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
}