/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
  },
  eslint: {
    // ESLint 검사를 빌드 프로세스에서 비활성화
    ignoreDuringBuilds: true,
  }
}

module.exports = nextConfig