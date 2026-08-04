/**
 * Datos institucionales y de contacto de F114.
 *
 * PENDIENTE: los valores marcados con `PROVISORIO` son de relleno.
 * Reemplazarlos por los definitivos no requiere tocar ningún componente.
 */

export const site = {
  name: "F114",
  fullName: "F114 Estudio de Arquitectura",
  tagline: "Estudio de arquitectura",
  claim: "Anteproyecto, cálculo estructural y proyecto",
  description:
    "Estudio de arquitectura e ingeniería. Desarrollamos anteproyectos, cálculo estructural y documentación de proyecto para obras de vivienda, comercio e industria.",
  // PROVISORIO: reemplazar por el dominio definitivo antes de publicar.
  url: "https://www.f114estudio.com.ar",
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

export const contact = {
  email: {
    // PROVISORIO
    address: "contacto@f114estudio.com.ar",
    subject: "Consulta desde el sitio web",
  },
  whatsapp: {
    // PROVISORIO: solo dígitos, con código de país y de área, sin "+" ni espacios.
    number: "5493420000000",
    // PROVISORIO: como se muestra en pantalla.
    display: "+54 9 342 000-0000",
    message: "Hola F114, quisiera consultar por un proyecto.",
  },
  instagram: {
    // PROVISORIO
    handle: "@f114.estudio",
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
  { label: "Estudio", href: "/#estudio" },
  { label: "Servicios", href: "/#servicios" },
  { label: "Proyectos", href: "/#proyectos" },
  { label: "Sistemas", href: "/#sistemas" },
  { label: "Equipo", href: "/#equipo" },
  { label: "Contacto", href: "/#contacto" },
];
