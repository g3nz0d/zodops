import {
  WritingCard,
  writingCardBadgeHoverClassName,
  writingCardExcerptClassName,
  writingCardEyebrowClassName,
  writingCardReadClassName,
  writingCardTitleClassName,
} from "@/components/writing-card"
import { type Article, topicBadgeClassName, topicBySlug } from "@/lib/content"
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
    <WritingCard href={`/articles/${article.slug}/`} className={className}>
      <div className="flex flex-col items-start gap-2">
        <p className={writingCardEyebrowClassName}>
          {topic.label} · {article.minutes} min
        </p>
        <span
          className={cn(
            "rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-[0.1em] uppercase",
            topicBadgeClassName[article.topic],
            writingCardBadgeHoverClassName
          )}
        >
          {topic.label}
        </span>
      </div>
      <h3 className={writingCardTitleClassName}>{article.title}</h3>
      <p className={writingCardExcerptClassName}>{article.excerpt}</p>
      <span className={writingCardReadClassName}>Read →</span>
    </WritingCard>
  )
}
