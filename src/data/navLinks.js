/**
 * @typedef {Object} NavItem
 * @property {{ id: string, en: string }} title
 * @property {string} href
 * @property {NavItem[]} [children]
 */

/**
 * Struktur menu situs, dwibahasa.
 *
 * `title` selalu berbentuk { id, en } dan dibaca dengan useT(). Jangan memakai
 * `title` sebagai kunci React atau kunci state — pakai `href`, karena `title`
 * kini objek dan tidak lagi unik sebagai string.
 *
 * Judul yang memang sudah berbahasa Inggris pada versi Indonesia (Quality
 * Assurance, Tracer Study, Student Research Center, Download) sengaja ditulis
 * sama di kedua kolom, bukan diterjemahkan balik.
 */
export const navLinks = [
  {
    title: { id: "BERANDA", en: "HOME" },
    href: "/",
  },
  {
    title: { id: "PROFIL", en: "PROFILE" },
    href: "/profil",
    children: [
      {
        title: { id: "Sejarah / Latar Belakang", en: "History / Background" },
        href: "/profil/sejarah",
      },
      { title: { id: "Visi", en: "Vision" }, href: "/profil/visi-misi" },
      {
        title: { id: "Tujuan Pendidikan (PEO)", en: "Educational Objectives (PEO)" },
        href: "/profil/tujuan",
      },
      {
        title: { id: "Struktur Organisasi", en: "Organisational Structure" },
        href: "/profil/struktur-organisasi",
      },
    ],
  },
  {
    title: { id: "BERITA", en: "NEWS" },
    href: "/berita",
  },
  {
    title: { id: "AKADEMIK", en: "ACADEMIC" },
    href: "/akademik",
    children: [
      {
        title: { id: "Profil Lulusan", en: "Graduate Profiles" },
        href: "/akademik/profil-lulusan",
      },
      {
        title: { id: "Capaian Pembelajaran Lulusan", en: "Intended Learning Outcomes" },
        href: "/akademik/capaian-pembelajaran",
      },
      { title: { id: "Kurikulum", en: "Curriculum" }, href: "/akademik/kurikulum" },
      {
        title: { id: "RPS & Evaluasi Pembelajaran", en: "Learning Plans & Evaluation" },
        href: "/akademik/pembelajaran",
        children: [
          {
            title: { id: "RPS", en: "Semester Learning Plan (RPS)" },
            href: "/akademik/pembelajaran/rps",
          },
          {
            title: {
              id: "Panduan Evaluasi Pembelajaran",
              en: "Learning Evaluation Guidelines",
            },
            href: "/akademik/pembelajaran/panduan-evaluasi",
          },
        ],
      },
      {
        title: { id: "Panduan Akademik", en: "Academic Guidelines" },
        href: "/akademik/panduan-akademik",
      },
      {
        title: { id: "Panduan Ujian", en: "Examination Guidelines" },
        href: "/akademik/panduan-ujian",
        children: [
          {
            title: { id: "UTS/UAS", en: "Midterm & Final Examinations" },
            href: "/akademik/panduan-ujian/uts-uas",
          },
          {
            title: { id: "Tesis", en: "Thesis" },
            href: "/akademik/panduan-ujian/tesis",
            children: [
              {
                title: { id: "Pra Proposal", en: "Pre-Proposal" },
                href: "/akademik/panduan-ujian/tesis/pra-proposal",
              },
              {
                title: { id: "Proposal", en: "Proposal" },
                href: "/akademik/panduan-ujian/tesis/proposal",
              },
              {
                title: { id: "Tesis", en: "Thesis" },
                href: "/akademik/panduan-ujian/tesis/ujian-tesis",
              },
            ],
          },
        ],
      },
      {
        title: { id: "Kalender Akademik", en: "Academic Calendar" },
        href: "/akademik/kalender",
      },
      {
        title: { id: "E-Learning", en: "Academic Information System" },
        href: "/akademik/sistem-informasi",
      },
      {
        title: { id: "E-Journal", en: "Journals" },
        href: "/akademik/jurnal",
      },
      {
        title: { id: "E-Library", en: "Library" },
        href: "/akademik/perpustakaan",
      },
    ],
  },
  {
    title: { id: "MAHASISWA", en: "STUDENTS" },
    href: "/mahasiswa",
    children: [
      {
        title: { id: "Organisasi", en: "Student Organisations" },
        href: "/mahasiswa/organisasi",
      },
      { title: { id: "Prestasi", en: "Achievements" }, href: "/mahasiswa/prestasi" },
      { title: { id: "Akomodasi", en: "Accommodation" }, href: "/mahasiswa/akomodasi" },
    ],
  },
  {
    title: { id: "ALUMNI", en: "ALUMNI" },
    href: "/alumni",
    children: [
      { title: { id: "Ikanotsula", en: "Ikanotsula" }, href: "/alumni/ikanotsula" },
      { title: { id: "Reuni", en: "Reunion" }, href: "/alumni/reuni" },
      { title: { id: "Penelusuran Alumni", en: "Tracer Study" }, href: "/alumni/tracer-study" },
      { title: { id: "Pusat Karir", en: "Career Centre" }, href: "/alumni/pusat-karir" },
      { title: { id: "Lowongan Pekerjaan", en: "Job Vacancies" }, href: "/alumni/lowongan" },
    ],
  },
  {
    title: { id: "INFORMASI", en: "INFORMATION" },
    href: "/informasi",
    children: [
      {
        title: { id: "Penerimaan Mahasiswa", en: "Admissions" },
        href: "/informasi/penerimaan-mahasiswa",
      },
      {
        title: { id: "Tingkat Kelulusan", en: "Graduation Rates" },
        href: "/informasi/tingkat-kelulusan",
      },
      {
        title: { id: "Penelitian Dosen", en: "Faculty Research" },
        href: "/informasi/penelitian-dosen",
      },
      {
        title: { id: "Pengabdian Dosen", en: "Faculty Community Service" },
        href: "/informasi/pengabdian-dosen",
      },
    ],
  },
  {
    title: { id: "STAF", en: "STAFF" },
    href: "/staff",
    children: [
      { title: { id: "Dosen", en: "Academic Staff" }, href: "/staff/dosen" },
      {
        title: { id: "Tenaga Kependidikan", en: "Administrative Staff" },
        href: "/staff/tendik",
      },
    ],
  },
  {
    title: { id: "FASILITAS", en: "FACILITIES" },
    href: "/fasilitas",
    children: [
      { title: { id: "Ruang Kelas", en: "Classrooms" }, href: "/fasilitas/ruang-kelas" },
      {
        title: { id: "Ruang Seminar", en: "Seminar Rooms" },
        href: "/fasilitas/ruang-seminar",
      },
      {
        title: { id: "Laboratorium Akta", en: "Deed Laboratory" },
        href: "/fasilitas/laboratorium-akta",
      },
      {
        title: { id: "Laboratorium Manajemen Kantor", en: "Office Management Laboratory" },
        href: "/fasilitas/laboratorium-manajemen-kantor",
      },
      {
        title: { id: "Pusat Riset Mahasiswa", en: "Student Research Center" },
        href: "/fasilitas/student-research-center",
      },
      {
        title: { id: "Podcast Kenotariatan", en: "Notary Podcast" },
        href: "/fasilitas/podcast-kenotariatan",
      },
      { title: { id: "Perpustakaan", en: "Library" }, href: "/fasilitas/perpustakaan" },
    ],
  },
  {
    title: { id: "AGENDA", en: "EVENTS" },
    href: "/event",
  },
  {
    title: { id: "KERJA SAMA", en: "PARTNERSHIPS" },
    href: "/kerja-sama",
  },
  {
    title: { id: "PENJAMINAN MUTU", en: "QUALITY ASSURANCE" },
    href: "/quality-assurance",
    children: [
      {
        title: { id: "Gugus Penjaminan Mutu", en: "Quality Assurance Unit" },
        href: "/quality-assurance",
      },
      {
        title: { id: "Dokumen Mutu", en: "QA Documents" },
        href: "/quality-assurance/qa-documents",
        children: [
          {
            title: { id: "Kebijakan Mutu", en: "QA Policy" },
            href: "/quality-assurance/qa-documents/qa-policy",
          },
          {
            title: { id: "Manual Mutu", en: "QA Manual Standard" },
            href: "/quality-assurance/qa-documents/qa-manual-standard",
          },
          {
            title: { id: "Standar Mutu", en: "QA Standards" },
            href: "/quality-assurance/qa-documents/qa-standar",
          },
          {
            title: { id: "Formulir Mutu", en: "QA Forms" },
            href: "/quality-assurance/qa-documents/qa-forms",
          },
        ],
      },
      {
        title: { id: "Laporan Audit Mutu Internal", en: "Internal Audit Report" },
        href: "/quality-assurance/internal-audit-report",
      },
      {
        title: { id: "Laporan Pembelajaran", en: "Learning and Teaching Report" },
        href: "/quality-assurance/learning-teaching-report",
      },
      {
        title: { id: "Laporan Survei Mahasiswa", en: "Student Survey Report" },
        href: "/quality-assurance/student-survey-report",
      },
      {
        title: { id: "Laporan Survei Alumni", en: "Alumni Survey Report" },
        href: "/quality-assurance/alumni-survey-report",
      },
    ],
  },
  {
    title: { id: "UNDUHAN", en: "DOWNLOAD" },
    href: "/download",
  },
  {
    title: { id: "LAYANAN PENGADUAN", en: "COMPLAINT SERVICE" },
    href: "/layanan-pengaduan",
  },
];
