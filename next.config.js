/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    deviceSizes: [300, 400, 450, 500, 550, 600, 650, 700, 768, 800, 900, 1200, 1400],
  },
};

module.exports = nextConfig;
