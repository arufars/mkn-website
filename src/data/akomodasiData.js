/**
 * Akomodasi UNISSULA — asrama mahasiswa, wisma tamu, dan fasilitas pendukung kampus.
 *
 * SUMBER:
 * - Asrama dan guest house: dokumen resmi "akomodasi.docx" dari program studi.
 *   Deskripsi dan daftar fasilitasnya disalin dari dokumen tersebut, hanya
 *   dirapikan ejaannya.
 * - Fasilitas pendukung (sport center, gym, lapangan basket, coffee shop,
 *   kantin, klinik, mini market, masjid): program studi hanya menyerahkan
 *   foto. Deskripsi dan daftar fasilitasnya disusun dari apa yang tampak di
 *   foto — termasuk nama yang terbaca pada papan nama (Leavy Coffee Shop,
 *   Kumaira, Klinik Pratama Sultan Agung, Gedung Ibrahim) dan jam praktik
 *   pada papan jadwal klinik. Mohon dicocokkan ulang bila dokumen resminya
 *   sudah ada.
 *
 * Tarif, tipe kamar, alamat, maupun narahubung pengelola tidak dicantumkan
 * karena tidak ada sumbernya — bukan dikira-kira.
 *
 * Foto tersimpan di assets/images/akomodasi; foto fasilitas pendukung berada
 * di subfolder sesuai slug-nya dengan format WebP ({slug}-{nomor}.webp).
 * Keterangannya sengaja hanya menyebut apa yang terlihat di gambar.
 */

import asrama1 from "../assets/images/akomodasi/asrama-1.jpg";
import asrama2 from "../assets/images/akomodasi/asrama-2.jpg";
import asrama3 from "../assets/images/akomodasi/asrama-3.png";
import asrama4 from "../assets/images/akomodasi/asrama-4.png";
import asrama5 from "../assets/images/akomodasi/asrama-5.png";

import guestHouse1 from "../assets/images/akomodasi/bh-1.jpg";
import guestHouse2 from "../assets/images/akomodasi/bh-2.jpg";
import guestHouse3 from "../assets/images/akomodasi/bh-3.png";
import guestHouse4 from "../assets/images/akomodasi/bh-4.png";
import guestHouse5 from "../assets/images/akomodasi/bh-5.png";
import guestHouse6 from "../assets/images/akomodasi/bh-6.png";
import guestHouse7 from "../assets/images/akomodasi/bh-7.png";

import sportCenter1 from "../assets/images/akomodasi/sport-center/sport-center-1.webp";
import sportCenter2 from "../assets/images/akomodasi/sport-center/sport-center-2.webp";
import sportCenter3 from "../assets/images/akomodasi/sport-center/sport-center-3.webp";
import sportCenter4 from "../assets/images/akomodasi/sport-center/sport-center-4.webp";
import sportCenter5 from "../assets/images/akomodasi/sport-center/sport-center-5.webp";
import sportCenter6 from "../assets/images/akomodasi/sport-center/sport-center-6.webp";
import sportCenter7 from "../assets/images/akomodasi/sport-center/sport-center-7.webp";
import sportCenter8 from "../assets/images/akomodasi/sport-center/sport-center-8.webp";
import sportCenter9 from "../assets/images/akomodasi/sport-center/sport-center-9.webp";

import gym1 from "../assets/images/akomodasi/gym/gym-1.webp";
import gym2 from "../assets/images/akomodasi/gym/gym-2.webp";
import gym3 from "../assets/images/akomodasi/gym/gym-3.webp";
import gym4 from "../assets/images/akomodasi/gym/gym-4.webp";
import gym5 from "../assets/images/akomodasi/gym/gym-5.webp";
import gym6 from "../assets/images/akomodasi/gym/gym-6.webp";

import lapanganBasket1 from "../assets/images/akomodasi/lapangan-basket/lapangan-basket-1.webp";
import lapanganBasket2 from "../assets/images/akomodasi/lapangan-basket/lapangan-basket-2.webp";
import lapanganBasket3 from "../assets/images/akomodasi/lapangan-basket/lapangan-basket-3.webp";
import lapanganBasket4 from "../assets/images/akomodasi/lapangan-basket/lapangan-basket-4.webp";
import lapanganBasket5 from "../assets/images/akomodasi/lapangan-basket/lapangan-basket-5.webp";
import lapanganBasket6 from "../assets/images/akomodasi/lapangan-basket/lapangan-basket-6.webp";
import lapanganBasket7 from "../assets/images/akomodasi/lapangan-basket/lapangan-basket-7.webp";
import lapanganBasket8 from "../assets/images/akomodasi/lapangan-basket/lapangan-basket-8.webp";
import lapanganBasket9 from "../assets/images/akomodasi/lapangan-basket/lapangan-basket-9.webp";

import coffeeShop1 from "../assets/images/akomodasi/coffee-shop/coffee-shop-1.webp";
import coffeeShop2 from "../assets/images/akomodasi/coffee-shop/coffee-shop-2.webp";
import coffeeShop3 from "../assets/images/akomodasi/coffee-shop/coffee-shop-3.webp";
import coffeeShop4 from "../assets/images/akomodasi/coffee-shop/coffee-shop-4.webp";
import coffeeShop5 from "../assets/images/akomodasi/coffee-shop/coffee-shop-5.webp";
import coffeeShop6 from "../assets/images/akomodasi/coffee-shop/coffee-shop-6.webp";
import coffeeShop7 from "../assets/images/akomodasi/coffee-shop/coffee-shop-7.webp";
import coffeeShop8 from "../assets/images/akomodasi/coffee-shop/coffee-shop-8.webp";
import coffeeShop9 from "../assets/images/akomodasi/coffee-shop/coffee-shop-9.webp";

