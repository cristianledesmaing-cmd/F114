import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowIcon, MailIcon, WhatsappIcon } from "@/components/ui/icons";
import { getProject, getProjectNeighbours, projects } from "@/data/projects";
import { emailHref, site, whatsappHref } from "@/data/site";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/proyectos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return { title: "Proyecto no encontrado" };
  }

  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/proyectos/${project.slug}/` },
    openGraph: {
      type: "article",
      title: `${project.title} | ${site.name}`,
      description: project.summary,
      url: `${site.url}/proyectos/${project.slug}/`,
    },
  };
}

export default async function ProjectPage({ params }: PageProps<"/proyectos/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const { previous, next } = getProjectNeighbours(project.slug);

  const facts = [
    { label: "Tipología", value: project.typology },
    { label: "Ubicación", value: project.location },
    { label: "Año", value: String(project.year) },
    { label: "Superficie", value: project.area },
    { label: "Estado", value: project.status },
    { label: "Comitente", value: project.client },
  ];

  return (
    <article>
      <header className="bg-ink relative isolate overflow-hidden text-white">
        <div className="absolute inset-0">
          <Image
            src={project.cover}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-45"
          />
        </div>
        <div
          aria-hidden="true"
          className="from-ink via-ink/85 absolute inset-0 bg-gradient-to-t to-transparent"
        />

        <Container width="wide" className="relative">
          <div className="flex min-h-[70svh] flex-col justify-end pt-36 pb-16 lg:pt-44 lg:pb-20">
            <nav aria-label="Migas de pan" className="text-sand/75 text-sm">
              <Link href="/" className="hover:text-white">
                Inicio
              </Link>
              <span aria-hidden="true" className="px-2">
                /
              </span>
              <Link href="/#proyectos" className="hover:text-white">
                Proyectos
              </Link>
            </nav>

            <ul className="mt-8 flex flex-wrap gap-2">
              {project.serviceLines.map((line) => (
                <li
                  key={line}
                  className="text-sand rounded-full border border-white/25 px-3.5 py-1.5 text-xs font-semibold"
                >
                  {line}
                </li>
              ))}
            </ul>

            <h1 className="mt-6 max-w-4xl text-4xl leading-[1.05] font-bold text-justify sm:text-5xl lg:text-6xl">
              {project.title}
            </h1>
            <p className="text-sand/85 mt-6 max-w-2xl text-lg leading-relaxed text-justify">
              {project.summary}
            </p>
          </div>
        </Container>
      </header>

      <section className="bg-bone py-20 lg:py-28">
        <Container width="wide">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
            <Reveal className="lg:sticky lg:top-28 lg:self-start">
              <h2 className="text-overline text-brass-ink">Ficha técnica</h2>
              <dl className="border-charcoal/10 mt-6 border-t">
                {facts.map((fact) => (
                  <div
                    key={fact.label}
                    className="border-charcoal/10 flex items-baseline justify-between gap-6 border-b py-4"
                  >
                    <dt className="text-stone text-sm">{fact.label}</dt>
                    <dd className="text-charcoal text-right text-sm font-semibold">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <h3 className="text-overline text-brass-ink mt-12">Sistemas constructivos</h3>
              <ul className="mt-5 space-y-2.5">
                {project.systems.map((system) => (
                  <li key={system} className="text-graphite flex gap-3 text-sm leading-relaxed">
                    <span aria-hidden="true" className="bg-brass mt-2 h-1 w-3.5 shrink-0" />
                    {system}
                  </li>
                ))}
              </ul>
            </Reveal>

            <div>
              <Reveal>
                <h2 className="text-charcoal text-2xl leading-snug font-bold text-balance sm:text-3xl">
                  Sobre el proyecto
                </h2>
                <div className="mt-7 space-y-6">
                  {project.description.map((paragraph, index) => (
                    <p key={index} className="text-graphite text-lg leading-relaxed text-justify">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={100} className="mt-14">
                <h2 className="text-overline text-brass-ink">Alcance del trabajo</h2>
                <ul className="border-charcoal/10 mt-6 grid gap-px border sm:grid-cols-2">
                  {project.scope.map((item) => (
                    <li
                      key={item}
                      className="text-charcoal bg-bone p-5 text-sm leading-relaxed shadow-[0_0_0_1px_rgba(58,54,51,0.1)]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      <section id="galeria" className="bg-carbon scroll-mt-24 py-20 text-white lg:py-28">
        <Container width="wide">
          <Reveal>
            <h2 className="text-overline text-brass-ink flex items-center gap-3">
              <span aria-hidden="true" className="bg-brass/60 inline-block h-px w-8" />
              Galería
            </h2>
            <p className="mt-4 text-2xl font-bold text-balance sm:text-3xl">
              Documentación e imágenes del proyecto
            </p>
          </Reveal>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:mt-14">
            {project.gallery.map((image, index) => (
              <Reveal
                key={image.src}
                delay={(index % 2) * 100}
                className={index === 0 ? "sm:col-span-2" : undefined}
              >
                <figure>
                  <div
                    className={`bg-ink relative overflow-hidden ${
                      index === 0 ? "aspect-[16/9]" : "aspect-[4/3]"
                    }`}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes={
                        index === 0
                          ? "(min-width: 640px) 90vw, 100vw"
                          : "(min-width: 640px) 45vw, 100vw"
                      }
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="text-sand/75 mt-3 text-sm">{image.caption}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>

          {project.placeholder ? (
            <p className="text-sand/75 mt-12 border-t border-white/10 pt-8 text-sm">
              Las imágenes de esta ficha son de relleno mientras se carga el material definitivo del
              proyecto.
            </p>
          ) : null}
        </Container>
      </section>

      <section className="bg-bone py-16 lg:py-20">
        <Container width="wide">
          <nav
            aria-label="Navegación entre proyectos"
            className="border-charcoal/10 grid gap-px border sm:grid-cols-2"
          >
            {previous ? (
              <Link
                href={`/proyectos/${previous.slug}`}
                className="group bg-bone hover:bg-charcoal p-7 shadow-[0_0_0_1px_rgba(58,54,51,0.1)] transition-colors duration-400 sm:p-8"
              >
                <span className="text-overline text-stone group-hover:text-sand flex items-center gap-2 transition-colors">
                  <ArrowIcon className="h-4 w-4 rotate-180" />
                  Proyecto anterior
                </span>
                <span className="text-charcoal mt-3 block text-xl font-bold transition-colors duration-400 group-hover:text-white">
                  {previous.title}
                </span>
              </Link>
            ) : (
              <span />
            )}

            {next ? (
              <Link
                href={`/proyectos/${next.slug}`}
                className="group bg-bone hover:bg-charcoal p-7 text-right shadow-[0_0_0_1px_rgba(58,54,51,0.1)] transition-colors duration-400 sm:p-8"
              >
                <span className="text-overline text-stone group-hover:text-sand flex items-center justify-end gap-2 transition-colors">
                  Proyecto siguiente
                  <ArrowIcon className="h-4 w-4" />
                </span>
                <span className="text-charcoal mt-3 block text-xl font-bold transition-colors duration-400 group-hover:text-white">
                  {next.title}
                </span>
              </Link>
            ) : (
              <span />
            )}
          </nav>

          <div className="border-charcoal/10 mt-12 flex flex-col items-start justify-between gap-6 border-t pt-12 sm:flex-row sm:items-center">
            <p className="text-charcoal max-w-md text-xl font-bold text-balance">
              ¿Tenés un proyecto parecido en mente?
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer noopener"
                className="bg-charcoal hover:bg-ink inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white transition-colors"
              >
                <WhatsappIcon className="h-4 w-4" />
                Consultar por WhatsApp
              </a>
              <a
                href={emailHref}
                className="border-charcoal/25 text-charcoal hover:border-charcoal inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold transition-colors"
              >
                <MailIcon className="h-4 w-4" />
                Escribirnos
              </a>
            </div>
          </div>
        </Container>
      </section>
    </article>
  );
}
