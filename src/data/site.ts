/**
 * Datos institucionales y de contacto de Nodo Ingeniería & Arquitectura.
 *
 * PENDIENTE: los valores marcados con `PROVISORIO` son de relleno.
 * Reemplazarlos por los definitivos no requiere tocar ningún componente.
 */

export const site = {
  name: "Nodo",
  fullName: "Nodo Ingeniería & Arquitectura",
  tagline: "Ingeniería & Arquitectura",
  slogan: "Ingeniería y arquitectura, unidas en un mismo nodo.",
  claim: "Proyecto, dirección de obra y consultoría técnica",
  description:
    "Hacemos proyectos, dirigimos obras y brindamos consultoría técnica. Integramos ingeniería y arquitectura para que las decisiones de diseño tengan en cuenta cómo se va a construir.",
  // PROVISORIO: reemplazar por el dominio definitivo antes de publicar.
  url: "https://www.nodoingenieria.com.ar",
  locale: "es_AR",
  foundedYear: 2021,
  // PROVISORIO
  location: {
    city: "Resistencia",
    region: "Provincia del Chaco",
    country: "Argentina",
    label: "Resistencia, Chaco, Argentina",
  },
} as const;

export const brand = {
  lockupOnDark: "/brand/nodo-horizontal-obra-claro.svg",
  lockupOnLight: "/brand/nodo-horizontal-obra.svg",
  markOnDark: "/brand/nodo-simbolo-obra-claro.svg",
  markOnLight: "/brand/nodo-simbolo-obra.svg",
  lockupWidth: 730,
  lockupHeight: 256,
  markSize: 256,
} as const;

export const contact = {
  email: {
    // PROVISORIO
    address: "contacto@nodoingenieria.com.ar",
    subject: "Consulta desde el sitio web",
  },
  whatsapp: {
    // Solo dígitos, con código de país y de área, sin "+" ni espacios.
    number: "5493624888895",
    // Como se muestra en pantalla.
    display: "+54 9 362 488-8895",
    message: "Hola, quisiera consultar por un proyecto con Nodo.",
  },
  instagram: {
    // PROVISORIO
    handle: "@nodo.ingenieria",
    url: "https://www.instagram.com/",
  },
  schedule: "Lunes a viernes, 9 a 18 h",
} as const;

export const emailHref = `mailto:${contact.email.address}?subject=${encodeURIComponent(
  contact.email.subject,
)}`;

export function buildWhatsappHref(message: string = contact.whatsapp.message) {
  return `https://wa.me/${contact.whatsapp.number}?text=${encodeURIComponent(message)}`;
}

export const whatsappHref = buildWhatsappHref();

export const instagramHref = contact.instagram.url;

export type NavLink = {
  label: string;
  href: string;
};

export const navLinks: NavLink[] = [
  { label: "Servicios", href: "/#servicios" },
  { label: "Cómo trabajamos", href: "/#como-trabajamos" },
  { label: "Proyectos", href: "/proyectos" },
  { label: "Equipo", href: "/#equipo" },
];

export const contactNavLink: NavLink = {
  label: "Contactanos",
  href: "/#contacto",
};
