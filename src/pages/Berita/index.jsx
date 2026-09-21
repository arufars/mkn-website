import { useState, useMemo, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Link, useSearchParams, useLocation } from "react-router-dom";
import {
  FiChevronLeft,
  FiChevronRight,
  FiDownload,
  FiPaperclip,
  FiFileText,
  FiClock,
} from "react-icons/fi";
import { TbPinFilled } from "react-icons/tb";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Breadcrumb from "../../components/ui/Breadcrumb";
import { useT, useLanguage } from "../../i18n/languageContext";
import { useUi } from "../../i18n/useUi";
import {
  berita as beritaTerurut,
  pengumuman as pengumumanTerurut,
  getBeritaByLocale,
  getPengumumanByLocale,
} from "../../data/beritaSelectors";
import { getHybridPengumumanList } from "../../services/pengumumanService";
import { getHybridBeritaList } from "../../services/beritaService";
import { formatBeritaDate } from "../../utils/beritaFormatters";
import { getBeritaImage } from "../../utils/imageResolver";
import { generateSlug } from "../../utils/slugHelper";
import Img from "../../components/ui/Img";

/* =========================================================
   ANIMATION
========================================================= */

// Teks dan daftar berita tampil langsung tanpa animasi masuk bertahap. Yang
// dipertahankan hanya pengungkapan gambar dan garis aksen, sekali saat terlihat.
const viewportSettings = {
  once: true,
  amount: 0.2,
};

const ITEMS_PER_PAGE = 10;

/**
 * Teks antarmuka halaman Berita.
 */
const halaman = {
  meta: {
    title: {
      id: "Berita & Pengumuman | Magister Kenotariatan UNISSULA",
      en: "News & Announcements | Master of Notarial Law UNISSULA",
    },
    description: {
      id:
        "Kabar terbaru, hasil penelitian, agenda kegiatan, pengabdian masyarakat,  dan pengumuman resmi Program " +
        "Studi Magister Kenotariatan (MKn) UNISSULA.",
      en:
        "Latest news, research findings, activities, and official announcements of the " +
        "UNISSULA Master of Notarial Law (MKn) Study Programme.",
    },
  },

  breadcrumb: {
    id: "Berita & Pengumuman",
    en: "News & Announcements",
  },

  eyebrow: {
    id: "BERITA & PENGUMUMAN",
    en: "NEWS & ANNOUNCEMENTS",
  },

  judul: {
    id: "Kabar Terbaru",
    en: "Latest Updates",
  },

  intro: {
    id:
      "Kegiatan akademik, hasil penelitian, pengabdian masyarakat, agenda, dan pengumuman resmi Program Studi " +
      "Magister Kenotariatan.",
    en:
      "Academic activities, research findings, events, and official announcements of the " +
      "Master of Notarial Law Study Programme.",
  },

  ariaKategori: {
    id: "Kategori Berita dan Pengumuman",
    en: "News and Announcements categories",
  },

  beritaUtama: {
    id: "BERITA UTAMA",
    en: "FEATURED",
  },

  bacaSelengkapnya: {
    id: "BACA SELENGKAPNYA",
    en: "READ MORE",
  },

  beritaLainnya: {
    id: "Berita Lainnya",
    en: "More News",
  },

  judulPengumuman: {
    id: "Pengumuman",
    en: "Announcements",
  },

  pengumumanKosong: {
    id: "Belum ada pengumuman yang diterbitkan.",
    en: "No announcements have been published yet.",
  },

  pengumumanKosongDetail: {
    id: "Pengumuman resmi program studi akan ditampilkan di sini.",
    en: "Official study programme announcements will appear here.",
  },
};

const KATEGORI_TABS = [
  {
    key: "berita",
    label: {
      id: "Berita",
      en: "News",
    },
  },
  {
    key: "pengumuman",
    label: {
      id: "Pengumuman",
      en: "Announcements",
    },
  },
];

/**
 * Satu baris pengumuman, dengan dua varian tampilan.
 *
 * Tidak semua pengumuman menyertakan flyer. Entri tanpa gambar karena itu tidak
 * dipaksa memakai kotak placeholder kosong: kartunya memakai lebar penuh dan
 * diberi pita aksen di tepi kiri supaya bobot visualnya tetap setara dengan
 * kartu bergambar. Bagian lainnya — kategori, tanggal, masa berlaku, judul,
 * ringkasan, lampiran, dan tautan detail — identik di kedua varian sehingga
 * daftarnya tetap terbaca sebagai satu ritme.
 */
