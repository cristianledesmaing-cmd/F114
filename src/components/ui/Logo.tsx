import Image from "next/image";
import Link from "next/link";

import { brand } from "@/data/site";

type LogoProps = {
  fullName: string;
  tagline: string;
  /** `light` dibuja el logo blanco + naranja, para fondos oscuros. */
  tone?: "dark" | "light";
  className?: string;
  compact?: boolean;
};

export function Logo({
  fullName,
  tagline,
  tone = "dark",
  className = "",
  compact = false,
}: LogoProps) {
  const onDark = tone === "light";

  return (
    <Link
      href="/"
      aria-label={`${fullName} — ir al inicio`}
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
          compact ? "h-11" : "h-12"
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
            {tagline}
          </span>
        </span>
      )}
    </Link>
  );
}
