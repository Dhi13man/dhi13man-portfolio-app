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

  // Security headers for non-static deployments (e.g., next start)
  // For static export, configure headers at hosting level (Vercel, Netlify, etc.)
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig
