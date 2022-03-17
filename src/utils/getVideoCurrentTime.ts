export const getVideoCurrentTime = (video: HTMLVideoElement) => {
  return Math.round(video.currentTime * 1000)
}
