import type { Metadata } from "next";
import { Noto_Sans, Noto_Serif_SC } from "next/font/google";
import "./globals.css";

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin", "latin-ext"],
});

const notoSerifSC = Noto_Serif_SC({
  variable: "--font-noto-serif-sc",
  subsets: ["latin"],
  weight: ["700", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://the-dumpling-hut-web.vercel.app"),
  title: "The Dumpling Hut | La Maison Dumplings",
  description:
    "A cozy, family-run Chinese dumpling restaurant in Montreal serving hand-folded dumplings.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${notoSans.variable} ${notoSerifSC.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-cream text-red-950">{children}</body>
    </html>
  );
}
