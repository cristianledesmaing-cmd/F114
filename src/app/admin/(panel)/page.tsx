import Link from "next/link";

import { getProjectsContent, getSiteContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata = { title: "Panel" };

export default async function AdminHomePage() {
  const [site, { projects }] = await Promise.all([getSiteContent(), getProjectsContent()]);
  const published = projects.filter((project) => project.published);

  const shortcuts = [
    {
      href: "/admin/proyectos/",
      title: "Proyectos",
      description: `${published.length} visibles de ${projects.length}. Publicá, ocultá, editá o cargá uno nuevo.`,
    },
    {
      href: "/admin/contenido/",
      title: "Textos e imágenes",
      description:
        "Portada, fotos de fondo, servicios, cómo trabajamos, equipo y sección de contacto.",
    },
    {
      href: "/admin/sitio/",
      title: "Datos del sitio",
      description: "Nombre, slogan, descripción, ubicación, WhatsApp, correo e Instagram.",
    },
  ];

  return (
    <div>
      <h1 className="text-charcoal text-3xl font-bold">Hola de nuevo</h1>
      <p className="text-graphite mt-2 text-base">
        Desde acá administrás todo el contenido de {site.name}. Los cambios se ven en el sitio
        apenas guardás.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {shortcuts.map((shortcut) => (
          <Link
            key={shortcut.href}
            href={shortcut.href}
            className="border-charcoal/10 hover:border-brass/60 border bg-white p-6 transition-colors"
          >
            <h2 className="text-charcoal text-xl font-bold">{shortcut.title}</h2>
            <p className="text-graphite mt-2 text-base">{shortcut.description}</p>
          </Link>
        ))}
      </div>

      {projects.length - published.length > 0 ? (
        <p className="text-graphite border-charcoal/10 mt-8 border bg-white p-5 text-base">
          Hay {projects.length - published.length} proyecto(s) ocultos del sitio público.{" "}
          <Link href="/admin/proyectos/" className="text-brass-ink font-semibold">
            Revisarlos
          </Link>
        </p>
      ) : null}
    </div>
  );
}
