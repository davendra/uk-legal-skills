import fs from "node:fs"
import path from "node:path"

const root = process.cwd()
const registryPath = path.join(root, "registry/skill-registry.json")
const outputPath = path.join(root, "doc-site/reference/all-commands.md")
const checkOnly = process.argv.includes("--check")

const registry = JSON.parse(fs.readFileSync(registryPath, "utf8"))

function titleForCategory(category) {
  return category
}

function inputLabel(skill) {
  if (skill.inputContract === "generation") return "generation"
  if (skill.inputContract === "comparison") return "2 documents"
  if (skill.inputContract === "report") return "report"
  if (skill.inputContract === "utility") return "utility"
  return "document/text/URL"
}

function routeLabel(skill) {
  return `${skill.route}${skill.liveReview ? " live" : ""}`
}

function plural(count, singular, pluralLabel = `${singular}s`) {
  return count === 1 ? singular : pluralLabel
}

function generatedCommandReference() {
  const categories = [...new Set(registry.map((skill) => skill.category))]
  const lines = [
    "# Command Reference",
    "",
    "<!-- GENERATED FROM registry/skill-registry.json. Run `npm run docs:generate` to update. -->",
    "",
    `Complete reference for all ${registry.length} platform-neutral \`/legal\` commands in UK Legal Skills.`,
    "",
    "::: info",
    "All command metadata on this page is generated from the canonical skill registry. Input can be a file path, pasted text, URL, comparison pair, or generation brief depending on the command.",
    ":::",
    "",
  ]

  for (const category of categories) {
    const skills = registry.filter((skill) => skill.category === category)
    lines.push(`## ${titleForCategory(category)} (${skills.length} ${plural(skills.length, "command")})`, "")
    lines.push("| Command | Skill ID | Description | Input | Route | Live Review | Commencement Check |")
    lines.push("|---------|----------|-------------|-------|-------|:-----------:|:------------------:|")

    for (const skill of skills) {
      lines.push([
        `| \`${skill.command}\``,
        `\`${skill.id}\``,
        skill.description.replace(/\|/g, "\\|"),
        inputLabel(skill),
        `\`${routeLabel(skill)}\``,
        skill.liveReview ? "yes" : "no",
        `${skill.highRiskCommencementCheck ? "yes" : "no"} |`,
      ].join(" | "))
    }

    lines.push("")
  }

  lines.push("## Quick Reference", "")

  for (const category of categories) {
    const skills = registry.filter((skill) => skill.category === category)
    lines.push(`### ${category}`)
    for (const skill of skills) lines.push(`- \`${skill.command}\` — ${skill.name}`)
    lines.push("")
  }

  lines.push("## Command Count by Category", "")
  lines.push("| Category | Commands |")
  lines.push("|----------|:--------:|")
  for (const category of categories) {
    lines.push(`| ${category} | ${registry.filter((skill) => skill.category === category).length} |`)
  }
  lines.push(`| **Total** | **${registry.length}** |`, "")

  return `${lines.join("\n")}\n`
}

const generated = generatedCommandReference()

if (checkOnly) {
  const current = fs.existsSync(outputPath) ? fs.readFileSync(outputPath, "utf8") : ""
  if (current !== generated) {
    console.error("Generated command reference is stale. Run `npm run docs:generate`.")
    process.exit(1)
  }
  console.log(`Generated command reference is current: ${path.relative(root, outputPath)}`)
} else {
  fs.writeFileSync(outputPath, generated)
  console.log(`Generated ${path.relative(root, outputPath)} from ${path.relative(root, registryPath)}.`)
}