function PengumumanCard({ item }) {
  const t = useT();
  // Resolusi gambar: URL Strapi atau aset lokal
  const itemImage = item.gambar
    ? typeof item.gambar === "string" &&
      (item.gambar.startsWith("http") || item.gambar.startsWith("/"))
      ? item.gambar
      : getBeritaImage(item.gambar)
    : "";
  const itemSlug = item.slug || generateSlug(item.title, item.slug);
  const detailUrl = `/pengumuman/${encodeURIComponent(itemSlug)}`;
  const lampiran = Array.isArray(item.lampiran) ? item.lampiran : [];
  const summaryText =
    typeof item.content === "string"
      ? item.content
      : item.plainContent || "";
  const isPinned = Boolean(item.isPinned || item.pinned);

  return (
    <motion.article
      whileHover={{ y: -3 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`group bg-white border rounded-xs overflow-hidden hover:shadow-xs transition-all flex flex-col md:flex-row ${
        isPinned
          ? "border-primary/40 shadow-2xs border-l-4 border-l-primary"
          : "border-gray-200 hover:border-primary/40"
      }`}
    >
      {itemImage ? (
        /* Varian bergambar: kolom flyer di kiri (di atas pada layar kecil) */
        <Link
          to={detailUrl}
          tabIndex={-1}
          aria-hidden="true"
          className="relative shrink-0 overflow-hidden bg-gray-100 border-b md:border-b-0 md:border-r border-gray-200 h-48 sm:h-56 md:h-auto md:w-64 lg:w-72"
        >
          <motion.div
            initial={{ opacity: 0, scale: 1.08, filter: "grayscale(100%) blur(4px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "grayscale(0%) blur(0px)" }}
            transition={{ duration: 1.3, ease: "easeOut" }}
            viewport={viewportSettings}
            className="absolute inset-0"
          >
            <Img
              src={itemImage}
              alt=""
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
          </motion.div>
        </Link>
      ) : (
        /* Varian tanpa gambar: pita aksen sebagai pengganti kolom flyer */
        <div
          aria-hidden="true"
          className={`shrink-0 h-1 w-full md:h-auto md:w-1.5 ${isPinned ? "bg-primary" : "bg-primary"}`}
        />
      )}

      {/* Konten & Lampiran Pengumuman */}
      <div className="p-5 sm:p-6 lg:p-7 flex-grow min-w-0 flex flex-col justify-between gap-4">
        <div className="space-y-3">
          {/* Metadata bar */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-gray-500">
            {isPinned && (
              <span className="inline-flex items-center gap-1 text-[9px] font-bold tracking-wider uppercase bg-primary text-white px-1.5 py-0.5 rounded-xs">
                <TbPinFilled className="text-[9px]" />
                {t({ id: "DIPIN", en: "PINNED" })}
              </span>
            )}
            {item.kategori && (
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-primary bg-red-50 border border-primary/20 px-2 py-0.5 rounded-xs">
                <FiFileText className="text-[11px]" />
                {item.kategori}
              </span>
            )}
            <span className="font-bold text-primary uppercase tracking-wider tabular-nums">
              {item.tanggal}
            </span>
            {item.berlakuHingga && item.berlakuHingga !== "—" && (
              <>
                <span className="text-gray-300">&bull;</span>
                <span className="inline-flex items-center gap-1 text-[11px] bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-xs">
                  <FiClock className="text-xs" />
                  {t({ id: "Berlaku s.d.", en: "Valid until" })} {item.berlakuHingga}
                </span>
              </>
            )}
          </div>

          {/* Judul Pengumuman */}
          <h3 className="font-heading text-xl sm:text-2xl text-heading font-normal leading-snug group-hover:text-primary transition-colors">
            <Link to={detailUrl}>{item.title}</Link>
          </h3>

          {/* Ringkasan Konten */}
          {summaryText && (
            <p
              className={`text-sm text-body/80 leading-relaxed ${
                itemImage
                  ? "line-clamp-2 sm:line-clamp-3"
                  : "line-clamp-3 sm:line-clamp-4"
              }`}
            >
              {summaryText}
            </p>
          )}
        </div>

        {/* Section Lampiran & Tombol Aksi */}
        <div
          className={`pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center gap-3 ${
            lampiran.length > 0 ? "justify-between" : "justify-end"
          }`}
        >
          {lampiran.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                <FiPaperclip className="text-primary text-xs" />
                {t({ id: "Lampiran:", en: "Attachments:" })}
              </span>
              {lampiran.map((file, idx) => (
                <a
                  key={idx}
                  href={file.url}
                  download={file.nama}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-red-50/70 hover:bg-primary text-primary hover:text-white border border-primary/20 text-xs font-semibold rounded-xs transition-colors"
                  title={`${t({ id: "Unduh", en: "Download" })} ${file.nama}`}
                >
                  <FiFileText className="text-xs" />
                  <span className="truncate max-w-[150px] sm:max-w-[200px]">
                    {file.judul || file.nama}
                  </span>
                  {file.ukuran && (
                    <span className="text-[10px] opacity-75 font-normal">
                      ({file.ukuran})
                    </span>
                  )}
                  <FiDownload className="text-xs shrink-0" />
                </a>
              ))}
            </div>
          )}

          {/* Tautan detail */}
          <Link
            to={detailUrl}
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary hover:text-[#680000] transition-colors shrink-0 self-start sm:self-auto"
          >
            <span>{t({ id: "Selengkapnya", en: "Read more" })}</span>
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

/**
 * Komponen Navigasi Pagination Responsif.
 * Menampilkan maksimal 4 nomor halaman sekaligus:
 * Saat berada di halaman 1–4, nomor 1–4 yang terlihat.
 * Saat berpindah (Next) ke halaman 5, nomor 5 akan terlihat (sliding window).
 */
function PaginationBar({ currentPage, totalPages, onPageChange, ui }) {
  if (totalPages <= 1) return null;

  // Hitung nomor halaman yang tampil (maksimal 4)
  const maxVisible = 4;
  let start = 1;
  if (currentPage > maxVisible) {
    start = currentPage - maxVisible + 1;
  }
  if (start + maxVisible - 1 > totalPages) {
    start = Math.max(1, totalPages - maxVisible + 1);
  }
  const end = Math.min(start + maxVisible - 1, totalPages);
  const visiblePages = [];
  for (let i = start; i <= end; i++) {
    visiblePages.push(i);
  }

  return (
    <nav
      aria-label="Navigasi Halaman"
      className="pt-8 pb-4 flex items-center justify-center gap-1 sm:gap-1.5 max-w-full px-2"
    >
      {/* Tombol Sebelumnya */}
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label={ui("previous")}
        className="inline-flex items-center justify-center px-2.5 sm:px-4 h-8 sm:h-9 text-[11px] sm:text-xs font-semibold rounded-xs border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400 hover:text-primary active:scale-98 disabled:opacity-40 disabled:pointer-events-none cursor-pointer transition-all shadow-2xs shrink-0"
      >
        <FiChevronLeft className="mr-0.5 sm:mr-1 text-sm shrink-0" />
        <span>{ui("previous")}</span>
      </button>

      {/* Nomor Halaman (Maksimal 4) */}
      <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
        {visiblePages.map((pageNum) => (
          <motion.button
            key={pageNum}
            type="button"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onPageChange(pageNum)}
            aria-label={`${ui("page")} ${pageNum}`}
            aria-current={currentPage === pageNum ? "page" : undefined}
            className={`w-8 sm:w-9 h-8 sm:h-9 min-w-[32px] sm:min-w-[36px] flex items-center justify-center text-xs font-bold rounded-xs border transition-all cursor-pointer select-none shrink-0 ${
              currentPage === pageNum
                ? "bg-primary text-white border-primary shadow-xs"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100 hover:border-primary hover:text-primary active:scale-95 shadow-2xs"
            }`}
          >
            {pageNum}
          </motion.button>
        ))}
      </div>

      {/* Tombol Berikutnya */}
      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label={ui("next")}
        className="inline-flex items-center justify-center px-2.5 sm:px-4 h-8 sm:h-9 text-[11px] sm:text-xs font-semibold rounded-xs border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400 hover:text-primary active:scale-98 disabled:opacity-40 disabled:pointer-events-none cursor-pointer transition-all shadow-2xs shrink-0"
      >
        <span>{ui("next")}</span>
        <FiChevronRight className="ml-0.5 sm:ml-1 text-sm shrink-0" />
      </button>
    </nav>
  );
}

const BERITA_SESSION_KEY = "mkn_berita_state";

export default function BeritaIndex() {
  const t = useT();
  const ui = useUi();
  const { lang } = useLanguage();
  const location = useLocation();

  const [currentPage, setCurrentPage] = useState(1);

  const newsSectionRef = useRef(null);
  const articleRefs = useRef({});
  const featuredRef = useRef(null);
  // Menyimpan target scroll yang tertunda saat restore dari detail berita.
  // Diproses oleh effect kedua setelah currentPage + currentNewsList sudah dirender.
  const pendingScrollRef = useRef(null);

  const [searchParams, setSearchParams] = useSearchParams();

  const kategori =
    searchParams.get("kategori") === "pengumuman"
      ? "pengumuman"
      : "berita";

  const isBerita = kategori === "berita";

  const [beritaItems, setBeritaItems] = useState(() =>
    getBeritaByLocale(lang)
  );
  const [pengumumanItems, setPengumumanItems] = useState(() =>
    getPengumumanByLocale(lang)
  );

  useEffect(() => {
    let isMounted = true;
    setBeritaItems(getBeritaByLocale(lang));
    setPengumumanItems(getPengumumanByLocale(lang));

    // Ambil data berita hybrid (Strapi CMS + Local JSON)
    getHybridBeritaList({ locale: lang })
      .then((data) => {
        if (isMounted && Array.isArray(data) && data.length > 0) {
          setBeritaItems(data);
        }
      })
      .catch((err) => {
        console.warn("[BeritaIndex] Fallback to local berita:", err);
      });

    // Ambil data pengumuman hybrid (Strapi CMS + Local JSON)
    getHybridPengumumanList({ locale: lang })
      .then((data) => {
        if (isMounted && Array.isArray(data) && data.length > 0) {
          setPengumumanItems(data);
        }
      })
      .catch((err) => {
        console.warn("[BeritaIndex] Fallback to local pengumuman:", err);
      });

    return () => {
      isMounted = false;
    };
  }, [lang]);

  const handleKategoriChange = (key) => {
    setSearchParams(key === "berita" ? {} : { kategori: key });
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [kategori]);

  // Step 1 — Baca sessionStorage dan set halaman yang disimpan.
  // Scroll belum dilakukan di sini karena artikel di halaman baru belum ter-render.
  useEffect(() => {
    if (location.state?.restore) {
      try {
        const saved = JSON.parse(sessionStorage.getItem(BERITA_SESSION_KEY) || "null");
        if (saved) {
          pendingScrollRef.current = saved.articleId ?? null;
          if (saved.page && saved.articleId !== "featured") {
            setCurrentPage(saved.page);
          } else if (saved.articleId === "featured") {
            // Featured selalu di page 1, langsung scroll
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                featuredRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
                pendingScrollRef.current = null;
              });
            });
          }
        }
      } catch (_) { /* ignore */ }
    }
  }, [location.state]);

  // Step 2 — Setelah currentPage berubah dan artikel di daftar sudah ter-render,
  // lakukan scroll ke artikel target.
  useEffect(() => {
    const target = pendingScrollRef.current;
    if (!target || target === "featured") return;
    pendingScrollRef.current = null;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const el = articleRefs.current[target];
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      });
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  // Pisahkan berita yang dipin dan non-pinned
  const { featuredNews, allOtherNews } = useMemo(() => {
    const pinned = beritaItems.filter((item) => Boolean(item.isPinned || item.pinned));
    const nonPinned = beritaItems.filter((item) => !Boolean(item.isPinned || item.pinned));

    // Pinned pertama jadi featured di atas; jika tidak ada, ambil non-pinned terbaru
    const featured = pinned.length > 0 ? pinned[0] : (nonPinned[0] || beritaItems[0]);

    // Berita lainnya: Pinned sisa (pinned ke-2, ke-3, dst jika ada > 2) selalu berada di urutan teratas list,
    // baru kemudian diikuti oleh berita non-pinned dengan tanggal paling baru!
    const remainingPinned = pinned.filter((item) => item !== featured);
    const remainingNonPinned = nonPinned.filter((item) => item !== featured);

    const others = [...remainingPinned, ...remainingNonPinned];

    return {
      featuredNews: featured,
      allOtherNews: others,
    };
  }, [beritaItems]);

  // Apakah featured news memang karena dipin (bukan fallback)
  const featuredIsPinned = Boolean(featuredNews?.isPinned || featuredNews?.pinned);

  // Pisahkan pengumuman yang dipin dan non-pinned
  const { featuredPengumuman, allOtherPengumuman } = useMemo(() => {
    const pinned = pengumumanItems.filter((item) => Boolean(item.isPinned || item.pinned));
    const nonPinned = pengumumanItems.filter((item) => !Boolean(item.isPinned || item.pinned));

    // Pinned pertama jadi featured di atas; jika tidak ada, ambil non-pinned terbaru
    const featured = pinned.length > 0 ? pinned[0] : (nonPinned[0] || pengumumanItems[0]);

    // Pengumuman lainnya: Pinned sisa (pinned ke-2, ke-3, dst jika ada > 2) selalu berada di urutan teratas list,
    // baru kemudian diikuti oleh pengumuman non-pinned dengan tanggal paling baru!
    const remainingPinned = pinned.filter((item) => item !== featured);
    const remainingNonPinned = nonPinned.filter((item) => item !== featured);

    const others = [...remainingPinned, ...remainingNonPinned];

    return {
      featuredPengumuman: featured,
      allOtherPengumuman: others,
    };
  }, [pengumumanItems]);

  // Apakah featured pengumuman memang karena dipin (bukan fallback)
  const featuredPengumumanIsPinned = Boolean(featuredPengumuman?.isPinned || featuredPengumuman?.pinned);

  const totalNewsPages = Math.ceil(
    allOtherNews.length / ITEMS_PER_PAGE
  );

  const totalPengumumanPages = Math.ceil(
    allOtherPengumuman.length / ITEMS_PER_PAGE
  );

  const totalPages = isBerita ? totalNewsPages : totalPengumumanPages;

  const currentNewsList = useMemo(() => {
    const startIndex =
      (currentPage - 1) * ITEMS_PER_PAGE;

    return allOtherNews.slice(
      startIndex,
      startIndex + ITEMS_PER_PAGE
    );
  }, [allOtherNews, currentPage]);

  const currentPengumumanList = useMemo(() => {
    const startIndex =
      (currentPage - 1) * ITEMS_PER_PAGE;

    return allOtherPengumuman.slice(
      startIndex,
      startIndex + ITEMS_PER_PAGE
    );
  }, [allOtherPengumuman, currentPage]);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;

    setCurrentPage(page);

    if (newsSectionRef.current) {
      newsSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <>
      <Helmet>
        <html lang={lang} />
        <title>{t(halaman.meta.title)}</title>
        <meta
          name="description"
          content={t(halaman.meta.description)}
        />
      </Helmet>

      <main className="flex flex-col min-h-screen bg-white font-body text-body">
        <Navbar />

        <div className="w-full flex-grow max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16 sm:space-y-20">

          {/* =====================================================
              HEADER
          ===================================================== */}

          <section className="space-y-6">
            <div>
              <Breadcrumb
                customTitle={t(halaman.breadcrumb)}
              />
            </div>

            <div className="space-y-3">
              <span className="text-xs font-bold tracking-[0.16em] uppercase text-primary block">
                {t(halaman.eyebrow)}
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-heading font-normal text-heading tracking-tight">
                {t(halaman.judul)}
              </h1>

              <motion.div
                initial={{
                  opacity: 0,
                  width: 0,
                }}
                whileInView={{
                  opacity: 1,
                  width: "100%",
                }}
                transition={{
                  duration: 0.9,
                  ease: "easeOut",
                }}
                viewport={viewportSettings}
                className="h-[2.5px] bg-primary mt-3 mb-4"
              />

              <p className="text-base sm:text-lg text-body text-justify leading-relaxed">
                {t(halaman.intro)}
              </p>
            </div>
          </section>

          {/* =====================================================
              CATEGORY TABS
          ===================================================== */}

          <nav
            className="flex items-center gap-6 sm:gap-10 border-b border-gray-200 -mt-10 sm:-mt-14 overflow-x-auto scrollbar-none"
            aria-label={t(halaman.ariaKategori)}
          >
            {KATEGORI_TABS.map((tab) => {
              const active = kategori === tab.key;

              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() =>
                    handleKategoriChange(tab.key)
                  }
                  aria-current={
                    active ? "page" : undefined
                  }
                  className={`shrink-0 whitespace-nowrap py-3.5 sm:py-4 text-xs sm:text-sm font-semibold tracking-[0.14em] uppercase transition-colors border-b-2 cursor-pointer ${
                    active
                      ? "border-primary text-primary"
                      : "border-transparent text-body hover:text-heading hover:border-gray-300"
                  }`}
                >
                  {t(tab.label)}
                </button>
              );
            })}
          </nav>

          {/* =====================================================
              FEATURED NEWS
          ===================================================== */}

          {isBerita && featuredNews && (() => {
            const featuredSlug = featuredNews.slug || generateSlug(featuredNews.title, featuredNews.slug);
            const featuredImageSrc = featuredNews.imageUrl || (featuredNews.gambar ? (typeof featuredNews.gambar === "string" && (featuredNews.gambar.startsWith("http") || featuredNews.gambar.startsWith("/")) ? featuredNews.gambar : getBeritaImage(featuredNews.gambar)) : "");
            const featuredContent = featuredNews.plainContent || (typeof featuredNews.content === "string" ? featuredNews.content : "");
            const featuredDate = formatBeritaDate(featuredNews.tanggal, lang).toUpperCase();

            return (
              <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
                {/* IMAGE */}
                <div className="lg:col-span-6">
                  <Link
                    ref={featuredRef}
                    to={`/berita/${featuredSlug}`}
                    onClick={() => {
                      try {
                        sessionStorage.setItem(
                          BERITA_SESSION_KEY,
                          JSON.stringify({ page: 1, articleId: "featured" })
                        );
                      } catch (_) { /* ignore */ }
                    }}
                    className="block w-full aspect-[4/3] bg-[#E8E6E1] rounded-xs relative overflow-hidden group"
                  >
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
                        duration: 1.5,
                        ease: "easeOut",
                      }}
                      viewport={viewportSettings}
                      className="w-full h-full"
                    >
                      <Img
                        eager
                        src={featuredImageSrc}
                        alt={featuredNews.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 rounded-md"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    </motion.div>
                  </Link>
                </div>

                {/* CONTENT */}
                <div className="lg:col-span-6 space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold tracking-wider text-primary uppercase">
                      {t(halaman.beritaUtama)} · {featuredDate || "OKTOBER 2022"}
                    </span>
                    {featuredIsPinned && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold tracking-wider uppercase bg-primary text-white px-2 py-0.5 rounded-xs">
                        <TbPinFilled className="text-xs" />
                        {t({ id: "DIPIN", en: "PINNED" })}
                      </span>
                    )}
                  </div>

                  <div>
                    <Link
                      to={`/berita/${featuredSlug}`}
                      onClick={() => {
                        try {
                          sessionStorage.setItem(
                            BERITA_SESSION_KEY,
                            JSON.stringify({ page: 1, articleId: "featured" })
                          );
                        } catch (_) { /* ignore */ }
                      }}
                    >
                      <h2 className="font-heading font-normal text-3xl sm:text-4xl text-heading leading-tight hover:text-primary transition-colors">
                        {featuredNews.title}
                      </h2>
                    </Link>
                  </div>

                  <p className="text-sm sm:text-base text-body leading-relaxed pt-1 line-clamp-4">
                    {featuredContent}
                  </p>

                  <div className="pt-2">
                    <Link
                      to={`/berita/${featuredSlug}`}
                      onClick={() => {
                        try {
                          sessionStorage.setItem(
                            BERITA_SESSION_KEY,
                            JSON.stringify({ page: 1, articleId: "featured" })
                          );
                        } catch (_) { /* ignore */ }
                      }}
                      className="inline-flex items-center text-xs font-bold tracking-wider text-primary hover:text-[#680000] uppercase transition-colors group/btn"
                    >
                      <span>{t(halaman.bacaSelengkapnya)}</span>
                      <span className="ml-1.5 transition-transform group-hover/btn:translate-x-1">
                        →
                      </span>
                    </Link>
                  </div>
                </div>
              </section>
            );
          })()}

          {/* =====================================================
              MORE NEWS
          ===================================================== */}

          {isBerita && allOtherNews.length > 0 && (
            <section
              ref={newsSectionRef}
              className="space-y-6 pt-4 scroll-mt-20"
            >
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b-2 border-heading pb-3">
                <h2 className="font-heading font-normal text-3xl sm:text-4xl text-heading tracking-normal">
                  {t(halaman.beritaLainnya)}
                </h2>

                <span className="text-xs text-gray-500 font-medium">
                  {lang === "en" ? (
                    <>
                      Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} -{" "}
                      {Math.min(currentPage * ITEMS_PER_PAGE, allOtherNews.length)}{" "}
                      of {allOtherNews.length} news
                    </>
                  ) : (
                    <>
                      Menampilkan {(currentPage - 1) * ITEMS_PER_PAGE + 1} -{" "}
                      {Math.min(currentPage * ITEMS_PER_PAGE, allOtherNews.length)}{" "}
                      dari {allOtherNews.length} berita
                    </>
                  )}
                </span>
              </div>

              <div className="divide-y divide-gray-200">
                {currentNewsList.map((news) => {
                  const newsSlug = news.slug || generateSlug(news.title, news.slug);
                  const newsTags = Array.isArray(news.tags) ? news.tags.join(", ") : (news.tags || "Berita");
                  const newsDate = formatBeritaDate(news.tanggal, lang);
                  const newsIsPinned = Boolean(news.isPinned || news.pinned);
                  const newsContent = news.plainContent || (typeof news.content === "string" ? news.content : "");

                  return (
                    <article
                      key={news.id}
                      ref={(el) => { if (el) articleRefs.current[news.id] = el; }}
                      className="py-6 sm:py-7 space-y-2 group first:pt-2"
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs text-gray-500">
                          {newsDate || "Oktober 2022"} · {newsTags}
                        </span>
                        {newsIsPinned && (
                          <span className="inline-flex items-center gap-1 text-[9px] font-bold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20 px-1.5 py-0.5 rounded-xs">
                            <TbPinFilled className="text-[9px]" />
                            {t({ id: "DIPIN", en: "PINNED" })}
                          </span>
                        )}
                      </div>

                      <Link
                        to={`/berita/${newsSlug}`}
                        onClick={() => {
                          try {
                            sessionStorage.setItem(
                              BERITA_SESSION_KEY,
                              JSON.stringify({ page: currentPage, articleId: news.id })
                            );
                          } catch (_) { /* ignore */ }
                        }}
                      >
                        <h3 className="font-heading font-semibold text-lg sm:text-xl text-heading leading-snug group-hover:text-primary transition-colors">
                          {news.title}
                        </h3>
                      </Link>

                      <p className="text-sm sm:text-[15px] text-body leading-relaxed max-w-5xl line-clamp-3">
                        {newsContent}
                      </p>
                    </article>
                  );
                })}
              </div>

              {/* PAGINATION */}
              <PaginationBar
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                ui={ui}
              />
            </section>
          )}

          {/* =====================================================
              FEATURED ANNOUNCEMENT (Pengumuman Utama)
          ===================================================== */}

          {!isBerita && featuredPengumuman && (() => {
            const featuredSlug = featuredPengumuman.slug || generateSlug(featuredPengumuman.title, featuredPengumuman.slug);
            const detailUrl = `/pengumuman/${encodeURIComponent(featuredSlug)}`;
            const featuredImageSrc = featuredPengumuman.gambar
              ? typeof featuredPengumuman.gambar === "string" &&
                (featuredPengumuman.gambar.startsWith("http") || featuredPengumuman.gambar.startsWith("/"))
                ? featuredPengumuman.gambar
                : getBeritaImage(featuredPengumuman.gambar)
              : "";
            const featuredContent =
              typeof featuredPengumuman.content === "string"
                ? featuredPengumuman.content
                : featuredPengumuman.plainContent || "";

            return (
              <section aria-label="Pengumuman Utama">
                <div className="border bg-white rounded-xs border-gray-200 border-l-4 border-l-primary p-6 sm:p-8 lg:p-10 shadow-2xs">
                  <div className={`grid grid-cols-1 ${featuredImageSrc ? "lg:grid-cols-12 gap-8 lg:gap-12" : "gap-6"} items-center`}>
                    {featuredImageSrc && (
                      <div className="lg:col-span-5">
                        <Link
                          to={detailUrl}
                          className="block w-full aspect-16/10 sm:aspect-4/3 bg-gray-100 rounded-xs relative overflow-hidden group"
                        >
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
                              duration: 1.5,
                              ease: "easeOut",
                            }}
                            viewport={viewportSettings}
                            className="w-full h-full"
                          >
                            <Img
                              eager
                              src={featuredImageSrc}
                              alt={featuredPengumuman.title}
                              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 rounded-xs"
                            />
                          </motion.div>
                        </Link>
                      </div>
                    )}

                    <div className={featuredImageSrc ? "lg:col-span-7 space-y-4" : "space-y-4"}>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="bg-black/85 text-white text-xs font-semibold px-3 py-1 uppercase tracking-wider rounded-xs">
                          {t({ id: "PENGUMUMAN UTAMA", en: "MAIN ANNOUNCEMENT" })}
                        </span>
                        {featuredPengumumanIsPinned && (
                          <span className="bg-primary text-white text-xs font-semibold px-2.5 py-1 uppercase tracking-wider rounded-xs inline-flex items-center gap-1 shadow-sm">
                            <TbPinFilled className="text-xs" />
                            {t({ id: "DIPIN", en: "PINNED" })}
                          </span>
                        )}
                        {featuredPengumuman.kategori && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-primary bg-red-50 border border-primary/20 px-2 py-0.5 rounded-xs">
                            <FiFileText className="text-[11px]" />
                            {featuredPengumuman.kategori}
                          </span>
                        )}
                        <span className="font-bold text-primary uppercase tracking-wider text-xs tabular-nums">
                          {featuredPengumuman.tanggal}
                        </span>
                        {featuredPengumuman.berlakuHingga && featuredPengumuman.berlakuHingga !== "—" && (
                          <span className="inline-flex items-center gap-1 text-[11px] bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-xs">
                            <FiClock className="text-xs" />
                            {t({ id: "Berlaku s.d.", en: "Valid until" })} {featuredPengumuman.berlakuHingga}
                          </span>
                        )}
                      </div>

                      <div>
                        <Link to={detailUrl}>
                          <h2 className="font-heading font-normal text-2xl sm:text-3xl lg:text-[34px] text-heading leading-snug hover:text-primary transition-colors">
                            {featuredPengumuman.title}
                          </h2>
                        </Link>
                      </div>

                      <p className="text-sm sm:text-base text-body leading-relaxed line-clamp-4">
                        {featuredContent}
                      </p>

                      {Array.isArray(featuredPengumuman.lampiran) && featuredPengumuman.lampiran.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2 pt-1">
                          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            {t({ id: "Lampiran:", en: "Attachments:" })}
                          </span>
                          {featuredPengumuman.lampiran.map((file, idx) => (
                            <a
                              key={idx}
                              href={file.url}
                              download={file.nama}
                              className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline bg-red-50/80 border border-primary/20 px-2.5 py-1 rounded-xs"
                            >
                              <FiDownload className="text-xs" />
                              <span>{file.judul || file.nama}</span>
                              <span className="text-[10px] text-gray-500">({file.ukuran})</span>
                            </a>
                          ))}
                        </div>
                      )}

                      <div className="pt-2">
                        <Link
                          to={detailUrl}
                          className="inline-flex items-center text-xs font-bold tracking-wider text-primary hover:text-[#680000] uppercase transition-colors group/btn"
                        >
                          <span>{t({ id: "BACA PENGUMUMAN LENGKAP", en: "READ FULL ANNOUNCEMENT" })}</span>
                          <span className="ml-1.5 transition-transform group-hover/btn:translate-x-1">&rarr;</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            );
          })()}

          {/* =====================================================
              ANNOUNCEMENTS LIST
          ===================================================== */}

          {!isBerita && (
            <section ref={newsSectionRef} className="space-y-6">
              {/* HEADER */}

              <div className="border-b-2 border-heading pb-3 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                <div>
                  <h2 className="font-heading font-normal text-3xl sm:text-4xl text-heading tracking-normal">
                    {allOtherPengumuman.length > 0
                      ? t({ id: "Daftar Pengumuman Lainnya", en: "Other Announcements" })
                      : t(halaman.judulPengumuman)}
                  </h2>

                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    {t({
                      id: "Pengumuman resmi dan edaran akademik Program Studi Magister Kenotariatan UNISSULA.",
                      en: "Official announcements and academic notices of the UNISSULA Master of Notary Program.",
                    })}
                  </p>
                </div>

                <span className="text-xs font-semibold text-primary uppercase tracking-wider bg-red-50 border border-primary/20 px-3 py-1 rounded-xs w-fit">
                  {allOtherPengumuman.length}{" "}
                  {t({ id: "Pengumuman", en: "Announcements" })}
                </span>
              </div>

              {allOtherPengumuman.length > 0 ? (
                <div className="space-y-6">
                  {currentPengumumanList.map((item) => (
                    <PengumumanCard key={item.id} item={item} />
                  ))}
                </div>
              ) : !featuredPengumuman ? (
                <div className="border border-dashed border-gray-300 bg-white p-10 sm:p-14 text-center rounded-xs">
                  <p className="text-sm font-medium text-gray-500">
                    {t(halaman.pengumumanKosong)}
                  </p>

                  <p className="mt-1.5 text-xs text-gray-400 max-w-md mx-auto leading-relaxed">
                    {t(
                      halaman.pengumumanKosongDetail
                    )}
                  </p>
                </div>
              ) : null}

              {/* PAGINATION FOR PENGUMUMAN */}
              <PaginationBar
                currentPage={currentPage}
                totalPages={totalPengumumanPages}
                onPageChange={handlePageChange}
                ui={ui}
              />
            </section>
          )}
        </div>

        <Footer />
      </main>
    </>
  );
}