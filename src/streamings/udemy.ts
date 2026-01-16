import { esRenderSetings } from "@src/models/settings";
import Service from "./service";
import { parse } from "subtitle";
import { esSubsChanged, rawSubsAdded } from "@src/models/subs";

class Udemy implements Service {
  name = "udemy";

  constructor() {
    waitForElement('[data-purpose="settings-button"]', () => {
      esRenderSetings();
    });
  }

  public init(): void {
    waitForElement("div[class*='captions-display--captions-container']", () => {
      esSubsChanged("en");
      const subtitleSource = document.querySelector("div[class*='captions-display--captions-container']");
      if (!subtitleSource) throw new Error('Udemy.init() failed: subtitleSource was not found')
      const videoElement = document.querySelector("video");
      if (!videoElement) throw new Error('Udemy.init() failed: videoElement was not found')
      const subtitleObserver = new MutationObserver(() => {
        const subtitleParts = subtitleSource.querySelectorAll('[data-purpose="captions-cue-text"]');

        const subtitleContent = [...subtitleParts].map((el) => getText(el)).join("\n");
        console.log("subtitleContent", subtitleContent);
        const startTime = videoElement.currentTime;
        const captions = [
          {
            start: startTime * 1000,
            end: (startTime + 100) * 1000,
            text: subtitleContent,
          },
        ];
        rawSubsAdded(captions);
      });
      subtitleObserver.observe(subtitleSource, { childList: true, subtree: true });
    });
  }

  public async getSubs(_title: string) {
    return parse("");
  }

  public getSubsContainer() {
    const selector = document.querySelector("video[class*='video-player--']")?.parentElement;
    if (selector === null || selector === undefined) throw new Error("Subtitles container not found");
    return selector as HTMLElement;
  }

  public getSettingsButtonContainer() {
    const selector = document.querySelector('[data-purpose="settings-button"]');
    if (selector === null || selector === undefined) throw new Error("Settings button container not found");
    return selector as HTMLElement;
  }

  public getSettingsContentContainer() {
    const selector = document.querySelector("video[class*='video-player--']")?.parentElement;
    if (selector === null || selector === undefined) throw new Error("Settings content container not found");
    return selector as HTMLElement;
  }

  public isOnFlight() {
    return true;
  }
}

function getText(node: ChildNode): string | null {
  if (node.nodeType === Node.TEXT_NODE) {
    return node.textContent;
  }
  if (node.nodeName === "BR") {
    return "\n";
  }

  const result = [...node.childNodes].map((el) => getText(el)).join("");
  return result;
}

function waitForElement(selector: string, callBack: () => void) {
  window.setTimeout(function () {
    if (document.querySelector(selector)) {
      callBack();
    } else {
      waitForElement(selector, callBack);
    }
  }, 300);
}

export default Udemy;
