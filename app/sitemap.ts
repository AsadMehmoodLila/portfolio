export const dynamic = "force-static";
import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {return ["","privacy/","terms/","cookies/","refunds/","accessibility/"].map(p=>({url:`https://asadlilla.me/${p}`,lastModified:"2026-10-07",changeFrequency:"monthly" as const,priority:p?0.3:1}));}
