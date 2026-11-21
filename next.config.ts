import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // NOTE: `cacheComponents` and `partialPrefetching` (Next 16 defaults) rely on
  // cross-request promise resolution which Cloudflare workerd does not allow.
  // Disabled so the app runs on Cloudflare Workers via OpenNext.
  images: {
    // Next's image optimizer doesn't run on Cloudflare Workers; our stored
    // images are pre-compressed webp (~40KB), so serve them unoptimized.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default withNextIntl(nextConfig);

import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());
