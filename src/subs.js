class Subs {
  static updateSubs(video, subs, subsElement) {
    let currentTime = Math.round(video.currentTime * 1000)
    let currentSub = subs.find(sub => sub.start <= currentTime && sub.end >= currentTime)
    if (currentSub) {
      subsElement.textContent = currentSub.text;
    } else {
      subsElement.textContent = "";
    }
  }
}
export default Subs;