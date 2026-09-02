import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { ArticleBody } from "@/components/article-body"
import { ArticleCard } from "@/components/article-card"
import {
  articles,
  formatDate,
  getArticle,
  topicBySlug,
} from "@/lib/content"

type Props = PageProps<"/articles/[slug]">

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }))
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) {
    return {}
  }
  return {
    description: article.excerpt,
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) {
    notFound()
  }

  const topic = topicBySlug(article.topic)
  const related = articles
    .filter((item) => item.slug !== article.slug && item.topic === article.topic)
    .slice(0, 2)

  return (
    <article className="container-page py-14 sm:py-16">
      <p className="text-[11px] font-semibold tracking-[0.18em] text-brand uppercase">
        <Link href={`/tech/${topic.slug}/`} className="hover:underline">
          {topic.label}
        </Link>
        {" · "}
        {article.minutes} min · {formatDate(article.date)}
      </p>
      <h1 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight sm:text-[2.5rem] sm:leading-tight">
        {article.title}
      </h1>
      <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-muted-foreground">
        {article.excerpt}
      </p>
      <div className="mt-12 max-w-2xl">
        <ArticleBody blocks={article.body} />
      </div>
      {related.length > 0 ? (
        <section className="mt-16 border-t border-border pt-12">
          <h2 className="text-xl font-semibold tracking-tight">More in {topic.name}</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {related.map((item) => (
              <ArticleCard key={item.slug} article={item} />
            ))}
          </div>
        </section>
      ) : null}
    </article>
  )
}
