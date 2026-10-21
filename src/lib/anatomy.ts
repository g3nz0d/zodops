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
    minutes: 6,
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
        text: "This is a composite, not a dump from one tenant. I keep seeing the same three lines in Cursor, Claude Desktop, and the compose file that starts the same server on a shared host. That yaml is a launch file in a repo. It is not an AWS resource, and it is not where the permission grant belongs.",
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
        text: "Where this file sits",
      },
      {
        type: "p",
        text: "Compose is not IAM. It is how ops starts this container next to the other internal services. mcp.json is the same process on a laptop. Neither file grants AWS permission. They only decide how the process boots and what it is handed at start.",
      },
      {
        type: "p",
        text: "The AWS grant is already IAM. The broken version created an IAM user, minted a long-lived access key, and pasted AKIA into the env block. IAM did the grant. The file just copied it onto every host and into git. \"Do it in IAM\" is the right instinct. The miss is that the grant was then duplicated as a secret that never expires.",
      },
      {
        type: "table",
        headers: ["Piece", "Where it lives", "What it decides"],
        rows: [
          [
            "mcp.json / Compose",
            "Laptop or the shared-host repo",
            "How the process starts, which tools it exposes, what sits in env",
          ],
          [
            "IAM role",
            "AWS, attached to the instance, task, or pod",
            "Which AWS APIs the process can call, including fetching secrets",
          ],
          [
            "Salesforce / Slack tokens",
            "Secrets Manager, then those vendors",
            "What the ticket and Slack APIs allow once the process has a token",
          ],
        ],
      },
      {
        type: "p",
        text: "Create a role. Scope it. Attach it to the compute that runs the container — instance profile on EC2, task role on ECS, IRSA or Pod Identity on EKS. The process asks the metadata service and gets a short-lived credential. Compose never sees a key. You rotate, attribute, and revoke in IAM.",
      },
      {
        type: "code",
        caption:
          "prod-itsm-mcp — IAM role policy. Attach this to the host. Do not mint a user key.",
        code: `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "ReadItsmSecretsOnly",
      "Effect": "Allow",
      "Action": "secretsmanager:GetSecretValue",
      "Resource": [
        "arn:aws:secretsmanager:us-east-1:************:secret:prod/itsm-mcp/slack-bot-••••••",
        "arn:aws:secretsmanager:us-east-1:************:secret:prod/itsm-mcp/salesforce-••••••"
      ]
    },
    {
      "Sid": "DecryptThoseSecrets",
      "Effect": "Allow",
      "Action": "kms:Decrypt",
      "Resource": "arn:aws:kms:us-east-1:************:key/••••••••-••••-••••-••••-••••••••••••",
      "Condition": {
        "StringEquals": {
          "kms:ViaService": "secretsmanager.us-east-1.amazonaws.com"
        }
      }
    }
  ]
}`,
      },
      {
        type: "p",
        text: "IAM still cannot name ticket_status instead of sql, require a human on slack_post, or pin the image. Those stay in the launch file. That is why the tighter compose exists, and why it no longer carries AWS_ACCESS_KEY_ID.",
      },
      {
        type: "h2",
        text: "The tighter version",
      },
      {
        type: "p",
        text: "The identity is the role above. This file only starts the process, names the tools, and points at secret ARNs. Split the tools. Do not let the model send or query freely.",
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
          "No AWS_ACCESS_KEY_ID. The host already has the role. Off AWS, IAM Roles Anywhere or an SSO profile — still not a pasted key.",
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
        text: "Do not approve the agent until you can approve the role and the launch file. The model will do what the tools allow. The tools will do what that identity allows. Start there.",
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
