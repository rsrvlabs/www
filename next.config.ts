import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // The product page moved to its own name (Ryvn 2026-07-23). Keep the old
      // path alive — /sw has been shared outside the repo.
      { source: "/sw", destination: "/lime", permanent: true },
    ];
  },
};

export default nextConfig;
