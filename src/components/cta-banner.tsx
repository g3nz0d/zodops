import { site } from "@/lib/site"

export function CtaBanner() {
  return (
    <section className="container-page pb-16">
      <div className="flex flex-col gap-8 rounded-2xl border border-brand bg-navy px-7 py-10 sm:px-10 sm:py-12 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
        <div className="max-w-xl">
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-[2rem]">
            Looking for my next security problem.
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-white/70">
            I&apos;m open to AI security, data security, and customer-facing
            technical roles: solutions architecture, customer success
            engineering, and forward-deployed work. If you&apos;re building in
            that space, let&apos;s talk.
          </p>
        </div>
        <div className="flex w-full shrink-0 flex-col items-stretch gap-3 sm:w-auto sm:items-start lg:flex-row lg:items-center">
          <a
            href={site.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex h-10 items-center justify-center rounded-md bg-brand px-4 text-sm font-medium text-white outline-none hover:bg-brand/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Connect on LinkedIn
          </a>
          <a
            href={`mailto:${site.email}`}
            className="inline-flex h-10 items-center justify-center rounded-md border border-white/15 bg-white/10 px-4 text-sm font-medium text-white outline-none hover:bg-white/16 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Email me
          </a>
        </div>
      </div>
    </section>
  )
}
