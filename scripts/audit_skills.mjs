import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const failures = [];

function read(file) {
  return fs.readFileSync(path.join(root, file), "utf8");
}

function walk(dir, predicate) {
  const out = [];
  for (const entry of fs.readdirSync(path.join(root, dir), { withFileTypes: true })) {
    const rel = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(rel, predicate));
    else if (!predicate || predicate(rel)) out.push(rel);
  }
  return out.sort();
}

function fail(message) {
  failures.push(message);
}

const skillFiles = walk("skills", (file) => file.endsWith("/SKILL.md"));
const agentFiles = walk("agents", (file) => file.endsWith(".md"));
const skillIds = skillFiles.map((file) => path.basename(path.dirname(file))).sort();
const registry = JSON.parse(read("registry/skill-registry.json"));
const registryIds = registry.map((skill) => skill.id).sort();

const router = read("legal/SKILL.md");
const routerIds = [...router.matchAll(/\| `\/legal [^`]+` \| (legal-[^ |]+) \|/g)]
  .map((match) => match[1])
  .sort();

if (skillIds.length !== 38) {
  fail(`Expected 38 skills under skills/, found ${skillIds.length}.`);
}

if (registryIds.length !== 38) {
  fail(`Expected 38 skills in canonical registry, found ${registryIds.length}.`);
}

for (const id of skillIds) {
  if (!routerIds.includes(id)) fail(`Router missing skill ${id}.`);
  if (!registryIds.includes(id)) fail(`Canonical registry missing skill ${id}.`);
}

for (const id of routerIds) {
  if (!skillIds.includes(id)) fail(`Router references unknown skill ${id}.`);
}

for (const id of registryIds) {
  if (!skillIds.includes(id)) fail(`Canonical registry references unknown skill ${id}.`);
}

for (const skill of registry) {
  for (const field of ["id", "name", "command", "category", "description", "route", "inputContract"]) {
    if (!skill[field]) fail(`Registry entry ${skill.id ?? "[missing id]"} is missing ${field}.`);
  }
  if (skill.liveReview && !skill.reviewType) {
    fail(`Live review registry entry ${skill.id} is missing reviewType.`);
  }
  if (skill.highRiskCommencementCheck) {
    const skillFile = `skills/${skill.id}/SKILL.md`;
    if (!read(skillFile).includes("## Live Commencement Checks")) {
      fail(`${skillFile} is marked highRiskCommencementCheck but lacks a Live Commencement Checks section.`);
    }
  }
}

if (/34 Commands|34 Claude Code skills|suite of 34|35 Commands|35 Claude Code skills|suite of 35/.test(router)) {
  fail("legal/SKILL.md still contains stale 34/35-skill command wording.");
}

for (const file of [...skillFiles, ...agentFiles]) {
  const text = read(file);
  if (!text.includes("## Universal Operating Standard")) {
    fail(`${file} is missing the Universal Operating Standard.`);
  }
  if (text.includes("received Royal Assent on 21 May 2025")) {
    fail(`${file} contains the incorrect Renters' Rights Act Royal Assent date.`);
  }
  if (/launched during `\/legal review` for employment/.test(text)) {
    fail(`${file} has stale employment subagent routing text.`);
  }
}

const componentScoreAgents = [
  "agents/legal-clauses.md",
  "agents/legal-risks.md",
  "agents/legal-compliance.md",
  "agents/legal-terms.md",
  "agents/legal-employment-rights.md",
  "agents/legal-employment-discrimination.md",
  "agents/legal-employment-obligations.md",
  "agents/legal-corporate-risk.md",
];

for (const file of componentScoreAgents) {
  if (!read(file).includes("Component Score:")) {
    fail(`${file} is missing a Component Score field for orchestrator aggregation.`);
  }
}

if (failures.length > 0) {
  console.error("Skill audit failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`Skill audit passed: ${skillIds.length} skills, ${agentFiles.length} agents, registry/router parity OK.`);
