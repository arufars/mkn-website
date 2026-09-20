import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { TbPinFilled } from "react-icons/tb";
import { getStrapiMediaUrl, formatTanggal } from "../utils/strapiFormatters";
import StrapiArticleBlocks from "./StrapiArticleBlocks";

/**
 * Komponen Kartu Berita Utama (Featured Hero)
 */
export default function BeritaV2Featured({ article, t }) {
  if (!article) return null;

  const slugOrId = article.slug || article.documentId || article.id;
  const detailUrl = `/berita-v2/${slugOrId}`;
  const imageUrl = getStrapiMediaUrl(article.gambar);

  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
      {/* GAMBAR */}
      <div className="lg:col-span-6">
        <Link
          to={detailUrl}
          className="block w-full aspect-[4/3] bg-[#E8E6E1] rounded-xs relative overflow-hidden group cursor-pointer"
        >
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
            className="w-full h-full"
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={article.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 rounded-md"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 text-sm">
                {t ? t({ id: "Tidak ada gambar", en: "No image" }) : "Tidak ada gambar"}
              </div>
            )}
          </motion.div>
        </Link>
      </div>

      {/* KONTEN */}
      <div className="lg:col-span-6 space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold tracking-wider text-primary uppercase">
            {t ? t({ id: "BERITA UTAMA", en: "FEATURED NEWS" }) : "BERITA UTAMA"} ·{" "}
            {formatTanggal(article.tanggal || article.createdAt).toUpperCase()}
          </span>

          {article.isPinned && (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold tracking-wider uppercase bg-primary text-white px-2 py-0.5 rounded-xs">
              <TbPinFilled className="text-xs" />
              {t ? t({ id: "DIPIN", en: "PINNED" }) : "DIPIN"}
            </span>
          )}

          {Array.isArray(article.tags) &&
            article.tags.map((tag) => (
              <span
                key={tag.id || tag.nama}
                className="text-[11px] font-medium text-gray-500 uppercase tracking-wider"
              >
                #{tag.nama}
              </span>
            ))}
        </div>

        <div>
          <Link to={detailUrl} className="block group">
            <h2 className="font-heading font-normal text-3xl sm:text-4xl text-heading leading-tight group-hover:text-primary transition-colors">
              {article.title}
            </h2>
          </Link>
        </div>

        {/* Cuplikan Rich Text Blocks */}
        <div className="text-sm sm:text-base text-body leading-relaxed pt-1 line-clamp-4 overflow-hidden max-h-28">
          <StrapiArticleBlocks content={article.content} />
        </div>

        <div className="pt-2">
          <Link
            to={detailUrl}
            className="inline-flex items-center text-xs font-bold tracking-wider text-primary hover:text-[#680000] uppercase transition-colors group/btn cursor-pointer"
          >
            <span>
              {t ? t({ id: "BACA SELENGKAPNYA", en: "READ MORE" }) : "BACA SELENGKAPNYA"}
            </span>
            <span className="ml-1.5 transition-transform group-hover/btn:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
