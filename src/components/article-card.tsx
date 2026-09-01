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
      <p className="text-[11px] font-medium tracking-[0.16em] text-muted-foreground uppercase">
        {topic.label} · {article.minutes} min
      </p>
      <h3 className="mt-4 text-[17px] leading-snug font-semibold tracking-tight text-foreground">
        <Link href={`/writing/${article.slug}/`} className="hover:text-brand">
          {article.title}
        </Link>
      </h3>
      <p className="mt-3 flex-1 text-[14px] leading-relaxed text-muted-foreground">
        {article.excerpt}
      </p>
      <Link
        href={`/writing/${article.slug}/`}
        className="mt-6 text-[11px] font-semibold tracking-[0.16em] text-brand uppercase hover:underline"
      >
        Read →
      </Link>
    </article>
  )
}
