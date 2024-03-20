/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/webp'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '**'
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '1337',
        pathname: '**'
      },
      {
        protocol: 'https',
        hostname: 'thepiratejournal.ru',
        port: '',
        pathname: '**'
      },
      {
        protocol: 'https',
        hostname: 'api.thepiratejournal.ru',
        pathname: '**'
      }
    ]
  }
};

const { withContentlayer } = require('next-contentlayer');

module.exports = withContentlayer(nextConfig);
