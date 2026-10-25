import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { ArticleToc } from "@/components/article-toc"
import { CaseStudyBody } from "@/components/case-study-body"
import { GlanceBox } from "@/components/glance-box"
import {
  formatDate,
  slugifyHeading,
  topicBadgeClassName,
  topicBySlug,
} from "@/lib/content"
import {
  canViewCaseStudy,
  caseStudies,
  getCaseStudy,
  primaryTopic,
} from "@/lib/work"
import { cn } from "@/lib/utils"

type Props = PageProps<"/cases/[slug]">

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }))
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params
  const study = getCaseStudy(slug)
  if (!study || !canViewCaseStudy(study)) {
    return {}
  }
  const title = `${study.title} · ZodOps`
  const description = study.description
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  }
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params
  const study = getCaseStudy(slug)
  if (!study || !canViewCaseStudy(study)) {
    notFound()
  }

  const topic = primaryTopic(study)
  const tocBlocks = [
    ...(study.glanceHeading
      ? [{ type: "h2" as const, text: study.glanceHeading }]
      : []),
    ...study.body.filter(
      (block): block is { type: "h2"; text: string } => block.type === "h2"
    ),
  ]

  return (
    <article className="container-page py-14 sm:py-16">
      <div className="flex flex-col items-start gap-2">
        <p className="text-[11px] font-semibold tracking-[0.18em] text-brand uppercase">
          {study.industry
            ? `Cases · ${study.industry} · ${study.minutes} min`
            : `Case study · ${study.minutes} min`}
          {study.date ? ` · ${formatDate(study.date)}` : ""}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {study.topics.map((topicSlug) => {
            const item = topicBySlug(topicSlug)
            return (
              <Link
                key={topicSlug}
                href={`/tech/${topicSlug}/`}
                className={cn(
                  "rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-[0.1em] uppercase hover:underline",
                  topicBadgeClassName[topicSlug]
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </div>
      </div>
      <h1 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight sm:text-[2.5rem] sm:leading-tight">
        {study.title}
      </h1>
      <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-muted-foreground">
        {study.excerpt}
      </p>

      {study.glanceHeading ? (
        <h2
          id={slugifyHeading(study.glanceHeading)}
          className="mt-10 scroll-mt-24 text-xl font-semibold tracking-tight text-foreground"
        >
          {study.glanceHeading}
        </h2>
      ) : null}
      <div className={study.glanceHeading ? "mt-4 max-w-2xl" : "mt-8 max-w-2xl"}>
        <GlanceBox
          rows={study.glance}
          caption={
            study.glanceCaption ??
            "Case study summary: environment, role, tools, and timeline"
          }
        />
      </div>

      <div className="mt-12 grid min-w-0 gap-10 lg:max-w-[68rem] lg:grid-cols-[minmax(0,42rem)_1fr] lg:gap-16">
        <div className="min-w-0 max-w-2xl">
          <CaseStudyBody blocks={study.body} />
          {study.related && study.related.length > 0 ? (
            <ul className="mt-10 space-y-3 border-t border-border pt-8 text-[16.5px] leading-[1.75] text-foreground/85">
              {study.related.map((link) => (
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
        </div>
        <ArticleToc
          blocks={tocBlocks}
          topic={topic}
          label={study.glanceHeading ? "In this case" : "In this article"}
        />
      </div>
    </article>
  )
}
