/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // TypeScript 오류도 무시
    ignoreBuildErrors: true,
  }
}

module.exports = nextConfig