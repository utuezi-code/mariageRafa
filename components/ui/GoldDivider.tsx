/** Filet — losange — filet */
export function GoldDivider({ className = "", tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  const c = tone === "light" ? "#8E6A2A" : "#D9BC7E";
  return (
    <div aria-hidden="true" className={`flex items-center justify-center gap-3 ${className}`}>
      <span className="h-px w-14 md:w-24" style={{ background: `linear-gradient(90deg, transparent, ${c})` }} />
      <svg viewBox="0 0 20 20" className="h-3 w-3" fill="none" stroke={c} strokeWidth="1">
        <path d="M10 1.5 L18.5 10 L10 18.5 L1.5 10 Z" />
        <path d="M10 6 L14 10 L10 14 L6 10 Z" fill={c} stroke="none" opacity="0.8" />
      </svg>
      <span className="h-px w-14 md:w-24" style={{ background: `linear-gradient(270deg, transparent, ${c})` }} />
    </div>
  );
}
