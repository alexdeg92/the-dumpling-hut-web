"use client";

import { useI18n } from "@/lib/i18n";

export function Marquee() {
  const { t } = useI18n();
  const items = t.marquee;
  // duplicate the run so the -50% translate loops seamlessly
  const run = [...items, ...items];

  return (
    <div className="marquee-mask relative overflow-hidden border-y border-[var(--color-ink)]/10 bg-[var(--color-lacquer)] py-3 text-[var(--color-cream)]">
      <div className="marquee-track">
        {run.map((word, i) => (
          <span key={i} className="flex items-center">
            <span className="font-display whitespace-nowrap px-6 text-sm uppercase tracking-[0.18em]">
              {word}
            </span>
            <span className="text-[var(--color-gold)]" aria-hidden="true">
              ✶
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
