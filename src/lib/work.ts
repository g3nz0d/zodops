import { type TopicSlug, topicBySlug } from "@/lib/content"

export type CaseStudyBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "links"; items: { href: string; label: string; note: string }[] }

export type CaseStudy = {
  slug: string
  title: string
  excerpt: string
  subtitle: string
  topics: TopicSlug[]
  tools: string[]
  minutes: number
  draft?: boolean
  glance: { label: string; value: string }[]
  body: CaseStudyBlock[]
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "finding-shadow-ai",
    title: "Finding Shadow AI Before It Found Us",
    excerpt:
      "Employees were sending sensitive data, including AWS secret keys, to AI tools nobody had approved. I paired DSPM with endpoint and inline DLP to find it, then rebuilt policy around corporate versus personal AI instances, cutting false positives by [X%].",
    subtitle: "Case study · Data Security · AI Security",
    topics: ["data-security", "ai-agent-security"],
    tools: ["Cyera", "Microsoft Purview", "Zscaler"],
    minutes: 5,
    draft: true,
    glance: [
      {
        label: "Environment",
        value: "Large enterprise, [industry], [approximate number] employees",
      },
      {
        label: "My role",
        value: "[Your title], [lead / one of N engineers] on the program",
      },
      {
        label: "Tools",
        value:
          "Cyera (DSPM), Microsoft Purview (endpoint and Microsoft 365 DLP), Zscaler (inline DLP)",
      },
      {
        label: "Timeline",
        value: "[Duration, e.g., 4 months from scoping to enforcement]",
      },
    ],
    body: [
      {
        type: "h2",
        text: "The problem",
      },
      {
        type: "p",
        text: "Employees had started using AI tools faster than security could approve them. Some used the company's sanctioned enterprise AI service. Many used personal accounts on public AI tools, and nobody could say which ones, how often, or what data was going into them.",
      },
      {
        type: "p",
        text: "The organization needed answers to three questions:",
      },
      {
        type: "ol",
        items: [
          "Which AI tools are people actually using?",
          "What sensitive data is being sent to them?",
          "How do we reduce that risk without blocking the approved tools people rely on?",
        ],
      },
      {
        type: "h2",
        text: "What made it hard",
      },
      {
        type: "ul",
        items: [
          "**No single tool saw the whole picture.** DSPM knew where sensitive data lived, but not where it went. DLP saw data moving, but not which of it mattered most.",
          "**The same AI service often served both corporate and personal accounts** through the same domain, so traffic-based rules couldn't tell them apart.",
          "**Blocking everything wasn't an option.** The business had approved AI tools for real work, and a heavy-handed rollout would have pushed people to unmanaged devices.",
        ],
      },
      {
        type: "h2",
        text: "What I did",
      },
      {
        type: "p",
        text: "**Connected discovery to enforcement.** I used Cyera to discover and classify sensitive data across cloud and SaaS stores, then aligned those classifications with Purview sensitivity labels and DLP policies, so both tools meant the same thing by \"sensitive.\"",
      },
      {
        type: "p",
        text: "**Watched the paths data actually takes.** Purview covered paste and upload activity on managed devices. Zscaler covered inline traffic to AI applications. Together they showed which AI tools were in use and what was being sent.",
      },
      {
        type: "p",
        text: "**Ran in audit mode first.** Before enforcing anything, I ran the policies in monitor-only mode to measure what they would catch and how much of it was noise.",
      },
      {
        type: "p",
        text: "**Rebuilt policy around instance, not destination.** Early results were dominated by false positives from people using the approved AI tools correctly. I changed the policy to key on which instance the user was in (the corporate tenant versus a personal account) and on the class of data involved, rather than on the AI service's domain.",
      },
      {
        type: "p",
        text: "**Treated credentials as their own class.** Credentials got the strictest rule: blocked everywhere, including in approved tools, with leaked keys handed off for rotation.",
      },
      {
        type: "h2",
        text: "What we found",
      },
      {
        type: "ul",
        items: [
          "**Shadow AI usage was broader than expected:** [number] AI applications in use, [number] of them unsanctioned.",
          "**Sensitive data was leaving through prompts and pastes,** including [types, e.g., customer data, internal documents].",
          "**The most serious findings were credentials.** AWS secret keys and other secrets were being pasted into AI chats, usually by engineers debugging an error with logs or config files.",
        ],
      },
      {
        type: "h2",
        text: "Results",
      },
      {
        type: "ul",
        items: [
          "**False positives dropped [X%]** once policy distinguished the corporate AI tenant from personal accounts.",
          "**Leaked credentials were [rotated within X hours / handled through a defined response process].**",
          "**[Outcome for users, e.g., \"Most flagged users moved to the sanctioned AI tool after an in-the-moment coaching prompt.\"]**",
          "**[Any business outcome, e.g., \"Gave leadership the first complete inventory of AI usage across the company.\"]**",
        ],
      },
      {
        type: "h2",
        text: "What I'd do differently",
      },
      {
        type: "p",
        text: "**Align data classifications across tools on day one.** We spent time reconciling DSPM categories with DLP labels after policies were already running. Agreeing on a shared set of data classes first would have saved weeks.",
      },
      {
        type: "p",
        text: "**Build the credential response before turning on detection.** Finding leaked keys is only useful if rotating them is fast. That process should exist before the first alert fires.",
      },
      {
        type: "h2",
        text: "Related reading",
      },
      {
        type: "links",
        items: [
          {
            href: "/articles/dspm-dlp-shadow-ai-leaks/",
            label: "The Paste Is the Leak",
            note: "the full write-up on DSPM, DLP, and policy design for shadow AI.",
          },
          {
            href: "/articles/data-security-shadow-data-inventory/",
            label: "Find It Before You Label It",
            note: "why inventory comes before classification.",
          },
        ],
      },
    ],
  },
]

export const publishedCaseStudies = caseStudies.filter((study) => !study.draft)

export function isWorkVisible(): boolean {
  return (
    process.env.NODE_ENV === "development" || publishedCaseStudies.length > 0
  )
}

export function visibleCaseStudies(): CaseStudy[] {
  return process.env.NODE_ENV === "development"
    ? caseStudies
    : publishedCaseStudies
}

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug)
}

export function canViewCaseStudy(study: CaseStudy): boolean {
  return !study.draft || process.env.NODE_ENV === "development"
}

export function primaryTopic(study: CaseStudy) {
  return topicBySlug(study.topics[0] ?? "data-security")
}
