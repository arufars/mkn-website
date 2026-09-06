import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Loading from "./components/Loading";
import ScrollToTop from "./components/ScrollToTop";

const Home = lazy(() => import("./pages/Home"));

// Profil sub-pages
const ProfilLayout = lazy(() => import("./pages/Profil/index"));
const Sejarah = lazy(() => import("./pages/Profil/Sejarah"));
const VisiMisi = lazy(() => import("./pages/Profil/VisiMisi"));
const Tujuan = lazy(() => import("./pages/Profil/Tujuan"));
const StrukturOrganisasi = lazy(() => import("./pages/Profil/StrukturOrganisasi"));

// Berita sub-pages
const BeritaIndex = lazy(() => import("./pages/Berita/index"));
const BeritaDetail = lazy(() => import("./pages/Berita/BeritaDetail"));

const AkademikLayout = lazy(() => import("./pages/Akademik/index"));
const Kurikulum = lazy(() => import("./pages/Akademik/Kurikulum"));
const ProfilLulusan = lazy(() => import("./pages/Akademik/ProfilLulusan"));
const CapaianPembelajaran = lazy(() => import("./pages/Akademik/CapaianPembelajaran"));
const Panduan = lazy(() => import("./pages/Akademik/Panduan"));
const Rps = lazy(() => import("./pages/Akademik/Rps"));
const PanduanEvaluasi = lazy(() => import("./pages/Akademik/PanduanEvaluasi"));
const PanduanUjian = lazy(() => import("./pages/Akademik/PanduanUjian"));
const UtsUas = lazy(() => import("./pages/Akademik/UtsUas"));
const Tesis = lazy(() => import("./pages/Akademik/Tesis"));
const TesisPraProposal = lazy(() => import("./pages/Akademik/TesisPraProposal"));
const TesisProposal = lazy(() => import("./pages/Akademik/TesisProposal"));
const TesisUjian = lazy(() => import("./pages/Akademik/TesisUjian"));
const Kalender = lazy(() => import("./pages/Akademik/Kalender"));
const SistemInformasi = lazy(() => import("./pages/Akademik/SistemInformasi"));
const Jurnal = lazy(() => import("./pages/Akademik/Jurnal"));

// Download page
const Download = lazy(() => import("./pages/Download/index"));

// Layanan Pengaduan page
const LayananPengaduan = lazy(() => import("./pages/LayananPengaduan/index"));

// Informasi / Penerimaan sub-pages
const InformasiLayout = lazy(() => import("./pages/Penerimaan/index"));
const StudentAdmission = lazy(() => import("./pages/Penerimaan/StudentAdmission"));
const GraduationRate = lazy(() => import("./pages/Penerimaan/GraduationRate"));
const LecturerResearch = lazy(() => import("./pages/Penerimaan/LecturerResearch"));
const CommunityService = lazy(() => import("./pages/Penerimaan/CommunityService"));

// Staff sub-pages
const StaffLayout = lazy(() => import("./pages/Staff/index"));
const Tendik = lazy(() => import("./pages/Staff/Tendik"));
const FacultyDirectory = lazy(() => import("./pages/Staff/FacultyDirectory"));
const FacultyDetail = lazy(() => import("./pages/Staff/FacultyDetail"));

// Fasilitas sub-pages
const FasilitasLayout = lazy(() => import("./pages/Fasilitas/index"));
const RuangKelas = lazy(() => import("./pages/Fasilitas/RuangKelas"));
const LaboratoriumAkta = lazy(() => import("./pages/Fasilitas/LaboratoriumAkta"));
const LaboratoriumManajemenKantor = lazy(() =>
  import("./pages/Fasilitas/LaboratoriumManajemenKantor")
);
const ResearchCenter = lazy(() => import("./pages/Fasilitas/ResearchCenter"));
const Perpustakaan = lazy(() => import("./pages/Fasilitas/Perpustakaan"));
const MootCourt = lazy(() => import("./pages/Fasilitas/MootCourt"));

