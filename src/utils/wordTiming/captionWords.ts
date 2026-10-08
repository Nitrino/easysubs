import type Service from "@src/streamings/service";
import type { TTimedWord } from "@src/models/types";

const baseLanguage = (code: string) => code.toLowerCase().split(/[-_]/)[0];

// The words of the video's auto-generated captions in a language, in video ms. YouTube times every word of them
// (src/streamings/youtube.ts); its tracks of them are labelled "track:en:asr". Empty when the video has none.
export async function captionWordsOfVideo(streaming: Service, language: string): Promise<TTimedWord[]> {
  const tracks = (await streaming.getSubsTracks?.()) ?? [];
  const track = tracks.find(
    (candidate) => candidate.label.endsWith(":asr") && baseLanguage(candidate.language) === baseLanguage(language),
  );
  if (!track) return [];

  const captions = await streaming.getSubs(track.label);
  return captions.flatMap((cue) =>
    (cue.words ?? []).map((word) => ({
      text: word.text.trim(),
      start: Number(cue.start) + word.start,
      end: Number(cue.start) + word.end,
    })),
  );
}
