import Service from 'service'
import { subTitleType, parse } from 'subtitle'
import Hls from "hls.js"
import { Parser } from 'm3u8-parser';

interface Parser {
}

class KinoPub implements Service {
  videoPlaylistUrl: string
  subsName: string
  constructor() {
    this.videoPlaylistUrl = null
    this.subsName = null
    this.handleEasysubsChangePlaylist = this.handleEasysubsChangePlaylist.bind(this)
  }

  init() {
    this.injectScript()
    window.addEventListener('easysubsChangePlaylist', this.handleEasysubsChangePlaylist)
    window.addEventListener('easysubsSubtitlesChanged', (event: any) => { this.subsName = event.detail })
  }

  async getSubs(label: string) {
    if (!this.videoPlaylistUrl) return parse("");

    const resp = await fetch(this.videoPlaylistUrl);
    const data = await resp.text();
    var parser = new (<any>Parser)();
    parser.push(data);
    parser.end;
    const subsSegments = parser.manifest.mediaGroups.SUBTITLES.sub;

    const uri = "https://cdn.streambox.in" + subsSegments[label].uri;
    const subsSegmentsResp = await fetch(uri);
    const subsSegmentsData = await subsSegmentsResp.text();

    var subsSegmentsParser = new (<any>Parser)();
    subsSegmentsParser.push(subsSegmentsData);
    subsSegmentsParser.end;
    const subPath = subsSegmentsParser.manifest.segments[0].uri.match(/.*\/hls\/(.*)\/seg.*/)[1];
    const subUri = "https://cdn.streambox.in/pd/" + subPath;

    const subsResp = await fetch(subUri);
    const subsData = await subsResp.text();

    return parse(subsData);
  }

  playerContainerElement(): HTMLElement {
    return document.querySelector("#player")
  }

  settingSelector(): string {
    return ".jw-button-container > div:last-child"
  }

  private injectScript() {
    const sc = document.createElement('script');
    sc.innerHTML = '(' + this.injection.toString() + ')()';
    document.head.appendChild(sc);
    document.head.removeChild(sc);
  }

  private injection = () => {
    if (!window.playerInstance) return;
    window.playerInstance.on('captionsChanged', (event: any) => {
      const track = window.playerInstance.getConfig().captionsTrack
      const label = !!track ? track.label : null
      window.dispatchEvent(new CustomEvent('easysubsSubtitlesChanged', { detail: label }));
    })

    window.playerInstance.on('ready', (event: any) => {
      window.dispatchEvent(new CustomEvent('easysubsVideoReady'));
    })

    window.playerInstance.on('firstFrame', (event: any) => {
      const playlistUrl = window.playerInstance.getConfig().playlistItem.file
      window.dispatchEvent(new CustomEvent('easysubsChangePlaylist', { detail: playlistUrl }));
    })
  }

  private handleEasysubsChangePlaylist(event: any) {
    this.videoPlaylistUrl = event.detail
    window.dispatchEvent(new CustomEvent('easysubsSubtitlesChanged', { detail: this.subsName }));
  }
}

export default KinoPub;
