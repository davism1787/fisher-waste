import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    // Exclude the supabase folder from being processed by Webpack
    if (isServer) {
      config.externals = [
        ...(Array.isArray(config.externals) ? config.externals : []),
        /^supabase\//, // Regex to exclude anything in the supabase folder
      ];
    }

    // Optional: Keep watchOptions for development if needed
    config.watchOptions = {
      ...config.watchOptions,
      ignored: ['**/supabase/**'],
    };

    return config;
  },
  serverExternalPackages: ['@supabase/supabase-js', 'supabase'],
};

export default nextConfig;