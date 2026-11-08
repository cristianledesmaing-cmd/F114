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
  claim: "Anteproyecto, cálculo estructural y proyecto",
  description:
    "Ingeniería y arquitectura en un mismo equipo. Desarrollamos anteproyectos, cálculo estructural y documentación de proyecto para obras de vivienda, comercio e industria.",
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

export const whatsappHref = `https://wa.me/${contact.whatsapp.number}?text=${encodeURIComponent(
  contact.whatsapp.message,
)}`;

export const instagramHref = contact.instagram.url;

export type NavLink = {
  label: string;
  href: string;
};

export const navLinks: NavLink[] = [
  { label: "Nodo", href: "/#nodo" },
  { label: "Servicios", href: "/#servicios" },
  { label: "Proyectos", href: "/#proyectos" },
  { label: "Sistemas", href: "/#sistemas" },
  { label: "Equipo", href: "/#equipo" },
  { label: "Contacto", href: "/#contacto" },
];