import kantin1 from "../assets/images/akomodasi/kantin/kantin-1.webp";
import kantin2 from "../assets/images/akomodasi/kantin/kantin-2.webp";
import kantin3 from "../assets/images/akomodasi/kantin/kantin-3.webp";
import kantin4 from "../assets/images/akomodasi/kantin/kantin-4.webp";
import kantin5 from "../assets/images/akomodasi/kantin/kantin-5.webp";
import kantin6 from "../assets/images/akomodasi/kantin/kantin-6.webp";
import kantin7 from "../assets/images/akomodasi/kantin/kantin-7.webp";
import kantin8 from "../assets/images/akomodasi/kantin/kantin-8.webp";
import kantin9 from "../assets/images/akomodasi/kantin/kantin-9.webp";

import klinik1 from "../assets/images/akomodasi/klinik/klinik-1.webp";
import klinik2 from "../assets/images/akomodasi/klinik/klinik-2.webp";
import klinik3 from "../assets/images/akomodasi/klinik/klinik-3.webp";
import klinik4 from "../assets/images/akomodasi/klinik/klinik-4.webp";
import klinik5 from "../assets/images/akomodasi/klinik/klinik-5.webp";
import klinik6 from "../assets/images/akomodasi/klinik/klinik-6.webp";
import klinik7 from "../assets/images/akomodasi/klinik/klinik-7.webp";
import klinik8 from "../assets/images/akomodasi/klinik/klinik-8.webp";
import klinik9 from "../assets/images/akomodasi/klinik/klinik-9.webp";

import miniMarket1 from "../assets/images/akomodasi/mini-market/mini-market-1.webp";
import miniMarket2 from "../assets/images/akomodasi/mini-market/mini-market-2.webp";
import miniMarket3 from "../assets/images/akomodasi/mini-market/mini-market-3.webp";
import miniMarket4 from "../assets/images/akomodasi/mini-market/mini-market-4.webp";
import miniMarket5 from "../assets/images/akomodasi/mini-market/mini-market-5.webp";
import miniMarket6 from "../assets/images/akomodasi/mini-market/mini-market-6.webp";
import miniMarket7 from "../assets/images/akomodasi/mini-market/mini-market-7.webp";
import miniMarket8 from "../assets/images/akomodasi/mini-market/mini-market-8.webp";
import miniMarket9 from "../assets/images/akomodasi/mini-market/mini-market-9.webp";

import masjid1 from "../assets/images/akomodasi/masjid/masjid-1.webp";
import masjid2 from "../assets/images/akomodasi/masjid/masjid-2.webp";
import masjid3 from "../assets/images/akomodasi/masjid/masjid-3.webp";
import masjid4 from "../assets/images/akomodasi/masjid/masjid-4.webp";
import masjid5 from "../assets/images/akomodasi/masjid/masjid-5.webp";
import masjid6 from "../assets/images/akomodasi/masjid/masjid-6.webp";
import masjid7 from "../assets/images/akomodasi/masjid/masjid-7.webp";
import masjid8 from "../assets/images/akomodasi/masjid/masjid-8.webp";
import masjid9 from "../assets/images/akomodasi/masjid/masjid-9.webp";

