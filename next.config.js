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
};

// Pass an array of modules to transpile
module.exports = withTM(['lucide-react'])(nextConfig);
