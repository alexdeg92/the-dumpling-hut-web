import type { Metadata } from "next";
import { Fraunces, Noto_Sans, Noto_Serif_SC } from "next/font/google";
import { restaurant } from "@/lib/content";
import { absoluteUrl, defaultOgImage, siteUrl } from "@/lib/site";
import "./globals.css";

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["SOFT", "opsz"],
  display: "swap",
});

const notoSerifSC = Noto_Serif_SC({
  variable: "--font-noto-serif-sc",
  subsets: ["latin"],
  weight: ["700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "The Dumpling Hut | La Maison Dumplings | 饺子小屋",
    template: "%s",
  },
  description:
    "A cozy Chinese dumpling house in Montreal serving hand-folded dumplings from special homemade recipes on Rue Clark.",
  applicationName: restaurant.name,
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    siteName: restaurant.name,
    locale: "en_CA",
    images: [
      {
        url: absoluteUrl(defaultOgImage),
        width: 1200,
        height: 1200,
        alt: `${restaurant.name} dumplings`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${notoSans.variable} ${display.variable} ${notoSerifSC.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
