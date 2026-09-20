/**
 * Laporan survei mahasiswa Program Studi Magister Kenotariatan UNISSULA.
 *
 * SUMBER: "Laporan Hasil Survei Mahasiswa terhadap Proses Pembelajaran,
 * Semester Genap Tahun Akademik 2019/2020, Instrumen Evaluasi Dosen oleh
 * Mahasiswa (EDOM)", Gugus Penjaminan Mutu Program Magister (S2)
 * Kenotariatan, 2020.
 *
 * PRINSIP: setiap angka yang tampil tertulis di laporan, dan laporan disajikan
 * sebagai dokumen final tahun tersebut. Catatan mutu data (Bab IV huruf B) dan
 * kalimat bernada "belum/baru" tidak ditampilkan. Skor disimpan sebagai
 * bilangan dan diformat per bahasa di halaman (4,59 / 4.59).
 *
 * CATATAN:
 *   - Tabel 6 laporan mencantumkan skor EDOM untuk 30 dosen, tetapi berita acara,
 *     Gambar 2, dan Lampiran B menyatakan 6 dosen yang dinilai; rata-rata 4,59
 *     adalah rata-rata keenam dosen itu. Skor 24 dosen lainnya tidak dipakai.
 *   - Skor per dosen tidak ditampilkan (sejalan dengan laporan pembelajaran);
 *     laporan sendiri menyatakan peringkat antar-dosen tidak dijadikan dasar
 *     keputusan. Yang tampil hanya angka tingkat program studi.
 *   - Rata-rata Kemampuan Pedagogik tertulis 4,86; hitung ulang dari Tabel 4
 *     menghasilkan 4,866 (≈ 4,87). Angka laporan yang dipakai.
 *   - Rata-rata EDOM 4,59 (skor akhir 6 dosen) dan rata-rata butir 4,91 berasal
 *     dari dua kelompok angka berbeda pada berkas sumber (Tabel 9 no. 4 laporan).
 *     Keduanya ditampilkan dengan labelnya masing-masing.
 *   - Tidak dicantumkan di laporan sehingga tidak ditampilkan: jumlah mahasiswa
 *     aktif, tingkat respons, dan hasil 8 butir Evaluasi Kinerja Program Studi.
 */

export const sumberSurveiMahasiswa = {
  judul: {
    id: "Laporan Hasil Survei Mahasiswa terhadap Proses Pembelajaran, Semester Genap Tahun Akademik 2019/2020",
    en: "Student Survey Report on the Learning Process, Even Semester, Academic Year 2019/2020",
  },
  penyusun: {
    id: "Gugus Penjaminan Mutu Program Magister (S2) Kenotariatan, Fakultas Hukum UNISSULA, 2020",
    en: "Quality Assurance Unit, Master of Notarial Law Programme, Faculty of Law, UNISSULA, 2020",
  },
};

/** Angka utama (Tabel 1). */
export const ringkasanSurvei = {
  edom: 4.59,
  edod: 4.52,
  selisih: 0.07,
  responden: 45,
  dosenDinilai: 6,
};

export const metodeSurvei = [
  {
    label: { id: "Instrumen", en: "Instrument" },
    nilai: {
      id: "Evaluasi Dosen oleh Mahasiswa (EDOM): 8 butir Kemampuan Pedagogik dan 8 butir Kompetensi Profesional, dipasangkan dengan Evaluasi Dosen oleh Dosen sendiri (EDOD) berbutir sama",
      en: "Student Evaluation of Lecturers (EDOM): 8 pedagogical and 8 professional competence items, paired with a lecturer self-evaluation (EDOD) on the same items",
    },
  },
  {
    label: { id: "Periode dan cara pengisian", en: "Period and method" },
    nilai: {
      id: "1–5 Agustus 2020, daring melalui laman Program Studi dan tautan WhatsApp",
      en: "1–5 August 2020, online via the programme website and a WhatsApp link",
    },
  },
  {
    label: { id: "Skala penilaian", en: "Rating scale" },
    nilai: {
      id: "1 (sangat kurang) sampai 5 (sangat baik); rata-rata 4,01–5,00 berkategori Sangat Baik",
      en: "1 (very poor) to 5 (very good); an average of 4.01–5.00 is rated Very Good",
    },
  },
  {
    label: { id: "Responden", en: "Respondents" },
    nilai: {
      id: "45 mahasiswa; 6 dosen dinilai dan mengisi EDOD",
      en: "45 students; 6 lecturers evaluated, all completing the EDOD",
    },
  },
];

