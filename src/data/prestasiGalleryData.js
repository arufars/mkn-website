/**
 * Data gallery foto prestasi mahasiswa MKn UNISSULA.
 * Foto diambil dari assets lokal di src/assets/images/prestasi/.
 *
 * Untuk menambah foto baru:
 * 1. Taruh file di folder yang sesuai di assets/images/prestasi/
 * 2. Import file-nya di bawah
 * 3. Tambahkan entri baru ke array event yang sesuai (atau buat event baru)
 */

// === Lomba Nasional 2022 ===
import lnJuara3Debat from "../assets/images/prestasi/lomba-debat-nasional-2022/Juara 3 Debat.jpg";
import lnJuara1 from "../assets/images/prestasi/lomba-debat-nasional-2022/juara 1.jpeg";
import lnJuara2 from "../assets/images/prestasi/lomba-debat-nasional-2022/juara 2.jpeg";
import lnJuara3 from "../assets/images/prestasi/lomba-debat-nasional-2022/juara 3.jpeg";
import lnJuara4 from "../assets/images/prestasi/lomba-debat-nasional-2022/juara 4.jpeg";
import lnJuara5 from "../assets/images/prestasi/lomba-debat-nasional-2022/juara 5.jpeg";
import lnPiala2 from "../assets/images/prestasi/lomba-debat-nasional-2022/piala 2.jpeg";
import lnPiala3 from "../assets/images/prestasi/lomba-debat-nasional-2022/piala 3.jpeg";
import lnPiala4 from "../assets/images/prestasi/lomba-debat-nasional-2022/piala 4.jpeg";
import lnPiala5 from "../assets/images/prestasi/lomba-debat-nasional-2022/piala 5.jpeg";
import lnPiala6 from "../assets/images/prestasi/lomba-debat-nasional-2022/piala 6.jpeg";
import lnPialaDebat from "../assets/images/prestasi/lomba-debat-nasional-2022/piala debat.jpeg";
import lnPialaDebat2 from "../assets/images/prestasi/lomba-debat-nasional-2022/piala debat 2.jpeg";
import lnPialaDebat3 from "../assets/images/prestasi/lomba-debat-nasional-2022/piala debat 3.jpeg";
import lnPialaDebat4 from "../assets/images/prestasi/lomba-debat-nasional-2022/piala debat 4.jpeg";

// === Lomba Internal 2023 ===
import internal1 from "../assets/images/prestasi/lomba-internal-2023/lomba-internal-1.jpg";
import internal2 from "../assets/images/prestasi/lomba-internal-2023/lomba-internal-2.jpg";
import internal3 from "../assets/images/prestasi/lomba-internal-2023/lomba-internal-3.jpg";

// === Lomba Forum Kerjasama Program Studi Magister Kenotariatan Perguruan Tinggi Swasta Indonesia 2024 ===
import forum1 from "../assets/images/prestasi/fk-pts-mkn-2024/fk-pts-mkn-1.jpg";
import forum2 from "../assets/images/prestasi/fk-pts-mkn-2024/fk-pts-mkn-2.jpg";
import forum3 from "../assets/images/prestasi/fk-pts-mkn-2024/fk-pts-mkn-3.jpg";
import forum4 from "../assets/images/prestasi/fk-pts-mkn-2024/fk-pts-mkn-4.jpg";
import forum5 from "../assets/images/prestasi/fk-pts-mkn-2024/fk-pts-mkn-5.jpg";
import forum6 from "../assets/images/prestasi/fk-pts-mkn-2024/fk-pts-mkn-6.jpg";
import forum7 from "../assets/images/prestasi/fk-pts-mkn-2024/fk-pts-mkn-7.jpg";
import forum8 from "../assets/images/prestasi/fk-pts-mkn-2024/fk-pts-mkn-8.jpg";
import forum9 from "../assets/images/prestasi/fk-pts-mkn-2024/fk-pts-mkn-9.jpg";
import forum10 from "../assets/images/prestasi/fk-pts-mkn-2024/fk-pts-mkn-10.jpg";

/**
 * @typedef {Object} FotoItem
 * @property {string} src - Import path gambar
 * @property {{ id: string, en: string }} caption - Keterangan foto bilingual
 */

/**
 * @typedef {Object} EventPrestasi
 * @property {string} id - ID unik event
 * @property {{ id: string, en: string }} nama - Nama event bilingual
 * @property {{ id: string, en: string }} keterangan - Deskripsi singkat bilingual
 * @property {FotoItem[]} foto - Daftar foto dalam event ini
 */

