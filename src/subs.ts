import { subTitleType } from "subtitle";
import Video from "./video";
class Subs {
  static updateSubs(video: HTMLVideoElement, subs: subTitleType[], subsElement: HTMLElement) {
    let currentTime = Video.getCurrentTime(video);
    let currentSub = this.getCurrentSub(subs, currentTime);
    if (currentSub) {
      subsElement.innerHTML = currentSub.text.split(" ").map(m => { return `<span>${m}</span>` }).join(" ");
    } else {
      subsElement.innerHTML = "";
    }
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
      return subs.find((sub, index) => sub.end <= currentTime && subs[index + 1].start >= currentTime)
    }
  }

  static getNextSub(subs: subTitleType[], currentTime: number): subTitleType {
    let currentSub = Subs.getCurrentSub(subs, currentTime);
    if (currentSub) {
      let indexCurrentSub = subs.findIndex(sub => sub == currentSub)
      return subs[indexCurrentSub + 1]
    } else {
      return subs.find((sub, index) => sub.start > currentTime && subs[index - 1].end >= currentTime)
    }
  }
}
export default Subs;
