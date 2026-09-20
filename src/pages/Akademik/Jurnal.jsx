import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { FiArrowUpRight, FiAward } from "react-icons/fi";

import { useT } from "../../i18n/languageContext";
import { useUi } from "../../i18n/useUi";
import Img from "../../components/ui/Img";
import { halaman, jurnalData } from "../../data/akademik/jurnalData";

const viewportSettings = {
  once: true,
  amount: 0.2,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const headerItemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

/**
 * Penanda status jurnal: peringkat SINTA atau label "Jurnal Nasional" beserta
 * SK/E-ISSN-nya, atau catatan peruntukan (mis. "Khusus Wisuda") bila tidak ada.
 * Keduanya dibedakan warnanya supaya status resmi jurnal langsung terbaca.
 */
function BadgeStatus({ akreditasi, catatan }) {
  const t = useT();

  if (akreditasi) {
    return (
      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
        <span className="inline-flex items-center gap-1.5 bg-primary text-white text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-xs">
          <FiAward className="text-xs" />
          {akreditasi.peringkat}
        </span>
        <span className="text-[11px] text-gray-500 leading-snug">
          {akreditasi.sk}
        </span>
      </div>
    );
  }

  if (!catatan) return null;

  return (
    <span className="inline-flex items-center bg-gray-100 border border-gray-200 text-gray-600 text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-xs">
      {t(catatan)}
    </span>
  );
}

function KartuJurnal({ item }) {
  const t = useT();

  return (
    <motion.article
      variants={cardVariants}
      className="bg-white border border-gray-200 rounded-xs shadow-2xs flex flex-col sm:flex-row overflow-hidden hover:border-gray-300 transition-colors"
    >
      {/* Sampul di sisi kiri. Rasio tiap sampul berbeda — ada yang datar, ada
          yang mockup buku — jadi lebar kolomnya yang dikunci dan gambarnya
          object-contain, supaya tidak ada bagian yang terpotong. */}
      <div className="sm:w-52 lg:w-60 shrink-0 bg-neutral-50 border-b sm:border-b-0 sm:border-r border-gray-200 flex items-center justify-center p-5">
        <Img
          src={item.sampul}
          alt={item.nama}
          className="w-auto max-w-full max-h-56 sm:max-h-64 object-contain"
        />
      </div>

      <div className="p-6 sm:p-7 flex flex-col flex-1 gap-4">
        <BadgeStatus akreditasi={item.akreditasi} catatan={item.catatan} />

        <h2 className="font-heading font-bold text-lg sm:text-xl text-heading leading-snug">
          {item.nama}
        </h2>

        <div className="pt-1">
          <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-primary block mb-2.5">
            {t(halaman.labelScope)}
          </span>

          <ul className="space-y-1.5">
            {item.scope.map((bidang) => (
              <li
                key={bidang.id}
                className="flex gap-2.5 text-sm text-body leading-snug"
              >
                <span aria-hidden="true" className="text-primary shrink-0">
                  &bull;
                </span>
                <span>{t(bidang)}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* mt-auto: tombol menempel ke dasar kartu, sehingga barisnya tetap
            sejajar walau panjang deskripsi antarjurnal berbeda. */}
        <div className="mt-auto pt-4">
          {item.link ? (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase text-primary"
            >
              <span>{t(halaman.labelBuka)}</span>
              <FiArrowUpRight className="text-sm transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase text-gray-400 cursor-not-allowed select-none">
              {t(halaman.belumTersedia)}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function Jurnal() {
  const t = useT();
  const ui = useUi();

  return (
    <>
      <Helmet>
        <title>{t(halaman.meta.title)}</title>
        {halaman.meta.description && (
          <meta name="description" content={t(halaman.meta.description)} />
        )}
      </Helmet>

      <div className="space-y-10">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
        >
          <motion.span
            variants={headerItemVariants}
            className="text-xs font-bold tracking-[0.16em] uppercase text-primary block"
          >
            {ui("sectionAcademic")}
          </motion.span>

          <motion.h1
            variants={headerItemVariants}
            className="text-3xl sm:text-4xl lg:text-[40px] font-heading font-bold text-heading tracking-tight leading-tight"
          >
            {t(halaman.judul)}
          </motion.h1>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
            viewport={viewportSettings}
            className="h-[2px] bg-primary mt-4 mb-5"
          />
        </motion.div>

        {/* Daftar Jurnal */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          className="flex flex-col gap-5"
        >
          {jurnalData.map((item) => (
            <KartuJurnal key={item.id} item={item} />
          ))}
        </motion.div>
      </div>
    </>
  );
}
