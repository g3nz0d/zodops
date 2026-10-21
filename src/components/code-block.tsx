export function CodeBlock({
  caption,
  code,
  changedLines,
  changedNote,
}: {
  caption?: string
  code: string
  changedLines?: number[]
  changedNote?: string
}) {
  const changed = new Set(changedLines ?? [])
  const lines = code.split("\n")

  return (
    <div>
      {changed.size > 0 ? (
        <p className="mb-2 text-[13.5px] leading-relaxed text-muted-foreground">
          <span className="font-medium text-[#ED7014]">Orange</span>{" "}
          {changedNote ?? "marks what changed from the config above."}
        </p>
      ) : null}
      <figure className="overflow-hidden rounded-xl border border-brand bg-navy">
        {caption ? (
          <figcaption className="border-b border-white/8 px-4 py-2 font-mono text-[11px] text-white/50">
            {caption}
          </figcaption>
        ) : null}
        <pre className="overflow-x-auto p-4 font-mono text-[12.5px] leading-relaxed text-navy-foreground">
          {changed.size === 0
            ? code
            : lines.map((line, index) => (
                <span
                  key={index}
                  className={
                    changed.has(index + 1) ? "text-[#ED7014]" : undefined
                  }
                >
                  {line}
                  {index < lines.length - 1 ? "\n" : null}
                </span>
              ))}
        </pre>
      </figure>
    </div>
  )
}
