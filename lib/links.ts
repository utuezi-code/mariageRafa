export function whatsappHref(number: string): string {
  return `https://wa.me/${number.replace(/[^0-9]/g, "")}`;
}

/** Lit `?pour=` (lien personnalisé) côté client. Texte brut, longueur limitée. */
export function guestFromUrl(): string | null {
  if (typeof window === "undefined") return null;
  const raw = new URLSearchParams(window.location.search).get("pour");
  const clean = raw?.replace(/[\u0000-\u001f<>]/g, "").replace(/\s+/g, " ").trim().slice(0, 60);
  return clean || null;
}
