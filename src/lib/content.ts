export const topicSlugs = [
  "devops",
  "containers",
  "dspm-dlp",
  "cloud-security",
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
    slug: "devops",
    name: "DevOps",
    label: "DevOps",
    description: "Pipelines, policy as code, and the controls that survive a real release train.",
    longDescription:
      "How security lands in the delivery path: gated pipelines, signed artifacts, policy-as-code that platform teams will keep, and the operational glue between Git and production.",
  },
  {
    slug: "containers",
    name: "Containers",
    label: "Containers",
    description: "Image hardening, runtime isolation, and Kubernetes posture that does not stall delivery.",
    longDescription:
      "Practical container security: base image strategy, SBOMs, admission controls, workload identity, and the tradeoffs between scanner noise and actually reducing risk.",
  },
  {
    slug: "dspm-dlp",
    name: "DSPM / DLP",
    label: "DSPM / DLP",
    description: "Finding shadow data, classifying it, and stopping exfil without breaking the business.",
    longDescription:
      "Data security posture and loss prevention as engineering problems: inventory, classification, path-to-exfil, and controls that hold up in object storage, SaaS, and Kubernetes.",
  },
  {
    slug: "cloud-security",
    name: "Cloud Security",
    label: "Cloud Security",
    description: "Identity, blast radius, and the control planes that actually decide who can take the data.",
    longDescription:
      "Cloud security architecture with an identity-first lens: IAM graphs, trust boundaries, logging that is useful in an incident, and the shared-responsibility details vendors leave out.",
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
    slug: "hardening-container-images",
    title: "Hardening container images without slowing your pipeline",
    excerpt:
      "Distroless bases, digest pins, and a scan policy that fails the build only when the finding is reachable — not when the CVE feed is loud.",
    topic: "containers",
    minutes: 8,
    date: "2026-08-12",
    body: [
      {
        type: "p",
        text: "Most container hardening programs stall for the same reason: they treat the image as a compliance artifact instead of a build product. Scanners light up, tickets multiply, and the pipeline either becomes a museum of waivers or a bottleneck nobody trusts. The work that actually ships is narrower — shrink the attack surface, pin what you run, and fail the build only on findings you can act on this week.",
      },
      {
        type: "h2",
        text: "Start from a base you can explain",
      },
      {
        type: "p",
        text: "If you cannot name the packages in the runtime image, you cannot triage a CVE in under ten minutes. Distroless or a stripped chiseled base is not a fashion choice; it is how you make “no shell, no package manager, no leftover apk cache” the default. Keep a debug variant of the same image for break-glass sessions, built from the same digest, and never let that variant into production namespaces.",
      },
      {
        type: "code",
        caption: "Pin the runtime image and copy only the binary.",
        code: `FROM gcr.io/distroless/static-debian12:nonroot@sha256:…
COPY --from=build /out/api /api
USER 65532:65532
ENTRYPOINT ["/api"]`,
      },
      {
        type: "h2",
        text: "Digest pins beat tags, every time",
      },
      {
        type: "p",
        text: "Floating tags are how “we rebuilt nothing” still becomes a different libc on Friday. Pin every FROM line to a digest, and regenerate those pins in a dedicated renovate-style job so humans are not editing hashes by hand. Admission should reject pods whose image is not a digest. If your cluster still pulls :latest, the rest of the hardening program is theater.",
      },
      {
        type: "h2",
        text: "Fail on reachable risk, not on feed volume",
      },
      {
        type: "p",
        text: "A gate that fails on every HIGH CVE will be bypassed within a quarter. Score findings by whether the vulnerable component is present, loaded, and reachable from the workload’s network path. Ignore Windows-only CVEs in a Linux image. Ignore kernel CVEs in a userspace Go binary. Keep a short allowlist, dated, with an owner — not a spreadsheet of eternal exceptions.",
      },
      {
        type: "ul",
        items: [
          "Rebuild the image on a cadence (daily for internet-facing services) even when your app did not change.",
          "Publish an SBOM with the image and sign both with the same identity the cluster already trusts.",
          "Block root, privileged, and hostPath in admission; fix the two workloads that still need them instead of weakening the policy.",
          "Measure pipeline time. If hardening added more than a couple of minutes, you are scanning the wrong layer or the wrong cache.",
        ],
      },
      {
        type: "p",
        text: "The pipeline should get faster as the image gets smaller. If it did not, you added scanners without removing work. That is the opposite of hardening.",
      },
    ],
  },
  {
    slug: "dspm-before-dlp",
    title: "What DSPM actually measures in a Kubernetes estate",
    excerpt:
      "Classification without inventory is a dashboard. Map stores, identities, and egress paths first — then the DLP rule has somewhere to live.",
    topic: "dspm-dlp",
    minutes: 11,
    date: "2026-07-28",
    fieldNotes: true,
    body: [
      {
        type: "p",
        text: "DLP programs fail in Kubernetes because they start at the policy. A rule that says “do not put PAN in object storage” does nothing if you cannot list the buckets the cluster can write to, the service accounts that can assume a role to those buckets, and the jobs that already did it last Tuesday. DSPM, done honestly, is that inventory plus a judgment about exposure — not a new scanner logo.",
      },
      {
        type: "h2",
        text: "Inventory the stores, not the slides",
      },
      {
        type: "p",
        text: "In a typical estate the sensitive data is not in the Postgres you know about. It is in a debug dump on a PVC, a Fluent Bit buffer, a CI cache, a “temporary” S3 prefix from a migration, and a warehouse replica that never got the production ACL. Walk the workload spec: volume mounts, envFrom, projected tokens, IRSA/Workload Identity annotations, and egress NetworkPolicies (or the absence of them).",
      },
      {
        type: "code",
        caption: "A short posture query beats a 40-page DSPM RFP.",
        code: `$ kubectl get deploy,cronjob -A -o json \\
  | jq -r '.items[]
    | [.metadata.namespace, .metadata.name,
       (.spec.template.spec.serviceAccountName // "default")]
    | @tsv'`,
      },
      {
        type: "h2",
        text: "Classify along the path, not the table",
      },
      {
        type: "p",
        text: "A column labeled “ssn” is easy. A JSON blob in a log line that happens to include an ID card scan is the actual loss. Sample the egress: sidecar logs, object PUT prefixes, and the SaaS connectors your data team stood up without a security ticket. DSPM tools help when they can see those paths. They do not help when they only see the RDS instance you already have on a diagram.",
      },
      {
        type: "h2",
        text: "Then write a DLP rule that can fire",
      },
      {
        type: "ul",
        items: [
          "Bind the control to an identity (the job’s service account) and a destination (bucket, topic, or SaaS app), not to a hopeful regex on the laptop.",
          "Alert on first-seen prefixes and first-seen principals. Volume thresholds miss the quiet copy.",
          "Put the break-glass path in the same change as the block. If production restore needs a bulk export, script it with a ticket and a time-boxed role.",
        ],
      },
      {
        type: "p",
        text: "If your DSPM score went up and you still cannot answer “which service account can take the customer table out of the cluster,” you measured coverage of agents, not exposure of data.",
      },
    ],
  },
  {
    slug: "policy-as-code-that-survives",
    title: "Policy as code that security and platform teams both keep",
    excerpt:
      "OPA and Kyverno only work when the exception path is a pull request with an expiry. Otherwise you have a wiki with YAML.",
    topic: "devops",
    minutes: 9,
    date: "2026-06-19",
    body: [
      {
        type: "p",
        text: "Policy-as-code dies in two ways. Security writes a perfect gate that blocks the platform team’s ingress controller, then quietly becomes a rubber stamp. Or platform owns the policies, security reviews them in a slide deck, and a privileged DaemonSet ships on a Friday. The version that lasts is boring: a small set of rules in the same repo as the cluster contract, with exceptions that expire and tests that run on every change.",
      },
      {
        type: "h2",
        text: "Policy belongs next to the cluster contract",
      },
      {
        type: "p",
        text: "If the platform already has a “how we run Kubernetes” repository — bootstrap, addons, golden Helm values — put admission policies there. Do not stand up a second GitOps root that only security can merge. Dual control is a CODEOWNERS file and a required review, not a second source of truth that drifts.",
      },
      {
        type: "code",
        caption: "Exceptions should look like code, because they are.",
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
        type: "h2",
        text: "Test the deny, test the allow",
      },
      {
        type: "p",
        text: "A policy without fixtures is a rumor. Keep a folder of good and bad pod specs and run them in CI against the same engine the cluster uses. When someone asks to weaken a rule, the PR should add a fixture that shows the new allow — and a date. Reviewers can argue about the fixture. They should not argue about vibes.",
      },
      {
        type: "ul",
        items: [
          "Start with five rules: no privileged, no hostPath, no :latest, drop ALL capabilities, require a non-root user.",
          "Measure false positives for two sprints before you add a sixth.",
          "Make the exception YAML the only bypass. Chat approvals do not exist at 2 a.m.",
        ],
      },
      {
        type: "p",
        text: "If a policy cannot be explained in a paragraph to a new platform engineer, it will be disabled during the next incident. Write less policy. Keep it.",
      },
    ],
  },
  {
    slug: "iam-blast-radius",
    title: "Cloud IAM blast radius: map trust before the incident",
    excerpt:
      "The resource policy you did not draw is the one the attacker walks. Graph who can assume whom, then cut the edges that surprise you.",
    topic: "cloud-security",
    minutes: 10,
    date: "2026-05-04",
    body: [
      {
        type: "p",
        text: "Cloud incidents are rarely “they found a CVE on the API box.” They are “a CI role could assume a break-glass role that could decrypt the backup vault.” That path was in IAM the whole time. Blast radius work is drawing the graph while you are calm, then deleting the edges that exist only because someone cloned a role in 2019.",
      },
      {
        type: "h2",
        text: "Treat AssumeRole as a network",
      },
      {
        type: "p",
        text: "Every trust policy is a route. Human SSO roles, GitHub OIDC, EC2 instance profiles, and Lambda execution roles are nodes. If two nodes can reach each other in three hops and one of them can kms:Decrypt on production, you do not have a “least privilege initiative.” You have a latent incident. Export the graph. Stare at the high-degree nodes.",
      },
      {
        type: "h2",
        text: "Cut the surprising edges",
      },
      {
        type: "ul",
        items: [
          "No production decrypt from non-production accounts. Replication roles get a dedicated key and a dedicated policy, not the app key.",
          "CI should deploy, not operate. If the pipeline can kubectl exec, it can take the data. Split the roles.",
          "Resource policies on buckets and KMS keys are part of the graph. An identity-based deny does not save you from a bucket that trusts the world of account 1234.",
          "Log sts:AssumeRole and read it. First-seen assumers are more interesting than volume.",
        ],
      },
      {
        type: "p",
        text: "You will not get to zero unused permissions this year. You can get to zero unexplained paths from build to customer data. That is the map worth printing.",
      },
    ],
  },
  {
    slug: "secret-scanning-that-people-trust",
    title: "Secret scanning that does not train people to ignore alerts",
    excerpt:
      "Pre-commit, the git host, and runtime detection are three different jobs. Mixing them is how every finding becomes a medium.",
    topic: "devops",
    minutes: 7,
    date: "2026-04-15",
    body: [
      {
        type: "p",
        text: "Teams burn out on secret scanning when a AWS key in a test fixture, a placeholder in a README, and a live token in last night’s commit all page the same channel. The fix is not a better regex. It is splitting prevent, detect, and respond so the loud path is reserved for credentials that can still be used.",
      },
      {
        type: "h2",
        text: "Prevent in the developer loop",
      },
      {
        type: "p",
        text: "Pre-commit and a push protection rule at the git host catch the live key before it is history. Use a small, high-precision ruleset there: well-known tokens, private keys, the cloud access-key pattern. Do not enable every generic entropy rule on the laptop. You will train people to skip the hook.",
      },
      {
        type: "h2",
        text: "Detect in history and in runtime",
      },
      {
        type: "p",
        text: "Historical scans belong in a weekly job with a ticket queue, not in Slack. Runtime detection — the key was used from an ASN you have never seen — belongs to the incident channel. Those are different SLAs. If your scanner cannot tell them apart, you will respond to all of them at the historical pace.",
      },
      {
        type: "ul",
        items: [
          "Rotate on confirm, not on debate. A key that matched a provider pattern and was committed this week is revoked first.",
          "Keep a documented allowlist for test fixtures that are not credentials. Put the allowlist in git.",
          "Measure dwell time from commit to revoke. That is the number that matters, not findings closed.",
        ],
      },
    ],
  },
  {
    slug: "dlp-data-in-motion",
    title: "DLP for data in motion: the cases CASB never covered",
    excerpt:
      "Object storage PUT, kubectl cp, and a mis-aimed Fluent Bit are how regulated data leaves. Browser CASB never saw them.",
    topic: "dspm-dlp",
    minutes: 12,
    date: "2026-03-22",
    fieldNotes: true,
    body: [
      {
        type: "p",
        text: "Corporate DLP was built for the laptop and the SaaS browser session. Production data no longer lives there. It moves as an S3 PUT from a job, a replica into another cloud, a support engineer’s kubectl cp, and a log pipeline that was pointed at a personal bucket “just for debugging.” If your DLP program cannot see those paths, you are protecting the copy of the data that is already the least interesting to steal.",
      },
      {
        type: "h2",
        text: "Instrument the production egress",
      },
      {
        type: "p",
        text: "CloudTrail data events, VPC flow logs with S3 and DNS, and Kubernetes audit logs for exec/portforward/cp are the minimum. You do not need to inspect payload on day one. You need to know that a principal in namespace payments wrote 40 GB to a bucket that is not in the approved prefix list. Payload inspection comes after that graph is boring.",
      },
      {
        type: "code",
        caption: "A first-pass deny for non-approved bucket prefixes.",
        code: `{
  "Effect": "Deny",
  "Action": ["s3:PutObject", "s3:ReplicateObject"],
  "Resource": "*",
  "Condition": {
    "StringNotLike": {
      "s3:x-amz-copy-source": "",
      "aws:RequestedRegion": "us-west-2"
    },
    "ForAllValues:StringNotEquals": {
      "aws:ResourceAccount": ["\${ProductionAccount}"]
    }
  }
}`,
      },
      {
        type: "h2",
        text: "Give operations a legal path",
      },
      {
        type: "p",
        text: "If support needs a dump, ship a signed, time-boxed job that writes to a reviewed bucket with object lock. If you only block, someone will use their laptop. Design the allowed path in the same sprint as the deny. That is DLP that people will not route around.",
      },
      {
        type: "p",
        text: "CASB still has a job for SaaS. It is not the control plane for the cluster. Stop asking it to be.",
      },
    ],
  },
]

export function getTopic(slug: string): Topic | undefined {
  return topics.find((topic) => topic.slug === slug)
}

export function getArticle(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug)
}

export function articlesByTopic(slug: TopicSlug): Article[] {
  return articles.filter((article) => article.topic === slug)
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
