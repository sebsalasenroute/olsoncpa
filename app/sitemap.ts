import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog";
import { calculatorCatalog } from "@/lib/calculators/catalog";
import { cityPages } from "@/lib/cities";
import { services } from "@/lib/services";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = [
    "",
    "/calculators",
    "/locations",
    "/services",
    "/blog",
    "/contact",
    "/legal/privacy",
    "/legal/terms",
    "/disclaimer"
  ];

  return [
    ...staticRoutes.map((path) => ({
      url: `${siteConfig.url}${path}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8
    })),
    ...calculatorCatalog.map((calculator) => ({
      url: `${siteConfig.url}/calculators/${calculator.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8
    })),
    ...cityPages.map((city) => ({
      url: `${siteConfig.url}/locations/${city.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.85
    })),
    ...services.map((service) => ({
      url: `${siteConfig.url}/services/${service.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8
    })),
    ...blogPosts.map((post) => ({
      url: `${siteConfig.url}/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7
    }))
  ];
}
