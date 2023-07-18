import { $video, getCurrentVideoFx, move } from "./index";

const TIME_SEEK_TIME = 5000;

$video.on(getCurrentVideoFx.doneData, (_, video) => video);
getCurrentVideoFx.use(async () => document.querySelector("video")!);

move.next.use(async ({ video, subs }) => {
  if (video === null) {
    return;
  }

  const currentTime = video.currentTime * 1000;
  const nextSub = subs.find((sub) => sub.start >= currentTime);
  console.log("nextSub", nextSub);

  const isNextSubClose =
    nextSub && nextSub.start - currentTime <= TIME_SEEK_TIME;

  if (nextSub && isNextSubClose) {
    video.currentTime = nextSub.start / 1000;
  } else {
    video.currentTime += TIME_SEEK_TIME / 1000;
  }
});

move.prev.use(async ({ video, subs }) => {
  if (video === null) {
    return;
  }

  const currentTime = video.currentTime * 1000;
  const prevSub = subs
    .slice()
    .reverse()
    .find((sub) => sub.end <= currentTime);

  const isPrevSubClose = prevSub && currentTime - prevSub.end <= TIME_SEEK_TIME;

  if (prevSub && isPrevSubClose) {
    video.currentTime = prevSub.start / 1000;
  } else {
    video.currentTime -= TIME_SEEK_TIME / 1000;
  }
});
