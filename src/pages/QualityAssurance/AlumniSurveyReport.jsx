import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import {
  KepalaMutu,
  JudulMutu,
  DaftarNomor,
  TabelMutu,
  DaftarTindakLanjut,
} from "../../components/QualityAssurance/MutuBagian";
import {
  KotakStatistik,
  DaftarBatang,
  BatangBertumpuk,
  Legenda,
} from "../../components/ui/Grafik";
import { WARNA } from "../../components/ui/grafikWarna";
import {
  ringkasanTracer,
  statusPekerjaan,
  relevansiKurikulum,
  kepuasanLayanan,
  masaTunggu,
} from "../../data/alumni/tracerStudyData";
import {
  sumberSurveiAlumni,
  metodeSurveiAlumni,
  tahapanSurveiAlumni,
  analisisAlumni,
  kesimpulanAlumni,
  tindakLanjutAlumni,
} from "../../data/qualityAssurance/alumniSurveyData";
import { useLanguage, useT } from "../../i18n/languageContext";

/** Paragraf analisis di bawah grafik. */
function Analisis({ children }) {
  return <p className="text-sm sm:text-base text-body text-justify leading-relaxed">{children}</p>;
}

export default function AlumniSurveyReport() {
  const { lang } = useLanguage();
  const t = useT();

  // Sama dengan halaman Tracer Study: ramp terang → gelap, jenjang tertinggi di kiri.
  const skalaKepuasan = kepuasanLayanan.skala
    .map((s, i) => ({ kunci: s.kunci, label: t(s.label), warna: WARNA.ramp3[i] }))
    .reverse();

  return (
    <>
      <Helmet>
        <title>
          {lang === "en"
            ? "Alumni Survey Report | MKn UNISSULA"
            : "Laporan Survei Alumni | MKn UNISSULA"}
        </title>
        <meta
          name="description"
          content={
            lang === "en"
              ? "Alumni survey results of the Master of Notarial Law Program UNISSULA, academic year 2024/2025: employment, relevance, satisfaction, time to employment, and follow-up."
              : "Hasil survei alumni Program Studi Magister Kenotariatan UNISSULA tahun akademik 2024/2025: pekerjaan, relevansi, kepuasan, masa tunggu, dan tindak lanjut."
          }
        />
      </Helmet>

      <div className="space-y-12 sm:space-y-14 font-body text-body">
        <KepalaMutu
          judul={{
            id: "Laporan Survei Alumni",
            en: "Alumni Survey Report",
          }}
          pengantar={{
            id: "Survei alumni merupakan bagian dari tracer study yang diselenggarakan Program Studi secara berkala. Survei ini memberi gambaran keterserapan lulusan di dunia kerja, relevansi pendidikan terhadap pekerjaan, dan kepuasan alumni terhadap layanan yang pernah diterima, sebagai dasar perbaikan pembelajaran dan peninjauan kurikulum.",
            en: "The alumni survey is part of the tracer study the programme conducts regularly. It shows how graduates are absorbed into the workforce, how relevant their education is to their work, and how satisfied they were with programme services, as a basis for improving teaching and reviewing the curriculum.",
          }}
        />

        <section className="space-y-5">
          <JudulMutu
            judul={{ id: "Tahun Akademik 2024/2025", en: "Academic Year 2024/2025" }}
            keterangan={{
              id: "Hampir seluruh alumni memperoleh pekerjaan kurang dari tiga bulan setelah lulus, dan tidak ada responden yang menyatakan tidak puas terhadap ketiga layanan yang dinilai.",
              en: "Almost all alumni found work within three months of graduating, and no respondent was dissatisfied with any of the three services rated.",
            }}
          />
          <KotakStatistik
            butir={ringkasanTracer.map((s) => ({
              nilai: t(s.nilai),
              label: t(s.label),
              keterangan: t(s.keterangan),
            }))}
          />
          <dl className="grid gap-x-8 gap-y-3 sm:grid-cols-2 border-t border-gray-200 pt-5">
            {metodeSurveiAlumni.map((m) => (
              <div key={m.label.id}>
                <dt className="text-xs font-semibold tracking-wider uppercase text-body">{t(m.label)}</dt>
                <dd className="mt-0.5 text-sm text-heading leading-snug">{t(m.nilai)}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="space-y-5">
          <JudulMutu
            judul={{ id: "Status Pekerjaan Alumni", en: "Alumni Employment Status" }}
            keterangan={{
              id: `Sebanyak ${statusPekerjaan.jumlahBidangNotariat}% alumni bekerja pada bidang kenotariatan dan pertanahan.`,
              en: `${statusPekerjaan.jumlahBidangNotariat}% of alumni work in notarial and land affairs.`,
            }}
          />
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
          <p className="text-xs sm:text-sm text-body leading-relaxed">{t(statusPekerjaan.catatan)}</p>
          <Analisis>{t(analisisAlumni.statusPekerjaan)}</Analisis>
        </section>

        <section className="space-y-5">
          <JudulMutu
            judul={{
              id: "Relevansi Pendidikan terhadap Pekerjaan",
              en: "Relevance of Education to Work",
            }}
          />
          <DaftarBatang
            butir={relevansiKurikulum.map((b) => ({ label: t(b.label), nilai: b.nilai }))}
          />
          <Analisis>{t(analisisAlumni.relevansi)}</Analisis>
        </section>

        <section className="space-y-5">
          <JudulMutu
            judul={{ id: "Kepuasan Alumni terhadap Layanan", en: "Alumni Satisfaction with Services" }}
            keterangan={kepuasanLayanan.catatan}
          />
          <Legenda butir={skalaKepuasan} />
          <BatangBertumpuk
            skala={skalaKepuasan}
            butir={kepuasanLayanan.butir.map((b) => ({ label: t(b.label), nilai: b.nilai }))}
          />
          <Analisis>{t(analisisAlumni.kepuasan)}</Analisis>
        </section>

        <section className="space-y-5">
          <JudulMutu judul={{ id: "Masa Tunggu Memperoleh Pekerjaan", en: "Time to Employment" }} />
          <DaftarBatang butir={masaTunggu.map((b) => ({ label: t(b.label), nilai: b.nilai }))} />
          <Analisis>{t(analisisAlumni.masaTunggu)}</Analisis>
          <Link
            to="/alumni/tracer-study"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
          >
            <span>
              {t({
                id: "Penilaian dan saran pengguna lulusan pada halaman Tracer Study",
                en: "Graduate users' assessment and suggestions on the Tracer Study page",
              })}
            </span>
            <FiArrowUpRight aria-hidden="true" />
          </Link>
        </section>

        <section className="space-y-5">
          <JudulMutu judul={{ id: "Kesimpulan", en: "Conclusions" }} />
          <DaftarNomor butir={kesimpulanAlumni} />
        </section>

        <section className="space-y-5">
          <JudulMutu judul={{ id: "Tindak Lanjut", en: "Follow-Up" }} />
          <DaftarTindakLanjut butir={tindakLanjutAlumni} />
        </section>

        <section className="space-y-5">
          <JudulMutu judul={{ id: "Tahapan Pelaksanaan Survei", en: "Survey Stages" }} />
          <TabelMutu
            kolom={[
              { id: "Kegiatan", en: "Activity" },
              { id: "Penanggung jawab", en: "Responsible" },
            ]}
            baris={tahapanSurveiAlumni.map((s) => [s.kegiatan, s.penanggungJawab])}
          />
        </section>

        <p className="text-xs sm:text-sm text-body leading-relaxed border-t border-gray-200 pt-5">
          <span className="font-semibold text-heading">{t({ id: "Sumber", en: "Source" })}: </span>
          {t(sumberSurveiAlumni.judul)}. {t(sumberSurveiAlumni.penyusun)}.
        </p>
      </div>
    </>
  );
}
