export type Service = {
  id: string;
  number: string;
  title: string;
  summary: string;
  items: string[];
};

export const services: Service[] = [
  {
    id: "anteproyecto",
    number: "01",
    title: "Anteproyecto",
    summary:
      "La etapa donde la idea toma forma y se vuelve verificable: partido arquitectónico, imagen del proyecto y una previsión de costos realista.",
    items: [
      "Relevamiento del terreno y análisis normativo",
      "Partido arquitectónico y plantas de distribución",
      "Modelado 3D del conjunto",
      "Renders realistas de exterior e interior",
      "Cómputo métrico por rubro",
      "Presupuesto estimado de obra",
    ],
  },
  {
    id: "calculo-estructural",
    number: "02",
    title: "Cálculo estructural",
    summary:
      "Dimensionamiento y verificación de la estructura según reglamento, con la documentación necesaria para construirla y controlarla.",
    items: [
      "Análisis de cargas y predimensionado",
      "Cálculo de hormigón armado y fundaciones",
      "Estructuras metálicas laminadas y conformadas en frío",
      "Verificación de mampostería y encadenados",
      "Memoria de cálculo y planillas de armaduras",
      "Planos de replanteo y despiece",
    ],
  },
  {
    id: "proyecto",
    number: "03",
    title: "Proyecto",
    summary:
      "La documentación completa para licitar y construir, con el nivel de detalle que evita improvisaciones en obra.",
    items: [
      "Documentación ejecutiva de arquitectura",
      "Detalles constructivos y planillas de locales",
      "Coordinación de instalaciones",
      "Documentación para permiso municipal",
      "Pliegos y planilla de cotización",
      "Asistencia técnica durante la obra",
    ],
  },
];

export type ConstructionSystem = {
  name: string;
  description: string;
};

export const constructionSystems: ConstructionSystem[] = [
  {
    name: "Hormigón armado",
    description:
      "Fundaciones, columnas, vigas, losas macizas y alivianadas, tabiques y estructuras en voladizo.",
  },
  {
    name: "Perfiles laminados en caliente",
    description:
      "Pórticos, cabriadas y entrepisos metálicos para naves industriales, depósitos y ampliaciones.",
  },
  {
    name: "Perfiles conformados en frío",
    description:
      "Steel framing, correas y estructuras livianas con cálculo de paneles y despiece de montaje.",
  },
  {
    name: "Placa de yeso (Durlock)",
    description:
      "Tabiquería interior, cielorrasos suspendidos y revestimientos con resolución de aislaciones.",
  },
  {
    name: "Bloques Retak",
    description:
      "Envolventes con aislación térmica integrada, encadenados verticales y horizontales verificados.",
  },
  {
    name: "Mampostería tradicional",
    description:
      "Muros portantes y de cerramiento, con verificación de esbeltez, cargas y refuerzos.",
  },
];

export type ProcessStep = {
  number: string;
  title: string;
  text: string;
};

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Consulta inicial",
    text: "Escuchamos el requerimiento, revisamos el terreno o el edificio existente y definimos el alcance del trabajo.",
  },
  {
    number: "02",
    title: "Anteproyecto",
    text: "Presentamos el partido arquitectónico con plantas, modelado 3D y renders, junto a un cómputo y presupuesto preliminar.",
  },
  {
    number: "03",
    title: "Cálculo y proyecto",
    text: "Dimensionamos la estructura y desarrollamos la documentación ejecutiva completa, coordinada con las instalaciones.",
  },
  {
    number: "04",
    title: "Obra",
    text: "Entregamos la documentación para licitar y acompañamos técnicamente la ejecución hasta la finalización.",
  },
];

export type TeamMember = {
  role: string;
  title: string;
  description: string;
  focus: string[];
};

export const team: TeamMember[] = [
  {
    role: "Arquitecto",
    title: "Diseño y proyecto",
    description:
      "Define el partido arquitectónico, la materialidad y la documentación de proyecto, desde el anteproyecto hasta los detalles constructivos.",
    focus: ["Partido arquitectónico", "Modelado 3D y renders", "Documentación ejecutiva"],
  },
  {
    role: "Maestro mayor de obras",
    title: "Obra y costos",
    description:
      "Traduce el proyecto a términos de obra: procedimientos, plazos, cómputo métrico y presupuesto, además del seguimiento técnico en el terreno.",
    focus: ["Cómputo y presupuesto", "Planificación de obra", "Seguimiento técnico"],
  },
  {
    role: "Ingeniero",
    title: "Cálculo estructural",
    description:
      "Dimensiona y verifica la estructura en hormigón armado, acero y sistemas livianos, y elabora las memorias de cálculo correspondientes.",
    focus: ["Análisis de cargas", "Memoria de cálculo", "Planos de estructura"],
  },
];
