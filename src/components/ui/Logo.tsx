import Image from "next/image";
import Link from "next/link";

import { site } from "@/data/site";

type LogoProps = {
  tone?: "dark" | "light";
  className?: string;
  compact?: boolean;
};

export function Logo({ tone = "dark", className = "", compact = false }: LogoProps) {
  const isLight = tone === "light";

  return (
    <Link
      href="/"
      aria-label={`${site.fullName} — ir al inicio`}
      className={`group inline-flex items-center gap-3 ${className}`}
    >
      <Image
        src={isLight ? "/brand/isotipo-claro.png" : "/brand/isotipo-oscuro.png"}
        alt=""
        width={712}
        height={814}
        priority
        className={`w-auto transition-transform duration-500 group-hover:-translate-y-0.5 ${
          compact ? "h-8" : "h-9 sm:h-10"
        }`}
      />
      <span className="flex items-center gap-3">
        <span
          className={`font-display text-xl leading-none font-bold tracking-tight ${
            isLight ? "text-white" : "text-charcoal"
          }`}
        >
          {site.name}
        </span>
        <span
          aria-hidden="true"
          className={`hidden h-6 w-px sm:block ${isLight ? "bg-white/35" : "bg-charcoal/25"}`}
        />
        <span
          className={`text-overline hidden leading-none sm:block ${
            isLight ? "text-white/70" : "text-graphite"
          }`}
        >
          Estudio de arquitectura
        </span>
      </span>
    </Link>
  );
}
