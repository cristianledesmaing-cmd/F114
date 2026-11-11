import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // El panel de administración necesita servidor (sesiones, escritura de
  // contenido y subida de imágenes), por eso el sitio ya no se exporta estático.
  trailingSlash: true,
  images: { unoptimized: true },
  experimental: {
    // Las fotos de obra se suben desde el panel con Server Actions.
    serverActions: { bodySizeLimit: "12mb" },
  },
};

export default nextConfig;
