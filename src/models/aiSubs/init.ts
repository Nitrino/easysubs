import { sample, scopeBind } from "effector";
import { debug } from "patronum";

import {
  $aiCaptions,
  $aiStatus,
  $aiSubs,
  $aiTranscribed,
  $aiWords,
  aiLanguagePicked,
  aiStatusChanged,
  aiSubsReplaced,
  aiSubsRequested,
  aiSubsStopped,
  aiWordsRecognized,
  startAiSessionFx,
  stopAiSessionFx,
} from ".";
import {
  $pinnedSubs,
  $serviceSubsLabel,
  AI_SUBS_LABEL,
  esSubsChanged,
  fetchSubsFx,
  ownSubsLoaded,
  resetSubs,
  updateCustomSubsFx,
} from "../subs";
import { $video, videoTimeUpdate } from "../videos";
import { $aiSubsLanguage } from "../settings";
import { AudioSession } from "@src/audio/session";
import { currentVideoPage } from "@src/utils/videoKey";
import { addInterval } from "@src/utils/wordTiming/speech";

// ---- The session ---------------------------------------------------------------------------------

let session: AudioSession | null = null;

// Whisper only, on what plays and what the player buffered ahead; loudness is enough to tell speech here
startAiSessionFx.use(({ video, language }) => {
  session?.stop();
  session = null;
  if (!video) throw new Error("No video on the page");
  const recognized = scopeBind(aiWordsRecognized, { safe: true });
  const status = scopeBind(aiStatusChanged, { safe: true });
  session = new AudioSession(
    video,
    { audio: "ahead", detector: "energy", whisper: true, aligner: false, consumer: "aiSubs" },
    {
      speechHeard: () => {},
      cueAligned: () => {},
      wordsRecognized: recognized,
      status: (source, value) => status({ source, status: value }),
      subs: () => [],
      language: () => language,
    },
  );
  void session.start();
});
stopAiSessionFx.use(() => {
  session?.stop();
  session = null;
});

// ---- Turning it on and off -----------------------------------------------------------------------

const started = sample({
  clock: aiSubsRequested,
  source: $aiSubsLanguage,
  fn: (language) => ({ page: currentVideoPage(), language }),
});
$aiSubs.on(started, (_, ai) => ai);
$aiSubsLanguage.on(aiLanguagePicked, (_, language) => language);
// Another language starts over
const relanguaged = sample({
  clock: aiLanguagePicked,
  source: $aiSubs,
  filter: (ai, language) => ai !== null && ai.language !== language,
  fn: (ai, language) => ({ ...ai, language }),
});
$aiSubs.on(relanguaged, (_, ai) => ai);

const stoppedHere = sample({ clock: aiSubsStopped, source: $aiSubs, filter: Boolean });
const stopped = sample({ clock: [stoppedHere, sample({ clock: aiSubsReplaced, source: $aiSubs, filter: Boolean })] });
$aiSubs.reset(stopped);
$aiWords.reset(started, relanguaged, stopped);
$aiTranscribed.reset(started, relanguaged, stopped);
$aiStatus.reset(started, relanguaged, stopped);
sample({ clock: stopped, target: stopAiSessionFx });

// The session starts with the video it listens to, and again for a new video element of the same page
sample({
  clock: [started, relanguaged],
  source: $video,
  fn: (video, { language }) => ({ video, language }),
  target: startAiSessionFx,
});
sample({
  clock: $video.updates,
  source: $aiSubs,
  filter: (ai, video) => ai !== null && video !== null,
  fn: (ai, video) => ({ video, language: ai.language }),
  target: startAiSessionFx,
});
$aiStatus.on(startAiSessionFx.failData, (status, error) => ({ ...status, audio: error.message }));

// Mounts the subtitles: a video without a track has none yet
sample({ clock: started, fn: () => AI_SUBS_LABEL, target: esSubsChanged });

// ---- The lines -----------------------------------------------------------------------------------

$aiWords.on(aiWordsRecognized, (words, { from, to, words: recognized }) =>
  [...words.filter((word) => word.start < from || word.start >= to), ...recognized].sort((a, b) => a.start - b.start),
);
// Windows next to each other join into one stretch
$aiTranscribed.on(aiWordsRecognized, (transcribed, { from, to }) => addInterval(transcribed, { start: from, end: to }));
$aiStatus.on(aiWordsRecognized, (status) => ({ ...status, whisper: "ready" }));
$aiStatus.on(aiStatusChanged, (status, { source, status: value }) => {
  // The model saying it loaded while it transcribes its first window isn't the window's end
  if (source === "whisper")
    return value === "ready" && status.whisper === "recognizing" ? status : { ...status, whisper: value };
  // Hearing the video ("listening"), or why not
  if (source === "speech") return { ...status, audio: value };
  return status;
});

// Each new word puts the lines on the main line, and the subtitles mounting puts them back over what was there
sample({
  clock: [$aiCaptions.updates, sample({ clock: esSubsChanged, filter: (label) => label === AI_SUBS_LABEL })],
  source: { ai: $aiSubs, captions: $aiCaptions },
  filter: ({ ai }) => ai !== null && ai.page === currentVideoPage(),
  fn: ({ captions }) => ({ label: AI_SUBS_LABEL, captions }),
  target: ownSubsLoaded,
});
// Pinned like a found file: the service's track changes don't replace the lines
$pinnedSubs.on(ownSubsLoaded, (pinned, { label }) =>
  label === AI_SUBS_LABEL ? { label, page: currentVideoPage() } : pinned,
);
$pinnedSubs.on(stopped, (pinned) => (pinned?.label === AI_SUBS_LABEL ? null : pinned));

// ---- Leaving -------------------------------------------------------------------------------------

// A found file or one of the user's on the main line takes its place
sample({
  clock: [sample({ clock: ownSubsLoaded, filter: ({ label }) => label !== AI_SUBS_LABEL }), updateCustomSubsFx.done],
  fn: () => undefined,
  target: aiSubsReplaced,
});

// Another video: its lines aren't shown over it, the service's own track comes when it announces it
const left = sample({
  clock: [videoTimeUpdate, esSubsChanged, fetchSubsFx.finally],
  source: $aiSubs,
  filter: (ai) => ai !== null && ai.page !== currentVideoPage(),
});
sample({ clock: left, fn: () => undefined, target: aiSubsReplaced });
sample({ clock: left, fn: () => "", target: resetSubs });

// Stopped from the settings: back to the service's track, if it had one
sample({
  clock: stoppedHere,
  source: $serviceSubsLabel,
  filter: Boolean,
  target: esSubsChanged,
});
sample({
  clock: stoppedHere,
  source: $serviceSubsLabel,
  filter: (label) => !label,
  fn: () => "",
  target: resetSubs,
});

debug($aiSubs, $aiStatus, aiWordsRecognized);
