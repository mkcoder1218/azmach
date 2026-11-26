// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
