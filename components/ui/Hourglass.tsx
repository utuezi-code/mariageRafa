/** Sablier doré : le sable s'écoule, puis il se retourne (état « à venir »). */
export function Hourglass({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <g className="hourglass">
        <path d="M6 2.5h12M6 21.5h12" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
        <path
          d="M7.5 2.5v2.2c0 2.6 2.2 4.3 3.6 5.6.6.6.6 1.6 0 2.2-1.4 1.3-3.6 3-3.6 5.6v2.4M16.5 2.5v2.2c0 2.6-2.2 4.3-3.6 5.6-.6.6-.6 1.6 0 2.2 1.4 1.3 3.6 3 3.6 5.6v2.4"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
        />
        {/* sable */}
        <path className="sand-top" d="M9 6.2h6c-.6 1.6-2 2.7-3 3.5-1-.8-2.4-1.9-3-3.5Z" fill="currentColor" opacity="0.7" />
        <path className="sand-stream" d="M12 11.4v6" stroke="currentColor" strokeWidth="0.6" strokeDasharray="0.8 0.9" opacity="0.8" />
        <path className="sand-bottom" d="M8.6 20.3c.4-1.7 1.8-2.8 3.4-3.3 1.6.5 3 1.6 3.4 3.3Z" fill="currentColor" opacity="0.7" />
      </g>
    </svg>
  );
}
