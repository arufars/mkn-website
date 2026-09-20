import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Breadcrumb from "../../components/ui/Breadcrumb";
import GaleriGeser from "../../components/ui/GaleriGeser";
import { useT, useLanguage } from "../../i18n/languageContext";

const viewportSettings = { once: true, amount: 0.15 };

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const heroContentContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.16, delayChildren: 0.1 } },
};

const lineVariants = {
  hidden: { scaleX: 0, originX: 0 },
  visible: { scaleX: 1, originX: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

/**
 * Baca foto dari subfolder assets/images/kerjasama/<folder>/
 * Tambahkan subfolder baru di sana, lalu daftarkan di kerjaSamaGaleri.
 */
const berkasKerjaSama = import.meta.glob(
  "../../assets/images/kerjasama/*/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG}",
  { eager: true, import: "default" }
);

function fotoKegiatan(folder) {
  return Object.entries(berkasKerjaSama)
    .filter(([path]) => path.includes(`/kerjasama/${folder}/`))
    .sort(([a], [b]) => a.localeCompare(b, "id", { numeric: true }))
    .map(([, url]) => url);
}

/**
 * DATA GALERI KERJA SAMA
 * Tambahkan entry baru di sini setiap ada kegiatan baru.
 * Format: { judul: { id, en }, tahun: "YYYY", folder: "nama-subfolder" }
 */
const kerjaSamaGaleri = [
  {
    judul: {
      id: "Kerja Sama dengan Pengurus Pusat Ikatan Notaris Indonesia (PP INI)",
      en: "Partnership with the Central Board of the Indonesian Notary Association (PP INI)",
    },
    tahun: "",
    folder: "mou-ini",
  },
  {
    judul: {
      id: "Kerja Sama dengan Pengurus Pusat Ikatan Pejabat Pembuat Akta Tanah (PP IPPAT)",
      en: "Partnership with the Central Board of the Land Deed Officials Association (PP IPPAT)",
    },
    tahun: "",
    folder: "mou-ippat",
  },
  {
    judul: {
      id: "Kerja Sama dengan Universiti Kebangsaan Malaysia (UKM)",
      en: "Partnership with Universiti Kebangsaan Malaysia (UKM)",
    },
    tahun: "",
    folder: "mou-ukm",
  },
  {
    judul: {
      id: "Kerja Sama dengan University of Wollongong Malaysia",
      en: "Partnership with University of Wollongong Malaysia",
    },
    tahun: "",
    folder: "mou-uow",
  },
];

export default function KerjaSama() {
  const t = useT();
  const { lang } = useLanguage();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  const terdaftar = kerjaSamaGaleri ?? [];
  const folderTerdaftar = new Set(terdaftar.map((k) => k.folder));

  // Auto-discovery: temukan semua subfolder yang ada di assets/images/kerjasama/
  const folderDitemukan = Array.from(
    new Set(
      Object.keys(berkasKerjaSama)
        .map((path) => {
          const match = path.match(/\/kerjasama\/([^/]+)\//);
          return match ? match[1] : null;
        })
        .filter(Boolean)
    )
  );

  // Buat entri otomatis untuk folder yang belum terdaftar secara manual
  const folderTambahan = folderDitemukan
    .filter((f) => !folderTerdaftar.has(f))
    .map((f) => {
      const yearMatch = f.match(/\b(20\d\d)\b/);
      const tahun = yearMatch ? yearMatch[1] : "";
      const judulStr = f.replace(/\b(20\d\d)\b/, "").trim() || f;
      return {
        judul: { id: judulStr, en: judulStr },
        tahun,
        folder: f,
      };
    });

  const semuaKegiatan = [...terdaftar, ...folderTambahan];

  const galeri = semuaKegiatan
    .map((kegiatan) => {
      const judulText = t(kegiatan.judul);
      const namaLengkap = kegiatan.tahun ? `${judulText} ${kegiatan.tahun}` : judulText;
      return {
        ...kegiatan,
        foto: fotoKegiatan(kegiatan.folder).map((src, idx) => ({
          src,
          alt: `${namaLengkap} — ${lang === "en" ? "photo" : "foto"} ${idx + 1}`,
          caption: `${namaLengkap} — ${lang === "en" ? "photo" : "foto"} ${idx + 1}`,
        })),
      };
    })
    .filter((kg) => kg.foto.length > 0);

  return (
    <>
      <Helmet>
        <html lang={lang} />
        <title>{lang === "en" ? "Partnerships | MKn UNISSULA" : "Kerja Sama | MKn UNISSULA"}</title>
        <meta
          name="description"
          content={
            lang === "en"
              ? "Cooperation and partnership activities of the Master of Notarial Law Study Programme UNISSULA with universities, government institutions, and professional organisations."
              : "Kegiatan kerja sama dan kemitraan Program Studi Magister Kenotariatan UNISSULA dengan perguruan tinggi, instansi pemerintah, dan organisasi profesi."
          }
        />
      </Helmet>

      <main className="flex flex-col min-h-screen bg-banner font-body text-body overflow-x-clip">
        <Navbar />

        {/* BREADCRUMB */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full flex-grow max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12"
        >
          <Breadcrumb />
        </motion.div>

        {/* HERO SECTION */}
        <section className="w-full border-b border-gray-100/80">
          <motion.div
            variants={heroContentContainer}
            initial="hidden"
            animate="visible"
            className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 lg:pt-16"
          >
            <motion.span
              variants={itemVariants}
              className="text-[11px] sm:text-xs font-bold tracking-[0.16em] uppercase text-primary block mb-2"
            >
              {t({ id: "PROGRAM STUDI", en: "STUDY PROGRAMME" })}
            </motion.span>

            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-4xl lg:text-[48px] font-heading font-bold text-heading leading-[1.15] tracking-normal max-w-3xl"
            >
              {t({ id: "Kerja Sama", en: "Partnerships" })}
            </motion.h1>

            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
              viewport={{ once: true, amount: 0.2 }}
              className="h-[2px] bg-primary mt-5 mb-6"
            />

            <motion.p
              variants={itemVariants}
              className="text-sm sm:text-base text-body text-justify leading-relaxed"
            >
              {t({
                id:
                  "Program Studi Magister Kenotariatan UNISSULA menjalin kerja sama strategis dengan " +
                  "berbagai perguruan tinggi dalam dan luar negeri, instansi pemerintah, serta organisasi " +
                  "profesi hukum. Kerja sama ini diwujudkan dalam bentuk pertukaran akademik, penelitian " +
                  "bersama, pelatihan, dan kegiatan pengabdian masyarakat.",
                en:
                  "The Master of Notarial Law Study Programme UNISSULA establishes strategic partnerships " +
                  "with universities nationally and internationally, government agencies, and legal " +
                  "professional organisations. These collaborations take the form of academic exchanges, " +
                  "joint research, training programmes, and community service activities.",
              })}
            </motion.p>
          </motion.div>
        </section>

        {/* GALERI KEGIATAN KERJA SAMA */}
        <div className="w-full flex-1 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <motion.section
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            className="space-y-10"
          >
            <motion.h2
              variants={itemVariants}
              className="text-2xl sm:text-3xl font-heading font-bold text-heading"
            >
              {t({ id: "Galeri Kegiatan Kerja Sama", en: "Partnership Activity Gallery" })}
            </motion.h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.2 }}
              className="h-[1.5px] bg-heading mt-1 mb-3"
            />

            {galeri.length > 0 ? (
              /* Loop per kegiatan */
              galeri.map((kegiatan) => (
                <motion.div
                  key={kegiatan.folder}
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportSettings}
                  className="space-y-4"
                >
                  <motion.div
                    variants={itemVariants}
                    className="flex flex-wrap items-baseline gap-x-3 gap-y-1 pb-2 border-b border-gray-200"
                  >
                    <h3 className="font-heading font-bold text-lg sm:text-xl text-heading leading-snug">
                      {t(kegiatan.judul)}
                    </h3>
                    {/* Lencana tahun hanya tampil bila tahunnya diisi. */}
                    {kegiatan.tahun && (
                      <span className="text-[11px] font-bold tracking-wider text-primary uppercase bg-red-50 border border-primary/20 px-2 py-0.5 rounded-xs tabular-nums">
                        {kegiatan.tahun}
                      </span>
                    )}
                    <span className="text-xs text-gray-400 ml-auto tabular-nums">
                      {kegiatan.foto.length} {lang === "en" ? "photos" : "foto"}
                    </span>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <GaleriGeser
                      foto={kegiatan.foto}
                      ariaLabel={`${t({ id: "Galeri", en: "Gallery" })} ${t(kegiatan.judul)} ${kegiatan.tahun}`.trim()}
                      otomatis={false}
                      tampilkanJudul={false}
                      kelasTrek="gap-4"
                      kelasBasis="basis-full sm:basis-[calc((100%-1rem)/2)] md:basis-[calc((100%-2rem)/3)]"
                      kelasKartu="aspect-[4/3] rounded-md border border-gray-200 shadow-2xs"
                    />
                  </motion.div>
                </motion.div>
              ))
            ) : (
              /* Placeholder elegan saat belum ada foto */
              <>
                <motion.div
                  variants={itemVariants}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-6"
                >
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="aspect-[4/3] rounded-md border-2 border-dashed border-gray-200 bg-gray-50/60 flex flex-col items-center justify-center gap-3 text-center p-6"
                    >
                      <div className="w-10 h-10 rounded-full bg-gray-200/80 flex items-center justify-center">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <p className="text-xs text-gray-400 font-medium leading-snug whitespace-pre-line">
                        {t({ id: "Foto kegiatan\nakan ditambahkan", en: "Activity photos\ncoming soon" })}
                      </p>
                    </div>
                  ))}
                </motion.div>

                <motion.p variants={itemVariants} className="text-sm text-body/70 italic">
                  {t({
                    id: "Galeri foto kegiatan kerja sama sedang dalam proses pengumpulan dan akan segera ditampilkan.",
                    en: "The partnership activity gallery is currently being compiled and will be displayed shortly.",
                  })}
                </motion.p>
              </>
            )}
          </motion.section>
        </div>

        <Footer />
      </main>
    </>
  );
}
