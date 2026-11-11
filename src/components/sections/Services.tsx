import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowIcon, WhatsappIcon } from "@/components/ui/icons";
import { buildWhatsappHref, type HomeContent, type SiteContent } from "@/lib/content-types";

export function Services({
  section,
  services,
  site,
}: {
  section: HomeContent["servicesSection"];
  services: HomeContent["services"];
  site: SiteContent;
}) {
  return (
    <section
      id="servicios"
      className="bg-sky/50 relative scroll-mt-24 overflow-hidden py-20 text-charcoal lg:py-28"
    >
      <Container width="wide" className="relative z-10">
        <Reveal>
          <p className="text-overline text-brass-ink flex items-center gap-3 text-[1.05rem]">
            <span aria-hidden="true" className="bg-brass/60 inline-block h-px w-8" />
            {section.overline}
          </p>
          <h2 className="mt-4 max-w-3xl text-4xl leading-[1.08] font-bold text-balance sm:text-5xl lg:text-[3.25rem]">
            {section.title}
          </h2>
          <p className="text-graphite mt-5 max-w-3xl text-lg leading-relaxed text-pretty sm:text-xl">
            {section.description}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-px lg:mt-16 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal
              key={service.id}
              delay={index * 110}
              className="group border-charcoal/10 relative flex flex-col bg-white/70 p-7 ring-1 ring-black/5 transition-colors duration-500 hover:bg-white sm:p-9 lg:p-11"
            >
              <span className="text-overline text-brass-ink text-[1rem]">{service.label}</span>

              <h3 className="mt-6 text-[2rem] font-bold lg:text-[2.15rem]">{service.title}</h3>
              <p className="text-graphite mt-4 text-xl leading-relaxed text-pretty">
                {service.summary}
              </p>

              <ul className="border-charcoal/10 mt-8 space-y-4 border-t pt-8">
                {service.items.map((item) => (
                  <li key={item} className="text-charcoal/90 flex gap-3 text-lg leading-relaxed">
                    <span
                      aria-hidden="true"
                      className="bg-brass mt-2.5 h-1.5 w-4 shrink-0 rounded-full"
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <a
                href={buildWhatsappHref(site.contact.whatsapp.number, service.whatsappMessage)}
                target="_blank"
                rel="noreferrer noopener"
                className="text-brass-ink hover:text-brass mt-auto inline-flex items-center gap-2.5 pt-8 text-lg font-semibold transition-colors"
              >
                <WhatsappIcon className="h-5 w-5" />
                {service.cta}
                <ArrowIcon className="h-4 w-4" />
              </a>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
