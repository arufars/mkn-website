import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { FiRefreshCw, FiAlertCircle } from "react-icons/fi";

import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Breadcrumb from "../../../components/ui/Breadcrumb";
import { useT, useLanguage } from "../../../i18n/languageContext";

import { strapiFetch } from "../../../api/strapiClient";
import { buildListQuery } from "../../../api/strapiQuery";
import {
  STRAPI_ENDPOINTS,
  STRAPI_POPULATE,
  STRAPI_SORT,
  STRAPI_DEFAULTS,
} from "../../../config/strapi";
import BeritaV2Featured from "./components/BeritaV2Featured";
import BeritaV2ListItem from "./components/BeritaV2ListItem";

/* =========================================================
   ANIMATION & VIEWPORT SETTINGS
========================================================= */
const viewportSettings = {
  once: true,
  amount: 0.2,
};

/* =========================================================
   TEXT / METADATA
========================================================= */
const teksHalaman = {
  meta: {
    title: {
      id: "Berita V2 (Strapi) | Magister Kenotariatan UNISSULA",
      en: "News V2 (Strapi) | Master of Notarial Law UNISSULA",
    },
    description: {
      id: "Kabar terbaru Program Studi Magister Kenotariatan UNISSULA terintegrasi langsung dengan Strapi Headless CMS.",
      en: "Latest news of UNISSULA Master of Notarial Law integrated directly with Strapi Headless CMS.",
    },
  },
  breadcrumb: {
    id: "Berita V2 (Strapi)",
    en: "News V2 (Strapi)",
  },
  eyebrow: {
    id: "BERITA & PENGUMUMAN",
    en: "NEWS & ANNOUNCEMENTS",
  },
  judul: {
    id: "Kabar Terbaru (V2)",
    en: "Latest Updates (V2)",
  },
  intro: {
    id: "Kegiatan akademik, hasil penelitian, pengabdian masyarakat, agenda, dan kabar terkini yang dimuat langsung dari Strapi CMS.",
    en: "Academic activities, research findings, community service, agenda, and latest updates served directly from Strapi CMS.",
  },
  beritaLainnya: {
    id: "Daftar Berita",
    en: "News List",
  },
};

