import Link from "next/link"

import { type Article, topicBySlug } from "@/lib/content"
import { cn } from "@/lib/utils"

export function ArticleCard({
  article,
  className,
}: {
  article: Article
  className?: string
}) {
  const topic = topicBySlug(article.topic)

  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-xl border border-border bg-white p-6 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.28)] transition-shadow hover:shadow-[0_14px_32px_-16px_rgba(15,23,42,0.38)]",
        className
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <p className="text-[11px] font-medium tracking-[0.16em] text-muted-foreground uppercase">
          {topic.label} · {article.minutes} min
        </p>
        {article.fieldNotes ? (
          <span className="rounded-full bg-brand/10 px-2 py-0.5 text-[10px] font-semibold tracking-[0.1em] text-brand uppercase">
            Field Notes
          </span>
        ) : null}
      </div>
      <h3 className="mt-4 text-[17px] leading-snug font-semibold tracking-tight text-foreground">
        <Link href={`/articles/${article.slug}/`} className="hover:text-brand">
          {article.title}
        </Link>
      </h3>
      <p className="mt-3 flex-1 text-[14px] leading-relaxed text-muted-foreground">
        {article.excerpt}
      </p>
      <Link
        href={`/articles/${article.slug}/`}
        className="mt-6 text-[11px] font-semibold tracking-[0.16em] text-brand uppercase hover:underline"
      >
        Read →
      </Link>
    </article>
  )
}
