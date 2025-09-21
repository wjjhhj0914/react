import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    // ignoreDuringBuilds: false,
  },
  typescript: {
    // ignoreBuildErrors: false,
  },
  turbopack: {
    root: '__dirname',
  },
}

export default nextConfig
