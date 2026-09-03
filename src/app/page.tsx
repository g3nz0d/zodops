import Link from "next/link"

import { ApproachSection } from "@/components/approach-section"
import { ArticleCard } from "@/components/article-card"
import { CtaBanner } from "@/components/cta-banner"
import { ProfileAvatar } from "@/components/profile-avatar"
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
            <div className="mt-5 flex items-center gap-4">
              <ProfileAvatar
                src="/zodi.jpg"
                alt="Zodi Tagedini"
                initials="ZT"
              />
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Hi, I&rsquo;m
                </p>
                <p className="text-2xl font-semibold tracking-tight text-foreground sm:text-[1.75rem]">
                  Zodi Tagedini
                </p>
              </div>
            </div>
            <p className="mt-4 text-xl font-bold tracking-tight text-brand sm:text-2xl">
              From an Army SOC to enterprise DSPM and cloud security —
              now exploring what AI security demands.
            </p>
            <p className="mt-4 max-w-lg text-[16px] leading-relaxed text-muted-foreground">
              I&apos;ve worked cloud security from every angle — Zero Trust
              and NGWAF at Fastly, DSPM and DLP at Cyera, and threat detection
              in the Army before that. This site is where I write up how I
              actually think through the work.
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

      <ApproachSection />

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
