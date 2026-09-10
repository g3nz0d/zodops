import { CodeBlock } from "@/components/code-block"
import type { Block } from "@/lib/content"
import { slugifyHeading } from "@/lib/content"

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
              id={slugifyHeading(block.text)}
              className="pt-4 text-xl font-semibold tracking-tight text-foreground scroll-mt-24"
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
        return <CodeBlock key={index} caption={block.caption} code={block.code} />
      })}
    </div>
  )
}
