import type { MetadataRoute } from "next"

import { publishedArticles, topics } from "@/lib/content"
import { publishedCaseStudies } from "@/lib/work"

export const dynamic = "force-static"

const BASE_URL = "https://zodops.io"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["/", "/articles/", "/tech/", "/about/"]
  if (publishedCaseStudies.length > 0) {
    staticRoutes.push("/work/")
  }
  const topicRoutes = topics.map((topic) => `/tech/${topic.slug}/`)
  const articleRoutes = publishedArticles.map(
    (article) => `/articles/${article.slug}/`
  )
  const workRoutes = publishedCaseStudies.map((study) => `/work/${study.slug}/`)

  return [...staticRoutes, ...topicRoutes, ...articleRoutes, ...workRoutes].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
  }))
}
