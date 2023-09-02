import { esRenderSetings } from "@src/models/settings";
import Service from "./service";
import { parse } from "subtitle";
import { esSubsChanged, rawSubsAdded } from "@src/models/subs";

class Plex implements Service {
  constructor() {
    setInterval(() => {
      const subtitleContainer = document.querySelector(".libjass-subs");
      const easysubsSettings = document.querySelector(".es-settings");
      if (subtitleContainer && !easysubsSettings) {
        esRenderSetings();
      }
    }, 100);
  }

  public init(): void {
    waitForElement(() => {
      esSubsChanged("en");
      const subtitleSource = document.querySelector(".libjass-subs");
      const videoElement = document.querySelector("video");
      const subtitleObserver = new MutationObserver(() => {
        const subtitleParts = subtitleSource.querySelectorAll("span span");

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

  public async getSubs(title: string) {
    return parse("");
  }

  public getSubsContainer() {
    const selector = document.querySelector("div[class*='Player-fullPlayerContainer']");
    if (selector === null) throw new Error("Subtitles container not found");
    return selector as HTMLElement;
  }

  public getSettingsButtonContainer() {
    const selector = document.querySelector('[data-testid="videoSettingsButton"]');
    if (selector === null) throw new Error("Settings button container not found");
    return selector as HTMLElement;
  }

  public getSettingsContentContainer() {
    const selector = document.querySelector("div[class*='Player-fullPlayerContainer']");
    if (selector === null) throw new Error("Settings content container not found");
    return selector as HTMLElement;
  }

  public isOnFlight() {
    return true;
  }
}

function getText(node: ChildNode) {
  if (node.nodeType === Node.TEXT_NODE) {
    return node.textContent;
  }
  if (node.nodeName === "BR") {
    return "\n";
  }

  const result = [...node.childNodes].map((el) => getText(el)).join("");
  return result;
}

function waitForElement(callBack) {
  window.setTimeout(function () {
    if (document.querySelector(".libjass-subs")) {
      callBack();
    } else {
      waitForElement(callBack);
    }
  }, 300);
}

export default Plex;
