import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { CaseStudyCard } from "@/components/case-study-card"
import { isCasesVisible, visibleCaseStudies } from "@/lib/work"

export function generateMetadata(): Metadata {
  if (!isCasesVisible()) {
    return {}
  }
  return {
    title: "Cases · ZodOps",
    description:
      "Anonymized case studies from enterprise security programs: AI security, data security, and cloud security.",
    openGraph: {
      title: "Cases · ZodOps",
      description:
        "Anonymized case studies from enterprise security programs: AI security, data security, and cloud security.",
      type: "website",
    },
  }
}

export default function CasesPage() {
  if (!isCasesVisible()) {
    notFound()
  }

  const studies = visibleCaseStudies()

  return (
    <section className="container-page py-14 sm:py-16">
      <p className="text-[11px] font-semibold tracking-[0.18em] text-brand uppercase">
        Cases
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
        Cases
      </h1>
      <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-muted-foreground">
        Case studies from security programs: the problem, what I did, and what
        changed. Company details are anonymized composites; the controls and
        failure modes are from real work.
      </p>

      <div className="mt-14">
        <h2 className="text-xl font-semibold tracking-tight">Case studies</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {studies.map((study) => (
            <CaseStudyCard key={study.slug} study={study} />
          ))}
        </div>
      </div>
    </section>
  )
}
