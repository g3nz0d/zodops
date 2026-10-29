import {
  WritingCard,
  writingCardBadgeHoverClassName,
  writingCardExcerptClassName,
  writingCardEyebrowClassName,
  writingCardMetaClassName,
  writingCardReadClassName,
  writingCardTitleClassName,
} from "@/components/writing-card"
import { formatDate, topicBadgeClassName, topicBySlug } from "@/lib/content"
import { type CaseStudy } from "@/lib/work"
import { cn } from "@/lib/utils"

export function CaseStudyCard({
  study,
  className,
}: {
  study: CaseStudy
  className?: string
}) {
  return (
    <WritingCard href={`/cases/${study.slug}/`} className={className}>
      <div className="flex flex-col items-start gap-2">
        <p className={writingCardEyebrowClassName}>
          {study.industry
            ? `Cases · ${study.industry} · ${study.minutes} min`
            : `Case study · ${study.minutes} min`}
          {study.date ? ` · ${formatDate(study.date)}` : ""}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {study.topics.map((slug) => {
            const topic = topicBySlug(slug)
            return (
              <span
                key={slug}
                data-topic={slug}
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
      <h3 className={writingCardTitleClassName}>{study.title}</h3>
      <p className={writingCardExcerptClassName}>{study.excerpt}</p>
      {study.tools.length > 0 ? (
        <p className={writingCardMetaClassName}>{study.tools.join(" · ")}</p>
      ) : null}
      <span className={writingCardReadClassName}>Read →</span>
    </WritingCard>
  )
}
