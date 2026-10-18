import { site } from "@/lib/site"

export function CtaBanner() {
  return (
    <section className="container-page pb-16">
      <div className="flex flex-col gap-8 rounded-2xl border border-brand bg-navy px-7 py-10 sm:px-10 sm:py-12 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
        <div className="max-w-xl">
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-[2rem]">
            Building something bold in AI security?
          </h2>
          <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-white/70">
            <p>
              Thirteen years securing cloud and data. Lately, hunting shadow AI
              with DSPM, DLP, and CASB tools: catching secret keys pasted into
              chatbots, separating sanctioned AI from the rest, and closing MCP
              server gaps before they leak. No slideware. Just hands in the
              configs and logs.
            </p>
            <p>
              Now I&apos;m looking for a new team building what&apos;s next in
              AI security.
            </p>
            <p>Ping me. Let&apos;s talk shop.</p>
          </div>
        </div>
        <div className="flex w-full shrink-0 flex-col gap-2.5 sm:w-auto lg:min-w-[13.5rem]">
          <a
            href={`mailto:${site.email}`}
            className="inline-flex h-10 items-center justify-center rounded-md bg-brand px-4 text-sm font-medium text-white outline-none hover:bg-brand/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Email me
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex h-10 items-center justify-center rounded-md bg-brand px-4 text-sm font-medium text-white outline-none hover:bg-brand/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Connect on LinkedIn
          </a>
        </div>
      </div>
    </section>
  )
}
