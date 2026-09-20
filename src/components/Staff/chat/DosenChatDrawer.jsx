import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiMessageSquare, FiX } from "react-icons/fi";
import { useDosenChat } from "../../../hooks/useDosenChat";
import { pick } from "../../../i18n/languageContext";
import {
  DaftarPesan,
  SaranPertanyaan,
  FormInput,
  CatatanCakupan,
} from "./ChatBagian";

/**
 * Varian D — tombol pemicu di area hero, panel meluncur dari kanan.
 *
 * Tidak memakan ruang tata letak sama sekali dan tidak menutupi apa pun saat
 * tertutup, sehingga Riwayat Pendidikan dan Dosen Lain tetap utuh. Pemicunya
 * berada tepat di bawah data kontak, tempat orang mencari cara menghubungi.
 */
export default function DosenChatDrawer({ dosen }) {
  const [terbuka, setTerbuka] = useState(false);
  const { pesan, input, setInput, sedangMengetik, kirim, saran } = useDosenChat(dosen);
  const baruMulai = pesan.length <= 1;

  // Kunci gulir latar selama panel terbuka, dan tutup dengan Escape.
  useEffect(() => {
    if (!terbuka) return;
    const asal = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && setTerbuka(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = asal;
      window.removeEventListener("keydown", onKey);
    };
  }, [terbuka]);

  return (
    <>
      {/* Pemicu di alur hero */}
      <button
        type="button"
        onClick={() => setTerbuka(true)}
        className="w-full max-w-xl flex items-center justify-between gap-4 px-5 py-4 border border-gray-300 bg-white rounded-xs hover:border-primary hover:bg-gray-50/60 transition-colors cursor-pointer group"
      >
        <span className="flex items-center gap-3 min-w-0">
          <span className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <FiMessageSquare className="text-base" />
          </span>
          <span className="text-left min-w-0">
            <span className="block text-xs font-bold tracking-[0.14em] uppercase text-primary">
              Tanya Langsung
            </span>
            <span className="block font-heading text-sm font-semibold text-heading truncate">
              Ajukan pertanyaan kepada {dosen.shortName || dosen.name}
            </span>
          </span>
        </span>
        <span
          aria-hidden="true"
          className="text-primary shrink-0 transition-transform group-hover:translate-x-1"
        >
          &rarr;
        </span>
      </button>

      <AnimatePresence>
        {terbuka && (
          <>
            <motion.div
              key="tirai"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={() => setTerbuka(false)}
              className="fixed inset-0 bg-black/30 z-50"
            />

            <motion.aside
              key="laci"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              role="dialog"
              aria-label={`Tanya ${dosen.shortName || dosen.name}`}
              className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white z-50 shadow-xl flex flex-col border-l border-gray-200"
            >
              {/* Kepala */}
              <div className="flex items-center gap-3 p-5 border-b border-gray-200 shrink-0">
                <div className="w-11 h-11 rounded-full overflow-hidden bg-gray-200 shrink-0 border border-gray-200">
                  {dosen.image && (
                    <img
                      src={dosen.image}
                      alt=""
                      className="w-full h-full object-cover object-top rounded-md hover:scale-105 transition-transform duration-500"
                    />
                  )}
                </div>
                <div className="min-w-0 flex-grow">
                  <span className="text-xs font-bold tracking-[0.14em] uppercase text-primary block">
                    Tanya Langsung
                  </span>
                  <p className="font-heading text-base font-semibold text-heading truncate">
                    {dosen.shortName || dosen.name}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{pick(dosen.title, "id")}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setTerbuka(false)}
                  aria-label="Tutup percakapan"
                  className="shrink-0 text-gray-400 hover:text-heading transition-colors cursor-pointer"
                >
                  <FiX className="text-xl" />
                </button>
              </div>

              {/* Percakapan */}
              <div className="flex-grow overflow-y-auto p-5 space-y-4 min-h-0">
                <DaftarPesan pesan={pesan} sedangMengetik={sedangMengetik} />
                {baruMulai && (
                  <SaranPertanyaan saran={saran} onPilih={(s) => kirim(s)} className="pt-1" />
                )}
              </div>

              {/* Masukan */}
              <div className="p-5 border-t border-gray-200 space-y-2.5 shrink-0">
                <FormInput
                  input={input}
                  setInput={setInput}
                  kirim={kirim}
                  sedangMengetik={sedangMengetik}
                />
                <CatatanCakupan />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
