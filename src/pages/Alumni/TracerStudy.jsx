import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useT, useLanguage } from "../../i18n/languageContext";
import {
  KotakStatistik,
  DaftarBatang,
  BatangBertumpuk,
  Legenda,
} from "../../components/ui/Grafik";
import { WARNA } from "../../components/ui/grafikWarna";
import {
  sumberTracer,
  ringkasanTracer,
  metodeTracer,
  statusPekerjaan,
  relevansiKurikulum,
  kepuasanLayanan,
  masaTunggu,
  penilaianPengguna,
  saranPengguna,
} from "../../data/alumni/tracerStudyData";

const viewportSettings = {
  once: true,
  amount: 0.15,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const lineVariants = {
  hidden: { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    originX: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/** Satu seksi data: judul bergaris tebal, pengantar singkat, lalu isinya. */
function Seksi({ judul, pengantar, children }) {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={viewportSettings}
      className="space-y-5"
    >
      <motion.div variants={itemVariants} className="space-y-3">
        <h2 className="text-2xl sm:text-3xl font-heading font-bold text-heading">
          {judul}
        </h2>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
          className="h-[1.5px] bg-heading mt-1 mb-3"
        />
        {pengantar && (
          <p className="text-sm sm:text-base text-body leading-relaxed">{pengantar}</p>
        )}
      </motion.div>
      <motion.div variants={itemVariants} className="space-y-4">
        {children}
      </motion.div>
    </motion.section>
  );
}

/** Catatan kecil di bawah grafik. */
function Catatan({ children }) {
  return <p className="text-xs sm:text-sm text-body leading-relaxed">{children}</p>;
}

export default function TracerStudy() {
  const t = useT();
  const { lang } = useLanguage();

  // Skala di data tersusun dari jenjang terendah; warnanya diambil berurutan
  // dari ramp terang → gelap, lalu dibalik agar jenjang tertinggi tampil di kiri.
  const skalaKepuasan = kepuasanLayanan.skala
    .map((s, i) => ({ kunci: s.kunci, label: t(s.label), warna: WARNA.ramp3[i] }))
    .reverse();
  const skalaPenilaian = penilaianPengguna.skala
    .map((s, i) => ({ kunci: s.kunci, label: t(s.label), warna: WARNA.ramp2[i] }))
    .reverse();

  return (
    <>
      <Helmet>
        <title>
          {lang === "en"
            ? "Alumni Career Tracking (Tracer Study) | MKn UNISSULA"
            : "Penelusuran Alumni | MKn UNISSULA"}
        </title>
        <meta
          name="description"
          content={
            lang === "en"
              ? "Tracer study results for the Master of Notarial Law (MKn) UNISSULA, academic year 2024/2025: graduate employment, curriculum relevance, satisfaction, and graduate users' assessment."
              : "Hasil tracer study Magister Kenotariatan (MKn) UNISSULA tahun akademik 2024/2025: pekerjaan lulusan, relevansi kurikulum, kepuasan, dan penilaian pengguna lulusan."
          }
        />
      </Helmet>

      <div className="space-y-12 sm:space-y-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          <div className="space-y-2">
            <motion.span
              variants={itemVariants}
              className="text-xs font-bold tracking-wider uppercase text-primary block"
            >
              {t({ id: "Alumni & Karier", en: "Alumni & Careers" })}
            </motion.span>
            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-4xl lg:text-[40px] font-heading font-bold text-heading tracking-tight leading-tight"
            >
              {t({
                id: "Penelusuran Alumni (Tracer Study) MKn UNISSULA",
                en: "Alumni Career Tracking (Tracer Study) MKn UNISSULA",
              })}
            </motion.h1>
          </div>

          <motion.div variants={lineVariants} className="w-full h-[2px] bg-primary my-4" />

          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-base text-body text-justify leading-relaxed"
          >
            {t({
              id:
                "Tracer study menelusuri keadaan lulusan setelah menyelesaikan studi — pekerjaan yang " +
                "dijalani, relevansi pendidikan dengan pekerjaan, dan kepuasan terhadap layanan program " +
                "studi — serta menghimpun penilaian pengguna lulusan atas kinerja alumni. Hasilnya " +
                "menjadi dasar perbaikan pembelajaran dan peninjauan kurikulum. Data di halaman ini " +
                "berasal dari tracer study Tahun Akademik 2024/2025 terhadap lulusan Tahun Akademik " +
                "2023/2024.",
              en:
                "The tracer study follows graduates after they complete their studies — the work they " +
                "do, how relevant their education is to that work, and their satisfaction with programme " +
                "services — and gathers graduate users' assessment of alumni performance. The results " +
                "inform improvements to teaching and curriculum review. The data on this page comes from " +
                "the tracer study of academic year 2024/2025, covering graduates of academic year " +
                "2023/2024.",
            })}
          </motion.p>

          <motion.div variants={itemVariants}>
            <KotakStatistik
              butir={ringkasanTracer.map((r) => ({
                nilai: t(r.nilai),
                label: t(r.label),
                keterangan: t(r.keterangan),
              }))}
            />
          </motion.div>

          <motion.dl
            variants={itemVariants}
            className="grid gap-x-8 gap-y-3 sm:grid-cols-2 border-t border-gray-200 pt-5"
          >
            {metodeTracer.map((m) => (
              <div key={m.label.id}>
                <dt className="text-xs font-semibold tracking-wider uppercase text-body">
                  {t(m.label)}
                </dt>
                <dd className="mt-0.5 text-sm text-heading leading-snug">{t(m.nilai)}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        <Seksi
          judul={t({ id: "Status Pekerjaan Alumni", en: "Alumni Employment Status" })}
          pengantar={t({
            id: `Sebanyak ${statusPekerjaan.jumlahBidangNotariat}% alumni bekerja di bidang kenotariatan dan pertanahan, dengan kelompok terbesar sebagai staf kantor Notaris/PPAT.`,
            en: `${statusPekerjaan.jumlahBidangNotariat}% of alumni work in notarial and land affairs, the largest group being notary/PPAT office staff.`,
          })}
        >
          <Legenda
            butir={[
              {
                label: t({ id: "Bidang kenotariatan dan pertanahan", en: "Notarial and land affairs" }),
                warna: WARNA.utama,
              },
              { label: t({ id: "Bidang lain", en: "Other fields" }), warna: WARNA.abu },
            ]}
          />
          <DaftarBatang
            butir={statusPekerjaan.butir.map((b) => ({
              label: t(b.label),
              nilai: b.nilai,
              warna: b.bidang === "notariat" ? WARNA.utama : WARNA.abu,
            }))}
          />
          <Catatan>{t(statusPekerjaan.catatan)}</Catatan>
        </Seksi>

        <Seksi
          judul={t({
            id: "Relevansi Pendidikan terhadap Pekerjaan",
            en: "Relevance of Education to Work",
          })}
          pengantar={t({
            id: "Penilaian alumni atas kesesuaian pendidikan Magister Kenotariatan dengan pekerjaan yang dijalani saat ini.",
            en: "Alumni assessment of how well the Master of Notarial Law education fits the work they currently do.",
          })}
        >
          <DaftarBatang
            butir={relevansiKurikulum.map((b) => ({ label: t(b.label), nilai: b.nilai }))}
          />
        </Seksi>

        <Seksi
          judul={t({ id: "Kepuasan terhadap Layanan", en: "Satisfaction with Services" })}
          pengantar={t(kepuasanLayanan.catatan)}
        >
          <Legenda butir={skalaKepuasan} />
          <BatangBertumpuk
            skala={skalaKepuasan}
            butir={kepuasanLayanan.butir.map((b) => ({ label: t(b.label), nilai: b.nilai }))}
          />
        </Seksi>

        <Seksi
          judul={t({ id: "Waktu Memperoleh Pekerjaan", en: "Time to Employment" })}
          pengantar={t({
            id: "Waktu yang diperlukan alumni untuk memperoleh pekerjaan setelah lulus.",
            en: "The time alumni needed to find work after graduating.",
          })}
        >
          <DaftarBatang butir={masaTunggu.map((b) => ({ label: t(b.label), nilai: b.nilai }))} />
        </Seksi>

        <Seksi
          judul={t({ id: "Penilaian Pengguna Lulusan", en: "Graduate Users' Assessment" })}
          pengantar={t({
            id: `Notaris tempat alumni magang dan klien alumni menilai kinerja alumni pada sembilan aspek. Secara keseluruhan ${penilaianPengguna.keseluruhan.sangatBaik}% penilaian berada pada kategori sangat baik dan ${penilaianPengguna.keseluruhan.baik}% baik; tidak ada penilaian cukup maupun kurang.`,
            en: `Notaries hosting alumni internships and clients of alumni assessed alumni performance on nine aspects. Overall, ${penilaianPengguna.keseluruhan.sangatBaik}% of ratings were very good and ${penilaianPengguna.keseluruhan.baik}% good; none were fair or poor.`,
          })}
        >
          <Legenda butir={skalaPenilaian} />
          <BatangBertumpuk
            skala={skalaPenilaian}
            butir={penilaianPengguna.butir.map((b) => ({ label: t(b.label), nilai: b.nilai }))}
          />
          <Catatan>{t(penilaianPengguna.catatan)}</Catatan>
        </Seksi>

        <Seksi
          judul={t({ id: "Saran Pengguna Lulusan", en: "Suggestions from Graduate Users" })}
          pengantar={t({
            id: "Masukan pengguna lulusan yang menjadi bahan perbaikan pembelajaran.",
            en: "Feedback from graduate users that informs improvements to teaching.",
          })}
        >
          <ol className="list-decimal pl-5 space-y-2 text-sm sm:text-base text-body leading-relaxed marker:text-primary marker:font-semibold">
            {saranPengguna.map((s) => (
              <li key={s.id} className="pl-1">
                {t(s)}
              </li>
            ))}
          </ol>
        </Seksi>

        <motion.p
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          className="text-xs sm:text-sm text-body leading-relaxed border-t border-gray-200 pt-5"
        >
          <span className="font-semibold text-heading">{t({ id: "Sumber", en: "Source" })}: </span>
          {t(sumberTracer.judul)}. {t(sumberTracer.penyusun)}.
        </motion.p>
      </div>
    </>
  );
}
