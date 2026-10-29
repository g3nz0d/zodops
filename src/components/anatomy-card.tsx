import {
  WritingCard,
  writingCardBadgeHoverClassName,
  writingCardExcerptClassName,
  writingCardEyebrowClassName,
  writingCardReadClassName,
  writingCardTitleClassName,
} from "@/components/writing-card"
import {
  anatomyStackLabel,
  type Anatomy,
} from "@/lib/anatomy"
import { formatDate, topicBadgeClassName, topicBySlug } from "@/lib/content"
import { cn } from "@/lib/utils"

export function AnatomyCard({
  item,
  className,
}: {
  item: Anatomy
  className?: string
}) {
  return (
    <WritingCard href={`/anatomy/${item.slug}/`} className={className}>
      <div className="flex flex-col items-start gap-2">
        <p className={writingCardEyebrowClassName}>
          {anatomyStackLabel[item.stack]} · {item.minutes} min ·{" "}
          {formatDate(item.date)}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {item.topics.map((slug) => {
            const topic = topicBySlug(slug)
            return (
              <span
                key={slug}
                className={cn(
                  "rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-[0.1em] uppercase",
                  topicBadgeClassName[slug],
                  writingCardBadgeHoverClassName
                )}
              >
                {topic.label}
              </span>
            )
          })}
        </div>
      </div>
      <h3 className={writingCardTitleClassName}>{item.title}</h3>
      <p className={writingCardExcerptClassName}>{item.excerpt}</p>
      <span className={writingCardReadClassName}>Read →</span>
    </WritingCard>
  )
}
