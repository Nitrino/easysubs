export const castSubTime = (time: number | string) => {
  return typeof time === 'number' ? time : parseInt(time, 10)
}
