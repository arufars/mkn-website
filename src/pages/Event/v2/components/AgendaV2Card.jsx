import { Link } from "react-router-dom";
import { FiCalendar, FiMapPin } from "react-icons/fi";
import { TbPinFilled } from "react-icons/tb";
import { getStrapiImageUrl, formatAgendaDate } from "../utils/agendaFormatters";

/**
 * Kartu agenda untuk tampilan grid di halaman list
 */
export default function AgendaV2Card({ agenda, t, lang = "id" }) {
  if (!agenda) return null;

  const slugOrId = agenda.slug || agenda.documentId || agenda.id;
  const detailUrl = `/event-v2/${slugOrId}`;
  const imageUrl = getStrapiImageUrl(agenda.image);
  const categoryName =
    typeof agenda.category === "string"
      ? agenda.category
      : agenda.category?.name || agenda.category?.nama || null;

  return (
    <article className="group bg-white border border-gray-200 rounded-xs overflow-hidden flex flex-col hover:border-primary/50 hover:shadow-md transition-all duration-300">
      {/* GAMBAR */}
      <Link to={detailUrl} className="block aspect-[16/10] bg-gray-100 overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={agenda.title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
            {t ? t({ id: "Tidak ada gambar", en: "No image" }) : "Tidak ada gambar"}
          </div>
        )}
      </Link>

      {/* KONTEN */}
      <div className="p-5 flex-grow flex flex-col justify-between space-y-3">
        <div className="space-y-2">
          {/* Kategori & Pin */}
          <div className="flex flex-wrap items-center gap-1.5">
            {categoryName && (
              <span className="text-[10px] font-bold tracking-wider uppercase text-primary">
                {categoryName}
              </span>
            )}
            {(agenda.pinned || agenda.isFeatured) && (
              <span className="inline-flex items-center gap-0.5 text-[9px] font-bold uppercase bg-primary/10 text-primary border border-primary/20 px-1.5 py-0.5 rounded-xs">
                <TbPinFilled className="text-[9px]" />
                {t ? t({ id: "DIPIN", en: "PINNED" }) : "DIPIN"}
              </span>
            )}
          </div>

          {/* Judul */}
          <Link to={detailUrl} className="block">
            <h3 className="font-heading font-semibold text-base sm:text-lg text-heading leading-snug group-hover:text-primary transition-colors line-clamp-2">
              {agenda.title}
            </h3>
          </Link>

          {/* Meta */}
          <div className="space-y-1 text-xs text-gray-500">
            {agenda.date && (
              <div className="flex items-center gap-1.5">
                <FiCalendar className="text-primary shrink-0" />
                <span>
                  {formatAgendaDate(agenda.date, lang)}
                  {agenda.time && ` · ${agenda.time}`}
                </span>
              </div>
            )}
            {agenda.venue && (
              <div className="flex items-center gap-1.5">
                <FiMapPin className="text-primary shrink-0" />
                <span className="line-clamp-1">{agenda.venue}</span>
              </div>
            )}
          </div>

          {/* Deskripsi singkat */}
          {agenda.description && (
            <p className="text-xs text-body leading-relaxed line-clamp-2 pt-1">
              {agenda.description}
            </p>
          )}
        </div>

        {/* CTA */}
        <Link
          to={detailUrl}
          className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:gap-1.5 transition-all uppercase tracking-wider"
        >
          {t ? t({ id: "Lihat Detail →", en: "View Details →" }) : "Lihat Detail →"}
        </Link>
      </div>
    </article>
  );
}
