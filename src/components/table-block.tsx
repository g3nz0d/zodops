import { InlineCopy } from "@/components/inline-copy"
import { cn } from "@/lib/utils"

/**
 * Two-line titles (short labels) should sit on one line.
 * Longer titles that would wrap to three or more lines keep wrapping
 * so wide tables still fit the column.
 */
const TWO_LINE_TITLE = 34

function keepOnOneLine(text: string): boolean {
  const length = text.trim().length
  return length > 0 && length <= TWO_LINE_TITLE
}

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
                  keepOnOneLine(header) && "whitespace-nowrap",
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
                    className={cn(
                      "px-4 py-3 leading-relaxed text-foreground/85",
                      rowIndex !== visibleRows.length - 1 &&
                        "border-b border-border",
                      cellIndex === 0 &&
                        keepOnOneLine(cell) &&
                        "whitespace-nowrap"
                    )}
                  >
                    <InlineCopy text={cell} />
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
