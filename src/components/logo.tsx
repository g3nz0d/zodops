import { cn } from "@/lib/utils"

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-8", className)}
      aria-hidden
    >
      <rect width="32" height="32" rx="8" fill="#2F6FED" />
      <path
        d="M8 8h16v3.6L13.2 20.2H24V24H8v-3.6L18.8 11.8H8V8Z"
        fill="white"
      />
    </svg>
  )
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className="size-[30px] shrink-0" />
      <span className="text-[17px] font-semibold tracking-tight text-foreground">
        ZodOps
      </span>
    </span>
  )
}
