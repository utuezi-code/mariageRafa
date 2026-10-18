"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { fr } from "@/lib/typo";
import { EnvelopeArt, InvitationCard } from "./EnvelopeArt";
import { Monogram } from "./Monogram";

/**
 * Confirmation RSVP : la réponse glisse dans l'enveloppe, le rabat se referme
 * et le sceau A&A vient la cacheter. Puis le message de remerciement apparaît.
 */
export function SealedReply({ name }: { name: string }) {
  const [step, setStep] = useState<"out" | "in" | "sealed" | "done">("out");

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setStep("done");
      return;
    }
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => setStep("in")));
    const t1 = setTimeout(() => setStep("sealed"), 2300);
    const t2 = setTimeout(() => setStep("done"), 3100);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div role="status" className="mt-12 flex flex-col items-center text-center">
      <div className="reply velvet grain relative flex w-full justify-center overflow-hidden px-4 pb-14 pt-36 md:pt-40" data-step={step === "done" ? "sealed" : step}>
        <EnvelopeArt
          uid="reply"
          card={
            <InvitationCard>
              <Monogram tone="light" className="h-[38%] w-auto" />
              <p className="mt-[4%] max-w-[90%] truncate font-display text-[clamp(1.1rem,5vw,1.6rem)] font-light italic leading-none text-night">{name}</p>
            </InvitationCard>
          }
          seal={(halves) => <div className="env-seal">{halves}</div>}
        />
      </div>
      <p
        className={`mx-auto mt-10 max-w-md font-display text-3xl font-light italic leading-snug text-night transition-all duration-700 ${
          step === "done" ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
        }`}
      >
        {fr(site.rsvp.success)}
      </p>
    </div>
  );
}
