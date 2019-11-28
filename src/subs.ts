import { subTitleType } from "subtitle";
import Video from "./video";
import Utils from "./utils";
import anime from "animejs"

const subsAnimateDuration: number = 300;
const subsAnimateCompensationGap: number = subsAnimateDuration / 2 // Motion animation compensation

class Subs {
  static getCurrentSubText(video: HTMLVideoElement, subs: subTitleType[]): string {
    let currentTime = Video.getCurrentTime(video);
    let currentSub = this.getCurrentSub(subs, currentTime);
    return currentSub?.text || "";
  }

  static subTextToChildNodesArray(text: string): ChildNode[] {
    const tmpDiv = <HTMLDivElement>document.createElement("div")
    tmpDiv.innerHTML = text.replace(/<\d+:\d+:\d+.\d+><c>/g, '').replace(/<\/c>/g, '')
    return Array.from(tmpDiv.childNodes)
  }

  static getCleanSubText(text: string): string {
    const tmpDiv = <HTMLDivElement>document.createElement("div")
    tmpDiv.innerHTML = text.replace(/<\d+:\d+:\d+.\d+><c>/g, '').replace(/<\/c>/g, '')
    return tmpDiv.textContent
  }

  static getCurrentSubInnerHtml(video: HTMLVideoElement, subs: subTitleType[]): string {
    let currentTime = Video.getCurrentTime(video);
    let currentSub = this.getCurrentSub(subs, currentTime);
    let sub = ""
    if (currentSub) {
      sub = currentSub.text
        .replace(/<\d+:\d+:\d+.\d+><c>/g, '')
        .replace(/<\/c>/g, '')
        .replace(/(^|<\/?[^>]+>|\s+)([^\s<]+)/g, '$1<span class="easysubs-word">$2</span>');
    }
    return sub
  }

  static getCurrentSub(subs: subTitleType[], currentTime: number) {
    return subs.find((sub: subTitleType) => sub.start <= currentTime && sub.end >= currentTime)
  }

  static getPrevSub(subs: subTitleType[], currentTime: number): subTitleType {
    let currentSub = Subs.getCurrentSub(subs, currentTime);
    if (currentSub) {
      let indexCurrentSub = subs.findIndex(sub => sub == currentSub)
      return subs[indexCurrentSub - 1]
    } else {
      return subs.find((sub, index) => {
        if (subs[index + 1] == null) {
          return null
        }
        return sub.end <= currentTime && subs[index + 1].start >= currentTime
      })
    }
  }

  static getNextSub(subs: subTitleType[], currentTime: number): subTitleType {
    let currentSub = Subs.getCurrentSub(subs, currentTime);
    if (currentSub) {
      let indexCurrentSub = subs.findIndex(sub => sub == currentSub)
      return subs[indexCurrentSub + 1]
    } else {
      return subs.find(sub => sub.start >= currentTime)
    }
  }
}
export default Subs;
