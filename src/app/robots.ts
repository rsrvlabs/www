import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// AEO: explicitly welcome answer-engine + AI crawlers (they are the audience for
// llms.txt and the citations we want). Everything is public; nothing is disallowed.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      // Name the major AI/answer engines so there's no ambiguity about consent.
      {
        userAgent: [
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "ClaudeBot",
          "Claude-User",
          "Claude-SearchBot",
          "PerplexityBot",
          "Perplexity-User",
          "Google-Extended",
          "Applebot-Extended",
          "Bytespider",
          "CCBot",
        ],
        allow: "/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
