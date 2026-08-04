/**
 * Catálogo de proyectos.
 *
 * PENDIENTE: todos los proyectos de este archivo son de relleno y las imágenes
 * son placeholders generados. Para cargar los reales:
 *   1. Copiar las fotos/renders en `public/proyectos/<slug>/`.
 *   2. Actualizar `cover` y `gallery` con esas rutas.
 *   3. Editar los textos y quitar `placeholder: true`.
 * El `slug` define la URL de la ficha: /proyectos/<slug>
 */

export type ServiceLine = "Anteproyecto" | "Cálculo estructural" | "Proyecto";

export const serviceLines: ServiceLine[] = [
  "Anteproyecto",
  "Cálculo estructural",
  "Proyecto",
];

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
  featured?: boolean;
  placeholder?: boolean;
};

export const projects: Project[] = [
  {
    slug: "vivienda-patio-norte",
    title: "Vivienda Patio Norte",
    summary:
      "Vivienda unifamiliar de dos niveles organizada alrededor de un patio central que ordena la ventilación cruzada y el asoleamiento.",
    serviceLines: ["Anteproyecto", "Proyecto"],
    typology: "Vivienda unifamiliar",
    location: "Resistencia, Chaco",
    year: 2024,
    area: "245 m²",
    status: "Obra finalizada",
    client: "Comitente particular",
    systems: ["Hormigón armado", "Mampostería portante", "Tabiquería de placa de yeso"],
    scope: [
      "Anteproyecto y desarrollo de partido arquitectónico",
      "Modelado 3D y renders de presentación",
      "Documentación municipal para permiso de obra",
      "Cómputo y presupuesto de obra completa",
    ],
    description: [
      "El encargo planteaba una vivienda para una familia de cuatro integrantes en un lote entre medianeras de proporción alargada. La estrategia fue liberar un patio en el tercio central del terreno para que todos los locales principales reciban luz natural y ventilación cruzada.",
      "El programa se resuelve en dos niveles: en planta baja el área social se vuelca al patio mediante una carpintería corrediza de piso a techo, mientras que en planta alta los dormitorios se retiran de la línea municipal para generar una terraza protegida.",
      "El desarrollo se acompañó con modelado tridimensional y renders realistas que permitieron validar materialidad, terminaciones y comportamiento de la luz antes del inicio de la obra.",
    ],
    cover: "/proyectos/vivienda-patio-norte/portada.svg",
    coverAlt: "Imagen de relleno del proyecto Vivienda Patio Norte",
    gallery: [
      {
        src: "/proyectos/vivienda-patio-norte/01.svg",
        alt: "Imagen de relleno: vista exterior",
        caption: "Vista exterior desde la calle",
      },
      {
        src: "/proyectos/vivienda-patio-norte/02.svg",
        alt: "Imagen de relleno: planta de arquitectura",
        caption: "Planta baja — distribución general",
      },
      {
        src: "/proyectos/vivienda-patio-norte/03.svg",
        alt: "Imagen de relleno: render interior",
        caption: "Render del área social hacia el patio",
      },
      {
        src: "/proyectos/vivienda-patio-norte/04.svg",
        alt: "Imagen de relleno: detalle constructivo",
        caption: "Detalle de encuentro entre losa y carpintería",
      },
    ],
    featured: true,
    placeholder: true,
  },
  {
    slug: "nave-industrial-ruta-11",
    title: "Nave Industrial Ruta 11",
    summary:
      "Galpón de 1.200 m² resuelto con pórticos de perfiles laminados en caliente y cerramiento de chapa autoportante.",
    serviceLines: ["Cálculo estructural", "Proyecto"],
    typology: "Industria y logística",
    location: "Resistencia, Chaco",
    year: 2024,
    area: "1.200 m²",
    status: "En obra",
    client: "Empresa de logística",
    systems: [
      "Perfiles laminados en caliente",
      "Fundaciones de hormigón armado",
      "Cubierta metálica autoportante",
    ],
    scope: [
      "Cálculo y verificación estructural según reglamentos CIRSOC",
      "Planos de replanteo, fundaciones y despiece metálico",
      "Memoria de cálculo y planilla de cargas",
      "Cómputo de acero y hormigón",
    ],
    description: [
      "La nave se resuelve con pórticos metálicos de alma llena separados cada 6 metros, con una luz libre interior que permite la circulación de autoelevadores sin apoyos intermedios.",
      "El dimensionamiento contempló las acciones de viento propias de la zona y las sobrecargas de puente grúa previstas para la etapa siguiente, dejando la estructura preparada para una futura ampliación.",
      "La documentación incluyó planos de taller para el montaje, memoria de cálculo completa y el cómputo métrico de acero y hormigón utilizado en la contratación.",
    ],
    cover: "/proyectos/nave-industrial-ruta-11/portada.svg",
    coverAlt: "Imagen de relleno del proyecto Nave Industrial Ruta 11",
    gallery: [
      {
        src: "/proyectos/nave-industrial-ruta-11/01.svg",
        alt: "Imagen de relleno: esquema estructural",
        caption: "Esquema de pórticos y arriostramientos",
      },
      {
        src: "/proyectos/nave-industrial-ruta-11/02.svg",
        alt: "Imagen de relleno: planta de fundaciones",
        caption: "Planta de fundaciones y bases",
      },
      {
        src: "/proyectos/nave-industrial-ruta-11/03.svg",
        alt: "Imagen de relleno: montaje en obra",
        caption: "Montaje de la estructura metálica",
      },
    ],
    featured: true,
    placeholder: true,
  },
  {
    slug: "edificio-belgrano-42",
    title: "Edificio Belgrano 42",
    summary:
      "Edificio de ocho unidades en altura con estructura independiente de hormigón armado y locales comerciales en planta baja.",
    serviceLines: ["Cálculo estructural", "Proyecto"],
    typology: "Vivienda colectiva",
    location: "Resistencia, Chaco",
    year: 2023,
    area: "980 m²",
    status: "Obra finalizada",
    client: "Desarrollo privado",
    systems: [
      "Hormigón armado",
      "Losas alivianadas",
      "Tabiquería de placa de yeso",
    ],
    scope: [
      "Cálculo estructural integral del edificio",
      "Documentación ejecutiva de arquitectura",
      "Planos de instalaciones coordinados",
      "Cómputo y presupuesto por rubro",
    ],
    description: [
      "El edificio combina locales comerciales sobre la línea municipal con siete unidades de vivienda distribuidas en tres niveles y una unidad en el retiro superior.",
      "La estructura se resolvió con un sistema independiente de columnas y vigas de hormigón armado, con losas alivianadas que permitieron reducir peso propio y liberar el subsuelo de apoyos intermedios.",
      "Se elaboró la documentación ejecutiva completa, incluyendo planillas de locales, detalles constructivos y coordinación con las instalaciones sanitarias, eléctricas y de gas.",
    ],
    cover: "/proyectos/edificio-belgrano-42/portada.svg",
    coverAlt: "Imagen de relleno del proyecto Edificio Belgrano 42",
    gallery: [
      {
        src: "/proyectos/edificio-belgrano-42/01.svg",
        alt: "Imagen de relleno: fachada",
        caption: "Fachada sobre calle Belgrano",
      },
      {
        src: "/proyectos/edificio-belgrano-42/02.svg",
        alt: "Imagen de relleno: planta tipo",
        caption: "Planta tipo de unidades",
      },
      {
        src: "/proyectos/edificio-belgrano-42/03.svg",
        alt: "Imagen de relleno: esquema estructural",
        caption: "Esquema de columnas y vigas",
      },
    ],
    placeholder: true,
  },
  {
    slug: "casa-modular-el-alto",
    title: "Casa Modular El Alto",
    summary:
      "Vivienda de 96 m² ejecutada en steel framing con perfiles conformados en frío y montaje en seco sobre platea de hormigón.",
    serviceLines: ["Anteproyecto", "Cálculo estructural"],
    typology: "Vivienda unifamiliar",
    location: "Resistencia, Chaco",
    year: 2023,
    area: "96 m²",
    status: "Obra finalizada",
    client: "Comitente particular",
    systems: [
      "Perfiles conformados en frío (steel framing)",
      "Platea de hormigón armado",
      "Placa de yeso y placa cementicia",
    ],
    scope: [
      "Anteproyecto y renders de presentación",
      "Cálculo de perfilería y verificación de paneles",
      "Planos de paneles y despiece de montaje",
      "Cómputo de materiales del sistema en seco",
    ],
    description: [
      "El proyecto respondió a un requerimiento de plazos ajustados, por lo que se optó por un sistema de construcción en seco con perfiles conformados en frío montados sobre una platea de hormigón armado.",
      "Cada panel fue calculado y documentado individualmente, lo que permitió prefabricar en taller y reducir el tiempo de montaje en obra a menos de tres semanas.",
      "La resolución de aislaciones térmicas e hidrófugas se estudió en detalle para asegurar el desempeño del sistema frente a las condiciones climáticas de la región.",
    ],
    cover: "/proyectos/casa-modular-el-alto/portada.svg",
    coverAlt: "Imagen de relleno del proyecto Casa Modular El Alto",
    gallery: [
      {
        src: "/proyectos/casa-modular-el-alto/01.svg",
        alt: "Imagen de relleno: render exterior",
        caption: "Render exterior de la vivienda",
      },
      {
        src: "/proyectos/casa-modular-el-alto/02.svg",
        alt: "Imagen de relleno: despiece de paneles",
        caption: "Despiece de paneles de perfilería",
      },
      {
        src: "/proyectos/casa-modular-el-alto/03.svg",
        alt: "Imagen de relleno: montaje en seco",
        caption: "Montaje de la estructura en seco",
      },
    ],
    placeholder: true,
  },
  {
    slug: "centro-comercial-mitre",
    title: "Centro Comercial Mitre",
    summary:
      "Reconversión de un galpón existente en un paseo comercial de doce locales, con refuerzo estructural y nueva envolvente.",
    serviceLines: ["Anteproyecto", "Proyecto"],
    typology: "Comercial",
    location: "Resistencia, Chaco",
    year: 2022,
    area: "760 m²",
    status: "Obra finalizada",
    client: "Inversores privados",
    systems: [
      "Refuerzo de hormigón armado",
      "Perfiles laminados en caliente",
      "Tabiquería de placa de yeso",
    ],
    scope: [
      "Relevamiento del edificio existente",
      "Anteproyecto de reconversión y renders",
      "Verificación estructural de la nave existente",
      "Cómputo, presupuesto y pliego de licitación",
    ],
    description: [
      "El punto de partida fue un galpón en desuso con una estructura metálica en buen estado general pero sin capacidad para las nuevas cargas previstas en el entrepiso comercial.",
      "Tras el relevamiento y la verificación estructural se definió un esquema de refuerzos puntuales que permitió conservar la nave original y sumar un entrepiso de hormigón sobre estructura mixta.",
      "La nueva envolvente reinterpreta el perfil industrial del edificio con una fachada ventilada que unifica la imagen del conjunto y resuelve la cartelería de los locales.",
    ],
    cover: "/proyectos/centro-comercial-mitre/portada.svg",
    coverAlt: "Imagen de relleno del proyecto Centro Comercial Mitre",
    gallery: [
      {
        src: "/proyectos/centro-comercial-mitre/01.svg",
        alt: "Imagen de relleno: render de fachada",
        caption: "Render de la nueva fachada",
      },
      {
        src: "/proyectos/centro-comercial-mitre/02.svg",
        alt: "Imagen de relleno: planta general",
        caption: "Planta general de locales",
      },
      {
        src: "/proyectos/centro-comercial-mitre/03.svg",
        alt: "Imagen de relleno: refuerzos estructurales",
        caption: "Esquema de refuerzos estructurales",
      },
    ],
    featured: true,
    placeholder: true,
  },
  {
    slug: "ampliacion-consultorios-sur",
    title: "Ampliación Consultorios Sur",
    summary:
      "Ampliación de un centro médico con tabiquería en seco, resuelta por etapas para mantener la actividad durante la obra.",
    serviceLines: ["Anteproyecto", "Proyecto"],
    typology: "Salud",
    location: "Resistencia, Chaco",
    year: 2022,
    area: "180 m²",
    status: "Obra finalizada",
    client: "Centro médico privado",
    systems: [
      "Tabiquería de placa de yeso",
      "Estructura metálica liviana",
      "Cielorrasos suspendidos",
    ],
    scope: [
      "Anteproyecto y estudio de circulaciones",
      "Documentación ejecutiva y detalles",
      "Planificación de obra por etapas",
      "Cómputo y presupuesto detallado",
    ],
    description: [
      "La ampliación sumó cuatro consultorios y una sala de espera secundaria sobre un sector de patio existente, sin interrumpir la atención en el resto del edificio.",
      "El uso de tabiquería en seco permitió reducir tiempos, ruido y generación de escombros, aspectos críticos en un edificio en funcionamiento.",
      "El proyecto incluyó el estudio de circulaciones diferenciadas entre pacientes y personal, y la resolución de accesibilidad en todo el recorrido.",
    ],
    cover: "/proyectos/ampliacion-consultorios-sur/portada.svg",
    coverAlt: "Imagen de relleno del proyecto Ampliación Consultorios Sur",
    gallery: [
      {
        src: "/proyectos/ampliacion-consultorios-sur/01.svg",
        alt: "Imagen de relleno: interior de sala de espera",
        caption: "Sala de espera secundaria",
      },
      {
        src: "/proyectos/ampliacion-consultorios-sur/02.svg",
        alt: "Imagen de relleno: planta de la ampliación",
        caption: "Planta de la ampliación",
      },
      {
        src: "/proyectos/ampliacion-consultorios-sur/03.svg",
        alt: "Imagen de relleno: detalle de tabiquería",
        caption: "Detalle de tabique y cielorraso",
      },
    ],
    placeholder: true,
  },
  {
    slug: "deposito-logistico-km-8",
    title: "Depósito Logístico KM 8",
    summary:
      "Depósito de almacenaje en altura con estructura mixta y verificación de la interacción entre racks y estructura principal.",
    serviceLines: ["Cálculo estructural"],
    typology: "Industria y logística",
    location: "Resistencia, Chaco",
    year: 2021,
    area: "2.100 m²",
    status: "Obra finalizada",
    client: "Operador logístico",
    systems: [
      "Perfiles laminados en caliente",
      "Perfiles conformados en frío",
      "Pisos industriales de hormigón",
    ],
    scope: [
      "Cálculo estructural de la nave y del entrepiso",
      "Verificación de bases y pisos industriales",
      "Memoria de cálculo y documentación técnica",
      "Asesoramiento durante el montaje",
    ],
    description: [
      "El depósito se proyectó para almacenaje en altura, con una estructura principal de perfiles laminados en caliente y correas de perfiles conformados en frío.",
      "El cálculo incorporó las cargas transmitidas por los sistemas de estanterías y su interacción con la estructura, además del análisis de las acciones de viento sobre la cubierta.",
      "El piso industrial se dimensionó considerando el tránsito de autoelevadores y las cargas puntuales de las bases de los racks.",
    ],
    cover: "/proyectos/deposito-logistico-km-8/portada.svg",
    coverAlt: "Imagen de relleno del proyecto Depósito Logístico KM 8",
    gallery: [
      {
        src: "/proyectos/deposito-logistico-km-8/01.svg",
        alt: "Imagen de relleno: modelo estructural",
        caption: "Modelo de cálculo de la estructura",
      },
      {
        src: "/proyectos/deposito-logistico-km-8/02.svg",
        alt: "Imagen de relleno: corte transversal",
        caption: "Corte transversal del depósito",
      },
      {
        src: "/proyectos/deposito-logistico-km-8/03.svg",
        alt: "Imagen de relleno: detalle de base",
        caption: "Detalle de base y anclaje de columna",
      },
    ],
    placeholder: true,
  },
  {
    slug: "quincho-los-alamos",
    title: "Quincho Los Álamos",
    summary:
      "Espacio de usos múltiples con cubierta de gran voladizo y cerramiento perimetral en bloques de hormigón visto.",
    serviceLines: ["Anteproyecto", "Cálculo estructural", "Proyecto"],
    typology: "Vivienda unifamiliar",
    location: "Resistencia, Chaco",
    year: 2021,
    area: "120 m²",
    status: "Obra finalizada",
    client: "Comitente particular",
    systems: [
      "Hormigón armado",
      "Bloques de hormigón visto",
      "Perfiles laminados en caliente",
    ],
    scope: [
      "Anteproyecto, modelado 3D y renders",
      "Cálculo del voladizo y de la estructura de cubierta",
      "Documentación ejecutiva y detalles",
      "Cómputo y presupuesto de obra",
    ],
    description: [
      "El encargo consistió en un espacio de reunión abierto al parque, con una cubierta capaz de generar sombra sin apoyos que interrumpieran la visual hacia el fondo del terreno.",
      "La solución fue una losa de hormigón armado con un voladizo de 3,60 metros apoyada sobre un núcleo rígido que concentra la parrilla, el baño y el sector de servicio.",
      "El cerramiento perimetral en bloques de hormigón visto reduce el mantenimiento y define un contraste material con la carpintería metálica y la madera de la pérgola.",
    ],
    cover: "/proyectos/quincho-los-alamos/portada.svg",
    coverAlt: "Imagen de relleno del proyecto Quincho Los Álamos",
    gallery: [
      {
        src: "/proyectos/quincho-los-alamos/01.svg",
        alt: "Imagen de relleno: vista del voladizo",
        caption: "Vista del voladizo hacia el parque",
      },
      {
        src: "/proyectos/quincho-los-alamos/02.svg",
        alt: "Imagen de relleno: planta general",
        caption: "Planta general del quincho",
      },
      {
        src: "/proyectos/quincho-los-alamos/03.svg",
        alt: "Imagen de relleno: detalle de losa",
        caption: "Detalle de armado de la losa en voladizo",
      },
    ],
    placeholder: true,
  },
  {
    slug: "vivienda-retak-el-pinar",
    title: "Vivienda Retak El Pinar",
    summary:
      "Vivienda de una planta construida con bloques Retak, con aislación térmica integrada en la envolvente.",
    serviceLines: ["Anteproyecto", "Cálculo estructural"],
    typology: "Vivienda unifamiliar",
    location: "Resistencia, Chaco",
    year: 2020,
    area: "134 m²",
    status: "Obra finalizada",
    client: "Comitente particular",
    systems: [
      "Bloques Retak",
      "Hormigón armado",
      "Cubierta de estructura metálica",
    ],
    scope: [
      "Anteproyecto y renders de presentación",
      "Cálculo de encadenados y verificación de muros",
      "Documentación para permiso de obra",
      "Cómputo y presupuesto",
    ],
    description: [
      "La vivienda se desarrolla en una sola planta, con el área social orientada al norte y los dormitorios protegidos del asoleamiento del oeste por una galería.",
      "Se adoptó el sistema Retak por su desempeño térmico y su velocidad de ejecución, resolviendo la envolvente y la aislación en una única operación constructiva.",
      "El cálculo comprendió los encadenados verticales y horizontales, la verificación de los muros y el dimensionamiento de la estructura metálica de la cubierta.",
    ],
    cover: "/proyectos/vivienda-retak-el-pinar/portada.svg",
    coverAlt: "Imagen de relleno del proyecto Vivienda Retak El Pinar",
    gallery: [
      {
        src: "/proyectos/vivienda-retak-el-pinar/01.svg",
        alt: "Imagen de relleno: render exterior",
        caption: "Render exterior desde el jardín",
      },
      {
        src: "/proyectos/vivienda-retak-el-pinar/02.svg",
        alt: "Imagen de relleno: planta de arquitectura",
        caption: "Planta de arquitectura",
      },
      {
        src: "/proyectos/vivienda-retak-el-pinar/03.svg",
        alt: "Imagen de relleno: detalle de muro",
        caption: "Detalle de muro y encadenado",
      },
    ],
    placeholder: true,
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getProjectNeighbours(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) return { previous: undefined, next: undefined };

  return {
    previous: projects[(index - 1 + projects.length) % projects.length],
    next: projects[(index + 1) % projects.length],
  };
}
