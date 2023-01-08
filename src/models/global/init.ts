import { $enabled, $translateLanguage, setEnabledFx, setTranslateLanguageFx } from './'

$enabled.on(setEnabledFx.doneData, (_, enabled) => enabled)
$translateLanguage.on(setTranslateLanguageFx.doneData, (_, translateLanguage) => translateLanguage)
