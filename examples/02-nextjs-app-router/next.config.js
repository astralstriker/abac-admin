/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  transpilePackages: [
    '@devcraft-ts/abac-admin-core',
    '@devcraft-ts/abac-admin-react',
    '@devcraft-ts/abac-admin-nextjs',
    '@devcraft-ts/abac-admin-react-ui',
  ],
}

module.exports = nextConfig
