/** @type {import('next').NextConfig} */
const nextConfig = {
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
    NASA_API_KEY: '4lEUBATL6pZCuF7El2HBwl0IbMejIIU6bEOCHdKm',
  },
}

module.exports = nextConfig
