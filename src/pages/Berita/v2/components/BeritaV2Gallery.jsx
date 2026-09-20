import { motion } from "framer-motion";
import { getStrapiMediaUrl } from "../utils/strapiFormatters";

/**
 * Komponen Galeri dan Dokumentasi Foto Kegiatan dari Strapi
 */
export default function BeritaV2Gallery({ items }) {
  if (!Array.isArray(items) || items.length === 0) {
    return null;
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
      className="pt-6 border-t border-gray-200 space-y-4"
    >
      <h3 className="font-heading font-semibold text-lg sm:text-xl text-heading">
        Dokumentasi & Galeri Kegiatan
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item, idx) => {
          const media = item.foto || item.gambar || item.media || item.image;
          const imageUrl = getStrapiMediaUrl(media);

          return (
            <div
              key={item.id || idx}
              className="border border-gray-200 bg-white rounded-xs overflow-hidden flex flex-col"
            >
              {imageUrl ? (
                <div className="overflow-hidden bg-gray-100">
                  <img
                    src={imageUrl}
                    alt={item.keterangan || `Foto dokumentasi ${idx + 1}`}
                    className="w-full aspect-4/3 object-cover object-center hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ) : (
                <div className="w-full aspect-4/3 bg-gray-100 flex items-center justify-center text-xs text-gray-400">
                  Tidak ada foto
                </div>
              )}

              {item.keterangan && (
                <p className="p-3 text-xs text-gray-600 leading-relaxed border-t border-gray-100 flex-grow bg-gray-50/50">
                  {item.keterangan}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </motion.section>
  );
}
