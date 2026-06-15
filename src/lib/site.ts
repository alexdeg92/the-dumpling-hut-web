/** Public site origin used for canonical URLs, sitemap, and robots.txt. */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://the-dumpling-hut-web.vercel.app"
).replace(/\/$/, "");

export const siteRoutes = ["", "menu", "about", "gallery", "location"] as const;

export type SiteRoute = (typeof siteRoutes)[number];

export function langPath(lang: string, route: SiteRoute = ""): string {
  return route ? `/${lang}/${route}` : `/${lang}`;
}

export function absoluteUrl(path: string): string {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export const defaultOgImage = "/feed/02-steamed-plate.jpg";
