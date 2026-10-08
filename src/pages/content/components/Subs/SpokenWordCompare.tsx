import { FC, useEffect, useRef } from "react";
import { useUnit } from "effector-react";

import { $currentSubs } from "@src/models/subs";
import { $video } from "@src/models/videos";
import { $spokenWordCompare, $spokenWordEnabled } from "@src/models/settings";
import {
  $sourceStatus,
  $spokenWord,
  $wordTiming,
  SOURCE_NAMES,
  SOURCE_ORDER,
  wordTimesFor,
} from "@src/models/spokenWord";
import type { TWordTime, TWordTimingSource } from "@src/models/types";

// The sources the others are measured against, the most precise first
const REFERENCES: TWordTimingSource[] = ["file", "captions", "yandex", "aligned"];

// How far a source's word starts are from the reference's, on average, in ms
function startError(times: (TWordTime | null)[], reference: (TWordTime | null)[]): number | null {
  const errors = times
    .map((time, index) => (time && reference[index] ? Math.abs(time.start - reference[index].start) : null))
    .filter((error): error is number => error !== null);
  return errors.length ? errors.reduce((a, b) => a + b, 0) / errors.length : null;
}

// Every source's word times for the cue on screen, one lane each, with the playhead: for picking the best source
export const SpokenWordCompare: FC = () => {
  const [enabled, compare, currentSubs, timing, status, video, spokenWord] = useUnit([
    $spokenWordEnabled,
    $spokenWordCompare,
    $currentSubs,
    $wordTiming,
    $sourceStatus,
    $video,
    $spokenWord,
  ]);
  const playheadRef = useRef<HTMLDivElement>(null);
  const sub = currentSubs.find((cue) => cue.id === spokenWord?.cueId) ?? currentSubs[0];

  const lanes = sub ? SOURCE_ORDER.map((source) => ({ source, times: wordTimesFor(sub, source, timing) })) : [];
  const all = lanes.flatMap((lane) => lane.times ?? []).filter(Boolean);
  const from = Math.min(sub?.start ?? 0, ...all.map((time) => time.start)) - 200;
  const to = Math.max(sub?.end ?? 0, ...all.map((time) => time.end)) + 200;
  const position = (time: number) => `${((time - from) / (to - from)) * 100}%`;
  const reference = REFERENCES.map((source) => lanes.find((lane) => lane.source === source)).find((lane) =>
    lane?.times?.some(Boolean),
  );

  useEffect(() => {
    if (!enabled || !compare || !video) return;
    let frame = requestAnimationFrame(function move() {
      frame = requestAnimationFrame(move);
      if (playheadRef.current) playheadRef.current.style.left = position(video.currentTime * 1000);
    });
    return () => cancelAnimationFrame(frame);
  });

  if (!enabled || !compare || !sub) return null;

  return (
    <div className="es-spoken-compare" onClick={(event) => event.stopPropagation()}>
      {lanes.map(({ source, times }) => {
        const error =
          reference && times && reference !== lanes.find((lane) => lane.source === source)
            ? startError(times, reference.times)
            : null;
        return (
          <div className="es-spoken-compare__lane" key={source}>
            <div className="es-spoken-compare__name">
              {SOURCE_NAMES[source]}
              {spokenWord?.source === source && " ●"}
            </div>
            <div className="es-spoken-compare__track">
              {times?.map((time, index) =>
                time ? (
                  <div
                    key={index}
                    className={`es-spoken-compare__word ${spokenWord?.source === source && spokenWord.index === index ? "es-spoken-compare__word--on" : ""}`}
                    style={{
                      left: position(time.start),
                      width: `calc(${position(time.end)} - ${position(time.start)})`,
                    }}
                    title={`${sub.items[index].text} ${Math.round(time.start)}–${Math.round(time.end)}`}
                  >
                    {sub.items[index].text}
                  </div>
                ) : null,
              ) ?? <div className="es-spoken-compare__status">{status[source] ?? "—"}</div>}
            </div>
            <div className="es-spoken-compare__error">
              {reference?.source === source ? "ref" : error !== null ? `±${Math.round(error)}` : ""}
            </div>
          </div>
        );
      })}
      <div className="es-spoken-compare__overlay">
        <div
          className="es-spoken-compare__cue"
          style={{ left: position(sub.start), width: `calc(${position(sub.end)} - ${position(sub.start)})` }}
        />
        <div className="es-spoken-compare__playhead" ref={playheadRef} />
      </div>
    </div>
  );
};
