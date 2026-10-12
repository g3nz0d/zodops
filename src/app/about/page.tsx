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
  { kind: "out", text: "15y+    security architecture · cloud & data protection" },
  { kind: "out", text: "core    DevOps, cloud security, containers" },
  { kind: "out", text: "scope   enterprise accounts, large environments" },
  { kind: "out", text: "focus   AI security, DLP" },
  { kind: "blank", text: "" },
  { kind: "cmd", text: "$ cat priorities.log" },
  { kind: "ok", text: "+  verify before trusting" },
  { kind: "ok", text: "+  risk-based over checkbox compliance" },
  { kind: "ok", text: "+  assume breach, design for containment" },
  { kind: "ok", text: "+  controls that ship with the code" },
  { kind: "blank", text: "" },
  { kind: "cmd", text: "$ ls ./field-notes/" },
  { kind: "out", text: "ai-security/   reasoning in public" },
  { kind: "out", text: "dspm-dlp/      reasoning in public" },
  { kind: "blank", text: "" },
  { kind: "cmd", text: "$ ls ./currently/" },
  { kind: "out", text: "studying/   AWS & Azure certifications" },
  { kind: "blank", text: "" },
  { kind: "cmd", text: "$ cat reach.txt" },
  { kind: "out", text: "→  linkedin.com/in/ztagedini" },
]

export default function AboutPage() {
  return (
    <section className="container-page flex min-h-[calc(100vh-72px)] flex-col justify-center py-16 sm:py-20">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center lg:gap-16">
        <div className="space-y-5 text-[16.5px] leading-[1.75] text-foreground/85">
          <div className="space-y-3">
            <p className="text-[11px] font-semibold tracking-[0.18em] text-brand uppercase">
              About
            </p>
            <h1 className="max-w-2xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Security architecture for people who still ship.
            </h1>
          </div>
          <p>
            I&rsquo;m Zodi, a security architect in {site.location}. For 15+
            years I&rsquo;ve worked across cloud, DevOps, containers, and data
            protection, designing controls that live next to a release
            train, not in a slide deck. Most of that work has been on
            enterprise accounts, where a bad control blocks thousands of
            engineers instead of a handful.
          </p>
          <p>
            ZodOps is my public notebook. I write about the unglamorous
            parts: image provenance, IAM graphs, admission policy, DSPM
            inventory, and DLP on the paths that actually leave the cluster.
            Increasingly, that means securing AI systems, where models,
            agents, and sensitive data meet. The writing is
            implementation-level on purpose. If a design can&apos;t be
            committed to a repo, it isn&apos;t finished.
          </p>
          <p>
            The site is small by design: a handful of essays, no newsletter
            maze, and a direct line if you want to talk shop.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/articles/"
              className="inline-flex h-10 items-center rounded-md bg-navy px-4 text-[11px] font-semibold tracking-[0.14em] text-navy-foreground uppercase hover:bg-navy/90"
            >
              Read the notes
            </Link>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex h-10 items-center rounded-md border border-border px-4 text-[11px] font-semibold tracking-[0.14em] uppercase hover:bg-muted"
            >
              Get in touch
            </a>
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
