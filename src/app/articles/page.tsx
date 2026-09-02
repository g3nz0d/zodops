import type { Metadata } from "next"

import { ArticleCard } from "@/components/article-card"
import { articles } from "@/lib/content"

export const metadata: Metadata = {
  description:
    "Implementation-level articles on DevOps, containers, DSPM/DLP, and cloud security.",
}

export default function ArticlesPage() {
  return (
    <section className="container-page py-14 sm:py-16">
      <p className="text-[11px] font-semibold tracking-[0.18em] text-brand uppercase">
        Articles
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
        Notes that survived production
      </h1>
      <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-muted-foreground">
        Long-form pieces on the controls, pipelines, and data paths I actually
        implement. Newest first.
      </p>
      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </section>
  )
}
