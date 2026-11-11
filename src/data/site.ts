/**
 * Configuración estructural del sitio.
 *
 * Los textos y datos de contacto editables viven en `content/site.json`
 * y se leen con los helpers de `@/lib/content`.
 */

export const brand = {
  lockupOnDark: "/brand/nodo-horizontal-obra-claro.svg",
  lockupOnLight: "/brand/nodo-horizontal-obra.svg",
  markOnDark: "/brand/nodo-simbolo-obra-claro.svg",
  markOnLight: "/brand/nodo-simbolo-obra.svg",
  lockupWidth: 730,
  lockupHeight: 256,
  markSize: 256,
} as const;

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
