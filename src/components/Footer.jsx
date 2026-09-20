import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaFacebook,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

import logoUnissula from "../assets/images/logo-unissula-crest.png";
import Img from "./ui/Img";
import { useT } from "../i18n/languageContext";
import { useUi } from "../i18n/useUi";
import { navLinks } from "../data/navLinks";

/** Akun media sosial resmi Program Studi Magister Kenotariatan UNISSULA. */
const socialLinks = [
  {
    label: "notariatunissula",
    href: "https://www.instagram.com/notariatunissula",
    Icon: FaInstagram,
  },
  {
    label: "Magister Kenotariatan Unissula",
    href: "https://www.tiktok.com/@notariatunissula",
    Icon: FaTiktok,
  },
  {
    label: "NOTARIAT TV",
    href: "https://www.youtube.com/@kenotariatanunissula",
    Icon: FaYoutube,
  },
  {
    label: "Notariat Unissula",
    href: "https://www.facebook.com/share/1APjdJTzaK/",
    Icon: FaFacebook,
  },
];

/** Kontak resmi program studi; nomor & surel selaras dengan halaman pengaduan. */
const kontak = {
  alamat: [
    "Fakultas Hukum Unissula",
    "Jl. Raya Kaligawe No.Km. 4, Terboyo Kulon",
    "Kec. Genuk, Kota Semarang, Jawa Tengah 50112",
  ],
  telepon: [
    { tampilan: "+62 823-1222-8181", href: "tel:+6282312228181" },
    { tampilan: "+62 823-1222-8282", href: "tel:+6282312228282" },
  ],
  surel: { tampilan: "mkn.fh@unissula.ac.id", href: "mailto:mkn.fh@unissula.ac.id" },
};

const deskripsiProdi = {
  id: "Mencetak Notaris profesional, beretika tinggi, dan berwawasan global melalui pendidikan hukum yang komprehensif.",
  en: "Producing professional, highly ethical, and globally competitive notaries through comprehensive legal education.",
};

/**
 * Judul menu dari navLinks, dipetakan per alamat.
 *
 * Footer hanya memilih alamat; namanya diambil dari navbar supaya keduanya tidak
 * pernah berbeda. Anak ditulis setelah induknya, sehingga alamat yang dipakai
 * bersama (mis. /quality-assurance) memakai judul menu anaknya.
 */
const judulMenu = {};
(function petakan(butir) {
  for (const item of butir) {
    judulMenu[item.href] = item.title;
    if (item.children) petakan(item.children);
  }
})(navLinks);

/**
 * Menu utama navbar ditulis kapital ("KERJA SAMA"); di footer dipakai versi
 * huruf biasanya.
 */
const namaKhusus = {
  "/berita": { id: "Berita", en: "News" },
  "/kerja-sama": { id: "Kerja Sama", en: "Partnerships" },
  "/event": { id: "Agenda", en: "Events" },
  "/download": { id: "Unduhan", en: "Download" },
  "/layanan-pengaduan": { id: "Layanan Pengaduan", en: "Complaint Service" },
};

/** Mengubah daftar alamat menjadi tautan bernama. */
function keTautan(hrefs) {
  return hrefs.map((href) => {
    const name = namaKhusus[href] ?? judulMenu[href];
    if (!name && import.meta.env.DEV) {
      console.warn(`[Footer] ${href} tidak ada di navLinks — perbarui daftar footer.`);
    }
    return { href, name: name ?? { id: href, en: href } };
  });
}

/** Tautan ringkas pada bar bawah, di samping teks hak cipta. */
const bottomLinks = keTautan(["/layanan-pengaduan", "/download"]);

/**
 * Kelompok navigasi footer — pilihan halaman yang paling sering dicari, bukan
 * salinan lengkap navbar. Setiap menu utama navbar terwakili, dan tiap alamat
 * hanya muncul sekali (termasuk bar bawah).
 */
const footerSections = [
  {
    title: { id: "PROFIL", en: "PROFILE" },
    links: keTautan([
      "/profil/sejarah",
      "/profil/visi-misi",
      "/profil/tujuan",
      "/profil/struktur-organisasi",
      "/berita",
      "/kerja-sama",
    ]),
  },
  {
    title: { id: "AKADEMIK", en: "ACADEMIC" },
    links: keTautan([
      "/akademik/kurikulum",
      "/akademik/pembelajaran",
      "/akademik/panduan-akademik",
      "/akademik/panduan-ujian",
      "/akademik/kalender",
      "/akademik/sistem-informasi",
      "/akademik/perpustakaan",
    ]),
  },
  {
    title: { id: "MAHASISWA & ALUMNI", en: "STUDENTS & ALUMNI" },
    links: keTautan([
      "/mahasiswa/organisasi",
      "/mahasiswa/prestasi",
      "/mahasiswa/akomodasi",
      "/alumni/ikanotsula",
      "/alumni/tracer-study",
      "/alumni/pusat-karir",
      "/alumni/lowongan",
    ]),
  },
  {
    title: { id: "INFORMASI", en: "INFORMATION" },
    links: keTautan([
      "/informasi/penerimaan-mahasiswa",
      "/informasi/tingkat-kelulusan",
      "/informasi/penelitian-dosen",
      "/informasi/pengabdian-dosen",
      "/event",
    ]),
  },
  {
    title: { id: "STAF & FASILITAS", en: "STAFF & FACILITIES" },
    links: keTautan([
      "/staff/dosen",
      "/staff/tendik",
      "/fasilitas/ruang-kelas",
      "/fasilitas/laboratorium-akta",
      "/fasilitas/laboratorium-manajemen-kantor",
      "/fasilitas/student-research-center",
      "/fasilitas/perpustakaan",
    ]),
  },
  {
    title: { id: "PENJAMINAN MUTU", en: "QUALITY ASSURANCE" },
    links: keTautan([
      "/quality-assurance",
      "/quality-assurance/qa-documents",
      "/quality-assurance/internal-audit-report",
      "/quality-assurance/learning-teaching-report",
      "/quality-assurance/student-survey-report",
      "/quality-assurance/alumni-survey-report",
    ]),
  },
];

