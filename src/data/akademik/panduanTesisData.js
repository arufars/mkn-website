/**
 * Panduan Ujian Tesis (Pra Proposal, Proposal, dan Tesis) — MKn UNISSULA.
 *
 * SUMBER: dokumen resmi prodi "Panduan Ujian Tesis MKn UNISSULA.docx".
 * Seluruh klausul disalin verbatim, termasuk penanda sumber ketentuannya.
 *
 * DWIBAHASA: teks ditulis sebagai string biasa; pick() menerima bentuk ini dan
 * bisa dimigrasikan per-butir saat versi Inggris disiapkan.
 *
 * PERHATIAN: butir bertanda [Usulan] BELUM diatur dalam Pedoman Akademik dan
 * memerlukan penetapan Program Studi sebelum diberlakukan.
 */

export const metaDokumen = [
  {
    label: "Nama Dokumen",
    nilai: "Panduan Ujian Tesis (Pra Proposal, Proposal, dan Tesis)",
  },
  { label: "Program Studi", nilai: "Magister Kenotariatan (M.Kn.), Fakultas Hukum UNISSULA" },
  { label: "Bobot Tesis", nilai: "4 sks (HN268012001), ditempuh pada Semester IV" },
  {
    label: "CPL yang Ditopang",
    nilai:
      "CPL 2 (penguasaan ilmu dan berpikir kritis) dan CPL 4 (penelitian interdisipliner dan publikasi ilmiah)",
  },
  {
    label: "Dasar Penyusunan",
    nilai:
      "Buku Pedoman Akademik MKN Tahun 2021, Bab V tentang Perkuliahan, Ujian, dan Penilaian serta Penulisan Tesis",
  },
  { label: "Revisi / Tanggal", nilai: "01 / ............................" },
];

export const ketentuanUmum = [
  {
    teks:
      "Ujian dalam rangka penyelesaian Tesis meliputi Ujian Pra Proposal, Ujian Usulan Proposal Tesis, dan Ujian Tesis.",
    sumber: "Pedoman 2021",
  },
  {
    teks:
      "Kegiatan penyelesaian Tesis dihargai 4 (empat) sks sejak perencanaan, penyusunan, sampai dengan ujiannya, dengan lama penyelesaian dua semester.",
    sumber: "Pedoman 2021",
  },
  { teks: "Seluruh pembimbing Tesis bergelar Doktor.", sumber: "Pedoman 2021" },
  {
    teks:
      "Format penyusunan usulan penelitian dan penulisan Tesis mengacu pada Pedoman Penulisan Tesis yang ditetapkan Program Studi.",
    sumber: "Pedoman 2021",
  },
];

export const dasarPenyusunan = [
  { teks: "Undang-Undang Nomor 20 Tahun 2003 tentang Sistem Pendidikan Nasional;", sumber: "Peraturan" },
  { teks: "Undang-Undang Nomor 12 Tahun 2012 tentang Pendidikan Tinggi;", sumber: "Peraturan" },
  {
    teks:
      "Undang-Undang Nomor 2 Tahun 2014 tentang Perubahan atas Undang-Undang Nomor 30 Tahun 2004 tentang Jabatan Notaris;",
    sumber: "Peraturan",
  },
  {
    teks: "Peraturan Presiden Nomor 8 Tahun 2012 tentang Kerangka Kualifikasi Nasional Indonesia;",
    sumber: "Peraturan",
  },
  {
    teks:
      "Peraturan Menteri Pendidikan Tinggi, Sains, dan Teknologi Republik Indonesia Nomor 39 Tahun 2025 tentang Penjaminan Mutu Pendidikan Tinggi;",
    sumber: "Peraturan",
  },
  {
    teks:
      "Keputusan Rektor UNISSULA Nomor 8415/D.1/SA/IX/2025 tentang Pedoman Penyusunan Kurikulum Berbasis *Outcome-based Education* (OBE) Program Studi;",
    sumber: "Peraturan",
  },
  {
    teks:
      "Buku Pedoman Akademik Program Magister (S2) Kenotariatan Fakultas Hukum UNISSULA Tahun 2021;",
    sumber: "Pedoman 2021",
  },
  {
    teks:
      "Dokumen Kurikulum *Outcome Based Education* Program Studi Magister Kenotariatan UNISSULA Tahun 2026;",
    sumber: "Kurikulum OBE 2026",
  },
  {
    teks:
      "*Standards and Guidelines for Quality Assurance in the European Higher Education Area* (ESG) sebagai rujukan asesmen ACQUIN.",
    sumber: "Peraturan",
  },
];

