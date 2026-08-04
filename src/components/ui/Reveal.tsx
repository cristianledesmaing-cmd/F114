import type { CSSProperties, ElementType, ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
  id?: string;
};

/**
 * Envoltura para la animación de entrada. El estado lo cambia `RevealProvider`
 * desde el cliente; si no hay JavaScript el contenido igual queda visible
 * gracias al fallback de `globals.css`.
 */
export function Reveal({ children, className = "", delay = 0, as, id }: RevealProps) {
  const Tag = (as ?? "div") as ElementType;

  return (
    <Tag
      id={id}
      data-reveal=""
      className={className}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
