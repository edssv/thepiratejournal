/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '**'
      },
      {
        protocol: 'https',
        hostname: 'thepirate.press',
        port: '',
        pathname: '**'
      },
      {
        protocol: 'https',
        hostname: 'thepirate.press',
        port: '1337',
        pathname: '**'
      },
      {
        protocol: 'http',
        hostname: '194.67.121.62',
        port: '1337',
        pathname: '**'
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '1337',
        pathname: '**'
      }
    ]
  }
};

module.exports = nextConfig;
