import type { ReactNode } from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"

export const writingCardClassName =
  "writing-card flex h-full flex-col rounded-xl border border-brand bg-white p-6 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.28)] transition-[color,background-color,box-shadow,border-color] duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"

export const writingCardEyebrowClassName =
  "writing-card-ink text-[11px] font-medium tracking-[0.16em] text-muted-foreground uppercase transition-colors duration-200"

export const writingCardTitleClassName =
  "writing-card-ink mt-4 text-[17px] leading-snug font-semibold tracking-tight text-foreground transition-colors duration-200"

export const writingCardExcerptClassName =
  "writing-card-ink mt-3 flex-1 text-[14px] leading-relaxed text-muted-foreground transition-colors duration-200"

export const writingCardMetaClassName =
  "writing-card-ink mt-3 text-[12px] tracking-[0.02em] text-muted-foreground/80 transition-colors duration-200"

export const writingCardReadClassName =
  "writing-card-read mt-6 text-[11px] font-semibold tracking-[0.16em] text-brand uppercase transition-colors duration-200"

export const writingCardBadgeHoverClassName =
  "writing-card-badge transition-colors duration-200"

export function WritingCard({
  href,
  className,
  children,
}: {
  href: string
  className?: string
  children: ReactNode
}) {
  return (
    <article className="h-full">
      <Link href={href} className={cn(writingCardClassName, className)}>
        {children}
      </Link>
    </article>
  )
}
