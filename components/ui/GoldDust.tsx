import type { CSSProperties } from "react";

/** Pseudo-aléatoire déterministe : même rendu côté serveur et client. */
function rand(i: number, salt: number) {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

/** Poussière d'or qui s'élève lentement (CSS pur, masquée si reduced motion). */
export function GoldDust({ count = 16, className = "" }: { count?: number; className?: string }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className="dust"
          style={
            {
              "--x": `${(rand(i, 1) * 100).toFixed(1)}%`,
              "--s": `${(2 + rand(i, 2) * 4).toFixed(1)}px`,
              "--d": `${(14 + rand(i, 3) * 14).toFixed(1)}s`,
              "--dl": `${(-rand(i, 4) * 24).toFixed(1)}s`,
              "--dx": `${((rand(i, 5) - 0.5) * 120).toFixed(0)}px`,
              "--o": (0.35 + rand(i, 6) * 0.5).toFixed(2),
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
