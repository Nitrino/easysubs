export const getCurrentVideoTime = (video: HTMLVideoElement) => {
  return Math.round(video.currentTime * 1000);
};
