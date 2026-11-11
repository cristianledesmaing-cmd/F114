import Image from "next/image";
import Link from "next/link";
import { Fragment, type CSSProperties } from "react";

import { HeroBackground } from "@/components/sections/HeroBackground";
import { Emphasis } from "@/components/ui/Emphasis";
import { ArrowIcon, ArrowUpRightIcon, PinIcon } from "@/components/ui/icons";
import { brand } from "@/data/site";
import { buildWhatsappHref, type HeroContent, type SiteContent } from "@/lib/content-types";

export function Hero({ hero, site }: { hero: HeroContent; site: SiteContent }) {
  const whatsappHref = buildWhatsappHref(site.contact.whatsapp.number, site.contact.whatsapp.message);

  return (
    <section className="relative isolate h-svh overflow-hidden bg-transparent text-charcoal">
      <div className="absolute inset-x-0 top-20 right-0 bottom-0 overflow-hidden sm:top-[5.25rem] lg:top-22">
        <HeroBackground slides={hero.slides} />

        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
          <Image
            src={brand.markOnLight}
            alt=""
            width={brand.markSize}
            height={brand.markSize}
            priority
            className="absolute right-6 bottom-6 h-28 w-auto opacity-[0.85] sm:right-8 sm:bottom-8 sm:h-32 lg:right-10 lg:bottom-10 lg:h-40"
          />
        </div>

        <div className="relative z-10 flex h-full w-full flex-col justify-center px-10 py-8 sm:px-12 sm:py-10 lg:px-16 lg:py-12">
          <p data-reveal="" className="text-overline text-brass-ink flex items-center gap-2.5 text-[1.05rem]">
            <PinIcon className="h-5 w-5 shrink-0" />
            {hero.location}
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
            {hero.headlineLines.map((line, index) => (
              <Fragment key={index}>
                {line}
                <br />
              </Fragment>
            ))}
            <span className="text-brass-ink">{hero.headlineAccent}</span>
          </h1>

          <p
            data-reveal=""
            style={{ "--reveal-delay": "160ms" } as CSSProperties}
            className="text-graphite mt-5 max-w-2xl text-lg leading-relaxed text-pretty sm:mt-6 sm:text-xl lg:text-[1.35rem]"
          >
            <Emphasis text={hero.intro} />
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
              {hero.ctaPrimary}
              <ArrowUpRightIcon className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:h-6 sm:w-6" />
            </a>
            <Link
              href="/#servicios"
              className="border-charcoal/20 text-charcoal hover:border-charcoal/50 hover:bg-charcoal/5 inline-flex items-center gap-3 rounded-md border px-6 py-3.5 text-lg font-semibold transition-colors"
            >
              {hero.ctaSecondary}
              <ArrowIcon className="h-5 w-5" />
            </Link>
          </div>

          <dl
            data-reveal=""
            style={{ "--reveal-delay": "320ms" } as CSSProperties}
            className="border-charcoal/10 mt-10 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-6 border-t pt-8 sm:mt-12 sm:grid-cols-3"
          >
            {hero.pillars.map((pillar) => (
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
