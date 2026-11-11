"use client";

import Image from "next/image";
import { useMemo, useState, type FormEvent } from "react";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsappIcon } from "@/components/ui/icons";
import { brand } from "@/data/site";
import { buildWhatsappHref, type HomeContent, type SiteContent } from "@/lib/content-types";

export function ContactSection({
  section,
  services,
  site,
}: {
  section: HomeContent["contactSection"];
  services: HomeContent["services"];
  site: SiteContent;
}) {
  const inquiryOptions = useMemo(
    () => [
      ...services.map((service) => ({
        id: service.id,
        label: service.title,
        message: service.whatsappMessage,
      })),
      {
        id: "asesoramiento",
        label: section.advisoryLabel,
        message: section.advisoryMessage,
      },
    ],
    [services, section.advisoryLabel, section.advisoryMessage],
  );

  const [serviceId, setServiceId] = useState(inquiryOptions[0]?.id ?? "");
  const [location, setLocation] = useState("");
  const [details, setDetails] = useState("");

  const selectedOption =
    inquiryOptions.find((option) => option.id === serviceId) ?? inquiryOptions[0];

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const lines = [selectedOption?.message ?? site.contact.whatsapp.message];

    if (location.trim()) {
      lines.push(`Localidad o barrio: ${location.trim()}`);
    }

    if (details.trim()) {
      lines.push(details.trim());
    }

    window.open(
      buildWhatsappHref(site.contact.whatsapp.number, lines.join("\n\n")),
      "_blank",
      "noopener,noreferrer",
    );
  }

  return (
    <section
      id="contacto"
      className="bg-sky-mid/50 relative scroll-mt-24 overflow-hidden py-20 text-charcoal lg:py-28"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <Image
          src={brand.markOnLight}
          alt=""
          width={brand.markSize}
          height={brand.markSize}
          className="absolute -bottom-20 -left-16 h-[20rem] w-auto opacity-[0.28]"
        />
      </div>

      <Container width="wide" className="relative">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <Reveal>
            <p className="text-overline text-brass-ink flex items-center gap-3 text-[1.05rem]">
              <span aria-hidden="true" className="bg-brass/60 inline-block h-px w-8" />
              {section.overline}
            </p>
            <h2 className="mt-4 text-4xl leading-[1.08] font-bold text-balance sm:text-5xl lg:text-[3.25rem]">
              {section.title}
            </h2>
            <p className="text-graphite mt-5 text-lg leading-relaxed text-pretty sm:text-xl">
              {section.description}
            </p>

            <dl className="mt-8 space-y-3.5">
              <div>
                <dt className="sr-only">Correo</dt>
                <dd>
                  <a
                    href={`mailto:${site.contact.email.address}`}
                    className="text-graphite hover:text-brass-ink text-base transition-colors sm:text-lg"
                  >
                    {site.contact.email.address}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="sr-only">WhatsApp</dt>
                <dd>
                  <a
                    href={buildWhatsappHref(
                      site.contact.whatsapp.number,
                      site.contact.whatsapp.message,
                    )}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-graphite hover:text-brass-ink text-base transition-colors sm:text-lg"
                  >
                    {site.contact.whatsapp.display}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="sr-only">Ubicación</dt>
                <dd className="text-stone text-base">{site.location.label}</dd>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={120}>
            <form
              onSubmit={handleSubmit}
              className="border-charcoal/10 border bg-white/80 p-7 shadow-[0_18px_40px_-28px_rgba(32,29,27,0.2)] sm:p-9"
            >
              <label className="block">
                <span className="text-overline text-graphite text-[0.8rem]">¿Qué necesitás?</span>
                <select
                  value={serviceId}
                  onChange={(event) => setServiceId(event.target.value)}
                  className="border-charcoal/15 text-charcoal mt-3 w-full rounded-none border bg-white px-4 py-3.5 text-base outline-none focus:ring-2 focus:ring-brass/40"
                >
                  {inquiryOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="mt-6 block">
                <span className="text-overline text-graphite flex items-baseline justify-between gap-3 text-[0.8rem]">
                  Localidad o barrio
                  <span className="text-stone normal-case tracking-normal">Opcional</span>
                </span>
                <input
                  type="text"
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                  placeholder="Ej. Resistencia, Chaco"
                  className="border-charcoal/15 text-charcoal placeholder:text-stone mt-3 w-full rounded-none border bg-white px-4 py-3.5 text-base outline-none focus:ring-2 focus:ring-brass/40"
                />
              </label>

              <label className="mt-6 block">
                <span className="text-overline text-graphite flex items-baseline justify-between gap-3 text-[0.8rem]">
                  ¿En qué te podemos ayudar?
                  <span className="text-stone normal-case tracking-normal">Opcional</span>
                </span>
                <textarea
                  value={details}
                  onChange={(event) => setDetails(event.target.value)}
                  placeholder="Ej. Tengo los planos y estoy por empezar la obra."
                  rows={4}
                  className="border-charcoal/15 text-charcoal placeholder:text-stone mt-3 w-full resize-y rounded-none border bg-white px-4 py-3.5 text-base outline-none focus:ring-2 focus:ring-brass/40"
                />
              </label>

              <button
                type="submit"
                className="bg-brass hover:bg-brass-ink mt-8 inline-flex w-full items-center justify-center gap-2.5 rounded-md px-5 py-3.5 text-base font-semibold text-white transition-colors sm:w-auto"
              >
                <WhatsappIcon className="h-5 w-5" />
                Abrir WhatsApp
              </button>

              <p className="text-stone mt-4 text-base leading-relaxed">
                Vas a poder revisar el mensaje en WhatsApp antes de enviarlo.
              </p>
            </form>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
