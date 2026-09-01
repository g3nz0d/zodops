import { site } from "@/lib/site"

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="container-page flex flex-col gap-2 py-6 text-[11px] tracking-[0.16em] text-muted-foreground uppercase sm:flex-row sm:items-center sm:justify-between">
        <p>
          {site.name} · {site.role} · Cloud &amp; DevSecOps
        </p>
        <p>{site.location}</p>
      </div>
    </footer>
  )
}
