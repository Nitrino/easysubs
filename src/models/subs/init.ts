import { sample, split } from "effector";
import {
  $currentSubs,
  $rawSubs,
  $subs,
  $subsDelay,
  $activePhrasalVerb,
  activePhrasalVerbChanged,
  esSubsChanged,
  fetchSubsFx,
  resetSubs,
  subsDelayButtonPressed,
  subsDelayChangeFx,
  subsRequested,
  subsResyncFx,
  updateCurrentSubsFx,
  updateCustomSubsFx,
  autoPauseFx,
} from ".";
import { $streaming } from "../streamings";
import { $video, videoTimeUpdate } from "../videos";
import { $autoPause } from "../settings";
import { debug } from "patronum";

split({
  source: esSubsChanged,
  match: {
    hasLanguage: (language) => !!language,
    noLanguage: (language) => !language,
  },
  cases: {
    hasLanguage: subsRequested,
    noLanguage: resetSubs,
  },
});

sample({
  clock: subsRequested,
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
  clock: videoTimeUpdate,
  source: { currentSubs: $currentSubs, video: $video, autoPause: $autoPause },
  fn: ({ currentSubs, video, autoPause }, _) => ({ currentSubs, video, autoPause }),
  filter: ({ currentSubs, video, autoPause }) => {
    const timeDiff = currentSubs[0].end - video.currentTime * 1000;
    return autoPause && timeDiff < 250 && timeDiff > 0;
  },
  target: autoPauseFx,
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
$rawSubs.reset(resetSubs);
$currentSubs.on([updateCurrentSubsFx.doneData, autoPauseFx.doneData], (oldSubs, subs) =>
  JSON.stringify(oldSubs) === JSON.stringify(subs) ? oldSubs : subs
);

$subsDelay.on(subsDelayChangeFx.doneData, (_, newSubsDelay) => newSubsDelay);
$activePhrasalVerb.on(activePhrasalVerbChanged, (_, phrasalVerb) => phrasalVerb);

debug($rawSubs, $subs, $subsDelay, subsResyncFx, fetchSubsFx, $activePhrasalVerb, autoPauseFx.doneData, $currentSubs);
