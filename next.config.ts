import type { NextConfig } from "next";

/**
 * Limere's legal and support pages moved to limere.app (2026-10-08): zh-TW at `/legal/…` and
 * `/support/`, English under `/en/`, Thai under `/th/`. Every old URL here answers
 * with the matching page there: the English ones below, the zh ones the app opens by the
 * reader's language in src/proxy.ts.
 */
const LIMERE = "https://www.limere.app";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // The product renamed twice (sw → lime 2026-07-23, lime → limere
      // 2026-07-27). Keep every old path alive — both have been shared.
      { source: "/sw", destination: "/limere", permanent: true },
      { source: "/lime", destination: "/limere", permanent: true },
      { source: "/lime/why", destination: "/limere/why", permanent: true },
      // The English pages: one target each, 308.
      { source: "/legal/:doc(privacy|terms)", destination: `${LIMERE}/en/legal/:doc/`, permanent: true },
      { source: "/support", destination: `${LIMERE}/en/support/`, permanent: true },
    ];
  },
};

export default nextConfig;
