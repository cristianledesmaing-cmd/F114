import type { Metadata } from "next";

import { ProjectsShowcase } from "@/components/sections/ProjectsShowcase";
import { getProjectsContent, getPublishedProjects } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Proyectos",
  description:
    "Selección de trabajos de Nodo Ingeniería & Arquitectura por línea de servicio.",
};

export default async function ProjectsPage() {
  const [projects, { serviceLines }] = await Promise.all([
    getPublishedProjects(),
    getProjectsContent(),
  ]);

  return <ProjectsShowcase projects={projects} serviceLines={serviceLines} />;
}
