import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

import { berita } from "../../data/beritaSelectors";
import { getHybridBeritaList } from "../../services/beritaService";
import { formatBeritaDate } from "../../utils/beritaFormatters";
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

export default function AcademicFocus() {
  const ui = useUi();
  const { lang } = useLanguage();
  const [items, setItems] = useState(berita);

  useEffect(() => {
    let isMounted = true;
    getHybridBeritaList({ locale: lang })
      .then((data) => {
        if (isMounted && Array.isArray(data) && data.length > 0) {
          setItems(data);
        }
      })
      .catch((err) => {
        console.warn("[AcademicFocus] Fallback to local berita:", err);
      });

    return () => {
      isMounted = false;
    };
  }, [lang]);

  const featured = items[0] || berita[0];
  const sideArticles = items.slice(1, 4);

  const featuredSlug = featured?.slug || generateSlug(featured?.title, featured?.slug);
  const featuredImg = featured?.imageUrl || (featured?.gambar ? (typeof featured.gambar === "string" && (featured.gambar.startsWith("http") || featured.gambar.startsWith("/")) ? featured.gambar : getBeritaImage(featured.gambar)) : "");
  const featuredContent = featured?.plainContent || (typeof featured?.content === "string" ? featured?.content : "");
  const featuredDate = formatBeritaDate(featured?.tanggal, lang);

  return (
    <section className="w-full bg-hero-heading font-body py-16 sm:py-20 border-b border-gray-200 overflow-hidden">
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
              {ui("latestNews")}
            </h2>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Link
              to="/berita"
              className="inline-flex items-center space-x-1 text-xs font-bold tracking-wider text-primary hover:text-[#680000] uppercase transition-colors group pb-1"
            >
              <span>{ui("viewAllNews")}</span>

              <FiArrowRight className="text-sm transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 pt-10 items-start">

          {/* Main Featured Article */}
          <motion.article
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            className="lg:col-span-8 flex flex-col group"
          >
            {/* Image */}
            <Link
              to={`/berita/${featuredSlug}`}
              className="relative w-full aspect-[16/9] sm:aspect-[16/8.5] bg-gray-100 overflow-hidden block"
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
                  src={featuredImg}
                  alt={featured.title}
                  className="
                    w-full
                    h-full
                    object-cover
                    object-center
                    transition-transform
                    duration-700
                    ease-out
                    group-hover:scale-105
                    rounded-md
                  "
                />
              </motion.div>

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
                className="absolute top-4 left-4 bg-black/85 text-white text-xs font-semibold px-3 py-1.5 uppercase tracking-wider"
              >
                BERITA UTAMA
              </motion.span>
            </Link>

            {/* Article Content */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={viewportSettings}
              className="pt-6"
            >
              <motion.div variants={itemVariants}>
                <Link
                  to={`/berita/${featuredSlug}`}
                >
                  <h3 className="font-heading font-normal text-2xl sm:text-3xl lg:text-3xl text-heading leading-snug group-hover:text-primary transition-colors">
                    {featured.title}
                  </h3>
                </Link>
              </motion.div>

              <motion.p
                variants={itemVariants}
                className="mt-3.5 text-sm sm:text-base text-body leading-relaxed max-w-3xl line-clamp-3"
              >
                {featuredContent}
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="mt-4 pt-1"
              >
                <span className="text-xs font-medium tracking-widest text-gray-400 uppercase">
                  {featured.author || "admkn"} &nbsp;|&nbsp; {featuredDate}
                </span>
              </motion.div>
            </motion.div>
          </motion.article>

          {/* Side Articles */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            className="lg:col-span-4 space-y-7 lg:border-l lg:border-gray-200 lg:pl-10"
          >
            {sideArticles.map((article) => {
              const artSlug = article.slug || generateSlug(article.title, article.slug);
              const artContent = article.plainContent || (typeof article.content === "string" ? article.content : "");
              const artDate = formatBeritaDate(article.tanggal, lang);
              const artTag = Array.isArray(article.tags) ? article.tags[0] : (article.tags || "BERITA");

              return (
                <motion.article
                  key={article.id}
                  variants={itemVariants}
                  className="space-y-2 group pb-7 border-b border-gray-100 last:border-b-0 last:pb-0"
                >
                  <motion.span
                    variants={itemVariants}
                    className="text-xs font-bold tracking-wider text-primary uppercase block"
                  >
                    {artTag}
                  </motion.span>

                  <motion.div variants={itemVariants}>
                    <Link to={`/berita/${artSlug}`}>
                      <h4 className="font-heading font-normal text-lg text-heading leading-snug group-hover:text-primary transition-colors cursor-pointer">
                        {article.title}
                      </h4>
                    </Link>
                  </motion.div>

                  <motion.p
                    variants={itemVariants}
                    className="text-sm text-body leading-relaxed line-clamp-2"
                  >
                    {artContent}
                  </motion.p>

                  <motion.span
                    variants={itemVariants}
                    className="text-xs font-medium tracking-wider text-gray-400 uppercase block pt-1"
                  >
                    {artDate}
                  </motion.span>
                </motion.article>
              );
            })}
          </motion.div>

        </div>
      </div>
    </section>
  );
}