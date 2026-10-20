import type { MetadataRoute } from "next"

import { publishedAnatomies } from "@/lib/anatomy"
import { publishedArticles, topics } from "@/lib/content"
import { publishedCaseStudies } from "@/lib/work"

export const dynamic = "force-static"

const BASE_URL = "https://zodops.io"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["/", "/articles/", "/tech/", "/about/"]
  if (publishedCaseStudies.length > 0) {
    staticRoutes.push("/cases/")
  }
  if (publishedAnatomies.length > 0) {
    staticRoutes.push("/anatomy/")
  }
  const topicRoutes = topics.map((topic) => `/tech/${topic.slug}/`)
  const articleRoutes = publishedArticles.map(
    (article) => `/articles/${article.slug}/`
  )
  const caseRoutes = publishedCaseStudies.map((study) => `/cases/${study.slug}/`)
  const anatomyRoutes = publishedAnatomies.map(
    (item) => `/anatomy/${item.slug}/`
  )

  return [
    ...staticRoutes,
    ...topicRoutes,
    ...articleRoutes,
    ...caseRoutes,
    ...anatomyRoutes,
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
  }))
}