// Quality Assurance Unit sub-pages
const QualityAssuranceLayout = lazy(() => import("./pages/QualityAssurance/index"));
const QualityAssuranceOverview = lazy(() => import("./pages/QualityAssurance/QualityAssuranceOverview"));
const QaDocuments = lazy(() => import("./pages/QualityAssurance/QaDocuments"));
const QaPolicy = lazy(() => import("./pages/QualityAssurance/QaPolicy"));
const QaManualStandard = lazy(() => import("./pages/QualityAssurance/QaManualStandard"));
const QaStandar = lazy(() => import("./pages/QualityAssurance/QaStandar"));
const QaForms = lazy(() => import("./pages/QualityAssurance/QaForms"));
const InternalAuditReport = lazy(() => import("./pages/QualityAssurance/InternalAuditReport"));
const LearningTeachingReport = lazy(() => import("./pages/QualityAssurance/LearningTeachingReport"));
const StudentSurveyReport = lazy(() => import("./pages/QualityAssurance/StudentSurveyReport"));
const AlumniSurveyReport = lazy(() => import("./pages/QualityAssurance/AlumniSurveyReport"));

// Mahasiswa sub-pages
const Accommodation = lazy(() => import("./pages/StudentLife/Accommodation"));
const StudentOrganizationDetail = lazy(() => import("./pages/StudentLife/StudentOrganizationDetail"));

// Event sub-pages
const EventPage = lazy(() => import("./pages/Event/index"));
const EventDetailPage = lazy(() => import("./pages/Event/EventDetail"));

