import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: `${process.env.API_URL}`,
        pathname: '/uploads/**',
      },
    ],
    unoptimized: false,
  },
  env: {
    NEXT_PUBLIC_OPENCAGE_API_KEY: process.env.OPENCAGE_API_KEY,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '50mb',
    },
  },
};

export default nextConfig;
