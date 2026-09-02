export const site = {
  name: "ZodOps",
  title: "ZodOps — Security architect notes on DevOps, containers, and data protection",
  description:
    "Engineering notes on the systems that keep data safe. Long-form, implementation-level writing on DevOps, containers, and DSPM/DLP.",
  location: "San Diego, CA",
  role: "Security Architect",
  email: "hello@zodops.io",
  linkedin: "https://www.linkedin.com/in/ztagedini",
  years: "12+",
  domains: 4,
} as const

export const nav = [
  { href: "/writing/", label: "Writing" },
  { href: "/topics/", label: "Topics" },
  { href: "/about/", label: "About" },
  { href: "/contact/", label: "Contact" },
] as const