// Alumni & Karir sub-pages
const AlumniLayout = lazy(() => import("./pages/Alumni/index"));
const TracerStudy = lazy(() => import("./pages/Alumni/TracerStudy"));
const Ikanotsula = lazy(() => import("./pages/Alumni/Ikanotsula"));
const CareerCenter = lazy(() => import("./pages/Alumni/CareerCenter"));
const JobVacancies = lazy(() => import("./pages/Alumni/JobVacancies"));

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<Loading />}>
        <Routes>
        <Route path="/" element={<Home />} />

        {/* Profil — nested routes */}
        <Route path="/profil" element={<ProfilLayout />}>
          <Route index element={<Navigate to="sejarah" replace />} />
          <Route path="sejarah" element={<Sejarah />} />
          <Route path="sejarah-latar-belakang" element={<Navigate to="/profil/sejarah" replace />} />
          <Route path="visi-misi" element={<VisiMisi />} />
          <Route path="tujuan" element={<Tujuan />} />
          <Route path="struktur-organisasi" element={<StrukturOrganisasi />} />
        </Route>

        {/* Berita — catalog & detail routes */}
        <Route path="/berita" element={<BeritaIndex />} />
        <Route path="/berita/:slug" element={<BeritaDetail />} />
        <Route path="/pengumuman" element={<Navigate to="/berita?kategori=pengumuman" replace />} />

        {/* Akademik — nested routes */}
        <Route path="/akademik" element={<AkademikLayout />}>
          <Route index element={<Navigate to="profil-lulusan" replace />} />
          <Route path="profil-lulusan" element={<ProfilLulusan />} />
          <Route path="capaian-pembelajaran" element={<CapaianPembelajaran />} />
          <Route path="kurikulum" element={<Kurikulum />} />
          {/* Alias lama: kurikulum tidak lagi dipisah reguler/internasional */}
          <Route path="kurikulum/*" element={<Navigate to="../kurikulum" replace />} />
          <Route path="panduan-akademik" element={<Panduan />} />
          {/* RPS & Evaluasi Pembelajaran — tiga halaman anak, tanpa tab */}
          <Route path="pembelajaran">
            <Route index element={<Navigate to="rps" replace />} />
            <Route path="rps" element={<Rps />} />
            <Route path="panduan-evaluasi" element={<PanduanEvaluasi />} />
          </Route>
          {/* Alias lama */}
          <Route path="panduan-evaluasi" element={<Navigate to="../pembelajaran/panduan-evaluasi" replace />} />
          <Route path="asesmen" element={<Navigate to="../pembelajaran/asesmen" replace />} />
          <Route path="panduan-ujian" element={<PanduanUjian />}>
            <Route index element={<Navigate to="uts-uas" replace />} />
            <Route path="uts-uas" element={<UtsUas />} />
            <Route path="tesis" element={<Tesis />}>
              <Route index element={<Navigate to="pra-proposal" replace />} />
              <Route path="pra-proposal" element={<TesisPraProposal />} />
              <Route path="proposal" element={<TesisProposal />} />
              <Route path="ujian-tesis" element={<TesisUjian />} />
            </Route>
            {/* Alias lama: Magang tidak lagi menjadi sub-menu Panduan Ujian */}
            <Route path="magang" element={<Navigate to="../tesis" replace />} />
            {/* Alias lama: istilah diubah dari Skripsi ke Tesis */}
            <Route path="skripsi" element={<Navigate to="../tesis" replace />} />
          </Route>
          <Route path="kalender" element={<Kalender />} />
          <Route path="sistem-informasi" element={<SistemInformasi />} />
          <Route path="jurnal" element={<Jurnal />} />
        </Route>

        {/* Informasi — nested routes */}
        <Route path="/informasi" element={<InformasiLayout />}>
          <Route index element={<Navigate to="penerimaan-mahasiswa" replace />} />
          <Route path="penerimaan-mahasiswa" element={<StudentAdmission />} />
          <Route path="tingkat-kelulusan" element={<GraduationRate />} />
          <Route path="penelitian-dosen" element={<LecturerResearch />} />
          <Route path="pengabdian-dosen" element={<CommunityService />} />
        </Route>
        {/* Legacy redirect */}
        <Route path="/penerimaan" element={<Navigate to="/informasi/penerimaan-mahasiswa" replace />} />
        <Route path="/penerimaan/*" element={<Navigate to="/informasi" replace />} />

        {/* Staff — nested routes */}
        <Route path="/staff" element={<StaffLayout />}>
          <Route index element={<Navigate to="dosen" replace />} />
          <Route path="dosen" element={<FacultyDirectory />} />
          <Route path="dosen/:slug" element={<FacultyDetail />} />
          <Route path="tendik" element={<Tendik />} />
          <Route path="faculty-directory" element={<FacultyDirectory />} />
          <Route path="faculty-directory/:slug" element={<FacultyDetail />} />
        </Route>

        {/* Download route */}
        <Route path="/download" element={<Download />} />

        {/* Layanan Pengaduan & Bantuan — Standalone page */}
        <Route path="/layanan-pengaduan" element={<LayananPengaduan />} />
        <Route path="/pengaduan" element={<Navigate to="/layanan-pengaduan" replace />} />
        <Route path="/pengaduan-bantuan" element={<Navigate to="/layanan-pengaduan" replace />} />
        <Route path="/bantuan" element={<Navigate to="/layanan-pengaduan" replace />} />

        {/* Fasilitas — nested routes */}
        <Route path="/fasilitas" element={<FasilitasLayout />}>
          <Route index element={<Navigate to="ruang-kelas" replace />} />
          <Route path="ruang-kelas" element={<RuangKelas />} />
          <Route path="laboratorium-akta" element={<LaboratoriumAkta />} />
          <Route
            path="laboratorium-manajemen-kantor"
            element={<LaboratoriumManajemenKantor />}
          />
          <Route path="student-research-center" element={<ResearchCenter />} />
          <Route path="perpustakaan" element={<Perpustakaan />} />
          <Route path="moot-court" element={<MootCourt />} />
          {/* Tautan lama sebelum laboratorium dipecah menjadi dua halaman. */}
          <Route path="laboratorium" element={<Navigate to="/fasilitas/laboratorium-akta" replace />} />
        </Route>

        {/* Quality Assurance Unit — nested routes */}
        <Route path="/quality-assurance" element={<QualityAssuranceLayout />}>
          <Route index element={<QualityAssuranceOverview />} />
          <Route path="qa-documents" element={<QaDocuments />} />
          <Route path="qa-documents/qa-policy" element={<QaPolicy />} />
          <Route path="qa-documents/qa-manual-standard" element={<QaManualStandard />} />
          <Route path="qa-documents/qa-standar" element={<QaStandar />} />
          <Route path="qa-documents/qa-forms" element={<QaForms />} />
          <Route path="internal-audit-report" element={<InternalAuditReport />} />
          <Route path="learning-teaching-report" element={<LearningTeachingReport />} />
          <Route path="student-survey-report" element={<StudentSurveyReport />} />
          <Route path="alumni-survey-report" element={<AlumniSurveyReport />} />
        </Route>

        {/* Organisasi Mahasiswa — Standalone page langsung tanpa sidebar (organisasi hanya 1) */}
        <Route path="/mahasiswa/organisasi" element={<StudentOrganizationDetail />} />
        <Route path="/mahasiswa/organisasi/*" element={<Navigate to="/mahasiswa/organisasi" replace />} />

        {/* Akomodasi — Standalone page dengan PageTabs Asrama & Guest House (tanpa sidebar) */}
        <Route path="/mahasiswa/akomodasi" element={<Navigate to="/mahasiswa/akomodasi/asrama" replace />} />
        <Route path="/mahasiswa/akomodasi/:tab" element={<Accommodation />} />

        {/* Mahasiswa root & Fallback legacy routes */}
        <Route path="/mahasiswa" element={<Navigate to="/mahasiswa/organisasi" replace />} />
        <Route path="/mahasiswa/ukm/*" element={<Navigate to="/mahasiswa/organisasi" replace />} />
        <Route path="/mahasiswa/ukm" element={<Navigate to="/mahasiswa/organisasi" replace />} />

        {/* Event / Agenda — Harvard Law School style calendar layout */}
        <Route path="/event" element={<EventPage />} />
        <Route path="/event/:slug" element={<EventDetailPage />} />
        <Route path="/agenda" element={<Navigate to="/event" replace />} />

        {/* Alumni & Karir — nested routes */}
        <Route path="/alumni" element={<AlumniLayout />}>
          <Route index element={<Navigate to="ikanotsula" replace />} />
          <Route path="ikanotsula" element={<Ikanotsula />} />
          <Route path="tracer-study" element={<TracerStudy />} />
          <Route path="pusat-karir" element={<CareerCenter />} />
          <Route path="lowongan" element={<JobVacancies />} />
        </Route>
        {/* Direct / Legacy Aliases */}
        <Route path="/sejarah" element={<Navigate to="/profil/sejarah" replace />} />
        <Route path="/visi-misi" element={<Navigate to="/profil/visi-misi" replace />} />
        <Route path="/tujuan" element={<Navigate to="/profil/tujuan" replace />} />
        <Route path="/struktur-organisasi" element={<Navigate to="/profil/struktur-organisasi" replace />} />
        <Route path="/kurikulum" element={<Navigate to="/akademik/kurikulum" replace />} />
        <Route path="/kurikulum/*" element={<Navigate to="/akademik/kurikulum" replace />} />
        <Route path="/organisasi-mahasiswa" element={<Navigate to="/mahasiswa/organisasi" replace />} />
        <Route path="/unit-kegiatan-mahasiswa" element={<Navigate to="/mahasiswa/organisasi" replace />} />
        <Route path="/dosen" element={<Navigate to="/staff/dosen" replace />} />
        <Route path="/tenaga-kependidikan" element={<Navigate to="/staff/tendik" replace />} />
        <Route path="/pusat-karir" element={<Navigate to="/alumni/pusat-karir" replace />} />
        <Route path="/qa-documents" element={<Navigate to="/quality-assurance/qa-documents" replace />} />
        <Route path="/qa-documents/*" element={<Navigate to="/quality-assurance/qa-documents" replace />} />
        <Route path="/alumni-karir" element={<Navigate to="/alumni" replace />} />

        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </Suspense>
    </>
  );
}
