import { useCallback, useEffect, useRef, useState } from "react";
import { FiImage, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { motion } from "framer-motion";
import clsx from "clsx";
import Img from "./Img";
import { useLightbox } from "./Lightbox";

/** Jeda geser otomatis galeri, dalam milidetik. */
const JEDA_GESER = 4000;

/** Jumlah titik halaman paling banyak yang tampil sekaligus; selebihnya titik bergeser. */
const MAKS_TITIK = 7;

const trekVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.1,
    },
  },
};

const kartuVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

/**
 * Galeri geser mendatar, tiga foto sekaligus di layar lebar.
 *
 * Memakai gulir asli peramban dengan scroll-snap, bukan transformasi manual:
 * tata letak "tiga foto sekaligus" cukup diatur lewat `basis`, gulir sentuh
 * dan papan ketik bekerja apa adanya, dan tidak perlu mengukur lebar elemen.
 *
 * Seretan tetikus sengaja tidak didukung: perpindahan foto dilakukan lewat
 * geser otomatis dan tombol panah di bawah galeri. Seretan sebelumnya memakai
 * setPointerCapture pada trek, yang membuat peramban mengarahkan sasaran event
 * click ke trek sehingga foto tidak bisa diklik untuk diperbesar. Gulir bawaan
 * (roda, trackpad, sentuhan) tetap bekerja apa adanya.
 *
 * Geser otomatis berhenti saat kursor berada di atas galeri dan saat pengguna
 * memilih "kurangi gerakan" di sistemnya.
 *
 * @param {Array<{id?: string|number, src?: string, alt?: string, judul?: string}>} foto
 *   Daftar foto. Butir tanpa `src` ditampilkan sebagai kartu "Foto menyusul".
 * @param {string} [ariaLabel] - Label aksesibilitas untuk carousel-nya.
 * @param {boolean} [otomatis=true] - Matikan bila beberapa galeri tampil sekaligus.
 * @param {boolean} [tampilkanJudul=true] - Tumpuk judul foto di atas gambar.
 * @param {string} [kelasTrek] - Kelas tambahan untuk trek, mis. jarak antarkartu.
 * @param {string} [kelasBasis] - Lebar tiap kartu; bawaannya sepertiga mulai md.
 * @param {string} [kelasKartu] - Bentuk tiap kartu (rasio, tinggi, tepi).
 */
