import { sample } from "effector";
import { $video, getCurrentVideoFx } from ".";
import { esRenderSetings } from "../settings";

sample({
  clock: esRenderSetings,
  target: getCurrentVideoFx,
});

$video.on(getCurrentVideoFx.doneData, (_, video) => video);
