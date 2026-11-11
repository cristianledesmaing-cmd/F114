"use server";

import { redirect } from "next/navigation";

import { requireAdmin } from "@/lib/auth";
import { getProjectsContent, saveProjectsContent } from "@/lib/content";
import type { GalleryImage, Project } from "@/lib/content-types";
import { flag, lines, number, paragraphs, slugify, text } from "@/lib/form-data";
import { saveUpload } from "@/lib/uploads";

export type ProjectFormState = { error?: string; message?: string };

/**
 * Reconstruye la galería: conserva las imágenes no marcadas para borrar,
 * actualiza sus textos y agrega las que se hayan subido en este envío.
 */
async function buildGallery(formData: FormData): Promise<GalleryImage[] | { error: string }> {
  const gallery: GalleryImage[] = [];
  const count = number(formData, "galleryCount", 0);

  for (let index = 0; index < count; index += 1) {
    if (flag(formData, `gallery-${index}-remove`)) continue;

    const src = text(formData, `gallery-${index}-src`);
    if (!src) continue;

    gallery.push({
      src,
      alt: text(formData, `gallery-${index}-alt`),
      caption: text(formData, `gallery-${index}-caption`),
    });
  }

  for (const file of formData.getAll("galleryFiles")) {
    const uploaded = await saveUpload(file);
    if (!uploaded) continue;
    if ("error" in uploaded) return { error: uploaded.error };

    gallery.push({ src: uploaded.src, alt: "", caption: "" });
  }

  return gallery;
}

export async function saveProject(
  _state: ProjectFormState,
  formData: FormData,
): Promise<ProjectFormState> {
  await requireAdmin();

  const content = await getProjectsContent();
  const originalSlug = text(formData, "originalSlug");
  const existing = content.projects.find((project) => project.slug === originalSlug);

  const title = text(formData, "title");
  if (!title) return { error: "El título es obligatorio." };

  const slug = slugify(text(formData, "slug") || title);
  if (!slug) return { error: "No se pudo generar una dirección válida a partir del título." };

  const slugTaken = content.projects.some(
    (project) => project.slug === slug && project.slug !== originalSlug,
  );
  if (slugTaken) return { error: `Ya existe un proyecto con la dirección "${slug}".` };

  const gallery = await buildGallery(formData);
  if ("error" in gallery) return { error: gallery.error };

  let cover = text(formData, "cover");
  const uploadedCover = await saveUpload(formData.get("coverFile"));
  if (uploadedCover) {
    if ("error" in uploadedCover) return { error: uploadedCover.error };
    cover = uploadedCover.src;
  }

  const project: Project = {
    slug,
    title,
    summary: text(formData, "summary"),
    serviceLines: formData.getAll("serviceLines").map(String),
    typology: text(formData, "typology"),
    location: text(formData, "location"),
    year: number(formData, "year", new Date().getFullYear()),
    area: text(formData, "area"),
    status: text(formData, "status"),
    client: text(formData, "client"),
    systems: lines(formData, "systems"),
    scope: lines(formData, "scope"),
    description: paragraphs(formData, "description"),
    cover,
    coverAlt: text(formData, "coverAlt"),
    gallery,
    featured: flag(formData, "featured"),
    placeholder: flag(formData, "placeholder"),
    published: flag(formData, "published"),
  };

  if (existing) {
    content.projects = content.projects.map((item) =>
      item.slug === originalSlug ? project : item,
    );
  } else {
    content.projects = [project, ...content.projects];
  }

  await saveProjectsContent(content);
  redirect(`/admin/proyectos/${slug}/?guardado=1`);
}

export async function toggleProjectPublished(formData: FormData) {
  await requireAdmin();

  const slug = text(formData, "slug");
  const content = await getProjectsContent();

  content.projects = content.projects.map((project) =>
    project.slug === slug ? { ...project, published: !project.published } : project,
  );

  await saveProjectsContent(content);
  redirect("/admin/proyectos/");
}

export async function deleteProject(formData: FormData) {
  await requireAdmin();

  const slug = text(formData, "slug");
  const content = await getProjectsContent();

  content.projects = content.projects.filter((project) => project.slug !== slug);

  await saveProjectsContent(content);
  redirect("/admin/proyectos/");
}
