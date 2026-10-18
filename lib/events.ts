import { site, type WeddingEvent } from "@/content/site";

/** Événements affichés (dans l'ordre du tableau). */
export const activeEvents: WeddingEvent[] = site.events.filter((e) => e.enabled);

/** Un événement est « complet » quand son heure et son lieu sont connus. */
export function isComplete(e: WeddingEvent): e is WeddingEvent & { time: string; place: string } {
  return !!e.time && !!e.place;
}

/** "08:00" -> "08 h 00" */
export function formatTime(hhmm: string): string {
  const [h, m] = hhmm.split(":");
  return `${h.padStart(2, "0")} h ${m ?? "00"}`;
}

/** "08:00" -> ISO UTC du jour du mariage (Abidjan = UTC+0) */
export function isoAt(hhmm: string): string {
  const [h, m] = hhmm.split(":");
  return `${site.identity.weddingDay}T${h.padStart(2, "0")}:${(m ?? "00").padStart(2, "0")}:00Z`;
}

/** Cible du compte à rebours : première heure connue du jour J, sinon la valeur par défaut. */
export function countdownTarget(): string {
  const times = [...activeEvents.map((e) => e.time), ...site.programme.steps.map((s) => s.time)]
    .filter((t): t is string => !!t)
    .sort();
  return times.length ? isoAt(times[0]) : site.identity.countdownFallback;
}
