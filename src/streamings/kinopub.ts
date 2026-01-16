import { Parser } from "m3u8-parser";
import { parse } from "subtitle";

import { esSubsChanged } from "@src/models/subs";
import { esRenderSetings } from "@src/models/settings";
import Service from "./service";
import { assertIsDefined } from "@root/utils/asserts";

class KinoPub implements Service {
  name = "kinopub";

  private videoPlaylistUrl: string | undefined;
  private subsName: string | undefined;

  constructor() {
    this.handleKinopubFirstFrame = this.handleKinopubFirstFrame.bind(this);
    this.handleKinopubCaptionsChanged = this.handleKinopubCaptionsChanged.bind(this);
  }

  public init(): void {
    console.debug("++++++++++++ KINOPUB INIT ++++++++++++");
    this.injectScript();

    window.addEventListener("kinopubFirstFrame", this.handleKinopubFirstFrame as EventListener);
    window.addEventListener("kinopubCaptionsChanged", this.handleKinopubCaptionsChanged as EventListener);
  }

  public async getSubs(label: string) {
    if (!label) return parse("");
    if (!this.videoPlaylistUrl) return parse("");

    const cdnHostName = new URL(this.videoPlaylistUrl)?.hostname ?? "cdn-azure.net";
    const resp = await fetch(this.videoPlaylistUrl);
    const data = await resp.text();
    const parser = new Parser();
    parser.push(data);
    parser.end();
    if (!parser.manifest.mediaGroups)
      throw new Error("KinoPub.getSubs() failed: parser.manifest.mediaGroups was nullish");
    const subsSegments = parser.manifest.mediaGroups.SUBTITLES.sub;

    const uri = `https://${cdnHostName}${subsSegments[label].uri}`;
    const subsSegmentsResp = await fetch(uri);
    const subsSegmentsData = await subsSegmentsResp.text();

    const subsSegmentsParser = new Parser();
    subsSegmentsParser.push(subsSegmentsData);
    subsSegmentsParser.end();
    const subPath = subsSegmentsParser.manifest.segments[0].uri.match(/.*\/hls\/(.*)\/seg.*/)?.[1];
    const subUri = `https://${cdnHostName}/pd/${subPath}`;

    const subsResp = await fetch(subUri);
    const subsData = await subsResp.text();

    const subs = parse(subsData);

    return subs;
  }

  public getSubsContainer() {
    // Try Vidstack player first, then fallback to old #player selector
    const selector = document.querySelector("media-player") || document.querySelector("#player");
    if (selector === null || selector === undefined) throw new Error("Subtitles container not found");
    return selector as HTMLElement;
  }

  public getSettingsButtonContainer() {
    // Try multiple selectors for Vidstack controls
    // Vidstack controls are typically inside media-controls with media-controls-group
    const selector = document.querySelector(".control-button.btn-settings");

    if (selector === null || selector === undefined) throw new Error("Settings button container not found");
    return selector as HTMLElement;
  }

  public getSettingsContentContainer() {
    const selector = document.querySelector("#player");
    if (selector === null || selector === undefined) throw new Error("Settings content container not found");
    return selector as HTMLElement;
  }

  public isOnFlight() {
    return false;
  }

  private handleKinopubFirstFrame(event: CustomEvent) {
    this.videoPlaylistUrl = event.detail;
    if (this.subsName) {
      esSubsChanged(this.subsName);
    }
    esRenderSetings();
  }

  private handleKinopubCaptionsChanged(event: CustomEvent) {
    this.subsName = event.detail;
    assertIsDefined(this.subsName, "handleKinopubCaptionsChanged failed: this.subsName was nullish");
    esSubsChanged(this.subsName);
    esRenderSetings();
  }

  private injectScript() {
    const script = document.createElement("script");
    script.src = chrome.runtime.getURL("assets/js/kinopub.js");
    script.type = "module";
    document.head.prepend(script);
  }
}

export default KinoPub;