export const tahapanKolom = [
  { id: "No.", en: "No." },
  { id: "Tahap", en: "Stage" },
  { id: "Uraian", en: "Description" },
  { id: "Luaran", en: "Output" },
];
export const tahapanBaris = [
  [
    "1",
    { id: "Pengajuan Judul", en: "Submission of the Title" },
    {
      id:
        "Mahasiswa yang telah menyelesaikan kuliah Semester II mengajukan judul usulan " +
        "Proposal Tesis kepada Ketua Program Studi c.q. Sekretaris Program Studi",
      en:
        "Students who have completed Semester II submit a proposed thesis title to the Head of " +
        "the Study Programme through the Secretary of the Study Programme",
    },
    {
      id: "Judul disetujui Tim Penjamin Mutu Tesis",
      en: "The title is approved by the Thesis Quality Assurance Team",
    },
  ],
  
  [
    "2",
    { id: "Ujian Pra Proposal", en: "Pre-Proposal Examination" },
    {
      id: "Ujian berupa bimbingan atas kerangka berpikir proposal dan tesis",
      en:
        "An examination in the form of supervision on the conceptual framework of the proposal " +
        "and thesis",
    },
    {
      id: "Berita acara dan catatan perbaikan",
      en: "Minutes of the examination and a record of revisions",
    },
  ],
  [
    "3",
    { id: "Penetapan Pembimbing", en: "Appointment of the Supervisor" },
    {
      id:
        "Sekretaris Bidang Akademik menetapkan dosen pembimbing dan dimintakan persetujuan " +
        "Ketua Program",
      en:
        "The Secretary for Academic Affairs appoints the supervisor, subject to the approval of " +
        "the Head of the Programme",
    },
    { id: "Surat penetapan pembimbing", en: "Letter appointing the supervisor" },
  ],
  [
    "4",
    { id: "Penyusunan Proposal", en: "Writing the Proposal" },
    {
      id: "Mahasiswa menyusun usulan penelitian di bawah bimbingan dosen pembimbing",
      en: "The student writes the research proposal under the supervisor's guidance",
    },
    {
      id: "Draf proposal disetujui pembimbing",
      en: "A draft proposal approved by the supervisor",
    },
  ],
  [
    "5",
    { id: "Ujian Proposal", en: "Proposal Examination" },
    {
      id: "Diseminarkan di hadapan sekurang-kurangnya 3 orang penguji",
      en: "Presented in a seminar before at least three examiners",
    },
    {
      id: "Berita acara dan nilai proposal",
      en: "Minutes of the examination and the proposal mark",
    },
  ],
  [
    "6",
    { id: "Pelaksanaan Penelitian", en: "Conducting the Research" },
    {
      id:
        "Mahasiswa melakukan penelitian setelah usulan disetujui penguji dan mengurus " +
        "perizinan penelitian",
      en:
        "The student conducts the research once the proposal is approved by the examiners, and " +
        "obtains the necessary research permits",
    },
    { id: "Data penelitian", en: "Research data" },
  ],
  [
    "7",
    { id: "Penulisan Tesis", en: "Writing the Thesis" },
    {
      id: "Penulisan di bawah bimbingan dosen pembimbing",
      en: "Writing carried out under the supervisor's guidance",
    },
    { id: "Naskah Tesis", en: "Thesis manuscript" },
  ],
  [
    "8",
    { id: "Ujian Tesis", en: "Thesis Examination" },
    {
      id: "Seminar terbuka di hadapan sekurang-kurangnya 3 orang penguji",
      en: "An open seminar before at least three examiners",
    },
    { id: "Berita acara dan nilai Tesis", en: "Minutes of the examination and the thesis mark" },
  ],
];

/* ── 4. Ujian Pra Proposal ─────────────────────────────────────────────── */
export const praProposal = [
  {
    teks:
      "Ujian Pra Proposal dapat dilaksanakan setelah judul penelitian yang diajukan mahasiswa disetujui oleh Sekretaris Program Studi dan diketahui oleh Ketua Program Studi.",
    sumber: "Pedoman 2021",
  },
  {
    teks:
      "Ujian Pra Proposal berupa bimbingan untuk membangun kerangka berpikir proposal maupun tesis yang akan ditulis, dengan tujuan memudahkan mahasiswa menyusun tesis.",
    sumber: "Pedoman 2021",
  },
  {
    teks:
      "Isi pra proposal memuat judul, latar belakang singkat yang menjelaskan ketidaksesuaian antara *das sein* dan *das sollen*, rumusan masalah, kerangka teori, dan metode pendekatan yang akan digunakan.",
    sumber: "Pedoman 2021",
  },
  {
    teks:
      "Setelah Ujian Pra Proposal dilaksanakan, Sekretaris Program Studi menunjuk pembimbing yang akan membantu mahasiswa menulis Proposal Tesis dan Tesis.",
    sumber: "Pedoman 2021",
  },
  {
    teks:
      "Mahasiswa yang telah memiliki ijazah Spesialis Kenotariatan (Sp.N.) atau berasal dari Notaris dan telah menyelesaikan kuliah Semester I dapat mengajukan judul usulan Proposal Tesis.",
    sumber: "Pedoman 2021",
  },
];

