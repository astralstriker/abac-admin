/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
  transpilePackages: [
    "@devcraft-ts/abac-admin-core",
    "@devcraft-ts/abac-admin-react",
    "@devcraft-ts/abac-admin-nextjs",
    "@devcraft-ts/abac-admin-react-ui",
  ],
  webpack: (config, { isServer }) => {
    // Externalize Node.js modules that shouldn't be bundled for the client
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        "fs/promises": false,
        path: false,
        crypto: false,
      };
    }

    return config;
  },
};

module.exports = nextConfig;
