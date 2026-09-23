/**
 * Bahan halaman Reuni Alumni.
 *
 * CATATAN: isi berkas ini masih data contoh — tanggal, tempat, biaya,
 * rangkaian acara, dan daftar kontributor wajib diganti dengan data resmi
 * panitia sebelum halaman dipublikasikan.
 *
 * Kontributor Kado Reuni sengaja tidak menyimpan nominal. Halaman hanya
 * menampilkan nama dan angkatan, disusun menurut angkatan lalu abjad, supaya
 * ucapan terima kasih tidak berubah menjadi ajang peringkat.
 */

export const reuniMendatang = {
  nama: { id: "Reuni Akbar Alumni 2026", en: "Grand Alumni Reunion 2026" },
  tema: {
    id: "Bersatu dalam Ikatan, Berkarya untuk Bangsa",
    en: "United in Bond, Contributing to the Nation",
  },
  mulai: "2026-12-19T07:00:00+07:00",
  selesai: "2026-12-19T17:30:00+07:00",
  detail: [
    {
      label: { id: "Tanggal", en: "Date" },
      nilai: { id: "Sabtu, 19 Desember 2026", en: "Saturday, December 19, 2026" },
    },
    { label: { id: "Waktu", en: "Time" }, nilai: "07.00 – 17.30 WIB" },
    { label: { id: "Tempat", en: "Venue" }, nilai: "Ballroom Hotel Grand Candi, Semarang" },
    {
      label: { id: "Peserta", en: "Attendees" },
      nilai: { id: "Seluruh angkatan alumni", en: "Alumni of all cohorts" },
    },
  ],
  // Angkatan yang genap 5, 10, dan 15 tahun — padanan "milestone class" HLS.
  angkatanLustrum: ["2011", "2016", "2021"],
  tanggalPenting: [
    {
      tanggal: { id: "1 Oktober 2026", en: "October 1, 2026" },
      label: { id: "Pendaftaran dibuka", en: "Registration opens" },
    },
    {
      tanggal: { id: "30 November 2026", en: "November 30, 2026" },
      label: { id: "Pendaftaran ditutup", en: "Registration closes" },
    },
    {
      tanggal: { id: "19 Desember 2026", en: "December 19, 2026" },
      label: { id: "Hari reuni", en: "Reunion day" },
    },
  ],
  biaya: {
    nilai: "Rp 350.000",
    satuan: { id: "per alumni", en: "per alumnus" },
    keterangan: {
      id: "Termasuk makan siang, cendera mata, dan foto angkatan.",
      en: "Includes lunch, a souvenir, and a cohort photo.",
    },
  },
  // Kosongkan bila formulir daring belum tersedia; tombol daftar akan
  // beralih ke surel sekretariat.
  tautanPendaftaran: "",
};

export const narasiReuni = [
  {
    id: "Setiap tahun, alumni Magister Kenotariatan UNISSULA dari berbagai daerah kembali ke Semarang untuk bertemu teman seangkatan, berbincang dengan para dosen, dan merayakan ikatan yang terjalin sejak di bangku kuliah.",
    en: "Every year, alumni of the Master of Notarial Law at UNISSULA return to Semarang from across the country to meet their classmates, talk with their lecturers, and celebrate the bond formed in the lecture hall.",
  },
  {
    id: "Baik Anda sedang merayakan tahun lustrum angkatan maupun sekadar ingin bersilaturahmi, reuni adalah hari untuk bertukar cerita, memperluas jejaring profesi, dan mengenang perjalanan bersama.",
    en: "Whether your cohort is marking a milestone year or you simply want to reconnect, the reunion is a day for sharing stories, widening your professional network, and remembering the journey together.",
  },
];

export const yangMenanti = [
  {
    id: "Dialog bersama dosen dan pimpinan Fakultas Hukum",
    en: "Conversations with lecturers and Faculty of Law leadership",
  },
  {
    id: "Talkshow tentang peluang dan tantangan Notaris di era digital",
    en: "A talk on the opportunities and challenges facing notaries in the digital era",
  },
  {
    id: "Ramah tamah, makan siang, dan sesi foto per angkatan",
    en: "Fellowship, lunch, and cohort photo sessions",
  },
  {
    id: "Penganugerahan penghargaan bagi alumni yang berkontribusi di bidangnya",
    en: "Recognition of alumni for their contributions to the profession",
  },
  {
    id: "Pentas seni dan musik dari para alumni",
    en: "Arts and music performances by alumni",
  },
  {
    id: "Doa bersama bagi rekan alumni yang telah mendahului kita",
    en: "A prayer in memory of fellow alumni who have passed away",
  },
];

export const sambutan = {
  teks: {
    id: "Reuni ini bukan sekadar pertemuan. Ini adalah momen kita merajut kembali tali persaudaraan yang terjalin selama di bangku kuliah, memperkuat jejaring profesi yang kita bangun bersama, dan menghidupkan kembali semangat Khaira Ummah yang menjadi landasan kita sebagai alumni Magister Kenotariatan UNISSULA.",
    en: "This reunion is more than a gathering. It is a moment to renew the bonds formed during our studies, to strengthen the professional network we built together, and to rekindle the spirit of Khaira Ummah that grounds us as alumni of the Master of Notarial Law at UNISSULA.",
  },
  penulis: "Fatiroh, S.H., M.Hum., M.Kn.",
  jabatan: {
    id: "Ketua Panitia Reuni Akbar 2026",
    en: "Chair, Grand Reunion 2026 Committee",
  },
};

