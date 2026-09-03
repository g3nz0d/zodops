import Link from "next/link"

import { site } from "@/lib/site"

export function CtaBanner() {
  return (
    <section className="container-page pb-16">
      <div className="flex flex-col gap-8 rounded-2xl bg-navy px-7 py-10 sm:px-10 sm:py-12 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
        <div className="max-w-xl">
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-[2rem]">
            Built, broken, documented.
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-white/70">
            Fifteen-plus years across cloud, containers, and data protection. I write
            up the designs that survived contact with production — and the ones
            that did not.
          </p>
        </div>
        <div className="flex shrink-0 flex-col items-start gap-3 lg:items-end">
          <Link
            href="/about/"
            className="inline-flex h-10 items-center rounded-md border border-white/15 bg-white/10 px-4 text-sm font-medium text-white hover:bg-white/16"
          >
            Read the background
          </Link>
          <a
            href={site.linkedin}
            className="text-sm text-white/55 transition-colors hover:text-white"
            target="_blank"
            rel="noreferrer"
          >
            Connect on LinkedIn
          </a>
        </div>
      </div>
    </section>
  )
}
