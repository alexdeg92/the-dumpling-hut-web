"use client";

import { createContext, useContext } from "react";
import { getCopy, type Lang, type SiteCopy } from "@/lib/content";

type I18nValue = {
  lang: Lang;
  t: SiteCopy;
};

const I18nContext = createContext<I18nValue | null>(null);

/**
 * Language provider. The value is derived purely from the `lang` prop
 * (set by the server from the route segment) — no useEffect, no client
 * theming churn. Components read it via `useI18n()`.
 */
export function I18nProvider({
  lang,
  children,
}: {
  lang: Lang;
  children: React.ReactNode;
}) {
  const value: I18nValue = { lang, t: getCopy(lang) };
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n must be used inside <I18nProvider>");
  }
  return ctx;
}
