import { openOffscreenDocument } from "@pages/background/offscreen";
import {
  BERGAMOT_WORKER,
  createBergamotEngine,
  runBergamotRequest,
  type TBergamotEngine,
  type TBergamotRequest,
} from "./engine";

// The background's way to Bergamot: a service worker can't start workers, so in Chrome the engine runs in the
// offscreen document; Firefox's background is a page and runs it itself.

let local: TBergamotEngine | null = null;

export async function bergamot(request: TBergamotRequest): Promise<unknown> {
  if (typeof Worker === "undefined" && chrome.offscreen) {
    await openOffscreenDocument();
    const answer = await chrome.runtime.sendMessage({ target: "offscreen", type: "bergamot", request });
    if (!answer || answer.error) throw new Error(answer?.error ?? "Bergamot didn't answer");
    return answer.result;
  }
  local ??= createBergamotEngine(chrome.runtime.getURL(BERGAMOT_WORKER));
  return runBergamotRequest(local, request);
}

// After its models were deleted: only where Bergamot runs, as a new worker starts without them anyway
export async function resetBergamot(): Promise<void> {
  if (typeof Worker === "undefined" && chrome.offscreen) {
    const open = await chrome.runtime.getContexts({ contextTypes: [chrome.runtime.ContextType.OFFSCREEN_DOCUMENT] });
    if (open.length === 0) return;
  } else if (!local) return;
  await bergamot({ type: "reset" });
}

export const bergamotTranslate = (texts: string[], from: string, to: string) =>
  bergamot({ type: "translate", texts, from, to }) as Promise<string[]>;
