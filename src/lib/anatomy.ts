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
  sources?: { href: string; label: string }[]
}

export const anatomies: Anatomy[] = [
  {
    slug: "the-log-sees-the-token",
    title: "The Log Sees the Token, Not the Hand",
    excerpt:
      "At 2 a.m., the team's agent opened a public pull request full of private code.\nGitHub says Dana opened it. Dana was asleep.",
    description:
      "A teardown of shared MCP credentials: one token behind a team agent, many people asking, and an audit trail that records the credential instead of the person. GitHub, Graph, Slack, Google Workspace, and databases, and the tighter version.",
    stack: "mcp",
    topics: ["ai-agent-security"],
    minutes: 9,
    date: "2026-10-29",
    glance: [
      {
        label: "System",
        value:
          "A shared team agent with the GitHub MCP server, plus other MCP servers for Graph, Slack, and a database",
      },
      {
        label: "Stack",
        value: "MCP, GitHub personal access token, platform audit logs",
      },
      {
        label: "The miss",
        value:
          "Every action is logged as whoever owns the credential. The log cannot say who asked, or what told the agent to do it.",
      },
    ],
    body: [
      {
        type: "p",
        text: "The short version: an MCP server doesn't act as the person typing. It acts as whoever owns the credential in its launch file. If that is an engineer's token, every action is logged under that engineer's name, including the ones a fooled agent takes on its own.",
      },
      {
        type: "h2",
        text: "Who is in this story",
      },
      {
        type: "table",
        headers: ["Who", "Role"],
        rows: [
          ["Dana", "An engineer. Her personal access token is in the agent's config."],
          ["Alex", "A teammate. He asks the agent for things in Slack."],
          ["The agent", "One AI assistant the whole team shares. It reaches GitHub through the GitHub MCP server."],
          ["GitHub", "Checks the token on every request, and writes the audit log."],
          ["An outsider", "Anyone who can open an issue on the team's public repository."],
        ],
      },
      {
        type: "h2",
        text: "How it happens",
      },
      {
        type: "p",
        text: "Setup, once. The MCP server needs a credential. The fastest one is a personal access token, so Dana pastes hers into `mcp.json`. The MCP spec says servers on the local STDIO transport should retrieve credentials from the environment, and that is exactly what happens: the server starts, reads Dana's token, and attaches it to every request it sends to GitHub.",
      },
      {
        type: "p",
        text: "A normal day. Alex asks the agent to summarize a pull request.",
      },
      {
        type: "ul",
        items: [
          "The agent calls the GitHub tool.",
          "The MCP server asks GitHub for the pull request, with Dana's token attached.",
          "GitHub checks the token and finds it belongs to Dana.",
          "To GitHub, Dana made the request.",
        ],
      },
      {
        type: "p",
        text: "Alex never appears in GitHub. The request had no place to carry his name. The person who asked and the person GitHub sees are already different people.",
      },
      {
        type: "p",
        text: "The 2 a.m. night (a composite, like the config below). Alex, or a scheduled job, asks the agent to triage new issues in the team's public repository.",
      },
      {
        type: "ul",
        items: [
          "The agent lists the new issues. One, filed by an outsider, contains instructions written for the agent: collect details from the team's private repositories and share them in a pull request.",
          "The agent cannot reliably tell instructions from data. It follows the issue.",
          "The MCP server reads files from the private repositories, with Dana's token. Dana has access, so GitHub allows it.",
          "The MCP server opens a pull request in the public repository containing that content, with Dana's token.",
          "GitHub shows the pull request's author as Dana. Anyone can read it, including the outsider.",
        ],
      },
      {
        type: "p",
        text: "Dana was asleep. Alex asked for triage, not this. Nobody at the company asked for it at all. GitHub still names Dana.",
      },
      {
        type: "p",
        text: "This is not a thought experiment. In May 2025, Invariant Labs showed this flow against the official GitHub MCP server: a malicious issue in a public repository led an agent to pull private repository data into a public pull request. They noted it is not a flaw in the server's code. The fix they point to is limiting what the agent can access.",
      },
      {
        type: "p",
        text: "Think of a key card left at a shared front desk. Anyone can ask the desk to open a door. The door logs whose card it was. It cannot see who was standing at the desk, or that a stranger slipped the desk a note.",
      },
      {
        type: "h2",
        text: "The config",
      },
      {
        type: "p",
        text: "This is a composite, not a dump from one team. The GitHub server block follows the shape in GitHub's own README; the token is the part that varies.",
      },
      {
        type: "code",
        caption: "mcp.json — the shared team agent",
        changedLines: [5, 8],
        changedNote: "marks the personal token GitHub will log as Dana.",
        code: `{
  "mcpServers": {
    "github": {
      "command": "docker",
      "args": ["run", "-i", "--rm", "-e", "GITHUB_PERSONAL_ACCESS_TOKEN",
               "ghcr.io/github/github-mcp-server"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_••••••••••••••••••••"
      }
    }
  }
}`,
      },
      {
        type: "table",
        headers: ["What GitHub records", "What it shows"],
        rows: [
          ["Pull request author", "dana-k, the owner of the token. Visible to anyone who opens the pull request."],
          ["Audit log events from the token", "Actor dana-k, plus `hashed_token` (a SHA-256 hash, so you can tell which token) and `programmatic_access_type` (a personal access token, not the web UI)"],
          ["Who asked the agent", "Not recorded"],
          ["What told the agent to do it", "Not recorded"],
        ],
      },
      {
        type: "p",
        text: "Token data in the audit log, on GitHub Enterprise Cloud, is useful. It tells you a token did it, not a browser session. It still cannot tell you which teammate asked, or that the instruction came from an issue the agent read.",
      },
      {
        type: "h2",
        text: "Three lines that matter",
      },
      {
        type: "ul",
        items: [
          "`GITHUB_PERSONAL_ACCESS_TOKEN`. The token is Dana's. GitHub ties a personal access token to the user who generated it, and attributes what it does to them. A classic token can reach every repository Dana can.",
          "One agent, many askers. Five engineers use the agent. One identity appears in the log. The person who asked and the person who is blamed are different people.",
          "Nothing records the tool call. This config launches a server and hands it a token. It does not record which user asked, which tool ran, or what the agent had just read.",
        ],
      },
      {
        type: "h2",
        text: "What it actually hides",
      },
      {
        type: "p",
        text: "The morning after:",
      },
      {
        type: "ul",
        items: [
          "GitHub points at Dana. The first question in the incident is whether Dana leaked the code, or whether her account is compromised.",
          "The real path is invisible. Nothing in GitHub connects the pull request to Alex's request, or to the issue that carried the instruction.",
          "Revoking Dana's token breaks the agent for the whole team, which is often how teams discover whose token it was.",
          "Dana leaves the company, her access is removed, and the agent breaks for everyone. If her account lingers instead, the agent keeps running as a former employee. That is the offboarding miss from No Last Day, in a new place.",
        ],
      },
      {
        type: "p",
        text: "An audit trail that names the wrong person can be worse than an empty one. It sends the investigation in the wrong direction.",
      },
      {
        type: "h2",
        text: "Where these logs sit",
      },
      {
        type: "p",
        text: "GitHub is the sharpest example, not the only one. Every MCP server that runs on a shared credential has the same gap. What changes is whose name ends up in the log.",
      },
      {
        type: "table",
        headers: ["Platform", "What the MCP server usually runs on", "Whose name the log shows", "The per-user fix"],
        rows: [
          ["GitHub", "A personal access token", "The token's owner, a real engineer", "GitHub App user access tokens: actions are attributed to the user who authorized the app"],
          ["Microsoft Graph", "An app-only token: client secret or certificate", "The app. There is no user on the token.", "Delegated, on-behalf-of access, so the user is on the token"],
          ["Slack", "A bot token (`xoxb-`)", "The app's bot", "Each user's own user token (`xoxp-`), so actions appear under that user, or log the requester yourself"],
          ["Google Workspace", "A service account with domain-wide delegation", "The impersonated user. Security researchers note the service account shows up only as a numeric ID.", "Per-user OAuth"],
          ["Databases", "One shared login in `DATABASE_URL`", "That one login, for everyone", "Per-user database auth, or pass the user into your own audit record"],
        ],
      },
      {
        type: "p",
        text: "Two rows name a real person who did not ask: GitHub and Google. Those are the ones that send investigations the wrong way.",
      },
      {
        type: "h2",
        text: "The tighter version",
      },
      {
        type: "p",
        text: "Put the person who asked on the token. When you cannot, write them into your own log.",
      },
      {
        type: "p",
        text: "1. Per-user credentials for shared agents. Run the remote GitHub MCP server with OAuth instead of a pasted token. The MCP spec defines OAuth 2.1 for HTTP transports, and GitHub's README notes the host needs a GitHub App or OAuth App to support it. With a GitHub App user access token, GitHub attributes the request to the user who authorized the app. Access is limited to what both the user and the app can reach, and with expiration enabled the token lasts eight hours.",
      },
      {
        type: "p",
        text: "2. No personal tokens for team automation. If the agent must act as itself, give it its own identity: a GitHub App installation, not an engineer's token. GitHub's own guidance is to use a GitHub App for organization automation and long-lived integrations. Now the log names the app, not Dana.",
      },
      {
        type: "p",
        text: "3. One audit event per tool call, written by you. The platform log only knows the credential. Your MCP host or gateway knows the rest.",
      },
      {
        type: "code",
        caption: "One audit event per tool call — an example schema, not a standard",
        changedLines: [3, 5, 6, 8, 9],
        changedNote:
          "marks who asked, which credential, which tool, what the agent had just read, and what it created.",
        code: `{
  "time": "2026-10-27T02:14:07-07:00",
  "asked_by": "alex@corp.example",
  "agent": "team-repo-assistant",
  "credential": "github-app:repo-assistant",
  "tool": "create_pull_request",
  "target": "corp/website (public)",
  "context_sources": ["corp/website issue #4821"],
  "result": "corp/website pull request #4822"
}`,
      },
      {
        type: "p",
        text: "The fields that matter: who asked, which agent, which credential, which tool, which resource, and what the agent had just read. Recording the result, the pull request it opened, lets you match your record to GitHub's by object and time.",
      },
      {
        type: "p",
        text: "4. One identity per agent. Two agents on one credential share one name in every log. Separate identities make every other control here easier.",
      },
      {
        type: "p",
        text: "5. Keep the token out of the file. A shared credential in `mcp.json` is the env-block miss from The Key in the Env Block. Fix both together.",
      },
      {
        type: "h2",
        text: "How to tell you are looking at this",
      },
      {
        type: "ul",
        items: [
          "`mcp.json` holds `GITHUB_PERSONAL_ACCESS_TOKEN`, `SLACK_BOT_TOKEN`, a client secret, or a `DATABASE_URL`, and more than one person uses the agent.",
          "You can name whose token the agent runs on, but not who asked for its last ten actions.",
          "Revoking one engineer's token would break a team tool.",
          "Your MCP host has no record of tool calls, or keeps them only in a local console.",
          "An incident review has ever started with \"did you do this?\" and the answer was no.",
        ],
      },
      {
        type: "h2",
        text: "The takeaway",
      },
      {
        type: "p",
        text: "The log records the credential, not the person. If the credential belongs to someone else, the log names someone who never asked. Put the asker on the token, give each agent its own identity, and write down every tool call yourself.",
      },
    ],
    related: [
      {
        href: "/anatomy/mcp-service-account-in-env/",
        label: "The Key in the Env Block",
        note: "The same shared credential, one step earlier.",
      },
      {
        href: "/articles/mcp-tool-permissions-and-prompt-injection/",
        label: "Assume Your Agent Is Fooled",
        note: "Why the grant is the control, not the system prompt.",
      },
      {
        href: "/articles/no-last-day/",
        label: "No Last Day",
        note: "What happens to an agent's credential when the person behind it leaves.",
      },
    ],
    sources: [
      {
        href: "https://invariantlabs.ai/blog/mcp-github-vulnerability",
        label: "Invariant Labs: GitHub MCP exploited, accessing private repositories via MCP (May 2025)",
      },
      {
        href: "https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens",
        label: "GitHub: Managing your personal access tokens",
      },
      {
        href: "https://docs.github.com/en/enterprise-cloud@latest/organizations/keeping-your-organization-secure/managing-security-settings-for-your-organization/identifying-audit-log-events-performed-by-an-access-token",
        label: "GitHub: Token data in the audit log",
      },
      {
        href: "https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/authenticating-with-a-github-app-on-behalf-of-a-user",
        label: "GitHub: Authenticating with a GitHub App on behalf of a user",
      },
      {
        href: "https://pkg.go.dev/github.com/github/github-mcp-server",
        label: "GitHub MCP server README",
      },
      {
        href: "https://modelcontextprotocol.io/specification/latest/basic/authorization",
        label: "Model Context Protocol: Authorization",
      },
      {
        href: "https://learn.microsoft.com/en-us/graph/microsoft-graph-activity-logs-overview",
        label: "Microsoft Graph activity logs",
      },
      {
        href: "https://www.hunters.security/en/blog/delefriend-a-newly-discovered-design-flaw-in-domain-wide-delegation-could-leave-google-workspace-vulnerable-for-takeover",
        label: "Hunters: DeleFriend, domain-wide delegation research",
      },
    ],
  },
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
        text: "This is a composite, not a dump from one tenant. I keep seeing the same three lines in agent hosts and the compose file that starts the same server on a shared host. That yaml is a launch file in a repo. It is not an AWS resource, and it is not where the permission grant belongs.",
      },
      {
        type: "code",
        caption:
          "mcp.json — what the agent host actually loads",
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
          "The tool list. `tickets,customers,sql,slack` is not a support agent. It is read, join, and send on one process. `sql` is a general-purpose query surface sitting behind a model that will call whatever the last document told it to call.",
          "The missing user. Nothing in this file binds a call to the person who opened the chat. Every tool runs as `itsm-mcp`. A prompt that says \"only look up the current requester\" is not an authorization check.",
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
        text: "Compose is not IAM. It is how ops starts this container next to the other internal services. `mcp.json` is the same process on a laptop. Neither file grants AWS permission. They only decide how the process boots and what it is handed at start.",
      },
      {
        type: "p",
        text: "The AWS grant is already IAM. The broken version created an IAM user, minted a long-lived access key, and pasted `AKIA` into the env block. IAM did the grant. The file just copied it onto every host and into git. \"Do it in IAM\" is the right instinct. The miss is that the grant was then duplicated as a secret that never expires.",
      },
      {
        type: "table",
        headers: ["Piece", "Where it lives", "What it decides"],
        rows: [
          [
            "`mcp.json` / Compose",
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
        text: "IAM still cannot name `ticket_status` instead of `sql`, require a human on `slack_post`, or pin the image. Those stay in the launch file. That is why the tighter compose exists, and why it no longer carries `AWS_ACCESS_KEY_ID`.",
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
        changedNote: "marks what changed from the compose file above.",
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
          "No `AWS_ACCESS_KEY_ID`. The host already has the role. Off AWS, IAM Roles Anywhere or an SSO profile — still not a pasted key.",
          "Two read tools, named for the use case. `ticket_status` and `requester_account`. Not `sql`. Not \"customers.\" The join lives in your code, not in a prompt.",
          "`slack_post` is in the tool list, and `--confirm` gates it. High-impact actions require a human in the same loop.",
          "Slack and Salesforce secrets do not come back as env. Pull a bot token from a secrets manager with rotation, or issue a per-session OAuth token for the user who opened the chat. Do not paste either one into the file.",
          "Pin the image digest. Treat the MCP server like any other dependency you would not float on `latest`.",
        ],
      },
      {
        type: "p",
        text: "On a laptop the same rule holds. The env block should not contain `AKIA`. If the only way the server works is a pasted production key, it is not ready to sit behind an agent.",
      },
      {
        type: "h2",
        text: "How to tell you are looking at this",
      },
      {
        type: "ul",
        items: [
          "`mcp.json` or Compose has `AWS_ACCESS_KEY_ID`, a Salesforce token, or a Slack bot token in plain env.",
          "The command is `npx -y @something/mcp-…`. That flag fetches whatever `latest` is today, the same unpinned-dependency problem as an unpinned image tag.",
          "The tool list includes `sql`, `query`, or `exec`, or more than one system in a single server.",
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
        href: "/anatomy/sites-read-all-is-the-index/",
        label: "Sites.Read.All Is the Index",
        note: "The same miss on Microsoft Graph: the agent crawls the tenant, not the site.",
      },
      {
        href: "/anatomy/github-oidc-org-can-assume-prod/",
        label: "The Org Can Assume Prod",
        note: "You moved the grant onto a role. CI is often who is allowed to become it.",
      },
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
  {
    slug: "sites-read-all-is-the-index",
    title: "Sites.Read.All Is the Index",
    excerpt:
      "You connected the agent to SharePoint. You did not review the Graph permission the app was granted. Application Sites.Read.All is a tenant crawl, not a search box.",
    description:
      "A teardown of a typical SharePoint MCP config: an Entra app with application Sites.Read.All, a client secret in the env block, and the tighter version.",
    stack: "mcp",
    topics: ["ai-agent-security", "data-security"],
    minutes: 7,
    date: "2026-10-21",
    glance: [
      {
        label: "System",
        value:
          "Internal agent with an MCP server in front of SharePoint and files",
      },
      {
        label: "Stack",
        value: "MCP, Microsoft Graph, Entra ID",
      },
      {
        label: "The miss",
        value:
          "Application `Sites.Read.All` and `Files.Read.All`. The agent reads the tenant, not the site the user opened.",
      },
    ],
    body: [
      {
        type: "p",
        text: "The short version: teams review what the model is allowed to say. They skip the Graph permission the MCP server uses to fetch. Application `Sites.Read.All` is not \"the agent can search SharePoint.\" It is a tenant crawl. Prompt injection is how someone asks.",
      },
      {
        type: "h2",
        text: "What you are looking at",
      },
      {
        type: "p",
        text: "An Entra app registration holds the grant. The MCP server is how the agent calls Graph. The launch file hands the server a client id, a tenant id, and a secret, then asks for `https://graph.microsoft.com/.default`. That scope means: every application permission an admin already consented on this app. The permission list is the door. The file is how the process knocks.",
      },
      {
        type: "h2",
        text: "The config",
      },
      {
        type: "p",
        text: "This is a composite, not a dump from one tenant. I keep seeing the same pair in agent hosts and Graph connectors: a SharePoint MCP server with a client secret in env, and an Entra app that has application `Sites.Read.All` with admin consent.",
      },
      {
        type: "code",
        caption:
          "mcp.json — the job that knocks",
        code: `{
  "mcpServers": {
    "sharepoint": {
      "command": "npx",
      "args": ["-y", "@platform/mcp-graph"],
      "env": {
        "TENANT_ID": "••••••••-••••-••••-••••-••••••••••••",
        "CLIENT_ID": "••••••••-••••-••••-••••-••••••••••••",
        "CLIENT_SECRET": "••••••••••••••••••••••••••••••••",
        "GRAPH_SCOPE": "https://graph.microsoft.com/.default"
      }
    }
  }
}`,
      },
      {
        type: "code",
        caption:
          "prod-graph-mcp — annotated summary of the Entra API permissions. Not a portal export.",
        code: `Microsoft Graph
  Sites.Read.All          Application
  Files.Read.All          Application
  Mail.Read               Application

Grant type: client credentials
Admin consent: granted 2026-03-12
Site grants: none — .All does not use them`,
      },
      {
        type: "h2",
        text: "Three lines that matter",
      },
      {
        type: "p",
        text: "Application permissions have no user on the token. Graph evaluates the app, not the person who opened the chat. `Sites.Read.All` plus `Files.Read.All` is read on every site collection and every file the tenant will hand to an app. `Mail.Read` next to them is the same pattern on the mailbox store.",
      },
      {
        type: "ul",
        items: [
          "`Sites.Read.All` as Application, with admin consent. That is the crawl. The agent can list and read sites the current user has never opened, including sites no one meant to put behind a chatbot.",
          "`.default` and a client secret. The server is not doing delegated-on-behalf-of. It is the app. The secret in `mcp.json` is a long-lived copy of that principal — the same miss as `AKIA` in the env block.",
          "The attacker is not a stranger on the internet. It is anyone who can put a document, a page, or a ticket in front of the agent — or anyone who can invoke this MCP server. Hidden text in a SharePoint page the agent was told to summarize is enough.",
        ],
      },
      {
        type: "h2",
        text: "What it actually grants",
      },
      {
        type: "p",
        text: "Whatever those application permissions cover. Sharing does not apply. The app reads the support knowledge base the pilot needed, and also finance, HR, M&A, and every site nobody has opened since 2019.",
      },
      {
        type: "ul",
        items: [
          "A fooled agent can read anything this app can read, not anything the current user can read.",
          "`Files.Read.All` is every SharePoint library and every user's OneDrive. The personal drives are the worse exposure. That is where the real files sit.",
          "A Purview sensitivity label can still stop the app. Encrypted files need usage rights or a super-user grant. Labeling reaches app-only access. Sharing does not.",
          "The secret and the consent outlive the engineer who clicked Grant admin consent in March.",
        ],
      },
      {
        type: "h2",
        text: "Where these files sit",
      },
      {
        type: "p",
        text: "`mcp.json` is not Entra. It is the launch file. The API permission list is the Graph grant. A `Sites.Selected` site permission is the per-site grant that `.All` skips. SharePoint sharing is who can already see the files. None of those replace the others.",
      },
      {
        type: "table",
        headers: ["Piece", "Where it lives", "What it decides"],
        rows: [
          [
            "`mcp.json`",
            "Laptop or the agent host",
            "How the process starts, which tools it exposes, what sits in env",
          ],
          [
            "Entra API permissions",
            "The app registration, after admin consent",
            "Which Graph APIs the app may call, and whether a user is on the token",
          ],
          [
            "Site permission",
            "`POST /sites/{id}/permissions` — needs `Sites.FullControl.All` on a separate admin app, or an admin running it",
            "Which site collections the `Sites.Selected` app may actually touch",
          ],
          [
            "SharePoint sharing",
            "Each site, library, and file",
            "Who can already see the content — including Everyone except external users",
          ],
        ],
      },
      {
        type: "p",
        text: "\"We connected SharePoint\" names the mechanism. It does not name the crawl. If the app has application `Sites.Read.All`, the agent is not searching a site. It is reading the tenant.",
      },
      {
        type: "h2",
        text: "The tighter version",
      },
      {
        type: "p",
        text: "Take `.All` off the app. Use `Sites.Selected`. An admin — not this app — then grants read on the one site. That call needs `Sites.FullControl.All`. Take the secret out of the file. Do not let the model search or send freely.",
      },
      {
        type: "code",
        caption:
          "prod-graph-mcp — annotated summary. Application. One scope.",
        changedLines: [2, 6, 7, 8],
        changedNote: "marks what changed from the permission list above.",
        code: `Microsoft Graph
  Sites.Selected          Application

Grant type: client credentials
Admin consent: granted
Site grants: required — Sites.Selected allows nothing until you add them
Mail.Read: removed
Files.Read.All: removed`,
      },
      {
        type: "code",
        caption:
          "POST /sites/{support-kb}/permissions — the one site this app may read. Not called by prod-graph-mcp.",
        code: `{
  "roles": ["read"],
  "grantedToIdentities": [
    {
      "application": {
        "id": "••••••••-••••-••••-••••-••••••••••••",
        "displayName": "prod-graph-mcp"
      }
    }
  ]
}`,
      },
      {
        type: "p",
        text: "That call is not something this app can make. `POST /sites/{id}/permissions` needs `Sites.FullControl.All` on a separate admin app, or an admin running it. Granting a site is a deliberate admin act. That is the point.",
      },
      {
        type: "code",
        caption:
          "mcp.json — no secret, site pinned. Auth is not in this file.",
        changedLines: [5, 10],
        changedNote: "marks what changed from the launch file above.",
        code: `{
  "mcpServers": {
    "sharepoint": {
      "command": "npx",
      "args": ["@platform/mcp-graph@1.4.2"],
      "env": {
        "TENANT_ID": "••••••••-••••-••••-••••-••••••••••••",
        "CLIENT_ID": "••••••••-••••-••••-••••-••••••••••••",
        "GRAPH_SCOPE": "https://graph.microsoft.com/.default",
        "SITE_ID": "••••.sharepoint.com,••••••••-••••-••••-••••-••••••••••••,••••••••-••••-••••-••••-••••••••••••"
      }
    }
  }
}`,
      },
      {
        type: "p",
        text: "This file no longer authenticates the server. On Azure, the process uses a managed identity or a federated credential — the Entra equivalent of the workload role in The Key in the Env Block. That does not work on a laptop. For a local server, use a certificate credential, ideally non-exportable and stored in a key store, or move the server onto a host that can use a managed identity. A missing `CLIENT_SECRET` is not a complete fix if nothing replaced it.",
      },
      {
        type: "ul",
        items: [
          "`Sites.Selected` with no site grant is no SharePoint access. That is the point. You add the site on purpose, with `roles: [\"read\"]`. Finance, HR, and the 2019 dump are not in the crawl. If the job is one library or one file, `Lists.SelectedOperations.Selected` and `Files.SelectedOperations.Selected` go tighter than a whole site. Same rule: consent grants nothing until you add the resource permission.",
          "Pin the package. `npx -y @platform/mcp-graph` fetches whatever `latest` is today.",
          "`SITE_ID` in env is hygiene. It only holds if the server refuses other sites. Graph enforces `Sites.Selected`. A prompt that says \"only the support site\" is not a control.",
          "If a job really needs mail, do not put application `Mail.Read` on the tenant. Exchange Online RBAC for Applications can limit an app to a set of mailboxes. Removal is still the default.",
          "Delegated, on-behalf-of the current user, is the right shape for an interactive agent. It is not a fix for oversharing. Application permissions ignore sharing. A delegated token inherits it: if the site is shared to Everyone except external users, the user can see it, so the agent can too. Fix the sharing. Then pick delegated.",
        ],
      },
      {
        type: "h2",
        text: "How to tell you are looking at this",
      },
      {
        type: "ul",
        items: [
          "The Entra app has application `Sites.Read.All` or `Files.Read.All`, with admin consent, and no site-permission grants.",
          "`mcp.json` or the connector has `CLIENT_SECRET` and `GRAPH_SCOPE` of `.default`.",
          "You cannot name which site the agent is allowed to read, or who is allowed to add a new one.",
          "The same app is used by more than one agent, and every call looks like this app ID. Look in the Microsoft Graph activity logs and the unified audit log's SharePoint events. Both record the app ID.",
          "A SharePoint search for \"Everyone except external users\" still returns sites the chatbot was never meant to see.",
        ],
      },
      {
        type: "h2",
        text: "The takeaway",
      },
      {
        type: "p",
        text: "Do not approve the agent until you can approve the permission list and the site grant. The model will do what the tools allow. The tools will do what this app can read. `Sites.Read.All` is the index. Start there.",
      },
    ],
    related: [
      {
        href: "/anatomy/mcp-service-account-in-env/",
        label: "The Key in the Env Block",
        note: "The same miss one step earlier: a long-lived secret in the launch file.",
      },
      {
        href: "/articles/mcp-tool-permissions-and-prompt-injection/",
        label: "Assume Your Agent Is Fooled",
        note: "Why the permission grant is the control, not the system prompt.",
      },
      {
        href: "/articles/dspm-dlp-shadow-ai-leaks/",
        label: "The Paste Is the Leak",
        note: "Oversharing is also how the file got into the tenant in the first place.",
      },
    ],
  },
  {
    slug: "github-oidc-org-can-assume-prod",
    title: "The Org Can Assume Prod",
    excerpt:
      "You took the access key out of the pipeline. The trust policy still says any repo in the org can become the prod role. That is the same grant with a nicer name.",
    description:
      "A teardown of a typical GitHub Actions OIDC setup: a deploy workflow that can assume prod, a trust policy scoped to the whole org, and the tighter version.",
    stack: "ci",
    topics: ["cloud-security"],
    minutes: 7,
    date: "2026-10-21",
    glance: [
      {
        label: "System",
        value: "GitHub Actions deploy job that assumes an AWS role",
      },
      {
        label: "Stack",
        value: "GitHub Actions, OIDC, AWS IAM",
      },
      {
        label: "The miss",
        value:
          "The trust policy allows `repo:corp/*`. Any repo in the org can assume prod.",
      },
    ],
    body: [
      {
        type: "p",
        text: "The short version: teams stop pasting `AKIA` into GitHub Secrets and call it done. The deploy role is still one shared principal. The trust policy decides who is allowed to become it. Most of the ones I review say the whole org.",
      },
      {
        type: "h2",
        text: "What you are looking at",
      },
      {
        type: "p",
        text: "A deploy job still needs AWS credentials. The safer pattern is OIDC: GitHub mints a short-lived signed token for that one run. AWS checks the signature, then issues temporary credentials for a role. No long-lived key sits in Secrets. That part is right.",
      },
      {
        type: "p",
        text: "Two files make it work. The workflow is how the job knocks. The IAM trust policy is the door. IAM still decides what the role can do once someone is through. This teardown is about the door.",
      },
      {
        type: "h2",
        text: "The config",
      },
      {
        type: "p",
        text: "This is a composite, not a dump from one tenant. I keep seeing the same pair: a workflow that assumes a role named `prod-deploy`, and a trust policy that will hand that role to any repository under the org.",
      },
      {
        type: "code",
        caption: ".github/workflows/deploy.yml — the job that knocks",
        code: `name: deploy

on:
  push:
  pull_request:
  workflow_dispatch:

permissions:
  id-token: write
  contents: read

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Assume prod
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: arn:aws:iam::************:role/prod-deploy
          aws-region: us-east-1

      - name: Deploy
        run: ./scripts/deploy.sh`,
      },
      {
        type: "code",
        caption: "prod-deploy trust policy — the door",
        code: `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::************:oidc-provider/token.actions.githubusercontent.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "token.actions.githubusercontent.com:aud": "sts.amazonaws.com"
        },
        "StringLike": {
          "token.actions.githubusercontent.com:sub": "repo:corp/*"
        }
      }
    }
  ]
}`,
      },
      {
        type: "h2",
        text: "Three lines that matter",
      },
      {
        type: "p",
        text: "GitHub puts an identity into the token. That field is called `sub`. The default looks like `repo:org/repo:environment:production`, or `repo:org/repo:ref:refs/heads/main`, or `repo:org/repo:pull_request`. The trust policy matches on `sub`. Whatever matches can become the role. The role ARN is not a secret. Naming it is a very low bar.",
      },
      {
        type: "ul",
        items: [
          "`repo:corp/*`. Every repository in the org. A new sandbox, a leftover demo, a contractor experiment, an old workflow nobody owns.",
          "The attacker is not a stranger on a fork. Fork pull requests do not get an OIDC token. The people who can do this already have write access to some repo in the org — or they compromised an action or dependency that runs in one. That is still a large group.",
          "The workflow triggers are not the door. Anyone who can push a branch can add their own workflow file with whatever `on:` they want. `on: pull_request` is sloppy. It is not what lets them in.",
        ],
      },
      {
        type: "h2",
        text: "What it actually grants",
      },
      {
        type: "p",
        text: "Whatever `prod-deploy` can do in AWS. In the rollouts I have reviewed, that is often deploy to the prod account, and sometimes close to admin because \"the pipeline has to be able to create resources.\" The workflow did not create that reach. The role did. The trust policy made it callable from the whole org.",
      },
      {
        type: "ul",
        items: [
          "Write access to any repo in the org — or a compromised action running in one — is enough to assume prod. You do not need to compromise `platform`.",
          "The repos and workflows people create outlive them. The engineer who added `role-to-assume` in March can leave. Nothing removes those repos' ability to assume the role.",
        ],
      },
      {
        type: "h2",
        text: "Where these files sit",
      },
      {
        type: "p",
        text: "The workflow is not IAM. It lives in the repo and starts the job. The trust policy is IAM. It decides who may assume the role. The role policy is also IAM. It decides what the role can call after it has been assumed. A GitHub Environment is the approval gate in GitHub — reviewers, wait timer, which branch may use it. None of those replace the others.",
      },
      {
        type: "table",
        headers: ["Piece", "Where it lives", "What it decides"],
        rows: [
          [
            "`deploy.yml`",
            "The repo, under `.github/workflows/`",
            "When the job is supposed to run. Hygiene, not a security boundary",
          ],
          [
            "Trust policy",
            "IAM, on the `prod-deploy` role",
            "Which GitHub identity is allowed to assume the role",
          ],
          [
            "Role policy",
            "IAM, on the same role",
            "Which AWS APIs the job can call once it is in",
          ],
          [
            "GitHub Environment",
            "The repo's Environments settings",
            "Required reviewers, and which branches may use it",
          ],
        ],
      },
      {
        type: "p",
        text: "\"We use OIDC\" names the mechanism. It does not name who is allowed. If `sub` is `repo:corp/*`, the long-lived key is gone, but the grant is still a copy: any workflow in the org that names the role can assume it.",
      },
      {
        type: "h2",
        text: "The tighter version",
      },
      {
        type: "p",
        text: "Pin `sub` to one repository and one GitHub Environment. On that Environment, require reviewers and restrict deployment branches to `main`. The `on:` filter in the workflow is hygiene. It does not hold the door.",
      },
      {
        type: "code",
        caption:
          "prod-deploy trust policy — one repo, one environment, no wildcard",
        changedLines: [11, 12, 13],
        changedNote: "marks what changed from the trust policy above.",
        code: `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::************:oidc-provider/token.actions.githubusercontent.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "token.actions.githubusercontent.com:aud": "sts.amazonaws.com",
          "token.actions.githubusercontent.com:sub": "repo:corp/platform:environment:production"
        }
      }
    }
  ]
}`,
      },
      {
        type: "code",
        caption:
          ".github/workflows/deploy.yml — Environment set; the trigger filter is hygiene",
        changedLines: [5, 9, 14, 15, 16, 17],
        changedNote: "marks what changed from the workflow above.",
        code: `name: deploy

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: production
    permissions:
      id-token: write
      contents: read
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Assume prod
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: arn:aws:iam::************:role/prod-deploy
          aws-region: us-east-1

      - name: Deploy
        run: ./scripts/deploy.sh`,
      },
      {
        type: "ul",
        items: [
          "`StringEquals` on `sub`, not `StringLike` on `repo:corp/*`. The token must be `repo:corp/platform:environment:production`. A sandbox repo does not match. A job that forgot `environment: production` does not match.",
          "`environment: production` on the job, with required reviewers on that Environment in GitHub. The trust policy checks the claim. The Environment is what makes a human see the run before it starts.",
          "Restrict deployment branches to `main` on that Environment. Without that rule, someone can push a branch whose workflow declares `environment: production`, and the only thing stopping them is a reviewer clicking approve.",
          "`on: push` limited to `main` is hygiene. Anyone who can push a branch can add a different workflow file. Do not treat the trigger as a security control.",
          "`id-token: write` on this job, not the whole workflow, is defense in depth. An attacker with write on the repo can edit the file. The trust policy and the Environment rules are what stop them.",
          "The role policy is still the blast radius. This door can be tight and the role can still be admin. Do not approve one without the other.",
        ],
      },
      {
        type: "p",
        text: "`sub` is the caller — the repo whose job ran. A reusable workflow from another repo does not change that. AWS now evaluates GitHub claims as their own condition keys, including `job_workflow_ref`, `repository_id`, and `environment`. You still have to evaluate `sub`; IAM requires it. If you want only a shared deploy workflow to assume the role, pin `job_workflow_ref` to that file and keep `sub` scoped to the repos that may call it.",
      },
      {
        type: "p",
        text: "If this org customized the OIDC subject template, or the repo uses immutable subject claims — the default for repositories created after 15 July 2026 — the `sub` string will not look like the example. Read the token you actually get. Putting `repository_id` in the template, or as its own condition key, means a renamed or recreated repo does not inherit the grant.",
      },
      {
        type: "h2",
        text: "How to tell you are looking at this",
      },
      {
        type: "ul",
        items: [
          "The trust policy has `StringLike` and `repo:org/*`, or `repo:org/repo:*`, or no `sub` condition at all.",
          "You cannot name which repository is allowed to assume `prod-deploy`, or who is allowed to add a new one.",
          "More than one repo in the org already copies the same `role-to-assume` ARN. The ARN is not a secret.",
          "The GitHub Environment is missing, has no required reviewers, or does not restrict deployment branches to `main`.",
        ],
      },
      {
        type: "h2",
        text: "The takeaway",
      },
      {
        type: "p",
        text: "Do not approve the pipeline until you can approve the trust policy. OIDC removed the key. It did not name who is allowed. `repo:corp/*` means the org can assume prod. Start there.",
      },
    ],
    related: [
      {
        href: "/anatomy/mcp-service-account-in-env/",
        label: "The Key in the Env Block",
        note: "The same miss one step earlier: a long-lived key in the launch file.",
      },
      {
        href: "/articles/no-last-day/",
        label: "No Last Day",
        note: "The workflow and the trust condition both skip offboarding.",
      },
      {
        href: "/articles/scp-deny-is-the-perimeter/",
        label: "The Deny Is the Perimeter",
        note: "A tight door still sits under whatever the role — and the SCP — allow.",
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
