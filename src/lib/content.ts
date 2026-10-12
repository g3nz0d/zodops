export const topicSlugs = [
  "ai-agent-security",
  "data-security",
  "field-notes",
  "security-automation",
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
    slug: "security-automation",
    name: "Security Automation",
    label: "Security Automation",
    description:
      "Low-code playbooks in Tines and n8n: alert triage, enrichment, and the judgment calls about what runs without a human.",
    longDescription:
      "Practical security automation with Tines and n8n: wiring up alert triage and enrichment, and the harder part — deciding which decisions a playbook gets to make on its own and which ones still need a human to say yes.",
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
  {
    slug: "security-automation-without-babysitting",
    title: "Security automation that doesn't become another thing to babysit",
    excerpt:
      "Tines and n8n make it easy to wire up a story. The actual job is deciding what should run on its own and what still needs a human to say yes.",
    topic: "security-automation",
    minutes: 9,
    date: "2026-02-18",
    body: [
      {
        type: "p",
        text: "Most security automation projects start with a demo win: a phishing-triage story in Tines, or an n8n workflow that closes a few hundred low-value alerts a week. Then the project stalls, because nobody decided which decisions the bot gets to make unsupervised and which ones still need a human to say yes. Low-code tools make the wiring trivial. The wiring was never the hard part.",
      },
      {
        type: "h2",
        text: "Low-code is the easy 20%",
      },
      {
        type: "p",
        text: "Tines builds a workflow as a \"Story\" made of \"Agents\" — each one does a single job: a Webhook Agent receives an event, an HTTP Request Agent calls an API, a Trigger Agent branches on a condition, an Event Transform Agent reshapes the JSON for the next step. n8n is the open-source equivalent: self-hostable, workflows made of connected nodes, with a Code node for the JavaScript glue when a built-in node doesn't exist yet. Pointing a webhook at a mailbox, parsing the structure, and calling an enrichment API is an afternoon of work in either tool. That part was never going to be the blocker.",
      },
      {
        type: "h2",
        text: "Automate the enrichment, gate the action",
      },
      {
        type: "p",
        text: "The split that actually matters is between gathering information and changing state. Enrichment — looking up a sender domain, checking a file hash against threat intel, pulling a user's recent login history — is safe to fully automate from day one; getting it wrong just means a human looks at slightly worse context. Disabling an account, quarantining a mailbox, or blocking a domain org-wide is a different category. Those should require explicit approval until the story has a track record, then graduate to auto-run one decision type at a time, not all at once.",
      },
      {
        type: "code",
        caption: "The shape of a phishing-triage story, regardless of which tool runs it.",
        code: `trigger: webhook on reported-phishing mailbox
→ enrich: sender domain + attachment hash against threat intel
→ branch:
    known-bad   → quarantine message, notify user, close ticket
    known-good  → close ticket, no action
    unknown     → open ticket with enrichment attached, assign analyst
→ log every branch decision with the data that drove it`,
      },
      {
        type: "h2",
        text: "Log the decision, not just the outcome",
      },
      {
        type: "p",
        text: "Every automated branch should record what data led to which decision, not just that a ticket got closed. That's what makes the story defensible later, lets you debug a false negative six weeks after the fact, and answers the audit question \"why did the system let this through\" with something better than a shrug.",
      },
      {
        type: "ul",
        items: [
          "Start with the highest-volume, lowest-risk decision in your queue — not the scariest one.",
          "Give every automated action an undo path before you give it a decide path.",
          "Export and review stories the same way you'd review any other change headed to production.",
          "Measure how often a human overrides the automation. A rising override rate means the logic is stale, not that people distrust the tool.",
        ],
      },
      {
        type: "p",
        text: "Tines and n8n will both happily run anything you wire up, including the mistake. The platform isn't the governance. You are.",
      },
    ],
  },
  {
    slug: "data-security-shadow-data-inventory",
    title: "Shadow data isn't a tooling gap. It's an inventory gap.",
    excerpt:
      "A DSPM dashboard that can't name every store, identity, and egress path a workload touches is measuring coverage of its own agents, not the data you're trying to protect.",
    topic: "data-security",
    minutes: 10,
    date: "2026-05-07",
    body: [
      {
        type: "p",
        text: "The data finance actually cares about is rarely in the Postgres instance on the architecture diagram. It's in a debug dump on a PVC, a log sink nobody rotated, or a \"temporary\" export bucket from a migration two years ago that nobody closed the loop on. A classification tool can label every column in the database you already know about and still miss all of that, because labeling isn't the first problem. Not knowing where the data physically landed is.",
      },
      {
        type: "h2",
        text: "Inventory before classification",
      },
      {
        type: "p",
        text: "Classification without inventory is a dashboard, not a control. Before you can say what's sensitive, you have to know every place it could be: walk the workload spec — volume mounts, envFrom, projected tokens, workload-identity annotations — and the egress policy, or the absence of one. In a typical estate, that walk turns up more surprises than the classifier ever will.",
      },
      {
        type: "h2",
        text: "Identity, not label, is the actual control",
      },
      {
        type: "p",
        text: "A bucket's resource policy that trusts a wider set of principals than anyone realizes is as big a hole as an over-permissioned IAM role, and most teams only audit one of those two things. The question that matters isn't \"is this column labeled PII\" — it's \"which identity can reach this bucket, table, or queue, and from where.\" Map that graph first. The classification work slots in underneath it.",
      },
      {
        type: "code",
        caption: "The one-line inventory that beats a DSPM questionnaire.",
        code: `kubectl get deploy,cronjob,statefulset -A -o json \\
  | jq -r '.items[]
      | [.metadata.namespace, .metadata.name,
         (.spec.template.spec.serviceAccountName // "default")]
      | @tsv'`,
      },
      {
        type: "h2",
        text: "Then write the control that can actually fire",
      },
      {
        type: "p",
        text: "Bind the exfil control to an identity and a destination — the job's service account, the bucket it's writing to — not to a hopeful regex running against a sample of traffic. Alert on first-seen principal or first-seen destination instead of volume thresholds; a slow, quiet copy evades anything that's only watching for spikes.",
      },
      {
        type: "ul",
        items: [
          "Walk the workload spec before you buy a classifier: volume mounts, envFrom, projected tokens, and egress policy (or its absence).",
          "Treat bucket and KMS resource policies as part of the access graph, not a footnote to IAM.",
          "Alert on first-seen principal or first-seen destination. Volume thresholds miss the slow, quiet exfil.",
          "Give operations a legal path for bulk export — time-boxed, logged, reviewed — or they'll find an illegal one.",
        ],
      },
      {
        type: "p",
        text: "A DSPM score that goes up while you still can't answer which service account can walk the customer table out of the cluster measured something. It wasn't exposure.",
      },
    ],
  },
  {
    slug: "rollout-playbook-without-stalling-engineering",
    title: "Getting a security tool adopted without becoming the thing that stalls the sprint",
    excerpt:
      "The rollout fails in the first two weeks, not the first two months. Lead with the fastest path to a false positive, and fix that before you ask anyone to trust the tool.",
    topic: "field-notes",
    minutes: 9,
    date: "2026-07-14",
    fieldNotes: true,
    body: [
      {
        type: "p",
        text: "The moment a new policy engine or scanner blocks someone's actual deploy on day three, it stops mattering how good the detection logic is. That one bad experience becomes the story the org tells about security tooling for the next year. Rollouts fail in the first two weeks, almost never in the first two months — by then the opinion is already set.",
      },
      {
        type: "h2",
        text: "Ship in observe mode first, on purpose",
      },
      {
        type: "p",
        text: "Run the new control in monitor-only mode for a defined window before enforcing anything. Use that window to find and fix the predictable false positives — the CI service account that looks like an attacker, the known debug tool that keeps tripping the secret scanner — before you've ever actually blocked a real person's work.",
      },
      {
        type: "h2",
        text: "Pick the first team on purpose",
      },
      {
        type: "p",
        text: "Don't launch broadly. Pick a team with an existing working relationship with security, a review cadence that can absorb a few early misses, and a visible owner on their side — not the highest-risk team, and not a hostile one. An early win compounds: that team becomes the one that tells the next team it's fine, which does more for adoption than any amount of documentation.",
      },
      {
        type: "h2",
        text: "Write the exception path before the first exception request",
      },
      {
        type: "p",
        text: "Whoever is enforcing the control needs a documented, time-boxed exception process in place before launch, not one improvised in a Slack thread during an incident. If the only way around a block is \"ping security and wait,\" you've built a bottleneck, not a control, and that's the version people route around permanently.",
      },
      {
        type: "ul",
        items: [
          "Measure false-positive rate for at least two sprints before widening scope.",
          "Give the rollout a named owner on the platform or engineering side, not just security.",
          "Publish what got blocked and why, every week, during the rollout window. Silence reads as surveillance.",
          "Design the exception process with the same care as the detection logic. It's part of the control, not an afterthought to it.",
        ],
      },
      {
        type: "p",
        text: "A tool that's technically correct and operationally resented gets uninstalled eventually — just slowly, and usually after the next reorg. Land the trust first. The coverage follows.",
      },
    ],
  },
  {
    slug: "mcp-tool-permissions-and-prompt-injection",
    title: "The exfil path in your AI agent isn't the model. It's the tools you gave it.",
    excerpt:
      "Prompt injection matters because of what the agent is allowed to do next. MCP tool permissions and agent identity are where that gets decided — or doesn't.",
    topic: "ai-agent-security",
    minutes: 10,
    date: "2026-09-29",
    body: [
      {
        type: "p",
        text: "Prompt-injection headlines focus on tricking a model into saying something it shouldn't. The actual damage in a deployed agent happens one step later, at the tool call: an instruction only turns into a loss once it reaches a tool that can act on it. Spend the engineering time there, not on trying to make the model unmanipulable — that's a fight you won't win outright.",
      },
      {
        type: "h2",
        text: "MCP didn't invent the risk. It made it exercisable.",
      },
      {
        type: "p",
        text: "The Model Context Protocol gives an AI assistant a standard way to call out to external tools and data — a ticketing system, a wiki, a database — through an MCP server that exposes a set of callable tools. That's genuinely useful, and it's also a new trust boundary that's unauthenticated by default unless you design it otherwise: whatever a tool is capable of doing, a sufficiently manipulated agent can be talked into attempting. The server doesn't know the difference between a legitimate request and an instruction smuggled in through a webpage the agent just read.",
      },
      {
        type: "h2",
        text: "Scope the tool, not just the model",
      },
      {
        type: "p",
        text: "A tool called \"look-up-ticket-status\" and one called \"run-arbitrary-sql\" carry wildly different blast radii, even if both sit behind the same MCP server and the same system prompt. Treat every tool definition as its own API design decision, scoped as narrowly as the actual use case allows, instead of exposing a general-purpose capability and trusting the prompt to constrain it.",
      },
      {
        type: "h2",
        text: "Give the agent an identity, not a blank check",
      },
      {
        type: "p",
        text: "When an agent acts on behalf of a user, its actions should be attributable to a scoped identity bound to what that specific user could already do — not a shared, high-privilege service account sitting behind the integration. That one change means a manipulated agent is only as dangerous as the single account it's impersonating, not as dangerous as the entire integration.",
      },
      {
        type: "h2",
        text: "The oversharing problem predates the agent",
      },
      {
        type: "p",
        text: "Enterprise AI search — Copilot, Glean, and similar tools — indexes content based on permissions that already exist. The files were technically \"accessible\" under some ACL set years ago, but nobody could realistically search across all of them before. An AI assistant removes that friction instantly. Overly broad legacy permissions that were low-risk because they were undiscoverable become real exposure the moment a search assistant can surface them on request, in context, with a summary attached.",
      },
      {
        type: "ul",
        items: [
          "Audit tool definitions, not just the system prompt. Every tool with a side effect is a capability grant.",
          "Fix the oversharing problem — permission audits, least-privilege ACLs — before turning on an enterprise AI search tool, not after.",
          "Give the agent a scoped identity bound to the user it's acting for, so a manipulated agent is only as dangerous as that one account.",
          "Treat retrieved content — a webpage, an email, a document the agent reads — as untrusted input, the same way you'd treat user input to any other system.",
        ],
      },
      {
        type: "p",
        text: "The model doesn't need to be perfectly aligned if the tool it's holding can't do much damage. Spend the engineering effort on the tool permissions. The prompt-injection headlines will keep coming either way.",
      },
    ],
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
  "security-automation": [],
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

export const publishedArticles = articles
  .filter((article) => !article.draft)
  .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))

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
