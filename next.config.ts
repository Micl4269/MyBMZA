import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image optimization - use placeholder images
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    unoptimized: process.env.NODE_ENV === "production", // For Cloudflare Pages
  },

  // Enable static export for Cloudflare Pages
  // Uncomment for static export:
  // output: "export",

  // Experimental features
  experimental: {
    // serverActions: true, // Enabled by default in Next.js 14+
  },

  // Environment variables
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  },
};

export default nextConfig;
