/**
 * Laporan survei alumni Program Studi Magister Kenotariatan UNISSULA.
 *
 * SUMBER: "Laporan Hasil Survei Alumni, Tahun Akademik 2024/2025, sasaran
 * alumni lulusan Tahun Akademik 2023/2024", Gugus Penjaminan Mutu Program
 * Magister (S2) Kenotariatan, 2025. Menurut Kata Pengantar, seluruh angkanya
 * berasal dari Laporan Tracer Study TA 2024/2025.
 *
 * Karena sumber angkanya sama, persentase status pekerjaan, relevansi,
 * kepuasan, dan masa tunggu TIDAK disalin ke berkas ini, melainkan diambil dari
 * `data/alumni/tracerStudyData.js` agar satu angka tidak tercatat dua kali.
 * Berkas ini hanya memuat isi khas laporan survei: metode, analisis,
 * kesimpulan, dan tindak lanjut.
 *
 * Laporan disajikan sebagai dokumen final tahun tersebut: catatan mutu data
 * (Bab IV huruf D) dan kalimat bernada "belum/perlu dilengkapi" tidak
 * ditampilkan.
 *
 * CATATAN — isi laporan yang tidak dipakai karena bertentangan dengan grafik,
 * narasi, dan Lampiran B laporan yang sama:
 *   - Ringkasan Eksekutif: "Alumni berstatus Notaris 90%" dan "Saran terbuka
 *     alumni 98%". Narasi menyatakan belum ada alumni berstatus Notaris dan
 *     saran terbuka tidak dilaporkan.
 *   - Tabel 7: "Notaris 96%", "Notaris dan PPAT 96%", jumlah "292% / 359".
 *     Gambar 1 dan Lampiran B menulis 0%; jumlah bidang kenotariatan 36%.
 *   - Lampiran B: kolom perkiraan orang untuk populasi (200), responden (85),
 *     dan tingkat respons (80).
 *   - Tabel 3: "Kuesioner yang dikirimkan 250", padahal Bab II huruf B menyatakan
 *     kuesioner dikirim ke seluruh populasi dan berita acara mengosongkannya.
 *   - Tabel 12 (penilaian pengguna lulusan, 75–90%) berbeda dengan angka laporan
 *     tracer study yang sudah tayang di halaman Tracer Study; halaman ini
 *     merujuk ke sana alih-alih menampilkan dua versi.
 *   - Masa tunggu "lebih dari 1 tahun" tertulis 3% (jumlah 102%); grafik laporan
 *     tracer study menunjukkan 1%, dan 1% yang dipakai di situs.
 *   - Nomor rekomendasi (R-11 s.d. R-18) merujuk dokumen Rekomendasi Perbaikan
 *     Pembelajaran yang belum diterima, jadi tidak ditampilkan.
 */

export const sumberSurveiAlumni = {
  judul: {
    id: "Laporan Hasil Survei Alumni Program Studi Magister Kenotariatan UNISSULA Tahun Akademik 2024/2025",
    en: "Alumni Survey Report, Master of Notarial Law Programme UNISSULA, Academic Year 2024/2025",
  },
  penyusun: {
    id: "Gugus Penjaminan Mutu Program Magister (S2) Kenotariatan, Fakultas Hukum UNISSULA, 2025",
    en: "Quality Assurance Unit, Master of Notarial Law Programme, Faculty of Law, UNISSULA, 2025",
  },
};

export const metodeSurveiAlumni = [
  {
    label: { id: "Sasaran", en: "Target group" },
    nilai: {
      id: "Seluruh lulusan Tahun Akademik 2023/2024 (313 orang), tanpa penarikan sampel",
      en: "All graduates of Academic Year 2023/2024 (313 people), with no sampling",
    },
  },
  {
    label: { id: "Responden", en: "Respondents" },
    nilai: {
      id: "183 alumni; tingkat respons 58,47%",
      en: "183 alumni; response rate 58.47%",
    },
  },
  {
    label: { id: "Rancangan dan instrumen", en: "Design and instrument" },
    nilai: {
      id: "Survei deskriptif kuantitatif; kuesioner tertutup 6 butir dan 1 butir saran terbuka. Hasil dinyatakan dalam persentase responden",
      en: "Descriptive quantitative survey; 6 closed questions and 1 open-ended question. Results are reported as percentages of respondents",
    },
  },
  {
    label: { id: "Pengumpulan dan verifikasi", en: "Collection and verification" },
    nilai: {
      id: "Telepon, WhatsApp, surel, dan laman Program Studi dengan bantuan IKANOTSULA; verifikasi telepon acak kepada dua sampai tiga responden",
      en: "Telephone, WhatsApp, email, and the programme website with help from IKANOTSULA; random telephone verification with two to three respondents",
    },
  },
];

