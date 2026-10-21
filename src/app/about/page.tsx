import type { Metadata } from "next"

import { TerminalPanel, type TerminalLine } from "@/components/terminal-panel"

export const metadata: Metadata = {
  description:
    "Background on ZodOps — security architecture across cloud, containers, and data protection.",
}

const aboutLines: TerminalLine[] = [
  { kind: "cmd", text: "$ whoami --history" },
  { kind: "out", text: "13y     security architecture · cloud & data protection" },
  { kind: "out", text: "core    cloud security, data security, security automation" },
  { kind: "out", text: "scope   enterprise accounts, large environments" },
  { kind: "out", text: "focus   agent security" },
  { kind: "blank", text: "" },
  { kind: "cmd", text: "$ cat credentials.log" },
  { kind: "ok", text: "+  AWS Certified Cloud Practitioner — AWS" },
  { kind: "ok", text: "+  Certified DSPM Architect — Cyera" },
  { kind: "blank", text: "" },
  { kind: "cmd", text: "$ cat priorities.log" },
  { kind: "ok", text: "+  verify before trusting" },
  { kind: "ok", text: "+  risk-based over checkbox compliance" },
  { kind: "ok", text: "+  assume breach, design for containment" },
  { kind: "ok", text: "+  controls that ship with the code" },
  { kind: "blank", text: "" },
  { kind: "cmd", text: "$ cat reasoning-in-public.log" },
  { kind: "out", text: "agent-security       active research · writing in progress" },
  { kind: "out", text: "cloud-security      ongoing coverage · writing in progress" },
  { kind: "out", text: "data-security       ongoing coverage · writing in progress" },
  { kind: "blank", text: "" },
  { kind: "cmd", text: "$ ls ./currently/" },
  { kind: "out", text: "studying/   Azure Admin Associate Certification" },
  { kind: "out", text: "studying/   AWS Certified Solutions Architect" },
  { kind: "blank", text: "" },
  { kind: "cmd", text: "$ cat reach.txt" },
  { kind: "out", text: "→  linkedin.com/in/ztagedini" },
]

export default function AboutPage() {
  return (
    <section className="container-page py-14 sm:py-16">
      <p className="text-[11px] font-semibold tracking-[0.18em] text-brand uppercase">
        Enterprise security architect · agent &amp; data security
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight italic text-foreground sm:text-4xl lg:whitespace-nowrap">
        &ldquo;The model isn&apos;t the risk. Its permissions are.&rdquo;
      </h1>
      <p className="mt-3 text-[16px] leading-relaxed text-muted-foreground lg:whitespace-nowrap">
        Enterprise security architect. Veteran. Now securing what agents can
        touch.
      </p>
      <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center lg:gap-20">
        <div className="space-y-5 text-[16.5px] leading-[1.75] text-foreground/85">
          <p>
            I&rsquo;m Zodi, a security architect and military veteran based
            in San Diego. For 13 years I&rsquo;ve built security controls
            that have to work in the real world, not just on a whiteboard.
          </p>
          <p>
            Most of that time has been spent inside enterprise cloud,
            DevOps, container, and data-protection programs, where the
            stakes cut both ways. A bad control slows thousands of
            engineers. A missing one exposes everything they ship. The
            craft is finding the line that protects the business without
            getting in its way.
          </p>
          <p>
            Today that same problem has a new shape. Agents read your
            data, call your tools, and act with credentials of their own.
            The question is no longer just who has access&hellip;it&rsquo;s
            what an agent can do with it. That&rsquo;s where I spend my time
            now: agent permissions, tool and MCP trust, and keeping
            sensitive data from flowing where it shouldn&rsquo;t.
          </p>
          <p>
            ZodOps is my working notebook. Inside are write-ups on image
            provenance, IAM graphs, admission policy, DSPM, DLP, and
            agent security. Each one aims to be practical enough to use and
            specific enough to build on. My rule of thumb: if a design
            can&rsquo;t be committed to a repo, it isn&rsquo;t finished.
          </p>
          <p>
            If you&rsquo;re building in agent or data security, or wrestling
            with a control that keeps getting bypassed, I&rsquo;d love to
            hear about it.
          </p>
          <p>Ping me and let&rsquo;s talk shop.</p>
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
