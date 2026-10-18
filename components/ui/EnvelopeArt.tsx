import type { ReactNode } from "react";
import { WaxSeal } from "./WaxSeal";

/** Doublure de l'enveloppe : motif à 8 branches en feuille d'or. */
function Liner({ id }: { id: string }) {
  return (
    <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <pattern id={id} width="26" height="26" patternUnits="userSpaceOnUse" viewBox="0 0 80 80">
          <g fill="none" stroke="#D9BC7E" strokeWidth="2.2" opacity="0.55">
            <path d="M22 22 H58 V58 H22 Z" />
            <path d="M40 14.5 L65.5 40 L40 65.5 L14.5 40 Z" />
            <circle cx="40" cy="40" r="7" />
          </g>
        </pattern>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4B2A86" />
          <stop offset="1" stopColor="#2C1A55" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id}-bg)`} />
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

/**
 * Enveloppe en velours violet : fond + doublure dorée, carte (children), poche avant,
 * rabat articulé en 3D et sceau de cire. Les états (fermée, ouverte…) sont pilotés en CSS
 * par l'attribut data-state / data-step du parent (voir globals.css, « Enveloppe »).
 */
export function EnvelopeArt({
  uid,
  card,
  front,
  seal,
}: {
  uid: string;
  card: ReactNode;
  /** texte écrit sur la poche avant */
  front?: ReactNode;
  /** bouton ou élément qui porte le sceau */
  seal: (halves: ReactNode) => ReactNode;
}) {
  return (
    <div className="env">
      <div className="env-shadow" aria-hidden="true" />

      <div className="env-back" aria-hidden="true">
        <div className="absolute inset-x-0 top-0 h-[62%]">
          <Liner id={`liner-back-${uid}`} />
        </div>
      </div>

      <div className="env-card">{card}</div>

      <div className="env-pocket" aria-hidden="true">
        <svg viewBox="0 0 100 70" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          <defs>
            <linearGradient id={`side-${uid}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#3A2270" />
              <stop offset="1" stopColor="#2C1A55" />
            </linearGradient>
            <linearGradient id={`side-r-${uid}`} x1="1" y1="0" x2="0" y2="0">
              <stop offset="0" stopColor="#3A2270" />
              <stop offset="1" stopColor="#2C1A55" />
            </linearGradient>
            <linearGradient id={`bottom-${uid}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#4B2A86" />
              <stop offset="1" stopColor="#331E63" />
            </linearGradient>
          </defs>
          <path d="M0 0 L49 39 L0 70 Z" fill={`url(#side-${uid})`} />
          <path d="M100 0 L51 39 L100 70 Z" fill={`url(#side-r-${uid})`} />
          <path d="M0 70 L46 35.5 Q50 33 54 35.5 L100 70 Z" fill={`url(#bottom-${uid})`} />
          <path d="M0.4 69.6 L46 35.5 Q50 33 54 35.5 L99.6 69.6" fill="none" stroke="#D9BC7E" strokeOpacity="0.55" strokeWidth="0.8" vectorEffect="non-scaling-stroke" />
          <path d="M0 0 L46 37" fill="none" stroke="#000" strokeOpacity="0.25" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          <path d="M100 0 L54 37" fill="none" stroke="#000" strokeOpacity="0.25" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        </svg>
        {/* liseré or du pourtour */}
        <div className="absolute inset-[3%] rounded-[3px] border border-champagne/25" />
        {front && <div className="absolute inset-x-0 bottom-[7%] flex flex-col items-center text-center">{front}</div>}
      </div>

      <div className="env-flap" aria-hidden="true">
        <div className="env-flap-face" style={{ background: "linear-gradient(180deg, #2C1A55 0%, #4B2A86 100%)" }}>
          <svg viewBox="0 0 100 60" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
            <path d="M0.3 0.3 L50 59.4 L99.7 0.3" fill="none" stroke="#D9BC7E" strokeOpacity="0.8" strokeWidth="1" vectorEffect="non-scaling-stroke" />
            <path d="M6 1 L50 53 L94 1" fill="none" stroke="#D9BC7E" strokeOpacity="0.3" strokeWidth="0.6" vectorEffect="non-scaling-stroke" />
          </svg>
        </div>
        <div className="env-flap-face env-flap-inner">
          <Liner id={`liner-flap-${uid}`} />
        </div>
      </div>

      {seal(
        <>
          <WaxSeal className="seal-half seal-left h-full w-full" />
          <WaxSeal className="seal-half seal-right h-full w-full" />
        </>,
      )}
    </div>
  );
}

/** Carte d'invitation glissée dans l'enveloppe. */
export function InvitationCard({ children }: { children: ReactNode }) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[3px] bg-pearl shadow-[0_10px_30px_-12px_rgba(0,0,0,0.6)]">
      <div className="absolute inset-[4%] border border-gold/60" />
      <div className="absolute inset-[6%] border border-gold/25" />
      <div className="relative flex h-[58%] flex-col items-center justify-center px-4 text-center">{children}</div>
    </div>
  );
}