/** Tabel 4: tahapan pelaksanaan survei. */
export const tahapanSurveiAlumni = [
  {
    kegiatan: { id: "Pengembangan konsep dan instrumen", en: "Concept and instrument development" },
    penanggungJawab: { id: "Gugus Penjaminan Mutu", en: "Quality Assurance Unit" },
  },
  {
    kegiatan: { id: "Penelusuran alamat alumni", en: "Tracing alumni contacts" },
    penanggungJawab: {
      id: "Gugus Penjaminan Mutu bersama IKANOTSULA",
      en: "Quality Assurance Unit with IKANOTSULA",
    },
  },
  {
    kegiatan: { id: "Pengumpulan data", en: "Data collection" },
    penanggungJawab: { id: "Staf administrasi Program Studi", en: "Programme administrative staff" },
  },
  {
    kegiatan: { id: "Verifikasi data secara acak", en: "Random data verification" },
    penanggungJawab: { id: "Gugus Penjaminan Mutu", en: "Quality Assurance Unit" },
  },
  {
    kegiatan: { id: "Analisis data dan penulisan laporan", en: "Data analysis and reporting" },
    penanggungJawab: { id: "Gugus Penjaminan Mutu", en: "Quality Assurance Unit" },
  },
  {
    kegiatan: { id: "Pembahasan hasil dan penetapan tindak lanjut", en: "Discussion of results and follow-up" },
    penanggungJawab: { id: "Ketua Program Studi", en: "Head of Programme" },
  },
];

/** Analisis per bagian hasil (Bab III dan Bab IV). */
export const analisisAlumni = {
  statusPekerjaan: {
    id:
      "Kelompok terbesar di bidang kenotariatan adalah staf kantor Notaris/PPAT (22%), yaitu posisi awal " +
      "pada jalur profesi. Pada angkatan ini tidak ada alumni yang berstatus Notaris maupun Notaris dan PPAT.",
    en:
      "The largest group in notarial affairs is notary/PPAT office staff (22%), an entry-level position on " +
      "the professional path. No one in this cohort holds notary or notary-and-PPAT status.",
  },
  relevansi: {
    id:
      "Sebanyak 79% alumni menilai pendidikan relevan atau sangat relevan, padahal 64% bekerja di luar " +
      "bidang kenotariatan dan pertanahan. Artinya sebagian alumni di luar bidang, misalnya perbankan, " +
      "advokat, dan wirausaha, tetap merasakan manfaatnya. Sebanyak 13% alumni menilai pendidikan tidak " +
      "relevan dengan pekerjaannya.",
    en:
      "79% of alumni rate their education relevant or highly relevant, even though 64% work outside notarial " +
      "and land affairs. Some alumni in other fields, such as banking, advocacy, and business, still find it " +
      "useful. 13% of alumni rate their education not relevant to their work.",
  },
  kepuasan: {
    id:
      "Gabungan puas dan sangat puas mencapai 90% untuk pengajaran dosen, 95% untuk fasilitas, dan 97% untuk " +
      "pelayanan Tata Usaha. Kepuasan tertinggi terdapat pada fasilitas (73% sangat puas) dan terendah pada " +
      "pengajaran dosen (66% sangat puas).",
    en:
      "Combined satisfied and very satisfied responses reach 90% for teaching, 95% for facilities, and 97% for " +
      "administrative service. Satisfaction is highest for facilities (73% very satisfied) and lowest for " +
      "teaching (66% very satisfied).",
  },
  masaTunggu: {
    id:
      "Sebanyak 96% alumni memperoleh pekerjaan kurang dari tiga bulan setelah lulus, dan 78% sudah bekerja " +
      "sejak lulus. Hal ini wajar bagi program magister yang sebagian besar mahasiswanya telah bekerja saat " +
      "menempuh studi.",
    en:
      "96% of alumni found work within three months of graduating, and 78% were already employed at " +
      "graduation. This is typical of a master's programme whose students mostly work while studying.",
  },
};

