import type { MetadataRoute } from "next";
import { SITE_URL, ROUTES } from "@/lib/site";
import { NOTES } from "@/app/research/notes/notes";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...ROUTES.map((r) => ({
      url: `${SITE_URL}${r.path === "/" ? "" : r.path}`,
      lastModified: r.updated,
      changeFrequency: (r.path.startsWith("/research")
        ? "weekly"
        : "monthly") as "weekly" | "monthly",
      priority: r.priority,
    })),
    ...NOTES.map((n) => ({
      url: `${SITE_URL}/research/notes/${n.slug}`,
      lastModified: n.date,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
