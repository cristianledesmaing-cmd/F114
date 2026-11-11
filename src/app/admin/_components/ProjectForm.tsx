"use client";

import Image from "next/image";
import Link from "next/link";
import { useActionState } from "react";

import {
  Card,
  Checkbox,
  Field,
  FileInput,
  FormStatus,
  TextArea,
  TextInput,
} from "@/app/admin/_components/form";
import { saveProject, type ProjectFormState } from "@/app/admin/projects-actions";
import type { Project, ServiceLine } from "@/lib/content-types";

const emptyProject: Project = {
  slug: "",
  title: "",
  summary: "",
  serviceLines: [],
  typology: "",
  location: "Resistencia, Chaco",
  year: new Date().getFullYear(),
  area: "",
  status: "",
  client: "",
  systems: [],
  scope: [],
  description: [],
  cover: "",
  coverAlt: "",
  gallery: [],
  featured: false,
  placeholder: false,
  published: false,
};

export function ProjectForm({
  project = emptyProject,
  serviceLines,
  saved = false,
}: {
  project?: Project;
  serviceLines: ServiceLine[];
  saved?: boolean;
}) {
  const [state, formAction, pending] = useActionState<ProjectFormState, FormData>(saveProject, {
    message: saved ? "Cambios guardados." : undefined,
  });

  const isNew = project.slug === "";

  return (
    <form action={formAction} className="grid gap-6">
      <input type="hidden" name="originalSlug" value={project.slug} />
      <input type="hidden" name="galleryCount" value={project.gallery.length} />

      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-charcoal text-3xl font-bold">
            {isNew ? "Nuevo proyecto" : project.title}
          </h1>
          <Link href="/admin/proyectos/" className="text-graphite hover:text-brass-ink text-sm">
            ← Volver a proyectos
          </Link>
        </div>
        <button
          type="submit"
          disabled={pending}
          className="bg-brass hover:bg-brass-ink rounded-md px-6 py-3 text-base font-semibold text-white transition-colors disabled:opacity-60"
        >
          {pending ? "Guardando…" : "Guardar"}
        </button>
      </div>

      <FormStatus state={state} />

      <Card title="Datos principales">
        <Field label="Título">
          <TextInput name="title" defaultValue={project.title} required />
        </Field>

        <Field
          label="Dirección web"
          hint="Se usa en /proyectos/… Si lo dejás vacío se genera desde el título."
        >
          <TextInput name="slug" defaultValue={project.slug} placeholder="vivienda-patio-norte" />
        </Field>

        <Field label="Resumen" hint="Texto corto que aparece en el listado y en la ficha.">
          <TextArea name="summary" defaultValue={project.summary} rows={3} />
        </Field>

        <fieldset>
          <legend className="text-overline text-graphite text-[0.75rem]">Líneas de servicio</legend>
          <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
            {serviceLines.map((line) => (
              <Checkbox
                key={line}
                name="serviceLines"
                value={line}
                label={line}
                defaultChecked={project.serviceLines.includes(line)}
              />
            ))}
          </div>
        </fieldset>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Tipología">
            <TextInput name="typology" defaultValue={project.typology} />
          </Field>
          <Field label="Ubicación">
            <TextInput name="location" defaultValue={project.location} />
          </Field>
          <Field label="Año">
            <TextInput name="year" type="number" defaultValue={project.year} />
          </Field>
          <Field label="Superficie">
            <TextInput name="area" defaultValue={project.area} placeholder="245 m²" />
          </Field>
          <Field label="Estado">
            <TextInput name="status" defaultValue={project.status} placeholder="Obra finalizada" />
          </Field>
          <Field label="Comitente">
            <TextInput name="client" defaultValue={project.client} />
          </Field>
        </div>
      </Card>

      <Card title="Contenido de la ficha">
        <Field label="Sistemas constructivos" hint="Uno por línea.">
          <TextArea name="systems" defaultValue={project.systems.join("\n")} rows={4} />
        </Field>

        <Field label="Alcance del trabajo" hint="Uno por línea.">
          <TextArea name="scope" defaultValue={project.scope.join("\n")} rows={5} />
        </Field>

        <Field label="Descripción" hint="Separá cada párrafo con una línea en blanco.">
          <TextArea name="description" defaultValue={project.description.join("\n\n")} rows={10} />
        </Field>
      </Card>

      <Card title="Portada">
        {project.cover ? (
          <div className="bg-sky relative aspect-[4/3] w-full max-w-xs overflow-hidden">
            <Image src={project.cover} alt="" fill sizes="320px" className="object-cover" />
          </div>
        ) : null}

        <input type="hidden" name="cover" value={project.cover} />
        <FileInput name="coverFile" label="Reemplazar portada" />

        <Field label="Texto alternativo de la portada">
          <TextInput name="coverAlt" defaultValue={project.coverAlt} />
        </Field>
      </Card>

      <Card title="Galería">
        {project.gallery.length === 0 ? (
          <p className="text-stone text-sm">Todavía no hay imágenes en la galería.</p>
        ) : (
          <ul className="grid gap-5">
            {project.gallery.map((image, index) => (
              <li
                key={`${image.src}-${index}`}
                className="border-charcoal/10 grid gap-4 border p-4 sm:grid-cols-[10rem_1fr]"
              >
                <div className="bg-sky relative aspect-[4/3] overflow-hidden">
                  <Image src={image.src} alt="" fill sizes="160px" className="object-cover" />
                </div>

                <div className="grid gap-3">
                  <input type="hidden" name={`gallery-${index}-src`} value={image.src} />
                  <Field label="Texto alternativo">
                    <TextInput name={`gallery-${index}-alt`} defaultValue={image.alt} />
                  </Field>
                  <Field label="Epígrafe">
                    <TextInput name={`gallery-${index}-caption`} defaultValue={image.caption} />
                  </Field>
                  <Checkbox name={`gallery-${index}-remove`} label="Quitar esta imagen" />
                </div>
              </li>
            ))}
          </ul>
        )}

        <Field label="Agregar imágenes" hint="Podés seleccionar varias a la vez.">
          <input
            type="file"
            name="galleryFiles"
            multiple
            accept="image/jpeg,image/png,image/webp,image/avif,image/svg+xml"
            className="text-graphite file:border-charcoal/20 file:text-charcoal mt-2 w-full text-sm file:mr-3 file:rounded-md file:border file:bg-white file:px-3 file:py-2 file:text-sm file:font-semibold"
          />
        </Field>
      </Card>

      <Card title="Visibilidad">
        <Checkbox
          name="published"
          label="Mostrar este proyecto en el sitio"
          defaultChecked={project.published}
        />
        <Checkbox name="featured" label="Destacado" defaultChecked={project.featured} />
        <Checkbox
          name="placeholder"
          label="Avisar que las imágenes son de relleno"
          defaultChecked={project.placeholder}
        />
      </Card>

      <div>
        <button
          type="submit"
          disabled={pending}
          className="bg-brass hover:bg-brass-ink rounded-md px-6 py-3 text-base font-semibold text-white transition-colors disabled:opacity-60"
        >
          {pending ? "Guardando…" : "Guardar"}
        </button>
      </div>
    </form>
  );
}
