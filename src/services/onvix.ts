import { parse, subTitleType } from "subtitle";
import UI from "../ui"

class Onvix {
  async getSubs(language: string): Promise<subTitleType[]> {
    const videoType = window.location.pathname.split("/")[1]
    const base_pathname = "/api/v1/streaming/"
    const videoId = window.location.pathname.split("/")[2]
    const stream = window.location.search.split("&")[0].split("=")[1]
    const season = window.location.search.split("&")[1]
    const episode = window.location.search.split("&")[2]

    let url = `${window.location.origin}${base_pathname}${videoType}s/${videoId}/${stream}.json?`
    if (videoType == "serial") { url = `${url}${season}&${episode}` }

    const resp = await fetch(url);
    const data = await resp.json();
    const subs_url = data.media_files.vtt.find((el: { srclang: string }) => el.srclang === language).src;
    const resp_1 = await fetch(subs_url);
    const text = await resp_1.text();
    return parse(text);
  }

  playerContainerElement(): HTMLElement {
    return document.querySelector(".fp-ui")
  }

  settingSelector(): string {
    return ""
  }
}

export default Onvix;
