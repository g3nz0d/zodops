import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { AnatomyCard } from "@/components/anatomy-card"
import { isAnatomyVisible, visibleAnatomies } from "@/lib/anatomy"

export function generateMetadata(): Metadata {
  if (!isAnatomyVisible()) {
    return {}
  }
  return {
    title: "Anatomy · ZodOps",
    description:
      "Teardowns of real configurations: what they grant, and the line you would change.",
    openGraph: {
      title: "Anatomy · ZodOps",
      description:
        "Teardowns of real configurations: what they grant, and the line you would change.",
      type: "website",
    },
  }
}

export default function AnatomyPage() {
  if (!isAnatomyVisible()) {
    notFound()
  }

  const items = visibleAnatomies()

  return (
    <section className="container-page py-14 sm:py-16">
      <p className="text-[11px] font-semibold tracking-[0.18em] text-brand uppercase">
        Anatomy
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight italic sm:text-4xl lg:whitespace-nowrap">
        &ldquo;The config is the permission grant.&rdquo;
      </h1>
      <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-muted-foreground">
        Teardowns of real configurations. What they grant, and the line you
        would change. Not tutorials.
      </p>

      <div className="mt-14">
        {items.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <AnatomyCard key={item.slug} item={item} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">
            First teardowns are in progress. Check back soon.
          </p>
        )}
      </div>
    </section>
  )
}
