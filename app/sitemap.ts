import type { MetadataRoute } from "next";
import { getAllProjectSlugs } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const pages: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/projects`, lastModified: new Date() },
    { url: `${base}/about`, lastModified: new Date() },
    { url: `${base}/contact`, lastModified: new Date() },
  ];
  const slugs = await getAllProjectSlugs();
  const projectPages = slugs.map((slug) => ({ url: `${base}/projects/${slug}`, lastModified: new Date() }));
  return [...pages, ...projectPages];
}