export default function BeritaV2Index() {
  const t = useT();
  const { lang } = useLanguage();

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Ambil daftar berita langsung menggunakan query builder global
  const loadArticles = async () => {
    setLoading(true);
    setError(null);
    try {
      const activeLocale = lang || STRAPI_DEFAULTS.LOCALE;
      const query = buildListQuery({
        populate: STRAPI_POPULATE.BERITA_FULL,
        sort: STRAPI_SORT.BERITA_DEFAULT,
        locale: activeLocale,  // kirim locale aktif ("id" atau "en")
      });
      let result = await strapiFetch(`${STRAPI_ENDPOINTS.BERITA}?${query}`);
      let articles = Array.isArray(result?.data) ? result.data : [];

      // Fallback: jika locale EN tidak ada artikel, ambil dari locale "id"
      if (articles.length === 0 && activeLocale !== STRAPI_DEFAULTS.LOCALE) {
        const fallbackQuery = buildListQuery({
          populate: STRAPI_POPULATE.BERITA_FULL,
          sort: STRAPI_SORT.BERITA_DEFAULT,
          locale: STRAPI_DEFAULTS.LOCALE,
        });
        const fallbackResult = await strapiFetch(`${STRAPI_ENDPOINTS.BERITA}?${fallbackQuery}`);
        articles = Array.isArray(fallbackResult?.data) ? fallbackResult.data : [];
      }

      setArticles(articles);
    } catch (err) {
      console.error("[BeritaV2Index] Gagal memuat data:", err);
      setError(
        err.message ||
          "Koneksi ke server Strapi gagal. Pastikan Strapi berjalan di http://localhost:1337"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, [lang]);

  // Berita Utama: yang dipin, atau item teratas
  const featuredArticle =
    articles.find((item) => item.isPinned) ||
    (articles.length > 0 ? articles[0] : null);

  // Daftar Berita: tampilkan semua berita di katalog agar tidak ada data yang hilang
  const otherArticles = articles;

  return (
    <>
      <Helmet>
        <title>{t(teksHalaman.meta.title)}</title>
        <meta name="description" content={t(teksHalaman.meta.description)} />
      </Helmet>

      <div className="flex flex-col min-h-screen bg-white text-body font-body">
        <Navbar />

        <main className="w-full flex-grow max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 sm:space-y-16">
          {/* HEADER & BREADCRUMB */}
          <section className="space-y-6">
            <div>
              <Breadcrumb customTitle={t(teksHalaman.breadcrumb)} />
            </div>

            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs font-bold tracking-[0.16em] uppercase text-primary block">
                  {t(teksHalaman.eyebrow)} · V2 (STRAPI CMS)
                </span>

                <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Strapi API: localhost:1337 (qs enabled)
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-heading font-normal text-heading tracking-tight">
                {t(teksHalaman.judul)}
              </h1>

              <motion.div
                initial={{ opacity: 0, width: 0 }}
                whileInView={{ opacity: 1, width: "100%" }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                viewport={viewportSettings}
                className="h-[2.5px] bg-primary mt-3 mb-4"
              />

              <p className="text-base sm:text-lg text-body text-justify leading-relaxed">
                {t(teksHalaman.intro)}
              </p>
            </div>
          </section>

          {/* STATE LOADING */}
          {loading && (
            <div className="space-y-12 animate-pulse">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
                <div className="lg:col-span-6 aspect-[4/3] bg-gray-200 rounded-md" />
                <div className="lg:col-span-6 space-y-4">
                  <div className="w-32 h-4 bg-gray-200 rounded" />
                  <div className="w-full h-8 bg-gray-200 rounded" />
                  <div className="w-3/4 h-8 bg-gray-200 rounded" />
                  <div className="w-full h-16 bg-gray-200 rounded" />
                </div>
              </div>
            </div>
          )}

          {/* STATE ERROR */}
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
              <button
                type="button"
                onClick={loadArticles}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white text-xs font-bold tracking-wider uppercase rounded-xs hover:bg-[#680000] transition-colors cursor-pointer"
              >
                <FiRefreshCw className="text-xs" />
                Coba Muat Ulang
              </button>
            </div>
          )}

          {/* STATE KOSONG */}
          {!loading && !error && articles.length === 0 && (
            <div className="py-16 text-center space-y-4 border border-dashed border-gray-300 rounded-lg">
              <p className="text-lg text-heading font-heading">
                Belum ada berita dari Strapi.
              </p>
              <p className="text-sm text-gray-500">
                Silakan tambahkan dan publikasikan (Publish) berita di Admin Panel Strapi (http://localhost:1337/admin).
              </p>
              <button
                type="button"
                onClick={loadArticles}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white text-xs font-bold tracking-wider uppercase rounded-xs hover:bg-[#680000] transition-colors cursor-pointer"
              >
                <FiRefreshCw className="text-xs" />
                Refresh Data
              </button>
            </div>
          )}

          {/* FEATURED NEWS */}
          {!loading && !error && featuredArticle && (
            <BeritaV2Featured article={featuredArticle} t={t} />
          )}

          {/* MORE NEWS LIST */}
          {!loading && !error && otherArticles.length > 0 && (
            <section className="space-y-6 pt-4 scroll-mt-20">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-heading pb-3">
                <h2 className="font-heading font-normal text-3xl sm:text-4xl text-heading tracking-normal">
                  {t(teksHalaman.beritaLainnya)}
                </h2>

                <span className="text-xs text-gray-500 font-medium">
                  Menampilkan {otherArticles.length} berita
                </span>
              </div>

              <div className="divide-y divide-gray-200">
                {otherArticles.map((news) => (
                  <BeritaV2ListItem key={news.id} news={news} />
                ))}
              </div>
            </section>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
}
