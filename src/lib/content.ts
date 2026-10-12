export const topicSlugs = [
  "ai-agent-security",
  "data-security",
  "field-notes",
  "software-supply-chain",
] as const

export type TopicSlug = (typeof topicSlugs)[number]

export type Topic = {
  slug: TopicSlug
  name: string
  label: string
  description: string
  longDescription: string
}

export const topics: Topic[] = [
  {
    slug: "ai-agent-security",
    name: "AI & Agent Security",
    label: "AI & Agent Security",
    description:
      "Prompt injection as an exfil path, MCP server and tool-permission trust, agent identity, and GenAI oversharing.",
    longDescription:
      "Where models, agents, and sensitive data meet: prompt injection as an exfil path, trust boundaries on MCP servers and tool permissions, agent identity, and GenAI oversharing — the Copilot or Glean search that surfaces a file a user shouldn't see.",
  },
  {
    slug: "data-security",
    name: "Data Security",
    label: "Data Security",
    description:
      "Finding shadow data, mapping who can reach it, and stopping exfil without breaking the business.",
    longDescription:
      "Data security as an engineering problem: inventory, classification, and the identities that can actually reach regulated data — the posture and loss-prevention work merged with the data-access half of cloud security. Increasingly, that includes the data flowing into AI tools.",
  },
  {
    slug: "field-notes",
    name: "Field Notes",
    label: "Field Notes",
    description:
      "Rollout playbooks, getting a tool adopted without stalling engineering, and lessons from real deployments.",
    longDescription:
      "The practitioner side of the job: rollout playbooks, getting a security tool adopted without stalling engineering, and the lessons from deployments that don't make it into a vendor's case study.",
  },
  {
    slug: "software-supply-chain",
    name: "Software Supply Chain",
    label: "Software Supply Chain",
    description:
      "Pipelines, dependency risk, SBOMs, image hardening, and policy as code.",
    longDescription:
      "Software supply chain security end to end: gated pipelines, dependency and SBOM risk, image hardening, and the policy-as-code that platform teams actually keep.",
  },
]

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "code"; caption?: string; code: string }

export type Article = {
  slug: string
  title: string
  excerpt: string
  topic: TopicSlug
  minutes: number
  date: string
  body: Block[]
  fieldNotes?: boolean
  draft?: boolean
}

export type Principle = {
  label: string
  text: string
}

export const principles: Principle[] = [
  {
    label: "Evidence over claims",
    text: "I don't trust a claim — mine or a vendor's — until it's checked against a primary source or tested by hand. I hold what I publish here to the same bar.",
  },
  {
    label: "Compliance is a floor, not a target",
    text: "A control that satisfies an auditor without reducing real exposure isn't one I'll ship. I weigh decisions by actual risk, not checklist language.",
  },
  {
    label: "Assume it's already inside",
    text: "Perimeter defenses eventually fail. I build assuming something inside is already compromised, and design for what limits the damage once that's true — not just what keeps it out.",
  },
  {
    label: "Criteria before tools",
    text: "Before I trust a new tool or platform, I build the evaluation criteria first — coverage, false-positive rate, integration cost — then apply it. Tools change. The discipline doesn't.",
  },
  {
    label: "Say what's still uncertain",
    text: "Fifteen-plus years gives me certainty in most of this work — not all of it. Where I'm reasoning through something newer, like AI security or DSPM/DLP, I say so outright instead of letting the line blur. Those posts are marked Field Notes.",
  },
]

export const articles: Article[] = [
  // `output: "export"` requires generateStaticParams() for /articles/[slug]
  // to return at least one route. This entry is filtered out of every
  // listing via `publishedArticles` (it's marked draft) and isn't linked
  // from anywhere on the site — it only exists so the build succeeds while
  // the articles list is empty. Delete it once you've published a real one.
  {
    slug: "placeholder",
    title: "Placeholder",
    excerpt: "",
    topic: "field-notes",
    minutes: 0,
    date: "2026-01-01",
    draft: true,
    body: [{ type: "p", text: "Content coming soon." }],
  },
]

export type ConfigSnippet = {
  title: string
  description: string
  language: string
  code: string
}

export const configsByTopic: Record<TopicSlug, ConfigSnippet[]> = {
  "ai-agent-security": [],
  "data-security": [
    {
      title: "Service-account inventory in one line",
      description:
        "The query that replaces a 40-page DSPM questionnaire: who can write, from where.",
      language: "bash",
      code: `kubectl get deploy,cronjob -A -o json \\
  | jq -r '.items[]
    | [.metadata.namespace, .metadata.name,
       (.spec.template.spec.serviceAccountName // "default")]
    | @tsv'`,
    },
    {
      title: "Deny cross-account KMS decrypt (SCP)",
      description:
        "An org-level SCP that stops roles in other accounts from decrypting prod-tagged keys, without touching any key policy.",
      language: "json",
      code: `{
  "Sid": "DenyCrossAccountDecryptOfProdKeys",
  "Effect": "Deny",
  "Action": "kms:Decrypt",
  "Resource": "*",
  "Condition": {
    "StringEquals": { "aws:ResourceTag/env": "prod" },
      "StringNotEquals": { "aws:PrincipalAccount": "111111111111" }
  }
}`,
    },
  ],
  "field-notes": [],
  "software-supply-chain": [
    {
      title: "Policy exception with an expiry",
      description:
        "The only sanctioned way around an admission rule — a dated exception in the same repo, not a Slack approval.",
      language: "yaml",
      code: `apiVersion: kyverno.io/v1
kind: PolicyException
metadata:
  name: ingress-capabilities-until-2026-10-01
spec:
  exceptions:
    - policyName: disallow-capabilities
      ruleNames: ["drop-all"]
  match:
    any:
      - resources:
          namespaces: ["ingress"]
          names: ["controller"]`,
    },
    {
      title: "Minimal, non-root runtime image",
      description:
        "Distroless base, digest-pinned, no shell — copy the binary and run as an unprivileged UID.",
      language: "dockerfile",
      code: `FROM gcr.io/distroless/static-debian12:nonroot@sha256:…
COPY --from=build /out/api /api
USER 65532:65532
ENTRYPOINT ["/api"]`,
    },
  ],
}

export function configsForTopic(slug: TopicSlug): ConfigSnippet[] {
  return configsByTopic[slug] ?? []
}

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

export function getTopic(slug: string): Topic | undefined {
  return topics.find((topic) => topic.slug === slug)
}

export const publishedArticles = articles.filter((article) => !article.draft)

export function getArticle(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug)
}

export function articlesByTopic(slug: TopicSlug): Article[] {
  return publishedArticles.filter((article) => article.topic === slug)
}

export function topicBySlug(slug: TopicSlug): Topic {
  const topic = getTopic(slug)
  if (!topic) {
    throw new Error(`Unknown topic: ${slug}`)
  }
  return topic
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`))
}
