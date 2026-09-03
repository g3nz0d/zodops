import { principles } from "@/lib/content"

export function PrinciplesSection() {
  return (
    <section id="principles" className="container-page py-16 sm:py-20 scroll-mt-24">
      <p className="text-[11px] font-semibold tracking-[0.18em] text-brand uppercase">
        Principles
      </p>
      <div className="mt-6 divide-y divide-border border-t border-border">
        {principles.map((principle, index) => (
          <div
            key={principle.label}
            className="grid gap-2 py-5 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-6"
          >
            <span className="font-mono text-[13px] text-brand">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="text-[15px] font-semibold tracking-tight text-foreground">
                {principle.label}
              </h3>
              <p className="mt-1.5 max-w-2xl text-[14.5px] leading-relaxed text-muted-foreground">
                {principle.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
