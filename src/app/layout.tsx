import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
});

const lato = Lato({
  subsets: ["latin"],
  variable: "--font-lato",
  weight: ["300", "400", "700"],
});

export const metadata: Metadata = {
  title: "Hytta på Hansmyr — Skogshytte i Nord-Odal",
  description:
    "En autentisk norsk skogshytte for 9 gjester i Nord-Odal, Innlandet. Med hester på tunet, blomsterenger og Storsjøen 10 minutter unna. 1,5 time fra Oslo.",
  keywords: ["hytteutleie", "Nord-Odal", "skogshytte", "Innlandet", "Sagstua", "ferie", "Storsjøen"],
  openGraph: {
    title: "Hytta på Hansmyr",
    description: "Stille dager i villskogen — 1,5 time fra Oslo",
    locale: "nb_NO",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nb" className={`${playfair.variable} ${lato.variable}`}>
      <body className="antialiased font-lato">{children}</body>
    </html>
  );
}
