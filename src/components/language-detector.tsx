"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { isLang, type Lang } from "@/lib/content";
import {
  detectBrowserLanguage,
  getStoredLanguage,
  swapLangInPath,
} from "@/lib/use-language";

/**
 * Renders nothing. On mount it resolves the visitor's preferred language and,
 * if it differs from the language in the URL, redirects to the matching route.
 *
 * Priority:
 *   1. An explicit choice the user previously saved (localStorage).
 *   2. The browser's `navigator.language` on a first, unsaved visit.
 *
 * A stored choice always wins, so a French speaker who manually picks English
 * stays in English. Detection only kicks in when nothing has been saved yet.
 */
export function LanguageDetector({ current }: { current: Lang }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const stored = getStoredLanguage();
    const preferred = stored ?? detectBrowserLanguage();

    // Only act on real language routes; never fight the 404 / non-lang paths.
    const first = pathname.split("/").filter(Boolean)[0];
    if (!first || !isLang(first)) return;

    if (preferred !== current) {
      router.replace(swapLangInPath(pathname, preferred));
    }
    // run once per mount — `current` is stable for the rendered route
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
