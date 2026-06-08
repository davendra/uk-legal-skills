import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const registry = JSON.parse(fs.readFileSync(path.join(root, "registry/skill-registry.json"), "utf8"));
const registryIds = new Set(registry.map((skill) => skill.id));
const corpusPath = "evaluation/legal-eval-corpus.json";
const corpus = JSON.parse(fs.readFileSync(path.join(root, corpusPath), "utf8"));
const failures = [];

function fail(message) {
  failures.push(message);
}

function findingLabel(finding) {
  if (typeof finding === "string") return finding;
  if (finding && typeof finding === "object" && typeof finding.label === "string") return finding.label;
  return "";
}

if (!Array.isArray(corpus) || corpus.length < 6) {
  fail(`${corpusPath} must contain at least 6 evaluation cases.`);
}

for (const item of corpus) {
  if (!item.id) fail("Evaluation item missing id.");
  if (!registryIds.has(item.skillId)) fail(`${item.id} references unknown skillId ${item.skillId}.`);
  if (!fs.existsSync(path.join(root, item.sample))) fail(`${item.id} sample does not exist: ${item.sample}.`);
  if (!["good", "mixed", "bad"].includes(item.qualityBand)) {
    fail(`${item.id} has invalid qualityBand ${item.qualityBand}.`);
  }
  if (!["low", "medium", "high"].includes(item.expectedRisk)) {
    fail(`${item.id} has invalid expectedRisk ${item.expectedRisk}.`);
  }
  if (!Array.isArray(item.expectedFindings) || item.expectedFindings.length < 3) {
    fail(`${item.id} must list at least 3 expected findings.`);
  } else {
    for (const finding of item.expectedFindings) {
      if (!findingLabel(finding)) fail(`${item.id} has an expected finding without a label.`);
      if (finding.aliases && (!Array.isArray(finding.aliases) || finding.aliases.some((alias) => typeof alias !== "string"))) {
        fail(`${item.id} has invalid expected finding aliases.`);
      }
    }
  }
}

if (failures.length > 0) {
  console.error("Evaluation corpus audit failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Evaluation corpus audit passed: ${corpus.length} cases across ${new Set(corpus.map((item) => item.skillId)).size} skills.`);
