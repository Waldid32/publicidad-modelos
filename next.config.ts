import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_OPENCAGE_API_KEY: process.env.OPENCAGE_API_KEY,
  },
  images: {
    remotePatterns: [
      {
        protocol: process.env.NODE_ENV === "development" ? "http" : "http",
        hostname:
          process.env.NODE_ENV === "development"
            ? "localhost"
            : (process.env.PRODUCTION_HOST || "localhost").replace(
                /^https?:\/\//,
                ""
              ),
        port: process.env.NODE_ENV === "development" ? "3232" : "3232",
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