export const kesimpulanAlumni = [
  {
    id: "Survei menghimpun 183 responden dari 313 alumni lulusan Tahun Akademik 2023/2024, setara tingkat respons 58,47%.",
    en: "The survey gathered 183 respondents from 313 graduates of Academic Year 2023/2024, a response rate of 58.47%.",
  },
  {
    id: "Sebanyak 36% alumni bekerja pada bidang kenotariatan dan pertanahan, dengan kelompok terbesar sebagai staf kantor Notaris/PPAT. Pada angkatan ini tidak ada alumni yang berstatus Notaris.",
    en: "36% of alumni work in notarial and land affairs, the largest group being notary/PPAT office staff. No alumni hold notary status.",
  },
  {
    id: "Sebanyak 79% alumni menilai pendidikan yang ditempuh relevan atau sangat relevan dengan pekerjaannya, sedangkan 13% menilai tidak relevan.",
    en: "79% of alumni rate their education relevant or highly relevant to their work, while 13% rate it not relevant.",
  },
  {
    id: "Alumni puas terhadap ketiga layanan yang dinilai tanpa satu pun jawaban tidak puas; kepuasan tertinggi pada fasilitas dan terendah pada pengajaran dosen.",
    en: "Alumni are satisfied with all three services with no dissatisfied responses; satisfaction is highest for facilities and lowest for teaching.",
  },
  {
    id: "Sebanyak 96% alumni memperoleh pekerjaan kurang dari tiga bulan setelah lulus.",
    en: "96% of alumni found work within three months of graduating.",
  },
];

/**
 * Tabel 15: tindak lanjut hasil survei alumni. Butir yang menyangkut pencatatan
 * data survei (saran terbuka, profil responden, jumlah persentase masa tunggu)
 * tidak ditampilkan; yang tampil hanya tindak lanjut atas hasil.
 */
export const tindakLanjutAlumni = [
  {
    temuan: {
      id: "13% alumni menilai pendidikan tidak relevan dengan pekerjaannya",
      en: "13% of alumni rate their education not relevant to their work",
    },
    tindakan: {
      id: "Menelusuri kelompok alumni tersebut melalui wawancara dan menjadikan hasilnya bahan peninjauan kurikulum",
      en: "Interview this group of alumni and use the findings for curriculum review",
    },
    penanggungJawab: { id: "Gugus Penjaminan Mutu Program Studi", en: "Programme Quality Assurance Unit" },
    tenggat: {
      id: "Satu semester; alumni yang menilai tidak relevan ≤ 5% pada survei berikutnya",
      en: "One semester; ≤ 5% rate it not relevant in the next survey",
    },
  },
  {
    temuan: { id: "Tidak ada alumni angkatan ini yang berstatus Notaris", en: "No alumni of this cohort hold notary status" },
    tindakan: {
      id: "Menyelenggarakan pembekalan menjelang kelulusan mengenai jalur profesi dan prosedur pengangkatan, serta menelusuri lulusan yang mengikuti ujian pengangkatan",
      en: "Hold pre-graduation briefings on the professional path and appointment procedure, and track graduates taking the appointment examination",
    },
    penanggungJawab: {
      id: "Ketua Program Studi bersama IKANOTSULA",
      en: "Head of Programme with IKANOTSULA",
    },
    tenggat: {
      id: "Setiap akhir semester; ≥ 50% lulusan mendaftar ujian dalam satu tahun",
      en: "End of each semester; ≥ 50% of graduates register for the exam within a year",
    },
  },
  {
    temuan: {
      id: "Tingkat respons 58,47%",
      en: "Response rate of 58.47%",
    },
    tindakan: {
      id: "Menelusuri alumni secara berkala bersama IKANOTSULA dan mengingatkan pengisian melalui beberapa saluran",
      en: "Trace alumni regularly with IKANOTSULA and send reminders through several channels",
    },
    penanggungJawab: {
      id: "Gugus Penjaminan Mutu bersama IKANOTSULA",
      en: "Quality Assurance Unit with IKANOTSULA",
    },
    tenggat: { id: "Survei berikutnya; tingkat respons ≥ 70%", en: "Next survey; response rate ≥ 70%" },
  },
  {
    temuan: {
      id: "Kepuasan terhadap pengajaran dosen terendah di antara tiga layanan",
      en: "Satisfaction with teaching is the lowest of the three services",
    },
    tindakan: {
      id: "Menelusuri melalui hasil Evaluasi Dosen oleh Mahasiswa dan menindaklanjuti butir dengan skor terendah",
      en: "Investigate through the Student Evaluation of Lecturers and act on the lowest-scoring items",
    },
    penanggungJawab: { id: "Ketua Program Studi", en: "Head of Programme" },
    tenggat: {
      id: "Setiap semester; sangat puas ≥ 70% pada survei berikutnya",
      en: "Every semester; very satisfied ≥ 70% in the next survey",
    },
  },
];
