export function InlineCopy({ text }: { text: string }) {
  const parts = text.split(/(`[^`]+`)/g)

  return (
    <>
      {parts.map((part, index) => {
        if (part.length >= 2 && part.startsWith("`") && part.endsWith("`")) {
          return (
            <em key={index} className="font-mono text-[0.94em]">
              {part.slice(1, -1)}
            </em>
          )
        }
        return part
      })}
    </>
  )
}
