// Single source of truth for the canonical origin (sitemap, robots, OG, llms.txt).
// Production is www.rsrvlabs.com — the apex 308-redirects there, so the www host
// is the canonical one and the sitemap must not advertise the redirecting form.
// Override with NEXT_PUBLIC_SITE_URL for preview deployments.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.rsrvlabs.com"
).replace(/\/$/, "");

export const SITE_NAME = "Reserve";

// Every indexable route, with a stable last-updated stamp for the sitemap.
// Update the date when a page's content materially changes.
export const ROUTES: Array<{ path: string; updated: string; priority: number }> = [
  { path: "/", updated: "2026-08-02", priority: 1 },
  { path: "/limere", updated: "2026-07-27", priority: 0.8 },
  { path: "/limere/why", updated: "2026-08-02", priority: 0.7 },
  { path: "/labs", updated: "2026-07-15", priority: 0.8 },
  { path: "/frontiers", updated: "2026-07-15", priority: 0.8 },
  { path: "/effects", updated: "2026-08-02", priority: 0.7 },
  { path: "/research", updated: "2026-08-02", priority: 0.7 },
  { path: "/research/notes", updated: "2026-08-02", priority: 0.6 },
  { path: "/research/ai-native-company", updated: "2026-07-08", priority: 0.6 },
  { path: "/research/departments", updated: "2026-07-09", priority: 0.6 },
  { path: "/research/prior-art", updated: "2026-07-09", priority: 0.6 },
  { path: "/research/agent-self-evaluation", updated: "2026-07-15", priority: 0.6 },
  { path: "/research/bottleneck-moved", updated: "2026-07-28", priority: 0.6 },
  { path: "/research/company-brain", updated: "2026-07-28", priority: 0.6 },
  { path: "/research/graveyard", updated: "2026-07-28", priority: 0.6 },
  { path: "/research/harness-that-compounds", updated: "2026-07-15", priority: 0.6 },
  { path: "/research/build-the-floor", updated: "2026-07-15", priority: 0.6 },
  { path: "/legal/terms", updated: "2026-08-07", priority: 0.3 },
  { path: "/legal/privacy", updated: "2026-08-07", priority: 0.3 },
];