export default function GaleriGeser({
  foto,
  ariaLabel = "Galeri kegiatan",
  otomatis = true,
  tampilkanJudul = true,
  kelasTrek = "",
  kelasBasis = "basis-full md:basis-1/3",
  kelasKartu = "aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:h-[380px] xl:h-[440px] border-r border-white/20 last:border-r-0",
}) {
  const trekRef = useRef(null);
  const [disorot, setDisorot] = useState(false);
  const [posisi, setPosisi] = useState({ indeks: 0, jumlah: 1 });
  const { open } = useLightbox();

  const grupFoto = foto
    .filter((item) => item.src)
    .map((item) => ({ src: item.src, alt: item.alt, caption: item.judul ?? item.alt }));

  /**
   * Lebar satu langkah gulir: jarak antartitik awal dua kartu, bukan lebar
   * kartunya. Keduanya sama saat trek rapat, tapi berbeda begitu trek diberi
   * jarak antarkartu — memakai offsetWidth di situ membuat posisi merayap.
   */
  const lebarLangkah = () => {
    const el = trekRef.current;
    const pertama = el?.children?.[0];
    const kedua = el?.children?.[1];
    if (!pertama) return 0;
    return kedua ? kedua.offsetLeft - pertama.offsetLeft : pertama.offsetWidth;
  };

  /**
   * Menghitung titik halaman dari posisi gulir.
   *
   * Galeri ini memakai gulir asli, jadi tidak ada nomor halaman yang bisa
   * dibaca langsung: jumlah titik diturunkan dari sisa ruang gulir dibagi
   * lebar satu langkah, dan titik aktifnya dari posisi gulir saat ini.
   */
  const perbaruiPosisi = useCallback(() => {
    const el = trekRef.current;
    const langkah = lebarLangkah();
    if (!el || langkah <= 0) return;

    const maksimum = el.scrollWidth - el.clientWidth;
    const jumlah = Math.max(Math.round(maksimum / langkah) + 1, 1);
    const indeks = Math.min(Math.round(el.scrollLeft / langkah), jumlah - 1);

    setPosisi((kini) =>
      kini.indeks === indeks && kini.jumlah === jumlah ? kini : { indeks, jumlah }
    );
  }, []);

  useEffect(() => {
    perbaruiPosisi();
    window.addEventListener("resize", perbaruiPosisi);
    return () => window.removeEventListener("resize", perbaruiPosisi);
  }, [perbaruiPosisi, foto]);

  const keHalaman = (i) => {
    const el = trekRef.current;
    if (el) el.scrollTo({ left: i * lebarLangkah(), behavior: "smooth" });
  };

  // Berputar: sampai ujung kanan kembali ke awal, begitu pula sebaliknya.
  // Dibungkus useCallback agar acuannya tetap, sehingga interval geser otomatis
  // tidak disetel ulang pada tiap render. Isinya hanya menyentuh ref.
  const geser = useCallback((arah) => {
    const el = trekRef.current;
    if (!el) return;

    const maksimum = el.scrollWidth - el.clientWidth;
    if (maksimum <= 0) return;

    const langkah = lebarLangkah();
    let tujuan;

    if (arah > 0) {
      tujuan = el.scrollLeft >= maksimum - 1 ? 0 : Math.min(el.scrollLeft + langkah, maksimum);
    } else {
      tujuan = el.scrollLeft <= 1 ? maksimum : Math.max(el.scrollLeft - langkah, 0);
    }

    el.scrollTo({ left: tujuan, behavior: "smooth" });
  }, []);

  // Geser otomatis.
  useEffect(() => {
    if (!otomatis || disorot) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = setInterval(() => geser(1), JEDA_GESER);
    return () => clearInterval(id);
  }, [otomatis, disorot, geser]);

  return (
    <section
      className="w-full"
      onMouseEnter={() => setDisorot(true)}
      onMouseLeave={() => setDisorot(false)}
      aria-roledescription="carousel"
      aria-label={ariaLabel}
    >
      <motion.div
        ref={trekRef}
        tabIndex={0}
        onScroll={perbaruiPosisi}
        variants={trekVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        // Klik didelegasikan dari trek: kartu yang diklik dicari lewat
        // data-indeks, yang sekaligus menyaring kartu tanpa foto.
        onClick={(e) => {
          const kartu = e.target.closest("[data-indeks]");
          if (!kartu) return;

          open(grupFoto, Number(kartu.dataset.indeks));
        }}
        className={clsx(
          "flex w-full overflow-x-auto snap-x snap-mandatory scrollbar-none select-none outline-none",
          kelasTrek
        )}
      >
        {foto.map((item, idx) => (
          <motion.div
            key={item.id ?? item.src ?? idx}
            variants={kartuVariants}
            data-indeks={item.src ? grupFoto.findIndex((f) => f.src === item.src) : undefined}
            className={clsx(
              "group relative shrink-0 snap-start bg-gray-200 overflow-hidden",
              kelasBasis,
              kelasKartu,
              item.src && "cursor-zoom-in"
            )}
          >
            {item.src ? (
              <>
                <Img
                  src={item.src}
                  alt={item.alt}
                  draggable={false}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out pointer-events-none"
                />
                {tampilkanJudul && item.judul && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent flex items-end p-6 sm:p-8">
                    <span className="text-sm sm:text-base md:text-lg font-medium text-white tracking-wide drop-shadow-md">
                      {item.judul}
                    </span>
                  </div>
                )}
              </>
            ) : (
              <div className="absolute inset-0 bg-gray-100 border border-dashed border-gray-300 flex flex-col items-center justify-center text-center gap-2 p-6">
                <FiImage className="text-3xl text-gray-300" />
                <span className="text-sm sm:text-base font-medium text-heading">{item.judul}</span>
                <span className="text-xs text-gray-400 uppercase tracking-[0.14em]">
                  Foto menyusul
                </span>
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Navigasi — bentuknya disamakan dengan galeri testimoni di beranda:
          panah kiri/kanan mengapit titik halaman. Muncul hanya bila fotonya
          memang lebih banyak daripada yang muat sekali tampil. */}
      {posisi.jumlah > 1 && (
        <div className="mt-6 flex items-center justify-center gap-5">
          <motion.button
            type="button"
            onClick={() => geser(-1)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Foto sebelumnya"
            className="shrink-0 w-10 h-10 flex items-center justify-center border border-gray-300 text-heading hover:border-primary hover:bg-primary hover:text-white rounded-xs transition-colors cursor-pointer"
          >
            <FiChevronLeft className="text-lg" />
          </motion.button>

          {/* Titik bergeser: paling banyak MAKS_TITIK titik yang tampil, dan
              jendelanya mengikuti halaman aktif. Dengan begitu lebar deretan
              titik tetap, sehingga galeri berisi banyak foto (mis. satu foto
              per halaman di ponsel) tidak mendorong tombol panah keluar layar.
              Titik di ujung jendela dikecilkan bila masih ada halaman di luarnya. */}
          <div className="flex items-center gap-2.5">
            {(() => {
              const { indeks, jumlah } = posisi;
              const tampil = Math.min(jumlah, MAKS_TITIK);
              const awal = Math.min(
                Math.max(indeks - Math.floor(tampil / 2), 0),
                jumlah - tampil
              );
              const akhir = awal + tampil - 1;

              return Array.from({ length: tampil }, (_, n) => {
                const i = awal + n;
                const aktif = i === indeks;
                const ujungBerlanjut =
                  !aktif && ((i === awal && awal > 0) || (i === akhir && akhir < jumlah - 1));

                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => keHalaman(i)}
                    aria-label={`Halaman galeri ${i + 1} dari ${jumlah}`}
                    aria-current={aktif ? "true" : undefined}
                    className={clsx(
                      "h-1.5 rounded-full transition-all duration-300 cursor-pointer",
                      aktif
                        ? "w-8 bg-primary"
                        : ujungBerlanjut
                          ? "w-1.5 bg-gray-300 hover:bg-gray-400"
                          : "w-3 bg-gray-300 hover:bg-gray-400"
                    )}
                  />
                );
              });
            })()}
          </div>

          <motion.button
            type="button"
            onClick={() => geser(1)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Foto berikutnya"
            className="shrink-0 w-10 h-10 flex items-center justify-center border border-gray-300 text-heading hover:border-primary hover:bg-primary hover:text-white rounded-xs transition-colors cursor-pointer"
          >
            <FiChevronRight className="text-lg" />
          </motion.button>
        </div>
      )}
    </section>
  );
}
