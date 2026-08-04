/**
 * Genera las imágenes de relleno (SVG) de `public/proyectos/`.
 *
 * Uso: node scripts/generar-placeholders.mjs
 *
 * Solo hace falta mientras no estén cargadas las fotos y renders reales.
 * Cuando se reemplacen las imágenes definitivas, este script puede eliminarse.
 */

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");
const publicDir = join(root, "public");

const W = 1600;
const H = 1100;

const palette = {
  dark: "#25221f",
  base: "#3a3633",
  mid: "#4c4743",
  light: "#6a635b",
  line: "#a9a199",
  bright: "#e7e3dd",
  brass: "#b08a52",
};

function mulberry32(seed) {
  let a = seed >>> 0;
  return function random() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hash(text) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

const escapeXml = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" })[char],
  );

/* ---------------------------------------------------------------- estilos */

function drawRender(rnd) {
  // Volúmenes en proyección isométrica, encuadrados automáticamente.
  const iso = (x, y, z) => [(x - y) * 97, -(x + y) * 54 - z * 67];

  const blocks = [];
  const count = 3 + Math.floor(rnd() * 3);
  let ox = 0;
  for (let i = 0; i < count; i++) {
    const w = 1 + Math.round(rnd() * 2) * 0.6;
    const d = 1.2 + rnd() * 1.4;
    // Un volumen alto asegurado para que la composición no quede plana.
    const h = i === 1 ? 2.4 + rnd() * 1.4 : 0.9 + rnd() * 1.8;
    blocks.push({ x: ox, y: -0.6 + rnd() * 1.2, w, d, h });
    ox += w * 0.85;
  }
  blocks.sort((a, b) => a.x + a.y - (b.x + b.y));

  const polygons = [];
  for (const { x, y, w, d, h } of blocks) {
    polygons.push(
      { fill: palette.light, opacity: 0.95, pts: [iso(x, y + d, 0), iso(x, y + d, h), iso(x + w, y + d, h), iso(x + w, y + d, 0)] },
      { fill: palette.mid, opacity: 0.98, pts: [iso(x + w, y + d, 0), iso(x + w, y + d, h), iso(x + w, y, h), iso(x + w, y, 0)] },
      { fill: palette.line, opacity: 0.8, pts: [iso(x, y, h), iso(x + w, y, h), iso(x + w, y + d, h), iso(x, y + d, h)] },
    );
  }

  const all = polygons.flatMap((polygon) => polygon.pts);
  const minX = Math.min(...all.map((p) => p[0]));
  const maxX = Math.max(...all.map((p) => p[0]));
  const minY = Math.min(...all.map((p) => p[1]));
  const maxY = Math.max(...all.map((p) => p[1]));

  const box = { x: 190, y: 215, w: W - 380, h: H - 430 };
  const scale = Math.min(box.w / (maxX - minX), box.h / (maxY - minY));
  const tx = box.x + (box.w - (maxX - minX) * scale) / 2 - minX * scale;
  const ty = box.y + (box.h - (maxY - minY) * scale) / 2 - minY * scale;

  const faces = polygons
    .map(
      ({ fill, opacity, pts }) =>
        `<polygon points="${pts.map(([px, py]) => `${px.toFixed(1)},${py.toFixed(1)}`).join(" ")}" fill="${fill}" fill-opacity="${opacity}" stroke="${palette.dark}" stroke-opacity="0.45" stroke-width="3" stroke-linejoin="round"/>`,
    )
    .join("");

  const groundY = ty + maxY * scale;
  const horizon = `<line x1="0" y1="${groundY.toFixed(1)}" x2="${W}" y2="${groundY.toFixed(1)}" stroke="${palette.line}" stroke-opacity="0.28" stroke-width="2"/>`;

  return `<g opacity="0.95">${horizon}<g transform="translate(${tx.toFixed(1)} ${ty.toFixed(1)}) scale(${scale.toFixed(4)})">${faces}</g></g>`;
}

