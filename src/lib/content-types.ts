/**
 * Tipos del contenido editable desde el panel (`content/*.json`).
 * Este módulo no toca el filesystem, así que puede importarse desde componentes cliente.
 */

export type SiteContent = {
  name: string;
  fullName: string;
  tagline: string;
  slogan: string;
  claim: string;
  description: string;
  url: string;
  locale: string;
  foundedYear: number;
  location: {
    city: string;
    region: string;
    country: string;
    label: string;
  };
  contact: {
    email: { address: string; subject: string };
    whatsapp: { number: string; display: string; message: string };
    instagram: { handle: string; url: string };
    schedule: string;
  };
};

export type HeroPillar = {
  number: string;
  label: string;
};

export type HeroSlide = {
  src: string;
  alt: string;
};

export type HeroContent = {
  location: string;
  headlineLines: string[];
  headlineAccent: string;
  /** Admite `**negrita**` para resaltar palabras sin escribir HTML. */
  intro: string;
  ctaPrimary: string;
  ctaSecondary: string;
  pillars: HeroPillar[];
  slides: HeroSlide[];
};

export type ServiceContent = {
  id: string;
  number: string;
  label: string;
  title: string;
  summary: string;
  items: string[];
  cta: string;
  whatsappMessage: string;
};

export type ProcessStepContent = {
  number: string;
  title: string;
  text: string;
};

export type TeamMemberContent = {
  name: string;
  role: string;
  photo: string;
};

export type HomeContent = {
  hero: HeroContent;
  servicesSection: {
    overline: string;
    title: string;
    description: string;
  };
  services: ServiceContent[];
  processSection: {
    overline: string;
    titleLines: string[];
  };
  processSteps: ProcessStepContent[];
  teamSection: {
    overline: string;
    title: string;
    description: string;
  };
  team: TeamMemberContent[];
  contactSection: {
    overline: string;
    title: string;
    description: string;
    advisoryLabel: string;
    advisoryMessage: string;
  };
};

export type ServiceLine = string;

export type GalleryImage = {
  src: string;
  alt: string;
  caption: string;
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  serviceLines: ServiceLine[];
  typology: string;
  location: string;
  year: number;
  area: string;
  status: string;
  client: string;
  systems: string[];
  scope: string[];
  description: string[];
  cover: string;
  coverAlt: string;
  gallery: GalleryImage[];
  featured: boolean;
  placeholder: boolean;
  /** Solo los publicados se muestran en el sitio público. */
  published: boolean;
};

export type ProjectsContent = {
  serviceLines: ServiceLine[];
  projects: Project[];
};

export function buildWhatsappHref(number: string, message: string) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function buildEmailHref(address: string, subject: string) {
  return `mailto:${address}?subject=${encodeURIComponent(subject)}`;
}
