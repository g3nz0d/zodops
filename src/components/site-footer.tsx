import Link from "next/link"

import { site } from "@/lib/site"

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="container-page flex flex-col gap-3 py-6 text-[11px] tracking-[0.16em] text-muted-foreground uppercase sm:flex-row sm:items-center sm:justify-between">
        <p>
          {site.name} · {site.role} · Cloud &amp; DevSecOps
        </p>
        <div className="flex items-center gap-4">
          <Link href="/contact/" className="hover:text-foreground">
            Contact
          </Link>
          <a href={`mailto:${site.email}`} className="hover:text-foreground">
            {site.email}
          </a>
          <p>{site.location}</p>
        </div>
      </div>
    </footer>
  )
}
