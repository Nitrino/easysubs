import Video from "./video"
import Utils from "./utils"
import UI from "./ui"
import Subs from "./subs"
import { subTitleType } from "subtitle";

class EventsHandlers {
  static keyup(event: KeyboardEvent, videoElement: HTMLVideoElement, subs: subTitleType[], subsProgressBarElement: HTMLElement) {
    if (event.code == "ArrowLeft") {
      event.stopPropagation();
      Video.moveToPrevSub(videoElement, subs, subsProgressBarElement);
    } if (event.code == "ArrowRight") {
      event.stopPropagation();
      Video.moveToNextSub(videoElement, subs, subsProgressBarElement);
    }
  }

  static mouseover(event: MouseEvent) {
    let element = <HTMLSpanElement>event.target;

    if (element.className === 'easysubs-word') {
      if (element.getElementsByClassName("easysubs-word-translate").length != 0) { return; }
      const word = element.textContent.match(/[^\W\d](\w|[-']{1,2}(?=\w))*/)[0]
      chrome.runtime.sendMessage({ contentScriptQuery: 'translate', text: word, lang: "ru" }, (response) => {
        Utils.removeAllElements(document.querySelectorAll(".easysubs-word-translate"));
        UI.createSubsTranslateElement(element, word, response.data[0]);
      });
    }
  }

  static mouseout(event: MouseEvent) {
    let element = <HTMLSpanElement>event.target;
    if (element.className === 'easysubs-word') {
      if (element.getElementsByClassName("easysubs-word-translate").length === 0) { return; }
      Utils.removeAllElements(document.querySelectorAll(".easysubs-word-translate"));
    }
  }

  static videoOntimeupdate(subs: subTitleType[], videoElement: HTMLVideoElement, subsElement: HTMLElement, subsProgressBarElement: HTMLElement) {
    videoElement.ontimeupdate = () => {
      Subs.updateSubs(videoElement, subs, subsElement);
      Subs.updateSubsProgressBar(subsProgressBarElement, videoElement, subs);
    };
  }

  static resizeSubsProgressBarElement(subsProgressBarElement: HTMLElement, videoElement: HTMLVideoElement, subs: subTitleType[]) {
    const resizeObserver = new ResizeObserver(() => {
      Subs.updateSubsProgressBar(subsProgressBarElement, videoElement, subs, true);
    });
    resizeObserver.observe(subsProgressBarElement);
  }
}

export default EventsHandlers;
