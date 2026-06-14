"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";
import { defaultLang, isLang, languages, type Lang } from "@/lib/content";

/** localStorage key holding the user's explicit language choice. */
export const LANG_STORAGE_KEY = "dh-lang";

/**
 * Map a raw `navigator.language` value (e.g. "en-CA", "fr", "zh-Hans-CN")
 * to one of our supported languages. Falls back to the default language.
 */
export function detectBrowserLanguage(
  raw: string | null | undefined = typeof navigator !== "undefined"
    ? navigator.language
    : undefined,
): Lang {
  const tag = (raw ?? "").toLowerCase();
  if (tag.startsWith("fr")) return "fr";
  if (tag.startsWith("zh")) return "zh";
  if (tag.startsWith("en")) return "en";
  return defaultLang;
}

/** Read the stored language override, if any (and still valid). */
export function getStoredLanguage(): Lang | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = window.localStorage.getItem(LANG_STORAGE_KEY);
    return stored && isLang(stored) ? stored : null;
  } catch {
    return null;
  }
}

/** Persist the user's explicit language choice. */
export function storeLanguage(lang: Lang): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LANG_STORAGE_KEY, lang);
  } catch {
    /* storage may be unavailable (private mode, etc.) — ignore */
  }
}

/**
 * Swap the leading language segment of a pathname, keeping the rest of the
 * route intact. "/en/menu" + "fr" -> "/fr/menu". Falls back to "/<lang>"
 * when the current path has no recognizable language prefix.
 */
export function swapLangInPath(pathname: string, lang: Lang): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length > 0 && isLang(segments[0])) {
    segments[0] = lang;
    return `/${segments.join("/")}`;
  }
  return `/${lang}`;
}

/**
 * Language controls for client components: the active language (from the URL)
 * and a `setLanguage` that persists the choice and navigates while preserving
 * the current page.
 */
export function useLanguage() {
  const router = useRouter();
  const pathname = usePathname();

  const current: Lang = (() => {
    const first = pathname.split("/").filter(Boolean)[0];
    return first && isLang(first) ? first : defaultLang;
  })();

  const setLanguage = useCallback(
    (lang: Lang) => {
      storeLanguage(lang);
      if (lang === current) return;
      router.push(swapLangInPath(pathname, lang));
    },
    [current, pathname, router],
  );

  return { current, setLanguage, languages };
}
