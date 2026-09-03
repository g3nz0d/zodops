import { cn } from "@/lib/utils"

export function ProfileAvatar({
  src,
  alt,
  initials,
  className,
}: {
  src?: string
  alt: string
  initials: string
  className?: string
}) {
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        className={cn(
          "size-20 shrink-0 rounded-full object-cover ring-2 ring-brand/20",
          className
        )}
      />
    )
  }

  return (
    <div
      role="img"
      aria-label={alt}
      className={cn(
        "flex size-20 shrink-0 items-center justify-center rounded-full bg-brand text-lg font-semibold text-white ring-2 ring-brand/20",
        className
      )}
    >
      {initials}
    </div>
  )
}
