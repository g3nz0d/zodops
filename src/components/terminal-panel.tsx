import { site } from "@/lib/site"
import { articles } from "@/lib/content"

const lines = [
  { kind: "cmd" as const, text: "$ scan --scope cluster --fail-on high" },
  { kind: "dim" as const, text: "scanning 42 workloads · 6 namespaces" },
  { kind: "ok" as const, text: "✓  image digest pinned          38/42" },
  { kind: "warn" as const, text: "!  privileged containers        2" },
  { kind: "err" as const, text: "✗  secrets in env               1" },
  { kind: "blank" as const, text: "" },
  { kind: "cmd" as const, text: "$ kubectl get ns --show-labels" },
  { kind: "dim" as const, text: "NAME             STATUS   AGE" },
  { kind: "out" as const, text: "prod             Active   412d" },
  { kind: "out" as const, text: "build            Active   89d" },
  { kind: "blank" as const, text: "" },
  { kind: "cmd" as const, text: "$ dlp policy diff --from main" },
  { kind: "ok" as const, text: "+  block exfil via object store" },
  { kind: "warn" as const, text: "~  classify unstructured at rest" },
  { kind: "out" as const, text: "   posture score  72 → 81" },
]

export function TerminalPanel() {
  return (
    <div className="overflow-hidden rounded-xl border border-black/8 bg-white shadow-[0_12px_40px_-18px_rgba(15,23,42,0.28)]">
      <div className="bg-navy px-4 pt-3.5 pb-4">
        <div className="mb-4 flex items-center gap-2">
          <span className="size-[9px] rounded-full bg-[#ff5f57]" />
          <span className="size-[9px] rounded-full bg-[#febc2e]" />
          <span className="size-[9px] rounded-full bg-[#28c840]" />
          <span className="ml-2 font-mono text-[10px] tracking-[0.12em] text-white/45 uppercase">
            ~/notes/posture.sh
          </span>
        </div>
        <pre className="font-mono text-[11px] leading-[1.7] sm:text-[12px]">
          {lines.map((line, index) => (
            <div
              key={`${line.text}-${index}`}
              className={
                line.kind === "cmd"
                  ? "text-[#7eb6ff]"
                  : line.kind === "ok"
                    ? "text-[#7ddea0]"
                    : line.kind === "warn"
                      ? "text-[#f0c674]"
                      : line.kind === "err"
                        ? "text-[#f09797]"
                        : line.kind === "dim"
                          ? "text-white/40"
                          : "text-navy-foreground/80"
              }
            >
              {line.text || " "}
            </div>
          ))}
        </pre>
      </div>
      <div className="grid grid-cols-3 divide-x divide-border">
        <Stat value={`${site.years}`} label="Years" />
        <Stat value={`${site.domains}`} label="Domains" />
        <Stat value={`${articles.length}`} label="Articles" />
      </div>
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
