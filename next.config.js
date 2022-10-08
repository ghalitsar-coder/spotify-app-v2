/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  // env: {
  //   NEXT_SHAZAM_CORE_RAPID_API_KEY: process.env.NEXT_SHAZAM_CORE_RAPID_API_KEY,
  //   NEXT_GEO_API_KEY: process.env.NEXT_GEO_API_KEY,
  // },
};

module.exports = nextConfig;
