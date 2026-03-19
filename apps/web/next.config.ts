import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [{ hostname: "cdn.sanity.io" }],
  },
};

export default nextConfig;
