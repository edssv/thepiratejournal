const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  },
  images: {
    formats: ['image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'thepirate.press'
      },
      { hostname: 'localhost' },
      { hostname: '172.18.0.5' },
      { hostname: 'lh3.googleusercontent.com' }
    ]
  },
  output: 'standalone'
};

module.exports = nextConfig;
