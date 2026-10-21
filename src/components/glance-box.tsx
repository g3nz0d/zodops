import { InlineCopy } from "@/components/inline-copy"

export function GlanceBox({
  rows,
  caption = "Case study summary: environment, role, tools, and timeline",
}: {
  rows: { label: string; value: string }[]
  caption?: string
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-brand">
      <p className="border-b border-brand/30 bg-brand/5 px-4 py-3 text-[11px] font-semibold tracking-[0.16em] text-foreground uppercase">
        At a glance
      </p>
      <table className="w-full border-collapse text-left text-[13.5px]">
        <caption className="sr-only">{caption}</caption>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.label}
              className="group block border-b border-border last:border-b-0 sm:table-row"
            >
              <th
                scope="row"
                className="block px-4 pt-3 pb-1 align-top font-semibold tracking-[0.02em] text-foreground sm:table-cell sm:w-40 sm:border-b sm:border-border sm:py-3 sm:pr-6 sm:group-last:border-b-0"
              >
                {row.label}
              </th>
              <td className="block px-4 pt-0 pb-3 leading-relaxed text-foreground/85 sm:table-cell sm:border-b sm:border-border sm:py-3 sm:group-last:border-b-0">
                <InlineCopy text={row.value} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
