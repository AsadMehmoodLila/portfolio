export const dynamic = "force-static";
import type { MetadataRoute } from "next";
import { identity, publishedWork } from "@/data/portfolio";
import { policies } from "@/data/policies";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "about/",
    "contact/",
    ...publishedWork.map((item) => `work/${item.slug}/`),
    ...Object.keys(policies).map((slug) => `${slug}/`),
  ].map((path) => ({
    url: `${identity.domain}/${path}`,
    lastModified: identity.updated,
    changeFrequency: "monthly" as const,
    priority: path ? 0.5 : 1,
  }));
}
