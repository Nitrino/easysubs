import { $streaming } from "@src/models/streamings";
import { videoPageKey } from "./translationCache";

// The video playing, for what's remembered per video (found subtitles, their pin on the main line): the service's own
// id where its page doesn't change between videos (Jellyfin's hash routes, InOriginal's playlists), the page otherwise
export function currentVideoPage(): string {
  try {
    const key = $streaming.getState().getVideoKey?.();
    if (key) return key;
  } catch (error) {
    console.error(error);
  }
  return videoPageKey(location);
}
