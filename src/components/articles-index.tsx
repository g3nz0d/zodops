"use client"

import { useRouter, useSearchParams } from "next/navigation"

import { ArticleCard } from "@/components/article-card"
import {
  type Article,
  type TopicSlug,
  publishedArticles,
  topicSlugs,
  topics,
} from "@/lib/content"
import { cn } from "@/lib/utils"

const topicChipClassName: Record<TopicSlug, string> = {
  "ai-agent-security": "bg-red-700/20 text-red-800",
  "cloud-security": "bg-[#d6ebfe] text-[#2f86e0]",
  "data-security": "bg-emerald-500/20 text-emerald-700",
  "field-notes": "bg-[#fde4cc] text-[#c45a10]",
  "security-automation": "bg-yellow-200 text-yellow-800",
}

function isFieldNote(article: Article) {
  return article.topic === "field-notes" || Boolean(article.fieldNotes)
}

function articlesForTopic(slug: TopicSlug) {
  if (slug === "field-notes") {
    return publishedArticles.filter(isFieldNote)
  }
  return publishedArticles.filter((article) => article.topic === slug)
}

function isTopicSlug(value: string | null): value is TopicSlug {
  return value !== null && topicSlugs.includes(value as TopicSlug)
}

export function ArticlesIndex() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const requested = searchParams.get("topic")
  const notesFallback = searchParams.get("notes") === "1"
  const activeTopic = isTopicSlug(requested)
    ? requested
    : notesFallback
      ? "field-notes"
      : null
  const articles = activeTopic
    ? articlesForTopic(activeTopic)
    : publishedArticles
  const active = topics.find((topic) => topic.slug === activeTopic)

  function showAll() {
    router.replace("/articles/", { scroll: false })
  }

  function showTopic(slug: TopicSlug) {
    router.replace(`/articles/?topic=${slug}`, { scroll: false })
  }

  return (
    <div className="mt-8 w-fit max-w-full">
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={showAll}
          aria-pressed={activeTopic === null}
          className={cn(
            "rounded-full px-3 py-1 text-[10px] font-semibold tracking-[0.12em] uppercase ring-2 ring-offset-2 transition-colors",
            activeTopic === null
              ? "bg-brand text-white ring-brand/40"
              : "bg-brand/15 text-brand ring-transparent hover:bg-brand/25"
          )}
        >
          All {publishedArticles.length}
        </button>
        {topics.map((topic) => {
          const selected = activeTopic === topic.slug
          return (
            <button
              key={topic.slug}
              type="button"
              onClick={() => showTopic(topic.slug)}
              aria-pressed={selected}
              className={cn(
                "rounded-full px-3 py-1 text-[10px] font-semibold tracking-[0.12em] uppercase ring-2 ring-offset-2 transition-colors",
                topicChipClassName[topic.slug],
                selected ? "ring-current" : "ring-transparent"
              )}
            >
              {topic.label} {articlesForTopic(topic.slug).length}
            </button>
          )
        })}
      </div>
      {activeTopic === "field-notes" ? (
        <p className="mt-3 text-[13.5px] leading-relaxed text-muted-foreground/80 italic">
          Working through something still being figured out, not settled
          guidance.
        </p>
      ) : null}
      {articles.length > 0 ? (
        <div className="mt-10 grid w-0 min-w-full grid-cols-1 gap-5 sm:grid-cols-2">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      ) : (
        <p className="mt-10 text-muted-foreground">
          {active
            ? `No articles in ${active.label} yet.`
            : "First essays are in progress. Check back soon."}
        </p>
      )}
    </div>
  )
}
