# Changelog

All notable changes to the public MOV developer surface are recorded here.

## 2026-08-18 — Public developer-surface clarity pass

- simplified the README around the core developer question: paid, delivered, accepted?
- added concrete situations where MOV is useful
- made the ordinary-assertion boundary explicit instead of pretending every paid call needs MOV
- clarified what MOV 0.1.0 is not
- tightened the public commercial-validation language so technical quality is not presented as market proof
- preserved the private implementation boundary and existing public contracts/examples

## 0.1.0 — 2026-08

Initial public Runtime Acceptance release.

### Added

- local `mov accept` CLI path;
- local TypeScript `mov.accept(...)` facade;
- buyer-facing `ACCEPT | REJECT | UNKNOWN` decision model;
- stable namespaced MOV reason codes;
- versioned `mov.runtime-decision.v1` output contract;
- public release artifact, manifest, and SHA-256 verification;
- recorded ACCEPT / REJECT / UNKNOWN examples on `machineoutcome.com`;
- machine-readable product discovery;
- local-first, no-custody public safety boundary.

### Distribution

The 0.1.0 package is intentionally registry-unpublished and distributed as a versioned public tarball from `machineoutcome.com`.
