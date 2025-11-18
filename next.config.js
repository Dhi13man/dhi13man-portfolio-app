/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    // Must be unoptimized for static export
    unoptimized: true,
  },
  trailingSlash: true,
  // Optimize for static export
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
