/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'taperempire.com' },
      { protocol: 'https', hostname: '**.vercel.app' },
    ],
  },
  experimental: {
    serverActions: { bodySizeLimit: '10mb' },
  },
}
export default nextConfig
