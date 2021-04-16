import { Parser } from "m3u8-parser";
import Service from "service";
import { parse } from "subtitle";

class KinoPub implements Service {
  private videoPlaylistUrl: string;
  private subsName: string;

  constructor() {
    this.videoPlaylistUrl = null;
    this.subsName = null;
    this.handleEasysubsChangePlaylist = this.handleEasysubsChangePlaylist.bind(this);
  }

  public init() {
    this.injectScript();
    window.addEventListener("easysubsChangePlaylist", this.handleEasysubsChangePlaylist);
    window.addEventListener("easysubsSubtitlesChanged", (event: any) => {
      this.subsName = event.detail;
    });
  }

  public async getSubs(label: string) {
    if (!label) return parse("");
    if (!this.videoPlaylistUrl) return parse("");

    const resp = await fetch(this.videoPlaylistUrl);
    const data = await resp.text();
    const parser = new (Parser as any)();
    parser.push(data);
    parser.end();
    const subsSegments = parser.manifest.mediaGroups.SUBTITLES.sub;

    const uri = `https://yandex-cdn.net${subsSegments[label].uri}`;
    const subsSegmentsResp = await fetch(uri);
    const subsSegmentsData = await subsSegmentsResp.text();

    const subsSegmentsParser = new (Parser as any)();
    subsSegmentsParser.push(subsSegmentsData);
    subsSegmentsParser.end();
    const subPath = subsSegmentsParser.manifest.segments[0].uri.match(/.*\/hls\/(.*)\/seg.*/)[1];
    const subUri = `https://yandex-cdn.net/pd/${subPath}`;

    const subsResp = await fetch(subUri);
    const subsData = await subsResp.text();

    const subs = parse(subsData);
    return subs;
  }

  public playerContainerSelector(): string {
    return "#player";
  }

  public settingsSelector(): string {
    return ".jw-button-container > div:last-child";
  }

  public settingsContentSelector(): string {
    return ".easysubs-settings-container";
  }

  private injectScript() {
    const sc = document.createElement("script");
    sc.innerHTML = `(${this.injection.toString()})()`;
    document.head.appendChild(sc);
    document.head.removeChild(sc);
  }

  private injection = () => {
    if (!window.playerInstance) return;
    window.dispatchEvent(new CustomEvent("easysubsVideoReady"));

    window.playerInstance.on("captionsChanged", (event: any) => {
      const track = window.playerInstance.getConfig().captionsTrack;
      const label = !!track ? track.label : null;
      window.dispatchEvent(new CustomEvent("easysubsSubtitlesChanged", { detail: label }));
    });

    window.playerInstance.on("firstFrame", (event: any) => {
      const playlistUrl = window.playerInstance.getConfig().playlistItem.file;
      window.dispatchEvent(new CustomEvent("easysubsChangePlaylist", { detail: playlistUrl }));
    });
  };

  private handleEasysubsChangePlaylist(event: any) {
    this.videoPlaylistUrl = event.detail;
    window.dispatchEvent(new CustomEvent("easysubsSubtitlesChanged", { detail: this.subsName }));
  }
}

export default KinoPub;
