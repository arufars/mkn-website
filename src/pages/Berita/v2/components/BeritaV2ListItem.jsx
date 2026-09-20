import { Link } from "react-router-dom";
import { TbPinFilled } from "react-icons/tb";
import { formatTanggal } from "../utils/strapiFormatters";
import StrapiArticleBlocks from "./StrapiArticleBlocks";
import { useT } from "../../../../i18n/languageContext";

/**
 * Komponen Baris Berita (List Item) untuk daftar berita lainnya
 */
export default function BeritaV2ListItem({ news }) {
  const t = useT();
  const slugOrId = news.slug || news.documentId || news.id;
  const detailUrl = `/berita-v2/${slugOrId}`;
  console.log(news);

  const tagList = Array.isArray(news.tags) && news.tags.length > 0
    ? news.tags.map((t) => t.nama).join(", ")
    : "Berita";

  return (
    <article className="py-6 sm:py-7 space-y-2 group first:pt-2">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-gray-500">
          {formatTanggal(news.tanggal || news.createdAt)} · {tagList}
        </span>

        {news.isPinned && (
          <span className="inline-flex items-center gap-1 text-[9px] font-bold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20 px-1.5 py-0.5 rounded-xs">
            <TbPinFilled className="text-[9px]" />
            {t({ id: "DIPIN", en: "PINNED" })}
          </span>
        )}
      </div>

      <div>
        <Link to={detailUrl} className="block">
          <h3 className="font-heading font-semibold text-lg sm:text-xl text-heading leading-snug group-hover:text-primary transition-colors">
            {news.title}
          </h3>
        </Link>
      </div>

      <div className="text-sm text-body/90 line-clamp-2 max-h-16 overflow-hidden">
        <StrapiArticleBlocks content={news.content} />
      </div>

      <div className="pt-1">
        <Link
          to={detailUrl}
          className="inline-flex items-center text-xs font-bold tracking-wider text-primary hover:text-[#680000] uppercase transition-colors group/btn cursor-pointer"
        >
          <span>{t({ id: "BACA SELENGKAPNYA", en: "READ MORE" })}</span>
          <span className="ml-1.5 transition-transform group-hover/btn:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </article>
  );
}
