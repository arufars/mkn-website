import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { TbPinFilled } from "react-icons/tb";

import {
  berita,
  pengumuman,
  getPinnedBerita,
  getPinnedPengumuman,
} from "../../data/beritaSelectors";
import { getHybridPengumumanList } from "../../services/pengumumanService";
import { getBeritaImage } from "../../utils/imageResolver";
import { generateSlug } from "../../utils/slugHelper";
import Img from "../ui/Img";
import { useUi } from "../../i18n/useUi";
import { useLanguage } from "../../i18n/languageContext";

const viewportSettings = {
  once: true,
  amount: 0.2,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    x: -30,
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

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

export default function Announcement() {
  const ui = useUi();
  const { lang } = useLanguage();
  const [hybridPengumuman, setHybridPengumuman] = useState(pengumuman);

  useEffect(() => {
    let isMounted = true;
    getHybridPengumumanList({ locale: lang })
      .then((items) => {
        if (isMounted && Array.isArray(items) && items.length > 0) {
          setHybridPengumuman(items);
        }
      })
      .catch((err) => {
        console.warn("[Announcement] Fallback to local pengumuman:", err);
      });

    return () => {
      isMounted = false;
    };
  }, [lang]);

  // Bila belum ada pengumuman, section ini fallback ke berita agar tidak kosong.
  const displayList = hybridPengumuman.length > 0 ? hybridPengumuman : berita;
  const isAnnouncement = hybridPengumuman.length > 0;

  const pinnedFeatured =
    hybridPengumuman.length > 0
      ? hybridPengumuman.find((x) => x.isPinned || x.pinned) ?? hybridPengumuman[0]
      : getPinnedBerita() ?? berita[0];

  const featured = pinnedFeatured;
  const featuredIsPinned = Boolean(featured?.isPinned || featured?.pinned);

  // Sisi kanan: 3 item berikutnya dari daftar (kecuali featured)
  const sideArticles = displayList
    .filter((item) => item !== featured)
    .slice(0, 3);

  // Tidak semua pengumuman menyertakan flyer
  const hasFlyer = Boolean(featured?.gambar);

  const resolveImage = (gambar) => {
    if (!gambar) return "";
    if (typeof gambar === "string" && (gambar.startsWith("http") || gambar.startsWith("/"))) {
      return gambar;
    }
    return getBeritaImage(gambar);
  };

  const getArticleUrl = (item) => {
    if (!item) return "/berita?kategori=pengumuman";
    const slug = item.slug || generateSlug(item.title, item.slug);
    return isAnnouncement
      ? `/pengumuman/${encodeURIComponent(slug)}`
      : `/berita/${encodeURIComponent(slug)}`;
  };

  return (
    <section className="w-full bg-hero-headingy font-body py-16 sm:py-20 border-b border-gray-200 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 border-b border-gray-200 gap-4"
        >
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl sm:text-4xl md:text-[38px] font-heading font-normal text-heading tracking-normal">
              {ui("latestAnnouncements")}
            </h2>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Link
              to="/berita?kategori=pengumuman"
              className="inline-flex items-center space-x-1 text-xs font-bold tracking-wider text-primary hover:text-[#680000] uppercase transition-colors group pb-1"
            >
              <span>{ui("viewAllAnnouncements")}</span>

              <FiArrowRight className="text-sm transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Content Grid — sengaja items-stretch (bukan items-start) supaya
            kolom kiri bisa mengisi setinggi daftar di kolom kanan */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 pt-10 items-stretch">

          {/* Main Featured Article */}
          <motion.article
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            className="lg:col-span-7 flex flex-col h-full group"
          >
            {/* Featured Announcement Image */}
            {hasFlyer && (
              <Link
                to={getArticleUrl(featured)}
                className="overflow-hidden rounded-xs bg-gray-100 border border-gray-200 aspect-16/9 sm:aspect-21/9 relative block"
              >
                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 1.08,
                    filter: "grayscale(100%) blur(3px)",
                  }}
                  whileInView={{
                    opacity: 1,
                    scale: 1,
                    filter: "grayscale(0%) blur(0px)",
                  }}
                  transition={{
                    duration: 1.5,
                    ease: "easeOut",
                    delay: 0.1,
                  }}
                  viewport={viewportSettings}
                  className="w-full h-full"
                >
                  <Img
                    src={resolveImage(featured.gambar)}
                    alt={featured.title}
                    className="
                      w-full
                      h-full
                      object-cover
                      object-center
                      group-hover:scale-105
                      transition-transform
                      duration-700
                      ease-out
                    "
                  />
                </motion.div>

                {featured.kategori && (
                  <motion.span
                    initial={{
                      opacity: 0,
                      y: -10,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.6,
                      ease: "easeOut",
                      delay: 0.7,
                    }}
                    viewport={viewportSettings}
                    className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider bg-primary text-white px-2.5 py-0.5 rounded-xs shadow-2xs"
                  >
                    {featured.kategori}
                  </motion.span>
                )}
              </Link>
            )}

            {/* Article Content */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={viewportSettings}
              /* Tanpa flyer, blok isi mengambil sisa tinggi kolom (flex-1) dan
                 diberi bingkai + pita aksen, sehingga ruang kosongnya terbaca
                 sebagai padding kartu, bukan gap yang menggantung. */
              className={
                hasFlyer
                  ? "pt-5"
                  : "flex-1 flex flex-col bg-white border border-gray-200 rounded-xs border-l-3 border-l-primary p-6 sm:p-8"
              }
            >
              {/* Metadata — tanpa flyer, badge kategori tidak punya tempat
                  menempel, jadi ikut ke baris ini seperti kartu di kolom kanan */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-2"
              >
                {featuredIsPinned && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold tracking-wider uppercase bg-primary text-white px-2 py-0.5 rounded-xs">
                    <TbPinFilled className="text-[10px]" />
                    DIPIN
                  </span>
                )}

                {!hasFlyer && featured.kategori && (
                  <span className="text-[10px] font-bold tracking-wider text-primary uppercase bg-red-50 border border-primary/20 px-2 py-0.5 rounded-xs">
                    {featured.kategori}
                  </span>
                )}

                <span className="font-bold text-primary uppercase tracking-wider tabular-nums">
                  {featured.tanggal}
                </span>

                {featured.berlakuHingga && featured.berlakuHingga !== "—" && (
                  <>
                    <span className="text-gray-300">&bull;</span>

                    <span className="text-amber-800 bg-amber-50 px-2 py-0.5 rounded text-[11px]">
                      Berlaku s.d. {featured.berlakuHingga}
                    </span>
                  </>
                )}
              </motion.div>

              {/* Judul */}
              <motion.div variants={itemVariants}>
                <Link
                  to={getArticleUrl(featured)}
                >
                  <h3 className="font-heading font-normal text-2xl sm:text-3xl text-heading leading-snug group-hover:text-primary transition-colors">
                    {featured.title}
                  </h3>
                </Link>
              </motion.div>

              {/* Ringkasan */}
              <motion.p
                variants={itemVariants}
                className={`mt-3 text-sm sm:text-base text-body leading-relaxed max-w-3xl ${
                  hasFlyer ? "line-clamp-3" : "line-clamp-6"
                }`}
              >
                {typeof featured.content === "string"
                  ? featured.content
                  : featured.plainContent || ""}
              </motion.p>

              {/* Lampiran */}
              {featured.lampiran && featured.lampiran.length > 0 && (
                <motion.div
                  variants={itemVariants}
                  className={`border-t border-gray-200/60 flex flex-wrap items-center gap-x-2 gap-y-1 ${
                    hasFlyer ? "mt-4 pt-3" : "mt-auto pt-6"
                  }`}
                >
                  <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    Lampiran Tersedia:
                  </span>

                  {featured.lampiran.map((file, idx) => (
                    <a
                      key={idx}
                      href={file.url}
                      download={file.nama}
                      className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1"
                    >
                      <span>{file.judul || file.nama}</span>

                      <span className="text-[10px] text-gray-500">
                        ({file.ukuran})
                      </span>
                    </a>
                  ))}
                </motion.div>
              )}
            </motion.div>
          </motion.article>

          {/* Side Articles */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            className="lg:col-span-5 space-y-6 lg:border-l lg:border-gray-200 lg:pl-10"
          >
            {sideArticles.map((article) => (
              <motion.article
                key={article.id}
                variants={itemVariants}
                className="space-y-2 group pb-6 border-b border-gray-100 last:border-b-0 last:pb-0"
              >
                {/* Category + Date */}
                <motion.div
                  variants={itemVariants}
                  className="flex items-center gap-2"
                >
                  {article.kategori && (
                    <span className="text-[10px] font-bold tracking-wider text-primary uppercase bg-red-50 border border-primary/20 px-2 py-0.5 rounded-xs">
                      {article.kategori}
                    </span>
                  )}

                  <span className="text-xs text-gray-400">
                    {article.tanggal}
                  </span>
                </motion.div>

                {/* Title */}
                <motion.div variants={itemVariants}>
                  <Link
                    to={getArticleUrl(article)}
                  >
                    <h4 className="font-heading font-normal text-lg text-heading leading-snug group-hover:text-primary transition-colors cursor-pointer">
                      {article.title}
                    </h4>
                  </Link>
                </motion.div>

                {/* Description */}
                <motion.p
                  variants={itemVariants}
                  className="text-sm text-body leading-relaxed line-clamp-2"
                >
                  {typeof article.content === "string"
                    ? article.content
                    : article.plainContent || ""}
                </motion.p>

                {/* Attachment */}
                {article.lampiran &&
                  article.lampiran.length > 0 && (
                    <motion.div
                      variants={itemVariants}
                      className="text-[11px] text-primary font-medium flex items-center gap-1 pt-1"
                    >
                      <span>&bull;</span>
                      <span>
                        Tersedia lampiran (
                        {article.lampiran[0].ukuran})
                      </span>
                    </motion.div>
                  )}
              </motion.article>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}