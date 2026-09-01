"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

import { Logo } from "@/components/logo"
import { nav } from "@/lib/site"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md">
      <div className="container-page grid h-[72px] grid-cols-[1fr_auto] items-center md:grid-cols-[1fr_auto_1fr]">
        <Link
          href="/"
          className="justify-self-start"
          aria-label="ZodOps home"
          onClick={() => setOpen(false)}
        >
          <Logo />
        </Link>

        <nav className="hidden items-center justify-center gap-8 md:flex">
          {nav.map((item) => {
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

        <div className="hidden justify-self-end md:block">
          <Link
            href="/writing/"
            className="inline-flex h-9 items-center rounded-md bg-navy px-3.5 text-[11px] font-semibold tracking-[0.14em] text-navy-foreground uppercase hover:bg-navy/90"
          >
            Read my work
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

      {open ? (
        <div
          id="mobile-nav"
          className="fixed inset-0 top-[72px] z-50 md:hidden"
        >
          <button
            type="button"
            className="absolute inset-0 bg-navy/30"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />
          <nav className="relative ml-auto flex h-full w-[min(100%,18rem)] flex-col gap-1 bg-white px-5 py-6 shadow-xl">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-1 py-3 text-sm font-medium tracking-[0.14em] text-foreground uppercase"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/writing/"
              className="mt-3 inline-flex h-10 items-center justify-center rounded-md bg-navy text-[11px] font-semibold tracking-[0.14em] text-navy-foreground uppercase hover:bg-navy/90"
              onClick={() => setOpen(false)}
            >
              Read my work
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  )
}
