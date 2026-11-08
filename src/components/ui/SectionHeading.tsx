import type { ReactNode } from "react";

import { Reveal } from "@/components/ui/Reveal";

type SectionHeadingProps = {
  overline: string;
  title: ReactNode;
  description?: ReactNode;
  tone?: "dark" | "light";
  align?: "left" | "center";
  action?: ReactNode;
};

export function SectionHeading({
  overline,
  title,
  description,
  tone = "dark",
  align = "left",
  action,
}: SectionHeadingProps) {
  const isLight = tone === "light";

  return (
    <Reveal
      className={`flex flex-col gap-6 ${
        align === "center" ? "items-center text-center" : "md:flex-row md:items-end md:justify-between"
      }`}
    >
      <div className={align === "center" ? "max-w-2xl" : "max-w-2xl"}>
        <p
          className={`text-overline flex items-center gap-3 ${
            isLight ? "text-brass" : "text-brass-ink"
          } ${align === "center" ? "justify-center" : ""}`}
        >
          <span aria-hidden="true" className="bg-brass/60 inline-block h-px w-8" />
          {overline}
        </p>
        <h2
          className={`mt-4 text-3xl leading-[1.1] font-bold text-balance sm:text-4xl lg:text-[2.75rem] ${
            isLight ? "text-white" : "text-charcoal"
          }`}
        >
          {title}
        </h2>
        {description ? (
          <p
            className={`mt-5 text-base leading-relaxed sm:text-lg ${
              align === "center" ? "text-pretty" : "text-justify"
            } ${isLight ? "text-sand/80" : "text-graphite"}`}
          >
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </Reveal>
  );
}
