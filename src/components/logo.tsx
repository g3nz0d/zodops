import Image from "next/image"

import { cn } from "@/lib/utils"

export function LogoMark({ className }: { className?: string }) {
  return (
    <Image
      src="/logo.png"
      alt=""
      width={32}
      height={32}
      className={cn("size-8 object-contain", className)}
      aria-hidden
    />
  )
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className="size-[32px] shrink-0" />
      <span className="text-[17px] font-semibold tracking-tight">
        <span className="text-foreground">Zod</span>
        <span className="text-brand">Ops</span>
      </span>
    </span>
  )
}
