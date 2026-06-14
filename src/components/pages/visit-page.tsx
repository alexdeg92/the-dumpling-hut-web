"use client";

import { useEffect, useState } from "react";
import { restaurant } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import { useReveal } from "@/lib/use-reveal";
import { PageHeader } from "@/components/page-header";

export function VisitPageBody() {
  const { t } = useI18n();
  const v = t.visit;
  const ref = useReveal<HTMLDivElement>();

  // 0 = Sunday … 6 = Saturday; hours array is Mon..Sun.
  // Resolved after mount to keep server/client markup identical (no hydration mismatch).
  const [today, setToday] = useState<number | null>(null);
  useEffect(() => {
    const id = requestAnimationFrame(() => setToday(new Date().getDay()));
    return () => cancelAnimationFrame(id);
  }, []);
  const todayIdx = today === null ? -1 : (today + 6) % 7; // map to Mon-first index
  const isOpen = todayIdx >= 0 && todayIdx <= 5; // closed Sundays

  return (
    <>
      <PageHeader eyebrow={v.eyebrow} title={v.title} lead={v.lead} />

      <section ref={ref} className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          {/* map */}
          <div className="reveal overflow-hidden rounded-3xl border border-[var(--color-ink)]/10 shadow-[0_30px_60px_-40px_rgba(28,14,11,0.6)]">
            <iframe
              title={v.mapAlt}
              src={restaurant.mapEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[420px] w-full lg:h-full"
            />
          </div>

          {/* info column */}
          <div className="grid gap-4">
            <div className="reveal rounded-3xl bg-[var(--color-lacquer)] p-6 text-[var(--color-cream)]">
              <div className="flex items-center gap-2">
                <span className={`size-2.5 rounded-full ${isOpen ? "bg-[var(--color-jade)]" : "bg-[var(--color-gold)]"}`} />
                <span className="text-sm font-bold">
                  {today === null ? "" : isOpen ? v.todayOpen : v.todayClosed}
                </span>
              </div>
              <p className="eyebrow mt-4 text-[var(--color-gold-soft)]">{t.common.address}</p>
              <a
                href={restaurant.mapsHref}
                target="_blank"
                rel="noreferrer"
                className="mt-1 block text-lg font-semibold leading-7 hover:text-[var(--color-gold)]"
              >
                {restaurant.address}
              </a>
              <a href={restaurant.mapsHref} target="_blank" rel="noreferrer" className="btn btn-gold mt-5 w-full">
                {t.common.directions}
              </a>
            </div>

            <div className="reveal rounded-3xl border border-[var(--color-ink)]/10 bg-white/70 p-6">
              <p className="eyebrow text-[var(--color-lacquer)]">{v.callTitle}</p>
              <a
                href={restaurant.phoneHref}
                className="font-display mt-1 block text-2xl text-[var(--color-ink)] hover:text-[var(--color-lacquer)]"
              >
                {restaurant.phone}
              </a>
            </div>
          </div>
        </div>

        {/* hours table */}
        <div className="reveal mt-6 rounded-3xl border border-[var(--color-ink)]/10 bg-white/70 p-6 sm:p-8">
          <p className="eyebrow text-[var(--color-lacquer)]">{v.hoursTitle}</p>
          <div className="mt-4 grid gap-1 sm:grid-cols-2">
            {t.hours.map(([day, time], i) => {
              const isToday = i === todayIdx;
              return (
                <div
                  key={day}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm ${
                    isToday
                      ? "bg-[var(--color-gold)]/25 font-extrabold text-[var(--color-ink)]"
                      : "text-[var(--color-ink)]/75"
                  }`}
                >
                  <span className="font-bold">{day}</span>
                  <span>{time}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
