import Service from 'service'
import { subTitleType, parse } from 'subtitle'
import Hls from "hls.js"
import { Parser } from 'm3u8-parser';

interface Parser {
}

class KinoPub implements Service {
  async getSubs(language: string) {
    const seasonAndEpisode = document.location.pathname
      .match(new RegExp("/item/view/.*/" + "(.*)"))[1]
      .match(new RegExp("s([0-9]+)e([0-9]+)"))

    // Prevent exceptions on loader video page
    if (seasonAndEpisode == null) { return Promise.resolve(parse("")) }
    const season = seasonAndEpisode[1]
    const episode = seasonAndEpisode[2]

    const script = document.querySelector("#content").querySelector("script")
    const playlist = eval(script.innerHTML.split("var playlist = ")[1]);
    const currentEpisode = playlist.find((ep: { snumber: number, vnumber: number }) => {
      return ep.snumber.toString() == season && ep.vnumber.toString() == episode
    })

    const resp = await fetch(currentEpisode.file);
    const data = await resp.text();

    var parser = new (<any>Parser)();
    parser.push(data);
    parser.end;
    const subsSegments = parser.manifest.mediaGroups.SUBTITLES.sub;
    const key = Object.keys(subsSegments).find(key_1 => key_1.toLowerCase().includes(language));
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