function drawPlanta(rnd) {
  const x0 = 250;
  const y0 = 210;
  const w = 1100;
  const h = 640;
  const t = 16;

  const walls = [
    `<rect x="${x0}" y="${y0}" width="${w}" height="${h}" fill="none" stroke="${palette.line}" stroke-opacity="0.75" stroke-width="${t}"/>`,
  ];

  const vx = [x0 + Math.round(w * (0.3 + rnd() * 0.1)), x0 + Math.round(w * (0.64 + rnd() * 0.1))];
  for (const x of vx) {
    walls.push(
      `<rect x="${x}" y="${y0}" width="${t}" height="${h}" fill="${palette.line}" fill-opacity="0.55"/>`,
    );
  }
  const hy = y0 + Math.round(h * (0.42 + rnd() * 0.16));
  walls.push(
    `<rect x="${vx[0]}" y="${hy}" width="${x0 + w - vx[0]}" height="${t}" fill="${palette.line}" fill-opacity="0.55"/>`,
  );

  const doors = [];
  for (let i = 0; i < 4; i++) {
    const dx = x0 + 120 + rnd() * (w - 260);
    const dy = y0 + 120 + rnd() * (h - 240);
    const r = 60;
    doors.push(
      `<path d="M ${dx} ${dy} L ${dx + r} ${dy} A ${r} ${r} 0 0 1 ${dx} ${dy + r}" fill="none" stroke="${palette.line}" stroke-opacity="0.5" stroke-width="3"/>`,
    );
  }

  const dims = [
    `<line x1="${x0}" y1="${y0 - 70}" x2="${x0 + w}" y2="${y0 - 70}" stroke="${palette.brass}" stroke-opacity="0.7" stroke-width="2"/>`,
    `<line x1="${x0}" y1="${y0 - 88}" x2="${x0}" y2="${y0 - 52}" stroke="${palette.brass}" stroke-opacity="0.7" stroke-width="2"/>`,
    `<line x1="${x0 + w}" y1="${y0 - 88}" x2="${x0 + w}" y2="${y0 - 52}" stroke="${palette.brass}" stroke-opacity="0.7" stroke-width="2"/>`,
    `<line x1="${x0 - 70}" y1="${y0}" x2="${x0 - 70}" y2="${y0 + h}" stroke="${palette.brass}" stroke-opacity="0.7" stroke-width="2"/>`,
  ];

  const furniture = [];
  for (let i = 0; i < 5; i++) {
    const fx = x0 + 60 + rnd() * (w - 260);
    const fy = y0 + 60 + rnd() * (h - 200);
    furniture.push(
      `<rect x="${fx.toFixed(0)}" y="${fy.toFixed(0)}" width="${(90 + rnd() * 130).toFixed(0)}" height="${(60 + rnd() * 90).toFixed(0)}" fill="none" stroke="${palette.line}" stroke-opacity="0.34" stroke-width="3"/>`,
    );
  }

  return `<g>${dims.join("")}${furniture.join("")}${walls.join("")}${doors.join("")}</g>`;
}

