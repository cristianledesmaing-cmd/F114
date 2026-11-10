import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";

import { ArrowIcon, ArrowUpRightIcon, PinIcon } from "@/components/ui/icons";
import { heroPillars } from "@/data/services";
import { brand, site, whatsappHref } from "@/data/site";

export function Hero() {
  return (
    <section className="relative isolate h-svh overflow-hidden bg-transparent text-charcoal">
      <div className="from-bone/55 via-sky/50 to-sky-mid/45 absolute inset-x-0 top-20 right-0 bottom-8 overflow-hidden bg-gradient-to-br sm:top-[5.25rem] sm:bottom-9 lg:top-22 lg:bottom-10">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
          {/* Sin disco: el fondo y el mallado continúan dentro del anillo; el trazo del logo los tapa. */}
          <Image
            src={brand.markOnLight}
            alt=""
            width={brand.markSize}
            height={brand.markSize}
            priority
            className="absolute top-1/2 left-[70%] h-[24rem] w-auto -translate-x-1/2 -translate-y-1/2 opacity-[0.72] sm:h-[30rem] lg:left-[72%] lg:h-[38rem] lg:opacity-[0.8]"
          />
        </div>

        <div className="relative z-10 flex h-full w-full flex-col justify-center px-10 py-8 sm:px-12 sm:py-10 lg:px-16 lg:py-12">
          <p data-reveal="" className="text-overline text-brass-ink flex items-center gap-2.5 text-[1.05rem]">
            <PinIcon className="h-5 w-5 shrink-0" />
            Resistencia, Chaco
          </p>

          <p
            data-reveal=""
            style={{ "--reveal-delay": "40ms" } as CSSProperties}
            className="text-graphite mt-5 max-w-2xl text-lg leading-relaxed italic sm:mt-6 sm:text-xl"
          >
            &ldquo;{site.slogan}&rdquo;
          </p>

          <h1
            data-reveal=""
            style={{ "--reveal-delay": "100ms" } as CSSProperties}
            className="font-hero mt-4 max-w-4xl text-5xl leading-[1.04] font-bold tracking-tight sm:mt-5 sm:text-6xl lg:text-[4.75rem]"
          >
            El diseño y la
            <br />
            estructura se
            <br />
            deciden <span className="text-brass-ink">juntos.</span>
          </h1>

          <p
            data-reveal=""
            style={{ "--reveal-delay": "160ms" } as CSSProperties}
            className="text-graphite mt-5 max-w-2xl text-lg leading-relaxed text-pretty sm:mt-6 sm:text-xl lg:text-[1.35rem]"
          >
            Hacemos <strong className="text-charcoal font-semibold">proyectos</strong>, dirigimos{" "}
            <strong className="text-charcoal font-semibold">obras</strong> y brindamos{" "}
            <strong className="text-charcoal font-semibold">consultoría técnica</strong>. Integramos
            ingeniería y arquitectura para que las decisiones de diseño tengan en cuenta cómo se va
            a construir.
          </p>

          <div
            data-reveal=""
            style={{ "--reveal-delay": "240ms" } as CSSProperties}
            className="mt-8 flex flex-wrap items-center gap-4 sm:mt-9"
          >
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer noopener"
              className="group bg-brass hover:bg-brass-ink inline-flex items-center gap-3 rounded-md px-6 py-3.5 text-lg font-semibold text-white transition-colors"
            >
              Consultar por WhatsApp
              <ArrowUpRightIcon className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:h-6 sm:w-6" />
            </a>
            <Link
              href="/#servicios"
              className="border-charcoal/20 text-charcoal hover:border-charcoal/50 hover:bg-charcoal/5 inline-flex items-center gap-3 rounded-md border px-6 py-3.5 text-lg font-semibold transition-colors"
            >
              Ver servicios
              <ArrowIcon className="h-5 w-5" />
            </Link>
          </div>

          <dl
            data-reveal=""
            style={{ "--reveal-delay": "320ms" } as CSSProperties}
            className="border-charcoal/10 mt-10 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-6 border-t pt-8 sm:mt-12 sm:grid-cols-3"
          >
            {heroPillars.map((pillar) => (
              <div key={pillar.label}>
                <dt className="sr-only">{pillar.label}</dt>
                <dd>
                  <span className="font-display text-brass-ink block text-base font-bold tracking-[0.18em]">
                    {pillar.number}
                  </span>
                  <span className="text-charcoal mt-2 block text-lg leading-snug font-semibold sm:text-xl">
                    {pillar.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
