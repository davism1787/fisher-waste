import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.watchOptions = {
      ...config.watchOptions,
      ignored: ['**/supabase/**'],
    };
    return config;
  },
  experimental: {
    serverComponentsExternalPackages: [],
  },
};

export default nextConfig;
