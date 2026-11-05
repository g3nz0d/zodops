"use client"

import { useRouter, useSearchParams } from "next/navigation"

import { ArticleCard } from "@/components/article-card"
import {
  type Article,
  publishedArticles,
  topicBadgeClassName,
} from "@/lib/content"
import { cn } from "@/lib/utils"

function isFieldNote(article: Article) {
  return article.topic === "field-notes" || Boolean(article.fieldNotes)
}

const fieldNotes = publishedArticles.filter(isFieldNote)

export function ArticlesIndex() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const notesOnly = searchParams.get("notes") === "1"
  const articles = notesOnly ? fieldNotes : publishedArticles

  function showAll() {
    router.replace("/articles/", { scroll: false })
  }

  function showNotes() {
    router.replace("/articles/?notes=1", { scroll: false })
  }

  return (
    <>
      <div className="mt-8 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={showAll}
          aria-pressed={!notesOnly}
          className={cn(
            "rounded-full px-3 py-1 text-[10px] font-semibold tracking-[0.12em] uppercase transition-colors",
            notesOnly
              ? "border border-border bg-white text-muted-foreground hover:text-foreground"
              : "bg-brand text-white"
          )}
        >
          All {publishedArticles.length}
        </button>
        <button
          type="button"
          onClick={showNotes}
          aria-pressed={notesOnly}
          className={cn(
            "rounded-full px-3 py-1 text-[10px] font-semibold tracking-[0.12em] uppercase transition-colors",
            notesOnly
              ? topicBadgeClassName["field-notes"]
              : "border border-border bg-white text-muted-foreground hover:text-foreground"
          )}
        >
          Field Notes {fieldNotes.length}
        </button>
      </div>
      {notesOnly ? (
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
          {notesOnly
            ? "No Field Notes yet."
            : "First essays are in progress. Check back soon."}
        </p>
      )}
    </>
  )
}
