"use client";

import type Lenis from "lenis";
import { useEffect } from "react";
import { ENVELOPE_OPENED } from "./Envelope";

/** Smooth scroll subtil + défilement doux vers les ancres. Désactivé si prefers-reduced-motion. */
export function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let lenis: Lenis | null = null;
    let raf = 0;
    let cancelled = false;
    // Chargé après l'affichage pour ne pas retarder l'interactivité
    const start = () =>
      import("lenis").then(({ default: L }) => {
        if (cancelled || reduced) return;
        lenis = new L({ lerp: 0.12, wheelMultiplier: 0.9 });
        const loop = (t: number) => {
          lenis!.raf(t);
          raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);
      });
    const hasIdle = typeof window.requestIdleCallback === "function";
    let idle: number | ReturnType<typeof setTimeout> = 0;
    const schedule = () => {
      idle = hasIdle ? window.requestIdleCallback(start, { timeout: 2500 }) : setTimeout(start, 1200);
    };
    // Enveloppe encore fermée : Lenis ne démarre qu'une fois l'invitation ouverte
    const waiting = !!document.getElementById("enveloppe") && document.documentElement.dataset.env !== "skip";
    if (waiting) window.addEventListener(ENVELOPE_OPENED, schedule, { once: true });
    else schedule();

    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href")!.slice(1);
      const el = id ? document.getElementById(id) : document.body;
      if (!el) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(id ? el : 0, { offset: id ? -64 : 0, duration: 1.4 });
      else el.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
      history.replaceState(null, "", id ? `#${id}` : location.pathname + location.search);
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      cancelled = true;
      window.removeEventListener(ENVELOPE_OPENED, schedule);
      if (hasIdle) window.cancelIdleCallback(idle as number);
      else clearTimeout(idle);
      cancelAnimationFrame(raf);
      lenis?.destroy();
    };
  }, []);

  return null;
}
