// Single source of truth for the canonical origin (sitemap, robots, OG, llms.txt).
// Defaults to the contact-email domain; override with NEXT_PUBLIC_SITE_URL if the
// production domain differs. ⚠ Confirm the real domain before launch.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://rsrvlabs.com"
).replace(/\/$/, "");

export const SITE_NAME = "Reserve";

// Every indexable route, with a stable last-updated stamp for the sitemap.
// Update the date when a page's content materially changes.
export const ROUTES: Array<{ path: string; updated: string; priority: number }> = [
  { path: "/", updated: "2026-07-15", priority: 1 },
  { path: "/sw", updated: "2026-07-15", priority: 0.8 },
  { path: "/labs", updated: "2026-07-15", priority: 0.8 },
  { path: "/frontiers", updated: "2026-07-15", priority: 0.8 },
  { path: "/research", updated: "2026-07-15", priority: 0.7 },
  { path: "/research/ai-native-company", updated: "2026-07-08", priority: 0.6 },
  { path: "/research/departments", updated: "2026-07-09", priority: 0.6 },
  { path: "/research/prior-art", updated: "2026-07-09", priority: 0.6 },
  { path: "/research/agent-self-evaluation", updated: "2026-07-15", priority: 0.6 },
  { path: "/research/harness-that-compounds", updated: "2026-07-15", priority: 0.6 },
  { path: "/research/build-the-floor", updated: "2026-07-15", priority: 0.6 },
];
