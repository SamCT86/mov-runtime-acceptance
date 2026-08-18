# Machine Outcome Verification (MOV)

**Runtime Acceptance for Paid Agent Services**

> **Your agent paid. Should it trust the result?**

MOV gives software a deterministic acceptance decision for the exact result of a paid API, MCP tool, or machine service **before downstream software acts on it**.

```text
PAID → DELIVERED → ACCEPT?
```

Payment and delivery can both succeed while the purchased result is still wrong for the buyer. MOV keeps those facts separate and returns:

```text
ACCEPT | REJECT | UNKNOWN
```

- Website: https://machineoutcome.com/
- Public release: **0.1.0**
- Operator: **Sarmad Tawfeek · Sweden**
- Contact: `sarmad@machineoutcome.com`

> **Repository scope:** this is MOV's public developer, contract, release-verification, and proof surface. The private implementation core and its git history are intentionally not mirrored here.

## When MOV is useful

MOV is designed for software that pays another machine service and needs more than “the request succeeded” before using the result.

Typical cases include:

- an agent buys structured data and must confirm it refers to the right entity;
- a paid service returns a valid schema but stale, mismatched, or unacceptable content;
- downstream automation should stop when required evidence is missing or contradictory;
- a team needs a reproducible record of **why** a paid result was accepted, rejected, or left unknown.

If a normal local assertion against the response is sufficient for your risk and evidence needs, use the assertion. MOV is for cases where acceptance must be bound to the **buyer contract + exact paid attempt + exact delivery + required evidence**.

## The failure MOV is built for

A paid machine-service call can look completely healthy and still be wrong for the buyer:

```text
PAYMENT       SETTLED   ✓
DELIVERY      DELIVERED ✓
HTTP          200       ✓
SCHEMA        PASS      ✓
BUYER CONTRACT          REJECT ✕
REASON                  MOV.ENTITY.MISMATCH
```

Payment answers whether the economic event happened. Delivery and transport answer whether a response arrived. Schema validation answers whether the response has the expected shape.

MOV answers a different question:

> **Can this exact paid result be used under the buyer's precommitted acceptance contract?**

## Runtime decision

MOV exposes one buyer-facing three-state decision:

```text
ACCEPT   → continue
REJECT   → stop or switch provider
UNKNOWN  → reconcile evidence, retry later, or escalate
```

`UNKNOWN` is first-class. Missing, contradictory, unavailable, corrupt, or non-final required evidence does not become acceptance.

See [Runtime decision contract](docs/runtime-decision.md) and the public [`mov.runtime-decision.v1` JSON Schema](schemas/runtime-decision.v1.schema.json).

## Try MOV 0.1.0 locally

The current release is local-first and registry-unpublished. Install the exact public artifact directly:

```bash
npm install https://machineoutcome.com/downloads/mov-runtime-acceptance-0.1.0.tgz
```

Then run the recorded ACCEPT fixture.

### macOS / Linux

```bash
curl -fsSLo accept.json https://machineoutcome.com/examples/accept.json
npx mov accept --fixture ./accept.json
```

### Windows PowerShell

```powershell
Invoke-WebRequest -Uri "https://machineoutcome.com/examples/accept.json" -OutFile ".\\accept.json"
npx mov accept --fixture .\\accept.json
```

The recorded local acceptance path performs no purchase, wallet/signing action, or runtime-secret read.

## TypeScript

```ts
import { mov } from "@mov/cli";

export async function acceptPaidResult(
  input: Parameters<typeof mov.accept>[0],
) {
  const decision = await mov.accept(input);

  if (decision.decision === "ACCEPT") {
    return { action: "continue", decision };
  }

  if (decision.decision === "REJECT") {
    return { action: "stop-or-switch", decision };
  }

  return { action: "reconcile", decision };
}
```

See [`examples/typescript/basic.ts`](examples/typescript/basic.ts).

## Acceptance model

At a high level:

```text
PRECOMMITTED BUYER ACCEPTANCE CONTRACT
+ EXACT PAYMENT / TRANSACTION EVIDENCE
+ EXACT REQUEST
+ EXACT DELIVERY ARTIFACT
+ INDEPENDENT SOURCE EVIDENCE WHEN REQUIRED
+ VERSION-PINNED DETERMINISTIC VERIFIERS
= ACCEPT | REJECT | UNKNOWN
```

The buyer owns acceptance semantics. Payment success, HTTP 2xx, receipt validity, delivery presence, schema success, or a merchant assertion never establish acceptance by themselves.

See [High-level architecture](docs/architecture.md).

## What MOV is not

MOV 0.1.0 is not a generic API test framework, payment checker, agent evaluator, wallet, escrow service, hosted control plane, or LLM judge.

Its current job is deliberately narrow: **decide whether one exact paid machine-service result satisfies the buyer's acceptance contract.**

## Release integrity

MOV 0.1.0 currently publishes:

| Property | Value |
|---|---|
| Package | `@mov/cli` |
| Version | `0.1.0` |
| Artifact | `mov-runtime-acceptance-0.1.0.tgz` |
| Size | `62,465 bytes` |
| SHA-256 | `9544c311ad4dd0d9087a7c7e58b7c579886b40ba999e10ee2bec0ce7f3789544` |
| npm registry | Not published |
| Live payment capability in public artifact | No |

- Release manifest: https://machineoutcome.com/downloads/release.json
- SHA-256 file: https://machineoutcome.com/downloads/mov-runtime-acceptance-0.1.0.tgz.sha256
- Verification instructions: [docs/release-verification.md](docs/release-verification.md)

## Public repository boundary

This repository is deliberately useful without publishing the private product blueprint.

**Public here:**

- product and integration documentation;
- stable buyer-facing verdict semantics;
- public runtime-decision schema;
- local CLI and TypeScript usage examples;
- high-level architecture;
- machine-readable discovery metadata;
- release identity and checksum verification;
- security/contact information;
- public-boundary CI.

**Not mirrored here:**

- private kernel/verifier implementation;
- payment/signing execution code;
- private verifier packs;
- internal infrastructure and deployment configuration;
- commercial operations, buyer records, outreach, or internal runbooks;
- internal architecture blueprints, checkpoints, execution logs, or private git history.

See [Public/private boundary](docs/public-boundary.md).

## Current status

MOV 0.1.0 is available as a narrow local Runtime Acceptance release for developers evaluating paid machine-service flows. The public artifact is local-first, no-custody, and has no live-payment capability.

Commercial validation is tracked separately from technical quality. Repository activity, downloads, automated QA, or stars are not treated as customer-demand proof.

See [STATUS.md](STATUS.md) and [CHANGELOG.md](CHANGELOG.md).

## Security and trust boundary

MOV is designed to minimize the trust it asks buyers to place in MOV:

- local execution for the public recorded path;
- buyer-owned acceptance rules;
- deterministic, version-pinned verification;
- explicit `UNKNOWN` instead of fake certainty;
- independent source evidence when the contract requires it;
- no custody or wallet ownership;
- no live-payment capability in the public 0.1.0 artifact.

For sensitive reports, see [SECURITY.md](SECURITY.md).

## License

The MOV 0.1.0 software release uses the **PolyForm Perimeter License 1.0.1**. It is source-available and should not be described as OSI open source.

See [LICENSE](LICENSE) for the repository notice and the canonical license reference.