export default function Footer() {
  const t = useT();
  const ui = useUi();

  return (
    <footer className="w-full font-body bg-white text-body border-t border-gray-200">
      {/* Blok utama: identitas + kontak + sosial di kiri, navigasi 3 kolom di kanan */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Kolom identitas */}
          <div className="lg:col-span-4 lg:pr-8">
            <Link
              to="/"
              className="inline-flex items-center gap-3 hover:opacity-95 transition-opacity"
            >
              <Img
                src={logoUnissula}
                alt=""
                aria-hidden="true"
                className="h-11 w-auto object-contain shrink-0"
              />
              <span className="flex flex-col justify-center font-heading font-bold leading-tight text-primary">
                <span className="text-[13px] sm:text-[15px]">MAGISTER KENOTARIATAN</span>
                <span className="text-[13px] sm:text-[15px]">FAKULTAS HUKUM UNISSULA</span>
              </span>
            </Link>

            <p className="mt-5 text-[12.5px] sm:text-[13px] leading-relaxed max-w-sm text-body">
              {t(deskripsiProdi)}
            </p>

            {/* Kontak & alamat */}
            <address className="mt-6 not-italic space-y-3 text-[12.5px] leading-relaxed">
              <div className="flex gap-3">
                <FaMapMarkerAlt aria-hidden="true" className="mt-1 shrink-0 text-primary" />
                <span className="text-body">
                  {kontak.alamat.map((baris) => (
                    <span key={baris} className="block">
                      {baris}
                    </span>
                  ))}
                </span>
              </div>
              {kontak.telepon.map((telepon) => (
                <div key={telepon.href} className="flex gap-3">
                  <FaPhoneAlt aria-hidden="true" className="mt-1 shrink-0 text-primary" />
                  <a
                    href={telepon.href}
                    className="text-body hover:text-primary transition-colors duration-150"
                  >
                    {telepon.tampilan}
                  </a>
                </div>
              ))}
              <div className="flex gap-3">
                <FaEnvelope aria-hidden="true" className="mt-1 shrink-0 text-primary" />
                <a
                  href={kontak.surel.href}
                  className="text-body hover:text-primary transition-colors duration-150 break-all"
                >
                  {kontak.surel.tampilan}
                </a>
              </div>
            </address>

            {/* Sosial media: pil bernama, sejajar di bawah kontak */}
            <div className="mt-7">
              <h2 className="font-heading text-[11px] font-semibold uppercase tracking-[0.18em] text-subheading-sidebar">
                {ui("followUs")}
              </h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {socialLinks.map(({ label, href, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-3.5 py-2 text-[12px] font-semibold text-heading hover:bg-primary hover:text-white hover:border-primary transition-colors duration-150"
                    >
                      <Icon aria-hidden="true" className="text-sm" />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Kolom navigasi: 6 kelompok dalam 3 kolom lebar */}
          <nav
            aria-label="Peta situs"
            className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-9"
          >
            {footerSections.map((section, sIdx) => (
              <div key={sIdx}>
                <h2 className="font-heading text-[11px] font-semibold uppercase tracking-[0.18em] text-heading pb-3 mb-3 border-b border-gray-200">
                  {t(section.title)}
                </h2>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        to={link.href}
                        className="group inline-flex items-baseline gap-2 text-[12.5px] leading-snug text-body hover:text-primary transition-colors duration-150"
                      >
                        <span
                          aria-hidden="true"
                          className="w-0 group-hover:w-3 h-px bg-primary shrink-0 translate-y-[-3px] transition-all duration-150"
                        />
                        {t(link.name)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Bar bawah */}
      <div className="bg-primary text-white/80">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-[11.5px] sm:text-xs">
            <p>
              © {new Date().getFullYear()} Magister Kenotariatan UNISSULA. {ui("allRightsReserved")}
            </p>
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {bottomLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="hover:text-white transition-colors duration-150"
                  >
                    {t(link.name)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
