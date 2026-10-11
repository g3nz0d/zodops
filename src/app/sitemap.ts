import type { MetadataRoute } from "next"

import { articles, topics } from "@/lib/content"

export const dynamic = "force-static"

const BASE_URL = "https://zodops.io"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["/", "/articles/", "/tech/", "/about/", "/contact/"]
  const topicRoutes = topics.map((topic) => `/tech/${topic.slug}/`)
  const articleRoutes = articles
    .filter((article) => !article.draft)
    .map((article) => `/articles/${article.slug}/`)

  return [...staticRoutes, ...topicRoutes, ...articleRoutes].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
  }))
}
