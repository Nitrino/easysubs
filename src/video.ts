import Subs from "./subs";
import { subTitleType } from "subtitle";
import Utils from "./utils";

const moveSubGap = 50 // Delay to display subtitles after rewinding

class Video {
  static getCurrentTime(video: HTMLVideoElement) {
    return Math.round(video.currentTime * 1000)
  }

  static moveToPrevSub(video: HTMLVideoElement, subs: subTitleType[], subsProgressBarElement: HTMLDivElement) {
    let currentTime = this.getCurrentTime(video);
    let prevSub: subTitleType = Subs.getPrevSub(subs, currentTime);
    if (prevSub) {
      this.moveToTime(video, Utils.castSubTime(prevSub.start) - moveSubGap)
      Subs.updateSubsProgressBar(subsProgressBarElement, video, subs, true);
    }
  }

  static moveToNextSub(video: HTMLVideoElement, subs: subTitleType[], subsProgressBarElement: HTMLDivElement) {
    let currentTime = this.getCurrentTime(video);
    let nextSub: subTitleType = Subs.getNextSub(subs, currentTime);
    if (nextSub) {
      this.moveToTime(video, Utils.castSubTime(nextSub.start) - moveSubGap)
      Subs.updateSubsProgressBar(subsProgressBarElement, video, subs, true);
    }
  }

  static moveToTime(video: HTMLVideoElement, time: number | string) {
    video.currentTime = Utils.castSubTime(time) / 1000
  }
}
export default Video;