function drawEstructura(rnd) {
  const bays = 4 + Math.floor(rnd() * 2);
  const x0 = 190;
  const span = (W - x0 * 2) / bays;
  const base = 880;
  const top = 300;
  const ridge = 210;

  const parts = [
    `<line x1="80" y1="${base}" x2="${W - 80}" y2="${base}" stroke="${palette.line}" stroke-opacity="0.5" stroke-width="4"/>`,
  ];

  for (let i = 0; i <= bays; i++) {
    const x = x0 + span * i;
    parts.push(
      `<rect x="${(x - 11).toFixed(1)}" y="${top}" width="22" height="${base - top}" fill="${palette.light}" fill-opacity="0.75"/>`,
      `<rect x="${(x - 34).toFixed(1)}" y="${base}" width="68" height="26" fill="${palette.mid}" fill-opacity="0.9"/>`,
    );
  }

  // Cabriada a dos aguas.
  const mid = W / 2;
  parts.push(
    `<polyline points="${x0},${top} ${mid},${ridge} ${W - x0},${top}" fill="none" stroke="${palette.light}" stroke-opacity="0.8" stroke-width="20" stroke-linejoin="round"/>`,
    `<line x1="${x0}" y1="${top + 78}" x2="${W - x0}" y2="${top + 78}" stroke="${palette.light}" stroke-opacity="0.6" stroke-width="12"/>`,
  );

  for (let i = 0; i < 10; i++) {
    const tx = x0 + ((W - x0 * 2) / 10) * (i + 0.5);
    const chord = ridge + (Math.abs(tx - mid) / (mid - x0)) * (top - ridge);
    parts.push(
      `<line x1="${tx.toFixed(1)}" y1="${chord.toFixed(1)}" x2="${tx.toFixed(1)}" y2="${top + 78}" stroke="${palette.line}" stroke-opacity="0.4" stroke-width="5"/>`,
    );
  }

  // Arriostramientos en cruz en un tramo aleatorio.
  const braced = Math.floor(rnd() * bays);
  const bx = x0 + span * braced;
  parts.push(
    `<line x1="${bx}" y1="${top}" x2="${bx + span}" y2="${base}" stroke="${palette.brass}" stroke-opacity="0.55" stroke-width="6"/>`,
    `<line x1="${bx + span}" y1="${top}" x2="${bx}" y2="${base}" stroke="${palette.brass}" stroke-opacity="0.55" stroke-width="6"/>`,
  );

  return `<g>${parts.join("")}</g>`;
}

function drawDetalle(rnd) {
  const x0 = 260;
  const w = 1080;
  let y = 240;
  const layers = [];
  const thicknesses = [46, 26, 120, 22, 62, 30];

  thicknesses.forEach((thickness, index) => {
    const opacity = 0.24 + index * 0.09;
    layers.push(
      `<rect x="${x0}" y="${y}" width="${w}" height="${thickness}" fill="${palette.light}" fill-opacity="${opacity.toFixed(2)}" stroke="${palette.line}" stroke-opacity="0.55" stroke-width="2"/>`,
    );
    if (thickness > 100) {
      for (let i = 0; i < 14; i++) {
        const cx = x0 + 52 + i * ((w - 104) / 13);
        layers.push(
          `<circle cx="${cx.toFixed(1)}" cy="${y + 28}" r="9" fill="none" stroke="${palette.bright}" stroke-opacity="0.5" stroke-width="3"/>`,
          `<circle cx="${cx.toFixed(1)}" cy="${y + thickness - 28}" r="9" fill="none" stroke="${palette.bright}" stroke-opacity="0.5" stroke-width="3"/>`,
        );
      }
    }
    y += thickness;
  });

  const leaders = [];
  let ly = 260;
  for (let i = 0; i < 4; i++) {
    const targetY = ly + rnd() * 40;
    leaders.push(
      `<line x1="${x0 - 150}" y1="${targetY.toFixed(0)}" x2="${x0 + 120}" y2="${targetY.toFixed(0)}" stroke="${palette.brass}" stroke-opacity="0.65" stroke-width="2"/>`,
      `<circle cx="${x0 + 120}" cy="${targetY.toFixed(0)}" r="6" fill="${palette.brass}" fill-opacity="0.75"/>`,
    );
    ly += 78;
  }

  const ground = `<line x1="180" y1="${y + 40}" x2="${W - 180}" y2="${y + 40}" stroke="${palette.line}" stroke-opacity="0.45" stroke-width="3"/>`;

  return `<g>${layers.join("")}${leaders.join("")}${ground}</g>`;
}

const styles = {
  render: drawRender,
  planta: drawPlanta,
  estructura: drawEstructura,
  detalle: drawDetalle,
};

