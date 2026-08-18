# Public / private repository boundary

MOV uses a **publicly inspectable product surface + private implementation core** model.

The goal is to make adoption, trust, release identity, and buyer-facing contracts inspectable without publishing unrelated internal machinery or a competitive implementation blueprint.

## Public in this repository

| Surface | Why public |
|---|---|
| README / status / changelog | Product clarity and current state |
| Runtime decision schema | Machine-consumable contract |
| High-level architecture | Explain trust boundary without implementation leakage |
| CLI / TypeScript examples | Reduce developer activation friction |
| Release manifest/checksum instructions | Reproducible artifact identity |
| Discovery manifest | Agent/tool discovery |
| Security/contact | Responsible reporting and operator trust |
| Public-boundary CI | Prevent accidental expansion of the public tree |

## Intentionally private

- implementation kernel and verifier internals;
- payment / authorization / signing execution;
- private verifier packs and buyer-specific acceptance packs;
- infrastructure, deployment, database, and secret configuration;
- commercial pipeline, buyer records, outreach, and internal runbooks;
- detailed internal architecture blueprints and design history;
- internal checkpoints, state logs, incident/reconciliation history;
- private git history.

## Security principle

**Deletion is not sanitization.** A repository with sensitive historical commits should not be made public merely because the current working tree has been trimmed.

This public repository therefore starts from a clean history and receives only files that pass the explicit public allowlist and automated content checks.

## Future changes

A new file or category is not public by default. It should be added only when it materially improves one of:

- developer activation;
- buyer trust;
- interoperability;
- release verification;
- public proof;
- responsible security disclosure.

If the value is mostly internal execution convenience, competitive implementation detail, or commercial operations, it stays private.
