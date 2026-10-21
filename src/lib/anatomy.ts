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
          "`mcp.json`, `claude_desktop_config.json`, or Compose has `AWS_ACCESS_KEY_ID`, a Salesforce token, or a Slack bot token in plain env.",
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
