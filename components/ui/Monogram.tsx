import { useId, type CSSProperties } from "react";
import { site } from "@/content/site";

type Props = {
  className?: string;
  /** "mount" : se dessine à l'affichage ; "inView" : au scroll ; "none" : statique */
  play?: "mount" | "inView" | "none";
  delay?: number;
  /** fond sur lequel il est posé : sert à « couper » les lettres entrelacées */
  tone?: "dark" | "light";
  title?: string;
  /** sans cercle (sceau de cire, petits formats) */
  bare?: boolean;
};

const GAP = { dark: "#1A1033", light: "#F7F4EE" };

/**
 * Monogramme A&A : deux A symétriques en Cormorant, l'esperluette italique nichée dans le V
 * qu'ils dessinent, entrelacés par un liseré de la couleur du fond, dans un double cercle de filet or.
 */
export function Monogram({ className = "", play = "none", delay = 0, tone = "dark", title, bare = false }: Props) {
  const grad = `mg-${useId().replace(/:/g, "")}`;
  const animated = play !== "none";
  const deep = tone === "light";
  const gap = GAP[tone];

  return (
    <svg
      viewBox="0 0 240 240"
      className={`${play === "mount" ? "draw-mount" : ""} ${className}`}
      style={{ "--rv-d": `${delay}s` } as CSSProperties}
      {...(play === "inView" ? { "data-rv": "" } : {})}
      role="img"
      aria-label={title ?? site.identity.monogram}
    >
      <defs>
        <linearGradient id={grad} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={deep ? "#74561C" : "#8E6A2A"} />
          <stop offset="0.4" stopColor={deep ? "#B8893A" : "#E8D29C"} />
          <stop offset="0.65" stopColor={deep ? "#8E6A2A" : "#B8893A"} />
          <stop offset="1" stopColor={deep ? "#74561C" : "#8E6A2A"} />
        </linearGradient>
      </defs>

      {!bare && (
        <>
          <circle cx="120" cy="120" r="112" pathLength={1} className={animated ? "draw" : ""} fill="none" stroke={`url(#${grad})`} strokeWidth={1.2} transform="rotate(-90 120 120)" />
          <circle
            cx="120"
            cy="120"
            r="104"
            pathLength={1}
            className={animated ? "draw" : ""}
            style={{ "--draw-d": "0.3s" } as CSSProperties}
            fill="none"
            stroke={`url(#${grad})`}
            strokeWidth={0.6}
            opacity={0.7}
            transform="rotate(90 120 120)"
          />
        </>
      )}

      <g className={animated ? "draw-fade" : ""} style={{ fontFamily: "var(--font-display)" }}>
        {/* étoile à 8 branches au-dessus */}
        <path d="M120 44 l2.6 6.4 6.4 2.6 -6.4 2.6 -2.6 6.4 -2.6 -6.4 -6.4 -2.6 6.4 -2.6 Z" fill={`url(#${grad})`} opacity={0.9} />
        <text x="87" y="160" textAnchor="middle" fontSize="104" fontWeight={300} fill={`url(#${grad})`}>
          A
        </text>
        <text
          x="153"
          y="160"
          textAnchor="middle"
          fontSize="104"
          fontWeight={300}
          fill={`url(#${grad})`}
          stroke={bare ? "none" : gap}
          strokeWidth={5}
          style={{ paintOrder: "stroke" }}
        >
          A
        </text>
        <text
          x="120"
          y="146"
          textAnchor="middle"
          fontSize="50"
          fontStyle="italic"
          fontWeight={500}
          fill={deep ? "#8E6A2A" : "#E8D29C"}
          stroke={bare ? "none" : gap}
          strokeWidth={5}
          style={{ paintOrder: "stroke" }}
        >
          &amp;
        </text>
        {/* filet — losange — filet */}
        <path d="M120 176 l4 4 l-4 4 l-4 -4 Z" fill={`url(#${grad})`} />
        <path d="M92 180 H110 M130 180 H148" stroke={`url(#${grad})`} strokeWidth={0.7} />
      </g>
    </svg>
  );
}
