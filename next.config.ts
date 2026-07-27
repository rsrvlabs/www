import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // The product renamed twice (sw → lime 2026-07-23, lime → limere
      // 2026-07-27). Keep every old path alive — both have been shared.
      { source: "/sw", destination: "/limere", permanent: true },
      { source: "/lime", destination: "/limere", permanent: true },
      { source: "/lime/why", destination: "/limere/why", permanent: true },
    ];
  },
};

export default nextConfig;