/* ── 5. Ujian Usulan Proposal Tesis ────────────────────────────────────── */
export const usulanProposal = [
  {
    teks:
      "Ujian Usulan Proposal Tesis hanya dapat dilakukan setelah usulan disetujui oleh Pembimbing Tesis dan diketahui oleh Ketua Program Studi, mengenai materi Ilmu Kenotariatan.",
    sumber: "Pedoman 2021",
  },
  {
    teks:
      "Pelaksanaan ujian dilakukan dengan cara diseminarkan, dihadiri sekurang-kurangnya 3 orang penguji termasuk pembimbing Tesis, terdiri atas 2 orang bukan pembimbing sebagai Ketua Tim Penguji dan anggota, serta 1 orang pembimbing sebagai anggota tim penguji.",
    sumber: "Pedoman 2021",
  },
  {
    teks:
      "Penilaian terhadap usulan Proposal Tesis mencakup kesatuan konstruksi pemikiran yang meliputi latar belakang masalah, rumusan masalah, tujuan penulisan, kerangka konseptual, kerangka teori, metode penelitian, sistematika penulisan, dan kepustakaan.",
    sumber: "Pedoman 2021",
  },
  {
    teks: "Penilaian juga mencakup penguasaan materi Proposal Tesis yang berkaitan dengan Ilmu Kenotariatan.",
    sumber: "Pedoman 2021",
  },
  { teks: "Mahasiswa dinyatakan lulus apabila memperoleh nilai sekurang-kurangnya B.", sumber: "Pedoman 2021" },
];

/* ── 6. Ujian Tesis ────────────────────────────────────────────────────── */
export const tesisPersyaratan = [
  { teks: "Seluruh mata kuliah yang diambil oleh peserta telah lulus;", sumber: "Pedoman 2021" },
  {
    teks: "Penulisan Tesis telah disetujui oleh pembimbing Tesis dan diketahui Ketua Program Studi;",
    sumber: "Pedoman 2021",
  },
  { teks: "Telah menyerahkan salinan sertifikat kegiatan ilmiah dan Kuliah Kerja Lapangan;", sumber: "Pedoman 2021" },
  {
    teks: "Telah menyerahkan salinan Sertifikat TOEFL LIKE dengan nilai sekurang-kurangnya 525;",
    sumber: "Pedoman 2021",
  },
  { teks: "Telah menyerahkan salinan publikasi karya ilmiah pada jurnal cetak maupun daring;", sumber: "Pedoman 2021" },
  {
    teks:
      "Telah mendapatkan rekomendasi dari Lembaga Penjamin Mutu Tesis tentang kelayakan persyaratan tesis;",
    sumber: "Pedoman 2021",
  },
  { teks: "Telah menyelesaikan kewajiban administrasi dan keuangan;", sumber: "Pedoman 2021" },
  {
    teks:
      "Telah menyerahkan salinan Sertifikat Magang sebagaimana diatur dalam Panduan Magang dan Ujian Magang.",
    sumber: "Pedoman 2021",
  },
];

export const tesisTimPenguji = [
  {
    teks:
      "Pelaksanaan Ujian Tesis dilakukan dengan cara seminar terbuka yang dihadiri sekurang-kurangnya 3 orang penguji.",
    sumber: "Pedoman 2021",
  },
  {
    teks:
      "Tim penguji terdiri atas 1 (satu) orang Ketua Penguji yang berasal dari luar komisi pembimbing atau penguji eksternal yang sesuai kompetensi dan memenuhi syarat jenjang kepangkatan akademik, serta 2 (dua) orang anggota yang terdiri atas Pembimbing dan Penguji.",
    sumber: "Pedoman 2021",
  },
  {
    teks:
      "Tim penguji disyaratkan memiliki jabatan fungsional sekurang-kurangnya Lektor dan bergelar Doktor (S3) Ilmu Hukum.",
    sumber: "Pedoman 2021",
  },
];

