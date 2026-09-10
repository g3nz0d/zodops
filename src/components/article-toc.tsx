import Link from "next/link"

import type { Block, Topic } from "@/lib/content"
import { slugifyHeading } from "@/lib/content"

export function ArticleToc({
  blocks,
  topic,
}: {
  blocks: Block[]
  topic: Topic
}) {
  const headings = blocks.filter(
    (block): block is { type: "h2"; text: string } => block.type === "h2"
  )

  return (
    <aside className="lg:sticky lg:top-24 lg:self-start">
      <div className="rounded-xl border border-border bg-[#f8f9fb] p-5">
        {headings.length > 0 ? (
          <>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-muted-foreground uppercase">
              In this article
            </p>
            <nav className="mt-3 space-y-2.5">
              {headings.map((heading) => (
                <a
                  key={heading.text}
                  href={`#${slugifyHeading(heading.text)}`}
                  className="block text-[13.5px] leading-snug text-foreground/80 hover:text-brand"
                >
                  {heading.text}
                </a>
              ))}
            </nav>
            <div className="mt-5 border-t border-border pt-5">
              <TopicLink topic={topic} />
            </div>
          </>
        ) : (
          <TopicLink topic={topic} />
        )}
      </div>
    </aside>
  )
}

function TopicLink({ topic }: { topic: Topic }) {
  return (
    <>
      <p className="text-[11px] font-semibold tracking-[0.16em] text-muted-foreground uppercase">
        Filed under
      </p>
      <Link
        href={`/tech/${topic.slug}/`}
        className="mt-2 block text-[14px] font-medium text-brand hover:underline"
      >
        {topic.name} →
      </Link>
    </>
  )
}
