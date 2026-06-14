import Link from "next/link";
import { languageLabels, languages, navItems, restaurant, type Lang } from "@/lib/content";

type ShellCopy = {
  nav: Record<string, string>;
  common: Record<string, string>;
};

export function SiteHeader({
  lang,
  copy,
  active,
}: {
  lang: Lang;
  copy: ShellCopy;
  active: string;
}) {
  return (
    <header className="sticky top-0 z-50 border-b border-red-950/10 bg-cream/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-4 py-3 sm:px-6 lg:px-8">
        <Link href={`/${lang}`} className="group flex min-w-0 items-center gap-3">
          <span className="grid size-11 shrink-0 place-items-center rounded-full bg-red-800 text-lg font-black text-gold shadow-sm">
            DH
          </span>
          <span className="min-w-0">
            <span className="block truncate text-base font-black uppercase tracking-wide text-red-950">
              {restaurant.name}
            </span>
            <span className="block truncate text-xs font-semibold text-red-900/70">
              {restaurant.altName}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {navItems.map((item) => {
            const href = item.href ? `/${lang}/${item.href}` : `/${lang}`;
            const isActive = active === item.key;
            return (
              <Link
                key={item.key}
                href={href}
                className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                  isActive
                    ? "bg-red-800 text-white shadow-sm"
                    : "text-red-950/75 hover:bg-white hover:text-red-900"
                }`}
              >
                {copy.nav[item.key]}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <LanguageSwitcher lang={lang} active={active} />
          <a className="button-primary py-2 text-sm" href={restaurant.phoneHref}>
            {copy.common.order}
          </a>
        </div>

        <details className="group relative lg:hidden">
          <summary className="list-none rounded-full border border-red-950/15 bg-white px-4 py-2 text-sm font-black text-red-950 shadow-sm marker:hidden">
            {copy.nav.menuToggle}
          </summary>
          <div className="absolute right-0 mt-3 w-72 rounded-2xl border border-red-950/10 bg-white p-3 shadow-2xl">
            <div className="grid gap-1">
              {navItems.map((item) => {
                const href = item.href ? `/${lang}/${item.href}` : `/${lang}`;
                return (
                  <Link
                    key={item.key}
                    href={href}
                    className="rounded-xl px-3 py-3 text-sm font-bold text-red-950 hover:bg-cream"
                  >
                    {copy.nav[item.key]}
                  </Link>
                );
              })}
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-red-950/10 pt-3">
              <LanguageSwitcher lang={lang} active={active} />
              <a className="button-primary py-2 text-sm" href={restaurant.phoneHref}>
                {copy.common.order}
              </a>
            </div>
          </div>
        </details>
      </div>
    </header>
  );
}

export function LanguageSwitcher({ lang, active }: { lang: Lang; active: string }) {
  const segment = active === "home" ? "" : `/${active}`;

  return (
    <div className="flex rounded-full border border-red-950/10 bg-white p-1 shadow-sm" aria-label="Language">
      {languages.map((item) => (
        <Link
          key={item}
          href={`/${item}${segment}`}
          className={`rounded-full px-3 py-1.5 text-xs font-black transition ${
            item === lang
              ? "bg-gold text-red-950"
              : "text-red-950/60 hover:bg-cream hover:text-red-950"
          }`}
        >
          {languageLabels[item]}
        </Link>
      ))}
    </div>
  );
}

export function SiteFooter({ lang, copy }: { lang: Lang; copy: ShellCopy }) {
  return (
    <footer className="border-t border-red-950/10 bg-red-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.2fr_1fr_1fr] lg:px-8">
        <div>
          <p className="text-xl font-black">{restaurant.name}</p>
          <p className="mt-1 text-sm font-semibold text-gold">{restaurant.altName}</p>
          <p className="mt-4 max-w-sm text-sm leading-6 text-white/70">
            {copy.common.openKitchen} · {copy.common.owners}
          </p>
        </div>
        <div className="text-sm leading-7 text-white/75">
          <p className="font-black text-white">{copy.common.address}</p>
          <a href={restaurant.mapsHref} target="_blank" rel="noreferrer" className="hover:text-gold">
            {restaurant.address}
          </a>
          <p className="mt-3 font-black text-white">{copy.common.phone}</p>
          <a href={restaurant.phoneHref} className="hover:text-gold">
            {restaurant.phone}
          </a>
        </div>
        <div className="text-sm leading-7 text-white/75">
          <p className="font-black text-white">{copy.common.instagram}</p>
          <a href={restaurant.instagramHref} target="_blank" rel="noreferrer" className="hover:text-gold">
            {restaurant.instagram}
          </a>
          <div className="mt-4 flex gap-2">
            {languages.map((item) => (
              <Link
                key={item}
                href={`/${item}`}
                className={item === lang ? "font-black text-gold" : "hover:text-gold"}
              >
                {languageLabels[item]}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export function SiteChrome({
  lang,
  copy,
  active,
  children,
}: {
  lang: Lang;
  copy: ShellCopy;
  active: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader lang={lang} copy={copy} active={active} />
      <main className="flex-1">{children}</main>
      <SiteFooter lang={lang} copy={copy} />
    </div>
  );
}

export function PageIntro({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="mt-4 text-balance text-3xl font-black leading-tight text-red-950 sm:text-5xl">
        {title}
      </h1>
      <p className="mt-5 text-pretty text-lg leading-8 text-red-950/70">{intro}</p>
    </div>
  );
}
