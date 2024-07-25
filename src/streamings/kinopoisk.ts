import { esRenderSetings } from "@src/models/settings";
import Service from "./service";
import { parse } from "subtitle";
import { esSubsChanged, rawSubsAdded } from "@src/models/subs";
import { $video } from "@src/models/videos";

class Kinopoisk implements Service {
  name = "kinopoisk";

  constructor() {
    waitForElement('[data-tid="SettingPopupButton"]', () => {
      esRenderSetings();
    });
  }

  public init(): void {
    $video.watch((video) => {
      if (video) {
        esSubsChanged("en");

        waitForElement('div[data-tid="SubtitlesPortalRoot"]', () => {
          const subtitleSource = document.querySelector('div[data-tid="SubtitlesPortalRoot"]');
          const videoElement = document.querySelector("video");
          const subtitleObserver = new MutationObserver(() => {
            const subtitleParts = subtitleSource.querySelectorAll("div[class*='Subtitles_text']");
            console.log("subtitleSource", subtitleSource);
            console.log("subtitleParts", subtitleParts);

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
    const selector = document.querySelector("div[class*='styles_controlsLayer']");
    if (selector === null) throw new Error("Subtitles container not found");
    return selector as HTMLElement;
  }

  public getSettingsButtonContainer() {
    const selector = document.querySelector('[data-tid="SettingPopupButton"]');
    if (selector === null) throw new Error("Settings button container not found");
    return selector as HTMLElement;
  }

  public getSettingsContentContainer() {
    const selector = document.querySelector("yaplayertag");
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
    if (document.querySelector(selector)) {
      callBack();
    } else {
      waitForElement(selector, callBack);
    }
  }, 300);
}

export default Kinopoisk;
