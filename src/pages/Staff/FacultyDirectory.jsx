import { useState, useMemo, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { FiSearch, FiChevronDown, FiUser } from "react-icons/fi";
import { motion } from "framer-motion";
import { facultyData } from "../../data/facultyData";
import Img from "../../components/ui/Img";
import { useT, useLanguage, pick } from "../../i18n/languageContext";

/**
 * Urutan tampil daftar dosen: jenjang jabatan akademik dari yang tertinggi,
 * lalu jabatan struktural di dalam jenjang yang sama, dan terakhir abjad nama
 * tanpa gelar. Guru Besar yang menjabat Rektor karenanya berada paling awal.
 *
 * Jenjangnya dibaca dari `title` karena `type` hanya membedakan status
 * kepegawaian (Guru Besar / Dosen Tetap / Dosen Luar Biasa), bukan jabatan
 * fungsional. Guru Besar diperiksa lebih dulu: sebagian judul menyebut dua
 * jenjang sekaligus, mis. "Guru Besar Ilmu Hukum / Lektor Kepala".
 */
const JENJANG = [
    { peringkat: 1, cocok: /guru besar|profesor/i },
    { peringkat: 2, cocok: /lektor kepala|associate professor/i },
    { peringkat: 3, cocok: /lektor|assistant professor/i },
    { peringkat: 4, cocok: /asisten ahli/i },
];

/** Dosen tanpa jenjang tertulis ditaruh paling belakang, bukan disamakan. */
const TANPA_JENJANG = 99;

/**
 * Jabatan struktural, dari yang tertinggi. Hanya berlaku sebagai pembeda di
 * dalam satu jenjang akademik — pimpinan tidak melompati jenjang di atasnya,
 * sehingga Ketua Program Studi yang berjenjang Lektor tetap berada di bawah
 * para Lektor Kepala.
 */
const PIMPINAN = [
    { peringkat: 1, cocok: /rektor/i },
    { peringkat: 2, cocok: /ketua pengurus yayasan|ybwsa/i },
    { peringkat: 3, cocok: /dekan/i },
    { peringkat: 4, cocok: /ketua program studi/i },
    { peringkat: 5, cocok: /sekretaris program studi/i },
];

/** Tanpa jabatan struktural — diurutkan sesudah yang menjabat. */
const TANPA_JABATAN = 99;

/**
 * `title` dan `bio` sebagian dosen sudah berbentuk { id, en }, sebagian masih
 * string. Pengurutan selalu memakai teks Indonesia agar urutannya tidak
 * berubah saat bahasa diganti.
 */
const jabatanId = (dosen) => pick(dosen.title, "id") || "";

function peringkatPimpinan(dosen) {
    const jabatan = PIMPINAN.find((j) => j.cocok.test(jabatanId(dosen)));
    return jabatan ? jabatan.peringkat : TANPA_JABATAN;
}

function peringkatJabatan(dosen) {
    const jenjang = JENJANG.find((j) => j.cocok.test(jabatanId(dosen)));
    return jenjang ? jenjang.peringkat : TANPA_JENJANG;
}

function bandingkanDosen(a, b) {
    const selisihJenjang = peringkatJabatan(a) - peringkatJabatan(b);
    if (selisihJenjang !== 0) return selisihJenjang;

    const selisihPimpinan = peringkatPimpinan(a) - peringkatPimpinan(b);
    if (selisihPimpinan !== 0) return selisihPimpinan;

    return (a.shortName || a.name).localeCompare(b.shortName || b.name, "id");
}

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
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 26 },
  visible: (args = 0) => {
    const idx =
      typeof args === "object" && args !== null
        ? args.idx ?? 0
        : typeof args === "number"
        ? args
        : 0;
    const hasLoaded =
      typeof args === "object" && args !== null ? !!args.hasLoaded : false;

    // Saat awal muat halaman, baris pertama menunggu hero selesai sedikit
    const baseDelay = !hasLoaded && idx < 4 ? 0.35 : 0.04;
    // Stagger horizontal per 4 kolom dalam satu baris:
    const colDelay = (idx % 4) * 0.09;

    return {
      opacity: 1,
      y: 0,
      transition: {
        delay: baseDelay + colDelay,
        duration: 0.48,
        ease: [0.22, 1, 0.36, 1],
      },
    };
  },
};

