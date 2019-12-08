import { subTitleType } from "subtitle";
import Video from "./video";

class Subs {
  public static getCurrentSubText(video: HTMLVideoElement, subs: subTitleType[]): string {
    const currentTime = Video.getCurrentTime(video);
    const currentSub = this.getCurrentSub(subs, currentTime);
    return currentSub?.text || "";
  }

  public static subTextToChildNodesArray(text: string): ChildNode[] {
    const tmpDiv = document.createElement("div") as HTMLDivElement
    tmpDiv.innerHTML = text.replace(/<.*?><c.*?>|<\/c>|<c.*?>|<\/c.*?>/g, '').replace(/[\r\n]+/g, " \r\n ")
    
    return Array.from(tmpDiv.childNodes)
  }

  public static getCleanSubText(text: string): string {
    const tmpDiv = document.createElement("div") as HTMLDivElement
    tmpDiv.innerHTML = text.replace(/<\d+:\d+:\d+.\d+><c>/g, '').replace(/<\/c>/g, '')
    return tmpDiv.textContent
  }

  public static getCurrentSub(subs: subTitleType[], currentTime: number) {
    return subs.find((sub: subTitleType) => sub.start <= currentTime && sub.end >= currentTime)
  }

  public static getPrevSub(subs: subTitleType[], currentTime: number): subTitleType {
    const currentSub = Subs.getCurrentSub(subs, currentTime);
    if (currentSub) {
      const indexCurrentSub = subs.findIndex(sub => sub === currentSub)
      return subs[indexCurrentSub - 1]
    } 

    return subs.find((sub, index) => {
      if (subs[index + 1] == null) {
        return null
      }
      return sub.end <= currentTime && subs[index + 1].start >= currentTime
    })
  }

  public static getNextSub(subs: subTitleType[], currentTime: number): subTitleType {
    const currentSub = Subs.getCurrentSub(subs, currentTime);
    if (currentSub) {
      const indexCurrentSub = subs.findIndex(sub => sub === currentSub)
      return subs[indexCurrentSub + 1]
    }
    
    return subs.find(sub => sub.start >= currentTime)
  }
}
export default Subs;