export const penilaianKolom = ["No.", "Komponen Penilaian", "Bobot", "Aspek yang Dinilai"];
export const penilaianBaris = [
  [
    "1",
    "Konsistensi konstruksi pemikiran dari pendahuluan sampai dengan penutup",
    "25%",
    "Keterhubungan latar belakang, rumusan masalah, pembahasan, dan simpulan",
  ],
  ["2", "Orisinalitas hasil penelitian", "20%", "Kebaruan dan kontribusi terhadap ilmu kenotariatan"],
  ["3", "Metode penulisan", "15%", "Ketepatan metode penelitian hukum dan teknik penulisan ilmiah"],
  ["4", "Kajian pustaka", "15%", "Kemutakhiran, relevansi, dan kedalaman rujukan"],
  ["5", "Penguasaan materi", "25%", "Ketepatan dan kedalaman jawaban atas pertanyaan penguji"],
  ["", "Jumlah", "100%", ""],
];

export const penilaianButir = [
  {
    teks:
      "Lima komponen penilaian tersebut ditetapkan dalam Pedoman Akademik; pembobotan pada kolom ketiga merupakan usulan agar penilaian antarpenguji seragam.",
    sumber: "Usulan",
  },
  {
    teks: "Mahasiswa dinyatakan lulus Ujian Tesis apabila memperoleh nilai sekurang-kurangnya B.",
    sumber: "Pedoman 2021",
  },
];

/* ── 7. Tata Tertib Ujian ──────────────────────────────────────────────── */
export const tesisLuring = [
  { teks: "Peserta hadir 15 menit sebelum ujian dimulai.", sumber: "Pedoman 2021" },
  {
    teks:
      "Peserta pria mengenakan baju putih, berdasi, celana hitam, dan jas almamater; peserta wanita mengenakan baju putih, rok hitam, jas almamater, dan kerudung merah.",
    sumber: "Pedoman 2021",
  },
  {
    teks: "Peserta menyiapkan naskah Tesis dan bahan presentasi dalam jumlah yang cukup bagi seluruh penguji.",
    sumber: "Usulan",
  },
];

export const tesisDaring = [
  { teks: "Peserta memperoleh jadwal ujian tesis 3 (tiga) hari sebelum ujian dilaksanakan.", sumber: "Pedoman 2021" },
  {
    teks:
      "Pelaksanaan ujian melalui *zoom meeting*; peserta memperoleh tautan atau ID *zoom meeting* 30 menit sebelum ujian dilaksanakan.",
    sumber: "Pedoman 2021",
  },
  { teks: "Peserta mengenakan pakaian sebagaimana ketentuan ujian luring.", sumber: "Pedoman 2021" },
  { teks: "Peserta menyiapkan bahan presentasi untuk ujian tesis.", sumber: "Pedoman 2021" },
  {
    teks: "Peserta memastikan perangkat komputer, laptop, atau ponsel tersambung dengan internet.",
    sumber: "Pedoman 2021",
  },
  {
    teks:
      "Saat bergabung, peserta menggunakan nama lengkap, wajib menyalakan video, menjaga agar suara dari luar tidak masuk ke ruang *zoom*, serta menjaga sopan santun.",
    sumber: "Pedoman 2021",
  },
];

/* ── 8. Perbaikan, Yudisium, dan Predikat ──────────────────────────────── */
export const perbaikanYudisium = [
  {
    teks:
      "Peserta yang dinyatakan lulus dengan perbaikan wajib menyelesaikan perbaikan dan memperoleh tanda tangan seluruh penguji paling lambat 30 hari kalender setelah ujian.",
    sumber: "Usulan",
  },
  {
    teks:
      "Yudisium adalah keputusan rapat akademik tentang kelulusan program pendidikan seorang mahasiswa beserta predikatnya, yang diumumkan pada setiap akhir semester.",
    sumber: "Pedoman 2021",
  },
  {
    teks:
      "Predikat Dengan Pujian (*Cum Laude*) hanya diberikan kepada peserta yang menyelesaikan studi dalam waktu paling lama 2 (dua) tahun dengan nilai Ujian Tesis A, dihitung sejak tanggal pendaftaran resmi sebagai mahasiswa sampai dinyatakan lulus Ujian Tesis.",
    sumber: "Pedoman 2021",
  },
  {
    teks:
      "Peserta yang telah dinyatakan lulus berhak mengikuti wisuda setelah menyerahkan Tesis yang telah diperbaiki dan ditandatangani Pembimbing, Penguji, dan Ketua Program Studi, serta menyelesaikan seluruh kewajiban administrasi dan keuangan.",
    sumber: "Pedoman 2021",
  },
];

