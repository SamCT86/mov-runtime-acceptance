# Machine Outcome Verification (MOV)

**Runtime Acceptance for Paid Agent Services**

> **Your agent paid. Should it trust the result?**

MOV is the acceptance layer between machine payment and machine action. It evaluates the exact result of a paid API, MCP tool, or machine service against buyer-owned acceptance requirements **before downstream software uses it**.

- Website: https://machineoutcome.com/
- Public repository: https://github.com/SamCT86/mov-runtime-acceptance
- Public release: **0.1.0**
- Operator: **Sarmad Tawfeek · Sweden**
- Contact: `sarmad@machineoutcome.com`

> **Repository scope:** this is MOV's public developer, contract, release-verification, and proof surface. The private implementation core and its git history are intentionally not mirrored here.

## The problem

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
ACCEPT   -> continue
REJECT   -> stop or switch provider
UNKNOWN  -> reconcile evidence, retry later, or escalate
```

`UNKNOWN` is first-class. Missing, contradictory, unavailable, corrupt, or non-final required evidence does not become acceptance.

See [Runtime decision contract](docs/runtime-decision.md) and the public [`mov.runtime-decision.v1` JSON Schema](schemas/runtime-decision.v1.schema.json).

## Try MOV 0.1.0 locally

The current release is local-first and registry-unpublished. Install the exact public artifact directly:

```bash
npm install https://machineoutcome.com/downloads/mov-runtime-acceptance-0.1.0.tgz
```

Download the recorded ACCEPT fixture and run it.

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

MOV 0.1.0 is a finished narrow local Runtime Acceptance release. Current external work is focused on validation with independent developers and teams using real paid machine-service flows.

No GitHub star, download, automated QA result, or repository activity should be interpreted as proof of customer demand or willingness to pay.

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
