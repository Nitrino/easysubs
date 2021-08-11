import { createEvent } from "effector";

export const toggleEnableState = createEvent("Toggle extension enable state");
export const toggleShowProgressBarState = createEvent("Toggle show progress bar state");
export const toggleRewindBySubsState = createEvent("Toggle show progress bar state");
export const toggleShowSubsBackgroundState = createEvent("Toggle show subs background");
export const setUserLanguage = createEvent("Set user language");
export const setLearningService = createEvent("Set learning service");

export const updateSubs = createEvent("Update subtitles");
export const videoTimeUpdate = createEvent("Video time update");
export const toggleShowFullSubTranslatePopup = createEvent("Toggle show full sub translate popup");

export const toggleAutoPause = createEvent("Toggle auto pause");

export const setSubsFontSize = createEvent("Set subs font size");
