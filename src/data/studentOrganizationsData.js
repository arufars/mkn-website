import imgIMANU4 from "../assets/images/imanu-kegiatan.jpeg";
import fotoMubes1 from "../assets/images/imanu-1.jpg";
import fotoMubes2 from "../assets/images/imanu-4.jpg";
import fotoPohon from "../assets/images/pohon.jpg";

export const studentOrganizationsData = [
  {
    id: 1,
    slug: "imanu",
    title: {
      id: "Ikatan Mahasiswa Notariat UNISSULA",
      en: "UNISSULA Notarial Students Association",
    },
    shortName: "IMANU",
    category: {
      id: "ORGANISASI MAHASISWA",
      en: "STUDENT ORGANIZATION",
    },
    periode: "2026/2027",
    description: {
      id:
        "IMANU UNISSULA adalah lembaga kemahasiswaan formal intra kampus di tingkat Program " +
        "Studi Magister Kenotariatan. Organisasi ini bersifat akademis, kekeluargaan, dan " +
        "independen tanpa berafiliasi pada kekuatan politik mana pun.",
      en:
        "IMANU UNISSULA is the official intra-campus student governing body of the Master of " +
        "Notarial Law Study Programme. The organization is academic, fraternal, and " +
        "autonomous, free from partisan political affiliations.",
    },
    image: imgIMANU4,
    imageCaption: {
      id: "Kampus Universitas Islam Sultan Agung, Semarang",
      en: "Sultan Agung Islamic University Campus, Semarang",
    },

    meta: [
      {
        label: { id: "Nama singkat", en: "Short name" },
        value: "IMANU UNISSULA",
      },
      {
        label: { id: "Didirikan", en: "Founded" },
        value: {
          id: "18 November 2018, Kota Semarang",
          en: "18 November 2018, Semarang City",
        },
      },
      {
        label: { id: "Kedudukan", en: "Status/Seat" },
        value: {
          id: "Program Studi Magister Kenotariatan",
          en: "Master of Notarial Law Programme",
        },
      },
      {
        label: { id: "Periode kepengurusan", en: "Term period" },
        value: "2026 / 2027",
      },
    ],

    /** Fungsi organisasi sebagaimana dirumuskan pada dokumen sumber. */
    fungsi: [
      {
        id: "Wadah komunikasi antaranggota dan dengan program studi",
        en: "Forum for mutual communication among members and with the study programme",
      },
      {
        id: "Penjaring aspirasi mahasiswa Magister Kenotariatan",
        en: "Channelling aspirations of Master of Notarial Law students",
      },
      {
        id: "Sarana pengembangan keilmuan dan kompetensi mahasiswa",
        en: "Medium for developing scholarly insight and professional legal competencies",
      },
    ],

    /** Landasan nilai organisasi. */
    landasan: [
      { id: "Nilai-nilai keislaman", en: "Islamic Values" },
      { id: "Pancasila", en: "Pancasila" },
      { id: "Tri Dharma Perguruan Tinggi", en: "Tri Dharma of Higher Education" },
    ],

    tujuan: {
      id:
        "Berlandaskan nilai-nilai tersebut, IMANU UNISSULA didedikasikan untuk menjembatani " +
        "sinergi antara civitas academica, alumni, masyarakat, serta organisasi profesi hukum. " +
        "Tujuannya adalah membentuk calon praktisi hukum dan Notaris/PPAT yang berintegritas, " +
        "beretika luhur, profesional, dan bertakwa.",
      en:
        "Grounded upon these values, IMANU UNISSULA is dedicated to bridging synergy between the " +
        "academic community, alumni, society, and legal professional bodies. Its goal is to " +
        "forge prospective legal practitioners and Notaries/PPAT who possess uncompromising " +
        "integrity, noble ethics, professional mastery, and devotion to God.",
    },

    narrative: [
      {
        id:
          "Sejarah berdirinya IMANU UNISSULA berawal dari kesadaran mendalam bahwa mahasiswa " +
          "Program Studi Magister Kenotariatan merupakan bagian integral dari civitas academica. " +
          "Mahasiswa dituntut untuk mengemban amanah keilmuan, kepemimpinan, serta etika profesi " +
          "luhur yang senantiasa berlandaskan pada nilai-nilai ajaran Islam. Berangkat dari " +
          "pemikiran filosofis dan kebutuhan taktis tersebut, IMANU UNISSULA secara resmi " +
          "didirikan di Kota Semarang pada tanggal 18 November 2018.",
        en:
          "The history of IMANU UNISSULA stems from a profound awareness that Master of Notarial Law " +
          "students are an integral part of the academic community, entrusted with scholarly " +
          "leadership and noble professional ethics anchored in Islamic tenets. Stemming from this " +
          "philosophy and practical necessity, IMANU UNISSULA was formally established in Semarang on " +
          "18 November 2018.",
      },
      {
        id:
          "Pembentukan organisasi ini tidak terlepas dari urgensi untuk menyediakan sebuah wadah " +
          "formal yang mampu mengakomodasi aspirasi mahasiswa sekaligus mempererat tali " +
          "silaturahmi. Lebih jauh, para pendiri IMANU UNISSULA memandang pentingnya sebuah " +
          "institusi kemahasiswaan yang secara terstruktur berupaya mengembangkan integritas dan " +
          "kapasitas keilmuan di bidang kenotariatan.",
        en:
          "The foundation was propelled by the urgency to provide a structured student body " +
          "capable of accommodating member aspirations, fostering solidarity, and systematically " +
          "advancing intellectual capacity and integrity in notarial science.",
      },
      {
        id:
          "Kehadiran organisasi ini dirancang sebagai instrumen strategis guna mempersiapkan " +
          "calon-calon praktisi hukum, yang tidak hanya memiliki kapabilitas serta keahlian hukum " +
          "tinggi, tetapi juga menjunjung tinggi nilai ketakwaan kepada Allah SWT. Melalui pijakan " +
          "historis yang kuat ini, IMANU UNISSULA terus bergerak sebagai jembatan komunikasi antara " +
          "dunia akademik dan realitas profesi hukum.",
        en:
          "The presence of IMANU serves as a strategic instrument preparing future legal practitioners " +
          "of profound competence and high spiritual devotion, continuing as an active bridge between " +
          "legal academia and professional reality.",
      },
    ],

    /**
     * Program kerja satu periode kepengurusan, hasil Rapat Kerja (RAKER).
     * Dokumen sumber menyusunnya per divisi tanpa penanggalan, sehingga
     * ditampilkan sebagai daftar per divisi — bukan tabel berjadwal.
     */
    programKerja: [
      {
        divisi: {
          id: "Hubungan Masyarakat & Jejaring Organisasi",
          en: "Public Relations & Organisational Networks",
        },
        items: [
          {
            id: "Melaksanakan kunjungan dan menjalin relasi kelembagaan dengan Pengurus Wilayah/Daerah INI dan IPPAT.",
            en: "Conducting institutional visits and forging collaborative partnerships with Regional Boards of INI and IPPAT.",
          },
          {
            id: "Membangun komunikasi strategis dengan instansi pemerintahan terkait, seperti ATR/BPN dan Kementerian Hukum dan HAM.",
            en: "Establishing strategic communication channels with relevant agencies, including ATR/BPN and the Ministry of Law and Human Rights.",
          },
          {
            id: "Membentuk serta mengelola forum jejaring komunikasi yang solid dengan alumni Magister Kenotariatan.",
            en: "Developing and stewarding robust communication networks with Master of Notarial Law alumni.",
          },
        ],
      },
      {
        divisi: {
          id: "Pengembangan Sumber Daya Manusia (PSDM) & Minat Bakat",
          en: "Human Resource Development (HRD) & Student Talents",
        },
        items: [
          {
            id: "Menyelenggarakan kegiatan kaderisasi dan forum keakraban bagi mahasiswa baru untuk membangun ukhuwah.",
            en: "Organizing student orientation and fraternity forums for incoming students to foster solidarity.",
          },
          {
            id: "Memfasilitasi penyelenggaraan pelatihan kemahiran hukum praktis, seperti kegiatan bedah akta bagi anggota.",
            en: "Facilitating practical legal skills workshops, including deed dissection and drafting clinics for members.",
          },
          {
            id: "Menyelenggarakan kegiatan olahraga dan seni secara berkala guna mewadahi minat dan bakat mahasiswa.",
            en: "Hosting sports and arts events regularly to nurture diverse student talents.",
          },
        ],
      },
      {
        divisi: {
          id: "Pengabdian Masyarakat & Keislaman",
          en: "Community Service & Islamic Affairs",
        },
        items: [
          {
            id: "Melaksanakan program bakti sosial dan kegiatan kemasyarakatan sebagai wujud implementasi Tri Dharma Perguruan Tinggi.",
            en: "Executing community outreach programs and social service in fulfillment of the Tri Dharma of Higher Education.",
          },
          {
            id: "Menyediakan layanan konsultasi hukum gratis bagi masyarakat yang membutuhkan pendampingan atau literasi hukum.",
            en: "Providing pro bono legal consultation services for community members seeking legal literacy.",
          },
          {
            id: "Menyelenggarakan forum diskusi dan kajian keislaman secara rutin guna memperkuat nilai-nilai religius para calon Notaris.",
            en: "Organizing regular Islamic study circles to reinforce the religious and ethical character of future notaries.",
          },
        ],
      },
    ],

    /** Susunan pengurus periode 2026-2027. */
    pengurusInti: [
      {
        role: { id: "Ketua", en: "President" },
        name: "Hasnan Habib Dwicahya",
        nim: "21302500052",
      },
      {
        role: { id: "Wakil Ketua", en: "Vice President" },
        name: "Raka Faathir Wicaksana",
        nim: "21302500104",
      },
      {
        role: { id: "Sekretaris", en: "Secretary" },
        name: "Arika Dian Astuti",
        nim: "21302500185",
      },
      {
        role: { id: "Wakil Sekretaris", en: "Vice Secretary" },
        name: "Evelyn Rumondang Angelica",
        nim: "21302500283",
      },
      {
        role: { id: "Bendahara", en: "Treasurer" },
        name: "Mila Oktavia Pratiwi",
        nim: "21302500278",
      },
      {
        role: { id: "Wakil Bendahara", en: "Vice Treasurer" },
        name: "Rizki Diah Yustikawati",
        nim: "21302500237",
      },
    ],

    divisi: [
      {
        nama: {
          id: "Divisi Hubungan Masyarakat",
          en: "Public Relations Division",
        },
        koordinator: { name: "Lilianti", nim: "21302500068" },
        anggota: [
          { name: "Ma'iya Zulfiana Aisyah", nim: "21302500071" },
          { name: "Muhammad Asyrof Khabibi", nim: "21302500079" },
          { name: "Nurjanna Frasasti", nim: "21302500098" },
          { name: "Indra Bayu Lekso", nim: "21302500211" },
          { name: "Najid Farhan Abdillah", nim: "21302500257" },
          { name: "Dodi Anggalena Triasukma", nim: "21302400031" },
        ],
      },
      {
        nama: {
          id: "Divisi Pengembangan Sumber Daya Manusia (PSDM)",
          en: "Human Resource Development (HRD) Division",
        },
        koordinator: { name: "Agus Jumianto", nim: "" },
        anggota: [
          { name: "Ari Puguh Sudi Hartono", nim: "21302500186" },
          { name: "Priyambodo Adi Saputro", nim: "21302500273" },
          { name: "Nur Hidayat Aji Utomo", nim: "21302500266" },
        ],
      },
      {
        nama: {
          id: "Divisi Pengabdian Masyarakat & Keislaman",
          en: "Community Service & Islamic Affairs Division",
        },
        koordinator: { name: "Mai Ranti", nim: "21302500070" },
        anggota: [
          { name: "Anis Wahdi", nim: "21302500017" },
          { name: "Frans Oprandi Jaok", nim: "21302500049" },
          { name: "Afrian Maulana Syaputra", nim: "21302500004" },
          { name: "Arsyad Fakhri Zainuddin", nim: "21302500022" },
          { name: "Iis Fatimah", nim: "21302500054" },
          { name: "Nur Inzani", nim: "21302500096" },
          { name: "Canda Dewi Oksa Yuristiyanti", nim: "21302500324" },
        ],
      },
    ],

    /**
     * Galeri foto kegiatan, dipisah per kegiatan. Foto diimpor langsung di
     * atas; `tahun` boleh dikosongkan bila belum diketahui.
     */
    galeri: [
      {
        id: "musyawarah-besar",
        judul: { id: "Musyawarah Besar", en: "Grand Assembly (Musyawarah Besar)" },
        tahun: "",
        foto: [fotoMubes1, fotoMubes2],
      },
      {
        id: "penanaman-pohon",
        judul: { id: "Penanaman Pohon", en: "Tree Planting" },
        tahun: "",
        foto: [fotoPohon],
      },
    ],

    summary: [
      {
        number: "3",
        label: { id: "Divisi kerja", en: "Working divisions" },
      },
      {
        number: "27",
        label: { id: "Pengurus periode 2026/2027", en: "Officers (2026/2027 term)" },
      },
      {
        number: "9",
        label: { id: "Program kerja satu periode", en: "Work programmes" },
      },
    ],
  },
];
