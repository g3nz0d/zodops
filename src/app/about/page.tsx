import type { Metadata } from "next"
import Link from "next/link"

import { TerminalPanel, type TerminalLine } from "@/components/terminal-panel"
import { site } from "@/lib/site"

export const metadata: Metadata = {
  description:
    "Background on ZodOps — security architecture across cloud, containers, and data protection.",
}

const aboutLines: TerminalLine[] = [
  { kind: "cmd", text: "$ whoami --history" },
  { kind: "out", text: "15y     security architecture · cloud & data protection" },
  { kind: "out", text: "core    DevOps, Cloud Security" },
  { kind: "out", text: "active  AI Security, DLP" },
  { kind: "blank", text: "" },
  { kind: "cmd", text: "$ cat priorities.log" },
  { kind: "ok", text: "+  verify before trusting" },
  { kind: "ok", text: "+  risk-based over checkbox compliance" },
  { kind: "ok", text: "+  assume breach, design for containment" },
  { kind: "warn", text: "~  still learning: AI security, DLP" },
  { kind: "blank", text: "" },
  { kind: "cmd", text: "$ ls ./currently/" },
  { kind: "out", text: "writing/    field notes" },
  { kind: "out", text: "pursuit/    AWS and Azure certifications" },
  { kind: "blank", text: "" },
  { kind: "cmd", text: "$ cat reach.txt" },
  { kind: "out", text: "→  linkedin.com/in/ztagedini" },
]

export default function AboutPage() {
  return (
    <section className="container-page py-14 sm:py-16">
      <p className="text-[11px] font-semibold tracking-[0.18em] text-brand uppercase">
        About
      </p>
      <h1 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
        Security architecture for people who still ship.
      </h1>

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
        <div className="space-y-5 text-[16.5px] leading-[1.75] text-foreground/85">
          <p>
            ZodOps is the public notebook of a security architect based in{" "}
            {site.location}. The work underneath it is fifteen-plus years of
            cloud, DevOps, containers, and data protection — designing
            controls that have to live next to a release train, not in a
            slide.
          </p>
          <p>
            I care about the unglamorous parts: image provenance, IAM graphs,
            admission policy, DSPM inventory, and DLP on the paths that
            actually leave the cluster. Most of the writing is
            implementation-level on purpose. If a design cannot be typed into
            a repo, it is not finished.
          </p>
          <p>
            This site is intentionally small. Four topics, a handful of
            essays, and a way to get in touch. No newsletter maze. The same
            pages are meant to be hosted as a static site — GitLab Pages,
            GitHub Pages, or any object-storage CDN — with a custom domain in
            front.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/articles/"
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
        </div>
        <TerminalPanel
          title="~/about/zodi.sh"
          lines={aboutLines}
          showStats={false}
        />
      </div>
    </section>
  )
}
