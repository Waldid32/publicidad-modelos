import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_OPENCAGE_API_KEY: process.env.OPENCAGE_API_KEY,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: process.env.API_URL
          ? new URL(process.env.API_URL).hostname
          : "localhost",
        port: "3000",
        pathname: "/uploads/**",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "50mb",
    },
  },
};

export default nextConfig;
