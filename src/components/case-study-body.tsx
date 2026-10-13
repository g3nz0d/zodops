import Link from "next/link"

import { InlineText } from "@/components/inline-text"
import type { CaseStudyBlock } from "@/lib/work"
import { slugifyHeading } from "@/lib/content"

export function CaseStudyBody({ blocks }: { blocks: CaseStudyBlock[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((block, index) => {
        if (block.type === "p") {
          return (
            <p
              key={index}
              className="text-[16.5px] leading-[1.75] text-foreground/85"
            >
              <InlineText text={block.text} />
            </p>
          )
        }
        if (block.type === "h2") {
          return (
            <h2
              key={index}
              id={slugifyHeading(block.text)}
              className="scroll-mt-24 pt-4 text-xl font-semibold tracking-tight text-foreground"
            >
              {block.text}
            </h2>
          )
        }
        if (block.type === "ol") {
          return (
            <ol
              key={index}
              className="list-decimal space-y-2 pl-5 text-[16.5px] leading-[1.75] text-foreground/85"
            >
              {block.items.map((item) => (
                <li key={item} className="marker:text-brand">
                  <InlineText text={item} />
                </li>
              ))}
            </ol>
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
                  <InlineText text={item} />
                </li>
              ))}
            </ul>
          )
        }
        return (
          <ul
            key={index}
            className="space-y-3 pl-5 text-[16.5px] leading-[1.75] text-foreground/85"
          >
            {block.items.map((item) => (
              <li key={item.href} className="list-disc marker:text-brand">
                <Link href={item.href} className="font-medium text-brand hover:underline">
                  {item.label}
                </Link>
                {": "}
                {item.note}
              </li>
            ))}
          </ul>
        )
      })}
    </div>
  )
}
