/** Helpers para leer los formularios del panel. */

export function text(formData: FormData, name: string) {
  return String(formData.get(name) ?? "").trim();
}

export function number(formData: FormData, name: string, fallback: number) {
  const parsed = Number(formData.get(name));
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function flag(formData: FormData, name: string) {
  return formData.get(name) !== null;
}

/** Una entrada por línea; se descartan las vacías. */
export function lines(formData: FormData, name: string) {
  return text(formData, name)
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

/** Un párrafo por bloque separado con una línea en blanco. */
export function paragraphs(formData: FormData, name: string) {
  return text(formData, name)
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim().replace(/\s*\n\s*/g, " "))
    .filter((paragraph) => paragraph.length > 0);
}

export function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
