import Video from "./video"
import Utils from "./utils"
import UI from "./ui"
import Subs from "./subs"
import { subTitleType } from "subtitle";

class EventsHandlers {
  videoElement: HTMLVideoElement;
  subs: subTitleType[];
  subsProgressBarElement: HTMLElement;
  subsElement: HTMLElement;
  resizeObserver: ResizeObserver;
  translateOriginalElement: HTMLElement;
  translateResultElement: HTMLElement;
  translateContainerElement: HTMLElement;

  constructor(videoElement: HTMLVideoElement, subs: subTitleType[], subsElement: HTMLElement, subsProgressBarElement: HTMLElement) {
    this.videoElement = videoElement;
    this.subs = subs;
    this.subsElement = subsElement;
    this.subsProgressBarElement = subsProgressBarElement;
    this.resizeObserver = this.createResizeObserver()
    this.keyboardHandler = this.keyboardHandler.bind(this)
    this.subsWordMouseOver = this.subsWordMouseOver.bind(this)
    this.subsWordMouseOut = this.subsWordMouseOut.bind(this)
    this.videoOnTimeUpdate = this.videoOnTimeUpdate.bind(this)
    this.createResizeObserver = this.createResizeObserver.bind(this)
    this.subsMouseEnter = this.subsMouseEnter.bind(this)
    this.subsMouseLeave = this.subsMouseLeave.bind(this)
    this.subsClick = this.subsClick.bind(this)
    this.translateOriginalElement = document.querySelector(".easysubs-translate-original")
    this.translateResultElement = document.querySelector(".easysubs-translate-result")
    this.translateContainerElement = document.querySelector(".easysubs-translate-container")
  }

  addEvents() {
    ["keyup", "keydown", "keypress"].forEach(eventType => {
      document.addEventListener(eventType, this.keyboardHandler, true);
    })
    this.subsElement.addEventListener("mouseenter", this.subsMouseEnter);
    this.subsElement.addEventListener("mouseleave", this.subsMouseLeave);
    document.addEventListener("mouseover", this.subsWordMouseOver);
    document.addEventListener("mouseout", this.subsWordMouseOut);
    this.videoElement.addEventListener("timeupdate", this.videoOnTimeUpdate);
    this.resizeObserver.observe(this.subsProgressBarElement);
    this.subsElement.addEventListener("click", this.subsClick);
  }

  removeEvents() {
    ["keyup", "keydown", "keypress"].forEach(eventType => {
      document.removeEventListener(eventType, this.keyboardHandler, true);
    })
    this.subsElement.removeEventListener("mouseenter", this.subsMouseEnter);
    this.subsElement.removeEventListener("mouseleave", this.subsMouseLeave);
    document.removeEventListener("mouseover", this.subsWordMouseOver);
    document.removeEventListener("mouseout", this.subsWordMouseOut);
    this.videoElement.removeEventListener("timeupdate", this.videoOnTimeUpdate);
    this.resizeObserver.unobserve(this.subsProgressBarElement);
    this.subsElement.removeEventListener("click", this.subsClick);
  }

  private keyboardHandler(event: KeyboardEvent) {
    if (event.code == "ArrowLeft") {
      event.stopPropagation();
      if (event.type == "keydown") { Video.moveToPrevSub(this.videoElement, this.subs, this.subsProgressBarElement) }
    } if (event.code == "ArrowRight") {
      event.stopPropagation();
      if (event.type == "keydown") { Video.moveToNextSub(this.videoElement, this.subs, this.subsProgressBarElement) }
    }
  }

  private subsMouseEnter() {
    this.videoElement.pause()
  }

  private subsMouseLeave() {
    this.videoElement.play()
  }

  private subsWordMouseOver(event: MouseEvent) {
    let element = <HTMLSpanElement>event.target;

    if (element.className === 'easysubs-word') {
      if (element.getElementsByClassName("easysubs-translate-container").length != 0) { return; }
      const word = element.textContent.match(/[^\W\d](\w|[-']{1,2}(?=\w))*/)[0]
      chrome.runtime.sendMessage({ contentScriptQuery: 'translate', text: word, lang: "ru" }, (response) => {
        UI.setTranslation(
          this.translateContainerElement,
          this.translateOriginalElement,
          this.translateResultElement,
          word,
          response.data[0]
        )
      });
    }
  }

  private subsWordMouseOut(event: MouseEvent) {
    let element = <HTMLSpanElement>event.target;
    if (element.className === 'easysubs-word') {
      this.translateContainerElement.style.display = "none";
    }
  }

  private videoOnTimeUpdate(event: Event) {
    const currentSub = Subs.updateSubs(this.videoElement, this.subs, this.subsElement);
    Subs.updateSubsProgressBar(this.subsProgressBarElement, this.videoElement, this.subs);
    if (currentSub == null && this.translateContainerElement.style.display != "none") {
      this.translateContainerElement.style.display = "none";
    }
  }

  private createResizeObserver() {
    return new ResizeObserver(() => {
      Subs.updateSubsProgressBar(this.subsProgressBarElement, this.videoElement, this.subs, true);
    });
  }

  private subsClick(event: Event) {
    const text = this.subsElement.textContent
    const element = <HTMLSpanElement>event.target;

    if (element.getElementsByClassName("easysubs-word-translate").length != 0) { return; }
    chrome.runtime.sendMessage({ contentScriptQuery: 'translate', text: text, lang: "ru" }, (response) => {
      Utils.removeAllElements(document.querySelectorAll(".easysubs-word-translate"));
      UI.setTranslation(
        this.translateContainerElement,
        this.translateOriginalElement,
        this.translateResultElement,
        text,
        response.data[0]
      )
    });
  }
}

export default EventsHandlers;
