import Link from "next/link"

import { type Topic } from "@/lib/content"

export function TopicCard({ topic }: { topic: Topic }) {
  return (
    <Link
      href={`/topics/${topic.slug}/`}
      className="flex min-h-[148px] flex-col rounded-xl bg-[#f3f5f7] p-6 transition-colors hover:bg-[#ebeef1]"
    >
      <h3 className="text-[17px] font-semibold tracking-tight text-foreground">
        {topic.name}
      </h3>
      <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
        {topic.description}
      </p>
    </Link>
  )
}
