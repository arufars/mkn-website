import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  FiArrowLeft,
  FiCalendar,
  FiClock,
  FiUser,
  FiExternalLink,
  FiAlertCircle,
  FiRefreshCw,
} from "react-icons/fi";
import { TbPinFilled } from "react-icons/tb";

import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Breadcrumb from "../../../components/ui/Breadcrumb";
import { useT, useLanguage } from "../../../i18n/languageContext";
import { calculateReadingTime } from "../../../utils/format";

import { strapiFetch } from "../../../api/strapiClient";
import {
  buildDetailByFieldQuery,
  buildRelatedQuery,
} from "../../../api/strapiQuery";
import {
  STRAPI_ENDPOINTS,
  STRAPI_POPULATE,
  STRAPI_SORT,
  STRAPI_DEFAULTS,
} from "../../../config/strapi";
import {
  getStrapiMediaUrl,
  formatTanggal,
} from "./utils/strapiFormatters";
import StrapiArticleBlocks from "./components/StrapiArticleBlocks";
import BeritaV2Gallery from "./components/BeritaV2Gallery";
import BeritaV2ShareButtons from "./components/BeritaV2ShareButtons";

/* =========================================================
   ANIMATION & VIEWPORT SETTINGS
========================================================= */
const viewportSettings = {
  once: true,
  amount: 0.2,
};

