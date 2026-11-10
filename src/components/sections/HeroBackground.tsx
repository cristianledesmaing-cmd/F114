"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  { src: "/gallery/obra-01.jpg", alt: "Fachada frontal" },
  { src: "/gallery/obra-02.jpg", alt: "Fachada con patio" },
  { src: "/gallery/obra-03.jpg", alt: "Interior de doble altura" },
  { src: "/gallery/obra-04.jpg", alt: "Patio exterior" },
] as const;

const INTERVAL_MS = 5500;

export function HeroBackground() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, INTERVAL_MS);

    return () => window.clearInterval(id);
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {/* Tercio izquierdo limpio para el texto. */}
      <div className="from-bone via-sky/80 to-sky absolute inset-y-0 left-0 w-1/3 bg-gradient-to-br" />

      {/* Fotos solo en los 2 tercios derechos — contain para ver la imagen completa. */}
      <div className="bg-sky absolute inset-y-0 right-0 w-2/3 overflow-hidden">
        {slides.map((slide, index) => (
          <Image
            key={slide.src}
            src={slide.src}
            alt=""
            fill
            priority={index === 0}
            sizes="66vw"
            className={`object-contain object-center p-2 transition-opacity duration-[1600ms] ease-in-out sm:p-3 lg:p-4 ${
              index === active ? "opacity-[0.9]" : "opacity-0"
            }`}
          />
        ))}
        {/* Fundido suave hacia el texto. */}
        <div className="from-bone via-bone/50 absolute inset-y-0 left-0 w-[18%] bg-gradient-to-r to-transparent" />
      </div>
    </div>
  );
}
