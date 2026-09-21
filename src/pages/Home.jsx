import { Helmet } from "react-helmet-async";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Hero from "../components/Home/Hero";
import AcademicFocus from "../components/Home/AcademicFocus";
import ExpertSpotlight from "../components/Home/ExpertSpotlight";
import CampusCulture from "../components/Home/CampusCulture";
import Events from "../components/Home/Events";
import Testimoni from "../components/Home/Testimoni";
import FAQ from "../components/Home/Faq";
import Ready from "../components/Home/Ready";
import Highlight from "../components/Home/Highlight";
import Announcement from "../components/Home/Announcement";
import { useT } from "../i18n/languageContext";
import { useEffect } from "react";

const metaHome = {
  title: {
    id: "Magister Kenotariatan (MKn) | UNISSULA",
    en: "Master of Notarial Law (MKn) | UNISSULA",
  },
  description: {
    id: "Program Magister Kenotariatan (MKn) UNISSULA mencetak notaris profesional, beretika tinggi, dan berwawasan global melalui pendidikan hukum yang komprehensif.",
    en: "The Master of Notarial Law (MKn) Programme at UNISSULA produces professional, highly ethical, and globally competitive notaries through comprehensive legal education.",
  },
  keywords: {
    id: "MKn UNISSULA, Magister Kenotariatan, Notaris Semarang, Universitas Islam Sultan Agung, Pendidikan Notaris",
    en: "MKn UNISSULA, Master of Notarial Law, Notary Semarang, Sultan Agung Islamic University, Notarial Education",
  },
};

export default function Home() {
  const t = useT();

  return (
    <>
      <Helmet>
        <title>{t(metaHome.title)}</title>

        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="MKn UNISSULA" />

        {/* Deskripsi dan Keyword SEO */}
        <meta name="description" content={t(metaHome.description)} />
        <meta name="keywords" content={t(metaHome.keywords)} />
      </Helmet>

      <main className="flex flex-col min-h-screen font-body text-body bg-white">
        {/* Header & Navbar */}
        <Navbar />

        {/* Hero Section */}
        <Hero />

        {/* Expert Spotlight Section */}
        <ExpertSpotlight />

        <Highlight />

        <Events />
        {/* Academic Focus / Berita & Wawasan Section */}
        <AcademicFocus />
        <Announcement />

        {/* Research & Community Service Section */}
        {/* <ResearchCommunity /> */}


        {/* Campus & Culture Section */}
        <CampusCulture />

        {/* Events Section */}

        {/* Testimoni Section */}
        <Testimoni />

        {/* FAQ Section */}
        <FAQ />

        {/* Ready Section */}
        <Ready />

        {/* Footer */}
        <Footer />
      </main>
    </>
  );
}






