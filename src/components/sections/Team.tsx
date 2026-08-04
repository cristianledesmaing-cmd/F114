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
          overline="Equipo"
          title="Tres disciplinas complementarias"
          description="La conformación del estudio nos permite cubrir el diseño, la ejecución y el cálculo sin depender de terceros, y responder con una sola voz técnica frente al comitente."
        />

        <div className="mt-16 grid gap-10 lg:mt-20 lg:grid-cols-3 lg:gap-8">
          {team.map((member, index) => (
            <Reveal
              key={member.role}
              delay={index * 110}
              className="flex flex-col border-t border-white/15 pt-8"
            >
              <p className="text-overline text-brass">{member.role}</p>
              <h3 className="mt-4 text-2xl font-bold text-white">{member.title}</h3>
              <p className="text-sand/75 mt-4 leading-relaxed text-justify">{member.description}</p>

              <ul className="mt-7 space-y-2.5">
                {member.focus.map((item) => (
                  <li key={item} className="text-sand/90 flex items-center gap-3 text-sm">
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
