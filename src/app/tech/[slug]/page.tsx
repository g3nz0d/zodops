import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { ArticleCard } from "@/components/article-card"
import { CodeBlock } from "@/components/code-block"
import {
  articlesByTopic,
  configsForTopic,
  getTopic,
  topicSlugs,
} from "@/lib/content"

type Props = PageProps<"/tech/[slug]">

export function generateStaticParams() {
  return topicSlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params
  const topic = getTopic(slug)
  if (!topic) {
    return {}
  }
  return {
    description: topic.longDescription,
  }
}

export default async function TopicPage({ params }: Props) {
  const { slug } = await params
  const topic = getTopic(slug)
  if (!topic) {
    notFound()
  }

  const posts = articlesByTopic(topic.slug)
  const configs = configsForTopic(topic.slug)

  return (
    <section className="container-page py-14 sm:py-16">
      <p className="text-[11px] font-semibold tracking-[0.18em] text-brand uppercase">
        Topic
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
        {topic.name}
      </h1>
      <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-muted-foreground">
        {topic.longDescription}
      </p>

      {configs.length > 0 ? (
        <div className="mt-10">
          <h2 className="text-xl font-semibold tracking-tight">
            Working with {topic.name}
          </h2>
          <p className="mt-2 max-w-2xl text-[14.5px] leading-relaxed text-muted-foreground">
            Reference configs and one-liners I actually run — no theory, no
            slide deck.
          </p>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {configs.map((config) => (
              <div key={config.title} className="min-w-0">
                <h3 className="text-[15px] font-semibold text-foreground">
                  {config.title}
                </h3>
                <p className="mt-1 text-[13.5px] leading-relaxed text-muted-foreground">
                  {config.description}
                </p>
                <div className="mt-3">
                  <CodeBlock code={config.code} />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <div className="mt-14">
        <h2 className="text-xl font-semibold tracking-tight">
          Articles on {topic.name}
        </h2>
        {posts.length === 0 ? (
          <p className="mt-4 text-muted-foreground">
            Nothing published in this topic yet.
          </p>
        ) : (
          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
