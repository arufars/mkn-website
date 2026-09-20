/**
 * Data Event & Kalender Agenda Magister Kenotariatan UNISSULA
 */
import yudisium from "../assets/images/agenda/yudisium.jpg";
import funrun from "../assets/images/agenda/funrun.jpg";
import kuliah from "../assets/images/agenda/agenda-1.jpg";

export const eventCategories = [
  { id: "Semua Kategori", en: "All Categories" },
  { id: "Seminar & Konferensi", en: "Seminars & Conferences" },
  { id: "Kuliah Pakar", en: "Expert Lectures" },
  { id: "Workshop & Praktik", en: "Workshops & Practice" },
  { id: "Ujian & Tesis", en: "Exams & Theses" },
  { id: "Akademik & Kemahasiswaan", en: "Academic & Student Affairs" },
];

export const eventData = [
  {
    id: 1,
    pinned: true,
    slug: "penglepasan-lulusan-ke-98-september-2026",
    title: {
      id: "Penglepasan Lulusan Ke-98 Periode September 2026",
      en: "98th Graduation Send-Off Ceremony September 2026 Period",
    },
    date: "2026-09-18",
    time: {
      id: "14:00 sampai selesai",
      en: "14:00 WIB until finish",
    },
    category: {
      id: "Akademik & Kemahasiswaan",
      en: "Academic & Student Affairs",
    },
    venue: {
      id: "Gedung MAC (Majapahit Convention) / MAC Ballroom, Jl. Majapahit No.168, Gayamsari, Kota Semarang",
      en: "MAC (Majapahit Convention) Building / MAC Ballroom, Jl. Majapahit No.168, Gayamsari, Semarang City",
    },
    organizer: {
      id: "Program Studi Magister Kenotariatan FH UNISSULA",
      en: "Master of Notarial Law Program, Faculty of Law UNISSULA",
    },
    description: {
      id: "Penglepasan Lulusan Ke-98 Periode September 2026 sebagai bentuk penghargaan atas capaian akademik para lulusan Program Magister Kenotariatan, sekaligus ruang silaturahmi antara pimpinan, dosen, tenaga kependidikan, lulusan, dan keluarga.",
      en: "The 98th Graduation Send-Off for the September 2026 Period honors the academic achievements of Master of Notarial Law graduates while providing a gathering space for leadership, faculty, administrative staff, graduates, and families.",
    },
    fullDescription: {
      id:
        "Fakultas Hukum Universitas Islam Sultan Agung (MKn FH UNISSULA) akan menyelenggarakan " +
        "Penglepasan Lulusan Ke-98 Periode September 2026 sebagai rangkaian kegiatan akademik " +
        "sekaligus bentuk penghargaan kepada para lulusan yang telah menyelesaikan seluruh proses " +
        "pendidikan pada Program Magister Kenotariatan.\n\n" +
        "Kegiatan penglepasan lulusan akan dilaksanakan di Gedung MAC (Majapahit Convention) atau " +
        "MAC Ballroom, yang berlokasi di Jl. Majapahit No.168, Gayamsari, Kota Semarang. Acara " +
        "dijadwalkan berlangsung mulai pukul 14.00 hingga 17.30 WIB.\n\n" +
        "Penglepasan lulusan merupakan momentum penting bagi Program Studi MKn FH UNISSULA untuk " +
        "memberikan apresiasi atas capaian akademik para lulusan, sekaligus menjadi ruang silaturahmi " +
        "antara pimpinan, dosen, tenaga kependidikan, lulusan, dan keluarga. Kegiatan ini juga menandai " +
        "berakhirnya satu tahapan pendidikan dan dimulainya perjalanan baru bagi para lulusan untuk " +
        "mengimplementasikan ilmu pengetahuan, keterampilan, serta nilai-nilai yang diperoleh selama " +
        "menempuh pendidikan.\n\n" +
        "Melalui pendidikan di Magister Kenotariatan FH UNISSULA, para lulusan diharapkan mampu " +
        "mengembangkan kompetensi di bidang hukum kenotariatan serta menerapkannya secara profesional, " +
        "berintegritas, dan bertanggung jawab dalam kehidupan bermasyarakat maupun dalam menjalankan " +
        "profesi.\n\n" +
        "Momentum Penglepasan Lulusan Ke-98 Periode September 2026 juga diharapkan semakin mempererat " +
        "hubungan antara alumni dan almamater. Para lulusan tidak hanya menjadi bagian dari keluarga " +
        "besar UNISSULA, tetapi juga diharapkan berperan sebagai mitra strategis dalam membangun " +
        "jejaring profesi, memberikan kontribusi bagi pengembangan Program Studi, serta membawa nama " +
        "baik almamater di tengah masyarakat.\n\n" +
        "Dengan semangat Bismillah Membangun Generasi Khaira Ummah, MKn FH UNISSULA mengucapkan selamat " +
        "kepada seluruh lulusan Periode September 2026. Semoga ilmu dan pengalaman yang diperoleh selama " +
        "menempuh pendidikan menjadi bekal untuk berkarya, mengabdi, serta memberikan kemanfaatan yang " +
        "sebesar-besarnya bagi masyarakat, bangsa, dan negara.",
      en:
        "The Faculty of Law, Sultan Agung Islamic University (MKn FH UNISSULA) will hold the " +
        "98th Graduation Send-Off for the September 2026 Period as part of academic activities and " +
        "a token of honor to graduates who have completed all stages of their education in the Master of Notarial Law Program.\n\n" +
        "The ceremony will take place at the MAC (Majapahit Convention) Building / MAC Ballroom, located " +
        "at Jl. Majapahit No.168, Gayamsari, Semarang City, scheduled from 14:00 to 17:30 WIB.\n\n" +
        "The send-off serves as an important milestone for MKn FH UNISSULA to appreciate graduates' " +
        "academic excellence and cultivate strong ties among academic leaders, faculty, staff, graduates, and families. " +
        "It marks the culmination of their formal study and the start of a new journey applying their knowledge and ethical values.\n\n" +
        "Through their education, graduates are expected to advance notarial legal competencies and apply them " +
        "with integrity, professionalism, and social responsibility.\n\n" +
        "MKn FH UNISSULA congratulates all September 2026 graduates under the banner of 'Bismillah Membangun Generasi Khaira Ummah'. " +
        "May their knowledge and experiences bring broad benefit to society, nation, and state.",
    },
    image: yudisium,
    cp: "+62 823-1222-8181 (Ikrom, S.H., M.H.)",
    isFeatured: true,
  },
  {
    id: 3,
    slug: "sultan-agung-fun-run-2026",
    title: {
      id: "Sultan Agung Fun Run 5.5K",
      en: "Sultan Agung Fun Run 5.5K",
    },
    date: "2026-09-27",
    time: {
      id: "05.00 WIB sampai selesai",
      en: "05:00 WIB until finish",
    },
    category: {
      id: "Akademik & Kemahasiswaan",
      en: "Academic & Student Affairs",
    },
    venue: {
      id: "Halaman Kantor Gubernur Jawa Tengah, Jl. Pahlawan No.9, Kota Semarang",
      en: "Central Java Governor's Office Yard, Jl. Pahlawan No.9, Semarang City",
    },
    organizer: {
      id: "Universitas Islam Sultan Agung (UNISSULA)",
      en: "Sultan Agung Islamic University (UNISSULA)",
    },
    description: {
      id: "Lari bersama sejauh 5,5 kilometer bertajuk “Bergerak Tanpa Batas”, dengan titik start dan finis di Kantor Gubernur Jawa Tengah, Kota Semarang.",
      en: "A 5.5-kilometer community fun run themed 'Move Without Limits', starting and finishing at the Central Java Governor's Office, Semarang City.",
    },
    fullDescription: {
      id:
        "Dalam rangka membangun semangat hidup sehat, kebersamaan, dan mempererat silaturahmi " +
        "keluarga besar Sultan Agung bersama masyarakat, Sultan Agung Fun Run 5.5K akan " +
        "diselenggarakan pada Minggu, 27 September 2026, mulai pukul 05.00 WIB hingga selesai, " +
        "dengan titik start dan finish di Kantor Gubernur Jawa Tengah, Kota Semarang. Mengusung " +
        "semangat “Bergerak Tanpa Batas”, kegiatan ini mengajak seluruh peserta menikmati " +
        "olahraga lari sejauh 5,5 kilometer dalam suasana yang sehat, menyenangkan, dan penuh " +
        "kebersamaan.\n\n" +
        "Rute Fun Run akan melintasi sejumlah ruas utama Kota Semarang, dimulai dari Kantor " +
        "Gubernur Jawa Tengah menuju Jl. Gajah Mada, Jl. Depok, Jl. Pemuda, Tugu Muda, " +
        "Jl. Pandanaran, Jl. Tri Lomba Juang, Taman Indonesia Kaya, Jl. Pahlawan, kemudian " +
        "kembali finis di Kantor Gubernur Jawa Tengah.\n\n" +
        "Dengan biaya pendaftaran sebesar Rp125.000, peserta akan memperoleh berbagai fasilitas, " +
        "antara lain jersey, medali, BIB, goodie bag, voucher MCU, refreshment, official photo, " +
        "serta kesempatan mendapatkan beragam doorprize menarik. Hadiah yang disiapkan antara lain " +
        "2 tiket umrah, 5 motor Scoopy, 10 sepeda listrik, 10 kulkas, 10 mesin cuci, 10 rice " +
        "cooker, 10 LED TV, serta 10 logam mulia.\n\n" +
        "Program Studi Magister Kenotariatan Fakultas Hukum UNISSULA turut mendukung semangat " +
        "Sultan Agung Fun Run sebagai bagian dari upaya membangun budaya hidup sehat, memperkuat " +
        "kebersamaan, serta menghadirkan interaksi positif antara sivitas akademika dan " +
        "masyarakat. Melalui kegiatan ini, diharapkan semangat “Bergerak Tanpa Batas” " +
        "tidak hanya diwujudkan melalui aktivitas olahraga, tetapi juga menjadi inspirasi untuk " +
        "terus bergerak, berkarya, dan memberikan manfaat bagi sesama.",
      en:
        "To foster a healthy lifestyle, camaraderie, and solidarity between the Sultan Agung academic community " +
        "and the general public, the Sultan Agung Fun Run 5.5K will be held on Sunday, September 27, 2026, " +
        "starting at 05:00 WIB with start and finish lines at the Central Java Governor's Office, Semarang.\n\n" +
        "Carrying the theme 'Move Without Limits', participants will traverse major Semarang boulevards including " +
        "Jl. Gajah Mada, Jl. Depok, Jl. Pemuda, Tugu Muda, and Jl. Pandanaran.\n\n" +
        "Registration is Rp125,000 including jersey, medal, BIB, goodie bag, medical check-up voucher, refreshments, " +
        "and exciting doorprizes such as Umrah tickets, motorcycles, electric bikes, and gold bars.\n\n" +
        "The Master of Notarial Law Program proudly supports this community wellness initiative, fostering positive " +
        "engagement between academia and society.",
    },
    image: funrun,
    cp: "+62 823-1222-8181 (Ikrom, S.H., M.H.)",
    isFeatured: true,
  },
  {
    id: 2,
    slug: "kuliah-umum-bersertifikat-september-2026",
    title: {
      id: "Kuliah Umum Bersertifikat MKn UNISSULA 2026",
      en: "Certified Public Lecture MKn UNISSULA 2026",
    },
    date: "2026-09-26",
    time: {
      id: "13.00–15.00 WIB",
      en: "13:00–15:00 WIB",
    },
    category: {
      id: "Kuliah Pakar",
      en: "Expert Lectures",
    },
    venue: {
      id: "Akan diinformasikan lebih lanjut oleh panitia",
      en: "To be informed by the organizing committee",
    },
    organizer: {
      id: "Program Studi Magister Kenotariatan Fakultas Hukum UNISSULA",
      en: "Master of Notarial Law Program, Faculty of Law UNISSULA",
    },
    speaker: {
      id: "Dr. Arief Muliawan, S.H., M.H., QGIA — Direktur Jenderal Pengadaan Tanah dan Pengembangan Pertanahan Kementerian ATR/BPN",
      en: "Dr. Arief Muliawan, S.H., M.H., QGIA — Director General of Land Acquisition and Development, Ministry of ATR/BPN",
    },
    registrationUrl: "https://bit.ly/kuliahumum-sept2026",
    description: {
      id: "Kuliah umum bersertifikat bersama Direktur Jenderal Pengadaan Tanah dan Pengembangan Pertanahan Kementerian ATR/BPN, membahas mitigasi risiko hukum dalam peralihan dan pembebanan hak atas tanah.",
      en: "Certified public lecture featuring the Director General of Land Acquisition and Development, Ministry of ATR/BPN, exploring legal risk mitigation in title transfer and land encumbrance.",
    },
    fullDescription: {
      id:
        "Program Magister Kenotariatan Fakultas Hukum UNISSULA menyelenggarakan Kuliah Umum " +
        "Bersertifikat pada Sabtu, 26 September 2026, pukul 13.00–15.00 WIB.\n\n" +
        "Kuliah umum ini menghadirkan Dr. Arief Muliawan, S.H., M.H., QGIA, Direktur Jenderal " +
        "Pengadaan Tanah dan Pengembangan Pertanahan Kementerian ATR/BPN, dengan tema " +
        "“Mitigasi Risiko Hukum dalam Peralihan dan Pembebanan Hak: Sinergi ATR/BPN dan " +
        "Notaris/PPAT dalam Pencegahan Sengketa dan Mafia Tanah.”\n\n" +
        "Kegiatan ini bertujuan memperkuat pemahaman mahasiswa mengenai risiko hukum dalam " +
        "praktik pertanahan, pentingnya asas kehati-hatian, serta sinergi antara ATR/BPN dan " +
        "Notaris/PPAT dalam mewujudkan kepastian hukum dan mencegah sengketa pertanahan.\n\n" +
        "Biaya pendaftaran sebesar Rp250.000,- dengan fasilitas peserta sebagai berikut:\n\n" +
        "• Sertifikat kegiatan (syarat wisuda)\n\n" +
        "• Materi dalam bentuk PDF\n\n" +
        "• Snack\n\n" +
        "• Terdaftar sebagai peserta Sultan Agung Fun Run 2026\n\n" +
        "Sultan Agung Fun Run 2026 akan dilaksanakan pada Minggu, 27 September 2026, di Kantor " +
        "Gubernur Jawa Tengah, Kota Semarang, untuk kategori 5,5K, dengan benefit berupa jersey, " +
        "medali, BIB, goodie bag, refreshment, official photo, dan doorprize.\n\n" +
        "Pendaftaran dilakukan melalui dua langkah:\n\n" +
        "• Transfer biaya Rp250.000,- ke rekening BSI nomor 8383885575 atas nama Magister " +
        "Kenotariatan UNISSULA.\n\n" +
        "• Mengisi data pendaftaran melalui tautan https://bit.ly/kuliahumum-sept2026 secara " +
        "lengkap dan benar, serta mengunggah bukti pembayaran pada formulir yang tersedia.\n\n" +
        "Catatan: pendaftaran Fun Run paling lambat tanggal 20 September 2026. Pendaftar Kuliah " +
        "Umum setelah tanggal tersebut tidak memperoleh fasilitas Fun Run.",
      en:
        "The Master of Notarial Law Program, Faculty of Law UNISSULA, is holding a Certified " +
        "Public Lecture on Saturday, September 26, 2026, from 13:00 to 15:00 WIB.\n\n" +
        "This special lecture features Dr. Arief Muliawan, S.H., M.H., QGIA, Director General of Land " +
        "Acquisition and Development of the Ministry of Agrarian Affairs and Spatial Planning / National Land Agency (ATR/BPN), " +
        "addressing 'Mitigation of Legal Risks in Land Title Transfer and Encumbrance: Synergy of ATR/BPN and Notaries/PPAT in Preventing Disputes and Land Mafia'.\n\n" +
        "Registration fee is Rp250,000, including certificate (graduation requirement), PDF course materials, snack, and bundled ticket for the Sultan Agung Fun Run 2026.\n\n" +
        "Registration is completed by bank transfer to BSI account 8383885575 (Magister Kenotariatan UNISSULA) and submitting the online form at https://bit.ly/kuliahumum-sept2026.",
    },
    image: kuliah,
    cp: "+62 823-1222-8181 (Ikrom, S.H., M.H.)",
    isFeatured: true,
  },
];

/**
 * Format tanggal ke format lokal (Indonesia atau English)
 * Contoh: "2026-09-01" -> "1 September 2026" (id) atau "September 1, 2026" (en)
 */
export function formatIndoDate(dateStr, lang = "id") {
  if (!dateStr) return "";
  const [year, month, day] = dateStr.split("-");
  const monthNamesId = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember",
  ];
  const monthNamesEn = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  const monthNames = lang === "en" ? monthNamesEn : monthNamesId;
  const mIndex = parseInt(month, 10) - 1;

  if (lang === "en") {
    return `${monthNames[mIndex]} ${parseInt(day, 10)}, ${year}`;
  }
  return `${parseInt(day, 10)} ${monthNames[mIndex]} ${year}`;
}

/**
 * Format nama hari (Indonesia atau English)
 */
export function getIndoDayName(dateStr, lang = "id") {
  if (!dateStr) return "";
  const date = new Date(dateStr + "T00:00:00");
  const daysId = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const daysEn = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const days = lang === "en" ? daysEn : daysId;
  return days[date.getDay()];
}

