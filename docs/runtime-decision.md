# `mov.runtime-decision.v1`

The buyer-facing Runtime Acceptance envelope is designed to be branchable by software while keeping payment, delivery, and acceptance truth separate.

Canonical schema: [`schemas/runtime-decision.v1.schema.json`](../schemas/runtime-decision.v1.schema.json)

## Decision mapping

| Kernel truth | Buyer-facing decision | Suggested action |
|---|---|---|
| `VERIFIED` | `ACCEPT` | Continue |
| `FAILED` | `REJECT` | Stop or switch provider |
| `UNKNOWN` | `UNKNOWN` | Reconcile evidence / retry later / escalate |

## Required envelope fields

- `schema_version`
- `decision`
- `obligation_id`
- `attempt_id`
- `payment.state`
- `delivery.state`
- `acceptance.state`
- `reason_codes`
- `evidence_hash`
- `contract_hash`
- `verifier_manifest`
- `decided_at`

## Example shape

The hashes below are intentionally illustrative digests; use the recorded public fixtures for reproducible proof.

```json
{
  "schema_version": "mov.runtime-decision.v1",
  "decision": "REJECT",
  "obligation_id": "obl-example-001",
  "attempt_id": "attempt-example-001",
  "payment": { "state": "SETTLED" },
  "delivery": { "state": "DELIVERED" },
  "acceptance": { "state": "REJECT" },
  "reason_codes": ["MOV.ENTITY.MISMATCH"],
  "evidence_hash": "sha256:1111111111111111111111111111111111111111111111111111111111111111",
  "contract_hash": "sha256:2222222222222222222222222222222222222222222222222222222222222222",
  "verifier_manifest": [
    {
      "verifier_id": "entity.match",
      "verifier_version": "1.0.0"
    }
  ],
  "decided_at": "2026-08-18T00:00:00.000Z"
}
```

## Reason codes

Reason codes are stable, namespaced strings. One public reference failure is:

```text
MOV.ENTITY.MISMATCH
```

A reason code explains the acceptance decision; it does not erase the separately recorded payment or delivery state.