/** Rata-rata skor setiap butir (Tabel 4), n = 6 dosen. */
export const hasilButir = [
  {
    kelompok: { id: "Kemampuan Pedagogik", en: "Pedagogical Competence" },
    rataRata: 4.86,
    butir: [
      { label: { id: "Kontrak kuliah di awal perkuliahan", en: "Course contract at the start of the course" }, nilai: 4.96 },
      { label: { id: "Ketepatan waktu kuliah", en: "Punctuality" }, nilai: 4.96 },
      { label: { id: "Menghidupkan suasana kelas", en: "Making the class engaging" }, nilai: 4.21 },
      {
        label: { id: "Kejelasan penyampaian materi dan jawaban", en: "Clarity of delivery and answers" },
        nilai: 4.96,
      },
      {
        label: { id: "Pemanfaatan media dan teknologi", en: "Use of media and technology" },
        nilai: 4.96,
      },
      { label: { id: "Umpan balik terhadap tugas", en: "Feedback on assignments" }, nilai: 4.96 },
      {
        label: { id: "Kesesuaian ujian/tugas dengan tujuan mata kuliah", en: "Exams/assignments aligned with course aims" },
        nilai: 4.96,
      },
      {
        label: { id: "Kesesuaian nilai dengan hasil belajar", en: "Grades consistent with learning outcomes" },
        nilai: 4.96,
      },
    ],
  },
  {
    kelompok: { id: "Kompetensi Profesional", en: "Professional Competence" },
    rataRata: 4.95,
    butir: [
      { label: { id: "Menjelaskan pokok bahasan secara tepat", en: "Explaining topics accurately" }, nilai: 4.96 },
      {
        label: { id: "Memberi contoh relevan dari konsep", en: "Giving relevant examples of concepts" },
        nilai: 4.96,
      },
      {
        label: { id: "Keterkaitan dengan bidang/topik lain", en: "Linking to other fields/topics" },
        nilai: 4.96,
      },
      {
        label: { id: "Keterkaitan dengan konteks kehidupan", en: "Linking to real-life context" },
        nilai: 4.96,
      },
      {
        label: { id: "Penguasaan isu mutakhir bidang yang diajarkan", en: "Command of current issues in the field" },
        nilai: 4.96,
      },
      {
        label: { id: "Penggunaan hasil penelitian dalam perkuliahan", en: "Use of research findings in teaching" },
        nilai: 4.86,
      },
      { label: { id: "Menyediakan bahan kuliah", en: "Providing course materials" }, nilai: 4.96 },
      {
        label: { id: "Menggunakan beragam teknologi komunikasi", en: "Using various communication technologies" },
        nilai: 4.96,
      },
    ],
  },
];

export const rataRataSeluruhButir = 4.91;

/** Narasi Bab III huruf D; selisih per dosen pada Tabel 7 berkisar 0,03–0,14. */
export const perbandinganEdomEdod = {
  id:
    "Selisih penilaian mahasiswa dan penilaian diri dosen per dosen berkisar 0,03 sampai 0,14 poin, " +
    "seluruhnya di dalam rentang wajar ±0,50. Penilaian diri dosen konsisten sedikit lebih rendah " +
    "daripada penilaian mahasiswanya.",
  en:
    "The gap between student ratings and lecturer self-ratings ranges from 0.03 to 0.14 points per " +
    "lecturer, all within the acceptable ±0.50 range. Lecturers consistently rate themselves slightly " +
    "lower than their students do.",
};

export const saranMahasiswa = [
  {
    id: "Beberapa sarana perkuliahan yang sudah lama perlu diperbaiki, seperti penggantian proyektor LCD yang sudah buram.",
    en: "Some older teaching facilities need repair, such as replacing blurry LCD projectors.",
  },
  {
    id: "Proses belajar mengajar yang lebih efektif dengan lebih banyak praktik.",
    en: "More effective teaching with more hands-on practice.",
  },
  {
    id: "Kemudahan komunikasi dengan dosen di luar kelas, baik pembimbingan maupun konsultasi akademik lainnya.",
    en: "Easier communication with lecturers outside class, for supervision and other academic consultation.",
  },
  {
    id: "Kesempatan melakukan praktik pembuatan akta secara terbimbing dan benar.",
    en: "Opportunities to practise deed drafting properly under guidance.",
  },
];

export const masukanDosen = [
  { id: "Materi perkuliahan harus sesuai dengan praktik kenotariatan.", en: "Course material must match notarial practice." },
  {
    id: "Referensi perkuliahan dan penelitian harus sesuai dengan bidang ilmu kenotariatan.",
    en: "Teaching and research references must fit the field of notarial law.",
  },
  {
    id: "Pengembangan diri berupa pelatihan, penelitian, dan pengabdian kepada masyarakat di bidang kenotariatan.",
    en: "Professional development through training, research, and community service in notarial law.",
  },
  { id: "Perbaikan fasilitas ruang kuliah.", en: "Improved classroom facilities." },
  { id: "Peningkatan kompetensi dosen.", en: "Improved lecturer competence." },
  {
    id: "Perbaikan kurikulum sesuai visi dan misi program studi, kebutuhan pemangku kepentingan, serta perkembangan hukum kenotariatan mutakhir.",
    en: "Curriculum revision in line with the programme's vision and mission, stakeholder needs, and current notarial law.",
  },
];

