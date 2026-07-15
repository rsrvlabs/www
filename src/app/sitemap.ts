import type { MetadataRoute } from "next";
import { SITE_URL, ROUTES } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((r) => ({
    url: `${SITE_URL}${r.path === "/" ? "" : r.path}`,
    lastModified: r.updated,
    changeFrequency: r.path.startsWith("/research") ? "weekly" : "monthly",
    priority: r.priority,
  }));
}
