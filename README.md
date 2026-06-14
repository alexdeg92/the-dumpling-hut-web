# The Dumpling Hut · 饺子小屋

A custom, fully trilingual (EN / FR / ZH) website for The Dumpling Hut — a
cozy, family-run hand-folded Chinese dumpling house on Rue Clark, Montréal.

Built from the ground up — no restaurant template. Warm "lantern-lit
dumpling house at night" identity: lacquer red, paper cream, gold leaf,
hand-built SVG art, animated steam, and motion throughout.

## Highlights

- **Interactive menu explorer** — search, cook-style tabs (steamed / pan-fried
  / veg / sides), dietary + signature filter chips, live sorting (featured,
  price, spice), animated result count, and a per-dish detail modal. All
  client-side via `useMemo` over a single tagged data source.
- **Social feed** — Instagram-style generated grid with hover captions linking
  to `@thedumplinghut`, plus TikTok CTA. (Drop in live oEmbed when an API
  token is available.)
- **Custom art & animation** — hand-built SVG dumplings, bamboo steamer,
  lanterns, chili sprig, gold seal; CSS-keyframe steam, lantern glow, floats,
  marquee; IntersectionObserver scroll reveals (one observer per section).
- **i18n via Context** — language comes from the route segment, fed once into a
  React context. No `useEffect`-driven theming or re-fetching.
- Today-aware opening hours and an embedded Google map on the Visit page.

## Stack

- Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS v4
- Statically generated localized routes for EN / FR / ZH

## Architecture

```
src/
  app/
    layout.tsx              root <html>, fonts, global metadata
    [lang]/
      layout.tsx            i18n provider + Nav + Footer, per-lang metadata
      page.tsx              home (hero, marquee, featured, story, stats, feed)
      menu|about|gallery|location/page.tsx
  components/
    nav · footer · hero · marquee · feed
    menu-explorer          interactive filterable menu + modal
    home-sections          featured dishes, story strip, stats band
    page-header · art      shared header, custom SVG art
    pages/                 per-route client bodies that read i18n context
  lib/
    content.ts             all trilingual copy + tagged menu data
    i18n.tsx               language context (no effect-based theming)
    use-reveal.ts          scroll-reveal IntersectionObserver hook
```

## Routes

`/en` `/fr` `/zh` and `/menu` `/about` `/gallery` `/location` under each.

## Development

```bash
npm install
npm run dev
npm run lint
npm run build
```
