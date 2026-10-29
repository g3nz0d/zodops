import Link from "next/link"

export function RelatedLinks({
  links,
}: {
  links: { href: string; label: string; note: string }[]
}) {
  return (
    <ul className="mt-10 space-y-2.5 border-t border-border pt-8 text-[16.5px] leading-snug text-foreground/85">
      {links.map((link) => (
        <li key={link.href} className="list-none">
          <Link
            href={link.href}
            className="font-medium text-brand hover:underline"
          >
            {link.label}
          </Link>
          {": "}
          {link.note}
        </li>
      ))}
    </ul>
  )
}
