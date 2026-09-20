import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import ZoomableImg from "../../components/ui/ZoomableImg";
import GaleriGeser from "../../components/ui/GaleriGeser";
import Logo from "../../assets/images/ikanot/logo.jpg";
import { useT, useLanguage } from "../../i18n/languageContext";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: typeof i === "number" ? i * 0.12 : 0,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: typeof i === "number" ? i * 0.12 : 0,
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

/**
 * Foto galeri dibaca langsung dari struktur folder di
 * `assets/images/ikanot/<kegiatan>/`, bukan lewat impor satu per satu.
 */
const berkasKegiatan = import.meta.glob(
  "../../assets/images/ikanot/*/*.{jpg,jpeg,png,webp}",
  { eager: true, import: "default" }
);

function fotoKegiatan(folder) {
  return Object.entries(berkasKegiatan)
    .filter(([path]) => path.includes(`/ikanot/${folder}/`))
    .sort(([a], [b]) => a.localeCompare(b, "id", { numeric: true }))
    .map(([, url]) => url);
}

// Data resmi IKANOTSULA & Lowongan Pekerjaan
const ikanotsulaData = {
  title: "IKANOTSULA (Ikatan Alumni Magister Kenotariatan UNISSULA)",
  category: { id: "ORGANISASI ALUMNI", en: "ALUMNI ORGANIZATION" },
  image: Logo,
  meta: [
    {
      label: { id: "Tanggal Berdiri", en: "Establishment Date" },
      value: { id: "21 November 2015", en: "November 21, 2015" },
    },
    {
      label: { id: "SK Pengesahan", en: "Legal Decree" },
      value: "1056/A.1/SA-H/V/2024",
    },
    {
      label: { id: "Periode Kepengurusan", en: "Management Period" },
      value: "2024 – 2028",
    },
    {
      label: { id: "Ketua Umum", en: "President" },
      value: "Fatiroh, S.H., M.Hum., M.Kn.",
    },
  ],
  narrative: [
    {
      id: "Ikatan Alumni Magister Kenotariatan UNISSULA (IKANOTSULA) dibentuk pertama kali pada tanggal 21 November 2015 oleh para alumni angkatan pertama dan ketiga. Awalnya bernama IKAMANOTSULA, kemudian disederhanakan menjadi IKANOTSULA agar lebih mudah dikenal dan diingat.",
      en: "The Alumni Association of Master of Notarial Law UNISSULA (IKANOTSULA) was established on November 21, 2015 by alumni of the first and third cohorts. Originally named IKAMANOTSULA, it was subsequently simplified to IKANOTSULA for easier recognition and remembrance.",
    },
    {
      id: "IKANOTSULA hadir sebagai wadah pemersatu resmi untuk menjembatani para fresh graduate dalam masa transisi memasuki dunia kerja, mempersiapkan alumni menjadi Anggota Luar Biasa (ALB) Ikatan Notaris Indonesia (INI), serta menjadi media pertukaran pengalaman praktik kenotariatan dan pertanahan antar-generasi.",
      en: "IKANOTSULA serves as an official unifying platform bridging fresh graduates during their transition into the professional world, preparing alumni to become Extraordinary Members (ALB) of the Indonesian Notary Association (INI), and acting as a medium for cross-generational exchange of notarial and agrarian practical experiences.",
    },
    {
      id: "Sebagai bagian integral dari almamater Universitas Islam Sultan Agung, IKANOTSULA berkomitmen mewujudkan generasi Khaira Ummah dengan menjunjung tinggi nilai-nilai keunggulan, kepeloporan, perjuangan, dan pengabdian bagi kemajuan ilmu pengetahuan dan masyarakat.",
      en: "As an integral part of Universitas Islam Sultan Agung, IKANOTSULA is committed to realizing the Khaira Ummah generation by upholding values of excellence, pioneering, dedication, and service for the advancement of science and society.",
    },
  ],
  quote: {
    text: {
      id: "Menjadi pelopor kemajuan peradaban dan berkontribusi nyata pada peningkatan daya saing bangsa di bidang ilmu hukum kenotariatan dan pertanahan.",
      en: "Being a pioneer in advancing civilization and making tangible contributions to enhancing national competitiveness in notarial and agrarian legal science.",
    },
    author: {
      id: "Profil IKANOTSULA UNISSULA",
      en: "Profile of IKANOTSULA UNISSULA",
    },
  },
  programKerja: [
    {
      kegiatan: {
        id: "Bimtek & Pelatihan Ujian PPAT",
        en: "Technical Guidance & PPAT Exam Training",
      },
      waktu: {
        id: "Periodik / Tahunan",
        en: "Periodic / Annual",
      },
      bidang: {
        id: "Pendidikan & Pelatihan",
        en: "Education & Training",
      },
    },
    {
      kegiatan: {
        id: "Pelatihan Ujian Kode Etik Notaris (UKEN)",
        en: "Notary Code of Ethics Examination (UKEN) Training",
      },
      waktu: {
        id: "Periodik",
        en: "Periodic",
      },
      bidang: {
        id: "Pendidikan & Pelatihan",
        en: "Education & Training",
      },
    },
    {
      kegiatan: {
        id: "Program Bakti Sosial & Kepedulian Masyarakat",
        en: "Community Service & Social Care Program",
      },
      waktu: {
        id: "Insidental / Tahunan",
        en: "Incidental / Annual",
      },
      bidang: {
        id: "Sosial & Pengabdian",
        en: "Social & Community Service",
      },
    },
    {
      kegiatan: {
        id: "Konsolidasi & Silaturahmi Alumni Nasional",
        en: "National Alumni Consolidation & Gathering",
      },
      waktu: {
        id: "Berkala",
        en: "Regular",
      },
      bidang: {
        id: "Koordinator Daerah",
        en: "Regional Coordinators",
      },
    },
  ],
  summary: [
    {
      number: "2015",
      label: {
        id: "Tahun Berdiri Organisasi",
        en: "Year Established",
      },
    },
    {
      number: "50+",
      label: {
        id: "Koordinator Daerah Se-Indonesia",
        en: "Regional Coordinators across Indonesia",
      },
    },
    {
      number: "2024–2028",
      label: {
        id: "Masa Bakti Kepengurusan",
        en: "Executive Board Term of Office",
      },
    },
  ],
  galeri: [
    { judul: "Bimbingan Belajar Ujian Kode Etik Notaris (UKEN)", tahun: "2023", folder: "bim-uken-2022" },
    { judul: "Penyuluhan Hukum IKANOTSULA", tahun: "2023", folder: "penyuluhan-hukum-2023" },
    { judul: "Bimbingan Belajar Ujian Kompetensi Notaris", tahun: "2024", folder: "bim-uken-2024" },
    { judul: "Jalan Sehat dan Silaturahmi", tahun: "2024", folder: "jalan-sehat-2024" },
    { judul: "Pelantikan Pengurus IKANOTSULA", tahun: "2024", folder: "pelantikan-2024" },
    { judul: "Pengabdian Masyarakat Pekalongan", tahun: "2024", folder: "pm-pekalongan-2024" },
    { judul: "Workshop \"Seputar Dunia Kenotariatan\" bersama Dr. Habib Adjie, S.H.,M.Hum", tahun: "2024", folder: "workshop-2024" },
    { judul: "Bimbingan Belajar Ujian Kompetensi Notaris", tahun: "2025", folder: "bimbel-uken-2025" },
    { judul: "Dialog Alumni", tahun: "2025", folder: "reuni-2025" },
    { judul: "Halal Bihalal", tahun: "2026", folder: "halal-bihalal-2026" },
    { judul: "Diklat Calon PPAT \"Peningkatan Calon PPAT Dalam Rangka Mewujudkan PPAT yang berintegritas Tinggi dan Bertanggung Jawab\"", tahun: "2026", folder: "diklat-ppat-2026" },
  ],
  strukturOrganisasi: {
    dasar: {
      id: "Keputusan Dekan Fakultas Hukum UNISSULA Nomor 1056/A.1/SA-H/V/2024 tanggal 24 Mei 2024 tentang Susunan Pengurus IKANOTSULA Periode 2024–2028.",
      en: "Decree of the Dean of Faculty of Law UNISSULA Number 1056/A.1/SA-H/V/2024 dated May 24, 2024 concerning the Executive Board Composition of IKANOTSULA Period 2024–2028.",
    },
    dewan: [
      {
        jabatan: { id: "Pelindung", en: "Patron" },
        anggota: [{ nama: "Prof. Dr. H. Gunarto, S.H., M.H." }],
      },
      {
        jabatan: { id: "Pembina", en: "Advisory Board" },
        anggota: [{ nama: "Dr. H. Jawade Hafidz, S.H., M.H." }],
      },
      {
        jabatan: { id: "Dewan Penasehat", en: "Board of Advisors" },
        anggota: [
          { nama: "Dr. Nanang Sri Darmadi, S.H., M.H." },
          { nama: "Dr. Achmad Arifulloh, S.H., M.H." },
        ],
      },
      {
        jabatan: { id: "Ketua Dewan Pertimbangan", en: "Head of Consideration Board" },
        anggota: [{ nama: "Dr. Agus Wijayanto, S.H., M.Kn." }],
      },
      {
        jabatan: { id: "Anggota Dewan Pertimbangan", en: "Members of Consideration Board" },
        anggota: [
          { nama: "Dr. Dwi Pratiwi Markus, S.H., M.Kn." },
          { nama: "Dr. Hetiyasari, S.H., M.Kn." },
        ],
      },
    ],
    pengurusHarian: [
      { jabatan: { id: "Ketua Umum", en: "President" }, nama: "Fatiroh, S.H., M.Hum., M.Kn." },
      { jabatan: { id: "Wakil Ketua Umum", en: "Vice President" }, nama: "Frans Ferbianto, S.H., M.Kn." },
      { jabatan: { id: "Sekretaris Jenderal", en: "Secretary General" }, nama: "Eka Hendra Muspiyanto, S.H., M.Kn." },
      { jabatan: { id: "Wakil Sekretaris Jenderal", en: "Deputy Secretary General" }, nama: "Widyawati, S.H., M.Kn." },
      { jabatan: { id: "Bendahara", en: "Treasurer" }, nama: "Rustiana Apri Setiaji, S.H., M.Kn." },
      { jabatan: { id: "Wakil Bendahara", en: "Deputy Treasurer" }, nama: "Dr. Rahardian Ayu Saputri, S.H., M.Kn." },
    ],
    bidang: [
      {
        nama: { id: "Bidang Pendidikan & Pelatihan", en: "Division of Education & Training" },
        anggota: [
          "Laeli Nurchamidah, S.H., M.Kn.",
          "Arini Sutanti, S.H., M.Kn.",
          "Aldya Khaira Almeyda, S.H., M.Kn.",
        ],
      },
      {
        nama: { id: "Bidang Hubungan Masyarakat dan Publikasi", en: "Division of Public Relations and Publications" },
        anggota: [
          "Moch. Nur Ali Zamroni, S.H., M.Kn.",
          "Nur Sofiatun, S.H., M.Kn.",
          "Sri Setianingsih, S.H., M.Kn.",
        ],
      },
      {
        nama: { id: "Bidang Sosial", en: "Division of Social Affairs" },
        anggota: [
          "Sri Harsi Kusumawardani, S.H., M.Kn.",
          "Afifah, S.H., M.Kn.",
          "Ratna Kartika Dewi, S.H., M.Kn.",
        ],
      },
      {
        nama: { id: "Bidang Kerohanian", en: "Division of Spiritual Affairs" },
        anggota: [
          "Mohammad Tohir, S.H., M.Kn.",
          "Burhanudin, S.H., M.Kn.",
          "Sobir Mustaqim Wibowo, S.H., M.Kn.",
        ],
      },
      {
        nama: { id: "Bidang Koordinator Alumni", en: "Division of Alumni Coordination" },
        anggota: [
          "Edy Sutrisno, S.H., M.Kn.",
          "Indiana Fawaiza, S.H., M.Kn.",
          "Yuliarti, S.H., M.Kn.",
          "Laelatul Maulida, S.H., M.Kn.",
        ],
      },
      {
        nama: { id: "Bidang Seni, Budaya dan Olah Raga", en: "Division of Arts, Culture and Sports" },
        anggota: [
          "Sri Indah Lestari, S.H., M.Kn.",
          "Dr. Rais Firdaus Handoko, S.H., M.Kn.",
          "Jabidin, S.H., M.Kn.",
        ],
      },
      {
        nama: { id: "Bidang Pengabdian Masyarakat", en: "Division of Community Service" },
        anggota: [
          "Nurchasanah, S.H., M.Kn.",
          "Mauliwati Alifah, S.H., M.Kn.",
          "Fitriza Wirasari, S.H., M.Kn.",
        ],
      },
      {
        nama: { id: "Bidang Pengayoman Anggota", en: "Division of Member Protection & Welfare" },
        anggota: [
          "Dedy Haryanto, S.H., M.Kn.",
          "Muhammad Muthohar, S.H., M.Kn.",
          "Sarijo, S.H., M.Kn.",
        ],
      },
    ],
    koordinatorDaerah: [
      {
        provinsi: "Jawa Tengah",
        daerah: [
          { wilayah: "Kab. Pekalongan", nama: "Ikayanti, S.H., M.Kn." },
          { wilayah: "Kota Pekalongan", nama: "Mohamad Taqi Al Jawad Alkaf, S.H., M.Kn." },
          { wilayah: "Kab. Batang", nama: "Nur Aisyah, S.H., M.Kn." },
          { wilayah: "Kab. Pemalang", nama: "Dyah Ragil, S.H., M.Kn." },
          { wilayah: "Kab. Tegal", nama: "Rohmayanti, S.H., M.Kn." },
          { wilayah: "Kab. Brebes", nama: "Endah Suryaningsih, S.H., M.Kn." },
          { wilayah: "Kab. Cilacap", nama: "Rena Hayuningtyas, S.H., M.Kn." },
          { wilayah: "Kab. Purbalingga", nama: "Eko Winarto, S.H., M.Kn." },
          { wilayah: "Kab. Banjarnegara", nama: "Paristuta Juwono, S.H., M.Kn." },
          { wilayah: "Kab. Banyumas", nama: "Wiwit Ayuningtyas, S.H., M.Kn." },
          { wilayah: "Kab. Purworejo", nama: "Rahmat Solehan, S.H., M.Kn." },
          { wilayah: "Kab. Magelang", nama: "Intan Asti Rien Indrayani, S.H., M.Kn." },
          { wilayah: "Kota Magelang", nama: "Ahmad Ridwan, S.H., M.Kn." },
          { wilayah: "Kota Salatiga", nama: "Mauliawati Alifah, S.H., M.Kn." },
          { wilayah: "Kab. Boyolali", nama: "Istanti, S.H., M.Kn." },
          { wilayah: "Kab. Grobogan", nama: "Nurmalia Ika Widiasari, S.H., M.Kn." },
          { wilayah: "Kab. Semarang", nama: "Ratna Kartika Dewi, S.H., M.Kn." },
          { wilayah: "Kota Semarang", nama: "Rujiati, S.H., M.Kn." },
          { wilayah: "Kab. Temanggung", nama: "Arini Sutanti, S.H., M.Kn." },
          { wilayah: "Kab. Blora", nama: "Bryant Manggala Retnanindyani, S.H., M.Kn." },
          { wilayah: "Kab. Demak", nama: "Rubiyati Nurvitaning Tyas, S.H., M.Kn." },
          { wilayah: "Kab. Pati", nama: "Muhammad Rofiq Kana, S.H., M.Kn." },
          { wilayah: "Kab. Kudus", nama: "Muhammad Iqbal Al Hakiem, S.H., M.Kn." },
          { wilayah: "Kab. Rembang", nama: "Moh. Muftakhul Nizam Zamroni, S.H., M.Kn." },
          { wilayah: "Kab. Klaten", nama: "Ibnu Safa, S.H., M.Kn." },
          { wilayah: "Kab. Kendal", nama: "Titi Resmiyati, S.H., M.Kn." },
          { wilayah: "Kota Tegal", nama: "Jabidin Maulana, S.H., M.Kn." },
        ],
      },
      {
        provinsi: "Jawa Timur",
        daerah: [
          { wilayah: "Kab. Tuban", nama: "Sawin Dwi Hapsari, S.H., M.Kn." },
          { wilayah: "Kab. Pacitan", nama: "Kristiyani, S.H., M.Kn." },
          { wilayah: "Kab. Magetan", nama: "Dhian Ekasari, S.H., M.Kn." },
        ],
      },
      {
        provinsi: "Banten",
        daerah: [
          { wilayah: "Kab. Tangerang", nama: "Alia Wedyaningrum, S.H., M.Kn." },
        ],
      },
      {
        provinsi: "Jambi",
        daerah: [{ wilayah: "Kota Jambi", nama: "Maya, S.H., M.Kn." }],
      },
      {
        provinsi: "Aceh",
        daerah: [{ wilayah: "Kab. Bireuen", nama: "Dessy Andiyaninsih, S.H., M.Kn." }],
      },
      {
        provinsi: "Bengkulu",
        daerah: [{ wilayah: "Kab. Bengkulu Utara", nama: "Didit Wardio, S.H., M.Kn." }],
      },
      {
        provinsi: "Bangka Belitung",
        daerah: [
          { wilayah: "Kab. Bangka Selatan", nama: "Andi Wijaya, S.H., M.Kn." },
          { wilayah: "Kab. Bangka", nama: "Ervandi Saputra, S.H., M.Kn." },
        ],
      },
      {
        provinsi: "Maluku",
        daerah: [{ wilayah: "Kota Maluku", nama: "Yasmin Seif, S.H., M.Kn." }],
      },
      {
        provinsi: "Kalimantan Tengah",
        daerah: [
          { wilayah: "Pangkalanbun", nama: "Yongky Irawan, S.H., M.Kn." },
          { wilayah: "Kota Palangkaraya", nama: "Wahyu Hanggono, S.H., M.Kn." },
        ],
      },
      {
        provinsi: "Kalimantan Barat",
        daerah: [{ wilayah: "Kab. Sambas", nama: "Asbi, S.H., M.Kn." }],
      },
      {
        provinsi: "Kalimantan Selatan",
        daerah: [{ wilayah: "Kota Banjarmasin", nama: "Shofiyah, S.H., M.Kn." }],
      },
      {
        provinsi: "Kalimantan Utara",
        daerah: [{ wilayah: "Kab. Bulungan", nama: "Junaidi, S.H., M.Kn." }],
      },
      {
        provinsi: "Sulawesi Tenggara",
        daerah: [
          { wilayah: "Kota Baubau", nama: "La Ode Arsanudin, S.H., M.Kn." },
          { wilayah: "Kab. Muna", nama: "Yanti, S.H., M.Kn." },
          { wilayah: "Kab. Konawe", nama: "Haris Ramadan, S.H., M.Kn." },
          { wilayah: "Kab. Buton", nama: "Muhammad Ridho, S.H., M.Kn." },
          { wilayah: "Kab. Kolaka Timur", nama: "Andi Rosita, S.H., M.Kn." },
          { wilayah: "Kab. Banggai", nama: "Arty Retno Sari, S.H., M.Kn." },
          { wilayah: "Kab. Konawe Selatan", nama: "Moh. Rizal Zulkifli, S.H., M.Kn." },
        ],
      },
      {
        provinsi: "Papua",
        daerah: [{ wilayah: "Kab. Sorong", nama: "Rini Andayani, S.H., M.Kn." }],
      },
    ],
  },
};

