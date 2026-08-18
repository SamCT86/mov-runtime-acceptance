import { mov } from "@mov/cli";

/**
 * Minimal buyer-side branching around MOV's public local Runtime Acceptance API.
 * The caller supplies the buyer-owned contract and retained evidence for one exact attempt.
 */
export async function acceptPaidResult(
  input: Parameters<typeof mov.accept>[0],
) {
  const decision = await mov.accept(input);

  switch (decision.decision) {
    case "ACCEPT":
      return { action: "continue" as const, decision };
    case "REJECT":
      return { action: "stop-or-switch" as const, decision };
    case "UNKNOWN":
      return { action: "reconcile" as const, decision };
  }
}
