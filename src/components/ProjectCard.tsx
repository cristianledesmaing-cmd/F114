import Image from "next/image";
import Link from "next/link";

import { ArrowIcon } from "@/components/ui/icons";
import type { Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
  priority?: boolean;
};

export function ProjectCard({ project, priority = false }: ProjectCardProps) {
  return (
    <article className="group flex flex-col">
      <Link href={`/proyectos/${project.slug}`} className="block focus-visible:outline-offset-6">
        <div className="bg-charcoal relative aspect-[4/3] overflow-hidden">
          <Image
            src={project.cover}
            alt={project.coverAlt}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />

          <div
            aria-hidden="true"
            className="from-ink/85 absolute inset-0 bg-gradient-to-t via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />

          <div className="absolute inset-x-0 bottom-0 translate-y-3 p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-white">
              Ver proyecto
              <ArrowIcon className="h-4 w-4" />
            </span>
          </div>
        </div>

        <div className="mt-5 flex items-start justify-between gap-6">
          <div className="min-w-0">
            <h3 className="text-charcoal group-hover:text-brass-ink text-lg font-bold text-balance transition-colors">
              {project.title}
            </h3>
            <p className="text-graphite mt-1.5 text-sm">
              {project.typology} · {project.location}
            </p>
          </div>
          <span className="text-stone shrink-0 pt-1 text-sm font-medium tabular-nums">
            {project.year}
          </span>
        </div>
      </Link>

      <ul className="mt-4 flex flex-wrap gap-2">
        {project.serviceLines.map((line) => (
          <li
            key={line}
            className="border-charcoal/15 text-graphite rounded-full border px-3 py-1 text-xs font-medium"
          >
            {line}
          </li>
        ))}
      </ul>
    </article>
  );
}
