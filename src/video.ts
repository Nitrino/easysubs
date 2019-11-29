import { subTitleType } from "subtitle";
import Subs from "./subs";
import Utils from "./utils";

const rewindTime = 5000;

class Video {
  public static getCurrentTime(video: HTMLVideoElement) {
    return Math.round(video.currentTime * 1000);
  }

  public static moveToPrevSub(video: HTMLVideoElement, subs: subTitleType[]) {
    const currentTime = this.getCurrentTime(video);
    const prevSub: subTitleType = Subs.getPrevSub(subs, currentTime);

    if (prevSub && currentTime - Utils.castSubTime(prevSub.end) < 5000) {
      this.moveToTime(video, Utils.castSubTime(prevSub.start));
    } else {
      this.moveToTime(video, Utils.castSubTime(currentTime - rewindTime));
    }
  }

  public static moveToNextSub(video: HTMLVideoElement, subs: subTitleType[]) {
    const currentTime = this.getCurrentTime(video);
    const nextSub: subTitleType = Subs.getNextSub(subs, currentTime);

    if (nextSub && Utils.castSubTime(nextSub.start) - currentTime < 5000) {
      this.moveToTime(video, Utils.castSubTime(nextSub.start));
    } else {
      this.moveToTime(video, Utils.castSubTime(currentTime + rewindTime));
    }
  }

  public static moveToTime(video: HTMLVideoElement, time: number | string) {
    video.currentTime = Utils.castSubTime(time) / 1000;
  }
}
export default Video;
