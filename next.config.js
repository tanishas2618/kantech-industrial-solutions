/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['mongoose'],
  },
  images: {
    domains: ['images.unsplash.com'],
    unoptimized: false,
  },
  api: {
    bodyParser: false,
  },
}
module.exports = nextConfig
