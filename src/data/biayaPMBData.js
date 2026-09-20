
export const periodePMB = {
  judul: {
    id: "Periode Semester Genap 2026/2027",
    en: "Even Semester 2026/2027 Intake",
  },
  gelombang: [
    {
      label: { id: "Gelombang 1", en: "Wave 1" },
      waktu: { id: "s.d. 30 November 2026", en: "until 30 November 2026" },
    },
    {
      label: { id: "Gelombang 2", en: "Wave 2" },
      waktu: { id: "1 Desember 2026 – 20 Februari 2027", en: "1 December 2026 – 20 February 2027" },
    },
  ],
  catatan: {
    id: "Rincian biaya di atas belum termasuk biaya jurnal, TOEFL, KKL, dan wisuda.",
    en: "The fees above do not include journal, TOEFL, field study (KKL), and graduation costs.",
  },
};

/**
 * Jadwal angsuran. Susunannya sama untuk ketiga kelas; yang berbeda hanya
 * nominal angsuran ke-2 UKT tiap semester dan biaya ujian tesis.
 */
function jadwalAngsuran({ ukt2, ujianTesis }) {
  const uktKe1 = { id: "Angsuran ke-1 UKT", en: "UKT instalment 1" };
  const uktKe2 = { id: "Angsuran ke-2 UKT", en: "UKT instalment 2" };

  return [
    {
      semester: "-",
      baris: [
        {
          biaya: { id: "Pendaftaran dan TPA", en: "Registration and TPA test" },
          waktu: { id: "Saat pendaftaran", en: "At registration" },
          gel1: 1500000,
          gel2: 1500000,
        },
      ],
    },
    {
      semester: "I",
      baris: [
        {
          biaya: { id: "Angsuran ke-1 SPI", en: "SPI instalment 1" },
          waktu: { id: "Registrasi", en: "Registration" },
          gel1: 2500000,
          gel2: 5000000,
        },
        { biaya: uktKe1, waktu: { id: "Registrasi", en: "Registration" }, gel1: 5000000, gel2: 5000000 },
        { biaya: uktKe2, waktu: { id: "Sebelum UAS Sem 1", en: "Before Sem 1 final exam" }, gel1: ukt2, gel2: ukt2 },
      ],
    },
    {
      semester: "II",
      baris: [
        {
          biaya: { id: "Angsuran ke-2 SPI", en: "SPI instalment 2" },
          waktu: { id: "Heregistrasi Sem 2", en: "Sem 2 re-registration" },
          gel1: 2500000,
          gel2: 5000000,
        },
        { biaya: uktKe1, waktu: { id: "Heregistrasi Sem 2", en: "Sem 2 re-registration" }, gel1: 5000000, gel2: 5000000 },
        { biaya: uktKe2, waktu: { id: "Sebelum UAS Sem 2", en: "Before Sem 2 final exam" }, gel1: ukt2, gel2: ukt2 },
      ],
    },
    {
      semester: "III",
      baris: [
        { biaya: uktKe1, waktu: { id: "Awal Sem 3", en: "Start of Sem 3" }, gel1: 5000000, gel2: 5000000 },
        { biaya: uktKe2, waktu: { id: "Sebelum UAS Sem 3", en: "Before Sem 3 final exam" }, gel1: ukt2, gel2: ukt2 },
      ],
    },
    {
      semester: "IV",
      baris: [
        {
          biaya: { id: "Ujian Tesis", en: "Thesis examination" },
          waktu: { id: "Sebelum ujian tesis", en: "Before the thesis examination" },
          gel1: ujianTesis,
          gel2: ujianTesis,
        },
      ],
    },
  ];
}

/** Komponen biaya utama; UKT berbeda per kelas, sisanya sama. */
function komponenBiaya(ukt) {
  return [
    {
      label: { id: "Biaya Pendaftaran & Tes TPA", en: "Registration & TPA Test Fee" },
      frekuensi: { id: "saat mendaftar", en: "at registration" },
      nilai: 1500000,
    },
    {
      label: { id: "UKT", en: "Tuition Fee (UKT)" },
      frekuensi: { id: "total, diangsur", en: "total, in instalments" },
      nilai: ukt,
    },
    {
      label: { id: "SPI Gelombang 1", en: "Development Fee (SPI), Wave 1" },
      frekuensi: { id: "diangsur 2 kali", en: "2 instalments" },
      nilai: 5000000,
    },
    {
      label: { id: "SPI Gelombang 2", en: "Development Fee (SPI), Wave 2" },
      frekuensi: { id: "diangsur 2 kali", en: "2 instalments" },
      nilai: 10000000,
    },
  ];
}

export const biayaKelas = [
  {
    id: "eksekutif",
    nama: { id: "Kelas Eksekutif", en: "Executive Class" },
    deskripsi: {
      id: "Kuliah hibrid setiap Jumat pukul 17.00–20.00 dan Sabtu pukul 09.00–16.00 WIB.",
      en: "Hybrid classes on Fridays 17.00–20.00 and Saturdays 09.00–16.00 WIB.",
    },
    komponen: komponenBiaya(50000000),
    catatan: null,
    angsuran: jadwalAngsuran({ ukt2: 7500000, ujianTesis: 12500000 }),
  },
  {
    id: "reguler-a",
    nama: { id: "Kelas Reguler A", en: "Regular Class A" },
    deskripsi: {
      id: "Kuliah offline setiap Selasa, Rabu, dan Kamis pukul 17.00–20.00 WIB.",
      en: "In-person classes on Tuesdays, Wednesdays, and Thursdays, 17.00–20.00 WIB.",
    },
    komponen: komponenBiaya(30000000),
    catatan: null,
    angsuran: jadwalAngsuran({ ukt2: 2500000, ujianTesis: 7500000 }),
  },
  {
    id: "reguler-b",
    nama: { id: "Kelas Reguler B", en: "Regular Class B" },
    deskripsi: {
      id: "Kuliah hibrid khusus alumni setiap Selasa, Rabu, dan Kamis pukul 17.00–20.00 WIB.",
      en: "Hybrid classes for alumni only, on Tuesdays, Wednesdays, and Thursdays, 17.00–20.00 WIB.",
    },
    komponen: komponenBiaya(45000000),
    catatan: {
      id: "Khusus alumni, UKT mendapat potongan Rp10.000.000 sehingga menjadi Rp35.000.000.",
      en: "For alumni, the UKT is reduced by IDR 10,000,000 to IDR 35,000,000.",
    },
    angsuran: jadwalAngsuran({ ukt2: 3750000, ujianTesis: 8750000 }),
  },
];