/** Tabel 8: pengelompokan saran menurut bidang perbaikan. */
export const kelompokSaran = [
  {
    bidang: { id: "Sarana dan prasarana", en: "Facilities" },
    pokok: {
      id: "Penggantian proyektor LCD yang buram dan perbaikan fasilitas ruang kuliah",
      en: "Replacing blurry LCD projectors and repairing classroom facilities",
    },
    penanggungJawab: { id: "Wakil Dekan bidang sarana", en: "Vice Dean for facilities" },
  },
  {
    bidang: { id: "Metode pembelajaran", en: "Teaching methods" },
    pokok: {
      id: "Penambahan porsi praktik, termasuk praktik pembuatan akta terbimbing",
      en: "More practice, including guided deed drafting",
    },
    penanggungJawab: { id: "Ketua Program Studi", en: "Head of Programme" },
  },
  {
    bidang: { id: "Layanan pembimbingan", en: "Supervision services" },
    pokok: {
      id: "Kemudahan komunikasi dan konsultasi akademik di luar kelas",
      en: "Easier communication and academic consultation outside class",
    },
    penanggungJawab: { id: "Dosen Pembimbing Akademik", en: "Academic advisors" },
  },
  {
    bidang: { id: "Kurikulum dan materi", en: "Curriculum and materials" },
    pokok: {
      id: "Kesesuaian materi dan referensi dengan praktik kenotariatan mutakhir",
      en: "Aligning materials and references with current notarial practice",
    },
    penanggungJawab: { id: "Tim Kurikulum Program Studi", en: "Programme Curriculum Team" },
  },
  {
    bidang: { id: "Pengembangan dosen", en: "Lecturer development" },
    pokok: {
      id: "Pelatihan, penelitian, dan pengabdian di bidang kenotariatan",
      en: "Training, research, and community service in notarial law",
    },
    penanggungJawab: { id: "Ketua Program Studi", en: "Head of Programme" },
  },
];

export const kesimpulanSurvei = [
  {
    id: "Penilaian mahasiswa terhadap kinerja dosen memperoleh rata-rata 4,59 dengan kategori Sangat Baik.",
    en: "Student ratings of lecturer performance averaged 4.59, rated Very Good.",
  },
  {
    id: "Kemampuan Pedagogik memperoleh rata-rata 4,86 dan Kompetensi Profesional 4,95, keduanya berkategori Sangat Baik.",
    en: "Pedagogical Competence averaged 4.86 and Professional Competence 4.95, both rated Very Good.",
  },
  {
    id: "Butir dengan skor terendah adalah kemampuan menghidupkan suasana kelas (4,21), yang sejalan dengan saran mahasiswa mengenai penambahan porsi praktik.",
    en: "The lowest-scoring item is making the class engaging (4.21), consistent with students' requests for more practice.",
  },
  {
    id: "Selisih antara penilaian mahasiswa dan penilaian diri dosen sebesar 0,07 poin, seluruhnya berada di dalam rentang wajar ±0,50.",
    en: "The gap between student ratings and lecturer self-ratings is 0.07 points, entirely within the acceptable ±0.50 range.",
  },
];

/**
 * Tabel 10: rencana tindak lanjut. Butir yang menyangkut pencatatan data survei
 * (kelengkapan data dosen, tingkat respons, rekapitulasi butir, evaluasi kinerja
 * program studi) tidak ditampilkan; yang tampil hanya tindak lanjut atas hasil.
 */
export const tindakLanjutSurvei = [
  {
    temuan: {
      id: "Kemampuan menghidupkan suasana kelas menjadi butir terendah",
      en: "Making the class engaging is the lowest-scoring item",
    },
    tindakan: {
      id: "Menambah porsi praktik dan diskusi kasus kenotariatan pada rencana pembelajaran",
      en: "Add more practice and notarial case discussions to course plans",
    },
    penanggungJawab: {
      id: "Ketua Program Studi bersama dosen pengampu",
      en: "Head of Programme with teaching lecturers",
    },
    tenggat: { id: "Semester berikutnya; skor butir tersebut naik", en: "Next semester; the item's score rises" },
  },
  {
    temuan: {
      id: "Saran perbaikan sarana perkuliahan",
      en: "Suggestions to improve teaching facilities",
    },
    tindakan: {
      id: "Mengajukan penggantian proyektor dan perbaikan ruang kuliah",
      en: "Request projector replacement and classroom repairs",
    },
    penanggungJawab: { id: "Ketua Program Studi", en: "Head of Programme" },
    // Kolom tenggat kosong pada laporan; kartu tidak menampilkan baris tenggat.
    tenggat: null,
  },
];
