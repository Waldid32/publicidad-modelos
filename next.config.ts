import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configuración adicional
  env: {
    NEXT_PUBLIC_OPENCAGE_API_KEY: process.env.OPENCAGE_API_KEY,
  },
};

export default nextConfig;
