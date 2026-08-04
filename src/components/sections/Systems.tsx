import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { constructionSystems, processSteps } from "@/data/services";

export function Systems() {
  return (
    <section id="sistemas" className="bg-bone scroll-mt-24 pb-24 lg:pb-32">
      <Container width="wide">
        <SectionHeading
          overline="Sistemas constructivos"
          title="Calculamos y documentamos en todos los sistemas"
          description="No condicionamos el proyecto a un único material. Elegimos el sistema en función del uso, el plazo y el presupuesto, y lo resolvemos técnicamente hasta el detalle."
        />

        <div className="border-charcoal/10 mt-14 grid gap-px overflow-hidden border sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {constructionSystems.map((system, index) => (
            <Reveal
              key={system.name}
              delay={(index % 3) * 90}
              className="bg-bone hover:bg-charcoal group p-8 shadow-[0_0_0_1px_rgba(58,54,51,0.1)] transition-colors duration-500 lg:p-9"
            >
              <h3 className="text-charcoal text-lg font-bold transition-colors duration-500 group-hover:text-white">
                {system.name}
              </h3>
              <p className="text-graphite group-hover:text-sand/85 mt-3 text-sm leading-relaxed text-justify transition-colors duration-500">
                {system.description}
              </p>
            </Reveal>
          ))}
        </div>

        <div className="mt-24 lg:mt-32">
          <SectionHeading
            overline="Cómo trabajamos"
            title="Un proceso ordenado, de la consulta a la obra"
          />

          <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-8">
            {processSteps.map((step, index) => (
              <Reveal
                as="li"
                key={step.number}
                delay={index * 100}
                className="border-charcoal/15 relative border-t pt-6"
              >
                <span
                  aria-hidden="true"
                  className="bg-brass absolute -top-[3px] left-0 block h-[5px] w-12"
                />
                <span className="font-display text-stone text-sm font-bold tracking-[0.2em]">
                  {step.number}
                </span>
                <h3 className="text-charcoal mt-4 text-xl font-bold">{step.title}</h3>
                <p className="text-graphite mt-3 leading-relaxed text-justify">{step.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
