import Image from "next/image";
import type { ReactNode } from "react";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import {
  ArrowIcon,
  ClockIcon,
  InstagramIcon,
  MailIcon,
  PinIcon,
  WhatsappIcon,
} from "@/components/ui/icons";
import { brand, contact, emailHref, instagramHref, site, whatsappHref } from "@/data/site";

type Channel = {
  label: string;
  value: string;
  helper: string;
  href: string;
  icon: ReactNode;
  external?: boolean;
};

const channels: Channel[] = [
  {
    label: "Correo",
    value: contact.email.address,
    helper: "Para consultas detalladas, documentación y pedidos de presupuesto.",
    href: emailHref,
    icon: <MailIcon className="h-5 w-5" />,
  },
  {
    label: "WhatsApp",
    value: contact.whatsapp.display,
    helper: "La vía más rápida para una primera consulta o coordinar una visita.",
    href: whatsappHref,
    icon: <WhatsappIcon className="h-5 w-5" />,
    external: true,
  },
  {
    label: "Instagram",
    value: contact.instagram.handle,
    helper: "Avances de obra, renders y proyectos publicados de Nodo.",
    href: instagramHref,
    icon: <InstagramIcon className="h-5 w-5" />,
    external: true,
  },
];

export function ContactSection() {
  return (
    <section id="contacto" className="bg-ink relative scroll-mt-24 overflow-hidden py-24 text-white lg:py-32">
      <div aria-hidden="true" className="blueprint-grid absolute inset-0 opacity-25" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <Image
          src={brand.markOnDark}
          alt=""
          width={brand.markSize}
          height={brand.markSize}
          className="absolute -bottom-28 -left-20 h-[28rem] w-auto opacity-[0.06]"
        />
      </div>

      <Container width="wide" className="relative">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <Reveal>
            <p className="text-overline text-brass flex items-center gap-3">
              <span aria-hidden="true" className="bg-brass/60 inline-block h-px w-8" />
              Contacto
            </p>
            <h2 className="mt-5 text-3xl leading-[1.1] font-bold text-justify sm:text-4xl lg:text-[2.75rem]">
              Contanos qué necesitás y te respondemos con una propuesta concreta.
            </h2>
            <p className="text-sand/80 mt-6 text-lg leading-relaxed text-justify">
              Ya sea una vivienda, una ampliación o una nave industrial, la primera conversación
              sirve para definir el alcance, los plazos y una estimación de honorarios.
            </p>

            <dl className="mt-10 space-y-4">
              <div className="text-sand/75 flex items-center gap-3 text-sm">
                <dt className="sr-only">Ubicación</dt>
                <PinIcon className="h-4 w-4 shrink-0" />
                <dd>{site.location.label}</dd>
              </div>
              <div className="text-sand/75 flex items-center gap-3 text-sm">
                <dt className="sr-only">Horario de atención</dt>
                <ClockIcon className="h-4 w-4 shrink-0" />
                <dd>{contact.schedule}</dd>
              </div>
            </dl>
          </Reveal>

          <div className="space-y-4">
            {channels.map((channel, index) => (
              <Reveal key={channel.label} delay={index * 110}>
                <a
                  href={channel.href}
                  {...(channel.external
                    ? { target: "_blank", rel: "noreferrer noopener" }
                    : {})}
                  className="group flex items-start gap-5 border border-white/12 bg-white/[0.02] p-6 transition-all duration-400 hover:border-white/30 hover:bg-white/[0.06] sm:p-7"
                >
                  <span className="text-brass border-brass/30 group-hover:border-brass/70 mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-colors">
                    {channel.icon}
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="text-overline text-sand/75 block">{channel.label}</span>
                    <span className="mt-2 block text-lg font-bold break-words text-white">
                      {channel.value}
                    </span>
                    <span className="text-sand/75 mt-2 block text-sm leading-relaxed">
                      {channel.helper}
                    </span>
                  </span>

                  <ArrowIcon className="text-sand/75 mt-1 h-5 w-5 shrink-0 transition-all duration-400 group-hover:translate-x-1 group-hover:text-white" />
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
