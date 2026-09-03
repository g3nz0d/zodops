export const site = {
  name: "ZodOps",
  title: "ZodOps — Security architect notes on DevOps, containers, and data protection",
  description:
    "Engineering notes on the systems that keep data safe. Long-form, implementation-level writing on DevOps, containers, and DSPM/DLP.",
  location: "San Diego, CA",
  role: "Security Architect",
  email: "hello@zodops.io",
  linkedin: "https://www.linkedin.com/in/ztagedini",
  years: "15+",
  domains: 4,
} as const

export const ctaLabel = "Principles"
export const ctaHref = "/#principles"

export const nav = [
  { href: "/articles/", label: "Articles" },
  { href: "/tech/", label: "Tech" },
  { href: "/about/", label: "About" },
] as const
