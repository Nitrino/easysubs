import Video from "./video"
import Utils from "./utils"
import UI from "./ui"
import Subs from "./subs"
import Netflix from "./services/netflix"
import { subTitleType } from "subtitle";
import { userLanguageStore } from "./store";

class EventsHandlers {
  videoElement: HTMLVideoElement;
  subs: subTitleType[];
  subsProgressBarElement: HTMLElement;
  subsElement: HTMLElement;
  resizeObserver: ResizeObserver;
  translateOriginalElement: HTMLElement;
  translateResultElement: HTMLElement;
  translateContainerElement: HTMLElement;
  translateAlternativeElement: HTMLElement;
  subsContainer: HTMLElement;

  constructor(videoElement: HTMLVideoElement, subs: subTitleType[], subsElement: HTMLElement, subsProgressBarElement: HTMLElement) {
    this.videoElement = videoElement;
    this.subs = subs;
    this.subsElement = subsElement;
    this.subsProgressBarElement = subsProgressBarElement;
    this.resizeObserver = this.createResizeObserver()
    this.keyboardHandler = this.keyboardHandler.bind(this)
    this.subsWordMouseOver = this.subsWordMouseOver.bind(this)
    this.videoOnTimeUpdate = this.videoOnTimeUpdate.bind(this)
    this.videoPause = this.videoPause.bind(this)
    this.createResizeObserver = this.createResizeObserver.bind(this)
    this.subsMouseEnter = this.subsMouseEnter.bind(this)
    this.subsMouseLeave = this.subsMouseLeave.bind(this)
    this.subsClick = this.subsClick.bind(this)
    this.translateOriginalElement = document.querySelector(".easysubs-translate-original")
    this.translateResultElement = document.querySelector(".easysubs-translate-result")
    this.translateAlternativeElement = document.querySelector(".easysubs-translate-alternative")
    this.translateContainerElement = document.querySelector(".easysubs-translate-container")
    this.subsContainer = document.querySelector("#easysubs");
  }

  addEvents() {
    const subsContainer = document.querySelector("#easysubs");
    ["keyup", "keydown", "keypress"].forEach(eventType => {
      document.addEventListener(eventType, this.keyboardHandler, true);
    })
    this.subsContainer.addEventListener("mouseenter", this.subsMouseEnter);
    this.subsContainer.addEventListener("mouseleave", this.subsMouseLeave);
    this.subsContainer.addEventListener("mouseover", this.subsWordMouseOver);
    this.videoElement.addEventListener("timeupdate", this.videoOnTimeUpdate);
    this.videoElement.addEventListener("pause", this.videoPause);
    this.resizeObserver.observe(this.subsProgressBarElement);
    this.subsElement.addEventListener("click", this.subsClick);
  }

  removeEvents() {
    ["keyup", "keydown", "keypress"].forEach(eventType => {
      document.removeEventListener(eventType, this.keyboardHandler, true);
    })
    this.subsContainer.removeEventListener("mouseenter", this.subsMouseEnter);
    this.subsContainer.removeEventListener("mouseleave", this.subsMouseLeave);
    this.subsContainer.removeEventListener("mouseover", this.subsWordMouseOver);
    this.videoElement.removeEventListener("timeupdate", this.videoOnTimeUpdate);
    this.videoElement.removeEventListener("pause", this.videoPause);
    this.resizeObserver.unobserve(this.subsProgressBarElement);
    this.subsElement.removeEventListener("click", this.subsClick);
  }

  private keyboardHandler(event: KeyboardEvent) {
    // TODO: Refactor to service method
    if (Utils.detectService().constructor.name == "Netflix") { return }

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
    window.showTranslation = false
    this.translateContainerElement.style.display = "none";
  }

  private subsWordMouseOver(event: MouseEvent) {
    let element = <HTMLSpanElement>event.target;

    if (element.className === 'easysubs-word') {
      const words = element.textContent.match(/[^\W\d](\w|[-']{1,2}(?=\w))*/)
      if (words == null) { return }

      window.showTranslation = true

      chrome.runtime.sendMessage({ contentScriptQuery: 'getSingleTranslation', text: words[0], lang: userLanguageStore.getState() }, (response) => {
        const mainTranslation = response[0][0][0]
        const alternativeTranslations = response[1] || []

        UI.setTranslation(
          this.translateContainerElement,
          this.translateOriginalElement,
          this.translateResultElement,
          words[0],
          mainTranslation,
          this.translateAlternativeElement,
          alternativeTranslations
        )
      });
    }
  }

  private videoOnTimeUpdate(event: Event) {
    const currentSub = Subs.updateSubs(this.videoElement, this.subs, this.subsElement);
    Subs.updateSubsProgressBar(this.subsProgressBarElement, this.videoElement, this.subs, this.videoElement.paused);
    if (currentSub == null && this.translateContainerElement.style.display != "none") {
      this.translateContainerElement.style.display = "none";
    }
  }

  private videoPause(event: Event) {
    Subs.updateSubsProgressBar(this.subsProgressBarElement, this.videoElement, this.subs, true);
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
    chrome.runtime.sendMessage({ contentScriptQuery: 'translate', text: text, lang: userLanguageStore.getState() }, (response) => {
      Utils.removeAllElements(document.querySelectorAll(".easysubs-word-translate"));
      UI.setTranslation(
        this.translateContainerElement,
        this.translateOriginalElement,
        this.translateResultElement,
        text,
        response.data[0],
        this.translateAlternativeElement,
        []
      )
    });
  }
}

export default EventsHandlers;
