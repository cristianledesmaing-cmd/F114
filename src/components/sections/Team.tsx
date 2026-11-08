import Image from "next/image";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { team } from "@/data/services";

export function Team() {
  return (
    <section id="equipo" className="bg-carbon scroll-mt-24 py-24 text-white lg:py-32">
      <Container width="wide">
        <SectionHeading
          tone="light"
          align="center"
          overline="Equipo"
          title="Tres disciplinas complementarias"
          description="Obra, dirección de proyectos y cálculo estructural conviven en Nodo. Cubrimos la ejecución y la ingeniería sin depender de terceros, y respondemos con una sola voz técnica."
        />

        <div className="mt-16 grid gap-12 lg:mt-20 lg:grid-cols-3 lg:gap-8">
          {team.map((member, index) => (
            <Reveal
              key={member.title}
              delay={index * 110}
              className="flex flex-col items-center border-t border-white/15 pt-8 text-center"
            >
              <div className="bg-ink/40 relative mb-6 aspect-square w-full max-w-[14rem] overflow-hidden">
                {member.photo ? (
                  <Image
                    src={member.photo}
                    alt={member.role}
                    fill
                    sizes="224px"
                    className="object-cover object-top"
                  />
                ) : (
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 flex items-center justify-center border border-dashed border-white/15"
                  >
                    <span className="text-overline text-sand/40">Foto pendiente</span>
                  </div>
                )}
              </div>

              <p className="text-overline text-brass">{member.role}</p>
              <h3 className="mt-4 text-2xl font-bold text-white">{member.title}</h3>
              <p className="text-sand/75 mt-4 max-w-sm leading-relaxed text-pretty">
                {member.description}
              </p>

              <ul className="mt-7 flex w-full max-w-sm flex-col items-center gap-2.5">
                {member.focus.map((item) => (
                  <li
                    key={item}
                    className="text-sand/90 flex items-center justify-center gap-3 text-sm"
                  >
                    <span aria-hidden="true" className="bg-brass/70 h-px w-5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
