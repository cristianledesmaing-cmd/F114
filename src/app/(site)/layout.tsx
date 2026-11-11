import type { ReactNode } from "react";

import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { RevealProvider } from "@/components/ui/RevealProvider";
import { getSiteContent } from "@/lib/content";

export default async function SiteLayout({ children }: { children: ReactNode }) {
  const site = await getSiteContent();

  return (
    <>
      <a
        href="#contenido"
        className="focus:bg-brass sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-sm focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Saltar al contenido
      </a>
      <RevealProvider />
      <div className="relative z-10 flex min-h-full flex-1 flex-col">
        <SiteHeader fullName={site.fullName} tagline={site.tagline} />
        <main id="contenido" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </div>
      {/* Grilla fija por encima del contenido para que se conserve en toda la página. */}
      <div
        aria-hidden="true"
        className="blueprint-grid pointer-events-none fixed inset-0 z-40 mix-blend-multiply opacity-55"
      />
    </>
  );
}
