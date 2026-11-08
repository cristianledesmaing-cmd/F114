import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";

import { ArrowIcon, WhatsappIcon } from "@/components/ui/icons";
import { projects } from "@/data/projects";
import { brand, site, whatsappHref } from "@/data/site";

const stats = [
  { value: `${new Date().getFullYear() - site.foundedYear}+`, label: "Años de trayectoria" },
  { value: `${projects.length}`, label: "Proyectos publicados" },
  { value: "3", label: "Disciplinas en un mismo equipo" },
];

export function Hero() {
  return (
    <section className="relative isolate h-svh overflow-hidden bg-black text-white">
      {/* Cuadro del modo cine: deja franjas negras fijas arriba y abajo */}
      <div className="bg-ink absolute inset-x-0 top-20 right-0 bottom-8 overflow-hidden sm:top-[5.25rem] sm:bottom-9 lg:top-22 lg:bottom-10">
        <div aria-hidden="true" className="blueprint-grid absolute inset-0 opacity-40" />
        <div
          aria-hidden="true"
          className="from-ink via-carbon to-charcoal absolute inset-0 bg-gradient-to-br opacity-95"
        />

        {/* N grande: debajo de WhatsApp, centrada con el texto */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <Image
            src={brand.markOnDark}
            alt=""
            width={brand.markSize}
            height={brand.markSize}
            priority
            className="absolute top-1/2 left-[74%] h-[24rem] w-auto -translate-x-1/2 -translate-y-1/2 opacity-[0.08] sm:h-[30rem] lg:left-[76%] lg:h-[36rem] lg:opacity-[0.1]"
          />
        </div>

        <div className="relative flex h-full w-full flex-col justify-center px-10 py-8 sm:px-12 sm:py-10 lg:px-16 lg:py-12">
          <p data-reveal="" className="text-overline text-brass flex items-center gap-3">
            <span aria-hidden="true" className="bg-brass/60 inline-block h-px w-10" />
            {site.location.label}
          </p>

          <h1
            data-reveal=""
            style={{ "--reveal-delay": "80ms" } as CSSProperties}
            className="mt-5 max-w-4xl text-4xl leading-[1.04] font-bold text-balance sm:mt-6 sm:text-5xl lg:text-[4.25rem]"
          >
            Ingeniería y arquitectura, unidas en un mismo nodo.
          </h1>

          <p
            data-reveal=""
            style={{ "--reveal-delay": "160ms" } as CSSProperties}
            className="text-sand/85 mt-5 max-w-2xl text-base leading-relaxed text-pretty sm:mt-6 sm:text-lg lg:text-xl"
          >
            En Nodo el <strong className="font-semibold text-white">anteproyecto</strong>, el{" "}
            <strong className="font-semibold text-white">cálculo estructural</strong> y el{" "}
            <strong className="font-semibold text-white">proyecto</strong> se resuelven juntos: planos,
            modelado 3D, renders, cómputos y presupuestos, con una sola coordinación técnica.
          </p>

          <div
            data-reveal=""
            style={{ "--reveal-delay": "240ms" } as CSSProperties}
            className="mt-8 flex flex-wrap items-center gap-4 sm:mt-9"
          >
            <Link
              href="/#proyectos"
              className="group text-charcoal inline-flex items-center gap-2.5 rounded-full bg-white px-6 py-3.5 text-sm font-semibold transition-all hover:bg-white/90"
            >
              Ver proyectos
              <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2.5 rounded-full border border-white/25 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:border-white/60 hover:bg-white/5"
            >
              <WhatsappIcon className="h-4 w-4" />
              Consultar por WhatsApp
            </a>
          </div>

          <dl
            data-reveal=""
            style={{ "--reveal-delay": "320ms" } as CSSProperties}
            className="mt-10 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-6 border-t border-white/10 pt-8 sm:mt-12 sm:grid-cols-3"
          >
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="font-display block text-3xl font-bold text-white sm:text-4xl">
                    {stat.value}
                  </span>
                  <span className="text-sand/75 mt-2 block text-xs leading-snug tracking-wide uppercase">
                    {stat.label}
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
