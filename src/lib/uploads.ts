/**
 * Guardado de imágenes subidas desde el panel.
 * Los archivos van a `public/uploads/` y se sirven como `/uploads/<archivo>`.
 */
import { randomBytes } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import { extname, join } from "node:path";

const UPLOADS_DIR = join(process.cwd(), "public", "uploads");
const MAX_BYTES = 10 * 1024 * 1024;

const ALLOWED_EXTENSIONS: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/avif": ".avif",
  "image/svg+xml": ".svg",
};

/** Deja solo caracteres seguros para no escapar del directorio de subidas. */
function slugifyFileName(name: string) {
  const base = name.replace(extname(name), "");
  const slug = base
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);

  return slug.length > 0 ? slug : "imagen";
}

export type UploadResult = { src: string } | { error: string };

/**
 * Guarda el archivo y devuelve la ruta pública.
 * Si `file` viene vacío (el input quedó sin elegir) devuelve `null`.
 */
export async function saveUpload(file: unknown): Promise<UploadResult | null> {
  if (!(file instanceof File) || file.size === 0) return null;

  if (file.size > MAX_BYTES) {
    return { error: `"${file.name}" supera los 10 MB permitidos.` };
  }

  const extension = ALLOWED_EXTENSIONS[file.type];
  if (!extension) {
    return { error: `"${file.name}" no es una imagen admitida (JPG, PNG, WEBP, AVIF o SVG).` };
  }

  const fileName = `${slugifyFileName(file.name)}-${randomBytes(4).toString("hex")}${extension}`;

  await mkdir(UPLOADS_DIR, { recursive: true });
  await writeFile(join(UPLOADS_DIR, fileName), Buffer.from(await file.arrayBuffer()));

  return { src: `/uploads/${fileName}` };
}
