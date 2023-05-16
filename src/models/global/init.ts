import {
  $enabled,
  $translateLanguage,
  $autoPause,
  $subsBackground,
  setEnabledFx,
  setSubsBackgroundFx,
  setTranslateLanguageFx,
  setAutoPauseFx
} from './'

$enabled.on(setEnabledFx.doneData, (_, enabled) => enabled)
$subsBackground.on(setSubsBackgroundFx.doneData, (_, enabled) => enabled)
$translateLanguage.on(setTranslateLanguageFx.doneData, (_, translateLanguage) => translateLanguage)
$autoPause.on(setAutoPauseFx.doneData, (_, autoPause) => autoPause)
