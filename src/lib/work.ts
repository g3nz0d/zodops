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
  description: string
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
    title: "Finding Shadow Assistants Before They Found Us",
    excerpt:
      "Employees were sending sensitive data, including AWS secret keys, to assistants nobody had approved. I paired DSPM with endpoint and inline DLP to find it, then rebuilt policy around corporate versus personal assistant instances, cutting false positives by about two-thirds.",
    description:
      "How I paired DSPM with endpoint and inline DLP to find shadow-assistant usage and leaked credentials, and cut false positives by distinguishing corporate from personal assistant instances.",
    subtitle: "Case study · Data Security · Agent Security",
    topics: ["data-security", "ai-agent-security"],
    tools: ["Cyera", "Microsoft Purview", "Zscaler"],
    minutes: 5,
    glance: [
      {
        label: "Environment",
        value: "Large healthcare enterprise, about 20,000 employees",
      },
      {
        label: "My role",
        value: "Enterprise Security Architect, lead on the program",
      },
      {
        label: "Tools",
        value:
          "Cyera (DSPM), Microsoft Purview (endpoint and Microsoft 365 DLP), Zscaler (inline DLP)",
      },
      {
        label: "Timeline",
        value: "Four months from scoping to enforcement",
      },
    ],
    body: [
      {
        type: "h2",
        text: "The problem",
      },
      {
        type: "p",
        text: "Employees had started using assistants faster than security could approve them. Some used the company's sanctioned enterprise assistant service. Many used personal accounts on public assistants, and nobody could say which ones, how often, or what data was going into them.",
      },
      {
        type: "p",
        text: "The organization needed answers to three questions:",
      },
      {
        type: "ol",
        items: [
          "Which assistants are people actually using?",
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
          "**The same assistant service often served both corporate and personal accounts** through the same domain, so traffic-based rules couldn't tell them apart.",
          "**Blocking everything wasn't an option.** The business had approved assistants for real work, and a heavy-handed rollout would have pushed people to unmanaged devices.",
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
        text: "**Watched the paths data actually takes.** Purview covered paste and upload activity on managed devices. Zscaler covered inline traffic to assistant applications. Together they showed which assistants were in use and what was being sent.",
      },
      {
        type: "p",
        text: "**Ran in audit mode first.** Before enforcing anything, I ran the policies in monitor-only mode to measure what they would catch and how much of it was noise.",
      },
      {
        type: "p",
        text: "**Rebuilt policy around instance, not destination.** Early results were dominated by false positives from people using the approved assistants correctly. I changed the policy to key on which instance the user was in (the corporate tenant versus a personal account) and on the class of data involved, rather than on the assistant service's domain.",
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
          "**Shadow-assistant usage was broader than expected:** 8 assistant applications in use, most of them unsanctioned.",
          "**Sensitive data was leaving through prompts and pastes,** including patient-adjacent records, internal protocol documents, and engineering config.",
          "**The most serious findings were credentials.** AWS secret keys and other secrets were being pasted into chats, usually by engineers debugging an error with logs or config files.",
        ],
      },
      {
        type: "h2",
        text: "Results",
      },
      {
        type: "ul",
        items: [
          "**False positives dropped by about two-thirds** once policy distinguished the corporate tenant from personal accounts.",
          "**Leaked credentials were deactivated within hours** through a defined response: confirm the IAM user, set the key inactive, then rotate and delete.",
          "**Most flagged users moved to the sanctioned assistant** after an in-the-moment coaching prompt instead of a ticket two days later.",
          "**Leadership got the first complete inventory of assistant usage** across the company, including which tools were approved and which were not.",
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
            note: "the full write-up on DSPM, DLP, and policy design for shadow assistants.",
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
  {
    slug: "the-deny-still-held",
    title: "The Deny Still Held",
    excerpt:
      "A weekend AdministratorAccess grant outlived the migration. The SCP kept the role from leaving the org or turning off CloudTrail. It couldn't stop a bucket policy from trusting an account we didn't own. I treated the deny as the ceiling, then added resource control policies for the data path.",
    description:
      "How I used SCPs as a ceiling that still holds when IAM is wrong, then paired them with resource control policies after a bucket trusted an account outside the organization.",
    subtitle: "Case study · Cloud Security",
    topics: ["cloud-security"],
    tools: ["AWS Organizations", "CloudTrail", "AWS Config", "GuardDuty"],
    minutes: 5,
    glance: [
      {
        label: "Environment",
        value: "Multi-account AWS organization, financial services, about 8,000 employees",
      },
      {
        label: "My role",
        value: "Enterprise Security Architect, one of two engineers on the cloud program",
      },
      {
        label: "Tools",
        value:
          "AWS Organizations (SCPs and RCPs), CloudTrail, Config, GuardDuty",
      },
      {
        label: "Timeline",
        value: "Three months from inventory to org-wide guardrails",
      },
    ],
    body: [
      {
        type: "h2",
        text: "The problem",
      },
      {
        type: "p",
        text: "The platform team reviewed IAM policies carefully and treated the organization-level deny as a footnote. Member accounts could still leave the organization. Security services could still be turned off in an account that had drifted. And a migration weekend left AdministratorAccess attached to a deployment role on Monday morning.",
      },
      {
        type: "p",
        text: "The organization needed a ceiling that still held when someone attached a broad IAM policy, without pretending that ceiling was the whole perimeter around the data.",
      },
      {
        type: "h2",
        text: "What made it hard",
      },
      {
        type: "ul",
        items: [
          "**SCPs only constrain principals in member accounts.** They don't stop a bucket or KMS key policy from granting access to an account outside the organization.",
          "**SCPs don't apply to the management account.** Identities there, including that account's root user, sit outside the ceiling. Workloads had been run there \"just for bootstrap.\"",
          "**A useful guardrail still has to leave a path for the people who operate security tooling.** A blanket deny on CloudTrail, Config, and GuardDuty changes would lock out the team responsible for running them.",
        ],
      },
      {
        type: "h2",
        text: "What I did",
      },
      {
        type: "p",
        text: "**Wrote the deny as a ceiling, not a room.** The guardrail SCP kept security logging and detection on: no one in a member account could stop or delete CloudTrail, turn off Config, or disable GuardDuty. It also blocked leaving the organization. An explicit deny in an SCP overrides any allow in a member account, including that account's root user.",
      },
      {
        type: "p",
        text: "**Denied the regions the company doesn't use.** A region deny has to exempt global services such as IAM, Organizations, and CloudFront, which run through a single region, or it breaks them in every account.",
      },
      {
        type: "p",
        text: "**Left a named exception for security operators.** The SCP used an ArnNotLike condition so a SecurityAdmin role could still manage the services the deny was protecting. Everyone else hit the ceiling.",
      },
      {
        type: "p",
        text: "**Paired SCPs with resource control policies on data accounts.** After we found a migration bucket that trusted an account outside the organization, I added RCPs so resource policies on supported services couldn't grant access to principals outside the organization.",
      },
      {
        type: "p",
        text: "**Moved bootstrap work out of the management account.** SCPs and RCPs don't apply to the management account, so anything that looked like a workload came out of it.",
      },
      {
        type: "h2",
        text: "What we found",
      },
      {
        type: "ul",
        items: [
          "**The weekend admin grant was still attached.** The SCP had done its job: the role couldn't stop CloudTrail or leave the org. But it could read any bucket in the account whose own policy didn't block it, because SCPs are guardrails, not a list of every sensitive read.",
          "**A bucket policy from the same migration trusted an external account.** The SCP never saw that grant. Identity policies constrain principals you own. Resource policies can invite principals you don't.",
          "**The management account had more than break-glass in it.** Two CI roles and a leftover sandbox had been created there because it was convenient.",
        ],
      },
      {
        type: "h2",
        text: "Results",
      },
      {
        type: "ul",
        items: [
          "**Leave-org, security-tooling, and region denials applied to every member account**, with a documented SecurityAdmin exception.",
          "**RCPs landed on the accounts that hold customer data**, so a bucket policy can no longer quietly grant access outside the organization.",
          "**The AdministratorAccess grant came off the deployment role**, and the IAM review started treating the SCP as the first read, not the last.",
          "**Leadership had a one-page picture of the data perimeter:** SCPs for identities, RCPs for resources, and a clear note that the management account is outside both.",
        ],
      },
      {
        type: "h2",
        text: "What I'd do differently",
      },
      {
        type: "p",
        text: "**Inventory resource policies in the same week as SCPs.** We found the trusted-outside-account bucket after the identity guardrails were already in review. The data-perimeter model treats those as a set.",
      },
      {
        type: "p",
        text: "**Test the SecurityAdmin exception in a non-prod account first.** A deny that locks your own security team out of logging is worse than no deny. The exception is part of the design, not a hotfix.",
      },
      {
        type: "h2",
        text: "Related reading",
      },
      {
        type: "links",
        items: [
          {
            href: "/articles/scp-deny-is-the-perimeter/",
            label: "The Deny Is the Perimeter",
            note: "why the org-level deny is the ceiling, and why it still needs RCPs.",
          },
          {
            href: "/articles/azure-owner-means-root/",
            label: "Owner Means Root",
            note: "the Azure version of standing privilege that outlives the incident.",
          },
        ],
      },
    ],
  },
  {
    slug: "the-owners-who-were-not-people",
    title: "The Owners Who Were Not People",
    excerpt:
      "A tenant-wide inventory of standing Owner and User Access Administrator found four assignments on one subscription. Three of them were not people. PIM could cover the human. It could not cover the pipeline, the vendor identity, or the Global Administrator setting left on from a cleanup.",
    description:
      "How I inventoried standing Azure Owner across an Entra tenant, left MS-PIM alone, and moved humans to PIM while tightening the identities PIM cannot cover.",
    subtitle: "Case study · Cloud Security",
    topics: ["cloud-security"],
    tools: ["Azure CLI", "Microsoft Entra PIM", "Azure Lighthouse"],
    minutes: 5,
    glance: [
      {
        label: "Environment",
        value: "Multi-subscription Azure tenant, manufacturing, about 12,000 employees",
      },
      {
        label: "My role",
        value: "Enterprise Security Architect, lead on the identity review",
      },
      {
        label: "Tools",
        value:
          "Azure CLI, Microsoft Entra Privileged Identity Management, Azure Lighthouse",
      },
      {
        label: "Timeline",
        value: "Ten weeks from inventory to standing-access removal",
      },
    ],
    body: [
      {
        type: "h2",
        text: "The problem",
      },
      {
        type: "p",
        text: "Owner looks like just another Azure RBAC role. At a subscription it is root for everything underneath it, including the right to grant roles to anyone else. User Access Administrator cannot change those resources directly, but it can assign itself Owner, so it is Owner with one extra step.",
      },
      {
        type: "p",
        text: "The tenant had standing assignments of both. Nobody had a complete list. A single-subscription CLI command had been treated as the inventory.",
      },
      {
        type: "h2",
        text: "What made it hard",
      },
      {
        type: "ul",
        items: [
          "**PIM is the right shape for people and the wrong shape for pipelines.** You cannot make a service principal or managed identity eligible for an Azure role. They cannot complete an activation flow.",
          "**Root depends on scope.** Owner on a resource group is root for that group. Owner at the tenant root management group is root for all of Azure. Saying \"Owner means root\" without the scope misses the assignment that actually matters.",
          "**A naive tenant-root query looks clean and is wrong.** Listing assignments at scope \"/\" only works if elevate access is already on. For everyone else it errors or returns nothing, which looks like no root assignments.",
        ],
      },
      {
        type: "h2",
        text: "What I did",
      },
      {
        type: "p",
        text: "**Inventoried every Enabled subscription in the tenant.** I looped az account list filtered to this tenant and Enabled subscriptions, then listed Owner and User Access Administrator with --all and --include-inherited. That surfaces assignments inherited from management groups without querying tenant root.",
      },
      {
        type: "p",
        text: "**Left MS-PIM alone.** Microsoft's MS-PIM service principal holds User Access Administrator so Privileged Identity Management can manage Azure resource roles. Deleting that assignment would have broken PIM. Confirm the display name before you treat a service principal as a finding.",
      },
      {
        type: "p",
        text: "**Moved humans to just-in-time.** Standing Owner for people became PIM-eligible assignments with approval, an audit trail, and phishing-resistant MFA.",
      },
      {
        type: "p",
        text: "**Treated workload identities as a different control.** Pipeline service principals moved off client secrets onto workload identity federation, with a narrower role than Owner. Vendor Lighthouse grants were scoped and time-boxed instead of standing.",
      },
      {
        type: "p",
        text: "**Turned off leftover elevate access.** A Global Administrator had flipped \"Access management for Azure resources\" to Yes during a tenant cleanup and never flipped it back. That setting is Owner for the whole tenant for as long as it stays on.",
      },
      {
        type: "h2",
        text: "What we found",
      },
      {
        type: "ul",
        items: [
          "**Four standing Owners on a single subscription:** a platform engineer from an outage two years ago, a vendor deployment identity, a pipeline service principal with a secret in a variable group, and a Global Administrator with elevate access still on.",
          "**Three of the four were not people.** PIM could cover one of them. The other three needed a different control.",
          "**Lighthouse grants from a prior managed-service engagement** still had Owner at subscription scope after the engagement ended.",
        ],
      },
      {
        type: "h2",
        text: "Results",
      },
      {
        type: "ul",
        items: [
          "**Standing human Owner went to zero** on production subscriptions. Activations now go through PIM.",
          "**Pipeline identities dropped from Owner to a scoped deployment role** and authenticated with federation instead of a stored secret.",
          "**The elevate-access setting was turned off**, and sign-in to the break-glass path is monitored.",
          "**The inventory script became a recurring control**, not a one-off cleanup. New standing Owner in an Enabled subscription shows up the next run.",
        ],
      },
      {
        type: "h2",
        text: "What I'd do differently",
      },
      {
        type: "p",
        text: "**Start with the identities PIM cannot cover.** The human Owner was the easy conversation. The pipeline and the vendor grant were the ones that still had standing root after the first cleanup pass.",
      },
      {
        type: "p",
        text: "**Document MS-PIM before the first removal.** Someone will flag that User Access Administrator service principal. If you have not already written down why it exists, it gets deleted in the same sweep as the real findings.",
      },
      {
        type: "h2",
        text: "Related reading",
      },
      {
        type: "links",
        items: [
          {
            href: "/articles/azure-owner-means-root/",
            label: "Owner Means Root",
            note: "the full write-up on standing Owner, PIM gaps, and the identities PIM cannot cover.",
          },
          {
            href: "/articles/scp-deny-is-the-perimeter/",
            label: "The Deny Is the Perimeter",
            note: "the AWS version of a ceiling that still holds when a standing grant appears.",
          },
        ],
      },
    ],
  },
]

export const publishedCaseStudies = caseStudies.filter((study) => !study.draft)

export function isCasesVisible(): boolean {
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
