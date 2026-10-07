import type { Captions } from "@src/models/types";
import { plainCueText } from "./anchorSubs";

// Lines a found file shouldn't show: ads that subtitle sites add (OpenSubtitles puts them in free-tier files), so they
// never get word popovers; and, when asked, sound descriptions of hearing-impaired files.

const AD_PATTERNS = [
  /\b(opensubtitles|osdb\.link|addic7ed|subdl|subsource|subscene|podnapisi|yifysubtitles)\b/i,
  /^advertise your product or brand here/i,
  /^support us and become vip member/i,
  /^(please )?rate this subtitle/i,
];

export const isAdLine = (text: string) => {
  const plain = plainCueText(text).replace(/\n/g, " ");
  return AD_PATTERNS.some((pattern) => pattern.test(plain));
};

// "[door creaks]", "(SIGHS)", "♪ la la ♪", "JOHN: Hello" → "Hello". Parentheses go only when they hold no lower-case
// letter, since dialogue uses them too.
export function stripSoundDescriptions(text: string): string {
  return (
    text
      .split(/\r?\n/)
      .map((line) =>
        line
          .replace(/\[[^\]]*\]/g, "")
          .replace(/\((?:[^)\p{Ll}])*\)/gu, "")
          .replace(/[♪♫][^♪♫]*[♪♫]?/g, "")
          .replace(/^(\s*(?:<[^>]+>)*\s*-?\s*)[\p{Lu}][\p{Lu}\d .'-]+:\s*/u, "$1")
          .replace(/\s{2,}/g, " ")
          .trim(),
      )
      // A dash left alone, or a tag with nothing in it
      .filter((line) => plainCueText(line).replace(/^-\s*$/, "") !== "")
      .join("\n")
  );
}

export function cleanFoundCaptions(captions: Captions, { stripSdh = false }: { stripSdh?: boolean } = {}): Captions {
  return captions
    .filter((cue) => !isAdLine(cue.text))
    .map((cue) => (stripSdh ? { ...cue, text: stripSoundDescriptions(cue.text) } : cue))
    .filter((cue) => plainCueText(cue.text) !== "")
    .sort((a, b) => Number(a.start) - Number(b.start));
}
