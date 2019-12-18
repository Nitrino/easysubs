import { subTitleType } from "subtitle";
import Subs from "./subs";
import Utils from "./utils";

const rewindTime = 5000;

class Video {
  public static getCurrentTime(video: HTMLVideoElement) {
    return Math.round(video.currentTime * 1000);
  }

  public static moveToPrevSub(video: HTMLVideoElement, subs: subTitleType[], force: boolean) {
    let timeToRewind = this.getCurrentTime(video);
    const currentSub = Subs.getCurrentSub(subs, timeToRewind);
    if (currentSub) {
      timeToRewind = Utils.castSubTime(currentSub.start);
    }

    const prevSub: subTitleType = Subs.getPrevSub(subs, timeToRewind);

    if (prevSub && (timeToRewind - Utils.castSubTime(prevSub.end) < 5000 || force)) {
      this.moveToTime(video, Utils.castSubTime(prevSub.start));
    } else {
      this.moveToTime(video, Utils.castSubTime(timeToRewind - rewindTime));
    }
  }

  public static moveToNextSub(video: HTMLVideoElement, subs: subTitleType[], force: boolean) {
    let timeToRewind = this.getCurrentTime(video);
    const currentSub = Subs.getCurrentSub(subs, timeToRewind);

    if (currentSub) {
      timeToRewind = Utils.castSubTime(currentSub.end);
    }
    const nextSub: subTitleType = Subs.getNextSub(subs, timeToRewind);

    if (nextSub && (Utils.castSubTime(nextSub.start) - timeToRewind < 5000 || force)) {
      this.moveToTime(video, Utils.castSubTime(nextSub.start));
    } else {
      this.moveToTime(video, Utils.castSubTime(timeToRewind + rewindTime));
    }
  }

  public static moveToTime(video: HTMLVideoElement, time: number | string) {
    Utils.isNetflix()
      ? window.dispatchEvent(new CustomEvent("easysubsSeek", { detail: Utils.castSubTime(time) }))
      : (video.currentTime = Utils.castSubTime(time) / 1000);
  }
}
export default Video;
