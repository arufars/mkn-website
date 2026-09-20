import { FiDownload, FiFileText } from "react-icons/fi";
import {
  JudulSeksi,
  DaftarSyarat,
  KartuRingkas,
  BobotPenilaian,
  CatatanDokumen,
} from "../../components/Akademik/panduan/PanduanSorot";
import {
  tesisSyaratRingkas,
  timPengujiRingkas,
  komponenPenilaian,
  tataTertibRingkas,
  yudisiumRingkas,
  halamanTesis,
  contohTesis,
} from "../../data/akademik/panduanTesisData";
import { useT } from "../../i18n/languageContext";

export default function TesisUjian() {
  const t = useT();

  return (
    <div className="space-y-12 sm:space-y-14">
      <section className="space-y-5">
        <JudulSeksi
          judul={halamanTesis.seksi.syaratTesis}
          keterangan={halamanTesis.seksi.syaratTesisKeterangan}
        />
        <DaftarSyarat butir={tesisSyaratRingkas} />
      </section>

      {/* Contoh Tesis — Download */}
      <section className="space-y-5">
        <JudulSeksi
          judul={halamanTesis.seksi.contohTesis}
          keterangan={halamanTesis.seksi.contohTesisKeterangan}
        />
        <ul className="space-y-3">
          {contohTesis.map((item) => (
            <li key={item.id}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 border border-gray-200 rounded-xs bg-white hover:border-primary/40 hover:shadow-sm transition-all duration-200 group"
              >
                <span className="shrink-0 w-10 h-10 flex items-center justify-center rounded-xs bg-primary/8 text-primary text-xl">
                  <FiFileText />
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-heading leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                    {t(item.judul)}
                  </p>
                  <p className="text-xs text-body mt-0.5">{item.tahun}</p>
                </div>
                <span className="shrink-0 text-gray-400 group-hover:text-primary transition-colors">
                  <FiDownload />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-5">
        <JudulSeksi
          judul={halamanTesis.seksi.timPengujiTesis}
          keterangan={halamanTesis.seksi.timPengujiTesisKeterangan}
        />
        <KartuRingkas butir={timPengujiRingkas} kolom={3} />
      </section>

      <section className="space-y-5">
        <JudulSeksi
          judul={halamanTesis.seksi.komponen}
          keterangan={halamanTesis.seksi.komponenKeterangan}
        />
        <BobotPenilaian komponen={komponenPenilaian} />
      </section>

      <section className="space-y-5">
        <JudulSeksi judul={halamanTesis.seksi.tataTertib} />
        <KartuRingkas butir={tataTertibRingkas} kolom={2} />
      </section>

      <section className="space-y-5">
        <JudulSeksi judul={halamanTesis.seksi.yudisium} />
        <KartuRingkas butir={yudisiumRingkas} kolom={3} />
      </section>

      <CatatanDokumen nama={halamanTesis.namaDokumen} />
    </div>
  );
}
