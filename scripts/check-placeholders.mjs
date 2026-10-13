import fs from "node:fs"
import path from "node:path"

const PLACEHOLDER = /\[[A-Za-z0-9 %,./'"-]+\]/g
const MARKDOWN_LINK = /\[[^\]]+\]\([^)]+\)/g
const STRING_LITERAL = /"((?:\\.|[^"\\])*)"/g
const WORK_FILE = path.join(process.cwd(), "src/lib/work.ts")

function stripMarkdownLinks(text) {
  return text.replaceAll(MARKDOWN_LINK, "")
}

function stringLiterals(text) {
  return [...text.matchAll(STRING_LITERAL)].map((match) =>
    match[1].replaceAll('\\"', '"')
  )
}

function publishedStudies(source) {
  const start = source.indexOf("export const caseStudies")
  const end = source.indexOf("export const publishedCaseStudies")
  const block = source.slice(start, end === -1 ? undefined : end)
  const chunks = block.split(/slug:\s*"/)
  const published = []

  for (const chunk of chunks.slice(1)) {
    const slug = chunk.slice(0, chunk.indexOf('"'))
    const preamble = chunk.slice(0, chunk.search(/\bbody\s*:/) || 2000)
    if (/\bdraft:\s*true\b/.test(preamble)) {
      continue
    }
    published.push({ slug, text: chunk })
  }

  return published
}

function findPlaceholders(text) {
  return stringLiterals(stripMarkdownLinks(text)).flatMap(
    (value) => value.match(PLACEHOLDER) ?? []
  )
}

const source = fs.readFileSync(WORK_FILE, "utf8")
const studies = publishedStudies(source)
const failures = []

for (const study of studies) {
  const matches = findPlaceholders(study.text)
  if (matches.length > 0) {
    failures.push(
      `Published case study "${study.slug}" still has placeholders: ${matches.join(", ")}`
    )
  }
}

if (failures.length > 0) {
  console.error("Placeholder check failed.\n")
  for (const failure of failures) {
    console.error(`  ${failure}`)
  }
  console.error(
    "\nFill in the bracketed fields or keep draft: true until they're ready."
  )
  process.exit(1)
}

console.log(
  studies.length === 0
    ? "Placeholder check passed (no published case studies)."
    : `Placeholder check passed (${studies.length} published case ${studies.length === 1 ? "study" : "studies"}).`
)
