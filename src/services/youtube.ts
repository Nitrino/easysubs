import Service from "service";
import { parse } from "subtitle";

interface Subtitle {
  baseUrl: string;
  isTranslatable: boolean;
  languageCode: string;
  name: { simpleText: string };
  vssId: string;
}

class YouTube implements Service {
  private subCache: any;

  constructor() {
    this.subCache = {};
    this.processSubData = this.processSubData.bind(this);
    window.addEventListener("easysubs_data", this.processSubData);
  }

  public init() {
    this.injectScript();
  }

  public async getSubs(language: string) {
    if (language === "") return parse("");
    const videoId = this.getVideoId();

    const urlObject: URL = new URL(this.subCache[videoId][language])
    urlObject.searchParams.set("fmt", "vtt")
    const subUri: string = urlObject.href

    const resp = await fetch(subUri);
    const text = await resp.text();
    return parse(text);
  }

  public settingSelector(): string {
    return ".ytp-right-controls > .ytp-size-button";
  }

  public playerContainerSelector(): string {
    return ".html5-video-player";
  }

  private getVideoId() {
    const regExpression = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = window.location.href.match(regExpression);
    if (match && match[2].length === 11) {
      return match[2];
    }
    console.error("Can't get youtube video id");
  }

  private injection = () => {
    window.setInterval(() => {
      const player: any = document.getElementById("movie_player");
      const subsToggleElement = document.querySelector(".ytp-subtitles-button");

      if (player) {
        if (!window.isLoaded) {
          window.isLoaded = true;
          window.dispatchEvent(new CustomEvent("easysubsVideoReady"));

          if (subsToggleElement.getAttribute("aria-pressed") === "true") {
            player.toggleSubtitles();
            player.toggleSubtitles();
          } else {
            window.dispatchEvent(new CustomEvent("easysubsSubtitlesChanged", { detail: "" }));
          }
        }
      } else {
        window.isLoaded = false;
      }

      if (subsToggleElement) {
        if (window.subtitlesEnabled && subsToggleElement.getAttribute("aria-pressed") === "false") {
          window.subtitlesEnabled = false;
          window.dispatchEvent(new CustomEvent("easysubsSubtitlesChanged", { detail: "" }));
        }
      }
    }, 500);

    (open => {
      XMLHttpRequest.prototype.open = function (method: string, url: string) {
        if (url.match(/^http/g) !== null) {
          const urlObject = new URL(url);
          if (urlObject.pathname === "/api/timedtext") {
            window.subtitlesEnabled = true;
            const lang = urlObject.searchParams.get("tlang") || urlObject.searchParams.get("lang")
            window.dispatchEvent(new CustomEvent("easysubs_data", { detail: urlObject.href }));
            window.dispatchEvent(
              new CustomEvent("easysubsSubtitlesChanged", { detail: lang })
            );
          }
        }
        open.call(this, method, url);
      };
    })(XMLHttpRequest.prototype.open);
  };

  private processSubData(event: any) {
    const urlObject = new URL(event.detail)
    const lang = urlObject.searchParams.get("tlang") || urlObject.searchParams.get("lang")
    const videoId = urlObject.searchParams.get("v")
    this.subCache[videoId] = {}
    this.subCache[videoId][lang] = urlObject.href
  }

  private injectScript() {
    const sc = document.createElement("script");
    sc.innerHTML = `(${this.injection.toString()})()`;
    document.head.appendChild(sc);
    document.head.removeChild(sc);
  }
}

export default YouTube;
