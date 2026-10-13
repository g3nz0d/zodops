export function TableBlock({
  headers,
  rows,
}: {
  headers: string[]
  rows: string[][]
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-brand">
      <table className="w-full border-collapse text-left text-[13.5px]">
        <thead>
          <tr className="bg-brand/5">
            {headers.map((header, index) => (
              <th
                key={index}
                className="border-b border-brand/30 px-4 py-3 font-semibold tracking-[0.02em] text-foreground"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={rowIndex % 2 === 1 ? "bg-muted/40" : undefined}
            >
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className={
                    rowIndex === rows.length - 1
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
      </table>
    </div>
  )
}
