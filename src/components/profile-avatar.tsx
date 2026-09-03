import { cn } from "@/lib/utils"

export function ProfileAvatar({
  src,
  alt,
  initials,
  className,
  style,
}: {
  src?: string
  alt: string
  initials: string
  className?: string
  style?: React.CSSProperties
}) {
  if (src) {
    return (
      <span
        style={style}
        className={cn(
          "relative inline-block shrink-0 overflow-hidden rounded-full ring-2 ring-brand/20",
          className
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="size-full object-cover" />
      </span>
    )
  }

  return (
    <div
      role="img"
      aria-label={alt}
      style={style}
      className={cn(
        "flex size-20 shrink-0 items-center justify-center rounded-full bg-brand text-lg font-semibold text-white ring-2 ring-brand/20",
        className
      )}
    >
      {initials}
    </div>
  )
}
