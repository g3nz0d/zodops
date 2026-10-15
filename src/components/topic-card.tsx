import Link from "next/link"

import {
  articlesByTopic,
  topicBorderClassName,
  topicSurfaceClassName,
  type Topic,
} from "@/lib/content"
import { cn } from "@/lib/utils"

function countLabel(count: number): string {
  if (count === 0) {
    return "Explore topic"
  }
  return `${count} ${count === 1 ? "article" : "articles"}`
}

export function TopicCard({
  topic,
  featured = false,
}: {
  topic: Topic
  featured?: boolean
}) {
  const count = articlesByTopic(topic.slug).length

  if (featured) {
    return (
      <Link
        href={`/tech/${topic.slug}/`}
        className={cn(
          "flex flex-col gap-4 rounded-2xl border p-7 transition-colors sm:flex-row sm:items-center sm:justify-between sm:gap-10 sm:p-10",
          topicBorderClassName[topic.slug],
          topicSurfaceClassName[topic.slug]
        )}
      >
        <div className="min-w-0">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Featured topic
          </p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {topic.name}
          </h3>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
            {topic.description}
          </p>
        </div>
        <p className="shrink-0 text-[11px] font-semibold tracking-[0.14em] text-brand uppercase">
          {countLabel(count)} →
        </p>
      </Link>
    )
  }

  return (
    <Link
      href={`/tech/${topic.slug}/`}
      className={cn(
        "flex min-h-[148px] flex-col rounded-xl border p-6 transition-colors",
        topicBorderClassName[topic.slug],
        topicSurfaceClassName[topic.slug]
      )}
    >
      <h3 className="text-[17px] font-semibold tracking-tight text-foreground">
        {topic.name}
      </h3>
      <p className="mt-2 flex-1 text-[14px] leading-relaxed text-muted-foreground">
        {topic.description}
      </p>
      <p className="mt-4 text-[11px] font-semibold tracking-[0.14em] text-brand uppercase">
        {countLabel(count)} →
      </p>
    </Link>
  )
}
