import type { Metadata } from "next"

import { TopicCard } from "@/components/topic-card"
import { topics } from "@/lib/content"

export const metadata: Metadata = {
  description:
    "Explore ZodOps by topic: AI and agent security, data security, field notes, and security automation.",
}

export default function TechPage() {
  const [lead, ...rest] = topics

  return (
    <section className="container-page py-14 sm:py-16">
      <p className="text-[11px] font-semibold tracking-[0.18em] text-brand uppercase">
        Topics
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
        Every domain, no filler
      </h1>
      <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-muted-foreground">
        Everything here fits into one of these areas. Each topic has
        reference configs I actually run, plus the long-form articles.
      </p>
      <div className="mt-10 max-w-2xl space-y-4">
        {lead ? <TopicCard topic={lead} featured /> : null}
        <div className="grid gap-4 sm:grid-cols-2">
          {rest.map((topic) => (
            <TopicCard key={topic.slug} topic={topic} />
          ))}
        </div>
      </div>
    </section>
  )
}
