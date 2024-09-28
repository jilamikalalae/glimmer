/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    instrumentationHook: true,
  },
  images: {
    domains: [
      "localhost",
      "www.fastsimon.com",
      "assets.vogue.com",
      "i.pinimg.com", // Add other image hostnames here as needed
    ],
  },
};

export default nextConfig;
