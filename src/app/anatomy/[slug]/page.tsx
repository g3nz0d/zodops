import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { ArticleBody } from "@/components/article-body"
import { ArticleToc } from "@/components/article-toc"
import { GlanceBox } from "@/components/glance-box"
import {
  anatomies,
  anatomyStackLabel,
  canViewAnatomy,
  getAnatomy,
  primaryAnatomyTopic,
} from "@/lib/anatomy"
import { topicBadgeClassName, topicBySlug } from "@/lib/content"
import { cn } from "@/lib/utils"

type Props = PageProps<"/anatomy/[slug]">

export function generateStaticParams() {
  return anatomies.map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params
  const item = getAnatomy(slug)
  if (!item || !canViewAnatomy(item)) {
    return {}
  }
  const title = `${item.title} · ZodOps`
  const description = item.description
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
    },
  }
}

export default async function AnatomyPage({ params }: Props) {
  const { slug } = await params
  const item = getAnatomy(slug)
  if (!item || !canViewAnatomy(item)) {
    notFound()
  }

  const topic = primaryAnatomyTopic(item)

  return (
    <article className="container-page py-14 sm:py-16">
      <div className="flex flex-col items-start gap-2">
        <p className="text-[11px] font-semibold tracking-[0.18em] text-brand uppercase">
          Anatomy
          {" · "}
          {anatomyStackLabel[item.stack]}
          {" · "}
          {item.minutes} min
        </p>
        <div className="flex flex-wrap gap-1.5">
          {item.topics.map((topicSlug) => {
            const entry = topicBySlug(topicSlug)
            return (
              <span
                key={topicSlug}
                className={cn(
                  "rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-[0.1em] uppercase",
                  topicBadgeClassName[topicSlug]
                )}
              >
                {entry.label}
              </span>
            )
          })}
        </div>
      </div>
      <h1 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight sm:text-[2.5rem] sm:leading-tight">
        {item.title}
      </h1>
      <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-muted-foreground whitespace-pre-line">
        {item.excerpt}
      </p>

      <div className="mt-8 max-w-2xl">
        <GlanceBox
          rows={item.glance}
          caption="Anatomy summary: system, stack, and the miss"
        />
      </div>

      <div className="mt-12 grid min-w-0 gap-10 lg:max-w-[68rem] lg:grid-cols-[minmax(0,42rem)_1fr] lg:gap-16">
        <div className="min-w-0 max-w-2xl">
          <ArticleBody blocks={item.body} />
          {item.related && item.related.length > 0 ? (
            <ul className="mt-10 space-y-3 border-t border-border pt-8 text-[16.5px] leading-[1.75] text-foreground/85">
              {item.related.map((link) => (
                <li key={link.href} className="list-none">
                  <Link
                    href={link.href}
                    className="font-medium text-brand hover:underline"
                  >
                    {link.label}
                  </Link>
                  {": "}
                  {link.note}
                </li>
              ))}
            </ul>
          ) : null}
          {item.sources && item.sources.length > 0 ? (
            <div className="mt-10 border-t border-border pt-8">
              <h2 className="text-xl font-semibold tracking-tight text-foreground">
                Sources
              </h2>
              <ul className="mt-4 space-y-3 text-[16.5px] leading-[1.75] text-foreground/85">
                {item.sources.map((source) => (
                  <li key={source.href} className="list-none">
                    <a
                      href={source.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-brand hover:underline"
                    >
                      {source.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
        <ArticleToc
          blocks={item.body}
          topic={topic}
          label="In this teardown"
        />
      </div>
    </article>
  )
}
