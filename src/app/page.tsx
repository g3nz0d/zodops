import Link from "next/link"

import { PrinciplesSection } from "@/components/principles-section"
import { ArticleCard } from "@/components/article-card"
import { CtaBanner } from "@/components/cta-banner"
import { HeroIntro } from "@/components/hero-intro"
import { TopicCard } from "@/components/topic-card"
import { articles, topics } from "@/lib/content"

export default function HomePage() {
  const latest = articles.slice(0, 3)

  return (
    <>
      <section className="hero-grid relative flex min-h-[calc(100vh-72px)] w-full items-center border-b border-border/70">
        <HeroIntro />
        <div className="absolute inset-x-0 bottom-8 flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-xs font-medium tracking-[0.16em] uppercase">
            Scroll to explore
          </span>
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-4 animate-bounce"
          >
            <path d="M12 5v14" />
            <path d="m19 12-7 7-7-7" />
          </svg>
        </div>
      </section>

      <PrinciplesSection />

      <section className="container-page py-16 sm:py-20">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Latest articles
          </h2>
          <Link
            href="/articles/"
            className="text-[13px] font-medium text-brand hover:underline"
          >
            View all articles
          </Link>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {latest.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>

      <section className="container-page pb-16 sm:pb-20">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Explore by tech
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {topics.map((topic) => (
            <TopicCard key={topic.slug} topic={topic} />
          ))}
        </div>
      </section>

      <CtaBanner />
    </>
  )
}
