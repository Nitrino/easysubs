import Service from 'service'
import { subTitleType, parse } from 'subtitle'
import Hls from "hls.js"
import { Parser } from 'm3u8-parser';

interface Parser {
}

class KinoPub implements Service {
  async getSubs(language: string) {
    const xpath = "//a[text()='HLS4 плейлист']";
    const HLS4Playlistnode = <HTMLLinkElement>document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
    if (!HLS4Playlistnode) { return Promise.resolve(parse("")) }

    const resp = await fetch(HLS4Playlistnode.href);
    const data = await resp.text();
    var parser = new (<any>Parser)();
    parser.push(data);
    parser.end;
    const subsSegments = parser.manifest.mediaGroups.SUBTITLES.sub;

    const key = Object.keys(subsSegments).find(key_1 => key_1.toLowerCase().includes(language) && !key_1.toLowerCase().includes("forced"));
    const uri = "https://cdn.streambox.in" + subsSegments[key].uri;

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
}

export default KinoPub;
