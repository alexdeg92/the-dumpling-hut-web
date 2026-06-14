import type { Metadata } from "next";
import { Fraunces, Noto_Sans, Noto_Serif_SC } from "next/font/google";
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
  metadataBase: new URL("https://the-dumpling-hut-web.vercel.app"),
  title: "The Dumpling Hut | La Maison Dumplings | 饺子小屋",
  description:
    "A cozy, family-run Chinese dumpling house in Montreal serving hand-folded dumplings on Rue Clark.",
  icons: {
    icon: "/dumpling.svg",
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
