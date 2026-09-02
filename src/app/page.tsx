import Link from "next/link"

import { ArticleCard } from "@/components/article-card"
import { CtaBanner } from "@/components/cta-banner"
import { TerminalPanel } from "@/components/terminal-panel"
import { TopicCard } from "@/components/topic-card"
import { articles, topics } from "@/lib/content"

const tags = ["DevOps", "Containers", "DSPM / DLP", "Cloud Security"]

export default function HomePage() {
  const latest = articles.slice(0, 3)

  return (
    <>
      <section className="hero-grid border-b border-border/70">
        <div className="container-page grid items-center gap-12 py-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16 lg:py-20">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.18em] text-brand uppercase">
              Cloud Security / DevOps / Data Protection
            </p>
            <h1 className="mt-5 max-w-xl text-[2.35rem] leading-[1.12] font-semibold tracking-tight text-foreground sm:text-5xl">
              Approach<span className="text-brand">.</span>
            </h1>
            <p className="mt-5 max-w-lg text-[16px] leading-relaxed text-muted-foreground">
              How I think about risk, tradeoffs, and what actually ships — the
              judgment behind the work, not just the write-up of it.
            </p>
            <ul className="mt-7 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full bg-[#eceff3] px-3 py-1 text-[11px] font-medium tracking-[0.12em] text-muted-foreground uppercase"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
          <TerminalPanel />
        </div>
      </section>

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
