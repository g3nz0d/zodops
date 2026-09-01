import type { Metadata } from "next"
import Link from "next/link"

import { site } from "@/lib/site"

export const metadata: Metadata = {
  title: "About",
  description:
    "Background on ZodOps — security architecture across cloud, containers, and data protection.",
}

export default function AboutPage() {
  return (
    <section className="container-page py-14 sm:py-16">
      <p className="text-[11px] font-semibold tracking-[0.18em] text-brand uppercase">
        About
      </p>
      <h1 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
        Security architecture for people who still ship.
      </h1>
      <div className="mt-8 max-w-2xl space-y-5 text-[16.5px] leading-[1.75] text-foreground/85">
        <p>
          ZodOps is the public notebook of a security architect based in{" "}
          {site.location}. The work underneath it is twelve years of cloud,
          DevOps, containers, and data protection — designing controls that
          have to live next to a release train, not in a slide.
        </p>
        <p>
          I care about the unglamorous parts: image provenance, IAM graphs,
          admission policy, DSPM inventory, and DLP on the paths that actually
          leave the cluster. Most of the writing is implementation-level on
          purpose. If a design cannot be typed into a repo, it is not finished.
        </p>
        <p>
          This site is intentionally small. Four topics, a handful of essays,
          and a way to get in touch. No newsletter maze. The same pages are
          meant to be hosted as a static site — GitLab Pages, GitHub Pages, or
          any object-storage CDN — with a custom domain in front.
        </p>
      </div>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/writing/"
          className="inline-flex h-10 items-center rounded-md bg-navy px-4 text-[11px] font-semibold tracking-[0.14em] text-navy-foreground uppercase hover:bg-navy/90"
        >
          Read the notes
        </Link>
        <Link
          href="/contact/"
          className="inline-flex h-10 items-center rounded-md border border-border px-4 text-[11px] font-semibold tracking-[0.14em] uppercase hover:bg-muted"
        >
          Get in touch
        </Link>
      </div>
    </section>
  )
}
