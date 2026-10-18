import type { CSSProperties } from "react";

/** Rose abstraite au trait or très fin, qui se dessine à l'apparition. */
export function Rose({
  className = "",
  play = "mount",
  delay = 0,
  color = "#B8893A",
  opacity = 0.55,
}: {
  className?: string;
  play?: "mount" | "inView";
  delay?: number;
  color?: string;
  opacity?: number;
}) {
  const paths = [
    // cœur en spirale
    "M60 47c2-3 7-2 7 2c0 5-8 7-11 2c-3-6 4-12 10-10c7 2 8 11 3 16",
    // pétales
    "M48 50c-2-10 8-18 16-15c8 3 10 12 6 18",
    "M45 52c-6 9 2 21 15 20c11-1 17-9 14-19",
    "M44 46c-9-2-11 9-4 15",
    "M76 44c7 3 6 13-1 17",
    "M52 37c-4-6 2-12 8-10",
    // tige et feuilles
    "M60 72C58 92 63 112 56 142",
    "M58 96c-12-9-25-5-29 4c11 4 21 4 29-4Z",
    "M59 116c10-9 23-7 27 1c-10 5-21 4-27-1Z",
    "M58 96c-8-1-16 1-29 4",
    "M59 116c8-2 16-2 27 1",
  ];
  return (
    <svg
      viewBox="0 0 120 150"
      className={`${play === "mount" ? "draw-mount" : ""} ${className}`}
      style={{ "--rv-d": `${delay}s`, opacity } as CSSProperties}
      {...(play === "inView" ? { "data-rv": "" } : {})}
      fill="none"
      stroke={color}
      strokeWidth="0.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths.map((d, i) => (
        <path key={i} d={d} pathLength={1} className="draw" style={{ "--draw-d": `${i * 0.12}s` } as CSSProperties} />
      ))}
    </svg>
  );
}
