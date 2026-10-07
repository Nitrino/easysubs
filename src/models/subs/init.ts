import { sample, split } from "effector";
import {
  $currentSubs,
  $rawSubs,
  $subs,
  $subsDelay,
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
  $subsLanguage,
  subsLanguageDetectFx,
  $subsTitle,
  subsReloadRequested,
  ES_CUSTOM_SUB_LABEL,
  rawSubsAdded,
  $pinnedSubs,
  $serviceRawSubs,
  $serviceSubsLabel,
  isOwnSubsLabel,
  ownSubsLoaded,
} from ".";
import { currentVideoPage } from "@src/utils/videoKey";
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

// The service's tracks only, and not while a found file is the main line of this video
sample({
  clock: subsRequested,
  source: { streaming: $streaming, pinned: $pinnedSubs },
  filter: ({ pinned }, language) => !isOwnSubsLabel(language) && pinned?.page !== currentVideoPage(),
  fn: ({ streaming }, language) => ({ streaming, language }),
  target: fetchSubsFx,
});

$serviceSubsLabel.on(esSubsChanged, (label, value) => (value && !isOwnSubsLabel(value) ? value : label));
$serviceRawSubs.on(fetchSubsFx.doneData, (_, subs) => subs ?? []);
$rawSubs.on(ownSubsLoaded, (_, { captions }) => captions);
$subsTitle.on(ownSubsLoaded, (_, { label }) => label);
// New subtitles arrive unshifted
$subsDelay.reset(esSubsChanged, updateCustomSubsFx.done);

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
    if (currentSubs[0]) {
      const timeDiff = currentSubs[0].end - video.currentTime * 1000;
      return autoPause && timeDiff < 250 && timeDiff > 0;
    }
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

sample({
  clock: $subs,
  filter: (subs) => subs.length > 0,
  target: subsLanguageDetectFx,
});

sample({
  clock: subsReloadRequested,
  source: { subsTitle: $subsTitle, rawSubs: $rawSubs },
  filter: ({ subsTitle, rawSubs }) => subsTitle && rawSubs.length > 0,
  fn: ({ subsTitle }) => subsTitle,
  target: esSubsChanged,
});

$rawSubs.on([subsResyncFx.doneData, updateCustomSubsFx.doneData], (_, subs) => subs);
// A service track that arrives after a found file was pinned on this video (a fetch already under way) stays out
sample({
  clock: fetchSubsFx.doneData,
  source: $pinnedSubs,
  filter: (pinned) => pinned?.page !== currentVideoPage(),
  fn: (_, subs) => subs,
  target: $rawSubs,
});

// On-flight services push the currently visible phrase on every DOM mutation,
// so the same phrase arrives several times — skip the store update for repeats
// A found file pinned on the main line isn't replaced by them either
sample({
  clock: rawSubsAdded,
  source: { oldSubs: $rawSubs, pinned: $pinnedSubs },
  filter: ({ oldSubs, pinned }, newSubs) =>
    pinned?.page !== currentVideoPage() && oldSubs[oldSubs.length - 1]?.text !== newSubs[0]?.text,
  fn: (_, newSubs) => newSubs,
  target: $rawSubs,
});

$rawSubs.reset(resetSubs);
$currentSubs.on(updateCurrentSubsFx.doneData, (oldSubs, subs) =>
  JSON.stringify(oldSubs) === JSON.stringify(subs) ? oldSubs : subs,
);

$subsDelay.on(subsDelayChangeFx.doneData, (_, newSubsDelay) => newSubsDelay);
$subsLanguage.on(subsLanguageDetectFx.doneData, (_, lang) => lang);
$subsTitle.on(esSubsChanged, (_, value) => value);
$subsTitle.on(updateCustomSubsFx.doneData, () => ES_CUSTOM_SUB_LABEL);

debug(
  $rawSubs,
  $subs,
  $subsDelay,
  subsResyncFx,
  autoPauseFx.doneData,
  $currentSubs,
  subsReloadRequested,
  $subsTitle,
  esSubsChanged,
  subsLanguageDetectFx,
);
