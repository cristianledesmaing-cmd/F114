import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import localFont from "next/font/local";

import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { RevealProvider } from "@/components/ui/RevealProvider";
import { site } from "@/data/site";

import "./globals.css";

const futura = localFont({
  src: [
    { path: "../fonts/futura-medium.ttf", weight: "400 500", style: "normal" },
    { path: "../fonts/futura-medium-italic.ttf", weight: "400 500", style: "italic" },
    { path: "../fonts/futura-bold.ttf", weight: "600 700", style: "normal" },
    { path: "../fonts/futura-bold-italic.ttf", weight: "600 700", style: "italic" },
  ],
  variable: "--font-futura",
  display: "swap",
  fallback: ["Century Gothic", "Trebuchet MS", "system-ui", "sans-serif"],
});

/** Geométrica cercana a Futura, pero con j de gancho legible en el hero. */
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.fullName,
  keywords: [
    "ingeniería y arquitectura",
    "proyecto",
    "dirección de obra",
    "consultoría técnica",
    "cálculo estructural",
    "Resistencia Chaco",
    site.location.label,
  ],
  authors: [{ name: site.fullName }],
  creator: site.fullName,
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.fullName,
    title: `${site.fullName} | ${site.claim}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.fullName} | ${site.claim}`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-AR" className={`${futura.variable} ${outfit.variable} h-full antialiased`}>
      <body className="bg-bone text-charcoal relative flex min-h-full flex-col">
        <div aria-hidden="true" className="blueprint-grid pointer-events-none fixed inset-0 z-0 opacity-40" />
        <a
          href="#contenido"
          className="focus:bg-brass sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-sm focus:px-4 focus:py-2 focus:text-sm focus:text-white"
        >
          Saltar al contenido
        </a>
        <RevealProvider />
        <div className="relative z-10 flex min-h-full flex-1 flex-col">
          <SiteHeader />
          <main id="contenido" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
