/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['utfs.io'], // Add the allowed external domains here
  },
  experimental: {
    instrumentationHook: true,
  },
};

export default nextConfig;