# F114 — Estudio de Arquitectura

Sitio institucional y portfolio del estudio. Presenta las tres líneas de servicio (anteproyecto,
cálculo estructural y proyecto), los sistemas constructivos que abarca el equipo, los proyectos
realizados y las tres vías de contacto.

Construido con Next.js 16 (App Router), TypeScript y Tailwind CSS v4. Se compila como sitio
estático, así que puede publicarse en cualquier hosting.

## Puesta en marcha

```bash
npm install
npm run dev      # http://localhost:3000
```

Otros comandos:

```bash
npm run build    # genera el sitio estático en out/
npm run lint     # ESLint
```

El resultado de `npm run build` queda en `out/`. Ese directorio es lo único que hay que subir al
hosting (Vercel, Netlify, GitHub Pages, cPanel, etc.).

## Qué hay que reemplazar antes de publicar

Todo lo provisorio está marcado con el comentario `PROVISORIO` o `PENDIENTE` en el código.

### 1. Datos de contacto y del estudio

Archivo: [`src/data/site.ts`](src/data/site.ts)

| Dato | Dónde | Formato |
| --- | --- | --- |
| Correo | `contact.email.address` | `contacto@dominio.com` |
| WhatsApp | `contact.whatsapp.number` | Solo dígitos, con código de país y área: `5493420000000` |
| WhatsApp visible | `contact.whatsapp.display` | Como querés que se lea: `+54 9 342 000-0000` |
| Instagram | `contact.instagram.url` y `.handle` | URL completa del perfil y el usuario |
| Dominio | `site.url` | Se usa en el sitemap y en las etiquetas para redes |
| Ciudad | `site.location` | Aparece en el hero, contacto y pie |
| Horario | `contact.schedule` | Texto libre |

Con eso alcanza: el header, la sección de contacto y el pie toman los valores de ese archivo.

### 2. Proyectos

Archivo: [`src/data/projects.ts`](src/data/projects.ts)

Los nueve proyectos cargados son de relleno. Para cada proyecto real:

1. Crear la carpeta `public/proyectos/<slug>/` y copiar ahí las imágenes (JPG, PNG o WebP).
2. Editar la entrada correspondiente en `projects`:
   - `slug` define la URL de la ficha (`/proyectos/<slug>/`). Sin espacios ni acentos.
   - `cover` y `coverAlt`: imagen de portada y su texto alternativo.
   - `gallery`: lista de imágenes con `src`, `alt` y `caption`.
   - `serviceLines`: una o varias de `Anteproyecto`, `Cálculo estructural`, `Proyecto`.
     Son las que alimentan los filtros del inicio.
   - `typology`, `location`, `year`, `area`, `status`, `client`: la ficha técnica.
   - `systems` y `scope`: listas que se muestran en la ficha.
   - `description`: array de párrafos.
3. Quitar `placeholder: true` cuando las imágenes ya sean reales. Ese campo es el que muestra el
   aviso de "imagen de relleno" en la ficha.

Las rutas de las fichas y el sitemap se generan solos a partir de ese archivo.

Recomendación para las imágenes: portadas en proporción 4:3 (por ejemplo 1600x1200) y galería en
16:9 o 4:3, optimizadas a menos de 400 KB cada una.

### 3. Textos de servicios, sistemas, proceso y equipo

Archivo: [`src/data/services.ts`](src/data/services.ts)

Contiene las tres líneas de servicio con su detalle, los sistemas constructivos, los pasos del
proceso de trabajo y la descripción de los tres perfiles del equipo.

### 4. Avisos de contenido provisorio

Cuando estén cargados los proyectos reales, conviene borrar dos textos:

- La nota al pie de la grilla en
  [`src/components/sections/ProjectsShowcase.tsx`](src/components/sections/ProjectsShowcase.tsx).
- El aviso de la galería en
  [`src/app/proyectos/[slug]/page.tsx`](src/app/proyectos/[slug]/page.tsx) (desaparece solo al
  quitar `placeholder: true`).

## Identidad visual

- Logotipos e isotipos: `public/brand/` (versión clara para fondos oscuros y viceversa).
- Tipografía Futura Md BT: `src/fonts/`, cargada con `next/font/local` desde
  [`src/app/layout.tsx`](src/app/layout.tsx).
- Paleta y utilidades de marca: [`src/app/globals.css`](src/app/globals.css).

  | Variable | Color | Uso |
  | --- | --- | --- |
  | `--color-ink` | `#201d1b` | Fondos más oscuros, hero y pie |
  | `--color-carbon` | `#2a2725` | Secciones oscuras |
  | `--color-charcoal` | `#3a3633` | Color del logotipo, textos principales |
  | `--color-graphite` | `#55504b` | Texto secundario |
  | `--color-stone` | `#8a837b` | Texto terciario |
  | `--color-sand` | `#c9c2b8` | Texto sobre fondos oscuros |
  | `--color-bone` | `#f5f3f0` | Fondo claro |
  | `--color-brass` | `#b08a52` | Acento |

- Iconos e imagen para redes: `src/app/icon.png`, `src/app/apple-icon.png` y
  `src/app/opengraph-image.png`.

Nota sobre la tipografía: los archivos de Futura Md BT provistos por el estudio declaran permiso de
"vista previa e impresión". Si se va a publicar el sitio conviene verificar la licencia para uso
web; si no estuviera cubierta, alcanza con borrar los `.ttf` de `src/fonts/` y quitar el bloque
`localFont` de `layout.tsx`: el sitio pasa automáticamente a la tipografía de reserva.

## Imágenes de relleno

Las imágenes actuales de `public/proyectos/` son SVG generados por
[`scripts/generar-placeholders.mjs`](scripts/generar-placeholders.mjs):

```bash
node scripts/generar-placeholders.mjs
```

El script lee los proyectos de `src/data/projects.ts` y crea un SVG por cada ruta que apunte a
`/proyectos/...`. Una vez cargadas las imágenes reales, tanto el script como los SVG pueden
borrarse.

## Estructura

```
src/
├── app/
│   ├── layout.tsx                  # Tipografías, metadata, header y pie
│   ├── page.tsx                    # Inicio
│   ├── globals.css                 # Paleta y estilos base
│   ├── not-found.tsx               # 404
│   ├── sitemap.ts / robots.ts      # SEO
│   └── proyectos/[slug]/page.tsx   # Ficha de cada proyecto
├── components/
│   ├── layout/                     # SiteHeader, SiteFooter
│   ├── sections/                   # Secciones del inicio
│   ├── ui/                         # Container, Logo, Reveal, iconos
│   └── ProjectCard.tsx
├── data/                           # site.ts, projects.ts, services.ts
└── fonts/                          # Futura Md BT
```
