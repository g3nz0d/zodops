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
        stroke="#5B9FF0"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22.4 17.8H9.8a5.6 5.6 0 1 1 5.37-7.2h1.43a3.6 3.6 0 1 1 0 7.2Z" />
        <path d="M12.2 17.8v5.1" />
        <path d="M16 17.8v7.2" />
        <path d="M19.8 17.8v5.1" />
      </g>
      <circle cx="12.2" cy="23.6" r="1.2" fill="#5B9FF0" />
      <circle cx="16" cy="25.7" r="1.2" fill="#5B9FF0" />
      <circle cx="19.8" cy="23.6" r="1.2" fill="#5B9FF0" />
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