export default function FacultyDirectory() {
    const t = useT();
    const { lang } = useLanguage();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedExpertise, setSelectedExpertise] = useState("Semua Keahlian");
    const [selectedType, setSelectedType] = useState("Semua Tipe");
    const [visibleCount, setVisibleCount] = useState(4);
    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setHasLoaded(true), 800);
        return () => clearTimeout(timer);
    }, []);

    // Active filter state triggered by "Terapkan Filter"
    const [appliedFilters, setAppliedFilters] = useState({
        search: "",
        expertise: "Semua Keahlian",
        type: "Semua Tipe",
    });

    const handleApplyFilter = () => {
        setAppliedFilters({
            search: searchQuery,
            expertise: selectedExpertise,
            type: selectedType,
        });
        setVisibleCount(4);
    };

    const filteredFaculty = useMemo(() => {
        const kataKunci = appliedFilters.search.toLowerCase();
        // Cari di kedua bahasa sekaligus, apa pun bahasa yang sedang aktif.
        const teks = (value) =>
            [pick(value, "id"), pick(value, "en")].filter(Boolean).join(" ").toLowerCase();

        return facultyData.filter((item) => {
            const matchSearch =
                teks(item.name).includes(kataKunci) ||
                teks(item.title).includes(kataKunci) ||
                teks(item.bio).includes(kataKunci);

            const matchExpertise =
                appliedFilters.expertise === "Semua Keahlian" ||
                pick(item.expertise, "id") === appliedFilters.expertise;

            const matchType =
                appliedFilters.type === "Semua Tipe" || pick(item.type, "id") === appliedFilters.type;

            return matchSearch && matchExpertise && matchType;
        }).sort(bandingkanDosen);
    }, [appliedFilters]);

    const displayedFaculty = filteredFaculty.slice(0, visibleCount);

    return (
        <>
            <Helmet>
                <html lang={lang} />
                <title>
                    {lang === "en"
                        ? "Faculty & Research | MKn UNISSULA"
                        : "Dosen & Penelitian | MKn UNISSULA"}
                </title>
                <meta
                    name="description"
                    content={
                        lang === "en"
                            ? "Explore the expertise and research contributions of the faculty members of the Master of Notarial Law Study Programme UNISSULA."
                            : "Jelajahi keahlian dan kontribusi penelitian dari staf pengajar Program Studi Magister Kenotariatan UNISSULA."
                    }
                />
            </Helmet>

            <div className="w-full font-body text-body">
                {/* Hero Title Section */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-8"
                >
                    <motion.span
                        variants={itemVariants}
                        className="text-xs font-semibold tracking-widest text-primary uppercase block mb-2"
                    >
                        {t({ id: "DIREKTORI AKADEMIK", en: "ACADEMIC DIRECTORY" })}
                    </motion.span>
                    <motion.h1
                        variants={itemVariants}
                        className="text-3xl sm:text-4xl md:text-5xl font-heading text-heading font-normal tracking-tight"
                    >
                        {t({ id: "Dosen & Penelitian", en: "Faculty & Research" })}
                    </motion.h1>
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
                        className="h-[2px] bg-primary mt-3"
                    />
                    <motion.p
                        variants={itemVariants}
                        className="mt-4 text-sm sm:text-base text-special leading-relaxed max-w-3xl"
                    >
                        {t({
                            id: "Jelajahi keahlian dan kontribusi penelitian dari staf pengajar kami yang merupakan pakar terkemuka di bidang ilmu kenotariatan dan hukum, berkomitmen pada keunggulan akademis dan integritas profesional.",
                            en: "Explore the expertise and research contributions of our faculty members, who are prominent scholars and practitioners in notarial law, committed to academic excellence and professional integrity.",
                        })}
                    </motion.p>
                </motion.div>

                {/* Filter & Search Bar Section */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full border-y border-gray-200 bg-white"
                >
                    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 items-end">

                            {/* Search by Name */}
                            <div className="lg:col-span-4 space-y-1.5">
                                <label className="text-xs sm:text-xs font-medium text-gray-500 block">
                                    {t({ id: "Pencarian", en: "Search" })}
                                </label>
                                <div className="relative flex items-center">
                                    <FiSearch className="absolute left-3 text-gray-400 text-sm" />
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onKeyDown={(e) => e.key === "Enter" && handleApplyFilter()}
                                        placeholder={lang === "en" ? "Search faculty name..." : "Cari nama dosen..."}
                                        className="w-full bg-[#fbfbfb] border border-gray-200 rounded-sm pl-9 pr-3 py-2 text-xs sm:text-sm text-heading placeholder-gray-400 focus:outline-none focus:border-primary/50 focus:bg-white transition-all"
                                    />
                                </div>
                            </div>

                            {/* Filter: Area Keahlian */}
                            <div className="lg:col-span-3 space-y-1.5">
                                <label className="text-xs sm:text-xs font-medium text-gray-500 block">
                                    {t({ id: "Area Keahlian", en: "Area of Expertise" })}
                                </label>
                                <div className="relative">
                                    <select
                                        value={selectedExpertise}
                                        onChange={(e) => setSelectedExpertise(e.target.value)}
                                        className="w-full appearance-none bg-[#fbfbfb] border border-gray-200 rounded-sm px-3.5 py-2 text-xs sm:text-sm text-heading focus:outline-none focus:border-primary/50 focus:bg-white transition-all cursor-pointer"
                                    >
                                        <option value="Semua Keahlian">{t({ id: "Semua Keahlian", en: "All Expertise" })}</option>
                                        <option value="Hukum Agraria">{t({ id: "Hukum Agraria", en: "Agrarian Law" })}</option>
                                        <option value="Hukum Perusahaan">{t({ id: "Hukum Perusahaan", en: "Corporate Law" })}</option>
                                        <option value="Hukum Perikatan">{t({ id: "Hukum Perikatan", en: "Law of Obligations" })}</option>
                                        <option value="Hukum Keluarga & Waris">{t({ id: "Hukum Keluarga & Waris", en: "Family & Inheritance Law" })}</option>
                                        <option value="Hukum Kenotariatan">{t({ id: "Hukum Kenotariatan", en: "Notarial Law" })}</option>
                                        <option value="Hukum Bisnis & Pasar Modal">{t({ id: "Hukum Bisnis & Pasar Modal", en: "Business & Capital Market Law" })}</option>
                                        <option value="Filsafat & Teori Hukum">{t({ id: "Filsafat & Teori Hukum", en: "Philosophy & Theory of Law" })}</option>
                                        <option value="Hukum Pajak Kenotariatan">{t({ id: "Hukum Pajak Kenotariatan", en: "Notarial Tax Law" })}</option>
                                    </select>
                                    <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none text-sm" />
                                </div>
                            </div>

                            {/* Filter: Tipe Pengajar */}
                            <div className="lg:col-span-3 space-y-1.5">
                                <label className="text-[11px] sm:text-xs font-medium text-gray-500 block">
                                    {t({ id: "Tipe Pengajar", en: "Faculty Type" })}
                                </label>
                                <div className="relative">
                                    <select
                                        value={selectedType}
                                        onChange={(e) => setSelectedType(e.target.value)}
                                        className="w-full appearance-none bg-[#fbfbfb] border border-gray-200 rounded-sm px-3.5 py-2 text-xs sm:text-sm text-heading focus:outline-none focus:border-primary/50 focus:bg-white transition-all cursor-pointer"
                                    >
                                        <option value="Semua Tipe">{t({ id: "Semua Tipe", en: "All Types" })}</option>
                                        <option value="Guru Besar">{t({ id: "Guru Besar", en: "Professor" })}</option>
                                        <option value="Dosen Tetap">{t({ id: "Dosen Tetap", en: "Permanent Faculty" })}</option>
                                        <option value="Dosen Praktisi">{t({ id: "Dosen Praktisi / Notaris", en: "Practitioner / Notary" })}</option>
                                    </select>
                                    <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none text-sm" />
                                </div>
                            </div>

                            {/* Submit Filter Button */}
                            <div className="lg:col-span-2">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleApplyFilter}
                                    className="w-full bg-btn hover:opacity-90 text-white text-xs sm:text-[13px] font-semibold py-2.5 px-4 rounded-sm transition-opacity cursor-pointer text-center"
                                >
                                    {t({ id: "Terapkan Filter", en: "Apply Filter" })}
                                </motion.button>
                            </div>


                        </div>
                    </div>
                </motion.div>

                {/* Faculty Grid Cards */}
                <div className="w-full flex-grow max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {displayedFaculty.length > 0 ? (
                        <div
                            key={appliedFilters.search + appliedFilters.expertise + appliedFilters.type}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                        >
                            {displayedFaculty.map((faculty, index) => (
                                <motion.div
                                    key={faculty.id}
                                    custom={{ idx: index, hasLoaded }}
                                    variants={cardVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, amount: 0.12 }}
                                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                                    className="h-full flex flex-col"
                                >
                                    <Link
                                        to={`/staff/dosen/${faculty.slug || faculty.id}`}
                                        className="bg-white border border-gray-200 rounded-xs overflow-hidden flex flex-col hover:border-primary/40 hover:shadow-md transition-all duration-200 group cursor-pointer h-full"
                                    >
                                        {/* Grayscale Portrait Photo / Placeholder */}
                                        <div className="w-full aspect-4/5 bg-gray-100 overflow-hidden relative flex items-center justify-center">
                                            {faculty.image ? (
                                                <Img
                                                    src={faculty.image}
                                                    alt={faculty.name}
                                                    className="w-full h-full object-cover object-top contrast-105 group-hover:scale-103 transition-transform duration-500 rounded-md"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 text-gray-400 group-hover:bg-gray-100 transition-colors p-4 text-center">
                                                    <FiUser className="text-5xl text-gray-300 mb-2" />
                                                    <span className="text-[11px] uppercase tracking-wider font-medium text-gray-400">
                                                        {t({ id: "Foto Belum Tersedia", en: "Photo Not Available" })}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Card Details */}
                                        <div className="p-5 text-center flex flex-col grow justify-between">
                                            <div className="space-y-1.5">
                                                <h3 className="font-heading font-bold text-base sm:text-lg text-primary leading-tight group-hover:text-primary/90 transition-colors">
                                                    {faculty.name}
                                                </h3>
                                                <p className="text-xs uppercase tracking-wider text-gray-500 font-medium">
                                                    {t(faculty.title)}
                                                </p>
                                            </div>

                                            <p className="text-xs sm:text-sm text-body leading-relaxed mt-4 line-clamp-3">
                                                {t(faculty.bio)}
                                            </p>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 text-body">
                            <p className="text-base font-medium">
                                {t({
                                    id: "Tidak ada dosen yang sesuai dengan kriteria filter.",
                                    en: "No faculty members match the filter criteria.",
                                })}
                            </p>
                            <button
                                onClick={() => {
                                    setSearchQuery("");
                                    setSelectedExpertise("Semua Keahlian");
                                    setSelectedType("Semua Tipe");
                                    setAppliedFilters({
                                        search: "",
                                        expertise: "Semua Keahlian",
                                        type: "Semua Tipe",
                                    });
                                }}
                                className="mt-3 text-xs text-primary font-semibold underline cursor-pointer"
                            >
                                {t({ id: "Reset Filter", en: "Reset Filter" })}
                            </button>
                        </div>
                    )}

                    {/* Load More Button */}
                    {visibleCount < filteredFaculty.length && (
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.45 }}
                            className="flex justify-center mt-12"
                        >
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => setVisibleCount(filteredFaculty.length)}
                                className="bg-white border border-gray-300 text-heading hover:bg-gray-50 hover:border-gray-400 text-xs font-medium py-2.5 px-8 rounded-sm shadow-2xs transition-all duration-150 cursor-pointer"
                            >
                                {t({ id: "Muat Lebih Banyak", en: "Load More" })}
                            </motion.button>
                        </motion.div>
                    )}
                </div>
            </div>
        </>
    );
}