export const akomodasiData = {
  asrama: {
    id: "asrama",
    title: {
      id: "Sultan Agung Boarding House",
      en: "Sultan Agung Boarding House",
    },
    shortName: {
      id: "Asrama Mahasiswa",
      en: "Student Residence",
    },
    header: {
      category: { id: "ASRAMA MAHASISWA", en: "STUDENT RESIDENCE" },
      title: {
        id: "Hunian jangka panjang berbudaya islami",
        en: "Long-term student housing with an Islamic environment",
      },
      paragraphs: [
        {
          id: "Fasilitas akomodasi ini ditujukan untuk hunian jangka panjang bagi mahasiswa maupun tamu, dengan pengelolaan lingkungan yang kental dengan budaya islami.",
          en: "This accommodation facility offers long-term residential housing for students and visitors, managed within an enriching Islamic cultural environment.",
        },
        {
          id: "Selain sebagai tempat tinggal, asrama ini berfungsi sebagai Pesantren Mahasiswa yang bertujuan membentuk karakter khaira ummah berakhlakul karimah serta membiasakan kedisiplinan beribadah.",
          en: "Beyond lodging, this residence serves as a student Islamic boarding community aimed at forging noble character (khaira ummah) and consistent devotional discipline.",
        },
      ],
    },
    galeri: [
      {
        src: asrama1,
        keterangan: {
          id: "Tampak depan gedung asrama.",
          en: "Front facade of the student residence.",
        },
      },
      {
        src: asrama2,
        keterangan: {
          id: "Halaman depan gedung asrama.",
          en: "Front courtyard of the student residence.",
        },
      },
      {
        src: asrama3,
        keterangan: {
          id: "Koridor lantai atas asrama.",
          en: "Upper floor corridor of the residence.",
        },
      },
      {
        src: asrama4,
        keterangan: {
          id: "Kamar empat tempat tidur.",
          en: "Four-bed dormitory room.",
        },
      },
      {
        src: asrama5,
        keterangan: {
          id: "Kamar dengan meja belajar.",
          en: "Student room equipped with study desks.",
        },
      },
    ],
    fasilitas: [
      {
        id: "Kamar asrama yang didesain nyaman untuk kebutuhan istirahat mahasiswa.",
        en: "Comfortable dormitory rooms designed for student rest and study.",
      },
      {
        id: "Ruang tunggu tamu.",
        en: "Visitor lounge.",
      },
      {
        id: "Area parkir kendaraan yang terjamin keamanannya.",
        en: "Secure parking area.",
      },
      {
        id: "Fasilitas hot spot (Wi-Fi) untuk menunjang kebutuhan belajar.",
        en: "High-speed Wi-Fi hotspot support for academic needs.",
      },
      {
        id: "Area olahraga, seperti lapangan basket dan bola voli.",
        en: "Sports facilities including basketball and volleyball courts.",
      },
      {
        id: "Program internal berupa bimbingan pengamalan agama Islam serta pembelajaran berbagai bahasa.",
        en: "Residential programs offering Islamic guidance and foreign language learning.",
      },
    ],
  },

  guestHouse: {
    id: "guest-house",
    title: {
      id: "Sultan Agung Guest House",
      en: "Sultan Agung Guest House",
    },
    shortName: {
      id: "Guest House",
      en: "Guest House",
    },
    header: {
      category: { id: "GUEST HOUSE", en: "GUEST HOUSE" },
      title: {
        id: "Penginapan resmi bagi tamu akademik",
        en: "Official accommodation for academic visitors",
      },
      paragraphs: [
        {
          id: "Sultan Agung Guest House adalah fasilitas akomodasi resmi yang diperuntukkan bagi tamu akademik, dosen tamu, peneliti, maupun peserta seminar.",
          en: "Sultan Agung Guest House is an official hospitality facility designated for visiting professors, scholars, researchers, and conference participants.",
        },
        {
          id: "Guest house ini menyediakan tempat menginap yang nyaman dan strategis bagi tamu universitas, sekaligus menjadi lokasi transit praktis untuk acara wisuda, seminar nasional, atau kunjungan kerja.",
          en: "The guest house provides comfortable and strategic lodging for university guests, serving as convenient accommodation for graduation ceremonies, national seminars, and official visits.",
        },
      ],
    },
    galeri: [
      {
        src: guestHouse2,
        keterangan: {
          id: "Tampak gedung dari seberang danau kampus, bersebelahan dengan Fakultas Kedokteran Gigi.",
          en: "Building view from across the campus lake, adjacent to the Faculty of Dentistry.",
        },
      },
      {
        src: guestHouse1,
        keterangan: {
          id: "Halaman depan gedung dengan lapangan basket dan area parkir kendaraan.",
          en: "Front courtyard with basketball court and parking area.",
        },
      },
      {
        src: guestHouse3,
        keterangan: {
          id: "Kamar dengan televisi dan meja kerja.",
          en: "Guest room equipped with television and work desk.",
        },
      },
      {
        src: guestHouse4,
        keterangan: {
          id: "Kamar ber-AC dengan lemari pakaian dan meja kerja.",
          en: "Air-conditioned room with wardrobe and desk.",
        },
      },
      {
        src: guestHouse7,
        keterangan: {
          id: "Kamar mandi dalam dengan shower.",
          en: "En-suite bathroom with shower.",
        },
      },
      {
        src: guestHouse5,
        keterangan: {
          id: "Gerai kuliner di area dalam gedung.",
          en: "Culinary outlets inside the building.",
        },
      },
      {
        src: guestHouse6,
        keterangan: {
          id: "Minimarket untuk kebutuhan harian penghuni.",
          en: "Minimart for daily residential essentials.",
        },
      },
    ],
    fasilitas: [
      {
        id: "Kamar nyaman yang dilengkapi AC, televisi, dan kamar mandi dalam.",
        en: "Comfortable rooms equipped with air conditioning, television, and private en-suite bathrooms.",
      },
      {
        id: "Restoran atau kantin yang menyediakan layanan konsumsi dan sarapan bagi para tamu.",
        en: "Dining cafeteria providing breakfast and meals for guests.",
      },
      {
        id: "Akses strategis menuju fakultas, rektorat, dan fasilitas umum kota.",
        en: "Strategic access to academic faculties, university rectorate, and city transit.",
      },
    ],
  },

  sportCenter: {
    id: "sport-center",
    title: {
      id: "Sport Center",
      en: "Sport Center",
    },
    shortName: {
      id: "Sport Center",
      en: "Sport Center",
    },
    header: {
      category: { id: "SPORT CENTER", en: "SPORT CENTER" },
      title: {
        id: "Arena olahraga beratap untuk latihan dan kompetisi",
        en: "A covered sports arena for training and competition",
      },
      paragraphs: [
        {
          id: "Sport Center UNISSULA adalah arena olahraga beratap yang menjadi pusat kegiatan olahraga sivitas akademika, mulai dari latihan rutin, kegiatan unit kegiatan mahasiswa, hingga turnamen antarfakultas.",
          en: "The UNISSULA Sport Center is a covered sports arena that serves as the hub of campus sporting life, from routine training and student club activities to inter-faculty tournaments.",
        },
        {
          id: "Lapangannya serbaguna dan dapat dipakai untuk futsal maupun bola voli, sehingga mahasiswa Magister Kenotariatan dapat menjaga kebugaran dan kebersamaan di sela kesibukan perkuliahan.",
          en: "Its multipurpose court accommodates both futsal and volleyball, allowing Master of Notary students to stay fit and build camaraderie alongside their studies.",
        },
      ],
    },
    galeri: [
      {
        src: sportCenter1,
        keterangan: {
          id: "Lapangan serbaguna beratap dilihat dari atas saat pertandingan bola voli.",
          en: "Aerial view of the covered multipurpose court during a volleyball match.",
        },
      },
      {
        src: sportCenter2,
        keterangan: {
          id: "Pertandingan bola voli putri di lapangan sport center.",
          en: "Women's volleyball match on the sport center court.",
        },
      },
      {
        src: sportCenter3,
        keterangan: {
          id: "Suasana pertandingan bola voli dengan penonton di tepi lapangan.",
          en: "Volleyball match atmosphere with spectators courtside.",
        },
      },
      {
        src: sportCenter4,
        keterangan: {
          id: "Pertandingan futsal antarfakultas.",
          en: "Inter-faculty futsal match.",
        },
      },
      {
        src: sportCenter5,
        keterangan: {
          id: "Perebutan bola dalam laga futsal.",
          en: "Players contesting the ball in a futsal match.",
        },
      },
      {
        src: sportCenter6,
        keterangan: {
          id: "Aksi pemain futsal di lapangan sport center.",
          en: "Futsal players in action at the sport center.",
        },
      },
      {
        src: sportCenter7,
        keterangan: {
          id: "Duel pemain dalam pertandingan futsal.",
          en: "Players dueling during a futsal match.",
        },
      },
      {
        src: sportCenter8,
        keterangan: {
          id: "Foto bersama tim bola voli putri.",
          en: "Group photo of the women's volleyball team.",
        },
      },
      {
        src: sportCenter9,
        keterangan: {
          id: "Foto bersama peserta kegiatan olahraga.",
          en: "Group photo of sports event participants.",
        },
      },
    ],
    fasilitas: [
      {
        id: "Lapangan serbaguna beratap untuk futsal dan bola voli.",
        en: "Covered multipurpose court for futsal and volleyball.",
      },
      {
        id: "Area duduk penonton di sekeliling lapangan.",
        en: "Spectator area around the court.",
      },
      {
        id: "Dapat dipakai untuk latihan rutin, kegiatan unit kegiatan mahasiswa, dan turnamen.",
        en: "Available for routine training, student club activities, and tournaments.",
      },
      {
        id: "Lokasi di dalam lingkungan kampus sehingga mudah dijangkau mahasiswa.",
        en: "Located on campus and easily accessible to students.",
      },
    ],
  },

  gym: {
    id: "gym",
    title: {
      id: "Gym",
      en: "Gym",
    },
    shortName: {
      id: "Gym",
      en: "Gym",
    },
    header: {
      category: { id: "GYM", en: "GYM" },
      title: {
        id: "Ruang kebugaran untuk menjaga kesehatan tubuh",
        en: "A fitness room to keep the body healthy",
      },
      paragraphs: [
        {
          id: "Gym kampus menyediakan ruang kebugaran yang nyaman bagi mahasiswa untuk menjaga kesehatan fisik di tengah padatnya aktivitas akademik.",
          en: "The campus gym provides a comfortable fitness room where students can maintain their physical health amid a demanding academic schedule.",
        },
        {
          id: "Ruangannya dilengkapi alat latihan kardio dan beban, cermin dinding, serta pendingin ruangan, sehingga cocok untuk latihan mandiri sebelum atau sesudah jam perkuliahan.",
          en: "The room is equipped with cardio and strength-training machines, wall mirrors, and air conditioning, making it well suited for self-guided workouts before or after classes.",
        },
      ],
    },
    galeri: [
      {
        src: gym1,
        keterangan: {
          id: "Deretan treadmill dan alat latihan di ruang gym.",
          en: "Row of treadmills and training equipment in the gym.",
        },
      },
      {
        src: gym2,
        keterangan: {
          id: "Mesin latihan beban dan sepeda statis.",
          en: "Strength-training machines and stationary bikes.",
        },
      },
      {
        src: gym3,
        keterangan: {
          id: "Sepeda statis dan elliptical trainer untuk latihan kardio.",
          en: "Stationary bikes and elliptical trainers for cardio.",
        },
      },
      {
        src: gym4,
        keterangan: {
          id: "Area latihan beban dengan rak dan bangku latihan.",
          en: "Strength-training area with racks and workout benches.",
        },
      },
      {
        src: gym5,
        keterangan: {
          id: "Rak latihan multifungsi (smith machine).",
          en: "Multifunction training rack (smith machine).",
        },
      },
      {
        src: gym6,
        keterangan: {
          id: "Mahasiswa berlatih menggunakan treadmill.",
          en: "Students working out on treadmills.",
        },
      },
    ],
    fasilitas: [
      {
        id: "Treadmill, sepeda statis, dan elliptical trainer untuk latihan kardio.",
        en: "Treadmills, stationary bikes, and elliptical trainers for cardio.",
      },
      {
        id: "Mesin dan rak latihan beban untuk latihan kekuatan.",
        en: "Machines and racks for strength training.",
      },
      {
        id: "Ruangan ber-AC dengan cermin dinding.",
        en: "Air-conditioned room with wall mirrors.",
      },
      {
        id: "Dispenser air minum di dalam ruangan.",
        en: "Drinking water dispenser inside the room.",
      },
    ],
  },

  lapanganBasket: {
    id: "lapangan-basket",
    title: {
      id: "Lapangan Basket",
      en: "Basketball Court",
    },
    shortName: {
      id: "Lapangan Basket",
      en: "Basketball Court",
    },
    header: {
      category: { id: "LAPANGAN BASKET", en: "BASKETBALL COURT" },
      title: {
        id: "Lapangan terbuka di tengah kawasan fakultas",
        en: "Outdoor courts amid the faculty buildings",
      },
      paragraphs: [
        {
          id: "Lapangan basket outdoor tersedia di antara gedung-gedung fakultas dan dapat digunakan mahasiswa untuk berolahraga maupun berkegiatan bersama.",
          en: "Outdoor basketball courts are located among the faculty buildings and are open to students for sport and group activities.",
        },
        {
          id: "Lapangan berlapis permukaan keras dengan marka lengkap, ring di kedua sisi, serta pagar pengaman, dan letaknya dekat dengan area parkir sehingga mudah dijangkau.",
          en: "The hard-surface courts feature full markings, hoops at both ends, and safety fencing, and sit next to the parking area for easy access.",
        },
      ],
    },
    galeri: [
      {
        src: lapanganBasket1,
        keterangan: {
          id: "Lapangan basket outdoor dilihat dari lantai atas gedung.",
          en: "Outdoor basketball court seen from an upper floor.",
        },
      },
      {
        src: lapanganBasket2,
        keterangan: {
          id: "Lapangan basket dengan marka lengkap dan ring di kedua sisi.",
          en: "Basketball court with full markings and hoops at both ends.",
        },
      },
      {
        src: lapanganBasket3,
        keterangan: {
          id: "Lapangan basket di antara gedung fakultas.",
          en: "Basketball court between faculty buildings.",
        },
      },
      {
        src: lapanganBasket4,
        keterangan: {
          id: "Lapangan dilihat dari sisi balkon gedung.",
          en: "Court viewed from the building balcony.",
        },
      },
      {
        src: lapanganBasket5,
        keterangan: {
          id: "Lapangan berpagar di depan gedung fakultas.",
          en: "Fenced court in front of a faculty building.",
        },
      },
      {
        src: lapanganBasket6,
        keterangan: {
          id: "Lapangan basket di depan Gedung Fakultas Agama Islam.",
          en: "Basketball court in front of the Faculty of Islamic Studies building.",
        },
      },
      {
        src: lapanganBasket7,
        keterangan: {
          id: "Lapangan basket dan area parkir di sekitarnya.",
          en: "Basketball court and the surrounding parking area.",
        },
      },
      {
        src: lapanganBasket8,
        keterangan: {
          id: "Tampak lapangan dari ketinggian dengan latar gedung kampus.",
          en: "Elevated view of the court with campus buildings behind.",
        },
      },
      {
        src: lapanganBasket9,
        keterangan: {
          id: "Ring basket dan pagar pengaman di tepi lapangan.",
          en: "Basketball hoop and safety fence at the edge of the court.",
        },
      },
    ],
    fasilitas: [
      {
        id: "Lapangan basket outdoor dengan marka standar.",
        en: "Outdoor basketball court with standard markings.",
      },
      {
        id: "Ring basket di kedua sisi lapangan.",
        en: "Hoops at both ends of the court.",
      },
      {
        id: "Pagar pengaman di sekeliling lapangan.",
        en: "Safety fencing around the court.",
      },
      {
        id: "Dekat dengan gedung fakultas dan area parkir.",
        en: "Close to faculty buildings and parking.",
      },
    ],
  },

  coffeeShop: {
    id: "coffee-shop",
    title: {
      id: "Leavy Coffee Shop",
      en: "Leavy Coffee Shop",
    },
    shortName: {
      id: "Coffee Shop",
      en: "Coffee Shop",
    },
    header: {
      category: { id: "COFFEE SHOP", en: "COFFEE SHOP" },
      title: {
        id: "Ruang santai untuk berdiskusi dan mengerjakan tugas",
        en: "A relaxed space for discussion and coursework",
      },
      paragraphs: [
        {
          id: "Leavy Coffee Shop UNISSULA adalah kedai kopi di lingkungan kampus yang menjadi tempat favorit mahasiswa untuk bersantai, berdiskusi, maupun mengerjakan tugas.",
          en: "Leavy Coffee Shop UNISSULA is an on-campus coffee shop and a favorite spot for students to unwind, hold discussions, or work on assignments.",
        },
        {
          id: "Tersedia area indoor ber-AC dengan pilihan meja makan dan sofa lounge, serta area outdoor bernuansa kontainer di tepi danau kampus untuk suasana yang lebih terbuka.",
          en: "It offers an air-conditioned indoor area with dining tables and lounge sofas, as well as a container-style outdoor area by the campus lake for a more open atmosphere.",
        },
      ],
    },
    galeri: [
      {
        src: coffeeShop1,
        keterangan: {
          id: "Area indoor Leavy Coffee Shop UNISSULA.",
          en: "Indoor area of Leavy Coffee Shop UNISSULA.",
        },
      },
      {
        src: coffeeShop2,
        keterangan: {
          id: "Meja bar dan area barista.",
          en: "Bar counter and barista station.",
        },
      },
      {
        src: coffeeShop3,
        keterangan: {
          id: "Ruang lounge dengan sofa.",
          en: "Lounge room with sofas.",
        },
      },
      {
        src: coffeeShop4,
        keterangan: {
          id: "Area duduk sofa untuk berdiskusi.",
          en: "Sofa seating area for discussions.",
        },
      },
      {
        src: coffeeShop5,
        keterangan: {
          id: "Meja makan di area indoor.",
          en: "Dining tables in the indoor area.",
        },
      },
      {
        src: coffeeShop6,
        keterangan: {
          id: "Pintu masuk coffee shop di area Gedung Rektorat.",
          en: "Coffee shop entrance near the Rectorate Building.",
        },
      },
      {
        src: coffeeShop7,
        keterangan: {
          id: "Area outdoor Leavy Coffeeshop bernuansa kontainer.",
          en: "Container-style outdoor area of Leavy Coffeeshop.",
        },
      },
      {
        src: coffeeShop8,
        keterangan: {
          id: "Tempat duduk semi-terbuka di area outdoor.",
          en: "Semi-open seating in the outdoor area.",
        },
      },
      {
        src: coffeeShop9,
        keterangan: {
          id: "Taman dan kursi outdoor di dekat danau kampus.",
          en: "Garden and outdoor seating near the campus lake.",
        },
      },
    ],
    fasilitas: [
      {
        id: "Area indoor ber-AC dengan meja makan dan sofa lounge.",
        en: "Air-conditioned indoor area with dining tables and lounge sofas.",
      },
      {
        id: "Area outdoor semi-terbuka di tepi danau kampus.",
        en: "Semi-open outdoor area by the campus lake.",
      },
      {
        id: "Menu kopi dan minuman lain yang disajikan barista.",
        en: "Coffee and other drinks prepared by baristas.",
      },
      {
        id: "Wastafel dan toilet untuk pengunjung.",
        en: "Washbasin and restroom for visitors.",
      },
    ],
  },

  kantin: {
    id: "kantin",
    title: {
      id: "Kantin",
      en: "Canteen",
    },
    shortName: {
      id: "Kantin",
      en: "Canteen",
    },
    header: {
      category: { id: "KANTIN", en: "CANTEEN" },
      title: {
        id: "Pusat kuliner mahasiswa dengan beragam pilihan",
        en: "A student food hub with plenty of choices",
      },
      paragraphs: [
        {
          id: "Kantin kampus menjadi pusat kuliner bagi mahasiswa, dosen, dan tenaga kependidikan, dengan beragam gerai makanan dan minuman dalam satu kawasan.",
          en: "The campus canteen is a dining hub for students, lecturers, and staff, bringing a variety of food and beverage stalls together in one area.",
        },
        {
          id: "Salah satunya Kumaira (Kuliner Mahasiswa Rahmatan lil Alamin), gedung kuliner dengan ruang makan yang luas, meja panjang, dan area parkir di depannya, sehingga nyaman untuk makan bersama di sela jadwal kuliah.",
          en: "This includes Kumaira (Kuliner Mahasiswa Rahmatan lil Alamin), a dining building with a spacious hall, long tables, and parking out front, making it easy to share a meal between classes.",
        },
      ],
    },
    galeri: [
      {
        src: kantin1,
        keterangan: {
          id: "Gedung Kumaira, pusat kuliner mahasiswa.",
          en: "Kumaira building, the student food hub.",
        },
      },
      {
        src: kantin2,
        keterangan: {
          id: "Tampak depan Kumaira dengan area parkir.",
          en: "Front view of Kumaira with its parking area.",
        },
      },
      {
        src: kantin3,
        keterangan: {
          id: "Gedung kantin dua lantai di lingkungan kampus.",
          en: "Two-storey canteen building on campus.",
        },
      },
      {
        src: kantin4,
        keterangan: {
          id: "Gedung kantin dan halaman parkir dilihat dari atas.",
          en: "Canteen building and parking lot from above.",
        },
      },
      {
        src: kantin5,
        keterangan: {
          id: "Ruang makan dengan deretan gerai makanan.",
          en: "Dining hall lined with food stalls.",
        },
      },
      {
        src: kantin6,
        keterangan: {
          id: "Meja dan kursi makan di dalam kantin.",
          en: "Dining tables and chairs inside the canteen.",
        },
      },
      {
        src: kantin7,
        keterangan: {
          id: "Meja panjang untuk makan bersama.",
          en: "Long tables for communal dining.",
        },
      },
      {
        src: kantin8,
        keterangan: {
          id: "Gerai makanan di sepanjang sisi ruang makan.",
          en: "Food stalls along the side of the dining hall.",
        },
      },
      {
        src: kantin9,
        keterangan: {
          id: "Deretan meja makan dan gerai di dalam kantin.",
          en: "Rows of dining tables and stalls inside the canteen.",
        },
      },
    ],
    fasilitas: [
      {
        id: "Beragam gerai makanan dan minuman dalam satu kawasan.",
        en: "A variety of food and beverage stalls in one area.",
      },
      {
        id: "Ruang makan luas dengan meja panjang.",
        en: "Spacious dining hall with long tables.",
      },
      {
        id: "Kipas angin dan sirkulasi udara di ruang makan.",
        en: "Fans and ventilation throughout the dining hall.",
      },
      {
        id: "Area parkir kendaraan di depan gedung.",
        en: "Vehicle parking in front of the building.",
      },
    ],
  },

  klinik: {
    id: "klinik",
    title: {
      id: "Klinik Pratama Sultan Agung",
      en: "Sultan Agung Primary Clinic",
    },
    shortName: {
      id: "Klinik",
      en: "Clinic",
    },
    header: {
      category: { id: "KLINIK", en: "CLINIC" },
      title: {
        id: "Layanan kesehatan umum dan gigi di lingkungan kampus",
        en: "General and dental healthcare on campus",
      },
      paragraphs: [
        {
          id: "Klinik Pratama Sultan Agung berada di Gedung Ibrahim, lingkungan kampus UNISSULA, dan melayani pemeriksaan kesehatan bagi mahasiswa, pegawai, maupun masyarakat umum.",
          en: "Sultan Agung Primary Clinic is located in the Ibrahim Building on the UNISSULA campus and provides health services for students, staff, and the general public.",
        },
        {
          id: "Klinik ini membuka Poli Umum dan Poli Gigi dalam dua sesi praktik, pukul 07.00–14.00 dan 14.00–21.00, dengan ruang tunggu yang nyaman serta ruang periksa yang bersih dan tertata.",
          en: "The clinic runs General and Dental services in two practice sessions, 07.00–14.00 and 14.00–21.00, with a comfortable waiting area and clean, well-organized examination rooms.",
        },
      ],
    },
    galeri: [
      {
        src: klinik1,
        keterangan: {
          id: "Gedung Ibrahim, lokasi Klinik Pratama Sultan Agung.",
          en: "Ibrahim Building, home of Sultan Agung Primary Clinic.",
        },
      },
      {
        src: klinik2,
        keterangan: {
          id: "Ruang tunggu dan meja pendaftaran pasien.",
          en: "Waiting area and patient registration desk.",
        },
      },
      {
        src: klinik3,
        keterangan: {
          id: "Meja pendaftaran Klinik Pratama Sultan Agung.",
          en: "Registration desk of Sultan Agung Primary Clinic.",
        },
      },
      {
        src: klinik4,
        keterangan: {
          id: "Papan jadwal praktik dokter Poli Umum dan Poli Gigi.",
          en: "Doctor schedule board for General and Dental services.",
        },
      },
      {
        src: klinik5,
        keterangan: {
          id: "Ruang periksa Poli Umum.",
          en: "General practice examination room.",
        },
      },
      {
        src: klinik6,
        keterangan: {
          id: "Ruang periksa dengan tempat tidur pasien dan wastafel.",
          en: "Examination room with patient bed and washbasin.",
        },
      },
      {
        src: klinik7,
        keterangan: {
          id: "Ruang Poli Gigi dengan dental unit.",
          en: "Dental room with a dental unit.",
        },
      },
      {
        src: klinik8,
        keterangan: {
          id: "Papan nama klinik di tepi jalan.",
          en: "Roadside clinic signboard.",
        },
      },
      {
        src: klinik9,
        keterangan: {
          id: "Tampak Gedung Ibrahim dari atas.",
          en: "Aerial view of the Ibrahim Building.",
        },
      },
    ],
    fasilitas: [
      {
        id: "Poli Umum untuk pemeriksaan kesehatan dasar.",
        en: "General practice for basic health check-ups.",
      },
      {
        id: "Poli Gigi dengan dental unit.",
        en: "Dental clinic with a dental unit.",
      },
      {
        id: "Dua sesi praktik: 07.00–14.00 dan 14.00–21.00; Minggu libur.",
        en: "Two practice sessions: 07.00–14.00 and 14.00–21.00; closed on Sundays.",
      },
      {
        id: "Ruang tunggu dan meja pendaftaran pasien.",
        en: "Waiting area and patient registration desk.",
      },
    ],
  },

  miniMarket: {
    id: "mini-market",
    title: {
      id: "Mini Market",
      en: "Minimarket",
    },
    shortName: {
      id: "Mini Market",
      en: "Minimarket",
    },
    header: {
      category: { id: "MINI MARKET", en: "MINIMARKET" },
      title: {
        id: "Kebutuhan harian tanpa perlu keluar kampus",
        en: "Daily essentials without leaving campus",
      },
      paragraphs: [
        {
          id: "Mini market kampus menyediakan beragam kebutuhan harian mahasiswa, mulai dari makanan ringan, minuman, hingga perlengkapan pribadi dan rumah tangga.",
          en: "The campus minimarket stocks a wide range of daily essentials for students, from snacks and drinks to personal care and household items.",
        },
        {
          id: "Ruang belanjanya terang dan tertata rapi, dilengkapi lemari pendingin, kasir, serta kursi tunggu, sehingga mahasiswa dapat berbelanja dengan cepat di sela kegiatan perkuliahan.",
          en: "The bright, well-organized store is equipped with refrigerators, a checkout counter, and waiting seats, so students can shop quickly between classes.",
        },
      ],
    },
    galeri: [
      {
        src: miniMarket1,
        keterangan: {
          id: "Rak-rak produk di dalam mini market.",
          en: "Product shelves inside the minimarket.",
        },
      },
      {
        src: miniMarket2,
        keterangan: {
          id: "Ruang belanja yang luas dan terang.",
          en: "Spacious and bright shopping area.",
        },
      },
      {
        src: miniMarket3,
        keterangan: {
          id: "Rak makanan ringan dan kebutuhan harian.",
          en: "Shelves of snacks and daily essentials.",
        },
      },
      {
        src: miniMarket4,
        keterangan: {
          id: "Lemari pendingin minuman dan freezer es krim.",
          en: "Beverage refrigerators and ice cream freezer.",
        },
      },
      {
        src: miniMarket5,
        keterangan: {
          id: "Rak perlengkapan pribadi dan rumah tangga.",
          en: "Personal care and household supplies.",
        },
      },
      {
        src: miniMarket6,
        keterangan: {
          id: "Rak mi instan dan bahan makanan.",
          en: "Instant noodles and groceries.",
        },
      },
      {
        src: miniMarket7,
        keterangan: {
          id: "Kursi tunggu di dekat pintu masuk.",
          en: "Waiting seats near the entrance.",
        },
      },
      {
        src: miniMarket8,
        keterangan: {
          id: "Pembayaran di meja kasir.",
          en: "Payment at the checkout counter.",
        },
      },
      {
        src: miniMarket9,
        keterangan: {
          id: "Rak makanan ringan aneka merek.",
          en: "Snack shelves with various brands.",
        },
      },
    ],
    fasilitas: [
      {
        id: "Makanan ringan, minuman, dan bahan makanan.",
        en: "Snacks, drinks, and groceries.",
      },
      {
        id: "Perlengkapan pribadi dan rumah tangga.",
        en: "Personal care and household supplies.",
      },
      {
        id: "Lemari pendingin untuk minuman dan es krim.",
        en: "Refrigerators for drinks and ice cream.",
      },
      {
        id: "Meja kasir dan kursi tunggu.",
        en: "Checkout counter and waiting seats.",
      },
    ],
  },

  masjid: {
    id: "masjid",
    title: {
      id: "Masjid",
      en: "Mosque",
    },
    shortName: {
      id: "Masjid",
      en: "Mosque",
    },
    header: {
      category: { id: "MASJID", en: "MOSQUE" },
      title: {
        id: "Pusat ibadah dan pembinaan ruhani sivitas akademika",
        en: "The center of worship and spiritual life on campus",
      },
      paragraphs: [
        {
          id: "Masjid kampus menjadi pusat ibadah dan kegiatan keislaman sivitas akademika UNISSULA, sejalan dengan budaya akademik islami yang dikembangkan universitas.",
          en: "The campus mosque is the center of worship and Islamic activities for the UNISSULA academic community, in line with the university's Islamic academic culture.",
        },
        {
          id: "Masjid digunakan untuk salat berjamaah lima waktu, salat Jumat, kajian, dan tadarus, dengan ruang salat yang luas, tempat wudu yang bersih, serta halaman yang teduh.",
          en: "It hosts the five daily congregational prayers, Friday prayers, study circles, and Qur'an recitation, with a spacious prayer hall, clean ablution facilities, and a shady courtyard.",
        },
      ],
    },
    galeri: [
      {
        src: masjid1,
        keterangan: {
          id: "Tampak samping masjid dengan halaman yang teduh.",
          en: "Side view of the mosque with its shady courtyard.",
        },
      },
      {
        src: masjid2,
        keterangan: {
          id: "Tampak depan masjid.",
          en: "Front view of the mosque.",
        },
      },
      {
        src: masjid3,
        keterangan: {
          id: "Serambi dan halaman masjid.",
          en: "Mosque veranda and courtyard.",
        },
      },
      {
        src: masjid4,
        keterangan: {
          id: "Jamaah di ruang salat utama.",
          en: "Worshippers in the main prayer hall.",
        },
      },
      {
        src: masjid5,
        keterangan: {
          id: "Salat berjamaah di ruang utama masjid.",
          en: "Congregational prayer in the main hall.",
        },
      },
      {
        src: masjid6,
        keterangan: {
          id: "Jamaah di depan mimbar berornamen ukiran kayu.",
          en: "Worshippers before the carved wooden pulpit.",
        },
      },
      {
        src: masjid7,
        keterangan: {
          id: "Tempat wudu yang bersih.",
          en: "Clean ablution area.",
        },
      },
      {
        src: masjid8,
        keterangan: {
          id: "Mahasiswi melaksanakan salat berjamaah.",
          en: "Female students in congregational prayer.",
        },
      },
      {
        src: masjid9,
        keterangan: {
          id: "Jamaah membaca Al-Qur'an dan berzikir.",
          en: "Worshippers reciting the Qur'an and dhikr.",
        },
      },
    ],
    fasilitas: [
      {
        id: "Ruang salat utama yang luas untuk salat berjamaah dan salat Jumat.",
        en: "Spacious main prayer hall for congregational and Friday prayers.",
      },
      {
        id: "Tempat wudu yang bersih dan memadai.",
        en: "Clean and adequate ablution facilities.",
      },
      {
        id: "Kegiatan kajian keislaman dan tadarus Al-Qur'an.",
        en: "Islamic study circles and Qur'an recitation.",
      },
      {
        id: "Halaman masjid yang teduh.",
        en: "Shady mosque courtyard.",
      },
    ],
  },
};

/**
 * Foto latar hero halaman Akomodasi: satu putaran yang sama untuk semua tab,
 * berisi foto pilihan dari asrama, guest house, dan beberapa fasilitas
 * pendukung secara berselang-seling.
 *
 * Hanya foto berorientasi lanskap yang dipakai. Foto kamar dan kamar mandi
 * guest house berorientasi potret, sehingga akan terpotong parah pada hero
 * yang lebar — foto-foto itu tetap tampil utuh di galeri isi halaman.
 *
 * Cukup `src` karena hero memperlakukan gambarnya sebagai dekorasi dan
 * menyembunyikannya dari pembaca layar; keterangannya ada di galeri.
 */
export const akomodasiHeroSlides = [
  { src: guestHouse2 },
  { src: asrama1 },
  { src: sportCenter1 },
  { src: guestHouse1 },
  { src: masjid2 },
  { src: asrama2 },
  { src: kantin1 },
  { src: asrama3 },
];
