import { esRenderSetings } from "@src/models/settings";
import Service from "./service";
import { parse } from "subtitle";
import { esSubsChanged, rawSubsAdded } from "@src/models/subs";
import { $video } from "@src/models/videos";

class Amazon implements Service {
  constructor() {
    waitForElement("#dv-web-player video", () => {
      esRenderSetings();
    });
  }

  public init(): void {
    $video.watch((video) => {
      if (video) {
        waitForElement("#dv-web-player video, .tst-video-overlay-player-html5", () => {
          esSubsChanged("en");
          const subtitleSource = document.querySelector(".atvwebplayersdk-captions-overlay");
          const videoElement = document.querySelector("video");
          const subtitleObserver = new MutationObserver(() => {
            const subtitleParts = subtitleSource.querySelectorAll(".atvwebplayersdk-captions-text");

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
    });
  }

  public async getSubs(title: string) {
    return parse("");
  }

  public getSubsContainer() {
    const selector = document.querySelector(".atvwebplayersdk-overlays-container");
    if (selector === null) throw new Error("Subtitles container not found");
    return selector as HTMLElement;
  }

  public getSettingsButtonContainer() {
    const selector = document.querySelector(".atvwebplayersdk-options-wrapper");
    if (selector === null) throw new Error("Settings button container not found");
    return selector as HTMLElement;
  }

  public getSettingsContentContainer() {
    const selector = document.querySelector(".atvwebplayersdk-overlays-container");
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

function waitForElement(selector, callBack) {
  window.setTimeout(function () {
    const element = document.querySelector(selector);
    if (element && element.src !== "") {
      callBack();
    } else {
      waitForElement(selector, callBack);
    }
  }, 300);
}

export default Amazon;
