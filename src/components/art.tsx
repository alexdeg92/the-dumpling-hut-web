/* Custom hand-built SVG art — no stock imagery. */

export function DumplingMark({ className = "" }: { className?: string }) {
  // The brand glyph: a pleated dumpling inside a ring.
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <circle cx="32" cy="32" r="30" fill="var(--color-lacquer)" />
      <circle cx="32" cy="32" r="30" fill="none" stroke="var(--color-gold)" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.7" />
      <path
        d="M14 38c0-9 8-15 18-15s18 6 18 15c0 2-2 3-4 2-1.5-3-3-3-4.5 0-1 2-3 2-4 0-1.4-3-3-3-4.4 0-1 2-3 2-4 0-1.4-3-3-3-4.4 0-1 2-3 2-4 0C16 41 14 40 14 38Z"
        fill="var(--color-cream)"
      />
      <path d="M16 38c2 4 8 6 16 6s14-2 16-6" fill="none" stroke="var(--color-lacquer)" strokeWidth="1.6" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

export function SteamColumn({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none relative ${className}`} aria-hidden="true">
      <span className="steam" style={{ left: "20%", animationDelay: "0s" }} />
      <span className="steam" style={{ left: "45%", animationDelay: "1.3s" }} />
      <span className="steam" style={{ left: "70%", animationDelay: "0.6s" }} />
      <span className="steam" style={{ left: "58%", animationDelay: "2.1s" }} />
    </div>
  );
}

/** A decorative bamboo steamer basket full of dumplings. */
export function SteamerBasket({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 420 360" className={className} role="img" aria-label="A bamboo steamer of dumplings">
      <defs>
        <radialGradient id="glow" cx="50%" cy="35%" r="65%">
          <stop offset="0%" stopColor="var(--color-gold-soft)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="var(--color-gold-soft)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="bamboo" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e8c98c" />
          <stop offset="100%" stopColor="#cda35e" />
        </linearGradient>
      </defs>

      <ellipse cx="210" cy="150" rx="200" ry="150" fill="url(#glow)" />

      {/* steam wisps */}
      <g stroke="var(--color-cream)" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.55">
        <path className="float-slow" style={{ ["--rot" as string]: "0deg" }} d="M150 120c-12-14 12-22 0-38" />
        <path className="float-mid" d="M210 105c-14-16 14-24 0-44" />
        <path className="float-slow" d="M270 122c-12-14 12-22 0-38" />
      </g>

      {/* basket body */}
      <ellipse cx="210" cy="250" rx="180" ry="60" fill="#b98a4a" />
      <rect x="30" y="190" width="360" height="62" rx="14" fill="url(#bamboo)" />
      <g stroke="#a9803f" strokeWidth="2" opacity="0.6">
        <line x1="30" y1="206" x2="390" y2="206" />
        <line x1="30" y1="222" x2="390" y2="222" />
        <line x1="30" y1="238" x2="390" y2="238" />
      </g>
      <ellipse cx="210" cy="190" rx="180" ry="56" fill="#d8b271" />
      <ellipse cx="210" cy="186" rx="168" ry="50" fill="#e7caa0" />

      {/* dumplings */}
      {[
        [140, 176, 1],
        [210, 168, 1.1],
        [282, 176, 1],
        [175, 196, 0.95],
        [248, 196, 0.95],
      ].map(([x, y, s], i) => (
        <g key={i} transform={`translate(${x} ${y}) scale(${s})`}>
          <path
            d="M-44 8c0-22 20-32 44-32s44 10 44 32c0 5-5 7-9 4-3-7-7-7-10 0-2 4-6 4-8 0-3-7-7-7-10 0-2 4-6 4-8 0-3-7-7-7-10 0-4 3-9 1-15-4Z"
            fill="var(--color-cream)"
            stroke="#e3c79c"
            strokeWidth="2"
          />
          <path d="M-40 8c5 9 20 13 40 13s35-4 40-13" fill="none" stroke="#d8b98a" strokeWidth="2.4" strokeLinecap="round" />
        </g>
      ))}
    </svg>
  );
}

export function ChiliSprig({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
      <path d="M40 12c2 14 0 28-10 44" fill="none" stroke="var(--color-jade)" strokeWidth="4" strokeLinecap="round" />
      <path d="M30 56c-10 4-18 0-22-8 12-2 18 0 22 8Z" fill="var(--color-ember)" />
      <path d="M34 48c-8 6-16 4-22-2 11-4 17-3 22 2Z" fill="var(--color-lacquer-soft)" />
    </svg>
  );
}

export function Lantern({ className = "", delay = 0 }: { className?: string; delay?: number }) {
  return (
    <div className={`pointer-events-none ${className}`} aria-hidden="true" style={{ animationDelay: `${delay}s` }}>
      <div className="relative float-slow">
        <span className="absolute left-1/2 top-1/2 -z-10 size-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-gold)] lantern-glow" />
        <svg viewBox="0 0 70 90" className="w-14">
          <line x1="35" y1="0" x2="35" y2="10" stroke="var(--color-gold)" strokeWidth="2" />
          <ellipse cx="35" cy="14" rx="12" ry="4" fill="var(--color-ink)" />
          <path d="M14 45C14 26 22 16 35 16s21 10 21 29-8 29-21 29S14 64 14 45Z" fill="var(--color-ember)" />
          <g stroke="var(--color-lacquer)" strokeWidth="1.6" opacity="0.6" fill="none">
            <path d="M25 18c-5 12-5 42 0 54" />
            <path d="M35 16v58" />
            <path d="M45 18c5 12 5 42 0 54" />
          </g>
          <ellipse cx="35" cy="74" rx="12" ry="4" fill="var(--color-ink)" />
          <g stroke="var(--color-gold)" strokeWidth="2">
            <line x1="29" y1="78" x2="29" y2="88" />
            <line x1="35" y1="78" x2="35" y2="90" />
            <line x1="41" y1="78" x2="41" y2="88" />
          </g>
        </svg>
      </div>
    </div>
  );
}

/** Gold circular seal/stamp with the hanzi, used as a decorative chop. */
export function Seal({ text, className = "" }: { text: string; className?: string }) {
  return (
    <div
      className={`grid place-items-center rounded-full border-2 border-[var(--color-gold)] text-[var(--color-gold)] ${className}`}
      aria-hidden="true"
    >
      <span className="han text-center leading-none">{text}</span>
    </div>
  );
}
