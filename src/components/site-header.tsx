"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

import { GithubIcon } from "@/components/github-icon"
import { Logo } from "@/components/logo"
import { ctaHref, ctaLabel, nav, site } from "@/lib/site"
import { isWorkVisible } from "@/lib/work"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const items = nav.filter(
    (item) => item.href !== "/work/" || isWorkVisible()
  )

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md">
        <div className="container-page grid h-[72px] grid-cols-[1fr_auto] items-center md:grid-cols-[1fr_auto_1fr]">
          <Link
            href="/"
            className="justify-self-start rounded-md outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            aria-label="ZodOps home"
            onClick={() => setOpen(false)}
          >
            <Logo />
          </Link>

          <nav className="hidden items-center justify-center gap-6 lg:gap-8 md:flex">
            {items.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-[11px] font-medium tracking-[0.18em] uppercase transition-colors",
                    active
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <div className="hidden items-center gap-2.5 justify-self-end md:flex">
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="GitHub"
              className="inline-flex size-9 items-center justify-center rounded-md border border-border text-foreground hover:bg-muted"
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

          <button
            type="button"
            className="inline-flex size-10 items-center justify-center justify-self-end rounded-md text-foreground hover:bg-muted md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </header>

      {open ? (
        <div
          id="mobile-nav"
          className="fixed inset-0 z-[100] md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
        >
          <button
            type="button"
            className="absolute inset-0 bg-navy/40"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />
          <nav className="absolute top-0 right-0 flex h-full w-[min(100%,18rem)] flex-col gap-1 bg-white px-5 py-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <Logo />
              <button
                type="button"
                className="inline-flex size-10 items-center justify-center rounded-md hover:bg-muted"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                <X className="size-5" />
              </button>
            </div>
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-1 py-3 text-sm font-medium tracking-[0.14em] text-foreground uppercase"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 flex items-center gap-2.5">
              <a
                href={site.github}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="GitHub"
                className="inline-flex size-10 shrink-0 items-center justify-center rounded-md border border-border text-foreground hover:bg-muted"
                onClick={() => setOpen(false)}
              >
                <GithubIcon />
              </a>
              <Link
                href={ctaHref}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex h-10 flex-1 items-center justify-center rounded-md bg-brand text-[11px] font-semibold tracking-[0.14em] text-white uppercase hover:bg-brand/90"
                onClick={() => setOpen(false)}
              >
                {ctaLabel}
              </Link>
            </div>
          </nav>
        </div>
      ) : null}
    </>
  )
}