export const lampiranA = {
  kode: "Lampiran A",
  judul: "Format Berita Acara Ujian Tesis",
  isian: [
    "Nama Mahasiswa / NIM",
    "Judul Tesis",
    "Hari, Tanggal / Waktu",
    "Tempat / Moda",
    "Ketua Penguji",
    "Anggota Penguji I",
    "Anggota Penguji II (Pembimbing)",
  ],
  catatan:
    "Disertai tabel komponen penilaian beserta kolom Nilai (0–100) dan Nilai Terbobot, keputusan tim penguji (lulus tanpa perbaikan / lulus dengan perbaikan / tidak lulus), serta kolom Catatan Perbaikan.",
};

/* ══════════════════════════════════════════════════════════════════════════
   RINGKASAN UNTUK HALAMAN WEB
   ══════════════════════════════════════════════════════════════════════════ */

export const sorotTesis = [
  { angka: "4 sks", label: { id: "Bobot tesis", en: "Thesis credit weight" } },
  { angka: "IV", label: { id: "Semester penempuhan", en: "Semester taken" } },
  { angka: "2", label: { id: "Semester waktu penyelesaian", en: "Semesters to complete" } },
  { angka: "B", label: { id: "Nilai minimum kelulusan", en: "Minimum pass mark" } },
];

/**
 * Alur delapan tahap diturunkan dari tabel tahapan pada transkripsi verbatim,
 * sehingga terjemahannya cukup ditulis sekali di sana.
 */
export const alurTahap = tahapanBaris.map((r) => ({
  tahap: r[1],
  uraian: r[2],
  luaran: r[3],
}));

export const tigaUjian = [
  {
    tanda: "1",
    judul: { id: "Ujian Pra Proposal", en: "Pre-Proposal Examination" },
    keterangan: {
      id: "Bimbingan untuk membangun kerangka berpikir proposal dan tesis.",
      en: "Supervision aimed at building the conceptual framework for the proposal and thesis.",
    },
    rincian: [
      {
        id: "Setelah judul disetujui Sekretaris Program Studi",
        en: "After the title is approved by the Secretary of the Study Programme",
      },
    ],
  },
  {
    tanda: "2",
    judul: { id: "Ujian Usulan Proposal", en: "Thesis Proposal Examination" },
    keterangan: {
      id: "Diseminarkan di hadapan sekurang-kurangnya tiga orang penguji.",
      en: "Presented in a seminar before at least three examiners.",
    },
    rincian: [
      {
        id: "Lulus bila memperoleh nilai sekurang-kurangnya B",
        en: "Passed on obtaining a mark of at least B",
      },
    ],
  },
  {
    tanda: "3",
    judul: { id: "Ujian Tesis", en: "Thesis Examination" },
    keterangan: {
      id: "Seminar terbuka di hadapan sekurang-kurangnya tiga orang penguji.",
      en: "An open seminar before at least three examiners.",
    },
    rincian: [
      {
        id: "Lulus bila memperoleh nilai sekurang-kurangnya B",
        en: "Passed on obtaining a mark of at least B",
      },
    ],
  },
];

export const praProposalRingkas = {
  isi: [
    { id: "Judul penelitian", en: "The research title" },
    {
      id: "Latar belakang singkat yang menjelaskan ketidaksesuaian *das sein* dan *das sollen*",
      en: "A brief background explaining the mismatch between das sein and das sollen",
    },
    { id: "Rumusan masalah", en: "The research questions" },
    { id: "Kerangka teori", en: "The theoretical framework" },
    { id: "Metode pendekatan yang akan digunakan", en: "The approach to be used" },
  ],
  catatan: [
    {
      tanda: "A",
      judul: { id: "Syarat Pelaksanaan", en: "Conditions for Holding the Examination" },
      keterangan: {
        id:
          "Judul penelitian telah disetujui Sekretaris Program Studi dan diketahui Ketua " +
          "Program Studi.",
        en:
          "The research title has been approved by the Secretary of the Study Programme and " +
          "noted by the Head of the Study Programme.",
      },
    },
    {
      tanda: "B",
      judul: { id: "Setelah Ujian", en: "After the Examination" },
      keterangan: {
        id:
          "Sekretaris Program Studi menunjuk pembimbing yang akan membantu penulisan Proposal " +
          "Tesis dan Tesis.",
        en:
          "The Secretary of the Study Programme appoints the supervisor who will assist with " +
          "writing the Thesis Proposal and the Thesis.",
      },
    },
    {
      tanda: "C",
      judul: { id: "Jalur Khusus", en: "Special Route" },
      keterangan: {
        id:
          "Pemegang ijazah Spesialis Kenotariatan (Sp.N.) atau Notaris dapat mengajukan judul " +
          "setelah Semester I.",
        en:
          "Holders of a Notarial Specialist (Sp.N.) qualification, or practising Notaries, may " +
          "submit a title after Semester I.",
      },
    },
  ],
};

