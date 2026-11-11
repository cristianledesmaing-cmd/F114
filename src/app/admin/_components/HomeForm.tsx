"use client";

import Image from "next/image";
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
import { saveHome, type ContentFormState } from "@/app/admin/content-actions";
import type { HomeContent } from "@/lib/content-types";

export function HomeForm({ home }: { home: HomeContent }) {
  const [state, formAction, pending] = useActionState<ContentFormState, FormData>(saveHome, {});

  return (
    <form action={formAction} className="grid gap-6">
      <input type="hidden" name="slideCount" value={home.hero.slides.length} />
      <input type="hidden" name="teamCount" value={home.team.length} />

      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-charcoal text-3xl font-bold">Textos e imágenes</h1>
          <p className="text-graphite mt-2 text-base">
            Contenido de la página de inicio: portada, servicios, proceso y equipo.
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

      <Card title="Portada">
        <Field label="Ubicación">
          <TextInput name="heroLocation" defaultValue={home.hero.location} />
        </Field>

        <Field label="Título" hint="Una línea por renglón del título.">
          <TextArea name="heroHeadline" defaultValue={home.hero.headlineLines.join("\n")} rows={3} />
        </Field>

        <Field label="Palabra destacada" hint="Cierra el título en color naranja.">
          <TextInput name="heroAccent" defaultValue={home.hero.headlineAccent} />
        </Field>

        <Field
          label="Párrafo de presentación"
          hint="Escribí **así** las palabras que quieras resaltar en negrita."
        >
          <TextArea name="heroIntro" defaultValue={home.hero.intro} rows={4} />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Botón principal">
            <TextInput name="heroCtaPrimary" defaultValue={home.hero.ctaPrimary} />
          </Field>
          <Field label="Botón secundario">
            <TextInput name="heroCtaSecondary" defaultValue={home.hero.ctaSecondary} />
          </Field>
        </div>

        <fieldset>
          <legend className="text-overline text-graphite text-[0.75rem]">Pilares</legend>
          <div className="mt-3 grid gap-4 sm:grid-cols-3">
            {home.hero.pillars.map((pillar, index) => (
              <div key={index} className="border-charcoal/10 grid gap-3 border p-4">
                <Field label="Número">
                  <TextInput name={`pillar-${index}-number`} defaultValue={pillar.number} />
                </Field>
                <Field label="Texto">
                  <TextInput name={`pillar-${index}-label`} defaultValue={pillar.label} />
                </Field>
              </div>
            ))}
          </div>
        </fieldset>
      </Card>

      <Card title="Fotos de fondo de la portada">
        {home.hero.slides.length === 0 ? (
          <p className="text-stone text-sm">Todavía no hay fotos cargadas.</p>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2">
            {home.hero.slides.map((slide, index) => (
              <li
                key={`${slide.src}-${index}`}
                className="border-charcoal/10 grid gap-3 border p-4"
              >
                <div className="bg-sky relative aspect-[4/5] w-full max-w-[10rem] overflow-hidden">
                  <Image src={slide.src} alt="" fill sizes="160px" className="object-cover" />
                </div>
                <input type="hidden" name={`slide-${index}-src`} value={slide.src} />
                <Field label="Texto alternativo">
                  <TextInput name={`slide-${index}-alt`} defaultValue={slide.alt} />
                </Field>
                <Checkbox name={`slide-${index}-remove`} label="Quitar esta foto" />
              </li>
            ))}
          </ul>
        )}

        <Field label="Agregar fotos" hint="Podés seleccionar varias a la vez.">
          <input
            type="file"
            name="slideFiles"
            multiple
            accept="image/jpeg,image/png,image/webp,image/avif,image/svg+xml"
            className="text-graphite file:border-charcoal/20 file:text-charcoal mt-2 w-full text-sm file:mr-3 file:rounded-md file:border file:bg-white file:px-3 file:py-2 file:text-sm file:font-semibold"
          />
        </Field>
      </Card>

      <Card title="Servicios">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Antetítulo">
            <TextInput name="servicesOverline" defaultValue={home.servicesSection.overline} />
          </Field>
          <Field label="Título">
            <TextInput name="servicesTitle" defaultValue={home.servicesSection.title} />
          </Field>
        </div>
        <Field label="Descripción">
          <TextArea
            name="servicesDescription"
            defaultValue={home.servicesSection.description}
            rows={3}
          />
        </Field>

        {home.services.map((service, index) => (
          <div key={service.id} className="border-charcoal/10 grid gap-4 border p-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Etiqueta">
                <TextInput name={`service-${index}-label`} defaultValue={service.label} />
              </Field>
              <Field label="Título">
                <TextInput name={`service-${index}-title`} defaultValue={service.title} />
              </Field>
            </div>
            <Field label="Resumen">
              <TextArea name={`service-${index}-summary`} defaultValue={service.summary} rows={3} />
            </Field>
            <Field label="Puntos" hint="Uno por línea.">
              <TextArea
                name={`service-${index}-items`}
                defaultValue={service.items.join("\n")}
                rows={4}
              />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Texto del enlace">
                <TextInput name={`service-${index}-cta`} defaultValue={service.cta} />
              </Field>
              <Field label="Mensaje de WhatsApp">
                <TextInput
                  name={`service-${index}-message`}
                  defaultValue={service.whatsappMessage}
                />
              </Field>
            </div>
          </div>
        ))}
      </Card>

      <Card title="Cómo trabajamos">
        <Field label="Antetítulo">
          <TextInput name="processOverline" defaultValue={home.processSection.overline} />
        </Field>
        <Field label="Título" hint="Una línea por renglón.">
          <TextArea
            name="processTitle"
            defaultValue={home.processSection.titleLines.join("\n")}
            rows={2}
          />
        </Field>

        {home.processSteps.map((step, index) => (
          <div key={index} className="border-charcoal/10 grid gap-4 border p-5">
            <div className="grid gap-4 sm:grid-cols-[6rem_1fr]">
              <Field label="Número">
                <TextInput name={`step-${index}-number`} defaultValue={step.number} />
              </Field>
              <Field label="Título">
                <TextInput name={`step-${index}-title`} defaultValue={step.title} />
              </Field>
            </div>
            <Field label="Texto">
              <TextArea name={`step-${index}-text`} defaultValue={step.text} rows={3} />
            </Field>
          </div>
        ))}
      </Card>

      <Card title="Equipo">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Antetítulo">
            <TextInput name="teamOverline" defaultValue={home.teamSection.overline} />
          </Field>
          <Field label="Título">
            <TextInput name="teamTitle" defaultValue={home.teamSection.title} />
          </Field>
        </div>
        <Field label="Descripción">
          <TextArea name="teamDescription" defaultValue={home.teamSection.description} rows={3} />
        </Field>

        {home.team.map((member, index) => (
          <div
            key={`${member.name}-${index}`}
            className="border-charcoal/10 grid gap-4 border p-5 sm:grid-cols-[8rem_1fr]"
          >
            <div className="bg-sky relative aspect-square w-full max-w-[8rem] overflow-hidden rounded-full">
              {member.photo ? (
                <Image src={member.photo} alt="" fill sizes="128px" className="object-cover" />
              ) : null}
            </div>

            <div className="grid gap-4">
              <input type="hidden" name={`team-${index}-photo`} value={member.photo} />
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Nombre">
                  <TextInput name={`team-${index}-name`} defaultValue={member.name} />
                </Field>
                <Field label="Rol">
                  <TextInput name={`team-${index}-role`} defaultValue={member.role} />
                </Field>
              </div>
              <FileInput name={`team-${index}-file`} label="Reemplazar foto" />
              <Checkbox name={`team-${index}-remove`} label="Quitar del equipo" />
            </div>
          </div>
        ))}

        <div className="border-charcoal/10 grid gap-4 border border-dashed p-5">
          <p className="text-overline text-graphite text-[0.75rem]">Agregar integrante</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Nombre">
              <TextInput name="newTeamName" />
            </Field>
            <Field label="Rol">
              <TextInput name="newTeamRole" />
            </Field>
          </div>
          <FileInput name="newTeamFile" label="Foto" />
        </div>
      </Card>

      <Card title="Contacto">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Antetítulo">
            <TextInput name="contactOverline" defaultValue={home.contactSection.overline} />
          </Field>
          <Field label="Título">
            <TextInput name="contactTitle" defaultValue={home.contactSection.title} />
          </Field>
        </div>
        <Field label="Descripción">
          <TextArea
            name="contactDescription"
            defaultValue={home.contactSection.description}
            rows={3}
          />
        </Field>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Opción de asesoramiento">
            <TextInput name="advisoryLabel" defaultValue={home.contactSection.advisoryLabel} />
          </Field>
          <Field label="Mensaje de asesoramiento">
            <TextInput name="advisoryMessage" defaultValue={home.contactSection.advisoryMessage} />
          </Field>
        </div>
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
