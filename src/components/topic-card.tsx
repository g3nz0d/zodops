import Link from "next/link"

import { articlesByTopic, type Topic } from "@/lib/content"

export function TopicCard({ topic }: { topic: Topic }) {
  const count = articlesByTopic(topic.slug).length

  return (
    <Link
      href={`/tech/${topic.slug}/`}
      className="flex min-h-[148px] flex-col rounded-xl bg-[#f3f5f7] p-6 transition-colors hover:bg-[#ebeef1]"
    >
      <h3 className="text-[17px] font-semibold tracking-tight text-foreground">
        {topic.name}
      </h3>
      <p className="mt-2 flex-1 text-[14px] leading-relaxed text-muted-foreground">
        {topic.description}
      </p>
      <p className="mt-4 text-[11px] font-semibold tracking-[0.14em] text-brand uppercase">
        {count} {count === 1 ? "article" : "articles"} →
      </p>
    </Link>
  )
}
