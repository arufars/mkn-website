import { Helmet } from "react-helmet-async";
import {
  KepalaMutu,
  JudulMutu,
  DaftarNomor,
  TabelMutu,
  DaftarTindakLanjut,
} from "../../components/QualityAssurance/MutuBagian";
import { KotakStatistik, DaftarBatang } from "../../components/ui/Grafik";
import {
  sumberSurveiMahasiswa,
  ringkasanSurvei,
  metodeSurvei,
  hasilButir,
  rataRataSeluruhButir,
  perbandinganEdomEdod,
  saranMahasiswa,
  masukanDosen,
  kelompokSaran,
  kesimpulanSurvei,
  tindakLanjutSurvei,
} from "../../data/qualityAssurance/studentSurveyData";
import { useLanguage, useT } from "../../i18n/languageContext";

/** Daftar berbutir untuk saran terbuka. */
function DaftarSaran({ judul, butir }) {
  const t = useT();
  return (
    <div className="bg-white border border-gray-200 rounded-xs p-5 sm:p-6 shadow-2xs">
      <h3 className="text-xs font-bold tracking-[0.14em] uppercase text-heading">{t(judul)}</h3>
      <ul className="mt-3 space-y-2">
        {butir.map((b) => (
          <li key={b.id} className="flex gap-2.5 text-sm text-body leading-relaxed">
            <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            <span>{t(b)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function StudentSurveyReport() {
  const { lang } = useLanguage();
  const t = useT();

  // Skor 1–5 selalu dua desimal, dengan pemisah desimal sesuai bahasa.
  const skor = (n) => (lang === "en" ? n.toFixed(2) : n.toFixed(2).replace(".", ","));
  const r = ringkasanSurvei;

  return (
    <>
      <Helmet>
        <title>
          {lang === "en"
            ? "Student Survey Report | MKn UNISSULA"
            : "Laporan Survei Mahasiswa | MKn UNISSULA"}
        </title>
        <meta
          name="description"
          content={
            lang === "en"
              ? "Student evaluation of lecturers (EDOM) results of the Master of Notarial Law Program UNISSULA, even semester 2019/2020."
              : "Hasil Evaluasi Dosen oleh Mahasiswa (EDOM) Program Studi Magister Kenotariatan UNISSULA, semester genap 2019/2020."
          }
        />
      </Helmet>

      <div className="space-y-12 sm:space-y-14 font-body text-body text-justify">
        <KepalaMutu
          judul={{
            id: "Laporan Survei Mahasiswa",
            en: "Student Survey Report",
          }}
          pengantar={{
            id: "Melalui survei ini mahasiswa menilai kinerja dosen pengampu pada mata kuliah yang diikutinya, sehingga Program Studi memperoleh gambaran mutu perencanaan, pelaksanaan, dan penilaian pembelajaran dari sudut pandang mahasiswa. Survei memakai instrumen Evaluasi Dosen oleh Mahasiswa (EDOM) yang dipasangkan dengan penilaian diri dosen (EDOD).",
            en: "Through this survey, students assess the performance of the lecturers teaching their courses, giving the programme a picture of how well learning is planned, delivered, and assessed from the students' perspective. The survey uses the Student Evaluation of Lecturers (EDOM), paired with a lecturer self-evaluation (EDOD).",
          }}
        />

        <section className="space-y-5">
          <JudulMutu
            judul={{ id: "Semester Genap 2019/2020", en: "Even Semester 2019/2020" }}
            keterangan={{
              id: "Secara keseluruhan kinerja dosen berada pada kategori Sangat Baik, dengan butir terendah pada kemampuan menghidupkan suasana kelas.",
              en: "Overall, lecturer performance is rated Very Good, with the lowest score on making the class engaging.",
            }}
          />
          <KotakStatistik
            butir={[
              {
                nilai: skor(r.edom),
                label: t({ id: "Rata-rata EDOM", en: "Average EDOM score" }),
                keterangan: t({
                  id: `Sangat Baik · ${r.dosenDinilai} dosen dinilai`,
                  en: `Very Good · ${r.dosenDinilai} lecturers evaluated`,
                }),
              },
              {
                nilai: skor(r.edod),
                label: t({ id: "Rata-rata penilaian diri dosen", en: "Average self-evaluation" }),
                keterangan: t({ id: "EDOD · Sangat Baik", en: "EDOD · Very Good" }),
              },
              {
                nilai: skor(r.selisih),
                label: t({ id: "Selisih EDOM–EDOD", en: "EDOM–EDOD gap" }),
                keterangan: t({ id: "wajar, rentang ±0,50", en: "acceptable, range ±0.50" }),
              },
              {
                nilai: String(r.responden),
                label: t({ id: "Mahasiswa responden", en: "Student respondents" }),
                keterangan: t({ id: "1–5 Agustus 2020", en: "1–5 August 2020" }),
              },
            ]}
          />
          <dl className="grid gap-x-8 gap-y-3 sm:grid-cols-2 border-t border-gray-200 pt-5">
            {metodeSurvei.map((m) => (
              <div key={m.label.id}>
                <dt className="text-xs font-semibold tracking-wider uppercase text-body">{t(m.label)}</dt>
                <dd className="mt-0.5 text-sm text-heading leading-snug">{t(m.nilai)}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="space-y-6">
          <JudulMutu
            judul={{ id: "Hasil per Butir Pertanyaan", en: "Results by Item" }}
            keterangan={{
              id: `Rata-rata skor setiap butir dari ${r.dosenDinilai} dosen yang dinilai, skala 1–5. Rata-rata seluruh butir ${skor(rataRataSeluruhButir)}.`,
              en: `Average score for each item across the ${r.dosenDinilai} lecturers evaluated, on a 1–5 scale. Average across all items: ${skor(rataRataSeluruhButir)}.`,
            }}
          />
          {hasilButir.map((k) => (
            <div key={k.kelompok.id} className="space-y-4">
              <h3 className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-xs font-bold tracking-[0.14em] uppercase text-heading">
                <span>{t(k.kelompok)}</span>
                <span className="normal-case tracking-normal text-sm font-semibold tabular-nums">
                  {t({ id: "Rata-rata", en: "Average" })} {skor(k.rataRata)}
                </span>
              </h3>
              <DaftarBatang
                maks={5}
                butir={k.butir.map((b) => ({ label: t(b.label), nilai: b.nilai, teks: skor(b.nilai) }))}
              />
            </div>
          ))}
          <p className="text-xs sm:text-sm text-body leading-relaxed">
            {t({
              id: "Butir dengan skor terendah adalah kemampuan menghidupkan suasana kelas (4,21) dan penggunaan hasil penelitian untuk meningkatkan kualitas perkuliahan (4,86); empat belas butir lainnya memperoleh 4,96.",
              en: "The lowest-scoring items are making the class engaging (4.21) and use of research findings to improve teaching (4.86); the other fourteen items scored 4.96.",
            })}
          </p>
        </section>

        <section className="space-y-5">
          <JudulMutu
            judul={{
              id: "Penilaian Mahasiswa dan Penilaian Diri Dosen",
              en: "Student Ratings and Lecturer Self-Ratings",
            }}
            keterangan={perbandinganEdomEdod}
          />
        </section>

        <section className="space-y-5">
          <JudulMutu
            judul={{ id: "Saran dan Masukan Terbuka", en: "Open-Ended Suggestions" }}
            keterangan={{
              id: "Saran mahasiswa dan masukan dosen dikelompokkan menurut bidang perbaikan beserta penanggung jawab tindak lanjutnya.",
              en: "Student suggestions and lecturer feedback, grouped by improvement area with the party responsible for follow-up.",
            }}
          />
          <div className="grid gap-4 md:grid-cols-2">
            <DaftarSaran judul={{ id: "Saran mahasiswa", en: "Student suggestions" }} butir={saranMahasiswa} />
            <DaftarSaran judul={{ id: "Masukan dosen", en: "Lecturer feedback" }} butir={masukanDosen} />
          </div>
          <TabelMutu
            kolom={[
              { id: "Bidang", en: "Area" },
              { id: "Pokok saran", en: "Main suggestion" },
              { id: "Penanggung jawab", en: "Responsible" },
            ]}
            baris={kelompokSaran.map((k) => [k.bidang, k.pokok, k.penanggungJawab])}
          />
        </section>

        <section className="space-y-5">
          <JudulMutu judul={{ id: "Kesimpulan", en: "Conclusions" }} />
          <DaftarNomor butir={kesimpulanSurvei} />
        </section>

        <section className="space-y-5">
          <JudulMutu judul={{ id: "Rencana Tindak Lanjut", en: "Follow-Up Plan" }} />
          <DaftarTindakLanjut butir={tindakLanjutSurvei} />
        </section>

        <p className="text-xs sm:text-sm text-body leading-relaxed border-t border-gray-200 pt-5">
          <span className="font-semibold text-heading">{t({ id: "Sumber", en: "Source" })}: </span>
          {t(sumberSurveiMahasiswa.judul)}. {t(sumberSurveiMahasiswa.penyusun)}.
        </p>
      </div>
    </>
  );
}
