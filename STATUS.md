# MOV public status

Last reviewed: **2026-08-18**

## Current release

- Product: **Machine Outcome Verification (MOV)**
- Wedge: **Runtime Acceptance for Paid Agent Services**
- Public local release: **0.1.0**
- Buyer-facing decision: `ACCEPT | REJECT | UNKNOWN`
- Initial payment-rail evidence: **x402-first**
- Distribution: versioned public tarball from `machineoutcome.com`
- Public npm registry: **not published**
- Hosted Runtime Acceptance API: **not publicly available**
- Custody / wallet ownership: **none**
- Live payment capability in public 0.1.0 artifact: **none**

## Technical status

The narrow local 0.1.0 product surface is available for evaluation. Its public contract, recorded fixtures, release identity, checksum verification, CLI surface, TypeScript surface and three-state decision model are intentionally inspectable through this repository and `machineoutcome.com`.

## Commercial validation boundary

This repository does **not** claim paid-customer validation, retention, willingness to pay, or standalone-company validation.

Those require independent external use and money. Technical quality, automated QA, downloads, repository activity and GitHub stars are not substitutes for that evidence.

## Stable public contract

- buyer-owned acceptance semantics;
- `ACCEPT | REJECT | UNKNOWN` runtime decision;
- `mov.runtime-decision.v1` output schema;
- local `mov accept` CLI surface;
- local TypeScript `mov.accept(...)` surface;
- public 0.1.0 release identity and checksum;
- no-custody / fail-closed evidence boundary.

## Deliberately outside the current public product

- hosted multi-tenant Runtime Acceptance service;
- custody, escrow, or wallet management;
- generic API testing;
- generic agent evaluation;
- generic LLM judging;
- provider routing or reputation graph;
- broad cross-rail platform.

The current job stays narrow: determine whether an exact paid machine-service result satisfies the buyer's precommitted acceptance contract.
