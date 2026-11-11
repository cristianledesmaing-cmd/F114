import { ProjectForm } from "@/app/admin/_components/ProjectForm";
import { getProjectsContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata = { title: "Nuevo proyecto" };

export default async function NewProjectPage() {
  const { serviceLines } = await getProjectsContent();

  return <ProjectForm serviceLines={serviceLines} />;
}
