import Service from "@src/streamings/service";

export const moveVideoToTime = (video: HTMLVideoElement, streaming: Service, time: number) => {
  if (streaming.constructor.name.toLowerCase() === "netflix") {
    window.dispatchEvent(new CustomEvent("esNetflixSeek", { detail: time }));
  } else {
    video.currentTime = time / 1000;
  }
};
