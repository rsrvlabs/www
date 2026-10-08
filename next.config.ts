import type { NextConfig } from "next";

/**
 * Limere's legal and support pages moved to limere.app (2026-10-08): zh-TW at `/legal/…` and
 * `/support/`, English under `/en/`, Thai under `/th/`. Every old URL here answers
 * with the matching page there: the English ones below, the zh ones the app opens by the
 * reader's language in src/proxy.ts.
 *
 * Limere's activity invite moved there too (R692, 2026-10-08): `/limere/invite#CODE`, the
 * page the app's QR codes still carry, answers with limere.app's `/invite/`. The browser keeps
 * the `#CODE` across the redirect (the fragment never reaches a server, and a Location without
 * one inherits it). 307, not 308: the app keeps minting this URL until a build that reads
 * limere.app has shipped (R190), so no browser may pin the answer while that is under way.
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
      // The activity invite: zh-TW only, one target.
      { source: "/limere/invite", destination: `${LIMERE}/invite/`, permanent: false },
    ];
  },
};

export default nextConfig;
