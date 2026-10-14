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
      <g
        stroke="#12161C"
        strokeWidth="1.7"
        strokeLinecap="round"
      >
        <line x1="14.4" y1="16.6" x2="9.1" y2="8.4" />
        <line x1="14.4" y1="16.6" x2="24.1" y2="7.8" />
        <line x1="14.4" y1="16.6" x2="25.6" y2="16.1" />
        <line x1="14.4" y1="16.6" x2="7.2" y2="24.6" />
        <line x1="14.4" y1="16.6" x2="24.2" y2="25.6" />
      </g>
      <circle
        cx="24.1"
        cy="7.8"
        r="3.35"
        fill="#fff"
        stroke="#12161C"
        strokeWidth="1.6"
      />
      <circle
        cx="7.2"
        cy="24.6"
        r="3.35"
        fill="#fff"
        stroke="#12161C"
        strokeWidth="1.6"
      />
      <circle cx="14.4" cy="16.6" r="2.65" fill="#12161C" />
      <circle cx="9.1" cy="8.4" r="2.15" fill="#2F6FED" />
      <circle cx="25.6" cy="16.1" r="2.15" fill="#2F6FED" />
      <circle cx="24.2" cy="25.6" r="2.15" fill="#2F6FED" />
    </svg>
  )
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className="size-[30px] shrink-0" />
      <span className="text-[17px] font-semibold tracking-tight">
        <span className="text-foreground">Zod</span>
        <span className="text-brand">Ops</span>
      </span>
    </span>
  )
}
