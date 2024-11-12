import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "publicbuilders.s3.us-east-2.amazonaws.com",
        port: "",
      },
    ],
  },
}

export default nextConfig;
