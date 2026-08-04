import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  width?: "default" | "wide" | "narrow";
};

const widths = {
  narrow: "max-w-3xl",
  default: "max-w-6xl",
  wide: "max-w-[88rem]",
} as const;

export function Container({ children, className = "", width = "default" }: ContainerProps) {
  return (
    <div className={`mx-auto w-full ${widths[width]} px-6 sm:px-8 lg:px-12 ${className}`}>
      {children}
    </div>
  );
}
