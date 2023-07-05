/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    deviceSizes: [450, 500, 550, 600, 640, 720, 768, 800, 900, 1024, 1080, 1200, 1400, 1920, 2048, 3840],
  },
};

module.exports = nextConfig;
