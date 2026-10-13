import { site } from "@/lib/site"

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="container-page flex flex-col gap-3 py-6 text-[11px] tracking-[0.16em] text-muted-foreground uppercase sm:flex-row sm:items-center sm:justify-between">
        <p>
          {site.name} · {site.role} · Cloud &amp; DevSecOps
        </p>
        <div className="flex items-center gap-4">
          <a href={`mailto:${site.email}`} className="hover:text-foreground">
            {site.email}
          </a>
          <a href="/rss.xml" className="hover:text-foreground">
            RSS
          </a>
          <p>{site.location}</p>
        </div>
      </div>
    </footer>
  )
}
