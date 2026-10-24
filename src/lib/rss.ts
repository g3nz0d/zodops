import {
  anatomyStackLabel,
  publishedAnatomies,
} from "@/lib/anatomy"
import { publishedArticles, topicBySlug } from "@/lib/content"
import { site } from "@/lib/site"
import { publishedCaseStudies, primaryTopic } from "@/lib/work"

const BASE_URL = "https://zodops.io"

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;")
}

export function buildRssFeed(): string {
  const newest = publishedArticles[0]
  const lastBuildDate = newest
    ? new Date(`${newest.date}T00:00:00Z`).toUTCString()
    : new Date("2026-01-01T00:00:00Z").toUTCString()

  const articleItems = publishedArticles.map((article) => {
    const url = `${BASE_URL}/articles/${article.slug}/`
    const topic = topicBySlug(article.topic)
    const pubDate = new Date(`${article.date}T00:00:00Z`).toUTCString()
    return `    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <category>${escapeXml(topic.label)}</category>
      <description>${escapeXml(article.excerpt)}</description>
    </item>`
  })

  const caseItems = publishedCaseStudies.map((study) => {
    const url = `${BASE_URL}/cases/${study.slug}/`
    const topic = primaryTopic(study)
    const pubDate = study.date
      ? `\n      <pubDate>${new Date(`${study.date}T00:00:00Z`).toUTCString()}</pubDate>`
      : ""
    return `    <item>
      <title>${escapeXml(study.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>${pubDate}
      <category>${escapeXml(topic.label)}</category>
      <description>${escapeXml(study.excerpt)}</description>
    </item>`
  })

  const anatomyItems = publishedAnatomies.map((item) => {
    const url = `${BASE_URL}/anatomy/${item.slug}/`
    const pubDate = new Date(`${item.date}T00:00:00Z`).toUTCString()
    return `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <category>${escapeXml(anatomyStackLabel[item.stack])}</category>
      <description>${escapeXml(item.excerpt)}</description>
    </item>`
  })

  const items = [...articleItems, ...caseItems, ...anatomyItems].join("\n")

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(site.name)}</title>
    <link>${BASE_URL}/</link>
    <description>${escapeXml(site.description)}</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`
}
