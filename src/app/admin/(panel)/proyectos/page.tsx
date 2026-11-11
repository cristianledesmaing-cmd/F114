import Image from "next/image";
import Link from "next/link";

import { deleteProject, toggleProjectPublished } from "@/app/admin/projects-actions";
import { getProjectsContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata = { title: "Proyectos" };

export default async function AdminProjectsPage() {
  const { projects } = await getProjectsContent();
  const publishedCount = projects.filter((project) => project.published).length;

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-charcoal text-3xl font-bold">Proyectos</h1>
          <p className="text-graphite mt-2 text-base">
            {projects.length} en total · {publishedCount} visibles en el sitio
          </p>
        </div>
        <Link
          href="/admin/proyectos/nuevo/"
          className="bg-brass hover:bg-brass-ink rounded-md px-5 py-2.5 text-base font-semibold text-white transition-colors"
        >
          Nuevo proyecto
        </Link>
      </div>

      <ul className="mt-8 grid gap-px">
        {projects.map((project) => (
          <li
            key={project.slug}
            className="border-charcoal/10 flex flex-wrap items-center gap-4 border bg-white p-4"
          >
            <div className="bg-sky relative h-16 w-20 shrink-0 overflow-hidden">
              {project.cover ? (
                <Image
                  src={project.cover}
                  alt=""
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              ) : null}
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-charcoal truncate text-lg font-bold">{project.title}</p>
              <p className="text-stone truncate text-sm">
                /proyectos/{project.slug} · {project.year}
              </p>
            </div>

            <span
              className={`rounded-md px-3 py-1 text-xs font-semibold ${
                project.published
                  ? "bg-brass/15 text-brass-ink"
                  : "bg-charcoal/10 text-graphite"
              }`}
            >
              {project.published ? "Visible" : "Oculto"}
            </span>

            <div className="flex items-center gap-2">
              <Link
                href={`/admin/proyectos/${project.slug}/`}
                className="border-charcoal/20 text-charcoal hover:border-charcoal/50 rounded-md border px-3 py-2 text-sm font-semibold transition-colors"
              >
                Editar
              </Link>

              <form action={toggleProjectPublished}>
                <input type="hidden" name="slug" value={project.slug} />
                <button
                  type="submit"
                  className="border-charcoal/20 text-charcoal hover:border-charcoal/50 rounded-md border px-3 py-2 text-sm font-semibold transition-colors"
                >
                  {project.published ? "Ocultar" : "Publicar"}
                </button>
              </form>

              <form action={deleteProject}>
                <input type="hidden" name="slug" value={project.slug} />
                <button
                  type="submit"
                  className="text-graphite hover:text-brass-ink rounded-md px-3 py-2 text-sm font-semibold transition-colors"
                >
                  Eliminar
                </button>
              </form>
            </div>
          </li>
        ))}
      </ul>

      {projects.length === 0 ? (
        <p className="text-graphite border-charcoal/10 mt-8 border bg-white p-6 text-base">
          Todavía no hay proyectos cargados.
        </p>
      ) : null}
    </div>
  );
}
