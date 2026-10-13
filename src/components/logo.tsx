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
    // Decorative: the header link already has an accessible name.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/zodops-logo.png"
      alt=""
      width={435}
      height={144}
      className={cn("h-8 w-auto sm:h-9", className)}
    />
  )
}