export const proposalRingkas = {
  penguji: {
    id:
      "Diseminarkan di hadapan sekurang-kurangnya 3 orang penguji: 2 orang bukan pembimbing " +
      "sebagai Ketua Tim Penguji dan anggota, serta 1 orang pembimbing sebagai anggota.",
    en:
      "Presented in a seminar before at least three examiners: two non-supervisors serving as " +
      "Chair of the Examining Board and as a member, and one supervisor serving as a member.",
  },
  dinilai: [
    {
      id: "Latar belakang dan rumusan masalah",
      en: "Background and formulation of the research questions",
    },
    { id: "Tujuan penulisan", en: "Aims of the study" },
    {
      id: "Kerangka konseptual dan kerangka teori",
      en: "Conceptual and theoretical frameworks",
    },
    { id: "Metode penelitian", en: "Research methods" },
    {
      id: "Sistematika penulisan dan kepustakaan",
      en: "Structure of the writing and the bibliography",
    },
    {
      id: "Penguasaan materi Ilmu Kenotariatan",
      en: "Command of the subject matter of notarial science",
    },
  ],
};

export const tesisSyaratRingkas = [
  { id: "Seluruh mata kuliah telah lulus", en: "All courses have been passed" },
  {
    id: "Penulisan tesis disetujui pembimbing dan diketahui Ketua Program Studi",
    en:
      "The thesis has been approved by the supervisor and noted by the Head of the Study " +
      "Programme",
  },
  {
    id: "Sertifikat kegiatan ilmiah dan Kuliah Kerja Lapangan",
    en: "Certificates for academic events and the field study programme",
  },
  {
    id: "Sertifikat TOEFL LIKE dengan nilai sekurang-kurangnya 525",
    en: "A TOEFL-LIKE certificate with a score of at least 525",
  },
  {
    id: "Publikasi karya ilmiah pada jurnal cetak maupun daring",
    en: "A scholarly publication in a print or online journal",
  },
  {
    id: "Rekomendasi Lembaga Penjamin Mutu Tesis",
    en: "A recommendation from the Thesis Quality Assurance Body",
  },
  {
    id: "Kewajiban administrasi dan keuangan telah diselesaikan",
    en: "Administrative and financial obligations have been settled",
  },
  {
    id: "Sertifikat Magang sesuai Panduan Magang dan Ujian Magang",
    en:
      "An Internship Certificate in accordance with the Internship and Internship Examination " +
      "Guidelines",
  },
];

export const timPengujiRingkas = [
  {
    tanda: "1",
    judul: { id: "Ketua Penguji", en: "Chair of Examiners" },
    keterangan: {
      id:
        "Berasal dari luar komisi pembimbing atau penguji eksternal yang sesuai kompetensi dan " +
        "memenuhi syarat kepangkatan akademik.",
      en:
        "Drawn from outside the supervisory committee, or an external examiner of appropriate " +
        "competence meeting the academic rank requirements.",
    },
  },
  {
    tanda: "2",
    judul: { id: "Dua Anggota", en: "Two Members" },
    keterangan: {
      id: "Terdiri atas Pembimbing dan Penguji.",
      en: "Comprising the Supervisor and an Examiner.",
    },
  },
  {
    tanda: "3",
    judul: { id: "Syarat Penguji", en: "Examiner Requirements" },
    keterangan: {
      id: "Jabatan fungsional sekurang-kurangnya Lektor dan bergelar Doktor (S3) Ilmu Hukum.",
      en:
        "An academic rank of at least Lector and a Doctorate (S3) in Law.",
    },
  },
];

export const komponenPenilaian = [
  // Urutan mengikuti Tabel 6.3 dokumen sumber, bukan diurutkan menurut bobot,
  // agar penomorannya tetap cocok saat dibandingkan dengan dokumen.
  {
    nama: { id: "Konsistensi konstruksi pemikiran", en: "Consistency of reasoning" },
    bobot: 25,
    aspek: {
      id: "Keterhubungan latar belakang, rumusan masalah, pembahasan, dan simpulan",
      en: "Coherence between background, research questions, discussion, and conclusions",
    },
  },
  {
    nama: { id: "Orisinalitas hasil penelitian", en: "Originality of findings" },
    bobot: 20,
    aspek: {
      id: "Kebaruan dan kontribusi terhadap ilmu kenotariatan",
      en: "Novelty and contribution to notarial scholarship",
    },
  },
  {
    nama: { id: "Metode penulisan", en: "Method and writing" },
    bobot: 15,
    aspek: {
      id: "Ketepatan metode penelitian hukum dan teknik penulisan ilmiah",
      en: "Soundness of legal research method and scholarly writing technique",
    },
  },
  {
    nama: { id: "Kajian pustaka", en: "Literature review" },
    bobot: 15,
    aspek: {
      id: "Kemutakhiran, relevansi, dan kedalaman rujukan",
      en: "Currency, relevance, and depth of the sources",
    },
  },
  {
    nama: { id: "Penguasaan materi", en: "Command of the subject" },
    bobot: 25,
    aspek: {
      id: "Ketepatan dan kedalaman jawaban atas pertanyaan penguji",
      en: "Accuracy and depth of answers to the examiners’ questions",
    },
  },
];

