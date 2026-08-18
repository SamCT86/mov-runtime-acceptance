# Changelog

All notable changes to the public MOV developer surface are recorded here.

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
