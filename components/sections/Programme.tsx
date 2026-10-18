"use client";

import { m, useScroll, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { formatTime } from "@/lib/events";
import { hhmmToMinutes, type Phase } from "@/lib/date";
import { fr } from "@/lib/typo";
import { GeometricPattern } from "@/components/ui/GeometricPattern";
import { StepIcon } from "@/components/ui/icons";
import { Monogram } from "@/components/ui/Monogram";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";

const STEPS = [...site.programme.steps].sort((a, b) => hhmmToMinutes(a.time) - hhmmToMinutes(b.time));

/** Index de l'étape en cours (heure d'Abidjan = UTC), ou -1 avant la première. */
function currentStepIndex(now: Date) {
  const minutes = now.getUTCHours() * 60 + now.getUTCMinutes();
  let idx = -1;
  STEPS.forEach((s, i) => {
    if (hhmmToMinutes(s.time) <= minutes) idx = i;
  });
  return idx;
}

/** Programme vide : monogramme, texte d'attente et filet or qui respire. */
function Pending() {
  return (
    <Reveal className="mt-14 flex flex-col items-center text-center md:mt-16">
      <Monogram play="inView" className="h-28 w-28 md:h-32 md:w-32" />
      <p className="mx-auto mt-8 max-w-[26ch] font-display text-2xl font-light italic leading-snug text-pearl/90 md:text-3xl">
        {fr(site.programme.pending)}
      </p>
      <span aria-hidden="true" className="line-breathe mt-8 block h-px w-40 bg-gradient-to-r from-transparent via-champagne to-transparent" />
    </Reveal>
  );
}

function Timeline({ phase }: { phase: Phase }) {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 75%", "end 55%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const [current, setCurrent] = useState(-1);

  useEffect(() => {
    if (phase !== "jourj") return;
    const update = () => setCurrent(currentStepIndex(new Date()));
    update();
    const t = setInterval(update, 30_000);
    return () => clearInterval(t);
  }, [phase]);

  return (
    <ol ref={listRef} className="relative mt-16 md:mt-20">
      {/* ligne de fond + ligne dorée tracée au scroll */}
      <span aria-hidden="true" className="absolute bottom-0 left-[1.375rem] top-0 w-px bg-champagne/15 md:left-1/2" />
      <m.span
        aria-hidden="true"
        style={{ scaleY }}
        className="absolute bottom-0 left-[1.375rem] top-0 w-px origin-top bg-gradient-to-b from-champagne via-gold to-gold-deep md:left-1/2"
      />

      {STEPS.map((step, i) => {
        const isCurrent = i === current;
        const right = i % 2 === 1;
        return (
          <li key={`${step.time}-${i}`} className="relative grid grid-cols-[2.75rem_1fr] items-center gap-5 py-6 md:grid-cols-[1fr_4rem_1fr] md:gap-0 md:py-8">
            <span className="relative z-10 col-start-1 row-start-1 flex justify-center md:col-start-2">
              <span
                className={`flex h-11 w-11 items-center justify-center rounded-full border transition-colors duration-700 ${
                  isCurrent ? "animate-halo border-champagne bg-champagne text-night" : "border-gold/60 bg-night text-champagne"
                }`}
              >
                <StepIcon name={step.icon} className="h-5 w-5" />
              </span>
            </span>

            <Reveal y={16} className={`col-start-2 row-start-1 ${right ? "md:col-start-3 md:pl-10 md:text-left" : "md:col-start-1 md:pr-10 md:text-right"}`}>
              <p className={`font-display text-3xl font-light md:text-4xl ${isCurrent ? "text-pearl" : "text-champagne"}`}>
                <time dateTime={`${site.identity.weddingDay}T${step.time}`}>{formatTime(step.time)}</time>
              </p>
              <p className="mt-1 text-[0.95rem] leading-snug text-pearl/85 md:text-base">{step.label}</p>
              {isCurrent && <p className="eyebrow mt-2 !text-[0.6rem] text-champagne">{site.programme.nowLabel}</p>}
            </Reveal>
          </li>
        );
      })}
    </ol>
  );
}

export function Programme({ phase }: { phase: Phase }) {
  const { programme } = site;
  return (
    <section id="programme" className="velvet grain relative overflow-hidden px-5 py-24 text-pearl md:py-32">
      <GeometricPattern id="pattern-programme" opacity={0.07} />
      <div className="relative z-[2] mx-auto max-w-5xl">
        <SectionTitle title={programme.title} />

        {STEPS.length === 0 ? <Pending /> : <Timeline phase={phase} />}

        {programme.closing && (
          <Reveal className="mt-16 text-center md:mt-20">
            <p className="mx-auto max-w-[32ch] font-display text-2xl font-light italic leading-snug text-gold-gradient md:text-3xl">{fr(programme.closing)}</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
