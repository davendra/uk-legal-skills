import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const registry = JSON.parse(fs.readFileSync(path.join(root, "registry/skill-registry.json"), "utf8"));
const skillCount = registry.length;
const failures = [];

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(path.join(root, dir), { withFileTypes: true })) {
    const rel = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(rel));
    else if (entry.name.endsWith(".md")) out.push(rel);
  }
  return out;
}

function fail(message) {
  failures.push(message);
}

const docs = ["README.md", ...walk("doc-site")];

for (const file of docs) {
  const text = fs.readFileSync(path.join(root, file), "utf8");
  if (/\b34 skills\b|\b34 Skills\b|\bAll 34 Commands\b|\b34 skill files\b|\b33 wired skills\b|\b33 skills wired\b/.test(text)) {
    fail(`${file} contains stale 34/33-skill wording.`);
  }
  if (/received Royal Assent on 21 May 2025/.test(text)) {
    fail(`${file} contains incorrect Renters' Rights Act 2025 Royal Assent date.`);
  }
  if (/Real Claude analysis|Claude API integration|Claude Code CLI skills|Claude Code CLI only|uses Claude to perform|instructs Claude|only Claude Code|All 33 individual skill files|User's Anthropic API key|your Anthropic API key to run real Claude-powered/.test(text)) {
    fail(`${file} contains Claude-first or stale provider wording.`);
  }
}

const readme = fs.readFileSync(path.join(root, "README.md"), "utf8");
if (!readme.includes(`${skillCount}`)) {
  fail(`README.md does not mention canonical skill count ${skillCount}.`);
}

if (failures.length > 0) {
  console.error("Docs parity audit failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Docs parity audit passed: ${docs.length} markdown files checked against ${skillCount}-skill registry.`);
