import { esRenderSetings } from "@src/models/settings";
import Service from "./service";
import { parse } from "subtitle";
import { esSubsChanged, rawSubsAdded } from "@src/models/subs";
import { $video } from "@src/models/videos";

class Amazon implements Service {
  name = "amazon";

  constructor() {
    waitForVideoElement("#dv-web-player video", () => {
      esRenderSetings();
    });
  }

  public init(): void {
    $video.watch((video) => {
      if (video) {
        waitForVideoElement("#dv-web-player video, .tst-video-overlay-player-html5", () => {
          esSubsChanged("en");
          const subtitleSource = document.querySelector(".atvwebplayersdk-captions-overlay");
          if (!subtitleSource) throw new Error('Amazon.init() failed: subtitleSource was not found')
          const videoElement = document.querySelector("video");
          if (!videoElement) throw new Error('Amazon.init() failed: videoElement was not found')
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

  public async getSubs(_title: string) {
    return parse("");
  }

  public getSubsContainer() {
    const selector = document.querySelector(".atvwebplayersdk-overlays-container");
    if (selector === null || selector === undefined) throw new Error("Subtitles container not found");
    return selector as HTMLElement;
  }

  public getSettingsButtonContainer() {
    const selector = document.querySelector(".atvwebplayersdk-options-wrapper");
    if (selector === null || selector === undefined) throw new Error("Settings button container not found");
    return selector as HTMLElement;
  }

  public getSettingsContentContainer() {
    const selector = document.querySelector(".atvwebplayersdk-overlays-container");
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

function waitForVideoElement(selector: string, callBack: () => void) {
  window.setTimeout(function () {
    const element = document.querySelector(selector);
    if (element && (element as HTMLVideoElement).src !== "") {
      callBack();
    } else {
      waitForVideoElement(selector, callBack);
    }
  }, 300);
}

export default Amazon;
