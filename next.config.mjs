/** @type {import('next').NextConfig} */
await import('./src/env.js');

const nextConfig = {
  experimental: {
    reactCompiler: true,
  },
};

export default nextConfig;
