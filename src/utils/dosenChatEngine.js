import { pick } from "../i18n/languageContext";


/** Kelompok kata kunci per topik, mencakup Indonesia dan Inggris. */
const TOPIK = [
  {
    id: "penelitian",
    kata: ["penelitian", "riset", "fokus", "kajian", "bidang", "keahlian", "research", "focus", "expertise"],
  },
  {
    id: "mataKuliah",
    kata: ["mata kuliah", "matkul", "ampu", "mengajar", "ajar", "kelas", "course", "teach", "class", "sks"],
  },
  {
    id: "publikasi",
    kata: ["publikasi", "jurnal", "artikel", "karya", "tulisan", "paper", "publication", "journal", "article"],
  },
  {
    id: "pendidikan",
    kata: ["pendidikan", "riwayat", "kuliah di", "almamater", "s1", "s2", "s3", "doktor", "education", "degree", "study"],
  },
  {
    id: "pengabdian",
    kata: ["pengabdian", "masyarakat", "sosial", "community", "service"],
  },
  {
    id: "kontak",
    kata: ["kontak", "hubungi", "email", "surel", "nidn", "contact", "reach", "mail"],
  },
  {
    id: "profil",
    kata: ["siapa", "profil", "tentang", "perkenalan", "about", "who", "introduce"],
  },
];

function deteksiTopik(pertanyaan) {
  const q = pertanyaan.toLowerCase();
  for (const topik of TOPIK) {
    if (topik.kata.some((k) => q.includes(k))) return topik.id;
  }
  return null;
}

function daftar(items) {
  return items.map((t) => `• ${t}`).join("\n");
}

/**
 * Susun jawaban dari data dosen yang bersangkutan.
 *
 * @param {object} dosen - satu entri dari facultyData
 * @param {string} pertanyaan
 * @returns {string}
 */
export function jawabSebagaiDosen(dosen, pertanyaan) {
  const nama = dosen.shortName || dosen.name;
  const topik = deteksiTopik(pertanyaan);

  switch (topik) {
    case "penelitian":
      return [
        `Fokus keilmuan saya ada di ${pick(dosen.expertise, "id")}.`,
        pick(dosen.bio, "id"),
      ]
        .filter(Boolean)
        .join("\n\n");

    case "mataKuliah": {
      if (!dosen.courses?.length) {
        return `Maaf, data mata kuliah yang saya ampu belum tercantum di profil ini.`;
      }
      const baris = dosen.courses.map(
        (c) => `${c.name} (${c.placement}${c.sks ? `, ${c.sks} SKS` : ""})`
      );
      return `Saya mengampu ${dosen.courses.length} mata kuliah:\n\n${daftar(baris)}`;
    }

    case "publikasi": {
      if (!dosen.publications?.length) {
        return `Maaf, daftar publikasi saya belum tercantum di profil ini.`;
      }
      const baris = dosen.publications
        .slice(0, 3)
        .map((p) => `${p.title} (${p.year})`);
      const sisa = dosen.publications.length - baris.length;
      return (
        `Beberapa publikasi terpilih saya:\n\n${daftar(baris)}` +
        (sisa > 0 ? `\n\nMasih ada ${sisa} publikasi lain di bagian Publikasi Terpilih.` : "")
      );
    }

    case "pendidikan": {
      if (!dosen.education?.length) {
        return `Maaf, riwayat pendidikan saya belum tercantum di profil ini.`;
      }
      const baris = dosen.education.map(
        (e) => `${e.degree} — ${e.university} (${e.year})`
      );
      return `Riwayat pendidikan saya:\n\n${daftar(baris)}`;
    }

    case "pengabdian": {
      if (!dosen.communityServices?.length) {
        return `Maaf, data pengabdian masyarakat saya belum tercantum di profil ini.`;
      }
      const baris = dosen.communityServices
        .slice(0, 3)
        .map((s) => (typeof s === "string" ? s : s.title || s.name));
      return `Kegiatan pengabdian yang saya lakukan antara lain:\n\n${daftar(baris)}`;
    }

    case "kontak": {
      const bagian = [];
      if (dosen.email) bagian.push(`Surel: ${dosen.email}`);
      if (dosen.nidn) bagian.push(`NIDN: ${dosen.nidn}`);
      if (!bagian.length) {
        return `Maaf, informasi kontak saya belum tercantum di profil ini.`;
      }
      return `Silakan hubungi saya melalui:\n\n${daftar(bagian)}`;
    }

    case "profil":
      return [
        `Saya ${dosen.name}, ${pick(dosen.title, "id")} di Program Studi Magister Kenotariatan UNISSULA.`,
        pick(dosen.bio, "id"),
      ]
        .filter(Boolean)
        .join("\n\n");

    default:
      return (
        `Maaf, saya hanya dapat menjawab pertanyaan seputar profil ${nama} ` +
        `— bidang keahlian, mata kuliah yang diampu, publikasi, riwayat pendidikan, ` +
        `pengabdian, dan kontak.\n\nUntuk pertanyaan di luar itu, silakan hubungi ` +
        `sekretariat program studi.`
      );
  }
}

/** Pertanyaan saran, hanya yang datanya benar-benar tersedia. */
export function saranPertanyaan(dosen) {
  const saran = [];
  if (dosen.expertise) saran.push("Apa fokus penelitian Anda?");
  if (dosen.courses?.length) saran.push("Mata kuliah apa yang Anda ampu?");
  if (dosen.publications?.length) saran.push("Publikasi terbaru Anda apa saja?");
  if (dosen.education?.length) saran.push("Bagaimana riwayat pendidikan Anda?");
  if (dosen.email) saran.push("Bagaimana cara menghubungi Anda?");
  return saran.slice(0, 3);
}

/** Sapaan pembuka dalam suara persona dosen. */
export function sapaanPembuka(dosen) {
  return (
    `Halo, saya ${dosen.shortName || dosen.name}. ` +
    `Silakan bertanya seputar bidang keahlian, mata kuliah, atau publikasi saya.`
  );
}
