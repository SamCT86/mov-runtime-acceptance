# MOV public status

Last reviewed: **2026-08-18**

## Current release

- Product: **Machine Outcome Verification (MOV)**
- Wedge: **Runtime Acceptance for Paid Agent Services**
- Public local release: **0.1.0**
- Buyer-facing decision: `ACCEPT | REJECT | UNKNOWN`
- Initial payment rail evidence: **x402-first**
- Distribution: versioned public tarball from `machineoutcome.com`
- Public npm registry: **not published**
- Hosted Runtime Acceptance API: **not publicly available**
- Custody / wallet ownership: **none**
- Live payment capability in public 0.1.0 artifact: **none**

## Validation state

The product is in **external validation** with developers and engineering teams building paid-agent workflows.

This status does **not** claim paid customers, retention, willingness to pay, or standalone-company validation. Those require independent external behavior and money, not technical quality or repository activity.

## What is stable

- buyer-owned acceptance semantics;
- `ACCEPT | REJECT | UNKNOWN` runtime decision;
- `mov.runtime-decision.v1` output schema;
- local `mov accept` CLI surface;
- local TypeScript `mov.accept(...)` surface;
- public 0.1.0 release identity and checksum;
- no-custody / fail-closed evidence boundary.

## What is intentionally not promised

- hosted multi-tenant service;
- custody, escrow, or wallet management;
- generic agent evaluation;
- generic LLM judging;
- provider routing or reputation graph;
- cross-rail platform.
