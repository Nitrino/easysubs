import Subs from "./subs";
import { subTitleType } from "subtitle";
import Utils from "./utils";

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
    video.currentTime = Utils.castSubTime(time) / 1000
  }
}
export default Video;
