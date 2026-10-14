import Link from "next/link"

import { GithubIcon } from "@/components/github-icon"
import { Logo } from "@/components/logo"
import { RssIcon } from "@/components/rss-icon"
import { ctaHref, ctaLabel, site } from "@/lib/site"

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="container-page flex flex-wrap items-center justify-between gap-4 py-6">
        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            href="/"
            className="rounded-md outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            aria-label="ZodOps home"
          >
            <Logo />
          </Link>
          <a
            href="/rss.xml"
            className="inline-flex h-9 items-center gap-2 rounded-md bg-[#f26522] px-3.5 text-white hover:bg-[#e05a1c]"
          >
            <RssIcon />
            <span className="text-[13px] font-bold tracking-tight">RSS</span>
          </a>
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="GitHub"
            className="inline-flex size-9 items-center justify-center rounded-md border border-brand text-brand hover:bg-brand/5"
          >
            <GithubIcon />
          </a>
          <Link
            href={ctaHref}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex h-9 items-center rounded-md bg-brand px-3.5 text-[11px] font-semibold tracking-[0.14em] text-white uppercase hover:bg-brand/90"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </footer>
  )
}
