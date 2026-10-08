// The offscreen document of the spoken-word experiment (src/pages/offscreen): the speech models and tab capture need a
// page, which a service worker isn't. Chrome only; Firefox has no offscreen documents.

const OFFSCREEN_URL = "src/pages/offscreen/index.html";
let opening: Promise<void> | null = null;

export async function openAudioWorker(): Promise<void> {
  if (!chrome.offscreen) throw new Error("The speech models need Chrome");
  const existing = await chrome.runtime.getContexts({
    contextTypes: [chrome.runtime.ContextType.OFFSCREEN_DOCUMENT],
  });
  if (existing.length > 0) return;
  opening ??= chrome.offscreen
    .createDocument({
      url: OFFSCREEN_URL,
      reasons: [chrome.offscreen.Reason.WORKERS, chrome.offscreen.Reason.USER_MEDIA],
      justification: "Speech models and the tab's audio for highlighting the word being said",
    })
    .finally(() => {
      opening = null;
    });
  await opening;
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
