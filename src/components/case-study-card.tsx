import Link from "next/link"

import { topicBadgeClassName, topicBySlug } from "@/lib/content"
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
    <article
      className={cn(
        "flex h-full flex-col rounded-xl border border-brand bg-white p-6 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.28)] transition-shadow hover:shadow-[0_14px_32px_-16px_rgba(15,23,42,0.38)]",
        className
      )}
    >
      <div className="flex flex-col items-start gap-2">
        <p className="text-[11px] font-medium tracking-[0.16em] text-muted-foreground uppercase">
          Case study · {study.minutes} min
        </p>
        <div className="flex flex-wrap gap-1.5">
          {study.topics.map((slug) => {
            const topic = topicBySlug(slug)
            return (
              <span
                key={slug}
                className={cn(
                  "rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-[0.1em] uppercase",
                  topicBadgeClassName[slug]
                )}
              >
                {topic.label}
              </span>
            )
          })}
        </div>
      </div>
      <h3 className="mt-4 text-[17px] leading-snug font-semibold tracking-tight text-foreground">
        <Link href={`/cases/${study.slug}/`} className="hover:text-brand">
          {study.title}
        </Link>
      </h3>
      <p className="mt-3 flex-1 text-[14px] leading-relaxed text-muted-foreground">
        {study.excerpt}
      </p>
      <p className="mt-3 text-[12px] tracking-[0.02em] text-muted-foreground/80">
        {study.tools.join(" · ")}
      </p>
      <Link
        href={`/cases/${study.slug}/`}
        className="mt-6 text-[11px] font-semibold tracking-[0.16em] text-brand uppercase hover:underline"
      >
        Read →
      </Link>
    </article>
  )
}
