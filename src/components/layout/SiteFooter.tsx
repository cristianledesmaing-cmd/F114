import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { InstagramIcon, MailIcon, PinIcon, WhatsappIcon } from "@/components/ui/icons";
import { projects } from "@/data/projects";
import {
  contact,
  emailHref,
  instagramHref,
  navLinks,
  site,
  whatsappHref,
} from "@/data/site";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const highlighted = projects.slice(0, 4);

  return (
    <footer className="bg-ink relative overflow-hidden text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.045]">
        <Image
          src="/brand/isotipo-claro.png"
          alt=""
          width={712}
          height={814}
          className="absolute -right-20 -bottom-32 h-[26rem] w-auto"
        />
      </div>

      <Container width="wide" className="relative">
        <div className="grid gap-12 py-16 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:py-20">
          <div>
            <div className="flex items-center gap-4">
              <Image
                src="/brand/isotipo-claro.png"
                alt=""
                width={712}
                height={814}
                className="h-14 w-auto"
              />
              <div>
                <p className="font-display text-2xl leading-none font-bold text-white">
                  {site.name}
                </p>
                <p className="text-overline text-sand/75 mt-2">{site.tagline}</p>
              </div>
            </div>
            <p className="text-sand/80 mt-6 max-w-xs text-sm leading-relaxed">
              {site.description}
            </p>
            <p className="text-sand/75 mt-6 flex items-center gap-2 text-sm">
              <PinIcon className="h-4 w-4 shrink-0" />
              {site.location.label}
            </p>
          </div>

          <nav aria-label="Secciones del sitio">
            <h2 className="text-overline text-sand/75">Secciones</h2>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sand/85 hover:text-brass text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Proyectos destacados">
            <h2 className="text-overline text-sand/75">Proyectos</h2>
            <ul className="mt-5 space-y-3">
              {highlighted.map((project) => (
                <li key={project.slug}>
                  <Link
                    href={`/proyectos/${project.slug}`}
                    className="text-sand/85 hover:text-brass text-sm transition-colors"
                  >
                    {project.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-overline text-sand/75">Contacto</h2>
            <ul className="mt-5 space-y-4">
              <li>
                <a
                  href={emailHref}
                  className="group text-sand/85 hover:text-brass flex items-start gap-3 text-sm transition-colors"
                >
                  <MailIcon className="mt-0.5 h-4 w-4 shrink-0" />
                  <span className="break-all">{contact.email.address}</span>
                </a>
              </li>
              <li>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-sand/85 hover:text-brass flex items-start gap-3 text-sm transition-colors"
                >
                  <WhatsappIcon className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{contact.whatsapp.display}</span>
                </a>
              </li>
              <li>
                <a
                  href={instagramHref}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-sand/85 hover:text-brass flex items-start gap-3 text-sm transition-colors"
                >
                  <InstagramIcon className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{contact.instagram.handle}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-sand/15 flex flex-col gap-3 border-t py-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sand/75 text-xs">
            © {year} {site.fullName}. Todos los derechos reservados.
          </p>
          <p className="text-sand/75 text-xs">
            {site.claim} · {site.location.label}
          </p>
        </div>
      </Container>
    </footer>
  );
}
