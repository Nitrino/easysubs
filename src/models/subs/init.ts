import { sample } from 'effector'
import isEqual from 'lodash/isEqual'

import { $subs, $rawSubs, $currentSubs, fetchSubsFx, updateCurrentSubsFx } from '.'
import { getCurrentSubs } from './utils/getCurrentSubs'
import { videoTimeUpdate } from '@/models/videos'

$rawSubs.on(fetchSubsFx.doneData, (_, subs) => subs)
$currentSubs.on(updateCurrentSubsFx.doneData, (state, subs) => {
  if (isEqual(state, subs)) {
    return undefined
  }
  return subs
})

fetchSubsFx.use(async ({ language, streaming }) => streaming.getSubs(language))
updateCurrentSubsFx.use(async ({ subs, time }) => getCurrentSubs(subs, time))

sample({
  clock: videoTimeUpdate,
  source: $subs,
  fn: (subs, time) => ({ subs, time }),
  target: updateCurrentSubsFx,
})

$subs.watch((subs) => console.log('SUBS ', subs))
$rawSubs.watch((subs) => console.log('$rawSubs ', subs))
$currentSubs.watch((subs) => console.log('$currentSubs ', subs))
