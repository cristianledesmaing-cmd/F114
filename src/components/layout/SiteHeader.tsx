"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Logo } from "@/components/ui/Logo";
import {
  CloseIcon,
  InstagramIcon,
  MailIcon,
  MenuIcon,
  WhatsappIcon,
} from "@/components/ui/icons";
import { emailHref, instagramHref, navLinks, whatsappHref } from "@/data/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Al cambiar de página el menú desplegable se cierra solo.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const solid = scrolled || menuOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid
          ? "border-charcoal/10 bg-bone/92 border-b shadow-[0_10px_30px_-28px_rgba(32,29,27,0.9)] backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      {/* Misma sangría que el texto del hero; alto = franja cine para centrar el logo */}
      <div className="w-full px-10 sm:px-12 lg:px-16">
        <div
          className={`flex items-center justify-between gap-6 ${
            solid ? "h-18" : "h-20 sm:h-[5.25rem] lg:h-22"
          }`}
        >
          <Logo tone={solid ? "dark" : "light"} />

          <nav aria-label="Navegación principal" className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-sm px-3 py-2 text-sm font-medium transition-colors ${
                  solid
                    ? "text-graphite hover:text-charcoal hover:bg-charcoal/5"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-1 sm:flex">
              <IconLink
                href={emailHref}
                label="Escribirnos por correo"
                solid={solid}
                icon={<MailIcon className="h-[1.15rem] w-[1.15rem]" />}
              />
              <IconLink
                href={instagramHref}
                label="Ver nuestro Instagram"
                solid={solid}
                external
                icon={<InstagramIcon className="h-[1.15rem] w-[1.15rem]" />}
              />
            </div>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer noopener"
              className={`hidden items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all sm:inline-flex ${
                solid
                  ? "bg-charcoal hover:bg-ink text-white"
                  : "bg-white/12 text-white ring-1 ring-white/30 backdrop-blur-sm hover:bg-white/20"
              }`}
            >
              <WhatsappIcon className="h-4 w-4" />
              WhatsApp
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="menu-movil"
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              className={`inline-flex h-10 w-10 items-center justify-center rounded-sm transition-colors lg:hidden ${
                solid
                  ? "text-charcoal hover:bg-charcoal/5"
                  : "text-white hover:bg-white/10"
              }`}
            >
              {menuOpen ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <div
        id="menu-movil"
        hidden={!menuOpen}
        className="border-charcoal/10 bg-bone max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-t lg:hidden"
      >
        <div className="w-full px-10 sm:px-12 lg:px-16">
          <nav aria-label="Navegación principal (móvil)" className="flex flex-col py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="border-charcoal/8 text-charcoal hover:text-brass-ink border-b py-3.5 text-lg font-medium last:border-b-0"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-wrap gap-2 pb-6">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer noopener"
              className="bg-charcoal hover:bg-ink inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-white"
            >
              <WhatsappIcon className="h-4 w-4" />
              WhatsApp
            </a>
            <a
              href={emailHref}
              className="border-charcoal/20 text-charcoal hover:border-charcoal/50 inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold"
            >
              <MailIcon className="h-4 w-4" />
              Correo
            </a>
            <a
              href={instagramHref}
              target="_blank"
              rel="noreferrer noopener"
              className="border-charcoal/20 text-charcoal hover:border-charcoal/50 inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold"
            >
              <InstagramIcon className="h-4 w-4" />
              Instagram
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

type IconLinkProps = {
  href: string;
  label: string;
  icon: React.ReactNode;
  solid: boolean;
  external?: boolean;
};

function IconLink({ href, label, icon, solid, external }: IconLinkProps) {
  return (
    <a
      href={href}
      aria-label={label}
      title={label}
      {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      className={`inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
        solid ? "text-graphite hover:bg-charcoal/5 hover:text-charcoal" : "text-white/80 hover:bg-white/10 hover:text-white"
      }`}
    >
      {icon}
    </a>
  );
}
