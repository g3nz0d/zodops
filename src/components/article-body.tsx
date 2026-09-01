import type { Block } from "@/lib/content"

export function ArticleBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((block, index) => {
        if (block.type === "p") {
          return (
            <p
              key={index}
              className="text-[16.5px] leading-[1.75] text-foreground/85"
            >
              {block.text}
            </p>
          )
        }
        if (block.type === "h2") {
          return (
            <h2
              key={index}
              className="pt-4 text-xl font-semibold tracking-tight text-foreground"
            >
              {block.text}
            </h2>
          )
        }
        if (block.type === "ul") {
          return (
            <ul
              key={index}
              className="space-y-2 pl-5 text-[16.5px] leading-[1.75] text-foreground/85"
            >
              {block.items.map((item) => (
                <li key={item} className="list-disc marker:text-brand">
                  {item}
                </li>
              ))}
            </ul>
          )
        }
        return (
          <figure key={index} className="overflow-hidden rounded-xl bg-navy">
            {block.caption ? (
              <figcaption className="border-b border-white/8 px-4 py-2 font-mono text-[11px] text-white/50">
                {block.caption}
              </figcaption>
            ) : null}
            <pre className="overflow-x-auto p-4 font-mono text-[12.5px] leading-relaxed text-navy-foreground">
              {block.code}
            </pre>
          </figure>
        )
      })}
    </div>
  )
}
