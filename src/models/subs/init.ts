import { sample } from "effector";
import {
  $currentSubs,
  $rawSubs,
  $subs,
  $subsDelay,
  esSubsChanged,
  fetchSubsFx,
  subsDelayButtonPressed,
  subsDelayChangeFx,
  subsResyncFx,
  updateCurrentSubsFx,
  updateCustomSubsFx,
} from ".";
import { $streaming } from "../streamings";
import { $video, videoTimeUpdate } from "../videos";

sample({
  clock: esSubsChanged,
  source: $streaming,
  fn: (streaming, language) => ({ streaming, language }),
  target: fetchSubsFx,
});

sample({
  clock: [videoTimeUpdate, $rawSubs],
  source: { subs: $subs, video: $video },
  fn: ({ subs, video }, _) => ({ subs, video }),
  target: updateCurrentSubsFx,
});

sample({
  clock: subsDelayButtonPressed,
  target: subsDelayChangeFx,
});

sample({
  clock: subsDelayButtonPressed,
  source: { rawSubs: $rawSubs, subsDelay: $subsDelay },
  fn: ({ rawSubs, subsDelay }, delay) => ({ rawSubs, subsDelay, delay }),
  target: subsResyncFx,
});

$rawSubs.on([fetchSubsFx.doneData, subsResyncFx.doneData, updateCustomSubsFx.doneData], (_, subs) => subs);
$currentSubs.on(updateCurrentSubsFx.doneData, (_, subs) => subs);
$subsDelay.on(subsDelayChangeFx.doneData, (_, newSubsDelay) => newSubsDelay);