export default function BeritaV2Detail() {
  const t = useT();
  const { lang } = useLanguage();
  const { title } = useParams();

  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Scroll to top setiap kali parameter URL berubah
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [title]);

  // Load detail artikel berdasarkan slug dan artikel terkait langsung dengan query builder global
  const loadDetailData = async () => {
    if (!title) return;
    setLoading(true);
    setError(null);

    const slugParam = decodeURIComponent(title).trim();
    const activeLocale = lang || STRAPI_DEFAULTS.LOCALE;

    try {
      // 1. Cari artikel via slug dengan locale AKTIF (id atau en)
      let foundArticle = null;
      try {
        const slugQuery = buildDetailByFieldQuery({
          field: "slug",
          value: slugParam,
          populate: STRAPI_POPULATE.BERITA_FULL,
          locale: activeLocale,  // kirim locale aktif
        });
        const res = await strapiFetch(`${STRAPI_ENDPOINTS.BERITA}?${slugQuery}`);
        if (Array.isArray(res?.data) && res.data.length > 0) {
          foundArticle = res.data[0];
        }
      } catch (_) {}

      // 2. Fallback via documentId dengan locale aktif
      if (!foundArticle) {
        try {
          const docQuery = buildDetailByFieldQuery({
            field: "documentId",
            value: slugParam,
            populate: STRAPI_POPULATE.BERITA_FULL,
            locale: activeLocale,
          });
          const resDoc = await strapiFetch(`${STRAPI_ENDPOINTS.BERITA}?${docQuery}`);
          if (Array.isArray(resDoc?.data) && resDoc.data.length > 0) {
            foundArticle = resDoc.data[0];
          }
        } catch (_) {}
      }

      // 3. Fallback ke locale "id" jika versi terjemahan (EN) belum ada
      if (!foundArticle && activeLocale !== STRAPI_DEFAULTS.LOCALE) {
        try {
          const fbSlugQuery = buildDetailByFieldQuery({
            field: "slug",
            value: slugParam,
            populate: STRAPI_POPULATE.BERITA_FULL,
            locale: STRAPI_DEFAULTS.LOCALE,  // fallback ke "id"
          });
          const resFb = await strapiFetch(`${STRAPI_ENDPOINTS.BERITA}?${fbSlugQuery}`);
          if (Array.isArray(resFb?.data) && resFb.data.length > 0) {
            foundArticle = resFb.data[0];
          }
        } catch (_) {}
      }

      // 4. Fallback terakhir: documentId + locale "id"
      if (!foundArticle && activeLocale !== STRAPI_DEFAULTS.LOCALE) {
        try {
          const fbDocQuery = buildDetailByFieldQuery({
            field: "documentId",
            value: slugParam,
            populate: STRAPI_POPULATE.BERITA_FULL,
            locale: STRAPI_DEFAULTS.LOCALE,
          });
          const resFbDoc = await strapiFetch(`${STRAPI_ENDPOINTS.BERITA}?${fbDocQuery}`);
          if (Array.isArray(resFbDoc?.data) && resFbDoc.data.length > 0) {
            foundArticle = resFbDoc.data[0];
          }
        } catch (_) {}
      }

      setArticle(foundArticle);

      // 5. Ambil artikel terkait dengan locale aktif, fallback ke "id"
      if (foundArticle) {
        const relatedQuery = buildRelatedQuery({
          excludeId: foundArticle.id,
          populate: STRAPI_POPULATE.BERITA_CARD,
          sort: STRAPI_SORT.BERITA_DEFAULT,
          limit: 3,
          locale: activeLocale,  // kirim locale aktif
        });
        const relRes = await strapiFetch(`${STRAPI_ENDPOINTS.BERITA}?${relatedQuery}`);
        let relList = Array.isArray(relRes?.data) ? relRes.data : [];

        // Fallback related: kalau EN kosong, ambil dari "id"
        if (relList.length === 0 && activeLocale !== STRAPI_DEFAULTS.LOCALE) {
          const relFbQuery = buildRelatedQuery({
            excludeId: foundArticle.id,
            populate: STRAPI_POPULATE.BERITA_CARD,
            sort: STRAPI_SORT.BERITA_DEFAULT,
            limit: 3,
            locale: STRAPI_DEFAULTS.LOCALE,
          });
          const relFbRes = await strapiFetch(`${STRAPI_ENDPOINTS.BERITA}?${relFbQuery}`);
          relList = Array.isArray(relFbRes?.data) ? relFbRes.data : [];
        }

        setRelatedArticles(relList);
      }
    } catch (err) {
      console.error("[BeritaV2Detail] Gagal memuat detail artikel:", err);
      setError(
        err.message ||
          "Gagal mengambil artikel dari Strapi CMS di http://localhost:1337"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDetailData();
  }, [title, lang]);

  const imageUrl = getStrapiMediaUrl(article?.gambar);
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <>
      <Helmet>
        <title>
          {article
            ? `${article.title} | Magister Kenotariatan UNISSULA`
            : "Detail Berita V2 | Magister Kenotariatan UNISSULA"}
        </title>
        {article && (
          <>
            <meta name="description" content={article.title} />
            <meta property="og:title" content={article.title} />
            {imageUrl && <meta property="og:image" content={imageUrl} />}
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
                    Gagal Terhubung ke Strapi
                  </h3>
                  <p className="text-sm text-amber-800 leading-relaxed">{error}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={loadDetailData}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white text-xs font-bold tracking-wider uppercase rounded-xs hover:bg-[#680000] transition-colors cursor-pointer"
                >
                  <FiRefreshCw className="text-xs" />
                  Coba Muat Ulang
                </button>
                <Link
                  to="/berita-v2"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-heading text-xs font-semibold rounded-xs hover:bg-gray-50 transition-colors"
                >
                  <FiArrowLeft className="text-xs" />
                  Kembali ke Berita V2
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
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-heading">
                {t({ id: "Artikel Tidak Ditemukan", en: "Article Not Found" })}
              </h2>
              <p className="text-sm text-gray-600 max-w-md mx-auto">
                {t({
                  id: `Artikel "${decodeURIComponent(title)}" tidak ditemukan di server Strapi atau mungkin belum dipublikasikan (Published).`,
                  en: `Article "${decodeURIComponent(title)}" was not found on the Strapi server or may not have been published yet.`,
                })}
              </p>
              <div className="pt-2">
                <Link
                  to="/berita-v2"
                  className="inline-flex items-center gap-2 bg-primary text-white text-xs font-semibold px-5 py-2.5 rounded-xs hover:bg-[#680000] transition-colors"
                >
                  <FiArrowLeft className="text-sm" />
                  <span>
                    {t({
                      id: "Kembali ke Indeks Berita V2",
                      en: "Back to News V2 Index",
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
                <Link
                  to="/berita-v2"
                  className="inline-flex items-center space-x-2 text-xs font-semibold text-gray-500 hover:text-primary transition-colors cursor-pointer"
                >
                  <FiArrowLeft className="text-sm" />
                  <span>
                    {t({
                      id: "KEMBALI KE DAFTAR BERITA (V2)",
                      en: "BACK TO NEWS LIST (V2)",
                    })}
                  </span>
                </Link>
              </motion.div>

              {/* ARTIKEL CARD */}
              <motion.article
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                className="bg-white border border-gray-200 rounded-xs p-6 sm:p-10 lg:p-14 shadow-2xs space-y-8"
              >
                {/* HEADER */}
                <div className="space-y-4 pb-6 border-b border-gray-200">
                  {/* TAG BADGE */}
                  {Array.isArray(article.tags) && article.tags.length > 0 && (
                    <span className="inline-block bg-red-50 text-primary border border-primary/20 text-xs font-bold px-3 py-1 uppercase tracking-wider rounded-xs">
                      {article.tags[0]?.nama || "Berita"}
                    </span>
                  )}

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
                            {article.author || article.createdBy?.username || "Redaksi MKn"}
                          </p>
                          <p className="text-[11px] text-gray-400">Redaksi MKn UNISSULA</p>
                        </div>
                      </div>

                      <span className="hidden sm:inline text-gray-300">|</span>

                      {/* Tanggal, Waktu Baca, & Status Pin */}
                      <div className="flex items-center space-x-3 text-gray-500">
                        <span className="flex items-center gap-1.5">
                          <FiCalendar className="text-primary text-xs" />
                          {formatTanggal(article.tanggal || article.createdAt)}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1.5">
                          <FiClock className="text-primary text-xs" />
                          {t(calculateReadingTime(article.content).text)}
                        </span>
                        {article.isPinned && (
                          <>
                            <span>•</span>
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold tracking-wider uppercase bg-primary text-white px-2 py-0.5 rounded-xs">
                              <TbPinFilled className="text-[10px]" />
                              DIPIN
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* SHARE BUTTONS */}
                    <BeritaV2ShareButtons
                      title={article.title}
                      currentUrl={currentUrl}
                    />
                  </div>
                </div>

                {/* FEATURED IMAGE */}
                {article.gambar && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-2"
                  >
                    <div className="w-full aspect-[16/9] sm:aspect-[21/9] bg-gray-100 rounded-xs overflow-hidden border border-gray-200">
                      <img
                        src={imageUrl}
                        alt={article.gambar.alternativeText || article.title}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                    {article.gambar.caption && (
                      <p className="text-xs text-gray-500 italic text-center">
                        {article.gambar.caption}
                      </p>
                    )}
                  </motion.div>
                )}

                {/* RICH TEXT CONTENT */}
                <div className="pt-2 text-base text-body leading-relaxed">
                  <StrapiArticleBlocks content={article.content} />
                </div>

                {/* PHOTO GALLERY */}
                <BeritaV2Gallery items={article.galeri} />

                {/* SOURCE */}
                {article.sumber && (
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    viewport={viewportSettings}
                    className="pt-4 text-sm text-body border-t border-gray-100"
                  >
                    Sumber:{" "}
                    {article.sumber.url ? (
                      <a
                        href={article.sumber.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-primary hover:underline underline-offset-4 inline-flex items-center gap-1"
                      >
                        <span>{article.sumber.nama || article.sumber.url}</span>
                        <FiExternalLink className="text-xs" />
                      </a>
                    ) : (
                      <span className="font-semibold">{article.sumber.nama}</span>
                    )}
                  </motion.p>
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
                        key={tag.id || idx}
                        className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-xs font-medium"
                      >
                        #{tag.nama || tag}
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
                      {t({ id: "PENULIS / KONTRIBUTOR", en: "AUTHOR / CONTRIBUTOR" })}
                    </span>
                    <h4 className="font-heading font-semibold text-base text-heading">
                      {article.author || article.createdBy?.username || "Redaksi MKn UNISSULA"}
                    </h4>
                    <p className="text-xs text-gray-500">Redaksi MKn UNISSULA</p>
                    <p className="text-xs text-body leading-relaxed pt-1">
                      {t({
                        id: "Kabar berita dan publikasi kegiatan Program Studi Magister (S2) Kenotariatan Fakultas Hukum Universitas Islam Sultan Agung (UNISSULA) Semarang.",
                        en: "News updates and publications from the Master of Notarial Law Program, Faculty of Law, Sultan Agung Islamic University (UNISSULA) Semarang.",
                      })}
                    </p>
                  </div>
                </motion.div>
              </motion.article>

              {/* BERITA TERKAIT / BERITA LAINNYA */}
              {relatedArticles.length > 0 && (
                <section className="pt-8 space-y-6">
                  <div className="border-b border-heading pb-3">
                    <h3 className="font-heading font-normal text-2xl sm:text-3xl text-heading">
                      {t({ id: "Berita Strapi Lainnya", en: "Other Strapi News" })}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {relatedArticles.map((item) => {
                      const relatedImg = getStrapiMediaUrl(item.gambar);
                      const relatedSlugOrId = item.slug || item.documentId || item.id;

                      return (
                        <Link
                          key={item.id}
                          to={`/berita-v2/${relatedSlugOrId}`}
                          className="group bg-white border border-gray-200 rounded-xs overflow-hidden flex flex-col hover:border-primary/50 transition-colors shadow-2xs"
                        >
                          <div className="aspect-[16/10] bg-gray-100 overflow-hidden">
                            {relatedImg ? (
                              <img
                                src={relatedImg}
                                alt={item.title}
                                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                                {t({ id: "Tidak ada gambar", en: "No image" })}
                              </div>
                            )}
                          </div>
                          <div className="p-4 flex-grow flex flex-col justify-between space-y-3">
                            <div className="space-y-1.5">
                              <span className="text-[11px] text-gray-400 uppercase tracking-wider block">
                                {formatTanggal(item.tanggal || item.createdAt)}
                              </span>
                              <h4 className="font-heading font-semibold text-sm sm:text-base text-heading leading-snug group-hover:text-primary transition-colors line-clamp-2">
                                {item.title}
                              </h4>
                            </div>
                            <span className="text-xs font-bold text-primary inline-flex items-center gap-1 group-hover:gap-1.5 transition-all">
                              {t({ id: "Baca Berita →", en: "Read Article →" })}
                            </span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </section>
              )}
            </div>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
}
