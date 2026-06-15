import Image from "next/image";

const DUMPLING_MARK_SRC = "/dumpling-mark.png";
const DUMPLING_MARK_MASK_SRC = "/dumpling-mark-mask.png";

/** Authoritative dumpling logo PNG — tinted via inherited `color` / `currentColor`. */
export function DumplingMark({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`relative inline-block shrink-0 ${className}`}
    >
      <Image
        src={DUMPLING_MARK_SRC}
        alt=""
        width={1024}
        height={1024}
        unoptimized
        className="size-full object-contain opacity-0"
      />
      <span
        className="absolute inset-0 bg-current"
        style={{
          WebkitMaskImage: `url(${DUMPLING_MARK_MASK_SRC})`,
          maskImage: `url(${DUMPLING_MARK_MASK_SRC})`,
          WebkitMaskSize: "contain",
          maskSize: "contain",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          maskPosition: "center",
        }}
      />
    </span>
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
