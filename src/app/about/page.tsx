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
  { kind: "out", text: "core    cloud security, data security, security automation" },
  { kind: "out", text: "scope   enterprise accounts, large environments" },
  { kind: "out", text: "focus   AI & agent security" },
  { kind: "blank", text: "" },
  { kind: "cmd", text: "$ cat priorities.log" },
  { kind: "ok", text: "+  verify before trusting" },
  { kind: "ok", text: "+  risk-based over checkbox compliance" },
  { kind: "ok", text: "+  assume breach, design for containment" },
  { kind: "ok", text: "+  controls that ship with the code" },
  { kind: "blank", text: "" },
  { kind: "cmd", text: "$ cat reasoning-in-public.log" },
  { kind: "out", text: "ai-agent-security   active research · writing in progress" },
  { kind: "out", text: "data-security       ongoing coverage · writing in progress" },
  { kind: "blank", text: "" },
  { kind: "cmd", text: "$ ls ./currently/" },
  { kind: "out", text: "studying/   AWS & Azure certifications" },
  { kind: "blank", text: "" },
  { kind: "cmd", text: "$ cat reach.txt" },
  { kind: "out", text: "→  linkedin.com/in/ztagedini" },
]

export default function AboutPage() {
  return (
    <section className="container-page py-14 sm:py-16">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center lg:gap-16">
        <div className="space-y-5 text-[16.5px] leading-[1.75] text-foreground/85">
          <div className="space-y-3">
            <p className="text-[11px] font-semibold tracking-[0.18em] text-brand uppercase">
              Enterprise security architect · AI &amp; data security
            </p>
            <h1 className="max-w-2xl text-3xl font-semibold tracking-tight text-foreground italic sm:text-4xl">
              The model isn&apos;t the risk. Its permissions are.
            </h1>
          </div>
          <p>
            I&rsquo;m Zodi, a security architect and military veteran in{" "}
            {site.location}. For 15+ years I&rsquo;ve designed controls for
            cloud, DevOps, containers, and data protection on enterprise
            accounts, where a bad control blocks thousands of engineers and a
            missing one exposes everything they ship.
          </p>
          <p>
            Now the same problem has a new shape. AI agents read your data,
            call your tools, and act with their own credentials. Most of the
            risk isn&apos;t in the model. It&apos;s in what the agent can
            reach. That&apos;s where my focus is: agent permissions, tool and
            MCP trust, and keeping sensitive data from flowing where it
            shouldn&apos;t.
          </p>
          <p>
            ZodOps is my working notebook. It holds implementation-level
            write-ups on image provenance, IAM graphs, admission policy,
            DSPM, DLP, and AI agent security. If a design can&apos;t be
            committed to a repo, it isn&apos;t finished.
          </p>
          <p>
            Working on AI or data security, or stuck on a control that keeps
            getting bypassed? Let&apos;s talk shop.
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
