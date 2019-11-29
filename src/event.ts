import { createEvent } from "effector";

export const toggleEnableState = createEvent("Toggle extension enable state");
export const setUserLanguage = createEvent("Set user language");
export const setLearningService = createEvent("Set learning service");

export const updateSubs = createEvent("Update subtitles");
export const videoTimeUpdate = createEvent("Video time update");
export const toggleShowFullSubTranslatePopup = createEvent("Toggle show full sub translate popup");
