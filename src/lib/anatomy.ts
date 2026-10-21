import { type Block, type TopicSlug, topicBySlug } from "@/lib/content"

export const anatomyStacks = [
  "mcp",
  "terraform",
  "kubernetes",
  "iam",
  "ci",
] as const

export type AnatomyStack = (typeof anatomyStacks)[number]

export const anatomyStackLabel: Record<AnatomyStack, string> = {
  mcp: "MCP",
  terraform: "Terraform",
  kubernetes: "Kubernetes",
  iam: "IAM",
  ci: "CI",
}

export type Anatomy = {
  slug: string
  title: string
  excerpt: string
  description: string
  stack: AnatomyStack
  topics: TopicSlug[]
  minutes: number
  date: string
  draft?: boolean
  glance: { label: string; value: string }[]
  body: Block[]
  related?: { href: string; label: string; note: string }[]
}

export const anatomies: Anatomy[] = [
  {
    slug: "mcp-service-account-in-env",
    title: "The Key in the Env Block",
    excerpt:
      "You reviewed the system prompt. You did not review the access key the MCP server loads on start. That key is the permission grant.",
    description:
      "A teardown of a typical MCP server config: long-lived keys in the environment, tools that run as a shared service account, and the tighter version.",
    stack: "mcp",
    topics: ["ai-agent-security"],
    minutes: 5,
    date: "2026-10-20",
    glance: [
      {
        label: "System",
        value: "Internal MCP server in front of tickets and customer data",
      },
      {
        label: "Stack",
        value: "MCP, Docker Compose, AWS IAM",
      },
      {
        label: "The miss",
        value:
          "A long-lived AWS access key in the environment. Every tool call runs as one shared account.",
      },
    ],
    body: [
      {
        type: "p",
        text: "The short version: teams review what the model is told to do. They skip the credentials the MCP server uses to do it. Those credentials are the permission grant. The prompt is commentary.",
      },
      {
        type: "h2",
        text: "The config",
      },
      {
        type: "p",
        text: "This is a composite, not a dump from one tenant. I keep seeing the same three lines in Cursor, Claude Desktop, and the compose file that wraps the same server for a shared host.",
      },
      {
        type: "code",
        caption:
          "mcp.json / claude_desktop_config.json — what the agent host actually loads",
        code: `{
  "mcpServers": {
    "itsm-mcp": {
      "command": "npx",
      "args": ["-y", "@platform/mcp-itsm"],
      "env": {
        "AWS_REGION": "us-east-1",
        "AWS_ACCESS_KEY_ID": "AKIA••••••••••••W3KQ",
        "AWS_SECRET_ACCESS_KEY": "••••••••••••••••••••••••••••••••••••••••",
        "SALESFORCE_INSTANCE_URL": "https://••••.my.salesforce.com",
        "SALESFORCE_TOKEN": "00D••••••••!••••••••••••••••",
        "SLACK_BOT_TOKEN": "xoxb-••••••••••••-••••••••••••-••••••••••••••••",
        "SLACK_TEAM_ID": "T0•••••••"
      }
    }
  }
}`,
      },
      {
        type: "p",
        text: "The container version is the same grant with a restart policy. The keys did not get safer because they moved into Compose.",
      },
      {
        type: "code",
        caption: "docker-compose.yml — same server, same identity, from the shared-host repo",
        code: `services:
  itsm-mcp:
    image: ************.dkr.ecr.us-east-1.amazonaws.com/platform/mcp-itsm:1.4.2
    container_name: itsm-mcp
    restart: unless-stopped
    networks:
      - shared-services
    environment:
      AWS_REGION: us-east-1
      AWS_ACCESS_KEY_ID: AKIA••••••••••••W3KQ
      AWS_SECRET_ACCESS_KEY: ••••••••••••••••••••••••••••••••••••••••
      SALESFORCE_INSTANCE_URL: https://••••.my.salesforce.com
      SALESFORCE_TOKEN: 00D••••••••!••••••••••••••••
      SLACK_BOT_TOKEN: xoxb-••••••••••••-••••••••••••-••••••••••••••••
      SLACK_TEAM_ID: T0•••••••
      LOG_LEVEL: info
    command:
      - mcp-server
      - --transport
      - stdio
      - --tools
      - tickets,customers,sql,slack
    logging:
      driver: json-file
      options:
        max-size: "10m"
        max-file: "3"
    labels:
      com.corp.owner: platform-ai
      com.corp.service: itsm-mcp

networks:
  shared-services:
    external: true`,
      },
      {
        type: "h2",
        text: "Three lines that matter",
      },
      {
        type: "ul",
        items: [
          "The access key. It is a long-lived principal. It does not expire with the session, the user, or the ticket the agent is reading. Every copy on every laptop and in repo history works until you rotate, and rotating breaks every one of them, so nobody does. The Salesforce value next to it is a session token — it expires — but it is still sitting beside a key that does not.",
          "The tool list. tickets, customers, sql, slack is not a support agent. It is read, join, and send on one process. SQL is a general-purpose query surface sitting behind a model that will call whatever the last document told it to call.",
          "The missing user. Nothing in this file binds a call to the person who opened the chat. Every tool runs as itsm-mcp. A prompt that says \"only look up the current requester\" is not an authorization check.",
        ],
      },
      {
        type: "h2",
        text: "What it actually grants",
      },
      {
        type: "p",
        text: "Whatever IAM and Salesforce attached to those secrets. In the rollouts I have reviewed, that is usually: read on the ticket store, read on customer records, and post to a Slack workspace. Sometimes write. Nobody mapped it because the server \"just needed to work for the pilot.\"",
      },
      {
        type: "p",
        text: "The model did not create that reach. It made it callable in one turn, from a ticket body, a pasted stack trace, or a page the agent was told to summarize.",
      },
      {
        type: "ul",
        items: [
          "A fooled agent can do anything this account can do, not anything the current user can do.",
          "The key lives on laptops and in the compose file. Laptop compromise and repo history are now the same as compromising the integration.",
          "There is no offboarding. The engineer who stood this up in March can leave. The key will not.",
        ],
      },
      {
        type: "h2",
        text: "The tighter version",
      },
      {
        type: "p",
        text: "Take the keys out of the file. Give the process an identity that can be scoped, rotated, and attributed. Split the tools. Do not let the model send or query freely.",
      },
      {
        type: "code",
        caption: "docker-compose.yml — identity on the workload, tools cut down",
        changedLines: [3, 6, 11, 12, 13, 15, 16, 17, 24, 25, 26],
        code: `services:
  itsm-mcp:
    image: ************.dkr.ecr.us-east-1.amazonaws.com/platform/mcp-itsm:1.4.2@sha256:4f2c••••••••••••••••••••••••••••••••••••••••••••••••••••••••
    container_name: itsm-mcp
    restart: unless-stopped
    read_only: true
    networks:
      - shared-services
    environment:
      AWS_REGION: us-east-1
      # No AWS_ACCESS_KEY_ID / AWS_SECRET_ACCESS_KEY.
      # EC2: instance profile. ECS: task role. EKS: IRSA or Pod Identity.
      # Off AWS: IAM Roles Anywhere or an SSO profile — not a pasted key.
      SALESFORCE_INSTANCE_URL: https://••••.my.salesforce.com
      TICKET_AUDIENCE: tickets.internal
      SLACK_BOT_TOKEN_SECRET_ARN: arn:aws:secretsmanager:us-east-1:************:secret:prod/itsm-mcp/slack-bot-••••••
      SALESFORCE_TOKEN_SECRET_ARN: arn:aws:secretsmanager:us-east-1:************:secret:prod/itsm-mcp/salesforce-••••••
      LOG_LEVEL: info
    command:
      - mcp-server
      - --transport
      - stdio
      - --tools
      - ticket_status,requester_account,slack_post
      - --confirm
      - slack_post
    logging:
      driver: json-file
      options:
        max-size: "10m"
        max-file: "3"
    labels:
      com.corp.owner: platform-ai
      com.corp.service: itsm-mcp

networks:
  shared-services:
    external: true`,
      },
      {
        type: "ul",
        items: [
          "No long-lived access keys. Map the host to the identity it already has: EC2 → instance profile, ECS → task role, EKS → IRSA or Pod Identity. Off AWS, IAM Roles Anywhere or SSO profiles. The role is read-only on the two APIs the job needs.",
          "Two read tools, named for the use case. ticket_status and requester_account. Not sql. Not \"customers.\" The join lives in your code, not in a prompt.",
          "slack_post is in the tool list, and --confirm gates it. High-impact actions require a human in the same loop.",
          "Slack and Salesforce secrets do not come back as env. Pull a bot token from a secrets manager with rotation, or issue a per-session OAuth token for the user who opened the chat. Do not paste either one into the file.",
          "Pin the image digest. Treat the MCP server like any other dependency you would not float on latest.",
        ],
      },
      {
        type: "p",
        text: "On a laptop the same rule holds. The env block should not contain AKIA. If the only way the server works is a pasted production key, it is not ready to sit behind an agent.",
      },
      {
        type: "h2",
        text: "How to tell you are looking at this",
      },
      {
        type: "ul",
        items: [
          "mcp.json, claude_desktop_config.json, or Compose has AWS_ACCESS_KEY_ID, a Salesforce token, or a Slack bot token in plain env.",
          "The command is npx -y @something/mcp-…. That flag fetches whatever latest is today, the same unpinned-dependency problem as an unpinned image tag.",
          "The tool list includes sql, query, or exec, or more than one system in a single server.",
          "You cannot name the IAM principal, its last rotation, or who is allowed to mint a new key.",
          "The same server is used by more than one person, and every call looks like the same account in the logs — if there are logs.",
        ],
      },
      {
        type: "h2",
        text: "The takeaway",
      },
      {
        type: "p",
        text: "Do not approve the agent until you can approve this file. The model will do what the tools allow. The tools will do what this identity allows. Start there.",
      },
    ],
    related: [
      {
        href: "/articles/mcp-tool-permissions-and-prompt-injection/",
        label: "Assume Your Agent Is Fooled",
        note: "Why tool permissions and identity are the control, not the system prompt.",
      },
      {
        href: "/articles/no-last-day/",
        label: "No Last Day",
        note: "The agent and the key both skip offboarding.",
      },
    ],
  },
]

export const publishedAnatomies = anatomies
  .filter((item) => !item.draft)
  .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))

export function isAnatomyVisible(): boolean {
  return (
    process.env.NODE_ENV === "development" || publishedAnatomies.length > 0
  )
}

export function visibleAnatomies(): Anatomy[] {
  return process.env.NODE_ENV === "development" ? anatomies : publishedAnatomies
}

export function getAnatomy(slug: string): Anatomy | undefined {
  return anatomies.find((item) => item.slug === slug)
}

export function canViewAnatomy(item: Anatomy): boolean {
  return !item.draft || process.env.NODE_ENV === "development"
}

export function primaryAnatomyTopic(item: Anatomy) {
  return topicBySlug(item.topics[0] ?? "ai-agent-security")
}
