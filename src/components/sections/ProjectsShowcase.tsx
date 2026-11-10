"use client";

import { useMemo, useState } from "react";

import { ProjectCard } from "@/components/ProjectCard";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects, serviceLines, type ServiceLine } from "@/data/projects";

type Filter = ServiceLine | "Todos";

const filters: Filter[] = ["Todos", ...serviceLines];

export function ProjectsShowcase() {
  const [active, setActive] = useState<Filter>("Todos");

  const counts = useMemo(() => {
    const result: Record<Filter, number> = { Todos: projects.length } as Record<Filter, number>;
    for (const line of serviceLines) {
      result[line] = projects.filter((project) => project.serviceLines.includes(line)).length;
    }
    return result;
  }, []);

  const visible = useMemo(
    () =>
      active === "Todos"
        ? projects
        : projects.filter((project) => project.serviceLines.includes(active)),
    [active],
  );

  return (
    <section id="proyectos" className="bg-bone/85 scroll-mt-24 pt-28 pb-24 lg:pt-32 lg:pb-32">
      <Container width="wide">
        <SectionHeading
          overline="Proyectos"
          title="Obras y desarrollos de Nodo"
          description="Una selección de trabajos. Cada ficha detalla el alcance, el sistema constructivo y la documentación producida."
        />

        <Reveal
          className="border-charcoal/10 mt-12 flex flex-wrap items-center gap-2 border-y py-4"
          delay={80}
        >
          <span className="text-overline text-stone mr-2 hidden sm:inline">Filtrar por</span>
          <div role="group" aria-label="Filtrar proyectos por servicio" className="flex flex-wrap gap-2">
            {filters.map((filter) => {
              const isActive = filter === active;
              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActive(filter)}
                  aria-pressed={isActive}
                  className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-brass text-white"
                      : "border-charcoal/15 text-graphite hover:border-charcoal/40 hover:text-charcoal border"
                  }`}
                >
                  {filter}
                  <span
                    className={`text-xs tabular-nums ${isActive ? "text-white/80" : "text-stone"}`}
                  >
                    {counts[filter]}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {visible.length > 0 ? (
          <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
            {visible.map((project, index) => (
              <ProjectCard key={project.slug} project={project} priority={index < 3} />
            ))}
          </div>
        ) : (
          <p className="text-graphite mt-16 text-center">
            Todavía no hay proyectos publicados en esta categoría.
          </p>
        )}

        <p className="text-stone border-charcoal/10 mt-16 border-t pt-8 text-sm">
          Las imágenes de esta sección son de relleno mientras se carga el material definitivo de
          cada obra.
        </p>
      </Container>
    </section>
  );
}
