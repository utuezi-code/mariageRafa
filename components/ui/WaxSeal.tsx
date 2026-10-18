import { useId } from "react";

/** Bord irrégulier d'une goutte de cire (polygone lissé autour d'un cercle). */
function blob(cx: number, cy: number, r: number, bumps: number[]) {
  const n = bumps.length;
  const pts = bumps.map((b, i) => {
    const a = (i / n) * Math.PI * 2;
    return [cx + (r + b) * Math.cos(a), cy + (r + b) * Math.sin(a)];
  });
  let d = "";
  for (let i = 0; i < n; i++) {
    const [x0, y0] = pts[i];
    const [x1, y1] = pts[(i + 1) % n];
    const mx = (x0 + x1) / 2;
    const my = (y0 + y1) / 2;
    d += i === 0 ? `M${mx.toFixed(2)} ${my.toFixed(2)}` : "";
    const [x2, y2] = pts[(i + 2) % n];
    d += ` Q${x1.toFixed(2)} ${y1.toFixed(2)} ${((x1 + x2) / 2).toFixed(2)} ${((y1 + y2) / 2).toFixed(2)}`;
  }
  return d + " Z";
}

const EDGE = blob(50, 50, 44, [3, 1.2, 4, 2.2, 0.6, 3.4, 1.6, 4.4, 2, 0.8, 3.6, 2.4, 1, 4.2, 2.6, 1.4]);

/** Sceau de cire dorée frappé du monogramme A&A. */
export function WaxSeal({ className = "" }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  const wax = `wax-${id}`;
  const rim = `rim-${id}`;
  const shade = `shade-${id}`;

  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <defs>
        <radialGradient id={wax} cx="38%" cy="32%" r="75%">
          <stop offset="0" stopColor="#F3E2B4" />
          <stop offset="0.35" stopColor="#D9BC7E" />
          <stop offset="0.7" stopColor="#B8893A" />
          <stop offset="1" stopColor="#74561C" />
        </radialGradient>
        <linearGradient id={rim} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFF4D6" stopOpacity="0.9" />
          <stop offset="0.5" stopColor="#B8893A" stopOpacity="0.2" />
          <stop offset="1" stopColor="#5C4312" stopOpacity="0.9" />
        </linearGradient>
        <radialGradient id={shade} cx="50%" cy="50%" r="50%">
          <stop offset="0.6" stopColor="#5C4312" stopOpacity="0" />
          <stop offset="1" stopColor="#5C4312" stopOpacity="0.35" />
        </radialGradient>
      </defs>

      {/* ombre portée */}
      <path d={EDGE} transform="translate(1.5 2.5)" fill="#0B0618" opacity="0.45" />
      <path d={EDGE} fill={`url(#${wax})`} />
      {/* cuvette frappée */}
      <circle cx="50" cy="50" r="33" fill={`url(#${shade})`} />
      <circle cx="50" cy="50" r="33" fill="none" stroke={`url(#${rim})`} strokeWidth="2.2" />
      <circle cx="50" cy="50" r="29.5" fill="none" stroke="#74561C" strokeOpacity="0.45" strokeWidth="0.5" />

      {/* monogramme en relief : reflet clair décalé + creux sombre */}
      <g style={{ fontFamily: "var(--font-display)" }} textAnchor="middle">
        {[
          { dx: 0.7, dy: 0.8, fill: "#FFF1CC", o: 0.75 },
          { dx: 0, dy: 0, fill: "#6B4E18", o: 0.95 },
        ].map((l, i) => (
          <g key={i} transform={`translate(${l.dx} ${l.dy})`} fill={l.fill} opacity={l.o}>
            <text x="38" y="60" fontSize="34" fontWeight={500}>
              A
            </text>
            <text x="62" y="60" fontSize="34" fontWeight={500}>
              A
            </text>
            <text x="50" y="56" fontSize="17" fontStyle="italic" fontWeight={500}>
              &amp;
            </text>
          </g>
        ))}
      </g>
      {/* brillance */}
      <ellipse cx="36" cy="28" rx="11" ry="5" fill="#FFF8E6" opacity="0.35" transform="rotate(-28 36 28)" />
    </svg>
  );
}
