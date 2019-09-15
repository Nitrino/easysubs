import { subTitleType } from "subtitle";
import Video from "./video";
import Utils from "./utils";

class Subs {
  static updateSubs(video: HTMLVideoElement, subs: subTitleType[], subsElement: HTMLElement) {
    let currentTime = Video.getCurrentTime(video);
    let currentSub = this.getCurrentSub(subs, currentTime);
    if (currentSub) {
      subsElement.innerHTML = currentSub.text.replace(/\b(\w+)\b/g, "<span class='easysubs-word'>$1</span>");
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

  static updateSubsProgressBar(subsProgressBarElement: HTMLElement, video: HTMLVideoElement, subs: subTitleType[]) {
    document.querySelectorAll(".easysubs-progress-bar-element").forEach(el => el.remove());

    const timePeriod = 30000; // 30 seconds
    const progressBarWidth = subsProgressBarElement.clientWidth;
    const msInPx = (progressBarWidth / timePeriod)
    const currentTime = Video.getCurrentTime(video);
    const leftBorder = currentTime + timePeriod / 2;
    const rightBorder = currentTime - timePeriod / 2;

    const subsInDuration = subs.filter(sub =>
      (sub.end > rightBorder && sub.end < leftBorder) ||
      (sub.start > rightBorder && sub.start < leftBorder)
    );

    subsInDuration.forEach(sub => {
      const subWidth = msInPx * (Utils.castSubTime(sub.end) - Utils.castSubTime(sub.start))
      let subDiv = document.createElement("div");
      subDiv.className = "easysubs-progress-bar-element"
      subDiv.style.width = subWidth + "px"
      subDiv.style.left = msInPx * (Utils.castSubTime(sub.start) - rightBorder) + "px"
      subsProgressBarElement.appendChild(subDiv)
    });
  }
}
export default Subs;
