import type { Metadata } from "next"

import { TopicCard } from "@/components/topic-card"
import { topics } from "@/lib/content"

export const metadata: Metadata = {
  title: "Topics",
  description:
    "Explore ZodOps writing by topic: DevOps, containers, DSPM/DLP, and cloud security.",
}

export default function TopicsPage() {
  return (
    <section className="container-page py-14 sm:py-16">
      <p className="text-[11px] font-semibold tracking-[0.18em] text-brand uppercase">
        Topics
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
        Four domains, no filler
      </h1>
      <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-muted-foreground">
        Everything here sits in one of these buckets. If a draft does not, it
        does not ship.
      </p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {topics.map((topic) => (
          <TopicCard key={topic.slug} topic={topic} />
        ))}
      </div>
    </section>
  )
}
