"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { menuItems, type MenuItem } from "@/lib/content";
import { useI18n } from "@/lib/i18n";

const ORBIT_DISH_IDS = [
  "lamb-coriander-steamed",
  "pork-chive-steamed",
  "chicken-mushroom-steamed",
  "pork-dill-panfried",
  "lamb-coriander-panfried",
] as const;

const CARD_SIZE = "clamp(8rem, 46vw, 10.5rem)";

function getOrbitDishes(): MenuItem[] {
  return ORBIT_DISH_IDS.map((id) => menuItems.find((m) => m.id === id)).filter(
    (item): item is MenuItem => item != null,
  );
}

function stackTilt(index: number, count: number): number {
  const mid = (count - 1) / 2;
  return (index - mid) * 9;
}

export function FeaturedDishOrbit() {
  const { lang, t } = useI18n();
  const items = getOrbitDishes();
  const count = items.length;
  const step = 360 / count;

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [fanned, setFanned] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setFanned(true);
      return;
    }
    const id = window.requestAnimationFrame(() => setFanned(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (!fanned || paused) return;
    const id = window.setInterval(() => {
      setActive((prev) => (prev + 1) % count);
    }, 3200);
    return () => window.clearInterval(id);
  }, [count, fanned, paused]);

  const ringRotation = -(step * active);

  return (
    <div className="mt-10 grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
      <div
        className="relative mx-auto flex aspect-square w-full max-w-[22rem] items-center justify-center overflow-visible sm:max-w-[26rem] lg:max-w-[28rem]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <div className="relative h-0 w-0">
          <div
            className="featured-fan-ring absolute bottom-0 left-0 origin-bottom-left"
            style={{ transform: fanned ? `rotate(${ringRotation}deg)` : undefined }}
          >
            {items.map((item, i) => {
              const spreadAngle = step * i;
              const tilt = stackTilt(i, count);
              const isActive = i === active;
              const angle = fanned ? spreadAngle : tilt;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={item.name[lang]}
                  aria-pressed={isActive}
                  disabled={!fanned}
                  className={`featured-fan-card absolute bottom-0 left-0 origin-bottom-left overflow-hidden rounded-[1.45rem] border-[6px] border-white bg-white shadow-[0_26px_60px_-28px_rgba(28,14,11,0.72)] disabled:cursor-default ${
                    isActive && fanned
                      ? "z-30 opacity-100 shadow-[0_34px_75px_-22px_rgba(122,15,18,0.58)]"
                      : fanned
                        ? "z-10 opacity-90 hover:opacity-100"
                        : "z-10 opacity-95"
                  }`}
                  style={{
                    width: CARD_SIZE,
                    height: CARD_SIZE,
                    transform: fanned && isActive ? `rotate(${angle}deg) scale(1.05)` : `rotate(${angle}deg)`,
                    transitionDelay: fanned ? `${i * 120}ms` : "0ms",
                  }}
                >
                  <Image
                    src={item.image}
                    alt={item.name[lang]}
                    fill
                    sizes="(max-width: 768px) 48vw, 200px"
                    className="object-cover"
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="relative min-h-[14rem]">
        {items.map((item, i) => {
          const isActive = i === active;
          return (
            <div
              key={item.id}
              aria-hidden={!isActive}
              className={`transition-all duration-700 ease-[var(--ease-soft)] ${
                isActive
                  ? "relative translate-y-0 opacity-100"
                  : "pointer-events-none absolute inset-0 translate-y-3 opacity-0"
              }`}
            >
              <p className="eyebrow text-[var(--color-lacquer)]">
                0{i + 1} · {t.menu.cooks[item.cook]}
              </p>
              <h3 className="font-display mt-2 text-3xl text-[var(--color-ink)] sm:text-4xl">
                {item.name[lang]}
              </h3>
              <p className="mt-3 max-w-md leading-7 text-[var(--color-ink)]/70">
                {item.blurb[lang]}
              </p>
              <p className="mt-5 font-bold text-[var(--color-lacquer)]">
                ${item.price.toFixed(2)}
                {item.count ? ` · ×${item.count}` : ""}
              </p>
            </div>
          );
        })}

        <div className="mt-8 flex flex-wrap items-center gap-3">
          {items.map((item, i) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActive(i)}
              aria-label={item.name[lang]}
              className={`size-2.5 rounded-full transition ${
                i === active
                  ? "scale-125 bg-[var(--color-lacquer)]"
                  : "bg-[var(--color-ink)]/20 hover:bg-[var(--color-gold)]"
              }`}
            />
          ))}
          <Link
            href={`/${lang}/menu`}
            className="ml-auto text-sm font-bold text-[var(--color-lacquer)] hover:underline"
          >
            {t.nav.menu} →
          </Link>
        </div>
      </div>
    </div>
  );
}
