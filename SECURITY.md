# Security

## Reporting a security issue

Please do **not** open a public issue for a vulnerability or for material that contains sensitive transaction evidence.

Email: **sarmad@machineoutcome.com**

Useful reports include:

- affected MOV version or public surface;
- a minimal reproduction;
- expected vs observed behavior;
- practical impact;
- any relevant environment detail that is safe to share.

Do not send private keys, wallet seed phrases, bearer signing secrets, payment credentials, access tokens, or unnecessary sensitive customer data.

## Public 0.1.0 safety boundary

The recorded local Runtime Acceptance path is designed to be economically inert:

- no purchase initiation;
- no wallet/signing action;
- no runtime-secret read;
- no custody;
- no hosted control plane requirement.

Live payment execution is outside the public 0.1.0 capability surface and requires a separate explicit authorization boundary.

## Scope of this repository

This repository is a public developer/documentation surface. MOV's private implementation core, payment execution components, private verifier packs, infrastructure, and operational history are not mirrored here.

No bug-bounty or response-time commitment is implied unless separately agreed.
