import { parse, subTitleType } from "subtitle";

class Onvix {
  public init() {
    return;
  }
  public async getSubs(language: string): Promise<subTitleType[]> {
    const videoType = window.location.pathname.split("/")[1];
    const basePathname = "/api/v1/streaming/";
    const videoId = window.location.pathname.split("/")[2];
    const stream = window.location.search.split("&")[0].split("=")[1];
    const season = window.location.search.split("&")[1];
    const episode = window.location.search.split("&")[2];

    let url = `${window.location.origin}${basePathname}${videoType}s/${videoId}/${stream}.json?`;
    if (videoType === "serial") {
      url = `${url}${season}&${episode}`;
    }

    const resp = await fetch(url);
    const data = await resp.json();
    const subsUrl = data.media_files.vtt.find((el: { srclang: string }) => el.srclang === language).src;
    const resp1 = await fetch(subsUrl);
    const text = await resp1.text();
    return parse(text);
  }

  public playerContainerSelector(): string {
    return ".fp-ui";
  }

  public settingSelector(): string {
    return "";
  }
}

export default Onvix;
