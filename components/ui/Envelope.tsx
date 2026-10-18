"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { guestFromUrl } from "@/lib/links";
import { fr } from "@/lib/typo";
import { EnvelopeArt, InvitationCard } from "./EnvelopeArt";
import { GeometricPattern } from "./GeometricPattern";
import { GoldDust } from "./GoldDust";
import { Monogram } from "./Monogram";

type State = "closed" | "opening" | "revealing" | "gone";

export const ENVELOPE_OPENED = "enveloppe:ouverte";

/**
 * Écran d'ouverture : une enveloppe de velours scellée à la cire.
 * Toucher le sceau le brise, le rabat se soulève, la carte glisse hors de l'enveloppe,
 * puis l'écran s'efface sur le hero. Elle revient à chaque chargement de la page.
 */
export function Envelope() {
  const [state, setState] = useState<State>("closed");
  const [guest, setGuest] = useState<string | null>(null);
  const timers = useRef<number[]>([]);
  const { envelope, identity, hero } = site;

  useEffect(() => {
    setGuest(guestFromUrl());
    // Au rafraîchissement, le navigateur ne restaure pas la position : on repart du haut, sous l'enveloppe
    history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    const t = timers.current;
    return () => t.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Le reste de la page n'est pas atteignable au clavier tant que l'enveloppe est fermée
  useEffect(() => {
    const hidden = state === "closed" || state === "opening";
    document.querySelectorAll<HTMLElement>("body > header, main, body > footer").forEach((el) => (el.inert = hidden));
  }, [state]);

  function finish() {
    setState("gone");
    window.dispatchEvent(new Event(ENVELOPE_OPENED));
    const hash = window.location.hash.slice(1);
    if (hash) document.getElementById(hash)?.scrollIntoView();
  }

  function open() {
    if (state !== "closed") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setState("revealing");
      timers.current.push(window.setTimeout(finish, 50));
      return;
    }
    setState("opening");
    timers.current.push(
      window.setTimeout(() => setState("revealing"), 2500),
      window.setTimeout(finish, 3500),
    );
  }

  function skip() {
    setState("revealing");
    timers.current.push(window.setTimeout(finish, 900));
  }

  if (state === "gone") return null;

  return (
    <div
      id="enveloppe"
      data-state={state}
      className="env-overlay velvet grain fixed inset-0 z-[90] flex flex-col items-center justify-center overflow-hidden px-4"
    >
      <GeometricPattern id="pattern-envelope" opacity={0.07} />
      <div aria-hidden="true" className="halo pointer-events-none absolute left-1/2 top-1/2 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2" />
      <GoldDust count={14} />

      <div className="relative z-[2] flex flex-col items-center">
        <div className="env-hint mb-10 min-h-[4.5rem] text-center md:mb-14">
          {guest ? (
            <>
              <p className="eyebrow text-champagne/80">{envelope.guestPrefix}</p>
              <p className="mt-2 font-display text-3xl font-light italic text-pearl md:text-4xl">{guest}</p>
            </>
          ) : (
            <p className="eyebrow pt-6 text-champagne/80">{identity.dateShort}</p>
          )}
        </div>

        <div className="env-stage">
          <EnvelopeArt
            uid="intro"
            card={
              <InvitationCard>
                <Monogram tone="light" className="h-[34%] w-auto" />
                <p className="eyebrow mt-[3%] !text-[0.55rem] text-gold-ink md:!text-[0.65rem]">{hero.title}</p>
                <p className="mt-[2%] font-display text-[clamp(1.4rem,6.5vw,2.3rem)] font-light leading-none text-night">
                  {identity.groomFirstName} <span className="italic text-gold-deep">&amp;</span> {identity.brideFirstName}
                </p>
              </InvitationCard>
            }
            front={
              <>
                <p className="font-display text-[clamp(1.1rem,5vw,1.6rem)] font-light italic leading-none text-gold-gradient">
                  {identity.displayNames}
                </p>
              </>
            }
            seal={(halves) => (
              <button type="button" className="env-seal" onClick={open} aria-label={envelope.open}>
                {halves}
              </button>
            )}
          />
        </div>

        <p className="env-hint eyebrow mt-14 text-center text-champagne md:mt-16">{fr(envelope.hint)}</p>
      </div>

      <button
        type="button"
        onClick={skip}
        className="env-hint absolute bottom-5 right-5 z-[2] p-2 text-xs tracking-[0.2em] text-silver/80 underline-offset-4 hover:text-pearl hover:underline"
      >
        {envelope.skip}
      </button>
    </div>
  );
}
