import Service from "service";
import { parse } from "subtitle";
import * as locale from "@cospired/i18n-iso-languages/langs/en.json";

class Kinopoisk implements Service {
  private subs: [];

  constructor() {
    this.subs = [];
  }


  public init() {
    this.injectScript();
    window.addEventListener("easysubsChangePlaylist", (event: any) => {
      this.subs = event.detail
      console.log(this.subs);
    });
    window.addEventListener("message", (event: any) => {
    console.log(event);
    
      if (event.data?.event?.eventName === "onInit") {
        window.dispatchEvent(new CustomEvent("easysubsVideoReady"));
      }
      if (event.data?.event?.eventName === "onTextTrackChange") {
        const label = event.data.event.data.name.toLowerCase();
        window.dispatchEvent(new CustomEvent("easysubsSubtitlesChanged", { detail: label }));
      }
    });
  }

  public async getSubs(label: string) {
    const sub: any = this.subs.find((subsItem: any) => subsItem.title === label)
    console.log(sub.url);
    
    const resp = await fetch("");
    const text = await resp.text();
    return parse("");
  }

  public settingSelector(): string {
    return '.control__fullscreen';
  }

  public playerContainerSelector(): string {
    return ".app-container";
  }

  private injectScript() {
    const sc = document.createElement("script");
    sc.innerHTML = `(${this.injection.toString()})()`;
    document.head.appendChild(sc);
    document.head.removeChild(sc);
  }

  private injection = () => {
    ((parseMock) => {
      JSON.parse = text => {
        const data = parseMock(text);
        if (data && data.streams) {
          window.dispatchEvent(new CustomEvent("easysubsChangePlaylist", { detail: data.streams[0].subtitles }));
        }
        return data;
      };
    })(JSON.parse);
  };
}

export default Kinopoisk;
