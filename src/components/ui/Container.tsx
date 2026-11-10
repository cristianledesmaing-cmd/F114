import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  width?: "default" | "wide" | "narrow";
};

/** Misma sangría horizontal que header y hero: px-10 / sm:px-12 / lg:px-16 */
const widths = {
  narrow: "max-w-3xl",
  default: "max-w-6xl",
  wide: "max-w-none",
} as const;

export function Container({ children, className = "", width = "default" }: ContainerProps) {
  return (
    <div className={`mx-auto w-full ${widths[width]} px-10 sm:px-12 lg:px-16 ${className}`}>
      {children}
    </div>
  );
}
