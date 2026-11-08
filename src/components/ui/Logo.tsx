import Image from "next/image";
import Link from "next/link";

import { brand, site } from "@/data/site";

type LogoProps = {
  /** `light` dibuja el logo blanco + naranja, para fondos oscuros. */
  tone?: "dark" | "light";
  className?: string;
  compact?: boolean;
};

export function Logo({ tone = "dark", className = "", compact = false }: LogoProps) {
  const onDark = tone === "light";

  return (
    <Link
      href="/"
      aria-label={`${site.fullName} — ir al inicio`}
      className={`group inline-flex items-center gap-4 ${className}`}
    >
      <Image
        src={onDark ? brand.lockupOnDark : brand.lockupOnLight}
        alt=""
        width={brand.lockupWidth}
        height={brand.lockupHeight}
        priority
        unoptimized
        className={`w-auto transition-transform duration-500 group-hover:-translate-y-0.5 ${
          compact ? "h-10" : "h-11"
        }`}
      />
      {compact ? null : (
        <span className="hidden items-center gap-4 xl:flex">
          <span
            aria-hidden="true"
            className={`h-6 w-px ${onDark ? "bg-white/35" : "bg-charcoal/25"}`}
          />
          <span
            className={`text-overline leading-none ${onDark ? "text-white/70" : "text-graphite"}`}
          >
            {site.tagline}
          </span>
        </span>
      )}
    </Link>
  );
}
