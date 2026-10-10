// The offscreen document (src/pages/offscreen): what needs a page, which a service worker isn't. The speech models
// and tab capture of the spoken-word experiment, and Bergamot's worker. Chrome only; Firefox's background is a page.

const OFFSCREEN_URL = "src/pages/offscreen/index.html";
let opening: Promise<void> | null = null;

export async function openOffscreenDocument(): Promise<void> {
  if (!chrome.offscreen) throw new Error("Offscreen documents need Chrome");
  const existing = await chrome.runtime.getContexts({
    contextTypes: [chrome.runtime.ContextType.OFFSCREEN_DOCUMENT],
  });
  if (existing.length > 0) return;
  opening ??= chrome.offscreen
    .createDocument({
      url: OFFSCREEN_URL,
      reasons: [chrome.offscreen.Reason.WORKERS, chrome.offscreen.Reason.USER_MEDIA],
      justification: "Translation and speech models, and the tab's audio for highlighting the word being said",
    })
    .finally(() => {
      opening = null;
    });
  await opening;
}