export const tataTertibRingkas = [
  {
    tanda: "L",
    judul: { id: "Ujian Luring", en: "On-campus Examination" },
    rincian: [
      {
        id: "Hadir 15 menit sebelum ujian dimulai",
        en: "Arrive 15 minutes before the examination begins",
      },
      {
        id: "Pria: baju putih, berdasi, celana hitam, jas almamater",
        en: "Men: white shirt, tie, black trousers, university blazer",
      },
      {
        id: "Wanita: baju putih, rok hitam, jas almamater, kerudung merah",
        en: "Women: white blouse, black skirt, university blazer, red headscarf",
      },
      {
        id: "Menyiapkan naskah tesis dan bahan presentasi bagi seluruh penguji",
        en: "Prepare the thesis manuscript and presentation materials for every examiner",
      },
    ],
  },
  {
    tanda: "D",
    judul: { id: "Ujian Daring", en: "Online Examination" },
    rincian: [
      {
        id: "Jadwal diterima 3 hari sebelum ujian",
        en: "The schedule is received three days before the examination",
      },
      {
        id: "Tautan *zoom meeting* diterima 30 menit sebelum ujian",
        en: "The Zoom meeting link is received 30 minutes before the examination",
      },
      {
        id: "Menggunakan nama lengkap dan wajib menyalakan video",
        en: "Use your full name and keep your camera on",
      },
      {
        id: "Pakaian mengikuti ketentuan ujian luring",
        en: "Dress follows the rules for on-campus examinations",
      },
    ],
  },
];

export const yudisiumRingkas = [
  {
    tanda: "1",
    judul: { id: "Perbaikan", en: "Revisions" },
    keterangan: {
      id:
        "Lulus dengan perbaikan wajib menyelesaikan revisi dan memperoleh tanda tangan seluruh " +
        "penguji paling lambat 30 hari kalender setelah ujian.",
      en:
        "A pass with revisions requires the revisions to be completed and signed off by every " +
        "examiner no later than 30 calendar days after the examination.",
    },
  },
  {
    tanda: "2",
    judul: { id: "Yudisium", en: "Yudisium (Final Assessment Board)" },
    keterangan: {
      id:
        "Keputusan rapat akademik tentang kelulusan beserta predikatnya, diumumkan setiap akhir " +
        "semester.",
      en:
        "The academic board’s decision on graduation and its distinction, announced at the end " +
        "of each semester.",
    },
  },
  {
    tanda: "3",
    judul: { id: "Predikat Cum Laude", en: "Cum Laude Distinction" },
    keterangan: {
      id:
        "Hanya bagi yang menyelesaikan studi paling lama 2 tahun dengan nilai Ujian Tesis A, " +
        "dihitung sejak pendaftaran resmi.",
      en:
        "Only for those completing their studies within two years with a grade of A in the " +
        "Thesis Examination, counted from official registration.",
    },
  },
];

/**
 * Halaman formulir pengajuan judul dan pendaftaran ujian tesis (berkata sandi).
 * Dirujuk dari Panduan Akademik dan dari Panduan Ujian Tesis.
 */
export const rutePendaftaranTesis = "/akademik/panduan-akademik/pendaftaran-tesis";

/** Ringkasan pendaftaran yang ditampilkan di Panduan Ujian Tesis. */
export const infoPendaftaranTesis = {
  judul: {
    id: "Pengajuan Judul & Pendaftaran Ujian",
    en: "Title Submission & Examination Registration",
  },
  keterangan: {
    id:
      "Pengajuan judul tesis serta pendaftaran ujian pra proposal, proposal, dan tesis " +
      "dilakukan secara daring melalui formulir yang tersedia di halaman Panduan Akademik. " +
      "Halaman tersebut khusus mahasiswa dan dibuka dengan kata sandi yang dibagikan " +
      "bagian akademik.",
    en:
      "Thesis title submission and registration for the pre-proposal, proposal, and " +
      "thesis examinations are done online through the forms on the Academic Guidelines " +
      "page. That page is for students only and is opened with a password shared by the " +
      "academic office.",
  },
  tombol: {
    id: "Ke Halaman Pendaftaran",
    en: "Go to Registration",
  },
};

