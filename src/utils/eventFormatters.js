/**
 * =========================================================
 * UTILITY FORMATTER EVENT & AGENDA (HYBRID CONTRACT)
 * =========================================================
 * Menggabungkan dan menstandarisasi bentuk data dari Strapi CMS
 * (/api/agenda) dan berkas lokal (src/data/eventData.js) menjadi
 * kontrak data yang seragam untuk komponen antarmuka.
 */

import {
  getStrapiMediaUrl,
  blocksToPlainText,
  formatStrapiDate,
} from "./strapiHelpers";

/**
 * Normalisasi kunci judul untuk pencocokan deduplikasi (Title-Matching).
 * Menghilangkan tanda baca dan spasi ganda, case-insensitive.
 *
 * @param {string|object} title - Judul string atau objek bilingual { id, en }
 * @returns {string}
 */
export function normalizeTitleKey(title = "") {
  const rawTitle =
    typeof title === "object" && title !== null
      ? title.id || title.en || ""
      : String(title || "");

  return rawTitle
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Normalisasi satu entri agenda dari Strapi CMS
 *
 * @param {object} item - Objek respons entri agenda dari Strapi
 * @returns {object|null}
 */
export function normalizeEvent(item) {
  if (!item) return null;

  const desc =
    typeof item.description === "string"
      ? item.description
      : blocksToPlainText(item.description) || "";

  const plainDesc =
    typeof item.fullDescription === "string"
      ? item.fullDescription
      : blocksToPlainText(item.fullDescription) || desc;

  return {
    id: item.id,
    documentId: item.documentId || null,
    slug: item.slug || item.documentId || String(item.id),
    title: item.title || "",
    date: item.date ? item.date.split("T")[0] : null,
    time: item.time || "",
    venue: item.venue || "",
    organizer: item.organizer || "",
    category:
      typeof item.category === "object" && item.category !== null
        ? item.category?.name || item.category?.nama || ""
        : item.category || "",
    description: desc,
    fullDescription: item.fullDescription || item.description || "",
    plainDescription: plainDesc,
    image: getStrapiMediaUrl(item.image),
    cp: item.cp || "",
    speaker: item.speaker || "",
    registrationUrl: item.registrationUrl || "",
    pinned: Boolean(item.pinned || item.isPinned),
    isFeatured: Boolean(item.isFeatured || item.featured),
    source: "strapi",
  };
}

/**
 * Normalisasi satu entri agenda dari berkas lokal (eventData.js)
 *
 * @param {object} item - Objek dari eventData.js
 * @returns {object|null}
 */
export function normalizeLocalEvent(item) {
  if (!item) return null;

  const plainDesc =
    typeof item.fullDescription === "object" && item.fullDescription !== null
      ? item.fullDescription.id || item.fullDescription.en || ""
      : typeof item.fullDescription === "string"
      ? item.fullDescription
      : typeof item.description === "object" && item.description !== null
      ? item.description.id || item.description.en || ""
      : String(item.description || "");

  return {
    id: item.id,
    documentId: null,
    slug: item.slug || String(item.id),
    title: item.title,
    date: item.date ? item.date.split("T")[0] : null,
    time: item.time,
    venue: item.venue,
    organizer: item.organizer,
    category: item.category,
    description: item.description,
    fullDescription: item.fullDescription || item.description,
    plainDescription: plainDesc,
    image: item.image || null,
    cp: item.cp || "",
    speaker: item.speaker || "",
    registrationUrl: item.registrationUrl || "",
    pinned: Boolean(item.pinned || item.isPinned),
    isFeatured: Boolean(item.isFeatured || item.featured),
    source: "local",
  };
}

/**
 * Format tanggal agenda dengan lokalisasi
 *
 * @param {string} dateString - "YYYY-MM-DD"
 * @param {string} lang - "id" atau "en"
 * @returns {string}
 */
export function formatEventDate(dateString, lang = "id") {
  if (!dateString) return "—";
  return formatStrapiDate(dateString, lang, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export const formatIndoDate = formatEventDate;

/**
 * Mendapatkan nama hari dalam bahasa Indonesia atau Inggris
 *
 * @param {string} dateStr - Format YYYY-MM-DD
 * @param {string} lang - "id" atau "en"
 * @returns {string}
 */
export function getEventDayName(dateStr, lang = "id") {
  if (!dateStr) return "";
  try {
    const d = new Date(dateStr + "T00:00:00");
    const daysId = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const daysEn = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const days = lang === "en" ? daysEn : daysId;
    return days[d.getDay()] || "";
  } catch {
    return "";
  }
}

export const getIndoDayName = getEventDayName;

/**
 * Generate Google Calendar URL untuk event
 *
 * @param {object} event - Objek event yang sudah dinormalisasi
 * @returns {string}
 */
export function generateGoogleCalendarUrl(event) {
  if (!event || !event.date) return "#";

  const eventTitle =
    typeof event.title === "object" && event.title !== null
      ? event.title.id || event.title.en || ""
      : String(event.title || "");

  const eventVenue =
    typeof event.venue === "object" && event.venue !== null
      ? event.venue.id || event.venue.en || ""
      : String(event.venue || "");

  const eventDesc = event.plainDescription || "";

  const title = encodeURIComponent(eventTitle);
  const location = encodeURIComponent(eventVenue);
  const details = encodeURIComponent(
    `${eventDesc}\n\nNarahubung: ${event.cp || "-"}`
  );

  const cleanDate = event.date.replace(/-/g, "");
  const dates = `${cleanDate}T010000Z/${cleanDate}T100000Z`;

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}&sf=true&output=xml`;
}

/**
 * Generate dan unduh berkas .ics (iCal / Outlook)
 *
 * @param {object} event - Objek event yang sudah dinormalisasi
 */
export function downloadIcsFile(event) {
  if (!event || !event.date) return;

  const eventTitle =
    typeof event.title === "object" && event.title !== null
      ? event.title.id || event.title.en || ""
      : String(event.title || "");

  const eventVenue =
    typeof event.venue === "object" && event.venue !== null
      ? event.venue.id || event.venue.en || ""
      : String(event.venue || "");

  const eventDesc = (event.plainDescription || "").replace(/\n/g, "\\n");

  const cleanDate = event.date.replace(/-/g, "");
  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//MKn UNISSULA//Event Calendar//ID",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:mkn-event-${event.slug || event.id}@mkn.unissula.ac.id`,
    `DTSTAMP:${cleanDate}T000000Z`,
    `DTSTART;VALUE=DATE:${cleanDate}`,
    `DTEND;VALUE=DATE:${cleanDate}`,
    `SUMMARY:${eventTitle}`,
    `DESCRIPTION:${eventDesc}`,
    `LOCATION:${eventVenue}`,
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `${event.slug || "event"}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
