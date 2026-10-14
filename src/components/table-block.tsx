import { cn } from "@/lib/utils"

export function TableBlock({
  headers,
  rows,
  compact,
}: {
  headers: string[]
  rows: string[][]
  compact?: boolean
}) {
  const visibleRows = rows.filter((row) => row.some((cell) => cell.trim() !== ""))

  return (
    <div
      className={cn(
        "overflow-x-auto rounded-xl border border-brand",
        compact && "bg-brand/5"
      )}
    >
      <table className="w-full border-collapse text-left text-[13.5px]">
        <thead>
          <tr className={compact ? undefined : "bg-brand/5"}>
            {headers.map((header, index) => (
              <th
                key={index}
                className={cn(
                  "px-4 font-semibold tracking-[0.02em] text-foreground",
                  compact
                    ? "whitespace-nowrap py-2.5 text-[12px]"
                    : "border-b border-brand/30 py-3",
                  compact && visibleRows.length > 0 && "border-b border-brand/30"
                )}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        {visibleRows.length > 0 ? (
          <tbody>
            {visibleRows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={
                  !compact && rowIndex % 2 === 1 ? "bg-muted/40" : undefined
                }
              >
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={
                      rowIndex === visibleRows.length - 1
                        ? "px-4 py-3 leading-relaxed text-foreground/85"
                        : "border-b border-border px-4 py-3 leading-relaxed text-foreground/85"
                    }
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        ) : null}
      </table>
    </div>
  )
}
