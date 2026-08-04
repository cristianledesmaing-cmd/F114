import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Sitio estático: `npm run build` deja el resultado listo en `out/`.
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
