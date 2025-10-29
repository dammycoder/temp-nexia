import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_STRAPI_URL: process.env.NEXT_PUBLIC_STRAPI_URL,
    NEXT_PUBLIC_STRAPI_TOKEN: process.env.NEXT_PUBLIC_STRAPI_TOKEN,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/**", 
      },
        {
        protocol: "https",
        hostname: "backyard.nexia.ng",
        port: "",
        pathname: "/**", 
      },
    ],
  },
};

export default nextConfig;
