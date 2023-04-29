const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  },
  images: {
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 3600,
    formats: ['image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'thepirate.press'
      },
      { hostname: 'localhost' },
      { hostname: '172.18.0.5' }
    ]
  },
  output: 'standalone'
};

module.exports = nextConfig;
