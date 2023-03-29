import { sample } from 'effector'
import isEqual from 'lodash/isEqual'
import { resync } from 'subtitle'

import {
  $subs,
  $rawSubs,
  $currentSubs,
  $subsDelay,
  $subsSize,
  fetchSubsFx,
  fetchCustomSubsFx,
  updateCurrentSubsFx,
  updateSubsDelayFx,
  updatesubsSizeFx,
  resyncSubsFx,
} from '.'
import { getCurrentSubs } from './utils/getCurrentSubs'
import { $video, videoTimeUpdate } from '@/models/videos'

$rawSubs.on([fetchSubsFx.doneData, fetchCustomSubsFx.doneData], (_, subs) => subs)
$rawSubs.on(resyncSubsFx.doneData, (subs, { currentDelay, delay }) => resync(subs, (delay - currentDelay) * 1000))
$subsDelay.on(updateSubsDelayFx.doneData, (_, delay) => delay)
$subsSize.on(updatesubsSizeFx.doneData, (_, size) => size)
$currentSubs.on(updateCurrentSubsFx.doneData, (state, subs) => {
  if (isEqual(state, subs)) {
    return undefined
  }
  return subs
})

fetchSubsFx.use(async ({ language, streaming }) => streaming.getSubs(language))
updateCurrentSubsFx.use(async ({ subs, video }) => getCurrentSubs(subs, video!.currentTime * 1000))
updateSubsDelayFx.use(async (delay) => delay)

sample({
  clock: [videoTimeUpdate, $rawSubs],
  source: { subs: $subs, video: $video },
  fn: ({ subs, video }, _) => ({ subs, video }),
  target: updateCurrentSubsFx,
})

sample({
  clock: updateSubsDelayFx,
  source: $subsDelay,
  fn: (currentDelay, delay) => ({ currentDelay, delay }),
  target: resyncSubsFx,
})

$subs.watch((subs) => console.log('SUBS ', subs))
$rawSubs.watch((subs) => console.log('$rawSubs ', subs))
$currentSubs.watch((subs) => console.log('$currentSubs ', subs))
$subsDelay.watch((delay) => console.log('$subsDelay ', delay))
