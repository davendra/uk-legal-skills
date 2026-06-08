import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

const args = new Map();
for (let index = 2; index < process.argv.length; index += 1) {
  const arg = process.argv[index];
  if (!arg.startsWith("--")) continue;
  const [key, inlineValue] = arg.slice(2).split("=", 2);
  const nextValue = process.argv[index + 1];
  if (inlineValue !== undefined) {
    args.set(key, inlineValue);
  } else if (nextValue && !nextValue.startsWith("--")) {
    args.set(key, nextValue);
    index += 1;
  } else {
    args.set(key, "true");
  }
}

const corpusPath = args.get("corpus") ?? "evaluation/legal-eval-corpus.json";
const outputsDir = args.get("outputs") ?? "evaluation/outputs";
const reportPath = args.get("report") ?? "evaluation/reports/latest.json";
const minCaseScore = Number(args.get("min-case-score") ?? "0.7");
const minSuiteScore = Number(args.get("min-suite-score") ?? "0.75");
const allowMissing = args.get("allow-missing") === "true";

function resolveFromRoot(filePath) {
  return path.isAbsolute(filePath) ? filePath : path.join(root, filePath);
}

const riskWeights = {
  high: ["high", "red", "critical", "severe", "urgent"],
  medium: ["medium", "amber", "moderate"],
  low: ["low", "green", "minor", "limited"],
};

function normalize(text) {
  return String(text ?? "")
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function tokens(text) {
  return normalize(text)
    .split(/\s+/)
    .filter((token) => token.length > 2 && !["and", "the", "for", "with", "risk"].includes(token));
}

function expectedLabels(finding) {
  if (typeof finding === "string") return [finding];
  if (finding && typeof finding === "object") {
    return [finding.label, ...(finding.aliases ?? [])].filter(Boolean);
  }
  return [];
}

function hasFinding(output, finding) {
  const normalizedOutput = normalize(output);
  return expectedLabels(finding).some((label) => {
    const normalizedLabel = normalize(label);
    if (normalizedOutput.includes(normalizedLabel)) return true;

    const labelTokens = tokens(label);
    if (labelTokens.length === 0) return false;
    const matchedTokens = labelTokens.filter((token) => normalizedOutput.includes(token));
    return matchedTokens.length / labelTokens.length >= 0.67;
  });
}

function hasRisk(output, expectedRisk) {
  const normalizedOutput = normalize(output);
  return (riskWeights[expectedRisk] ?? [expectedRisk]).some((label) => normalizedOutput.includes(label));
}

function readOutput(caseId) {
  const candidatePaths = [
    path.join(resolveFromRoot(outputsDir), `${caseId}.md`),
    path.join(resolveFromRoot(outputsDir), `${caseId}.txt`),
    path.join(resolveFromRoot(outputsDir), `${caseId}.json`),
  ];

  for (const candidatePath of candidatePaths) {
    if (!fs.existsSync(candidatePath)) continue;
    const raw = fs.readFileSync(candidatePath, "utf8");
    if (candidatePath.endsWith(".json")) {
      const parsed = JSON.parse(raw);
      return typeof parsed === "string" ? parsed : JSON.stringify(parsed, null, 2);
    }
    return raw;
  }

  return null;
}

function scoreCase(item, output) {
  if (!output) {
    return {
      id: item.id,
      skillId: item.skillId,
      sample: item.sample,
      score: 0,
      passed: false,
      missingOutput: true,
      expectedRisk: item.expectedRisk,
      riskMatched: false,
      findingsMatched: [],
      findingsMissing: item.expectedFindings.map((finding) => expectedLabels(finding)[0] ?? String(finding)),
    };
  }

  const findingsMatched = [];
  const findingsMissing = [];

  for (const finding of item.expectedFindings) {
    const label = expectedLabels(finding)[0] ?? String(finding);
    if (hasFinding(output, finding)) findingsMatched.push(label);
    else findingsMissing.push(label);
  }

  const findingScore = findingsMatched.length / item.expectedFindings.length;
  const riskMatched = hasRisk(output, item.expectedRisk);
  const score = Number(((findingScore * 0.8) + (riskMatched ? 0.2 : 0)).toFixed(4));

  return {
    id: item.id,
    skillId: item.skillId,
    sample: item.sample,
    score,
    passed: score >= minCaseScore,
    missingOutput: false,
    expectedRisk: item.expectedRisk,
    riskMatched,
    findingsMatched,
    findingsMissing,
  };
}

const corpus = JSON.parse(fs.readFileSync(resolveFromRoot(corpusPath), "utf8"));
const results = corpus.map((item) => scoreCase(item, readOutput(item.id)));
const presentResults = results.filter((result) => !result.missingOutput);
const scoredResults = allowMissing ? presentResults : results;
const denominator = allowMissing ? presentResults.length : results.length;
const suiteScore = denominator === 0
  ? 0
  : Number((scoredResults.reduce((sum, result) => sum + result.score, 0) / denominator).toFixed(4));
const completedResultsPass = presentResults.every((result) => result.passed);
const allResultsPass = results.every((result) => result.passed);

const report = {
  generatedAt: new Date().toISOString(),
  corpus: corpusPath,
  outputsDir,
  thresholds: {
    minCaseScore,
    minSuiteScore,
    allowMissing,
  },
  suiteScore,
  completedCaseCount: presentResults.length,
  totalCaseCount: results.length,
  passed: allowMissing
    ? completedResultsPass && (presentResults.length === 0 || suiteScore >= minSuiteScore)
    : allResultsPass && suiteScore >= minSuiteScore,
  cases: results,
};

fs.mkdirSync(path.dirname(resolveFromRoot(reportPath)), { recursive: true });
fs.writeFileSync(resolveFromRoot(reportPath), `${JSON.stringify(report, null, 2)}\n`);

for (const result of results) {
  const status = result.missingOutput && allowMissing ? "SKIP" : result.passed ? "PASS" : "FAIL";
  const missing = result.missingOutput ? " missing output" : "";
  console.log(`${status} ${result.id}: ${result.score}${missing}`);
  if (result.missingOutput && allowMissing) continue;
  if (result.findingsMissing.length > 0) {
    console.log(`  missing findings: ${result.findingsMissing.join("; ")}`);
  }
  if (!result.riskMatched) {
    console.log(`  missing risk band: ${result.expectedRisk}`);
  }
}

console.log(`Suite score: ${suiteScore}`);
console.log(`Report written: ${reportPath}`);

if (!report.passed) {
  process.exit(1);
}
