import type { NextConfig } from "next";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://olyn-api.29yf3q2baw38.us-south.codeengine.appdomain.cloud";

const nextConfig: NextConfig = {
  output: "standalone",
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${API_URL}/api/:path*`,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "maps.googleapis.com",
      },
    ],
  },
};

export default nextConfig;
