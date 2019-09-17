import { parse } from "subtitle";

class Onvix {
  static getSubs(language: string) {
    const base_path = "https://ageofultron.site/api/v1/streaming/serials/"
    const serial = window.location.pathname.split("/")[2]
    const stream = window.location.search.split("&")[0].split("=")[1]
    const season = window.location.search.split("&")[1]
    const episode = window.location.search.split("&")[2]
    // https://ageofultron.site/api/v1/streaming/serials/046cae0eeec8e111/a070a81585fa7856.json?season=7&episode=1
    const url = base_path + serial + "/" + stream + ".json?" + season + "&" + episode

    return fetch(url)
      .then((resp) => resp.json())
      .then(function (data) {
        const subs_url = data.media_files.vtt.find((el: { srclang: string }) => el.srclang === language).src
        return fetch(subs_url).then((resp) => resp.text())
      })
      .then(function (text) {
        return parse(text)
      })
  }

  static createSubsElement() {
    const subsElementId = "easysubs";
    const prevSubsElement = document.getElementById(subsElementId)
    if (prevSubsElement != null) {
      prevSubsElement.remove()
    }

    const playerElement = document.querySelector(".fp-ui");
    let pTag = document.createElement("p");
    pTag.id = subsElementId;
    const textNode = document.createTextNode("Loading subtitles ...");
    pTag.appendChild(textNode);
    playerElement.appendChild(pTag);
    return pTag;
  }

  static createSubsTranslateElement(subs: HTMLElement, originalText: string, translatedText: string) {
    let translateTag = document.createElement("div");
    translateTag.className = "easysubs-word-translate";
    translateTag.innerHTML = "<span class='easysubs-word-original'>" + originalText + "</span>" +
      "<hr>" + "<span class='easysubs-word-translated'>" + translatedText + "</span>"
    subs.appendChild(translateTag);
    return translateTag;
  }

  static createSubsProgressBarElement() {
    let progressBarClass = "easysubs-progress-bar"
    const prevProgressBarElement = document.querySelector("." + progressBarClass)
    if (prevProgressBarElement != null) {
      prevProgressBarElement.remove()
    }

    let progressBarTag = document.createElement("div");
    progressBarTag.className = progressBarClass;
    let playerContainerElement = document.querySelector(".fp-ui")
    playerContainerElement.appendChild(progressBarTag)
    return progressBarTag
  }
}

export default Onvix;
