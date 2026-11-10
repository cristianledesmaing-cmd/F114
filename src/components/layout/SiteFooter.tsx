import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { InstagramIcon, MailIcon, PinIcon, WhatsappIcon } from "@/components/ui/icons";
import {
  brand,
  contact,
  emailHref,
  instagramHref,
  contactNavLink,
  navLinks,
  site,
  whatsappHref,
} from "@/data/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-sky/90 relative overflow-hidden text-charcoal">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.08]">
        <Image
          src={brand.markOnLight}
          alt=""
          width={brand.markSize}
          height={brand.markSize}
          className="absolute -right-16 -bottom-24 h-[22rem] w-auto"
        />
      </div>

      <Container width="wide" className="relative">
        <div className="grid gap-12 py-16 lg:grid-cols-[1.5fr_1fr_1.2fr] lg:py-20">
          <div>
            <div>
              <Image
                src={brand.lockupOnLight}
                alt={site.fullName}
                width={brand.lockupWidth}
                height={brand.lockupHeight}
                className="h-11 w-auto"
              />
              <p aria-hidden="true" className="text-overline text-graphite mt-4">
                {site.tagline}
              </p>
            </div>
            <p className="text-graphite mt-6 max-w-xs text-sm leading-relaxed">
              {site.description}
            </p>
            <p className="text-graphite mt-6 flex items-center gap-2 text-sm">
              <PinIcon className="h-4 w-4 shrink-0" />
              {site.location.label}
            </p>
          </div>

          <nav aria-label="Secciones del sitio">
            <h2 className="text-overline text-brass-ink">Secciones</h2>
            <ul className="mt-5 space-y-3">
              {[...navLinks, contactNavLink].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-graphite hover:text-brass-ink text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-overline text-brass-ink">Contacto</h2>
            <ul className="mt-5 space-y-4">
              <li>
                <a
                  href={emailHref}
                  className="group text-graphite hover:text-brass-ink flex items-start gap-3 text-sm transition-colors"
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
                  className="text-graphite hover:text-brass-ink flex items-start gap-3 text-sm transition-colors"
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
                  className="text-graphite hover:text-brass-ink flex items-start gap-3 text-sm transition-colors"
                >
                  <InstagramIcon className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{contact.instagram.handle}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-charcoal/10 flex flex-col gap-3 border-t py-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-stone text-xs">
            © {year} {site.fullName}. Todos los derechos reservados.
          </p>
          <Link href="/#" className="text-stone hover:text-brass-ink text-xs transition-colors">
            Volver arriba
          </Link>
        </div>
      </Container>
    </footer>
  );
}
