import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import LoadingScreen from "@/components/LoadingScreen";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-serif",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

// Owner-supplied display font — used for years, counters and speed-adjacent numerals
const dashHorizon = localFont({
  src: "../fonts/dash-horizon-font/Dashhorizon-eZ5wg.otf",
  variable: "--font-display",
});

// Owner-supplied car-pictogram dingbat font — decorative silhouettes
const autocar = localFont({
  src: "../fonts/dj-autocar-font/DjAutocar-44EB.ttf",
  variable: "--font-cars",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://lara-collection.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "The Lara Collection — Private Automobile Collection",
    template: "%s — The Lara Collection",
  },
  description:
    "A private collection of exceptional Mercedes-Benz, Porsche and Ferrari automobiles, spanning 1958 to 2024.",
  openGraph: {
    title: "The Lara Collection",
    description:
      "A private collection of exceptional Mercedes-Benz, Porsche and Ferrari automobiles.",
    url: siteUrl,
    siteName: "The Lara Collection",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Lara Collection",
    description:
      "A private collection of exceptional Mercedes-Benz, Porsche and Ferrari automobiles.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${serif.variable} ${sans.variable} ${dashHorizon.variable} ${autocar.variable}`}
    >
      <body className="font-sans">
        <SmoothScroll />
        <LoadingScreen />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
