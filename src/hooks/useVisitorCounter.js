/**
 * useVisitorCounter
 *
 * Counter pengunjung ringan berbasis Firebase Realtime Database REST API.
 * Tidak memerlukan SDK Firebase — cukup fetch bawaan browser.
 *
 * Struktur data Firebase:
 *   visitors/total          → akumulasi semua pengunjung
 *   visitors/daily/YYYY-MM-DD → pengunjung per hari
 *
 * Perilaku:
 * - Menggunakan localStorage (bukan sessionStorage) agar tracking bertahan
 *   antar tab. Key menyertakan tanggal, sehingga setiap hari baru pengunjung
 *   dihitung lagi sebagai "hari ini" namun total tetap terakumulasi.
 */

import { useState, useEffect } from "react";

const DB_BASE =
  "https://mkn-unisulla-default-rtdb.asia-southeast1.firebasedatabase.app/visitors";

/** Key localStorage; menyertakan tanggal agar reset otomatis tiap hari. */
function getStorageKey() {
  return `mkn_visited_${new Date().toISOString().slice(0, 10)}`;
}

/** Tanggal hari ini dalam format YYYY-MM-DD (UTC+7). */
function getTodayKey() {
  const now = new Date();
  // Geser ke WIB (UTC+7)
  const wib = new Date(now.getTime() + 7 * 60 * 60 * 1000);
  return wib.toISOString().slice(0, 10);
}

/**
 * Memastikan nilai yang diterima selalu berupa integer non-negatif.
 * Jika nilai sebelumnya korup (misal string "[object Object]111..."),
 * pulihkan dengan menghitung jumlah digit '1' yang tertempel.
 */
function toValidNumber(val) {
  if (typeof val === "number" && !isNaN(val)) {
    return Math.max(0, Math.floor(val));
  }
  if (typeof val === "string") {
    if (val.includes("[object")) {
      const ones = val.replace(/[^1]/g, "");
      return Math.max(0, ones.length);
    }
    const parsed = parseInt(val, 10);
    return isNaN(parsed) ? 0 : Math.max(0, parsed);
  }
  return 0;
}

export function useVisitorCounter() {
  /** { total: number|null, today: number|null } */
  const [stats, setStats] = useState({ total: null, today: null });

  useEffect(() => {
    let isMounted = true;
    const today = getTodayKey();
    const alreadyCounted = localStorage.getItem(getStorageKey());

    const totalUrl = `${DB_BASE}/total.json`;
    const todayUrl = `${DB_BASE}/daily/${today}.json`;
    const headers = { "Content-Type": "application/json" };

    async function incrementBoth() {
      try {
        // Baca keduanya secara paralel
        const [rTotal, rToday] = await Promise.all([
          fetch(totalUrl),
          fetch(todayUrl),
        ]);
        if (!rTotal.ok || !rToday.ok) throw new Error("Read error");

        const rawTotal = await rTotal.json();
        const rawToday = await rToday.json();

        const currentTotal = toValidNumber(rawTotal);
        const currentToday = toValidNumber(rawToday);

        const newTotal = currentTotal + 1;
        const newToday = currentToday + 1;

        // Tulis keduanya secara paralel (pastikan number murni yang dikirim)
        await Promise.all([
          fetch(totalUrl, { method: "PUT", headers, body: JSON.stringify(newTotal) }),
          fetch(todayUrl, { method: "PUT", headers, body: JSON.stringify(newToday) }),
        ]);

        localStorage.setItem(getStorageKey(), "1");
        if (isMounted) {
          setStats({ total: newTotal, today: newToday });
        }
      } catch (err) {
        console.error("[VisitorCounter] Gagal increment:", err);
      }
    }

    async function fetchOnly() {
      try {
        const [rTotal, rToday] = await Promise.all([
          fetch(totalUrl),
          fetch(todayUrl),
        ]);
        if (!rTotal.ok || !rToday.ok) throw new Error("Read error");

        const rawTotal = await rTotal.json();
        const rawToday = await rToday.json();

        const total = toValidNumber(rawTotal);
        const today = toValidNumber(rawToday);

        if (isMounted) {
          setStats({ total, today });
        }
      } catch (err) {
        console.error("[VisitorCounter] Gagal baca:", err);
      }
    }

    if (!alreadyCounted) {
      incrementBoth();
    } else {
      fetchOnly();
    }

    return () => {
      isMounted = false;
    };
  }, []);

  return stats;
}

