class Utils {
  static castSubTime(time: number | string) {
    return typeof time == "number" ? time : parseInt(time)
  }
}

export default Utils
