export function CodeBlock({
  caption,
  code,
}: {
  caption?: string
  code: string
}) {
  return (
    <figure className="overflow-hidden rounded-xl bg-navy">
      {caption ? (
        <figcaption className="border-b border-white/8 px-4 py-2 font-mono text-[11px] text-white/50">
          {caption}
        </figcaption>
      ) : null}
      <pre className="overflow-x-auto p-4 font-mono text-[12.5px] leading-relaxed text-navy-foreground">
        {code}
      </pre>
    </figure>
  )
}
