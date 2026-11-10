import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { processSteps } from "@/data/services";

export function Process() {
  return (
    <section id="como-trabajamos" className="bg-bone/45 scroll-mt-24 py-20 lg:py-28">
      <Container width="wide">
        <Reveal>
          <p className="text-overline text-brass-ink flex items-center gap-3 text-[1.05rem]">
            <span aria-hidden="true" className="bg-brass/60 inline-block h-px w-8" />
            Cómo trabajamos
          </p>
          <h2 className="text-charcoal mt-4 max-w-3xl text-4xl leading-[1.08] font-bold text-balance sm:text-5xl lg:text-[3.25rem]">
            De la primera
            <br className="hidden sm:block" /> charla al próximo paso.
          </h2>
        </Reveal>

        <ol className="mt-12 grid gap-px sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {processSteps.map((step, index) => (
            <Reveal
              as="li"
              key={step.number}
              delay={index * 100}
              className="border-charcoal/10 relative border-t p-7 sm:p-9 lg:border-t-0 lg:border-l lg:p-11 lg:first:border-l-0"
            >
              <span className="text-overline text-brass-ink text-[1rem]">
                {step.number}
              </span>
              <h3 className="text-charcoal mt-6 text-[2rem] font-bold lg:text-[2.15rem]">
                {step.title}
              </h3>
              <p className="text-graphite mt-4 text-xl leading-relaxed text-pretty">{step.text}</p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