/** @type {EventPrestasi[]} */
export const prestasiEvents = [
  {
    id: "lomba-nasional-2022",
    nama: {
      id: "Lomba Debat Hukum Kenotariatan Nasional 2022",
      en: "National Notarial Debate Competition 2022",
    },
    keterangan: {
      id: "Mahasiswa MKn UNISSULA meraih prestasi gemilang pada ajang Lomba Debat Hukum Kenotariatan Nasional 2022.",
      en: "MKn UNISSULA students achieved outstanding results at the 2022 National Notarial Debate Competition.",
    },
    foto: [
      { src: lnJuara1, caption: { id: "Para pemenang menerima piala dan sertifikat", en: "Winners receiving trophies and certificates" } },
      { src: lnJuara2, caption: { id: "Foto bersama para pemenang", en: "Group photo of the winners" } },
      { src: lnJuara3, caption: { id: "Pemenang usai penyerahan penghargaan", en: "Winners after the award presentation" } },
      { src: lnJuara4, caption: { id: "Mahasiswa MKn UNISSULA bersama pemenang lain", en: "MKn UNISSULA student with fellow winners" } },
      { src: lnJuara5, caption: { id: "Mengangkat piala di atas panggung", en: "Raising trophies on stage" } },
      { src: lnJuara3Debat, caption: { id: "Sertifikat Juara 3 Lomba Debat Hukum Kenotariatan", en: "3rd Place certificate, Notarial Law Debate" } },
      { src: lnPiala2, caption: { id: "Tim MKn UNISSULA dengan piala dan sertifikat", en: "MKn UNISSULA team with trophies and certificates" } },
      { src: lnPiala3, caption: { id: "Kebersamaan tim MKn UNISSULA", en: "The MKn UNISSULA team together" } },
      { src: lnPiala4, caption: { id: "Juara 1 dan 2 Akhir Akta Notaris Terbaik", en: "1st and 2nd Place, Best Notarial Deed Closing" } },
      { src: lnPiala5, caption: { id: "Sertifikat Juara 1 Akhir Akta Notaris Terbaik", en: "1st Place certificate, Best Notarial Deed Closing" } },
      { src: lnPiala6, caption: { id: "Deretan piala dan sertifikat yang diraih", en: "Trophies and certificates won" } },
      { src: lnPialaDebat, caption: { id: "Penyerahan penghargaan kepada para pemenang", en: "Awards presented to the winners" } },
      { src: lnPialaDebat2, caption: { id: "Foto bersama pemenang dari berbagai kampus", en: "Winners from various universities" } },
      { src: lnPialaDebat3, caption: { id: "Selebrasi para pemenang", en: "Winners celebrating" } },
      { src: lnPialaDebat4, caption: { id: "Foto bersama seluruh pemenang lomba", en: "Group photo of all competition winners" } },
    ],
  },
  {
    id: "lomba-internal-2023",
    nama: {
      id: "Lomba Internal 2023",
      en: "Internal Competition 2023",
    },
    keterangan: {
      id: "Dokumentasi Lomba Internal 2023",
      en: "Documentation of Internal Competition 2023",
    },
    foto: [
      { src: internal1, caption: { id: "Foto bersama dosen dan peserta lomba", en: "Lecturers and participants group photo" } },
      { src: internal2, caption: { id: "Penyerahan sertifikat penghargaan", en: "Presentation of award certificates" } },
      { src: internal3, caption: { id: "Para pemenang di Notariat UNISSULA", en: "Winners at Notariat UNISSULA" } },
    ],
  },
  {
    id: "lomba-forum-kerjasama-pts-mkn-2024",
    nama: {
      id: "Lomba Forum Kerjasama Program Studi Magister Kenotariatan Perguruan Tinggi Swasta Indonesia 2024",
      en: "Forum Competition for Master's Program in Notarial Studies of Private Higher Education Institutions 2024",
    },
    keterangan: {
      id: "Dokumentasi Lomba Forum Kerjasama Program Studi Magister Kenotariatan Perguruan Tinggi Swasta Indonesia 2024",
      en: "Documentation of the Forum Competition for Master's Program in Notarial Studies of Private Higher Education Institutions 2024",
    },
    foto: [
      { src: forum1, caption: { id: "Babak debat hukum kenotariatan", en: "Notarial law debate round" } },
      { src: forum2, caption: { id: "Penyerahan piala kepada pemenang", en: "Trophy presentation to a winner" } },
      { src: forum3, caption: { id: "Penyerahan piala kepada tim pemenang", en: "Trophy presentation to the winning team" } },
      { src: forum4, caption: { id: "Penyerahan piala kepada pemenang", en: "Trophy presentation to a winner" } },
      { src: forum5, caption: { id: "Pemenang berfoto dengan piala", en: "Winners with their trophies" } },
      { src: forum6, caption: { id: "Pemenang bersama piala dan penghargaan", en: "Winner with trophy and award" } },
      { src: forum7, caption: { id: "Foto bersama usai penyerahan piala", en: "Group photo after the trophy presentation" } },
      { src: forum8, caption: { id: "Foto bersama peserta debat", en: "Debate participants group photo" } },
      { src: forum9, caption: { id: "Penyerahan piala kepada mahasiswa MKn UNISSULA", en: "Trophy presentation to MKn UNISSULA students" } },
      { src: forum10, caption: { id: "Foto bersama pemenang dari berbagai kampus", en: "Winners from various universities" } },
    ],
  },
];
