import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['search1.kakaocdn.net'],
    remotePatterns: [new URL('https://images.pexels.com/**')],
  },
  eslint: {
    // ignoreDuringBuilds: true,
  },
  typescript: {
    // ignoreBuildErrors: true,
  },
  turbopack: {},
}

export default nextConfig
