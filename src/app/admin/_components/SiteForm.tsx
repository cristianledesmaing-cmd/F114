"use client";

import { useActionState } from "react";

import { Card, Field, FormStatus, TextArea, TextInput } from "@/app/admin/_components/form";
import { saveSite, type ContentFormState } from "@/app/admin/content-actions";
import type { SiteContent } from "@/lib/content-types";

export function SiteForm({ site }: { site: SiteContent }) {
  const [state, formAction, pending] = useActionState<ContentFormState, FormData>(saveSite, {});

  return (
    <form action={formAction} className="grid gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-charcoal text-3xl font-bold">Datos del sitio</h1>
          <p className="text-graphite mt-2 text-base">
            Nombre, textos institucionales y vías de contacto.
          </p>
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

      <Card title="Identidad">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Nombre corto">
            <TextInput name="name" defaultValue={site.name} required />
          </Field>
          <Field label="Nombre completo">
            <TextInput name="fullName" defaultValue={site.fullName} required />
          </Field>
          <Field label="Bajada del logo">
            <TextInput name="tagline" defaultValue={site.tagline} />
          </Field>
          <Field label="Año de fundación">
            <TextInput name="foundedYear" type="number" defaultValue={site.foundedYear} />
          </Field>
        </div>

        <Field label="Slogan" hint="Se muestra en cursiva arriba del título del inicio.">
          <TextInput name="slogan" defaultValue={site.slogan} />
        </Field>

        <Field label="Claim" hint="Se usa en los metadatos para compartir en redes.">
          <TextInput name="claim" defaultValue={site.claim} />
        </Field>

        <Field label="Descripción" hint="Aparece en el pie y en los metadatos del buscador.">
          <TextArea name="description" defaultValue={site.description} rows={3} />
        </Field>

        <Field label="Dirección del sitio">
          <TextInput name="url" defaultValue={site.url} placeholder="https://..." />
        </Field>
      </Card>

      <Card title="Ubicación">
        <div className="grid gap-5 sm:grid-cols-3">
          <Field label="Ciudad">
            <TextInput name="city" defaultValue={site.location.city} />
          </Field>
          <Field label="Provincia">
            <TextInput name="region" defaultValue={site.location.region} />
          </Field>
          <Field label="País">
            <TextInput name="country" defaultValue={site.location.country} />
          </Field>
        </div>
        <Field label="Cómo se muestra">
          <TextInput name="locationLabel" defaultValue={site.location.label} />
        </Field>
      </Card>

      <Card title="Contacto">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Correo">
            <TextInput name="emailAddress" defaultValue={site.contact.email.address} />
          </Field>
          <Field label="Asunto del correo">
            <TextInput name="emailSubject" defaultValue={site.contact.email.subject} />
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="WhatsApp" hint="Solo números, con código de país y de área.">
            <TextInput name="whatsappNumber" defaultValue={site.contact.whatsapp.number} />
          </Field>
          <Field label="WhatsApp como se muestra">
            <TextInput name="whatsappDisplay" defaultValue={site.contact.whatsapp.display} />
          </Field>
        </div>

        <Field label="Mensaje inicial de WhatsApp">
          <TextInput name="whatsappMessage" defaultValue={site.contact.whatsapp.message} />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Instagram">
            <TextInput name="instagramHandle" defaultValue={site.contact.instagram.handle} />
          </Field>
          <Field label="Enlace de Instagram">
            <TextInput name="instagramUrl" defaultValue={site.contact.instagram.url} />
          </Field>
        </div>

        <Field label="Horario de atención">
          <TextInput name="schedule" defaultValue={site.contact.schedule} />
        </Field>
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
