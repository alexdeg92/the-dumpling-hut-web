"use client";

import { useEffect, useId, useRef } from "react";

const LID_DELAY_MS = 700;
const LID_DURATION_MS = 2200;

const STEAM_PUFFS = [
  { left: "16%", size: 34, delay: "0s" },
  { left: "30%", size: 42, delay: "0.7s" },
  { left: "44%", size: 50, delay: "0.25s" },
  { left: "58%", size: 40, delay: "1s" },
  { left: "72%", size: 32, delay: "0.5s" },
] as const;

function easeOutCubic(t: number): number {
  return 1 - (1 - t) ** 3;
}

function lidFrame(t: number): { x: number; y: number; rot: number; opacity: number } {
  if (t <= 0.4) {
    const p = easeOutCubic(t / 0.4);
    return { x: 0, y: -32 * p, rot: -2.5 * p, opacity: 1 };
  }

  const p = easeOutCubic((t - 0.4) / 0.6);
  const fade = t < 0.65 ? 1 : 1 - easeOutCubic((t - 0.65) / 0.35);

  return {
    x: 105 * p,
    y: -32 - 42 * p,
    rot: -2.5 + 26 * p,
    opacity: fade,
  };
}

function SteamerLidArt({ bambooId }: { bambooId: string }) {
  return (
    <>
      <ellipse cx="0" cy="8" rx="176" ry="14" fill="#8f6630" opacity="0.38" />
      <ellipse cx="0" cy="2" rx="180" ry="54" fill="#b98042" />
      <rect x="-174" y="-48" width="348" height="50" rx="12" fill={`url(#${bambooId})`} />
      <g stroke="#a9803f" strokeWidth="2" opacity="0.62">
        <line x1="-174" y1="-14" x2="174" y2="-14" />
        <line x1="-174" y1="-28" x2="174" y2="-28" />
        <line x1="-174" y1="-42" x2="174" y2="-42" />
      </g>
      <ellipse cx="0" cy="-48" rx="176" ry="50" fill="#d8b271" />
      <ellipse cx="0" cy="-58" rx="158" ry="38" fill="#e7caa0" />
      <ellipse cx="0" cy="-68" rx="138" ry="28" fill="#edd5aa" />
      <g stroke="#a9803f" strokeWidth="1.8" opacity="0.5" fill="none">
        <ellipse cx="0" cy="-58" rx="148" ry="32" />
        <line x1="-120" y1="-64" x2="120" y2="-64" />
      </g>
      <ellipse cx="0" cy="-84" rx="30" ry="13" fill="#b98a4a" />
      <ellipse cx="0" cy="-92" rx="19" ry="11" fill="#e8c98c" />
    </>
  );
}

/** Bamboo steamer with a lid-lift intro and rising steam. */
export function SteamerBasket({
  className = "",
  animate = true,
}: {
  className?: string;
  animate?: boolean;
}) {
  const uid = useId().replace(/:/g, "");
  const glowId = `steamer-glow-${uid}`;
  const bambooId = `steamer-bamboo-${uid}`;

  const lidRef = useRef<SVGGElement>(null);
  const steamRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lid = lidRef.current;
    const steam = steamRef.current;
    if (!lid || !steam) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!animate || reduced) {
      lid.setAttribute("opacity", "0");
      steam.classList.add("is-active");
      steam.style.opacity = "1";
      return;
    }

    let raf = 0;
    let start: number | null = null;

    const tick = (now: number) => {
      if (start === null) start = now;
      const elapsed = now - start - LID_DELAY_MS;

      if (elapsed < 0) {
        lid.setAttribute("transform", "translate(0 0) rotate(0)");
        lid.setAttribute("opacity", "1");
        steam.classList.remove("is-active");
        steam.style.opacity = "0";
        raf = requestAnimationFrame(tick);
        return;
      }

      const t = Math.min(elapsed / LID_DURATION_MS, 1);
      const { x, y, rot, opacity } = lidFrame(t);

      lid.setAttribute("transform", `translate(${x} ${y}) rotate(${rot})`);
      lid.setAttribute("opacity", String(opacity));

      steam.classList.add("is-active");
      steam.style.opacity = String(Math.min(0.55 + t * 0.45, 1));

      if (t >= 1) {
        lid.setAttribute("opacity", "0");
        steam.style.opacity = "1";
        return;
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [animate]);

  return (
    <div className="relative w-full overflow-hidden">
      <svg viewBox="0 0 420 360" className={className} role="img" aria-label="A bamboo steamer of dumplings">
        <defs>
          <radialGradient id={glowId} cx="50%" cy="35%" r="65%">
            <stop offset="0%" stopColor="var(--color-gold-soft)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="var(--color-gold-soft)" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={bambooId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e8c98c" />
            <stop offset="100%" stopColor="#cda35e" />
          </linearGradient>
        </defs>

        <ellipse cx="210" cy="150" rx="200" ry="150" fill={`url(#${glowId})`} />

        <ellipse cx="210" cy="250" rx="180" ry="60" fill="#b98a4a" />
        <rect x="30" y="190" width="360" height="62" rx="14" fill={`url(#${bambooId})`} />
        <g stroke="#a9803f" strokeWidth="2" opacity="0.6">
          <line x1="30" y1="206" x2="390" y2="206" />
          <line x1="30" y1="222" x2="390" y2="222" />
          <line x1="30" y1="238" x2="390" y2="238" />
        </g>
        <ellipse cx="210" cy="190" rx="180" ry="56" fill="#d8b271" />
        <ellipse cx="210" cy="186" rx="168" ry="50" fill="#e7caa0" />

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
            <path
              d="M-40 8c5 9 20 13 40 13s35-4 40-13"
              fill="none"
              stroke="#d8b98a"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
          </g>
        ))}

        <g transform="translate(210 196)">
          <g ref={lidRef}>
            <SteamerLidArt bambooId={bambooId} />
          </g>
        </g>
      </svg>

      <div
        ref={steamRef}
        className="steamer-mist pointer-events-none absolute inset-x-[12%] bottom-[46%] top-[18%] z-10"
        aria-hidden="true"
      >
        {STEAM_PUFFS.map((puff, i) => (
          <span
            key={i}
            className="steamer-puff"
            style={{
              left: puff.left,
              width: puff.size,
              height: puff.size,
              marginLeft: -puff.size / 2,
              animationDelay: puff.delay,
            }}
          />
        ))}
      </div>
    </div>
  );
}
