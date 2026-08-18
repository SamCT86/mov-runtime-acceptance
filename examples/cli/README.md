# CLI example

Install the exact public MOV 0.1.0 artifact:

```bash
npm install https://machineoutcome.com/downloads/mov-runtime-acceptance-0.1.0.tgz
```

Download a recorded public fixture:

```bash
curl -fsSLo accept.json https://machineoutcome.com/examples/accept.json
```

Run Runtime Acceptance:

```bash
npx mov accept --fixture ./accept.json
```

Expected buyer-facing decision for the recorded ACCEPT fixture:

```text
ACCEPT
```

Additional recorded fixtures are published at:

- https://machineoutcome.com/examples/reject.json
- https://machineoutcome.com/examples/unknown.json

The recorded CLI path does not initiate a purchase or invoke a wallet/signing action.
