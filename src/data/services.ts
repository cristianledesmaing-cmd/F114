export type Service = {
  id: string;
  number: string;
  title: string;
  summary: string;
  items: string[];
  cta: string;
  whatsappMessage: string;
};

export const services: Service[] = [
  {
    id: "proyecto",
    number: "01",
    title: "Proyecto",
    summary:
      "Para construir o ampliar. Desarrollamos el diseño, resolvemos la estructura y preparamos la documentación para construir.",
    items: [
      "Anteproyecto y modelado 3D",
      "Cálculo estructural y planos ejecutivos",
      "Cómputo y presupuesto estimado",
    ],
    cta: "Consultar por un proyecto",
    whatsappMessage: "Hola, quisiera consultar por un proyecto con Nodo.",
  },
  {
    id: "obra",
    number: "02",
    title: "Dirección de obra",
    summary:
      "Para llevar un proyecto a obra. Acompañamos las decisiones técnicas durante la ejecución y coordinamos con quienes construyen.",
    items: [
      "Visitas y revisión de avances",
      "Revisión de lo ejecutado según planos",
      "Resolución de consultas y cambios en obra",
    ],
    cta: "Consultar por una obra",
    whatsappMessage: "Hola, quisiera consultar por dirección de obra con Nodo.",
  },
  {
    id: "consultoria",
    number: "03",
    title: "Consultoría técnica",
    summary:
      "Para resolver una duda puntual antes de decidir cómo avanzar. Revisamos la información disponible y planteamos próximos pasos.",
    items: [
      "Evaluación inicial de ampliaciones",
      "Revisión de planos o documentación",
      "Análisis de alternativas constructivas",
    ],
    cta: "Plantear una consulta",
    whatsappMessage: "Hola, quisiera plantear una consulta técnica con Nodo.",
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
    title: "Entendemos tu situación",
    text: "Nos contás qué querés resolver, dónde es la obra y con qué información ya contás.",
  },
  {
    number: "02",
    title: "Acordamos el alcance",
    text: "Definimos las tareas, quién interviene y qué documentación, visitas o devoluciones están incluidas.",
  },
  {
    number: "03",
    title: "Trabajamos sobre lo acordado",
    text: "Desarrollamos el proyecto, dirigimos la obra o te damos una devolución técnica, según el servicio contratado.",
  },
];

export type TeamMember = {
  name: string;
  role: string;
  /** Foto de perfil opcional; si falta, se reserva el espacio visual. */
  photo?: string;
};

export const team: TeamMember[] = [
  {
    name: "Cristian Ledesma",
    role: "Ingeniero · Proyecto de estructuras",
    photo: "/team/ingeniero-calculo.png",
  },
  {
    name: "Claus Ferreyra",
    role: "Ingeniero · Proyecto y construcción",
    photo: "/team/ingeniero-direccion.jpg",
  },
  {
    name: "Basilio Excequiel Riccardi",
    role: "Diseño arquitectónico",
    photo: "/team/basilio-riccardi.png",
  },
];

export const heroPillars = [
  { number: "01", label: "Proyecto" },
  { number: "02", label: "Dirección de obra" },
  { number: "03", label: "Consultoría técnica" },
] as const;