export default function IkanotsulaDetail() {
  const t = useT();
  const { lang } = useLanguage();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  const organization = ikanotsulaData;

  const galeri = (organization.galeri ?? [])
    .map((kegiatan) => {
      const judulText = t(kegiatan.judul);
      const namaLengkap = `${judulText} ${kegiatan.tahun}`;

      return {
        ...kegiatan,
        foto: fotoKegiatan(kegiatan.folder).map((src, idx) => ({
          src,
          alt: `${namaLengkap} — ${lang === "en" ? "photo" : "foto"} ${idx + 1}`,
          caption: `${namaLengkap} — ${lang === "en" ? "photo" : "foto"} ${idx + 1}`,
        })),
      };
    })
    .filter((kegiatan) => kegiatan.foto.length > 0);

  const jumlahKoordinator =
    organization.strukturOrganisasi?.koordinatorDaerah.reduce(
      (total, prov) => total + prov.daerah.length,
      0
    ) ?? 0;

  return (
    <>
      <Helmet>
        <title>{`${organization.title} | MKn UNISSULA`}</title>
        <meta
          name="description"
          content={
            lang === "en"
              ? "Official profile, structure, work programs, and activities of IKANOTSULA (UNISSULA Master of Notarial Law Alumni Association)."
              : "Profil resmi, struktur kepengurusan, program kerja, dan galeri kegiatan IKANOTSULA (Ikatan Alumni Magister Kenotariatan UNISSULA)."
          }
        />
      </Helmet>

      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full"
      >
        <div className="mx-auto space-y-6">
          <motion.div variants={itemVariants} className="space-y-2">
            <motion.span
              variants={itemVariants}
              className="inline-block text-xs font-bold tracking-wider uppercase text-primary"
            >
              {t(organization.category)}
            </motion.span>
            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-4xl lg:text-[40px] font-heading font-bold text-heading tracking-tight leading-tight"
            >
              {organization.title}
            </motion.h1>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
              viewport={{ once: true, amount: 0.2 }}
              className="h-[2px] bg-primary mt-2"
            />
          </motion.div>

          {/* Gambar Utama Memanjang Full-Width */}
          <motion.div
            variants={cardVariants}
            className="w-full h-[300px] sm:h-[420px] lg:h-[480px] overflow-hidden rounded-md flex items-center justify-center bg-gray-50/50 border border-gray-100"
          >
            <ZoomableImg
              src={organization.image}
              alt={organization.title}
              className="max-w-full max-h-full w-auto h-full object-contain object-center rounded-md hover:scale-105 transition-transform duration-500"
              eager
            />
          </motion.div>

          {/* Metadata Bar Horizontal */}
          {organization.meta && organization.meta.length > 0 && (
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-gray-200"
            >
              {organization.meta.map((m, idx) => (
                <motion.div
                  key={idx}
                  custom={idx}
                  variants={cardVariants}
                  whileHover={{ y: -2 }}
                  className="p-3 bg-gray-50/80 rounded border border-gray-100 flex flex-col justify-between shadow-2xs hover:border-primary/40 transition-colors"
                >
                  <span className="text-xs text-body font-normal uppercase tracking-wider mb-1">
                    {t(m.label)}
                  </span>
                  <span className="font-semibold text-heading text-sm sm:text-base">
                    {t(m.value)}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </motion.section>

      {/* ========================================================================= */}
      {/* KONTEN UTAMA (1 KOLOM TUNGGAL MEMANJANG) */}
      {/* ========================================================================= */}
      <div className="w-full mx-auto py-10 sm:py-14 space-y-12 sm:space-y-16">
        
        {/* RINGKASAN ORGANISASI (STRIP STATISTIK HORIZONTAL) */}
        {organization.summary && organization.summary.length > 0 && (
          <motion.section
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="bg-white p-6 sm:p-8 rounded-lg border border-gray-200 shadow-2xs"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
              {organization.summary.map((stat, idx) => (
                <motion.div
                  key={idx}
                  custom={idx}
                  variants={cardVariants}
                  whileHover={{ y: -2 }}
                  className={`space-y-1 transition-transform ${idx !== 0 ? "pt-4 sm:pt-0 sm:pl-6" : ""}`}
                >
                  <div className="font-heading text-3xl sm:text-4xl font-bold text-primary">
                    {stat.number}
                  </div>
                  <div className="text-xs sm:text-sm text-body font-medium">
                    {t(stat.label)}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* NARASI & KUTIPAN */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="space-y-6 text-sm sm:text-base text-body text-justify leading-relaxed"
        >
          {organization.narrative?.map((paragraph, idx) => (
            <motion.p key={idx} custom={idx} variants={itemVariants}>
              {t(paragraph)}
            </motion.p>
          ))}

          {organization.quote && (
            <motion.blockquote
              variants={cardVariants}
              className="border-l-4 border-primary pl-6 py-3 my-8 bg-white/50 rounded-r-lg shadow-2xs"
            >
              <p className="font-heading italic text-lg sm:text-xl md:text-2xl text-special leading-snug">
                “{t(organization.quote.text)}”
              </p>
              {organization.quote.author && (
                <footer className="text-xs sm:text-sm text-body font-normal mt-2">
                  — {t(organization.quote.author)}
                </footer>
              )}
            </motion.blockquote>
          )}
        </motion.section>

        {organization.strukturOrganisasi && (
          <motion.section
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="space-y-6"
          >
              <motion.div variants={itemVariants} className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-heading">
                {t({ id: "Struktur Organisasi", en: "Organizational Structure" })}
              </h2>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.2 }}
                className="h-[1.5px] bg-heading mt-1 mb-3"
              />
              <p className="text-xs sm:text-sm text-body leading-relaxed">
                {t(organization.strukturOrganisasi.dasar)}
              </p>
            </motion.div>

            {/* Dewan Pelindung, Pembina, Penasehat & Pertimbangan */}
            <motion.div
              variants={cardVariants}
              className="overflow-x-auto bg-white rounded-lg border border-gray-200 shadow-2xs"
            >
              <table className="w-full text-left border-collapse min-w-[520px]">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50 text-[11px] font-bold tracking-[0.14em] uppercase text-heading">
                    <th className="py-3 px-4 w-1/3">
                      {t({ id: "Kedudukan", en: "Position" })}
                    </th>
                    <th className="py-3 px-4 w-2/3">
                      {t({ id: "Nama", en: "Name" })}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-xs sm:text-sm">
                  {organization.strukturOrganisasi.dewan.map((row, idx) => (
                    <motion.tr key={idx} custom={idx} variants={itemVariants} className="hover:bg-gray-50/60 transition-colors">
                      <td className="py-4 px-4 font-bold text-heading align-top">
                        {t(row.jabatan)}
                      </td>
                      <td className="py-4 px-4 text-body align-top space-y-1">
                        {row.anggota.map((orang) => (
                          <div key={orang.nama} className="font-medium text-heading">
                            {orang.nama}
                          </div>
                        ))}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>

            {/* Dewan Pengurus Harian */}
            <motion.div variants={itemVariants} className="pt-2">
              <h3 className="font-heading font-bold text-lg sm:text-xl text-heading">
                {t({ id: "Dewan Pengurus Harian", en: "Daily Executive Board" })}
              </h3>
            </motion.div>
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {organization.strukturOrganisasi.pengurusHarian.map((orang, idx) => (
                <motion.div
                  key={idx}
                  custom={idx}
                  variants={cardVariants}
                  whileHover={{ y: -3 }}
                  className="bg-white border border-gray-200 rounded-md p-4 shadow-2xs hover:border-primary/40 hover:shadow-md transition-all"
                >
                  <p className="text-[11px] font-bold text-primary tracking-wider uppercase">
                    {t(orang.jabatan)}
                  </p>
                  <p className="font-heading font-bold text-sm sm:text-base text-heading leading-snug mt-1">
                    {orang.nama}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* Bidang-bidang */}
            <motion.div variants={itemVariants} className="pt-2">
              <h3 className="font-heading font-bold text-lg sm:text-xl text-heading">
                {t({ id: "Bidang", en: "Divisions" })}
              </h3>
            </motion.div>
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {organization.strukturOrganisasi.bidang.map((bidang, idx) => (
                <motion.div
                  key={idx}
                  custom={idx}
                  variants={cardVariants}
                  whileHover={{ y: -3 }}
                  className="bg-white border border-gray-200 rounded-md p-4 shadow-2xs hover:border-primary/40 hover:shadow-md transition-all"
                >
                  <h4 className="font-heading font-bold text-sm sm:text-base text-heading leading-snug pb-2 mb-2 border-b border-gray-200">
                    {t(bidang.nama)}
                  </h4>
                  <ol className="list-decimal list-inside space-y-1 text-xs sm:text-sm text-body marker:text-primary marker:font-semibold">
                    {bidang.anggota.map((nama) => (
                      <li key={nama}>{nama}</li>
                    ))}
                  </ol>
                </motion.div>
              ))}
            </motion.div>

            {/* Koordinator Daerah — dilipat agar halaman tidak terlalu panjang */}
            <motion.details
              variants={cardVariants}
              className="group bg-white border border-gray-200 rounded-lg overflow-hidden shadow-2xs hover:border-gray-300 transition-colors"
            >
              <summary className="flex items-center justify-between gap-4 p-4 sm:p-5 cursor-pointer list-none hover:bg-gray-50/60 transition-colors">
                <span>
                  <span className="block font-heading font-bold text-lg sm:text-xl text-heading">
                    {t({ id: "Koordinator Daerah", en: "Regional Coordinators" })}
                  </span>
                  <span className="block text-xs sm:text-sm text-body mt-0.5">
                    {jumlahKoordinator}{" "}
                    {t({
                      id: `koordinator di ${organization.strukturOrganisasi.koordinatorDaerah.length} provinsi`,
                      en: `coordinators across ${organization.strukturOrganisasi.koordinatorDaerah.length} provinces`,
                    })}
                  </span>
                </span>
                <span className="shrink-0 text-[11px] font-bold tracking-wider uppercase text-primary">
                  <span className="group-open:hidden">{t({ id: "Lihat", en: "View" })}</span>
                  <span className="hidden group-open:inline">{t({ id: "Tutup", en: "Close" })}</span>
                </span>
              </summary>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 sm:p-5 pt-0 border-t border-gray-200">
                {organization.strukturOrganisasi.koordinatorDaerah.map((prov, idx) => (
                  <motion.div key={prov.provinsi} custom={idx} variants={itemVariants} className="pt-4">
                    <h4 className="text-[11px] font-bold tracking-[0.14em] uppercase text-primary pb-2 mb-2 border-b border-gray-200">
                      {lang === "en" ? `${prov.provinsi} Province` : `Provinsi ${prov.provinsi}`}
                    </h4>
                    <ul className="divide-y divide-gray-100 text-xs sm:text-sm">
                      {prov.daerah.map((d) => (
                        <li
                          key={d.wilayah}
                          className="py-2 flex flex-col sm:flex-row sm:items-baseline sm:gap-3"
                        >
                          <span className="font-semibold text-heading sm:w-44 sm:shrink-0">
                            {d.wilayah}
                          </span>
                          <span className="text-body">{d.nama}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </motion.details>
          </motion.section>
        )}

        {/* PROGRAM KERJA UTAMA */}
        {organization.programKerja && organization.programKerja.length > 0 && (
          <motion.section
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="space-y-6"
          >
            <motion.h2
              variants={itemVariants}
              className="text-2xl sm:text-3xl font-heading font-bold text-heading"
            >
              {t({ id: "Program Kerja Utama", en: "Main Work Programs" })}
            </motion.h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.2 }}
              className="h-[1.5px] bg-heading mt-1 mb-3"
            />
            <motion.div
              variants={cardVariants}
              className="overflow-x-auto bg-white rounded-lg border border-gray-200 shadow-2xs"
            >
              <table className="w-full text-left border-collapse min-w-[550px]">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50 text-[11px] font-bold tracking-[0.14em] uppercase text-heading">
                    <th className="py-3 px-4 w-5/12">
                      {t({ id: "Kegiatan", en: "Activity" })}
                    </th>
                    <th className="py-3 px-4 w-3/12">
                      {t({ id: "Waktu / Pelaksanaan", en: "Schedule / Execution" })}
                    </th>
                    <th className="py-3 px-4 w-4/12">
                      {t({ id: "Bidang", en: "Division" })}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-xs sm:text-sm">
                  {organization.programKerja.map((row, idx) => (
                    <motion.tr key={idx} custom={idx} variants={itemVariants} className="hover:bg-gray-50/60 transition-colors">
                      <td className="py-4 px-4 font-bold text-heading align-top">{t(row.kegiatan)}</td>
                      <td className="py-4 px-4 text-body align-top">{t(row.waktu)}</td>
                      <td className="py-4 px-4 text-body align-top">{t(row.bidang)}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </motion.section>
        )}

        {/* GALERI FOTO — dikelompokkan per kegiatan */}
        {galeri.length > 0 && (
          <section className="space-y-10">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-2xl sm:text-3xl font-heading font-bold text-heading"
            >
              {t({ id: "Galeri Kegiatan", en: "Activity Gallery" })}
            </motion.h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.2 }}
              className="h-[1.5px] bg-heading mt-1 mb-3"
            />

            {galeri.map((kegiatan) => (
              <motion.div
                key={kegiatan.folder}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                className="space-y-4"
              >
                {/* Kepala kegiatan: nama acara, tahun, dan jumlah foto */}
                <motion.div
                  variants={itemVariants}
                  className="flex flex-wrap items-baseline gap-x-3 gap-y-1 pb-2 border-b border-gray-200"
                >
                  <h3 className="font-heading font-bold text-lg sm:text-xl text-heading leading-snug">
                    {t(kegiatan.judul)}
                  </h3>

                  <span className="text-[11px] font-bold tracking-wider text-primary uppercase bg-red-50 border border-primary/20 px-2 py-0.5 rounded-xs tabular-nums">
                    {kegiatan.tahun}
                  </span>

                  <span className="text-xs text-gray-400 ml-auto tabular-nums">
                    {kegiatan.foto.length} {lang === "en" ? "photos" : "foto"}
                  </span>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <GaleriGeser
                    foto={kegiatan.foto}
                    ariaLabel={`${t({ id: "Galeri", en: "Gallery" })} ${t(kegiatan.judul)} ${kegiatan.tahun}`}
                    otomatis={false}
                    tampilkanJudul={false}
                    kelasTrek="gap-4"
                    kelasBasis="basis-full sm:basis-[calc((100%-1rem)/2)] md:basis-[calc((100%-2rem)/3)]"
                    kelasKartu="aspect-[4/3] rounded-md border border-gray-200 shadow-2xs"
                  />
                </motion.div>
              </motion.div>
            ))}
          </section>
        )}

      </div>
    </>
  );
}