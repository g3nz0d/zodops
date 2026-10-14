"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { GithubIcon } from "@/components/github-icon"
import { LogoMark } from "@/components/logo"
import { RssIcon } from "@/components/rss-icon"
import { ctaHref, ctaLabel, site } from "@/lib/site"

export function SiteFooter() {
  const pathname = usePathname()
  const isHome = pathname === "/"

  return (
    <footer className="border-t border-border">
      <div className="container-page flex justify-end py-6">
        <div className="flex flex-wrap items-center justify-end gap-2.5">
          {!isHome ? (
            <Link
              href="/"
              aria-label="ZodOps home"
              className="inline-flex size-9 items-center justify-center rounded-md border border-brand hover:bg-brand/5"
            >
              <LogoMark className="size-5" />
            </Link>
          ) : null}
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="GitHub"
            className="inline-flex size-9 items-center justify-center rounded-md border border-brand text-brand hover:bg-brand/5"
          >
            <GithubIcon />
          </a>
          <a
            href="/rss.xml"
            className="inline-flex h-9 items-center gap-2 rounded-md bg-[#f26522] px-3.5 text-white hover:bg-[#e05a1c]"
          >
            <RssIcon />
            <span className="text-[13px] font-bold tracking-tight">RSS</span>
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
