import { createEvent } from 'effector'
import { subTitleType } from 'subtitle'

export const toggleEnableState = createEvent<boolean>('Toggle extension enable state')
export const toggleShowProgressBarState = createEvent<boolean>('Toggle show progress bar state')
export const toggleShowSubsBackgroundState = createEvent<boolean>('Toggle show subs background')
export const setUserLanguage = createEvent<string>('Set user language')
export const setLearningService = createEvent<string>('Set learning service')

export const updateSubs = createEvent<subTitleType[]>('Update subtitles')
export const videoTimeUpdate = createEvent('Video time update')
export const toggleShowFullSubTranslatePopup = createEvent<boolean>('Toggle show full sub translate popup')

export const toggleAutoPause = createEvent<boolean>('Toggle auto pause')

export const setSubsFontSize = createEvent<number>('Set subs font size')
