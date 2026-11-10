import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { ArrowIcon } from "@/components/ui/icons";

export const metadata = {
  title: "Página no encontrada",
};

export default function NotFound() {
  return (
    <section className="bg-sky/80 flex min-h-[80svh] items-center text-charcoal">
      <Container width="wide">
        <div className="py-32">
          <p className="text-overline text-brass-ink">Error 404</p>
          <h1 className="mt-5 max-w-2xl text-4xl leading-tight font-bold text-balance sm:text-5xl">
            No encontramos la página que buscabas.
          </h1>
          <p className="text-graphite mt-6 max-w-xl text-lg leading-relaxed">
            Puede que el enlace haya cambiado o que el proyecto ya no esté publicado.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/"
              className="group bg-brass hover:bg-brass-ink inline-flex items-center gap-2.5 rounded-md px-6 py-3.5 text-sm font-semibold text-white transition-colors"
            >
              Volver al inicio
              <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/proyectos"
              className="border-charcoal/20 text-charcoal hover:border-charcoal/50 hover:bg-charcoal/5 inline-flex items-center gap-2.5 rounded-md border px-6 py-3.5 text-sm font-semibold transition-colors"
            >
              Ver proyectos
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
