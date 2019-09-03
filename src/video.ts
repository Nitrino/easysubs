import Subs from "./subs";
import { subTitleType } from "subtitle";
class Video {
  static getCurrentTime(video: HTMLVideoElement) {
    return Math.round(video.currentTime * 1000)
  }

  static moveToPrevSub(video: HTMLVideoElement, subs: subTitleType[]) {
    let currentTime = this.getCurrentTime(video);
    let prevSub: subTitleType = Subs.getPrevSub(subs, currentTime);
    this.moveToTime(video, prevSub.start)
  }

  static moveToNextSub(video: HTMLVideoElement, subs: subTitleType[]) {
    let currentTime = this.getCurrentTime(video);
    let nextSub: subTitleType = Subs.getNextSub(subs, currentTime);
    this.moveToTime(video, nextSub.start)
  }

  static moveToTime(video: HTMLVideoElement, time: number | string) {
    if (typeof time == "number") {
      video.currentTime = time / 1000
    } else {
      video.currentTime = parseInt(time) / 1000
    }
  }
}
export default Video;
