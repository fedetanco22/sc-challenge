// /** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    // ignoreDuringBuilds: false,
  },
  images: {
    formats: ['image/webp'],
    domains: [
      'images-api.nasa.gov',
      'mars.nasa.gov',
      'api.nasa.gov',
      'mars.jpl.nasa.gov',
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  env: {
    API_KEY: process.env.NASA_API_KEY,
  },
}

module.exports = nextConfig
