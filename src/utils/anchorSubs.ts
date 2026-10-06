import type { Captions, TSub } from "@src/models/types";

type TTimed = { start: number; end: number };

const overlap = (a: TTimed, b: TTimed) => Math.max(0, Math.min(a.end, b.end) - Math.max(a.start, b.start));

// The text of a cue without markup (<i>, YouTube's timing tags), keeping its line breaks. DOMParser doesn't run
// scripts or load images of the subtitle text.
export function plainCueText(text: string): string {
  const html = text.replace(/<\d+:\d+:\d+\.\d+>|<\/?c>/g, "").replace(/\r\n?/g, "\n");
  const doc = new DOMParser().parseFromString(html.replace(/\n/g, "<br>"), "text/html");
  doc.querySelectorAll("br").forEach((br) => br.replaceWith("\n"));
  return (doc.body.textContent ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .join("\n");
}

// Pairs the cues of a second track with the main subtitles: each second cue goes to the main cue it overlaps by at
// least half its own length, so both lines appear and leave together, and a sentence the second track splits in two
// is joined back. Second cues that fall between main cues are dropped. Returns the second line by main cue id.
export function anchorSubs(main: TSub[], secondary: Captions): Record<number, string> {
  const byLine: Record<number, string> = {};
  // Both tracks are sorted by start time, so a second cue never pairs with a main cue that ended before it
  let first = 0;

  for (const cue of secondary) {
    const line = { start: Number(cue.start), end: Number(cue.end) };
    const text = plainCueText(cue.text);
    if (!text) continue;

    while (first < main.length && main[first].end <= line.start) first++;
    const half = (line.end - line.start) / 2;
    for (let index = first; index < main.length && main[index].start <= line.end; index++) {
      const sub = main[index];
      // A cue without length pairs with the main cue it sits in
      const pairs = half > 0 ? overlap(sub, line) >= half : sub.start <= line.start && line.start < sub.end;
      if (pairs) {
        byLine[sub.id] = byLine[sub.id] ? `${byLine[sub.id]} ${text}` : text;
        break;
      }
    }
  }

  return byLine;
}
