import { STRAPI_BASE_URL } from "../../../../config/strapi";

/**
 * Resolve URL gambar dari Strapi (lokal vs CDN/eksternal)
 * @param {object|string|null} image - Objek media dari Strapi atau URL string
 * @returns {string|null}
 */
export function getStrapiImageUrl(image) {
  if (!image) return null;
  if (typeof image === "string") {
    return image.startsWith("http") ? image : `${STRAPI_BASE_URL}${image}`;
  }
  const url =
    image.formats?.large?.url ||
    image.formats?.medium?.url ||
    image.formats?.small?.url ||
    image.url;
  if (!url) return null;
  return url.startsWith("http") ? url : `${STRAPI_BASE_URL}${url}`;
}

/**
 * Format tanggal ISO menjadi format lokal
 * @param {string} dateString
 * @param {string} lang - "id" atau "en"
 * @returns {string}
 */
export function formatAgendaDate(dateString, lang = "id") {
  if (!dateString) return "—";
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return d.toLocaleDateString(lang === "en" ? "en-US" : "id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return dateString;
  }
}

export const formatIndoDate = formatAgendaDate;

/**
 * Format rentang tanggal (dateStart – dateEnd)
 * @param {string} dateStart
 * @param {string|null} dateEnd
 * @param {string} lang
 * @returns {string}
 */
export function formatAgendaDateRange(dateStart, dateEnd, lang = "id") {
  const start = formatAgendaDate(dateStart, lang);
  if (!dateEnd) return start;
  const end = formatAgendaDate(dateEnd, lang);
  if (start === end) return start;
  return `${start} – ${end}`;
}

/**
 * Ekstraksi teks polos dari struktur Strapi Blocks (Rich Text)
 * @param {Array|string|null} blocks
 * @returns {string}
 */
export function blocksToPlainText(blocks) {
  if (!blocks) return "";
  if (typeof blocks === "string") return blocks;
  if (!Array.isArray(blocks)) return "";
  return blocks
    .map((block) => {
      if (block?.children && Array.isArray(block.children)) {
        return block.children.map((c) => c?.text || "").join("");
      }
      return "";
    })
    .filter(Boolean)
    .join("\n\n");
}

/**
 * Dapatkan nama hari dalam bahasa Indonesia atau Inggris
 * @param {string} dateStr - Format YYYY-MM-DD
 * @param {string} lang - "id" atau "en"
 * @returns {string}
 */
export function getIndoDayName(dateStr, lang = "id") {
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

/**
 * Generate Google Calendar URL untuk agenda
 * @param {object} agenda
 * @returns {string}
 */
export function generateGoogleCalendarUrl(agenda) {
  if (!agenda || !agenda.date) return "#";
  const dateClean = agenda.date.replace(/-/g, "");
  let startTime = "090000";
  let endTime = "120000";

  const timeStr = agenda.time || "";
  if (timeStr) {
    const match = timeStr.match(/(\d{2}):(\d{2})\s*-\s*(\d{2}):(\d{2})/);
    if (match) {
      startTime = `${match[1]}${match[2]}00`;
      endTime = `${match[3]}${match[4]}00`;
    }
  }

  const startParam = `${dateClean}T${startTime}`;
  const endParam = `${dateClean}T${endTime}`;

  const title = encodeURIComponent(agenda.title || "Agenda MKn UNISSULA");
  const plainDesc = agenda.description || blocksToPlainText(agenda.fullDescription);
  const org = agenda.organizer || "Program Studi Magister Kenotariatan FH UNISSULA";
  const details = encodeURIComponent(`${plainDesc}\n\nPenyelenggara: ${org}`);
  const location = encodeURIComponent(agenda.venue || "MKn UNISSULA");

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startParam}/${endParam}&details=${details}&location=${location}&ctz=Asia/Jakarta`;
}

/**
 * Download file .ics untuk Apple Calendar / Outlook
 * @param {object} agenda
 */
export function downloadIcsFile(agenda) {
  if (!agenda || !agenda.date) return;
  const dateClean = agenda.date.replace(/-/g, "");
  let startTime = "090000";
  let endTime = "120000";

  const timeStr = agenda.time || "";
  if (timeStr) {
    const match = timeStr.match(/(\d{2}):(\d{2})\s*-\s*(\d{2}):(\d{2})/);
    if (match) {
      startTime = `${match[1]}${match[2]}00`;
      endTime = `${match[3]}${match[4]}00`;
    }
  }

  const titleVal = agenda.title || "Agenda MKn UNISSULA";
  const plainDesc = agenda.description || blocksToPlainText(agenda.fullDescription);
  const venueVal = agenda.venue || "MKn UNISSULA";

  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//MKn UNISSULA//Event Calendar//ID",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:agenda-v2-${agenda.id || Date.now()}@unissula.ac.id`,
    `DTSTAMP:${dateClean}T000000Z`,
    `DTSTART;TZID=Asia/Jakarta:${dateClean}T${startTime}`,
    `DTEND;TZID=Asia/Jakarta:${dateClean}T${endTime}`,
    `SUMMARY:${titleVal}`,
    `DESCRIPTION:${plainDesc.replace(/\n/g, "\\n")}`,
    `LOCATION:${venueVal}`,
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `${agenda.slug || "agenda-mkn"}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}
