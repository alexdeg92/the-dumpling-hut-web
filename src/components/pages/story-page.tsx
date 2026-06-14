"use client";

import { useI18n } from "@/lib/i18n";
import { useReveal } from "@/lib/use-reveal";
import { PageHeader } from "@/components/page-header";
import { ChiliSprig, SteamerBasket } from "@/components/art";
import { StatsBand } from "@/components/home-sections";

export function StoryPageBody() {
  const { t } = useI18n();
  const s = t.story;
  const ref = useReveal<HTMLDivElement>();

  return (
    <>
      <PageHeader eyebrow={s.eyebrow} title={s.title} lead={s.lead} />

      <section ref={ref} className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="reveal relative">
            <div className="overflow-hidden rounded-[2.5rem] border border-[var(--color-ink)]/10 bg-[var(--color-night)] p-8">
              <SteamerBasket className="w-full" />
            </div>
            <ChiliSprig className="absolute -bottom-6 -right-4 w-20 float-mid" />
          </div>

          <div className="grid gap-4">
            {s.blocks.map((b) => (
              <div
                key={b.k}
                className="reveal flex gap-5 rounded-2xl border border-[var(--color-ink)]/10 bg-white/70 p-6"
              >
                <span className="font-display text-3xl text-[var(--color-lacquer)]">{b.k}</span>
                <div>
                  <h3 className="font-display text-xl text-[var(--color-ink)]">{b.h}</h3>
                  <p className="mt-2 leading-7 text-[var(--color-ink)]/70">{b.p}</p>
                </div>
              </div>
            ))}

            <div className="reveal mt-2 flex flex-wrap gap-2">
              {s.values.map((v) => (
                <span
                  key={v}
                  className="rounded-full bg-[var(--color-cream-2)]/70 px-4 py-2 text-sm font-bold text-[var(--color-ink)]/75"
                >
                  {v}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <StatsBand />
    </>
  );
}
