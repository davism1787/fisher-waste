import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack: (config) => {
    // Completely ignore supabase directory
    config.module.rules.push({
      test: /supabase/,
      use: 'ignore-loader'
    });

    // Add ignore patterns
    config.watchOptions = {
      ...config.watchOptions,
      ignored: ['**/supabase/**', '**/node_modules/**'],
    };

    return config;
  },
  // Ignore TypeScript errors in supabase directory
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;