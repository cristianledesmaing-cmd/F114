import { notFound } from "next/navigation";

import { ProjectForm } from "@/app/admin/_components/ProjectForm";
import { getProjectsContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps<"/admin/proyectos/[slug]">) {
  const { slug } = await params;
  const { projects } = await getProjectsContent();
  const project = projects.find((item) => item.slug === slug);

  return { title: project?.title ?? "Proyecto" };
}

export default async function EditProjectPage({
  params,
  searchParams,
}: PageProps<"/admin/proyectos/[slug]">) {
  const { slug } = await params;
  const { guardado } = await searchParams;

  const { projects, serviceLines } = await getProjectsContent();
  const project = projects.find((item) => item.slug === slug);

  if (!project) notFound();

  return (
    <ProjectForm
      key={project.slug}
      project={project}
      serviceLines={serviceLines}
      saved={guardado === "1"}
    />
  );
}
