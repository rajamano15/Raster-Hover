import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import DemoModalProvider from "@/components/providers/DemoModalProvider";
import BorderGlow from "@/components/providers/BorderGlow";
import DotField from "@/components/backgrounds/DotField";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SITE } from "@/data/site";
import "./globals.css";

const baiJamjuree = localFont({
  src: [
    { path: "./fonts/BaiJamjuree-Light.ttf", weight: "300", style: "normal" },
    { path: "./fonts/BaiJamjuree-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/BaiJamjuree-Medium.ttf", weight: "500", style: "normal" },
    { path: "./fonts/BaiJamjuree-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "./fonts/BaiJamjuree-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-bai",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Raster Images — Revolutionizing Digital Healthcare",
    template: "%s | Raster Images",
  },
  description: SITE.description,
  keywords: [
    "Healthcare Software",
    "Healthcare Solutions",
    "PACS",
    "RIS",
    "Teleradiology",
    "Hospital Management Software",
    "EMR",
    "Lab Information System",
    "IoMT",
    "Medical Software",
    "Healthcare Hardware",
    "Medical Technology",
  ],
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: "Raster Images — Revolutionizing Digital Healthcare",
    description: SITE.description,
    url: SITE.url,
    images: [{ url: "/logo-clr.webp", width: 258, height: 39, alt: "Raster Images" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Raster Images — Revolutionizing Digital Healthcare",
    description: SITE.description,
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#050807",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={baiJamjuree.variable}>
      <body>
        <a
          href="#main"
          className="sr-only z-[200] rounded-lg bg-brand px-4 py-2 font-semibold text-brand-ink focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Skip to main content
        </a>
        <DemoModalProvider>
          <DotField
            dotRadius={1.5}
            dotSpacing={15}
            cursorRadius={500}
            cursorForce={0.1}
            bulgeOnly={false}
            bulgeStrength={67}
            sparkle
            waveAmplitude={0}
            gradientFrom="#00A87B"
            gradientTo="rgba(180, 151, 207, 0.25)"
          />
          <BorderGlow />
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
        </DemoModalProvider>
      </body>
    </html>
  );
}
