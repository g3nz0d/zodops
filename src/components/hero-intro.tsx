import Link from "next/link"

import { ProfileAvatar } from "@/components/profile-avatar"
import { publishedArticles, topics } from "@/lib/content"
import { site } from "@/lib/site"

const stats = [
  { value: site.years, label: "Years" },
  { value: "8+", label: "Industries" },
  { value: `${publishedArticles.length}`, label: "Articles" },
  {
    value: "1",
    label: "Published Book",
    href: site.book.href,
    hrefTitle: site.book.title,
  },
]

export function HeroIntro() {
  return (
    <div className="container-page flex w-full flex-col items-center gap-16 py-10 xl:flex-row xl:items-center xl:justify-center xl:gap-32 xl:py-14">
      <ProfileAvatar
        src="/zodi.jpg"
        alt="Zodi Tagedini"
        initials="ZT"
        className="size-72 sm:size-96 lg:size-[28rem] xl:size-[28rem]"
      />
      <div className="max-w-[38rem] space-y-7 text-center xl:text-left">
        <div>
          <p className="text-lg font-medium text-muted-foreground sm:text-xl">
            Hi, I&rsquo;m
          </p>
          <p className="flex flex-wrap items-center justify-center gap-3 xl:justify-start">
            <span className="text-5xl font-semibold tracking-tight text-foreground sm:text-6xl">
              Zodi Tagedini
            </span>
          </p>
          <p className="mt-1 text-xl font-normal text-muted-foreground sm:text-2xl">
            — {site.role.toLowerCase()}
          </p>
        </div>
        <p className="text-2xl font-bold tracking-tight text-brand sm:text-3xl xl:whitespace-nowrap">
          Fifteen years in. I still verify before I trust.
        </p>
        <p className="max-w-[38rem] text-lg leading-relaxed text-muted-foreground sm:text-xl xl:whitespace-nowrap">
          Learned the hard way — written down so you don&apos;t have to.
        </p>
        <ul className="flex flex-wrap justify-center gap-2 xl:flex-nowrap xl:justify-start">
          {topics.map((topic) => (
            <li key={topic.slug}>
              <Link
                href={`/tech/${topic.slug}/`}
                className="rounded-full bg-[#eceff3] px-2.5 py-1 text-[10px] font-medium tracking-[0.08em] whitespace-nowrap text-muted-foreground uppercase transition-colors hover:bg-[#e3e7ec] hover:text-foreground sm:text-[11px]"
              >
                {topic.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 xl:flex-nowrap xl:justify-between">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center xl:text-left">
              <div className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                {stat.href ? (
                  <a
                    href={stat.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    title={stat.hrefTitle}
                    className="hover:text-brand hover:underline"
                  >
                    {stat.value}
                  </a>
                ) : (
                  stat.value
                )}
              </div>
              <div className="mt-1 whitespace-nowrap text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase sm:text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
