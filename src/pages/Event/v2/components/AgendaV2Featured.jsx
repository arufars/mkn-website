import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiCalendar, FiMapPin, FiUser } from "react-icons/fi";
import { TbPinFilled } from "react-icons/tb";
import { getStrapiImageUrl, formatAgendaDate } from "../utils/agendaFormatters";

/**
 * Kartu Hero / Featured untuk agenda utama di bagian atas halaman
 */
export default function AgendaV2Featured({ agenda, t, lang = "id" }) {
  if (!agenda) return null;

  const slugOrId = agenda.slug || agenda.documentId || agenda.id;
  const detailUrl = `/event-v2/${slugOrId}`;
  const imageUrl = getStrapiImageUrl(agenda.image);
  const categoryName =
    typeof agenda.category === "string"
      ? agenda.category
      : agenda.category?.name || agenda.category?.nama || null;

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
                alt={agenda.title}
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
            {t
              ? t({ id: "AGENDA UTAMA", en: "FEATURED EVENT" })
              : "AGENDA UTAMA"}
          </span>

          {(agenda.pinned || agenda.isFeatured) && (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold tracking-wider uppercase bg-primary text-white px-2 py-0.5 rounded-xs">
              <TbPinFilled className="text-xs" />
              {t ? t({ id: "DIPIN", en: "PINNED" }) : "DIPIN"}
            </span>
          )}

          {categoryName && (
            <span className="text-[11px] font-medium text-gray-500 uppercase tracking-wider">
              #{categoryName}
            </span>
          )}
        </div>

        <div>
          <Link to={detailUrl} className="block group">
            <h2 className="font-heading font-normal text-3xl sm:text-4xl text-heading leading-tight group-hover:text-primary transition-colors">
              {agenda.title}
            </h2>
          </Link>
        </div>

        {/* Meta info */}
        <div className="space-y-2 text-sm text-body">
          {agenda.date && (
            <div className="flex items-center gap-2">
              <FiCalendar className="text-primary shrink-0" />
              <span>
                {formatAgendaDate(agenda.date, lang)}
                {agenda.time && ` · ${agenda.time}`}
              </span>
            </div>
          )}
          {agenda.venue && (
            <div className="flex items-center gap-2">
              <FiMapPin className="text-primary shrink-0" />
              <span>{agenda.venue}</span>
            </div>
          )}
          {agenda.organizer && (
            <div className="flex items-center gap-2">
              <FiUser className="text-primary shrink-0" />
              <span>{agenda.organizer}</span>
            </div>
          )}
        </div>

        {/* Deskripsi singkat */}
        {(agenda.description) && (
          <p className="text-sm sm:text-base text-body leading-relaxed line-clamp-3">
            {agenda.description}
          </p>
        )}

        <div className="pt-2">
          <Link
            to={detailUrl}
            className="inline-flex items-center text-xs font-bold tracking-wider text-primary hover:text-[#680000] uppercase transition-colors group/btn cursor-pointer"
          >
            <span>
              {t
                ? t({ id: "LIHAT DETAIL", en: "VIEW DETAILS" })
                : "LIHAT DETAIL"}
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
