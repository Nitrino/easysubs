import Service from "service";
import { parse } from "subtitle";
import { ready } from "../ready"

interface Track {
  src: string;
  srclang: string;
}

class Coursera implements Service {
  constructor() {
    this.injectScript = this.injectScript.bind(this);
  }

  public init() {
    ready("video", this.injectScript)
  }

  public async getSubs(language: string) {
    if (!language) return parse("");
    const track: HTMLTrackElement = document.querySelector(`track[srclang="${language}"]`)

    const subUri: string = track.src
    const resp = await fetch(subUri);
    const text = await resp.text();
    console.log(parse(text));

    return parse(text);
  }

  public settingSelector(): string {
    return ".rc-FullscreenToggle";
  }

  public playerContainerSelector(): string {
    return ".rc-VideoControlsContainer";
  }

  private getVideoId() {
    return window.location.pathname.match(/\/lecture\/(.*)\//)[1]
  }

  private injection = () => {
    function getLanguage(playerInstance: any) {
      return playerInstance.currentTrack()?.language || ""
    }
    
    const player: any = (document.querySelector(".video-js") as any).player;
    window.dispatchEvent(new CustomEvent("easysubsVideoReady"));

    player.on("loadeddata", (event: any) => {
      window.dispatchEvent(new CustomEvent("easysubsSubtitlesChanged", { detail: getLanguage(player)  }));
    });

    player.textTracks().on("change", (event: any) => {
      window.dispatchEvent(new CustomEvent("easysubsSubtitlesChanged", { detail: getLanguage(player) }));
    });
  };

  private injectScript() {
    const sc = document.createElement("script");
    sc.innerHTML = `(${this.injection.toString()})()`;
    document.head.appendChild(sc);
    document.head.removeChild(sc);
  }
}

export default Coursera;
