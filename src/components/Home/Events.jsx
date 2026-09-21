import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import Img from "../ui/Img";
import { eventData } from "../../data/eventData";
import { getHybridEventList } from "../../services/eventService";
import { useLanguage, useT } from "../../i18n/languageContext";
import { useUi } from "../../i18n/useUi";

const viewportSettings = {
  once: true,
  amount: 0.2,
};

// =========================================
// CONTAINER ANIMATION
// =========================================
const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

// =========================================
// HEADER / CONTENT ANIMATION
// =========================================
const itemVariants = {
  hidden: {
    opacity: 0,
    x: -30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

// =========================================
// CARD ANIMATION
// =========================================
const cardVariants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

export default function Events() {
  const { lang } = useLanguage();
  const t = useT();
  const ui = useUi();

  // Inisialisasi awal dengan data lokal terdekat, lalu diperbarui dengan data hybrid
  const [eventsData, setEventsData] = useState(() => (eventData || []).slice(0, 3));

  useEffect(() => {
    let isMounted = true;
    async function loadEvents() {
      try {
        const hybridList = await getHybridEventList({ locale: lang });
        if (isMounted && Array.isArray(hybridList) && hybridList.length > 0) {
          setEventsData(hybridList.slice(0, 3));
        }
      } catch (err) {
        console.warn("[Home/Events] Error fetching hybrid events:", err);
      }
    }
    loadEvents();
    return () => {
      isMounted = false;
    };
  }, [lang]);

  const formatDateBadge = (dateString) => {
    const dateObj = new Date(dateString);

    const day = dateObj
      .getDate()
      .toString()
      .padStart(2, "0");

    const month = dateObj.toLocaleDateString(lang === "en" ? "en-US" : "id-ID", {
      month: "short",
    });

    return `${day} ${month}`;
  };

  return (
    <section className="w-full bg-white font-body py-16 sm:py-24 border-b border-gray-200 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

        {/* =========================================
            SECTION HEADER
        ========================================= */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          className="text-center mb-14 sm:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl font-heading font-normal text-heading tracking-normal">
            {ui("upcomingEvents")}
          </h2>
        </motion.div>


        {/* =========================================
            EVENT GRID
        ========================================= */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          className="
            grid
            grid-cols-1
            md:grid-cols-3
            gap-10
            lg:gap-14
            items-stretch
          "
        >
          {eventsData.map((item, index) => (
            <motion.article
              key={item.id}
              variants={cardVariants}
              className="h-full"
            >
              <Link
                to={`/event/${item.slug}`}
                className="
                  flex
                  flex-col
                  justify-between
                  h-full
                  bg-white
                  rounded-md
                  border
                  border-gray-100
                  shadow-sm
                  hover:shadow-md
                  transition-shadow
                  overflow-hidden
                  group
                "
              >

                {/* =====================================
                    EVENT IMAGE
                ===================================== */}
                <div className="relative h-48 w-full overflow-hidden bg-gray-100">

                  <motion.div
                    initial={{
                      opacity: 0,
                      scale: 1.08,
                      filter: "grayscale(100%) blur(3px)",
                    }}
                    whileInView={{
                      opacity: 1,
                      scale: 1,
                      filter: "grayscale(0%) blur(0px)",
                    }}
                    transition={{
                      duration: 1.3,
                      ease: "easeOut",
                      delay: 0.1 + index * 0.12,
                    }}
                    viewport={viewportSettings}
                    className="w-full h-full"
                  >
                    <Img
                      src={item.image}
                      alt={item.title}
                      className="
                        w-full
                        h-full
                        object-cover
                        transition-transform
                        duration-700
                        ease-out
                        group-hover:scale-105
                      "
                    />
                  </motion.div>

                </div>


                {/* =====================================
                    CARD CONTENT
                ===================================== */}
                <motion.div
                  variants={itemVariants}
                  className="p-6 space-y-4"
                >

                  {/* Date */}
                  <motion.span
                    variants={itemVariants}
                    className="
                      text-xs
                      font-semibold
                      tracking-wider
                      text-primary
                      uppercase
                    "
                  >
                    {formatDateBadge(item.date)}
                  </motion.span>


                  {/* Title */}
                  <motion.h3
                    variants={itemVariants}
                    className="
                      font-heading
                      font-bold
                      text-base
                      lg:text-lg
                      text-heading
                      leading-snug
                      group-hover:text-primary
                      transition-colors
                      cursor-pointer
                      line-clamp-2
                    "
                  >
                    {t(item.title)}
                  </motion.h3>


                  {/* Description */}
                  <motion.p
                    variants={itemVariants}
                    className="
                      text-xs
                      sm:text-sm
                      text-body
                      line-clamp-3
                      leading-relaxed
                    "
                  >
                    {t(item.description)}
                  </motion.p>

                </motion.div>

              </Link>
            </motion.article>
          ))}
        </motion.div>


        {/* =========================================
            VIEW ALL
        ========================================= */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          className="mt-12 sm:mt-16 flex justify-start"
        >
          <Link
            to="/event"
            className="
              inline-flex
              gap-2
              text-xs
              font-bold
              tracking-wider
              text-primary
              hover:text-[#680000]
              uppercase
              transition-colors
              group/all
            "
          >
            <span>{ui("viewAllEvents")}</span>

            <FiArrowRight
              className="
                text-sm
                transition-transform
                duration-200
                group-hover/all:translate-x-1
              "
            />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
