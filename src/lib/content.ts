/**
 * Lectura y escritura del contenido editable (`content/*.json`).
 * Solo se puede usar desde el servidor: toca el filesystem.
 */
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

import type {
  HomeContent,
  Project,
  ProjectsContent,
  SiteContent,
} from "@/lib/content-types";

const contentDir = join(process.cwd(), "content");

async function readJson<T>(file: string): Promise<T> {
  const raw = await readFile(join(contentDir, file), "utf8");
  return JSON.parse(raw) as T;
}

/** Escribe de forma atómica para no dejar el JSON a medias si falla el guardado. */
async function writeJson(file: string, data: unknown) {
  const target = join(contentDir, file);
  const temporary = `${target}.tmp`;
  await writeFile(temporary, `${JSON.stringify(data, null, 2)}\n`, "utf8");
  const { rename } = await import("node:fs/promises");
  await rename(temporary, target);
}

export function getSiteContent() {
  return readJson<SiteContent>("site.json");
}

export function saveSiteContent(content: SiteContent) {
  return writeJson("site.json", content);
}

export function getHomeContent() {
  return readJson<HomeContent>("home.json");
}

export function saveHomeContent(content: HomeContent) {
  return writeJson("home.json", content);
}

export function getProjectsContent() {
  return readJson<ProjectsContent>("projects.json");
}

export function saveProjectsContent(content: ProjectsContent) {
  return writeJson("projects.json", content);
}

/** Proyectos visibles en el sitio público. */
export async function getPublishedProjects(): Promise<Project[]> {
  const { projects } = await getProjectsContent();
  return projects.filter((project) => project.published);
}

export async function getPublishedProject(slug: string): Promise<Project | undefined> {
  const projects = await getPublishedProjects();
  return projects.find((project) => project.slug === slug);
}

/** Vecinos dentro de los publicados, para la navegación entre fichas. */
export async function getProjectNeighbours(slug: string) {
  const projects = await getPublishedProjects();
  const index = projects.findIndex((project) => project.slug === slug);

  if (index === -1 || projects.length < 2) {
    return { previous: undefined, next: undefined };
  }

  return {
    previous: projects[(index - 1 + projects.length) % projects.length],
    next: projects[(index + 1) % projects.length],
  };
}
