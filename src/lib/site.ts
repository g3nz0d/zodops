export const site = {
  name: "ZodOps",
  title: "ZodOps — Security architect notes on DevOps, containers, and data protection",
  description:
    "Engineering notes on the systems that keep data safe. Long-form, implementation-level writing on DevOps, containers, and DSPM/DLP.",
  location: "San Diego, CA",
  role: "Enterprise Security Architect",
  email: "hello@zodops.io",
  linkedin: "https://www.linkedin.com/in/ztagedini",
  years: "15+",
  domains: 4,
  book: {
    title: "It's Halloween Once Again",
    href: "https://www.vitalsource.com/products/it-39-s-halloween-once-again-zodi-tagedini-v9798886543834?srsltid=AU7gw4XYRhAbHlftv5sGgk-T6CZR6XVi-sJ473pNKazVa4y3Exnuo_fo",
  },
} as const

export const ctaLabel = "Connect"
export const ctaHref = site.linkedin

export const nav = [
  { href: "/articles/", label: "Articles" },
  { href: "/tech/", label: "Tech" },
  { href: "/about/", label: "About" },
] as const
