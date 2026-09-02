import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { ArticleCard } from "@/components/article-card"
import {
  articlesByTopic,
  getTopic,
  topicSlugs,
} from "@/lib/content"

type Props = PageProps<"/topics/[slug]">

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
      {posts.length === 0 ? (
        <p className="mt-10 text-muted-foreground">
          Nothing published in this topic yet.
        </p>
      ) : (
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      )}
    </section>
  )
}
