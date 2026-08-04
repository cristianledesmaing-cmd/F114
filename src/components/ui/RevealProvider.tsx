"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Muestra progresivamente los elementos marcados con `data-reveal` al entrar
 * en pantalla. Si el navegador no soporta IntersectionObserver o el usuario
 * pidió menos movimiento, todo queda visible de entrada.
 */
export function RevealProvider() {
  const pathname = usePathname();

  useEffect(() => {
    const nodes = () =>
      Array.from(document.querySelectorAll<HTMLElement>('[data-reveal=""]'));

    const showAll = () => {
      for (const node of nodes()) node.dataset.reveal = "shown";
    };

    if (typeof IntersectionObserver === "undefined") {
      showAll();
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      showAll();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const target = entry.target as HTMLElement;
          target.dataset.reveal = "shown";
          observer.unobserve(target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    for (const node of nodes()) observer.observe(node);

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
