"use client";

/* Two-layer image that paints a cached thumbnail instantly, then cross-fades
   to the full-res file once it loads. We swap the two files manually, which is
   simpler with a plain <img> than with next/image, so we opt out of the rule. */
/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState } from "react";

/**
 * Shows `thumb` immediately (it should already be cached from the grid/card)
 * and fades `full` in over it once the high-res file is ready. Mount with a
 * `key` per image so navigating resets the fade. Falls back to an imperative
 * `complete` check for files already in the browser cache, where `onLoad` may
 * not fire after mount.
 *
 * The parent must be `position: relative` — both layers are absolutely filled.
 */
export function ProgressiveImage({
  thumb,
  full,
  alt,
  fit = "cover",
}: {
  thumb: string;
  full: string;
  alt: string;
  fit?: "cover" | "contain";
}) {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (ref.current?.complete) setLoaded(true);
  }, []);

  const fitClass = fit === "contain" ? "object-contain" : "object-cover object-center";

  return (
    <>
      <img
        src={thumb}
        alt=""
        aria-hidden="true"
        className={`absolute inset-0 h-full w-full ${fitClass}`}
      />
      <img
        ref={ref}
        src={full}
        alt={alt}
        onLoad={() => setLoaded(true)}
        className={`absolute inset-0 h-full w-full ${fitClass} transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </>
  );
}
