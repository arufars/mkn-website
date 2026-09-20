import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiClock, FiDownload, FiFileText, FiPaperclip } from "react-icons/fi";
import { useT, useLanguage } from "../../../../i18n/languageContext";
import {
  formatPengumumanDate,
  formatBerlakuHingga,
} from "../utils/pengumumanFormatters";

const viewportSettings = { once: true, amount: 0.15 };

/**
 * Kartu Pengumuman V2
 * Desain persis seperti PengumumanCard pada /berita?kategori=pengumuman
 */
export default function PengumumanV2Card({ item, basePath = "/pengumuman-v2" }) {
  const t = useT();
  const { lang } = useLanguage();

  const itemImage = item.gambar || "";
  const detailUrl = `${basePath}/${encodeURIComponent(item.slug)}`;
  const lampiran = Array.isArray(item.lampiran) ? item.lampiran : [];

  return (
    <motion.article
      whileHover={{ y: -3 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group bg-white border border-gray-200 rounded-xs overflow-hidden hover:border-primary/40 hover:shadow-xs transition-all flex flex-col md:flex-row"
    >
      {itemImage ? (
        /* Varian bergambar: kolom flyer di kiri */
        <Link
          to={detailUrl}
          tabIndex={-1}
          aria-hidden="true"
          className="relative shrink-0 overflow-hidden bg-gray-100 border-b md:border-b-0 md:border-r border-gray-200 h-48 sm:h-56 md:h-auto md:w-64 lg:w-72 block"
        >
          <motion.div
            initial={{ opacity: 0, scale: 1.08 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={viewportSettings}
            className="absolute inset-0"
          >
            <img
              src={itemImage}
              alt=""
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
          </motion.div>
        </Link>
      ) : (
        /* Varian tanpa gambar: pita aksen merah di tepi kiri */
        <div
          aria-hidden="true"
          className="shrink-0 bg-primary h-1 w-full md:h-auto md:w-1.5"
        />
      )}

      {/* Konten & Lampiran Pengumuman */}
      <div className="p-5 sm:p-6 lg:p-7 flex-grow min-w-0 flex flex-col justify-between gap-4">
        <div className="space-y-3">
          {/* Metadata bar */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-gray-500">
            {item.kategori && (
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-primary bg-red-50 border border-primary/20 px-2 py-0.5 rounded-xs">
                <FiFileText className="text-[11px]" />
                {item.kategori}
              </span>
            )}
            <span className="font-bold text-primary uppercase tracking-wider tabular-nums">
              {formatPengumumanDate(item.tanggal, lang)}
            </span>
            {item.berlakuHingga && (
              <>
                <span className="text-gray-300">&bull;</span>
                <span className="inline-flex items-center gap-1 text-[11px] bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-xs">
                  <FiClock className="text-xs" />
                  {t({ id: "Berlaku s.d.", en: "Valid until" })}{" "}
                  {formatBerlakuHingga(item.berlakuHingga, lang)}
                </span>
              </>
            )}
          </div>

          {/* Judul Pengumuman */}
          <h3 className="font-heading text-xl sm:text-2xl text-heading font-normal leading-snug group-hover:text-primary transition-colors">
            <Link to={detailUrl}>{item.title}</Link>
          </h3>

          {/* Ringkasan Konten */}
          {item.plainContent && (
            <p
              className={`text-sm text-body/80 leading-relaxed ${
                itemImage
                  ? "line-clamp-2 sm:line-clamp-3"
                  : "line-clamp-3 sm:line-clamp-4"
              }`}
            >
              {item.plainContent}
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
