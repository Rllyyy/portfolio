import { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    deviceSizes: [450, 500, 550, 600, 640, 720, 768, 800, 900, 1024, 1080, 1200, 1400, 1920, 2048, 3840],
  },
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.htm$|\.html$/,
      use: "raw-loader",
    });

    return config;
  },
};

export default nextConfig;
