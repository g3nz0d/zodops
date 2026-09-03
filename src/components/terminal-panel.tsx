import { site } from "@/lib/site"
import { articles } from "@/lib/content"

export type TerminalLineKind = "cmd" | "dim" | "ok" | "warn" | "err" | "out" | "blank"

export type TerminalLine = {
  kind: TerminalLineKind
  text: string
}

export const postureLines: TerminalLine[] = [
  { kind: "cmd", text: "$ scan --scope cluster --fail-on high" },
  { kind: "dim", text: "scanning 42 workloads · 6 namespaces" },
  { kind: "ok", text: "✓  image digest pinned          38/42" },
  { kind: "warn", text: "!  privileged containers        2" },
  { kind: "err", text: "✗  secrets in env               1" },
  { kind: "blank", text: "" },
  { kind: "cmd", text: "$ kubectl get ns --show-labels" },
  { kind: "dim", text: "NAME             STATUS   AGE" },
  { kind: "out", text: "prod             Active   412d" },
  { kind: "out", text: "build            Active   89d" },
  { kind: "blank", text: "" },
  { kind: "cmd", text: "$ dlp policy diff --from main" },
  { kind: "ok", text: "+  block exfil via object store" },
  { kind: "warn", text: "~  classify unstructured at rest" },
  { kind: "out", text: "   posture score  72 → 81" },
]

const kindClass: Record<TerminalLineKind, string> = {
  cmd: "text-[#7eb6ff]",
  ok: "text-[#7ddea0]",
  warn: "text-[#f0c674]",
  err: "text-[#f09797]",
  dim: "text-white/40",
  out: "text-navy-foreground/80",
  blank: "text-navy-foreground/80",
}

export function TerminalPanel({
  title = "~/notes/posture.sh",
  lines = postureLines,
  showStats = true,
}: {
  title?: string
  lines?: TerminalLine[]
  showStats?: boolean
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-black/8 bg-white shadow-[0_12px_40px_-18px_rgba(15,23,42,0.28)]">
      <div className="bg-navy px-4 pt-3.5 pb-4">
        <div className="mb-4 flex items-center gap-2">
          <span className="size-[9px] rounded-full bg-[#ff5f57]" />
          <span className="size-[9px] rounded-full bg-[#febc2e]" />
          <span className="size-[9px] rounded-full bg-[#28c840]" />
          <span className="ml-2 font-mono text-[10px] tracking-[0.12em] text-white/45 uppercase">
            {title}
          </span>
        </div>
        <pre className="font-mono text-[11px] leading-[1.7] sm:text-[12px]">
          {lines.map((line, index) => (
            <div key={`${line.text}-${index}`} className={kindClass[line.kind]}>
              {line.text || " "}
            </div>
          ))}
        </pre>
      </div>
      {showStats ? (
        <div className="grid grid-cols-3 divide-x divide-border">
          <Stat value={`${site.years}`} label="Years" />
          <Stat value={`${site.domains}`} label="Domains" />
          <Stat value={`${articles.length}`} label="Articles" />
        </div>
      ) : null}
    </div>
  )
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="px-2 py-4 text-center sm:py-5">
      <div className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
        {value}
      </div>
      <div className="mt-0.5 text-[10px] font-medium tracking-[0.16em] text-muted-foreground uppercase">
        {label}
      </div>
    </div>
  )
}
