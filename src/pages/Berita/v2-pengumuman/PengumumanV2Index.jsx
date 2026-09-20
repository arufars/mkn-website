import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { FiRefreshCw, FiAlertCircle } from "react-icons/fi";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import PengumumanV2Card from "./components/PengumumanV2Card";
import { useT, useLanguage } from "../../../i18n/languageContext";
import { strapiFetch } from "../../../api/strapiClient";
import { buildListQuery } from "../../../api/strapiQuery";
import {
  STRAPI_ENDPOINTS,
  STRAPI_POPULATE,
  STRAPI_DEFAULTS,
} from "../../../config/strapi";
import { normalizePengumuman } from "./utils/pengumumanFormatters";

export default function PengumumanV2Index() {
  const t = useT();
  const { lang } = useLanguage();

  const [pengumumanList, setPengumumanList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPengumuman = async () => {
    setLoading(true);
    setError(null);
    try {
      const activeLocale = lang || STRAPI_DEFAULTS.LOCALE;

      // 1. Fetch dengan locale aktif
      const query = buildListQuery({
        populate: STRAPI_POPULATE.PENGUMUMAN_V2,
        sort: ["tanggal:desc", "createdAt:desc"],
        locale: activeLocale,
      });

      const res = await strapiFetch(`${STRAPI_ENDPOINTS.PENGUMUMAN_V2}?${query}`);
      let list = Array.isArray(res?.data) ? res.data : [];

      // 2. Fallback: jika EN kosong, ambil dari locale 'id'
      if (list.length === 0 && activeLocale !== STRAPI_DEFAULTS.LOCALE) {
        const fallbackQuery = buildListQuery({
          populate: STRAPI_POPULATE.PENGUMUMAN_V2,
          sort: ["tanggal:desc", "createdAt:desc"],
          locale: STRAPI_DEFAULTS.LOCALE,
        });
        const fbRes = await strapiFetch(
          `${STRAPI_ENDPOINTS.PENGUMUMAN_V2}?${fallbackQuery}`
        );
        list = Array.isArray(fbRes?.data) ? fbRes.data : [];
      }

      setPengumumanList(list.map(normalizePengumuman));
    } catch (err) {
      console.error("[PengumumanV2Index] Gagal memuat pengumuman:", err);
      setError(err.message || "Gagal mengambil data pengumuman dari Strapi CMS.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPengumuman();
  }, [lang]);

  return (
    <>
      <Helmet>
        <html lang={lang} />
        <title>
          {lang === "en"
            ? "Announcements | Master of Notary UNISSULA"
            : "Pengumuman | Magister Kenotariatan UNISSULA"}
        </title>
        <meta
          name="description"
          content={
            lang === "en"
              ? "Official announcements and academic notices of the UNISSULA Master of Notary Program."
              : "Pengumuman resmi dan edaran akademik Program Studi Magister Kenotariatan UNISSULA."
          }
        />
      </Helmet>

      <main className="flex flex-col min-h-screen bg-white font-body text-body">
        <Navbar />

        <div className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Header Section (Persis Screenshot 1) */}
          <section className="space-y-6">
            <div className="border-b border-heading pb-3 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
              <div>
                <h1 className="font-heading font-normal text-3xl sm:text-4xl text-heading tracking-normal">
                  {t({ id: "Pengumuman", en: "Announcements" })}
                </h1>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  {t({
                    id: "Pengumuman resmi dan edaran akademik Program Studi Magister Kenotariatan UNISSULA.",
                    en: "Official announcements and academic notices of the UNISSULA Master of Notary Program.",
                  })}
                </p>
              </div>

              {!loading && (
                <span className="text-xs font-semibold text-primary uppercase tracking-wider bg-red-50 border border-primary/20 px-3 py-1 rounded-xs w-fit">
                  {pengumumanList.length}{" "}
                  {t({ id: "PENGUMUMAN", en: "ANNOUNCEMENTS" })}
                </span>
              )}
            </div>

            {/* Error Banner */}
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xs flex items-center justify-between text-xs sm:text-sm text-red-700">
                <div className="flex items-center gap-2">
                  <FiAlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                  <span>{error}</span>
                </div>
                <button
                  type="button"
                  onClick={fetchPengumuman}
                  className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <FiRefreshCw className="w-3.5 h-3.5" />
                  <span>{t({ id: "Muat Ulang", en: "Retry" })}</span>
                </button>
              </div>
            )}

            {/* Loading Skeleton */}
            {loading && (
              <div className="space-y-6 animate-pulse">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white border border-gray-200 rounded-xs p-6 flex flex-col gap-3"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-4 bg-gray-200 rounded" />
                      <div className="w-24 h-4 bg-gray-200 rounded" />
                    </div>
                    <div className="w-3/4 h-6 bg-gray-200 rounded" />
                    <div className="w-full h-12 bg-gray-100 rounded" />
                    <div className="w-40 h-5 bg-gray-200 rounded mt-2" />
                  </div>
                ))}
              </div>
            )}

            {/* List Pengumuman */}
            {!loading && !error && (
              <>
                {pengumumanList.length > 0 ? (
                  <div className="space-y-6">
                    {pengumumanList.map((item) => (
                      <PengumumanV2Card
                        key={item.id}
                        item={item}
                        basePath="/pengumuman-v2"
                      />
                    ))}
                  </div>
                ) : (
                  /* Empty State Fallback */
                  <div className="border border-dashed border-gray-300 bg-white p-10 sm:p-14 text-center rounded-xs">
                    <p className="text-sm font-medium text-gray-500">
                      {t({
                        id: "Belum ada pengumuman yang diterbitkan.",
                        en: "No announcements have been published yet.",
                      })}
                    </p>
                    <p className="mt-1.5 text-xs text-gray-400 max-w-md mx-auto leading-relaxed">
                      {t({
                        id: "Pengumuman resmi program studi akan ditampilkan di sini.",
                        en: "Official announcements from the study program will appear here.",
                      })}
                    </p>
                  </div>
                )}
              </>
            )}
          </section>
        </div>

        <Footer />
      </main>
    </>
  );
}
