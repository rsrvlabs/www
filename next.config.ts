import type { NextConfig } from "next";

/**
 * Limere's legal and support pages moved to limere.app (2026-10-08): zh-TW at `/legal/…` and
 * `/support/`, English under `/en/`. Every old URL here answers with the matching page there.
 */
const LIMERE = "https://www.limere.app";

/**
 * Thai has no pages on limere.app yet, so a Thai reader of an old zh URL gets the English page.
 * When `/th/legal/…` and `/th/support/` ship, set this to "/th" (one line).
 */
const THAI_PREFIX: "/en" | "/th" = "/en";

/**
 * The browser's first Accept-Language tag (the primary language), as a `has` value. Anchored
 * here as well as by Next, so "en-US,th;q=0.8" can never match Thai on any router.
 */
const primaryLanguage = (tag: string) => `^\\s*(?:${tag})(?:[-_][^,;]*)?(?:[,;].*)?$`;

/**
 * The shipped app (build 48) opens `rsrvlabs.com/zh/legal/{terms,privacy}` for every app language,
 * and is live in Taiwan, the US and Thailand: each old zh URL sends the reader to their own
 * language's page (Thai → `THAI_PREFIX`, zh* → zh-TW, anything else → English). These answer 307,
 * not 308: browsers cache a 308 per URL and would pin the first language they saw.
 */
const languageAware = (source: string, path: string) => [
  {
    source,
    has: [{ type: "header" as const, key: "accept-language", value: primaryLanguage("[tT][hH]") }],
    destination: `${LIMERE}${THAI_PREFIX}${path}`,
    permanent: false,
  },
  {
    source,
    has: [{ type: "header" as const, key: "accept-language", value: primaryLanguage("[zZ][hH]") }],
    destination: `${LIMERE}${path}`,
    permanent: false,
  },
  { source, destination: `${LIMERE}/en${path}`, permanent: false },
];

const nextConfig: NextConfig = {
  async headers() {
    // The language-aware redirects differ by Accept-Language: say so to every cache.
    return ["/zh/legal/:doc(privacy|terms)", "/zh/support"].map((source) => ({
      source,
      headers: [{ key: "Vary", value: "Accept-Language" }],
    }));
  },
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
      // The zh-TW pages: by the reader's language, 307.
      ...languageAware("/zh/legal/:doc(privacy|terms)", "/legal/:doc/"),
      ...languageAware("/zh/support", "/support/"),
    ];
  },
};

export default nextConfig;
