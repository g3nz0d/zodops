import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { ArticleToc } from "@/components/article-toc"
import { CaseStudyBody } from "@/components/case-study-body"
import { GlanceBox } from "@/components/glance-box"
import { topicBadgeClassName, topicBySlug } from "@/lib/content"
import {
  canViewCaseStudy,
  caseStudies,
  getCaseStudy,
  primaryTopic,
} from "@/lib/work"
import { cn } from "@/lib/utils"

type Props = PageProps<"/work/[slug]">

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
  const description =
    "How I paired DSPM with endpoint and inline DLP to find shadow AI usage and leaked credentials, and cut false positives by distinguishing corporate from personal AI instances."
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

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params
  const study = getCaseStudy(slug)
  if (!study || !canViewCaseStudy(study)) {
    notFound()
  }

  const topic = primaryTopic(study)
  const tocBlocks = study.body
    .filter((block): block is { type: "h2"; text: string } => block.type === "h2")

  return (
    <article className="container-page py-14 sm:py-16">
      <div className="flex flex-col items-start gap-2">
        <p className="text-[11px] font-semibold tracking-[0.18em] text-brand uppercase">
          Case study
          {" · "}
          {study.minutes} min
        </p>
        <div className="flex flex-wrap gap-1.5">
          {study.topics.map((slug) => {
            const item = topicBySlug(slug)
            return (
              <span
                key={slug}
                className={cn(
                  "rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-[0.1em] uppercase",
                  topicBadgeClassName[slug]
                )}
              >
                {item.label}
              </span>
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

      <div className="mt-8 max-w-2xl">
        <GlanceBox rows={study.glance} />
      </div>

      <div className="mt-12 grid min-w-0 gap-10 lg:max-w-[68rem] lg:grid-cols-[minmax(0,42rem)_1fr] lg:gap-16">
        <div className="min-w-0 max-w-2xl">
          <CaseStudyBody blocks={study.body} />
        </div>
        <ArticleToc blocks={tocBlocks} topic={topic} />
      </div>
    </article>
  )
}
