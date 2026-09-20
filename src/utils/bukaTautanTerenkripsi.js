/**
 * Membuka hasil scripts/enkripsi-tautan-tesis.mjs di peramban.
 *
 * Mengembalikan objek { kunci: url } bila kata sandinya benar, atau `null` bila
 * salah — AES-GCM menolak dekripsi dengan kunci yang keliru, jadi tidak perlu
 * menyimpan hash kata sandi terpisah.
 */
const dariBase64 = (teks) => Uint8Array.from(atob(teks), (c) => c.charCodeAt(0));

export async function bukaTautanTerenkripsi(paket, kataSandi) {
  const bahanKunci = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(kataSandi),
    "PBKDF2",
    false,
    ["deriveKey"],
  );
  const kunci = await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: dariBase64(paket.garam),
      iterations: paket.iterasi,
      hash: "SHA-256",
    },
    bahanKunci,
    { name: "AES-GCM", length: 256 },
    false,
    ["decrypt"],
  );

  try {
    const polos = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv: dariBase64(paket.iv) },
      kunci,
      dariBase64(paket.data),
    );
    return JSON.parse(new TextDecoder().decode(polos));
  } catch {
    return null;
  }
}
