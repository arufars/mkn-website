import { Link, useLocation } from "react-router-dom";
import { navLinks } from "../../data/navLinks";
import { useT } from "../../i18n/languageContext";
import { useUi } from "../../i18n/useUi";

/**
 * Kamus pemetaan rute ke judul resmi berdasarkan navLinks.
 *
 * Nilainya disimpan mentah dalam bentuk { id, en } dan baru diselesaikan ke satu
 * bahasa saat render — peta ini dibangun sekali ketika modul dimuat, jadi tidak
 * boleh menyimpan hasil terjemahan yang terlanjur terkunci pada satu bahasa.
 */
const routeTitleMap = {
  "/quality-assurance": { id: "Quality Assurance Unit", en: "Quality Assurance Unit" },
  "/penerimaan": { id: "Informasi", en: "Information" },
  "/staff/faculty-directory": { id: "Dosen", en: "Academic Staff" },
  "/layanan-pengaduan": { id: "Pengaduan & Bantuan", en: "Support & Grievance" },
  "/akademik/panduan-akademik/pendaftaran-tesis": {
    id: "Pendaftaran Tesis",
    en: "Thesis Registration",
  },
};

function buildRouteTitleMap(items) {
  items.forEach((item) => {
    if (item.href && item.title) {
      routeTitleMap[item.href] = item.title;
    }
    if (item.children && Array.isArray(item.children)) {
      buildRouteTitleMap(item.children);
    }
  });
}
buildRouteTitleMap(navLinks);

/** Format ALL CAPS jadi Title Case ("ACADEMIC" -> "Academic", "STAFF" -> "Staff"). */
function rapikanJudul(teks) {
  if (!teks) return teks;
  return teks === teks.toUpperCase() && teks.length > 3
    ? teks.charAt(0) + teks.slice(1).toLowerCase()
    : teks;
}

/**
 * Helper untuk mengubah slug URL dinamis menjadi teks Title Case
 * Contoh: "ahmad-fauzan" -> "Ahmad Fauzan", "uts-uas" -> "UTS & UAS"
 */
function formatSlug(slug) {
  if (!slug) return "";

  const cleanSlug = decodeURIComponent(slug).trim().toLowerCase();

  // Khusus singkatan umum
  const acronyms = {
    "uts-uas": "UTS & UAS",
    "qa": "QA",
    "ukm": "UKM",
    "src": "Student Research Center",
  };

  if (acronyms[cleanSlug]) {
    return acronyms[cleanSlug];
  }

  return cleanSlug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Universal Dynamic Breadcrumb
 * Otomatis memetakan URL sedalam apapun (N-Level) secara dinamis tanpa hardcode.
 */
export default function Breadcrumb({ customTitle }) {
  const t = useT();
  const ui = useUi();
  const { pathname } = useLocation();

  // Pecah pathname menjadi array segmen (abaikan string kosong)
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-2 text-xs sm:text-[13px] text-gray-500 mb-6 sm:mb-10 flex-wrap"
    >
      <Link to="/" className="hover:text-primary transition-colors">
        {ui("home")}
      </Link>

      {segments.map((segment, index) => {
        const path = `/${segments.slice(0, index + 1).join("/")}`;
        const isLast = index === segments.length - 1;

        // Tentukan label breadcrumb:
        // 1. Jika customTitle diberikan pada item terakhir, pakai customTitle.
        // 2. Jika ada di routeTitleMap, pakai judul resmi.
        // 3. Jika tidak ada (URL dinamis/slug), ubah slug menjadi Title Case.
        const judulRute = routeTitleMap[path];
        const label =
          isLast && customTitle
            ? customTitle
            : judulRute
            ? rapikanJudul(t(judulRute))
            : formatSlug(segment);

        return (
          <span key={path} className="flex items-center gap-2">
            <span className="text-gray-400 select-none">/</span>
            {isLast ? (
              <span className="font-semibold text-heading">{label}</span>
            ) : (
              <Link to={path} className="hover:text-primary transition-colors">
                {label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
