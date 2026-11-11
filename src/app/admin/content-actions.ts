"use server";

import { requireAdmin } from "@/lib/auth";
import {
  getHomeContent,
  getSiteContent,
  saveHomeContent,
  saveSiteContent,
} from "@/lib/content";
import type { HeroSlide, TeamMemberContent } from "@/lib/content-types";
import { flag, lines, number, text } from "@/lib/form-data";
import { saveUpload } from "@/lib/uploads";

export type ContentFormState = { error?: string; message?: string };

export async function saveSite(
  _state: ContentFormState,
  formData: FormData,
): Promise<ContentFormState> {
  await requireAdmin();

  const current = await getSiteContent();

  await saveSiteContent({
    ...current,
    name: text(formData, "name"),
    fullName: text(formData, "fullName"),
    tagline: text(formData, "tagline"),
    slogan: text(formData, "slogan"),
    claim: text(formData, "claim"),
    description: text(formData, "description"),
    url: text(formData, "url"),
    locale: current.locale,
    foundedYear: number(formData, "foundedYear", current.foundedYear),
    location: {
      city: text(formData, "city"),
      region: text(formData, "region"),
      country: text(formData, "country"),
      label: text(formData, "locationLabel"),
    },
    contact: {
      email: {
        address: text(formData, "emailAddress"),
        subject: text(formData, "emailSubject"),
      },
      whatsapp: {
        number: text(formData, "whatsappNumber").replace(/\D/g, ""),
        display: text(formData, "whatsappDisplay"),
        message: text(formData, "whatsappMessage"),
      },
      instagram: {
        handle: text(formData, "instagramHandle"),
        url: text(formData, "instagramUrl"),
      },
      schedule: text(formData, "schedule"),
    },
  });

  return { message: "Datos del sitio guardados." };
}

/** Conserva las fotos no marcadas para borrar y suma las nuevas. */
async function buildSlides(formData: FormData): Promise<HeroSlide[] | { error: string }> {
  const slides: HeroSlide[] = [];
  const count = number(formData, "slideCount", 0);

  for (let index = 0; index < count; index += 1) {
    if (flag(formData, `slide-${index}-remove`)) continue;

    const src = text(formData, `slide-${index}-src`);
    if (!src) continue;

    slides.push({ src, alt: text(formData, `slide-${index}-alt`) });
  }

  for (const file of formData.getAll("slideFiles")) {
    const uploaded = await saveUpload(file);
    if (!uploaded) continue;
    if ("error" in uploaded) return { error: uploaded.error };

    slides.push({ src: uploaded.src, alt: "" });
  }

  return slides;
}

async function buildTeam(formData: FormData): Promise<TeamMemberContent[] | { error: string }> {
  const team: TeamMemberContent[] = [];
  const count = number(formData, "teamCount", 0);

  for (let index = 0; index < count; index += 1) {
    if (flag(formData, `team-${index}-remove`)) continue;

    const name = text(formData, `team-${index}-name`);
    if (!name) continue;

    let photo = text(formData, `team-${index}-photo`);
    const uploaded = await saveUpload(formData.get(`team-${index}-file`));
    if (uploaded) {
      if ("error" in uploaded) return { error: uploaded.error };
      photo = uploaded.src;
    }

    team.push({ name, role: text(formData, `team-${index}-role`), photo });
  }

  const newName = text(formData, "newTeamName");
  if (newName) {
    let photo = "";
    const uploaded = await saveUpload(formData.get("newTeamFile"));
    if (uploaded) {
      if ("error" in uploaded) return { error: uploaded.error };
      photo = uploaded.src;
    }

    team.push({ name: newName, role: text(formData, "newTeamRole"), photo });
  }

  return team;
}

export async function saveHome(
  _state: ContentFormState,
  formData: FormData,
): Promise<ContentFormState> {
  await requireAdmin();

  const current = await getHomeContent();

  const slides = await buildSlides(formData);
  if ("error" in slides) return { error: slides.error };

  const team = await buildTeam(formData);
  if ("error" in team) return { error: team.error };

  await saveHomeContent({
    ...current,
    hero: {
      location: text(formData, "heroLocation"),
      headlineLines: lines(formData, "heroHeadline"),
      headlineAccent: text(formData, "heroAccent"),
      intro: text(formData, "heroIntro"),
      ctaPrimary: text(formData, "heroCtaPrimary"),
      ctaSecondary: text(formData, "heroCtaSecondary"),
      pillars: current.hero.pillars.map((pillar, index) => ({
        number: text(formData, `pillar-${index}-number`) || pillar.number,
        label: text(formData, `pillar-${index}-label`) || pillar.label,
      })),
      slides,
    },
    servicesSection: {
      overline: text(formData, "servicesOverline"),
      title: text(formData, "servicesTitle"),
      description: text(formData, "servicesDescription"),
    },
    services: current.services.map((service, index) => ({
      ...service,
      label: text(formData, `service-${index}-label`) || service.label,
      title: text(formData, `service-${index}-title`) || service.title,
      summary: text(formData, `service-${index}-summary`),
      items: lines(formData, `service-${index}-items`),
      cta: text(formData, `service-${index}-cta`) || service.cta,
      whatsappMessage:
        text(formData, `service-${index}-message`) || service.whatsappMessage,
    })),
    processSection: {
      overline: text(formData, "processOverline"),
      titleLines: lines(formData, "processTitle"),
    },
    processSteps: current.processSteps.map((step, index) => ({
      number: text(formData, `step-${index}-number`) || step.number,
      title: text(formData, `step-${index}-title`) || step.title,
      text: text(formData, `step-${index}-text`),
    })),
    teamSection: {
      overline: text(formData, "teamOverline"),
      title: text(formData, "teamTitle"),
      description: text(formData, "teamDescription"),
    },
    team,
    contactSection: {
      overline: text(formData, "contactOverline"),
      title: text(formData, "contactTitle"),
      description: text(formData, "contactDescription"),
      advisoryLabel: text(formData, "advisoryLabel"),
      advisoryMessage: text(formData, "advisoryMessage"),
    },
  });

  return { message: "Contenido guardado." };
}
