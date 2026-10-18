"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { site } from "@/content/site";
import { countdownTarget } from "@/lib/events";

const TARGET = new Date(countdownTarget()).getTime();

function parts(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
}

/** Chiffre sur rouleau : la colonne 0–9 glisse jusqu'au chiffre courant. */
function Digit({ value }: { value: number | null }) {
  return (
    <span className="odo">
      <span className="odo-col" style={{ "--n": value ?? 0 } as CSSProperties}>
        {Array.from({ length: 10 }, (_, d) => (
          <span key={d} className="block" style={{ opacity: value === null ? 0.25 : 1 }}>
            {d}
          </span>
        ))}
      </span>
    </span>
  );
}

/** Compte à rebours vers la première heure connue du 22/12/2026 (heure d'Abidjan = UTC). */
export function Countdown({ forceToday = false }: { forceToday?: boolean }) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const labels = site.hero.countdownLabels;

  if (forceToday || (now !== null && now >= TARGET)) {
    return <p className="font-display text-4xl italic text-gold-gradient md:text-5xl">{site.hero.todayLabel}</p>;
  }

  const p = now === null ? null : parts(TARGET - now);
  const items: [keyof typeof labels, number | undefined][] = [
    ["days", p?.days],
    ["hours", p?.hours],
    ["minutes", p?.minutes],
    ["seconds", p?.seconds],
  ];

  return (
    <div role="timer" aria-live="off" className="flex items-stretch justify-center">
      {items.map(([key, value], i) => {
        const str = value === undefined ? null : String(value).padStart(key === "days" && value >= 100 ? 3 : 2, "0");
        return (
          <div key={key} className="flex items-stretch">
            {i > 0 && <span aria-hidden="true" className="mx-3 w-px self-stretch bg-gradient-to-b from-transparent via-gold/70 to-transparent sm:mx-6" />}
            <div className="flex min-w-[3.6rem] flex-col items-center sm:min-w-[5rem]">
              <span className="sr-only">{value ?? ""}</span>
              <span aria-hidden="true" className="flex font-display text-4xl font-light tabular-nums leading-none text-pearl sm:text-6xl">
                {(str ?? "00").split("").map((c, j) => (
                  <Digit key={j} value={str ? Number(c) : null} />
                ))}
              </span>
              <span className="eyebrow mt-3 !text-[0.6rem] !tracking-[0.3em] text-champagne sm:!text-[0.65rem]">{labels[key]}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
