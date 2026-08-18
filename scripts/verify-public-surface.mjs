import { readdir, readFile, stat } from "node:fs/promises";
import { join, relative } from "node:path";

const root = process.cwd();
const requiredFiles = [
  "README.md",
  "STATUS.md",
  "CHANGELOG.md",
  "SECURITY.md",
  "CONTRIBUTING.md",
  "LICENSE",
  "docs/architecture.md",
  "docs/runtime-decision.md",
  "docs/release-verification.md",
  "docs/public-boundary.md",
  "docs/discovery/mov.runtime-acceptance.v1.json",
  "schemas/runtime-decision.v1.schema.json",
  "examples/typescript/basic.ts",
  "examples/cli/README.md",
  ".github/workflows/public-surface.yml",
];

const allowedTopLevel = new Set([
  ".github",
  "docs",
  "examples",
  "schemas",
  "scripts",
  "README.md",
  "STATUS.md",
  "CHANGELOG.md",
  "SECURITY.md",
  "CONTRIBUTING.md",
  "LICENSE",
]);

const failures = [];
const check = (ok, message) => { if (!ok) failures.push(message); };

for (const file of requiredFiles) {
  try { await stat(join(root, file)); } catch { failures.push(`missing required file: ${file}`); }
}

for (const entry of await readdir(root)) {
  if (entry === ".git") continue;
  check(allowedTopLevel.has(entry), `unapproved top-level path: ${entry}`);
}

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.name === ".git") continue;
    const path = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...await walk(path));
    else out.push(path);
  }
  return out;
}

const files = await walk(root);
check(files.length <= 30, `public surface unexpectedly large: ${files.length} files`);

const skipScan = new Set(["scripts/verify-public-surface.mjs"]);
const bannedInternalMarkers = [
  "REL-",
  "WTP1",
  "WTP-1",
  "SUPABASE",
  "STRIPE",
  "CODEMAGIC",
  "releaseproof-linear",
  "SamCT86/Machine-Outcome-Verification",
  "RUNTIME_ACCEPTANCE_WEDGE_LOCK",
  "PRODUCT_QUALITY_LAUNCH_LOCK",
  "docs/state/",
  "docs/checkpoints/",
  "scripts/wtp1/",
  "canonical Sources 01",
];
const secretPatterns = [
  /sk_(?:live|test)_[A-Za-z0-9]{16,}/,
  /ghp_[A-Za-z0-9]{20,}/,
  /github_pat_[A-Za-z0-9_]{20,}/,
  /AKIA[0-9A-Z]{16}/,
  /-----BEGIN [A-Z ]*PRIVATE KEY-----/,
  /xox[baprs]-[A-Za-z0-9-]{20,}/,
  /Bearer\s+[A-Za-z0-9._-]{24,}/,
];

for (const abs of files) {
  const rel = relative(root, abs).replaceAll("\\", "/");
  const info = await stat(abs);
  check(info.size <= 150_000, `public file too large: ${rel} (${info.size} bytes)`);
  if (skipScan.has(rel)) continue;
  const text = await readFile(abs, "utf8");
  for (const marker of bannedInternalMarkers) {
    check(!text.includes(marker), `internal marker found in ${rel}: ${marker}`);
  }
  for (const pattern of secretPatterns) {
    check(!pattern.test(text), `possible secret pattern found in ${rel}: ${pattern}`);
  }
}

const discovery = JSON.parse(await readFile(join(root, "docs/discovery/mov.runtime-acceptance.v1.json"), "utf8"));
check(discovery.schema_version === "mov.discovery.v1", "wrong discovery schema version");
check(discovery.product?.public_release === "0.1.0", "wrong public release version");
check(JSON.stringify(discovery.runtime?.buyer_decisions) === JSON.stringify(["ACCEPT", "REJECT", "UNKNOWN"]), "wrong buyer decision set");
check(discovery.repository?.private_implementation_core_included === false, "public discovery must state core is excluded");
check(discovery.repository?.private_git_history_included === false, "public discovery must state private history is excluded");

const schema = JSON.parse(await readFile(join(root, "schemas/runtime-decision.v1.schema.json"), "utf8"));
check(schema.$id === "urn:mov:schema:runtime-decision:v1", "runtime decision schema id drift");
check(schema.properties?.schema_version?.const === "mov.runtime-decision.v1", "runtime decision schema version drift");
const decisionConsts = schema.properties?.decision?.anyOf?.map((x) => x.const);
check(JSON.stringify(decisionConsts) === JSON.stringify(["ACCEPT", "REJECT", "UNKNOWN"]), "runtime decision enum drift");

const readme = await readFile(join(root, "README.md"), "utf8");
check(readme.includes("Your agent paid. Should it trust the result?"), "README missing primary question");
check(readme.includes("9544c311ad4dd0d9087a7c7e58b7c579886b40ba999e10ee2bec0ce7f3789544"), "README missing exact release digest");
check(readme.includes("private implementation core"), "README missing public/private boundary disclosure");

const license = await readFile(join(root, "LICENSE"), "utf8");
check(license.includes("PolyForm Perimeter License 1.0.1"), "license identity missing");
check(!/\bMIT License\b|Apache License|GNU GENERAL PUBLIC LICENSE/i.test(license), "unexpected incompatible license marker");

if (failures.length) {
  console.error("MOV public-surface verification failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`MOV public-surface verification passed (${files.length} files, release 0.1.0, clean-room boundary intact)`);
