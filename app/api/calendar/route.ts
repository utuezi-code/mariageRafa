import type { NextRequest } from "next/server";
import { activeEvents, isComplete } from "@/lib/events";
import { buildIcs } from "@/lib/ics";

/** /api/calendar?evenement=mosquee — fichier .ics, seulement pour un événement complet. */
export function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("evenement");
  const event = activeEvents.find((e) => e.id === id);
  if (!event || !isComplete(event)) return new Response("Événement introuvable", { status: 404 });

  return new Response(buildIcs(event), {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="mariage-adama-aicha-${event.id}.ics"`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
