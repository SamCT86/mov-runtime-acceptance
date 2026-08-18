# Verify MOV 0.1.0

The public release is identified by a versioned artifact plus SHA-256 digest.

## Expected identity

```text
package:  @mov/cli
version:  0.1.0
file:     mov-runtime-acceptance-0.1.0.tgz
bytes:    62465
sha256:   9544c311ad4dd0d9087a7c7e58b7c579886b40ba999e10ee2bec0ce7f3789544
```

Release manifest:

```text
https://machineoutcome.com/downloads/release.json
```

Canonical checksum file:

```text
https://machineoutcome.com/downloads/mov-runtime-acceptance-0.1.0.tgz.sha256
```

## macOS / Linux

```bash
curl -fsSLO https://machineoutcome.com/downloads/mov-runtime-acceptance-0.1.0.tgz
shasum -a 256 mov-runtime-acceptance-0.1.0.tgz
```

The printed digest must equal the expected SHA-256 above.

## Windows PowerShell

```powershell
Invoke-WebRequest `
  -Uri "https://machineoutcome.com/downloads/mov-runtime-acceptance-0.1.0.tgz" `
  -OutFile ".\\mov-runtime-acceptance-0.1.0.tgz"

(Get-FileHash `
  -Algorithm SHA256 `
  -LiteralPath ".\\mov-runtime-acceptance-0.1.0.tgz").Hash.ToLower()
```

The result must equal:

```text
9544c311ad4dd0d9087a7c7e58b7c579886b40ba999e10ee2bec0ce7f3789544
```

## Install the exact artifact

```bash
npm install https://machineoutcome.com/downloads/mov-runtime-acceptance-0.1.0.tgz
```

MOV 0.1.0 is intentionally not published to the npm registry. The versioned URL and checksum are the current release identity.
