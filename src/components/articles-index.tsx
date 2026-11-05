"use client"

import { useRouter, useSearchParams } from "next/navigation"

import { ArticleCard } from "@/components/article-card"
import {
  type Article,
  type TopicSlug,
  publishedArticles,
  topicBadgeClassName,
  topicSlugs,
  topics,
} from "@/lib/content"
import { cn } from "@/lib/utils"

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
    <>
      <div className="mt-8 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={showAll}
          aria-pressed={activeTopic === null}
          className={cn(
            "rounded-full px-3 py-1 text-[10px] font-semibold tracking-[0.12em] uppercase transition-colors",
            activeTopic
              ? "border border-border bg-white text-muted-foreground hover:text-foreground"
              : "bg-brand text-white"
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
                "rounded-full px-3 py-1 text-[10px] font-semibold tracking-[0.12em] uppercase transition-colors",
                selected
                  ? topicBadgeClassName[topic.slug]
                  : "border border-border bg-white text-muted-foreground hover:text-foreground"
              )}
            >
              {topic.label} {articlesForTopic(topic.slug).length}
            </button>
          )
        })}
      </div>
      {activeTopic === "field-notes" ? (
        <p className="mt-3 max-w-2xl text-[13.5px] leading-relaxed text-muted-foreground/80 italic">
          Working through something still being figured out, not settled
          guidance.
        </p>
      ) : null}
      {articles.length > 0 ? (
        <div className="mt-10 grid max-w-2xl gap-5 sm:grid-cols-2">
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
    </>
  )
}
