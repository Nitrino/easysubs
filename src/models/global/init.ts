import { $enabled, setEnabledFx, fetchEnabledFx } from './'

$enabled.on(setEnabledFx.doneData, (_, enabled) => enabled)

$enabled.watch((enabled) => {
  console.log('enabled watch', enabled)
})
