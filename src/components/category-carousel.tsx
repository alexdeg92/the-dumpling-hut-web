"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";

export type CarouselItem<T extends string> = {
  key: T;
  label: string;
};

type Props<T extends string> = {
  items: CarouselItem<T>[];
  value: T;
  onChange: (key: T) => void;
  ariaLabel?: string;
  compact?: boolean;
};

/**
 * Horizontal, swipeable category carousel.
 *
 * - Native horizontal scrolling with smooth snap (mobile touch + trackpad)
 * - Pointer drag-to-scroll on desktop (click & drag the strip)
 * - Prev / next arrow buttons that appear when there's overflow
 * - Active pill is highlighted and auto-scrolled into view
 */
export function CategoryCarousel<T extends string>({
  items,
  value,
  onChange,
  ariaLabel,
  compact = false,
}: Props<T>) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  // ---- drag-to-scroll state (desktop) ----
  const drag = useRef({ active: false, moved: false, startX: 0, startScroll: 0 });

  const updateArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanLeft(el.scrollLeft > 2);
    setCanRight(el.scrollLeft < max - 2);
  }, []);

  useEffect(() => {
    updateArrows();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [updateArrows, items.length]);

  // keep the active pill in view when it changes
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const active = el.querySelector<HTMLElement>('[data-active="true"]');
    if (!active) return;
    const elRect = el.getBoundingClientRect();
    const aRect = active.getBoundingClientRect();
    if (aRect.left < elRect.left || aRect.right > elRect.right) {
      active.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [value]);

  const scrollByAmount = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    // only mouse needs manual drag; touch scrolls natively
    if (e.pointerType !== "mouse") return;
    const el = trackRef.current;
    if (!el) return;
    drag.current = {
      active: true,
      moved: false,
      startX: e.clientX,
      startScroll: el.scrollLeft,
    };
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return;
    const el = trackRef.current;
    if (!el) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    el.scrollLeft = drag.current.startScroll - dx;
  };

  const endDrag = () => {
    drag.current.active = false;
  };

  return (
    <div className="relative">
      {/* left fade + arrow */}
      <button
        type="button"
        aria-label="Scroll categories left"
        onClick={() => scrollByAmount(-1)}
        className={`absolute left-0 top-1/2 z-20 -translate-y-1/2 grid place-items-center rounded-full border border-[var(--color-ink)]/10 bg-[var(--color-cream)] text-[var(--color-lacquer)] shadow transition ${
          compact ? "size-7 text-sm" : "size-8"
        } ${canLeft ? "opacity-100" : "pointer-events-none opacity-0"}`}
      >
        ‹
      </button>

      <div
        ref={trackRef}
        role="tablist"
        aria-label={ariaLabel}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onPointerCancel={endDrag}
        className="no-scrollbar flex snap-x snap-mandatory gap-1.5 overflow-x-auto scroll-px-3 px-0.5 py-0.5 select-none cursor-grab active:cursor-grabbing sm:gap-2 sm:scroll-px-4 sm:px-1 sm:py-1"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {items.map((it) => {
          const on = it.key === value;
          return (
            <button
              key={it.key}
              role="tab"
              aria-selected={on}
              data-active={on}
              onClick={() => {
                // ignore the click that ends a drag
                if (drag.current.moved) return;
                onChange(it.key);
              }}
              className={`shrink-0 snap-start whitespace-nowrap rounded-full font-extrabold transition ${
                compact
                  ? "px-3.5 py-1.5 text-xs sm:px-5 sm:py-2.5 sm:text-sm"
                  : "px-5 py-2.5 text-sm"
              } ${
                on
                  ? "bg-[var(--color-lacquer)] text-[var(--color-cream)] shadow"
                  : "bg-[var(--color-cream-2)]/60 text-[var(--color-ink)]/70 hover:bg-[var(--color-cream-2)]"
              }`}
            >
              {it.label}
            </button>
          );
        })}
      </div>

      {/* right fade + arrow */}
      <button
        type="button"
        aria-label="Scroll categories right"
        onClick={() => scrollByAmount(1)}
        className={`absolute right-0 top-1/2 z-20 -translate-y-1/2 grid place-items-center rounded-full border border-[var(--color-ink)]/10 bg-[var(--color-cream)] text-[var(--color-lacquer)] shadow transition ${
          compact ? "size-7 text-sm" : "size-8"
        } ${canRight ? "opacity-100" : "pointer-events-none opacity-0"}`}
      >
        ›
      </button>
    </div>
  );
}
