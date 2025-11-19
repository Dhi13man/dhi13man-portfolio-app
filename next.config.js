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
  // swcMinify is now always enabled by default in Next.js 15+
}

module.exports = nextConfig
