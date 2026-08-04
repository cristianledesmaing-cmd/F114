import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/data/services";

export function Services() {
  return (
    <section id="servicios" className="bg-carbon scroll-mt-24 py-24 text-white lg:py-32">
      <Container width="wide">
        <SectionHeading
          tone="light"
          overline="Servicios"
          title="Tres etapas, un mismo interlocutor"
          description="Podés contratarlas por separado o encarar el recorrido completo. En cualquiera de los casos, la información técnica que producimos en una etapa alimenta a la siguiente."
        />

        <div className="mt-16 grid gap-px lg:mt-20 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal
              key={service.id}
              delay={index * 110}
              className="group bg-carbon relative flex flex-col p-8 ring-1 ring-white/10 transition-colors duration-500 hover:bg-white/[0.03] lg:p-10"
            >
              <span
                aria-hidden="true"
                className="font-display text-brass/70 group-hover:text-brass text-5xl font-bold transition-colors duration-500 lg:text-6xl"
              >
                {service.number}
              </span>

              <h3 className="mt-8 text-2xl font-bold text-white lg:text-[1.75rem]">
                {service.title}
              </h3>
              <p className="text-sand/75 mt-4 leading-relaxed text-justify">{service.summary}</p>

              <ul className="mt-8 space-y-3 border-t border-white/10 pt-8">
                {service.items.map((item) => (
                  <li key={item} className="text-sand/90 flex gap-3 text-sm leading-relaxed">
                    <span
                      aria-hidden="true"
                      className="bg-brass mt-2 h-1 w-3.5 shrink-0 rounded-full"
                    />
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