export const rangkaianAcara = [
  {
    waktu: "07.00 – 08.00",
    acara: { id: "Registrasi peserta", en: "Registration" },
    keterangan: { id: "Lobi ballroom", en: "Ballroom lobby" },
  },
  {
    waktu: "08.00 – 09.00",
    acara: { id: "Pembukaan, doa, dan lagu kebangsaan", en: "Opening, prayer, and national anthem" },
    keterangan: { id: "Termasuk Mars UNISSULA", en: "Including the UNISSULA March" },
  },
  {
    waktu: "09.00 – 10.00",
    acara: { id: "Sambutan Ketua Panitia dan Dekan", en: "Remarks by the Committee Chair and the Dean" },
    keterangan: "Prof. Dr. H. Gunarto, S.H., M.H.",
  },
  {
    waktu: "10.00 – 11.00",
    acara: {
      id: "Talkshow: Peluang dan Tantangan Notaris di Era Digital",
      en: "Talk: Opportunities and Challenges for Notaries in the Digital Era",
    },
    keterangan: "Dr. Habib Adjie, S.H., M.Hum.",
  },
  {
    waktu: "11.00 – 12.30",
    acara: { id: "Foto bersama per angkatan", en: "Cohort photos" },
    keterangan: { id: "Halaman depan hotel", en: "Hotel forecourt" },
  },
  {
    waktu: "12.30 – 13.30",
    acara: { id: "Makan siang dan ramah tamah", en: "Lunch and fellowship" },
    keterangan: { id: "Ballroom utama", en: "Main ballroom" },
  },
  {
    waktu: "13.30 – 15.00",
    acara: { id: "Penganugerahan penghargaan alumni", en: "Alumni recognition ceremony" },
    keterangan: "",
  },
  {
    waktu: "15.00 – 15.30",
    acara: { id: "Shalat Ashar berjamaah", en: "Asr prayer" },
    keterangan: { id: "Musala hotel", en: "Hotel prayer room" },
  },
  {
    waktu: "15.30 – 17.00",
    acara: { id: "Pentas seni alumni", en: "Alumni performances" },
    keterangan: "",
  },
  {
    waktu: "17.00 – 17.30",
    acara: { id: "Penutupan dan doa bersama", en: "Closing and prayer" },
    keterangan: {
      id: "Mengenang rekan alumni yang telah berpulang",
      en: "In memory of alumni who have passed away",
    },
  },
];

export const kadoReuni = {
  pengantar: {
    id: "Rayakan reuni dengan memberikan kado atas nama angkatan Anda. Setiap kontribusi, berapa pun besarnya, sama berartinya — membantu reuni terselenggara dengan baik sekaligus menjadi bekal kegiatan alumni sepanjang tahun.",
    en: "Celebrate your reunion with a gift in honour of your cohort. Every contribution, whatever its size, matters equally — it helps the reunion run well and supports alumni activities throughout the year.",
  },
  peruntukan: [
    {
      judul: { id: "Penyelenggaraan reuni", en: "Running the reunion" },
      isi: {
        id: "Membantu biaya acara agar iuran peserta tetap terjangkau bagi semua angkatan.",
        en: "Helps cover event costs so the attendance fee stays affordable for every cohort.",
      },
    },
    {
      judul: { id: "Kegiatan sosial alumni", en: "Alumni community service" },
      isi: {
        id: "Mendukung bakti sosial dan penyuluhan hukum yang diselenggarakan IKANOTSULA.",
        en: "Supports the community service and legal outreach run by IKANOTSULA.",
      },
    },
    {
      judul: { id: "Generasi berikutnya", en: "The next generation" },
      isi: {
        id: "Membantu kegiatan pembekalan dan pendampingan bagi mahasiswa Magister Kenotariatan.",
        en: "Supports preparation and mentoring activities for Master of Notarial Law students.",
      },
    },
  ],
  caraBerkontribusi: {
    id: "Informasi rekening dan konfirmasi kontribusi dapat diperoleh melalui sekretariat panitia atau penghubung angkatan Anda.",
    en: "Account details and contribution confirmation are available from the committee secretariat or your cohort liaison.",
  },
  kontributor: [
    { nama: "Dr. Agus Wijayanto, S.H., M.Kn.", angkatan: "2012" },
    { nama: "Dr. Rahardian Ayu Saputri, S.H., M.Kn.", angkatan: "2013" },
    { nama: "Frans Ferbianto, S.H., M.Kn.", angkatan: "2014" },
    { nama: "Eka Hendra Muspiyanto, S.H., M.Kn.", angkatan: "2015" },
    { nama: "Laeli Nurchamidah, S.H., M.Kn.", angkatan: "2016" },
    { nama: "Widyawati, S.H., M.Kn.", angkatan: "2016" },
    { nama: "Rustiana Apri Setiaji, S.H., M.Kn.", angkatan: "2018" },
    { nama: "Nurchasanah, S.H., M.Kn.", angkatan: "2018" },
    { nama: "Mauliwati Alifah, S.H., M.Kn.", angkatan: "2021" },
    { nama: "Ikayanti, S.H., M.Kn.", angkatan: "2021" },
  ],
};

export const reuniTerdahulu = [
  {
    judul: { id: "Dialog Alumni dan Temu Angkatan", en: "Alumni Dialogue and Cohort Gathering" },
    tahun: "2025",
    folder: "reuni-2025",
  },
  {
    judul: { id: "Halal Bihalal IKANOTSULA", en: "IKANOTSULA Halal Bihalal" },
    tahun: "2026",
    folder: "halal-bihalal-2026",
  },
];

/** Kontak resmi program studi; selaras dengan Footer. */
export const kontakReuni = {
  surel: "mkn.fh@unissula.ac.id",
  telepon: [
    { tampilan: "+62 823-1222-8181", href: "tel:+6282312228181" },
    { tampilan: "+62 823-1222-8282", href: "tel:+6282312228282" },
  ],
};
