import { subTitleType } from "subtitle";
import Video from "./video";
import Utils from "./utils";
import anime from "animejs"

const subsAnimateDuration: number = 300; 
const subsAnimateCompensationGap: number = subsAnimateDuration / 2 // Motion animation compensation

class Subs {
  static updateSubs(video: HTMLVideoElement, subs: subTitleType[], subsElement: HTMLElement) {
    let currentTime = Video.getCurrentTime(video);
    let currentSub = this.getCurrentSub(subs, currentTime);
    if (currentSub) {
      subsElement.innerHTML = currentSub.text.replace(
        /(^|<\/?[^>]+>|\s+)([^\s<]+)/g,
        '$1<span class="easysubs-word">$2</span>'
      );
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

  static updateSubsProgressBar(subsProgressBarElement: HTMLElement, video: HTMLVideoElement, subs: subTitleType[], hardMove: boolean = false) {
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

    let currentSubsIds: list<string> = []
    if (hardMove) {
      document.querySelectorAll(".easysubs-progress-bar-element").forEach(el => el.remove())
    }
    subsInDuration.forEach(sub => {
      const subId = sub.start + "-" + sub.end
      currentSubsIds.push(subId)
      const currentSub = document.getElementById(subId)

      if (currentSub) {
        anime({
          targets: currentSub,
          translateX: msInPx * ((Utils.castSubTime(sub.start) - rightBorder) - subsAnimateCompensationGap),
          easing: 'linear',
          duration: subsAnimateDuration
        });
      } else {
        const subWidth = msInPx * (Utils.castSubTime(sub.end) - Utils.castSubTime(sub.start))
        let subDiv = document.createElement("div");
        subDiv.className = "easysubs-progress-bar-element"
        subDiv.id = subId
        subDiv.style.width = subWidth.toFixed(0) + "px"
        subDiv.style.transform = 'translateX(' + msInPx * (Utils.castSubTime(sub.start) - rightBorder) + 'px)';
        subsProgressBarElement.appendChild(subDiv)
      }
    });

    async function removeOldProgressBarElements(subsInDuration: subTitleType[]) {
      document.querySelectorAll(".easysubs-progress-bar-element").forEach(el => {
        if (currentSubsIds.includes(el.id) == false) {
          el.remove()
        }
      });
    }
    removeOldProgressBarElements(subsInDuration);
  }
}
export default Subs;
