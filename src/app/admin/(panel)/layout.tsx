import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { logout } from "@/app/admin/actions";
import { isAuthenticated } from "@/lib/auth";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { default: "Panel", template: "%s | Panel Nodo" },
  robots: { index: false, follow: false },
};

const sections = [
  { href: "/admin/", label: "Inicio" },
  { href: "/admin/proyectos/", label: "Proyectos" },
  { href: "/admin/sitio/", label: "Datos del sitio" },
  { href: "/admin/contenido/", label: "Textos e imágenes" },
];

export default async function PanelLayout({ children }: LayoutProps<"/admin">) {
  if (!(await isAuthenticated())) {
    redirect("/admin/login/");
  }

  return (
    <div className="bg-sky min-h-dvh">
      <header className="border-charcoal/10 border-b bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-3 px-6 py-4">
          <Link href="/admin/" className="text-charcoal text-lg font-bold">
            Nodo <span className="text-brass-ink">·</span> Panel
          </Link>

          <nav aria-label="Secciones del panel" className="flex flex-wrap gap-1">
            {sections.map((section) => (
              <Link
                key={section.href}
                href={section.href}
                className="text-graphite hover:text-charcoal hover:bg-charcoal/5 rounded-sm px-3 py-2 text-sm font-semibold transition-colors"
              >
                {section.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="text-graphite hover:text-brass-ink text-sm font-semibold"
            >
              Ver sitio
            </Link>
            <form action={logout}>
              <button
                type="submit"
                className="border-charcoal/20 text-charcoal hover:border-charcoal/50 rounded-md border px-3 py-2 text-sm font-semibold transition-colors"
              >
                Salir
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
    </div>
  );
}
