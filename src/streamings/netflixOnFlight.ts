import { esRenderSetings } from "@src/models/settings";
import Service from "./service";
import { parse } from "subtitle";
import { esSubsChanged, rawSubsAdded } from "@src/models/subs";

class NetflixOnFlight implements Service {
  constructor() {
    setInterval(() => {
      const videoControlContainer = document.querySelector(".watch-video--bottom-controls-container");
      const subsContainer = document.querySelector(".watch-video--player-view");
      const easysubsSettings = document.querySelector(".es-settings");
      if (videoControlContainer && subsContainer && !easysubsSettings) {
        esRenderSetings();
      }
    }, 100);
  }

  public init(): void {
    waitForElement(() => {
      esSubsChanged("en");
      const subtitleSource = document.querySelector(".player-timedtext");
      const videoElement = document.querySelector("video");
      const subtitleObserver = new MutationObserver(() => {
        const subtitleParts = subtitleSource.getElementsByClassName("player-timedtext-text-container");
        const subtitleContent = [...subtitleParts].map((el) => getText(el)).join("\n");
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
    const selector = document.querySelector(".watch-video--player-view");
    if (selector === null) throw new Error("Subtitles container not found");
    return selector as HTMLElement;
  }

  public getSettingsButtonContainer() {
    const selector = (
      document.querySelector('[data-uia="control-fullscreen-enter"]') ||
      document.querySelector('[data-uia="control-fullscreen-exit"]')
    ).parentElement;
    if (selector === null) throw new Error("Settings button container not found");
    return selector as HTMLElement;
  }

  public getSettingsContentContainer() {
    const selector = document.querySelector("#appMountPoint");
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
    if (document.querySelector(".player-timedtext")) {
      callBack();
    } else {
      waitForElement(callBack);
    }
  }, 300);
}

export default NetflixOnFlight;
