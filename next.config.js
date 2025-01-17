const withTM = require('next-transpile-modules');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: false,
  trailingSlash: false,
  swcMinify: true,
  basePath: '',
  assetPrefix: '',
  transpilePackages: ['lucide-react'],
  images: {
    loader: 'akamai',
    path: '',
  },
  // Add this to ensure proper routing
  async rewrites() {
    return [
      {
        source: '/waitlist',
        destination: '/waitlist',
      },
    ];
  },
};

module.exports = withTM(['lucide-react'])(nextConfig);
