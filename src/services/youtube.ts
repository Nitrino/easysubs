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
  public init() {
    this.injectScript();
  }

  public async getSubs(language: string) {
    if (language === "") return parse("");
    const videoId = this.getVideoId();
    const subItem = await this.getVideoInfo(videoId, language);
    const subUri: string = `${subItem.baseUrl}&fmt=vtt`;

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

  private async getVideoInfo(videoId: string, lang: string) {
    const resp = await fetch(`https://youtube.com/get_video_info?video_id=${videoId}`);
    const text = await resp.text();
    const data = decodeURIComponent(text);

    if (!data.includes("captionTracks")) throw new Error(`Could not find captions for video: ${videoId}`);

    const regex = /({"captionTracks":.*isTranslatable":(true|false)}])/;
    const [match] = regex.exec(data);
    const { captionTracks } = JSON.parse(`${match}}`);

    const subtitle: Subtitle =
      captionTracks.find((track: any) => {
        return track.vssId === `.${lang}`;
      }) ||
      captionTracks.find((track: any) => {
        return track.vssId === `a.${lang}`;
      }) ||
      captionTracks.find((track: any) => {
        return track.vssId.match(`.${lang}`);
      });

    if (!subtitle || (subtitle && !subtitle.baseUrl)) throw new Error(`Could not find ${lang} captions for ${videoId}`);

    return subtitle;
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

      if (player) {
        if (!window.isLoaded) {
          window.isLoaded = true;
          window.dispatchEvent(new CustomEvent("easysubsVideoReady"));
          player.toggleSubtitles();
          player.toggleSubtitles();
        }
      } else {
        window.isLoaded = false;
      }

      const subsToggleElement = document.querySelector(".ytp-subtitles-button");
      if (subsToggleElement) {
        if (window.subtitlesEnabled && subsToggleElement.getAttribute("aria-pressed") === "false") {
          window.subtitlesEnabled = false;
          window.dispatchEvent(new CustomEvent("easysubsSubtitlesChanged", { detail: "" }));
        }
      }
    }, 500);

    (open => {
      XMLHttpRequest.prototype.open = function(method: string, url: string) {
        if (url.match(/^http/g) !== null) {
          const urlObject = new URL(url);
          if (urlObject.pathname === "/api/timedtext") {
            window.subtitlesEnabled = true;
            window.dispatchEvent(
              new CustomEvent("easysubsSubtitlesChanged", { detail: urlObject.searchParams.get("lang") })
            );
          }
        }
        open.call(this, method, url);
      };
    })(XMLHttpRequest.prototype.open);
  };

  private injectScript() {
    const sc = document.createElement("script");
    sc.innerHTML = `(${this.injection.toString()})()`;
    document.head.appendChild(sc);
    document.head.removeChild(sc);
  }
}

export default YouTube;
