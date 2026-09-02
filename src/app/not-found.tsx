import Link from "next/link"

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[50vh] flex-col items-center justify-center py-20 text-center">
      <p className="text-[11px] font-semibold tracking-[0.18em] text-brand uppercase">
        404
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">
        That page is not in the repo.
      </h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        It may have moved, or it never shipped. The articles index is the safest
        next hop.
      </p>
      <Link
        href="/articles/"
        className="mt-8 inline-flex h-10 items-center rounded-md bg-navy px-4 text-[11px] font-semibold tracking-[0.14em] text-navy-foreground uppercase hover:bg-navy/90"
      >
        View articles
      </Link>
    </section>
  )
}
