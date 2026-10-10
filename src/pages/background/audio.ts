import { openOffscreenDocument } from "./offscreen";

// The speech models of the spoken-word experiment run in the offscreen document; Chrome only
export async function openAudioWorker(): Promise<void> {
  if (!chrome.offscreen) throw new Error("The speech models need Chrome");
  await openOffscreenDocument();
}

// After the user clicked "Listen to this tab" in the popup: that click lets chrome.tabCapture take the tab
export async function startTabCapture(tabId: number) {
  if (!chrome.tabCapture) throw new Error("EasySubs may not capture tabs");
  await openAudioWorker();
  const streamId = await chrome.tabCapture.getMediaStreamId({ targetTabId: tabId });
  return chrome.runtime.sendMessage({ target: "offscreen", type: "tabCaptureStart", tabId, streamId });
}

export async function stopTabCapture(tabId: number) {
  const existing = await chrome.runtime.getContexts({
    contextTypes: [chrome.runtime.ContextType.OFFSCREEN_DOCUMENT],
  });
  if (existing.length === 0) return { stopped: false };
  return chrome.runtime.sendMessage({ target: "offscreen", type: "tabCaptureStop", tabId });
}
