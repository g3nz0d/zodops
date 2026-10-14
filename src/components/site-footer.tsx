import { RssIcon } from "@/components/rss-icon"
import { site } from "@/lib/site"

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="container-page flex flex-col items-start justify-between gap-4 py-6 sm:flex-row sm:items-center">
        <p className="text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
          {site.name}
        </p>
        <a
          href="/rss.xml"
          className="inline-flex h-10 items-center gap-2.5 rounded-lg bg-[#f26522] px-4 text-white shadow-sm hover:bg-[#e05a1c]"
        >
          <RssIcon className="size-5" />
          <span className="text-[17px] font-bold tracking-tight">RSS</span>
        </a>
      </div>
    </footer>
  )
}
