/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    // Use next-image-export-optimizer for build-time image optimization
    loader: 'custom',
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },
  transpilePackages: ['next-image-export-optimizer'],
  env: {
    nextImageExportOptimizer_imageFolderPath: 'public/assets',
    nextImageExportOptimizer_exportFolderPath: 'out',
    nextImageExportOptimizer_quality: '80',
    nextImageExportOptimizer_storePicturesInWEBP: 'true',
    nextImageExportOptimizer_exportFolderName: 'nextImageExportOptimizer',
    nextImageExportOptimizer_generateAndUseBlurImages: 'true',
  },
  trailingSlash: true,
  // Optimize for static export
  reactStrictMode: true,
  // swcMinify is now always enabled by default in Next.js 15+

}

module.exports = nextConfig
