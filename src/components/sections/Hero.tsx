import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";

import { Container } from "@/components/ui/Container";
import { ArrowIcon, WhatsappIcon } from "@/components/ui/icons";
import { projects } from "@/data/projects";
import { site, whatsappHref } from "@/data/site";

const stats = [
  { value: `${new Date().getFullYear() - site.foundedYear}+`, label: "Años de trayectoria" },
  { value: `${projects.length}`, label: "Proyectos publicados" },
  { value: "3", label: "Disciplinas en un mismo equipo" },
];

export function Hero() {
  return (
    <section className="bg-ink relative isolate overflow-hidden text-white">
      <div aria-hidden="true" className="blueprint-grid absolute inset-0 opacity-40" />
      <div
        aria-hidden="true"
        className="from-ink via-carbon to-charcoal absolute inset-0 bg-gradient-to-br opacity-95"
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <Image
          src="/brand/isotipo-claro.png"
          alt=""
          width={712}
          height={814}
          priority
          className="absolute -top-16 -right-24 h-[38rem] w-auto opacity-[0.05] sm:-right-10 lg:right-4 lg:h-[46rem] lg:opacity-[0.07]"
        />
      </div>

      <Container width="wide" className="relative">
        <div className="flex min-h-[92svh] flex-col justify-center pt-32 pb-20 lg:pt-40 lg:pb-28">
          <p
            data-reveal=""
            className="text-overline text-brass flex items-center gap-3"
          >
            <span aria-hidden="true" className="bg-brass/60 inline-block h-px w-10" />
            {site.location.label}
          </p>

          <h1
            data-reveal=""
            style={{ "--reveal-delay": "80ms" } as CSSProperties}
            className="mt-7 max-w-4xl text-4xl leading-[1.04] font-bold text-justify sm:text-6xl lg:text-[4.5rem]"
          >
            Arquitectura e Ingeniería resueltas por un mismo equipo.
          </h1>

          <p
            data-reveal=""
            style={{ "--reveal-delay": "160ms" } as CSSProperties}
            className="text-sand/85 mt-8 max-w-2xl text-lg leading-relaxed text-justify sm:text-xl"
          >
            Desarrollamos el <strong className="font-semibold text-white">anteproyecto</strong>, el{" "}
            <strong className="font-semibold text-white">cálculo estructural</strong> y el{" "}
            <strong className="font-semibold text-white">proyecto</strong> completo: planos, modelado
            3D, renders realistas, cómputos y presupuestos. Todo bajo una misma coordinación técnica.
          </p>

          <div
            data-reveal=""
            style={{ "--reveal-delay": "240ms" } as CSSProperties}
            className="mt-11 flex flex-wrap items-center gap-4"
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
            className="mt-16 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-8 border-t border-white/10 pt-10 sm:grid-cols-3"
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
      </Container>
    </section>
  );
}
