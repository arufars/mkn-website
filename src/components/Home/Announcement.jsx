import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

import beritaList from "../../data/berita.json";
import { getBeritaImage } from "../../utils/imageResolver";
import { generateSlug } from "../../utils/slugHelper";
import Img from "../ui/Img";

const viewportSettings = {
  once: true,
  amount: 0.2,
};

export default function Announcement() {
  const announcements = beritaList.filter((item) => item.tags === "Pengumuman");
  const displayList = announcements.length > 0 ? announcements : beritaList;
  const featured = displayList[0];
  const sideArticles = displayList.slice(1, 4);

  return (
    <section className="w-full bg-hero-headingy font-body py-16 sm:py-20 border-b border-gray-200 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
          viewport={viewportSettings}
          className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 border-b border-gray-200 gap-4"
        >
          <div>
            <span className="text-xs font-semibold tracking-wider text-primary uppercase block mb-1.5">
              INFORMASI & EDARAN RESMI
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-[38px] font-heading font-normal text-heading tracking-normal">
              Pengumuman Terbaru
            </h2>
          </div>

          <Link
            to="/berita?kategori=pengumuman"
            className="inline-flex items-center space-x-1 text-xs font-bold tracking-wider text-primary hover:text-[#680000] uppercase transition-colors group pb-1"
          >
            <span>LIHAT SEMUA PENGUMUMAN</span>

            <FiArrowRight className="text-sm transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 pt-10 items-start">

          {/* Main Featured Article */}
          <motion.article
            initial={{
              opacity: 0,
              y: 40,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
            viewport={viewportSettings}
            className="lg:col-span-7 flex flex-col group"
          >
            {/* Featured Announcement Image */}
            {featured.gambar && (
              <Link
                to={`/berita/${generateSlug(featured.title, featured.slug)}`}
                className="overflow-hidden rounded-xs bg-gray-100 border border-gray-200 aspect-16/9 sm:aspect-21/9 relative block"
              >
                <Img
                  src={getBeritaImage(featured.gambar)}
                  alt={featured.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                {featured.kategori && (
                  <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider bg-primary text-white px-2.5 py-0.5 rounded-xs shadow-2xs">
                    {featured.kategori}
                  </span>
                )}
              </Link>
            )}

            {/* Article Content */}
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                ease: "easeOut",
                delay: 0.25,
              }}
              viewport={viewportSettings}
              className="pt-5"
            >
              <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-2">
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
              </div>

              <Link
                to={`/berita/${generateSlug(featured.title, featured.slug)}`}
              >
                <h3 className="font-heading font-normal text-2xl sm:text-3xl text-heading leading-snug group-hover:text-primary transition-colors">
                  {featured.title}
                </h3>
              </Link>

              <p className="mt-3 text-sm sm:text-base text-body leading-relaxed max-w-3xl line-clamp-3">
                {featured.content}
              </p>

              {featured.lampiran && featured.lampiran.length > 0 && (
                <div className="mt-4 pt-3 border-t border-gray-200/60 flex items-center gap-2">
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
                      <span className="text-[10px] text-gray-500">({file.ukuran})</span>
                    </a>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.article>

          {/* Side Articles */}
          <div className="lg:col-span-5 space-y-6 lg:border-l lg:border-gray-200 lg:pl-10">
            {sideArticles.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{
                  opacity: 0,
                  y: 35,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.7,
                  ease: "easeOut",
                  delay: index * 0.12,
                }}
                viewport={viewportSettings}
                className="space-y-2 group pb-6 border-b border-gray-100 last:border-b-0 last:pb-0"
              >
                <div className="flex items-center gap-2">
                  {article.kategori && (
                    <span className="text-[10px] font-bold tracking-wider text-primary uppercase bg-red-50 border border-primary/20 px-2 py-0.5 rounded-xs">
                      {article.kategori}
                    </span>
                  )}
                  <span className="text-xs text-gray-400">
                    {article.tanggal}
                  </span>
                </div>

                <Link
                  to={`/berita/${generateSlug(article.title, article.slug)}`}
                >
                  <h4 className="font-heading font-normal text-lg text-heading leading-snug group-hover:text-primary transition-colors cursor-pointer">
                    {article.title}
                  </h4>
                </Link>

                <p className="text-sm text-body leading-relaxed line-clamp-2">
                  {article.content}
                </p>

                {article.lampiran && article.lampiran.length > 0 && (
                  <div className="text-[11px] text-primary font-medium flex items-center gap-1 pt-1">
                    <span>&bull;</span>
                    <span>Tersedia lampiran ({article.lampiran[0].ukuran})</span>
                  </div>
                )}
              </motion.article>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}