const styleLabels = {
  render: "Render",
  planta: "Planta",
  estructura: "Estructura",
  detalle: "Detalle",
};

/* ------------------------------------------------------------------ marco */

function buildSvg({ style, title, seedText }) {
  const rnd = mulberry32(hash(seedText));
  const artwork = styles[style](rnd);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Imagen de relleno">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${palette.base}"/>
      <stop offset="55%" stop-color="${palette.dark}"/>
      <stop offset="100%" stop-color="#1c1a18"/>
    </linearGradient>
    <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
      <path d="M 80 0 L 0 0 0 80" fill="none" stroke="${palette.line}" stroke-opacity="0.09" stroke-width="1.5"/>
    </pattern>
    <radialGradient id="vignette" cx="50%" cy="42%" r="72%">
      <stop offset="55%" stop-color="#000" stop-opacity="0"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0.45"/>
    </radialGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#grid)"/>
  ${artwork}
  <rect width="${W}" height="${H}" fill="url(#vignette)"/>

  <g font-family="Futura, 'Century Gothic', 'Trebuchet MS', sans-serif">
    <text x="72" y="96" fill="${palette.bright}" fill-opacity="0.85" font-size="26" font-weight="700" letter-spacing="6">${escapeXml(
      styleLabels[style].toUpperCase(),
    )}</text>
    <text x="72" y="134" fill="${palette.bright}" fill-opacity="0.5" font-size="22" letter-spacing="2">${escapeXml(title)}</text>

    <g transform="translate(72 ${H - 74})">
      <text x="0" y="0" fill="${palette.bright}" fill-opacity="0.9" font-size="34" font-weight="700" letter-spacing="1">F114</text>
      <line x1="86" y1="-26" x2="86" y2="6" stroke="${palette.bright}" stroke-opacity="0.5" stroke-width="2"/>
      <text x="104" y="0" fill="${palette.bright}" fill-opacity="0.6" font-size="20" letter-spacing="4">ESTUDIO DE ARQUITECTURA</text>
    </g>

    <text x="${W - 72}" y="${H - 74}" text-anchor="end" fill="${palette.brass}" fill-opacity="0.85" font-size="18" font-weight="700" letter-spacing="4">IMAGEN DE RELLENO</text>
  </g>
</svg>
`;
}

/* ------------------------------------------------------------ generación */

function readProjects() {
  const source = readFileSync(join(root, "src", "data", "projects.ts"), "utf8");
  const entries = [];

  const slugRe = /slug:\s*"([^"]+)"/g;
  const titleRe = /title:\s*"([^"]+)"/g;
  const srcRe = /src:\s*"(\/proyectos\/[^"]+)"/g;
  const coverRe = /cover:\s*"(\/proyectos\/[^"]+)"/g;

  const slugs = [...source.matchAll(slugRe)].map((m) => m[1]);
  const titles = [...source.matchAll(titleRe)].map((m) => m[1]);
  const covers = [...source.matchAll(coverRe)].map((m) => m[1]);
  const galleryPaths = [...source.matchAll(srcRe)].map((m) => m[1]);

  slugs.forEach((slug, index) => {
    const title = titles[index] ?? slug;
    const files = [covers[index], ...galleryPaths.filter((p) => p.startsWith(`/proyectos/${slug}/`))];
    entries.push({ slug, title, files: files.filter(Boolean) });
  });

  return entries;
}

const styleOrder = ["render", "render", "planta", "estructura", "detalle"];

let written = 0;
for (const project of readProjects()) {
  project.files.forEach((file, index) => {
    const style = styleOrder[Math.min(index, styleOrder.length - 1)];
    const target = join(publicDir, file.replace(/^\//, ""));
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(
      target,
      buildSvg({ style, title: project.title, seedText: `${project.slug}-${index}` }),
      "utf8",
    );
    written += 1;
  });
}

console.log(`Generadas ${written} imágenes de relleno en public/proyectos/`);
