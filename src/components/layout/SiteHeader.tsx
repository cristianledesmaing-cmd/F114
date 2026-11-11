"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Logo } from "@/components/ui/Logo";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";
import { contactNavLink, navLinks } from "@/data/site";

export function SiteHeader({ fullName, tagline }: { fullName: string; tagline: string }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
          ? "border-charcoal/10 bg-bone/88 border-b shadow-[0_10px_30px_-28px_rgba(32,29,27,0.25)] backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="w-full px-10 sm:px-12 lg:px-16">
        <div
          className={`flex items-center justify-between gap-6 ${
            solid ? "h-18" : "h-20 sm:h-[5.25rem] lg:h-22"
          }`}
        >
          <Logo tone="dark" fullName={fullName} tagline={tagline} />

          <nav aria-label="Navegación principal" className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-graphite hover:text-charcoal hover:bg-charcoal/5 rounded-sm px-3.5 py-2.5 text-lg font-semibold transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href={contactNavLink.href}
              className="bg-brass hover:bg-brass-ink hidden items-center rounded-md px-5 py-2.5 text-lg font-semibold text-white transition-all sm:inline-flex"
            >
              {contactNavLink.label}
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="menu-movil"
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              className="text-charcoal hover:bg-charcoal/5 inline-flex h-10 w-10 items-center justify-center rounded-sm transition-colors lg:hidden"
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
                className="border-charcoal/8 text-charcoal hover:text-brass-ink border-b py-3.5 text-xl font-semibold last:border-b-0"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="pb-6">
            <Link
              href={contactNavLink.href}
              onClick={() => setMenuOpen(false)}
              className="bg-brass hover:bg-brass-ink inline-flex items-center rounded-md px-5 py-2.5 text-base font-semibold text-white"
            >
              {contactNavLink.label}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
