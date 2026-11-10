import Image from "next/image";

const galleryPhotos = [
  { src: "/gallery/obra-01.jpg", alt: "Patio de proyecto" },
  { src: "/gallery/obra-02.jpg", alt: "Interior de proyecto" },
  { src: "/gallery/obra-03.jpg", alt: "Fachada de vivienda" },
  { src: "/gallery/obra-04.jpg", alt: "Acceso de vivienda" },
] as const;

/** Duplicamos el set para que el marquee sea continuo con pocas fotos. */
const strip = [...galleryPhotos, ...galleryPhotos, ...galleryPhotos];

export function WorkGallery() {
  return (
    <section aria-label="Fotos de obra" className="bg-bone/30 overflow-hidden py-10 sm:py-14">
      <div className="work-marquee flex w-max gap-4 sm:gap-5">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex gap-4 sm:gap-5" aria-hidden={copy === 1}>
            {strip.map((photo, index) => (
              <div
                key={`${copy}-${photo.src}-${index}`}
                className="bg-sky relative h-56 w-40 shrink-0 overflow-hidden sm:h-72 sm:w-52 lg:h-80 lg:w-60"
              >
                <Image
                  src={photo.src}
                  alt={copy === 0 ? photo.alt : ""}
                  fill
                  sizes="(min-width: 1024px) 240px, (min-width: 640px) 208px, 160px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