/** Teks halaman Panduan Ujian Tesis dan ketiga tab anaknya. */
export const halamanTesis = {
  meta: {
    title: {
      id: "Panduan Ujian Tesis | MKn UNISSULA",
      en: "Thesis Examination Guidelines | MKn UNISSULA",
    },
    description: {
      id:
        "Panduan ujian pra proposal, usulan proposal, dan tesis Program Studi Magister " +
        "Kenotariatan UNISSULA — alur, syarat, tim penguji, dan penilaian.",
      en:
        "Guidelines for the pre-proposal, proposal, and thesis examinations at the UNISSULA " +
        "Master of Notarial Law Study Programme — stages, requirements, examining board, and " +
        "assessment.",
    },
  },
  tab: {
    praProposal: { id: "Pra Proposal", en: "Pre-Proposal" },
    proposal: { id: "Proposal", en: "Proposal" },
    tesis: { id: "Tesis", en: "Thesis" },
  },
  seksi: {
    alur: { id: "Alur Delapan Tahap", en: "The Eight Stages" },
    tigaUjian: { id: "Tiga Ujian", en: "Three Examinations" },
    isiPraProposal: { id: "Isi Pra Proposal", en: "Contents of the Pre-Proposal" },
    isiPraProposalKeterangan: {
      id:
        "Pra proposal adalah bimbingan untuk membangun kerangka berpikir sebelum proposal " +
        "disusun. Naskahnya memuat lima hal berikut.",
      en:
        "The pre-proposal is a supervision stage for building the conceptual framework before " +
        "the proposal is written. Its text covers the following five points.",
    },
    ketentuanPelaksanaan: { id: "Ketentuan Pelaksanaan", en: "Rules of Procedure" },
    timPenguji: { id: "Susunan Tim Penguji", en: "Composition of the Examining Board" },
    yangDinilai: { id: "Yang Dinilai", en: "What Is Assessed" },
    yangDinilaiKeterangan: {
      id:
        "Penilaian mencakup kesatuan konstruksi pemikiran serta penguasaan materi. Mahasiswa " +
        "dinyatakan lulus apabila memperoleh nilai sekurang-kurangnya B.",
      en:
        "Assessment covers the coherence of the reasoning and command of the subject matter. A " +
        "student passes on obtaining a mark of at least B.",
    },
    syaratTesis: { id: "Delapan Syarat Ujian Tesis", en: "Eight Requirements for the Thesis Examination" },
    syaratTesisKeterangan: {
      id: "Ujian tesis hanya dapat dilaksanakan apabila seluruh syarat berikut telah dipenuhi.",
      en: "The thesis examination may be held only once all of the following are satisfied.",
    },
    timPengujiTesis: { id: "Tim Penguji", en: "Examining Board" },
    timPengujiTesisKeterangan: {
      id: "Ujian berbentuk seminar terbuka di hadapan sekurang-kurangnya tiga orang penguji.",
      en: "The examination takes the form of an open seminar before at least three examiners.",
    },
    komponen: { id: "Komponen Penilaian", en: "Assessment Components" },
    komponenKeterangan: {
      id:
        "Lima komponen penilaian beserta bobotnya. Mahasiswa dinyatakan lulus apabila " +
        "memperoleh nilai sekurang-kurangnya B.",
      en:
        "The five assessment components and their weights. A student passes on obtaining a mark " +
        "of at least B.",
    },
    tataTertib: { id: "Tata Tertib Ujian", en: "Examination Rules" },
    yudisium: { id: "Perbaikan, Yudisium, dan Predikat", en: "Revisions, Yudisium, and Distinction" },
    contohTesis: { id: "Contoh Tesis", en: "Thesis Examples" },
    contohTesisKeterangan: {
      id: "Berikut contoh tesis mahasiswa MKn UNISSULA yang dapat dijadikan referensi penulisan.",
      en: "The following are thesis examples from MKn UNISSULA students that may serve as writing references.",
    },
  },
  namaDokumen: { id: "Panduan Ujian Tesis", en: "Thesis Examination Guidelines" },
};

/**
 * Contoh file tesis yang dapat diunduh. File PDF disimpan di public/pdf/tesis/.
 */
export const contohTesis = [
  {
    id: "ct-1",
    judul: {
      id: "Keabsahan Tanda Tangan Elektronik pada Pembuatan Akta Notaris dalam Perspektif Hukum Positif di Indonesia",
      en: "Validity of Electronic Signatures in the Making of Notarial Deeds from the Perspective of Indonesian Positive Law",
    },
    tahun: "2024",
    href: "/pdf/tesis/contoh-tesis-keabsahan-tte-akta-notaris.pdf",
  },
];

