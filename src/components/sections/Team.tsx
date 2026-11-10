import Image from "next/image";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { team } from "@/data/services";

export function Team() {
  return (
    <section id="equipo" className="bg-sky/50 relative scroll-mt-24 py-20 text-charcoal lg:py-28">
      <Container width="wide">
        <SectionHeading
          align="center"
          overline="El equipo"
          title="Somos Nodo."
          description="Somos un equipo de tres. En Nodo combinamos ingeniería y diseño arquitectónico para pensar, desde el primer plano, cómo se va a construir cada proyecto."
        />

        <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-3 lg:gap-10">
          {team.map((member, index) => (
            <Reveal
              key={member.name}
              delay={index * 110}
              className="border-charcoal/15 flex flex-col items-center border-t pt-10 text-center"
            >
              <div className="bg-sky relative mb-7 aspect-square w-full max-w-[16rem] overflow-hidden rounded-full ring-1 ring-charcoal/25">
                {member.photo ? (
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    sizes="256px"
                    className="object-cover object-top"
                  />
                ) : (
                  <div
                    aria-hidden="true"
                    className="border-charcoal/15 absolute inset-0 flex items-center justify-center border border-dashed"
                  >
                    <span className="text-overline text-stone">Foto pendiente</span>
                  </div>
                )}
              </div>

              <h3 className="text-3xl font-bold sm:text-[2rem]">{member.name}</h3>
              <p className="text-graphite mt-3 text-base leading-relaxed sm:text-lg">{member.role}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
