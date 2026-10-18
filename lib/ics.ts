import { site, type WeddingEvent } from "@/content/site";
import { isoAt } from "@/lib/events";

function stamp(iso: string): string {
  return new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

function escape(text: string): string {
  return text.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
}

/** Plie les lignes à 75 octets (RFC 5545). */
function fold(line: string): string {
  const out: string[] = [];
  let current = "";
  for (const ch of line) {
    if (Buffer.byteLength(current + ch) > 73) {
      out.push(current);
      current = " " + ch;
    } else current += ch;
  }
  out.push(current);
  return out.join("\r\n");
}

/** Fichier .ics d'un événement complet (heure et lieu connus). */
export function buildIcs(event: WeddingEvent & { time: string; place: string }): string {
  const { identity, invitation } = site;
  const start = isoAt(event.time);
  const end = event.endTime ? isoAt(event.endTime) : new Date(new Date(start).getTime() + 2 * 3600_000).toISOString();
  const description = [
    event.address && `${invitation.labels.address} : ${event.address}`,
    event.dressCode && `${invitation.labels.dressCode} : ${event.dressCode}`,
    event.mapsUrl,
  ]
    .filter(Boolean)
    .join("\n");

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Adama-Aicha//Mariage//FR",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    `X-WR-CALNAME:${escape(identity.displayNames)}`,
    "BEGIN:VEVENT",
    `UID:${event.id}-${identity.weddingDay}@adama-aicha`,
    `DTSTAMP:${stamp(new Date().toISOString())}`,
    `DTSTART:${stamp(start)}`,
    `DTEND:${stamp(end)}`,
    `SUMMARY:${escape(`${event.title} — ${identity.displayNames}`)}`,
    `LOCATION:${escape([event.place, event.address].filter(Boolean).join(", "))}`,
    ...(description ? [`DESCRIPTION:${escape(description)}`] : []),
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return lines.map(fold).join("\r\n") + "\r\n";
}
