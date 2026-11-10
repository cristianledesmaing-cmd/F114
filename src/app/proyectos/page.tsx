import type { Metadata } from "next";

import { ProjectsShowcase } from "@/components/sections/ProjectsShowcase";

export const metadata: Metadata = {
  title: "Proyectos",
  description:
    "Selección de trabajos de Nodo Ingeniería & Arquitectura por línea de servicio.",
};

export default function ProjectsPage() {
  return <ProjectsShowcase />;
}
