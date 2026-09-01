import type { Metadata } from "next"

import { ContactForm } from "@/components/contact-form"
import { site } from "@/lib/site"

export const metadata: Metadata = {
  title: "Contact",
  description: "Write to ZodOps about security architecture, DevOps, or data protection work.",
}

export default function ContactPage() {
  return (
    <section className="container-page py-14 sm:py-16">
      <p className="text-[11px] font-semibold tracking-[0.18em] text-brand uppercase">
        Contact
      </p>
      <h1 className="mt-3 max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
        If the problem is real, write.
      </h1>
      <p className="mt-3 max-w-xl text-[16px] leading-relaxed text-muted-foreground">
        Architecture reviews, platform security, DSPM/DLP programs, or a
        question about something on this site. Direct email is{" "}
        <a className="text-brand hover:underline" href={`mailto:${site.email}`}>
          {site.email}
        </a>
        .
      </p>
      <div className="mt-10 max-w-xl">
        <ContactForm />
      </div>
      <p className="mt-8 text-sm text-muted-foreground">
        Also on{" "}
        <a
          href={site.linkedin}
          className="text-brand hover:underline"
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn
        </a>
        . Update the address and profile URL in{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[12px]">
          src/lib/site.ts
        </code>{" "}
        before you go live.
      </p>
    </section>
  )
}
