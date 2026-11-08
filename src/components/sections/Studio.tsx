import Image from "next/image";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { brand } from "@/data/site";

const pillars = [
  {
    title: "Un solo nodo",
    text: "Arquitectura, dirección técnica y cálculo estructural se resuelven en el mismo equipo, sin intermediarios ni traspasos entre estudios.",
  },
  {
    title: "Decisiones documentadas",
    text: "Cada definición queda respaldada por planos, memorias de cálculo y cómputos verificables antes de que empiece la obra.",
  },
  {
    title: "Del boceto a la obra",
    text: "Acompañamos el recorrido completo: partido arquitectónico, modelado 3D, documentación ejecutiva y seguimiento técnico.",
  },
];

export function Studio() {
  return (
    <section id="nodo" className="bg-bone scroll-mt-24 py-24 lg:py-32">
      <Container width="wide">
        <SectionHeading
          overline="Nodo"
          title="El punto donde el diseño y la estructura se deciden juntos"
          description="Nodo Ingeniería & Arquitectura reúne las dos disciplinas para que cada decisión de proyecto pueda construirse, calcularse y documentarse sin cambiar de interlocutor."
        />

        <div className="mt-16 grid items-start gap-14 lg:mt-20 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
          <Reveal className="order-2 lg:order-1">
            <div className="space-y-6">
              <p className="text-graphite text-lg leading-relaxed text-pretty">
                Trabajamos sobre obras de vivienda, comercio, salud e industria, tanto en obra nueva
                como en ampliaciones y reconversiones. En todos los casos el punto de partida es el
                mismo: entender el uso, el terreno y el presupuesto disponible antes de dibujar.
              </p>
              <p className="text-graphite text-lg leading-relaxed text-pretty">
                El resultado es documentación clara para licitar, construir y controlar la obra, con
                una previsión de costos que se sostiene a lo largo del proceso.
              </p>
            </div>

            <ul className="border-charcoal/10 divide-charcoal/10 mt-12 divide-y border-t border-b">
              {pillars.map((pillar) => (
                <li key={pillar.title} className="py-6">
                  <h3 className="text-charcoal text-lg font-bold">{pillar.title}</h3>
                  <p className="text-graphite mt-2 leading-relaxed text-pretty">{pillar.text}</p>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={120} className="order-1 lg:order-2">
            <div className="bg-charcoal relative aspect-[4/5] overflow-hidden">
              <div aria-hidden="true" className="blueprint-grid absolute inset-0 opacity-30" />
              <div
                aria-hidden="true"
                className="from-carbon to-ink absolute inset-0 bg-gradient-to-br opacity-90"
              />
              <Image
                src={brand.markOnDark}
                alt=""
                width={brand.markSize}
                height={brand.markSize}
                className="absolute top-[9%] left-1/2 h-[38%] w-auto -translate-x-1/2"
              />
              <div className="absolute inset-x-0 bottom-0 p-8 lg:p-10">
                <p className="text-overline text-brass">Alcance de Nodo</p>
                <p className="mt-4 text-xl leading-snug font-bold text-white text-balance lg:text-2xl">
                  Anteproyecto, cálculo estructural y proyecto ejecutivo bajo un mismo criterio.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
