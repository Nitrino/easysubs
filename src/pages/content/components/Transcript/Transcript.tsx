import { FC, memo, useCallback, useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { useUnit } from "effector-react";
import cn from "classnames";

import { $currentSubs } from "@src/models/subs";
import { moveToTimeRequested } from "@src/models/videos";
import {
  $transcriptError,
  $transcriptLines,
  $transcriptOpen,
  $transcriptQuery,
  transcriptClosed,
  transcriptQueryChanged,
  transcriptShownChanged,
} from "@src/models/transcript";
import { findMatches, formatTranscriptTime, searchTranscript, type TTranscriptLine } from "@src/utils/transcript";
import { CloseIcon } from "../Settings/assets/CloseIcon";

// After the list is scrolled by hand it stops following the video for a while
const FOLLOW_PAUSE_MS = 5000;

// Events that would reach the player under the sidebar: a click pauses most players, keys seek and wheels change the
// volume on some
const stop = (event: { stopPropagation: () => void }) => event.stopPropagation();
const STOP_PROPAGATION = {
  onClick: stop,
  onDoubleClick: stop,
  onMouseDown: stop,
  onMouseUp: stop,
  onPointerDown: stop,
  onPointerUp: stop,
  onTouchStart: stop,
  onTouchEnd: stop,
  onWheel: stop,
  onKeyDown: stop,
  onKeyUp: stop,
  onKeyPress: stop,
  onContextMenu: stop,
};

// Every line of the subtitles with its second language, over the right side of the player: a click on a line plays
// from it, the search finds lines in either language. Opened from the settings or with Shift+T.
export const Transcript: FC = () => {
  const [open, lines, query, error, currentSubs] = useUnit([
    $transcriptOpen,
    $transcriptLines,
    $transcriptQuery,
    $transcriptError,
    $currentSubs,
  ]);
  const listRef = useRef<HTMLDivElement>(null);
  const scrolledByHandAtRef = useRef(0);

  const shownLines = useMemo(() => searchTranscript(lines, query), [lines, query]);
  const currentId = currentSubs[0]?.id ?? null;
  const hasSecond = lines.some((line) => line.second !== null);

  // The lines in view, for the translator. Not while searching: the matches may be spread over the whole video.
  const reportShown = useCallback(() => {
    const list = listRef.current;
    if (!list || query.trim()) return;
    const rows = Array.from(list.children) as HTMLElement[];
    const top = list.scrollTop;
    const bottom = top + list.clientHeight;
    const visible = rows.filter((row) => row.offsetTop + row.offsetHeight > top && row.offsetTop < bottom);
    if (visible.length === 0) return;
    transcriptShownChanged({ from: Number(visible[0].dataset.id), to: Number(visible.at(-1)!.dataset.id) });
  }, [query]);

  const frameRef = useRef<number | undefined>(undefined);
  const handleScroll = () => {
    if (frameRef.current !== undefined) return;
    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = undefined;
      reportShown();
    });
  };
  useEffect(() => () => cancelAnimationFrame(frameRef.current), []);

  useEffect(() => {
    if (open) reportShown();
  }, [open, shownLines.length, reportShown]);

  // Keeps the line being said in view, a third of the way down
  useLayoutEffect(() => {
    const list = listRef.current;
    if (!open || !list || currentId === null || query.trim()) return;
    if (Date.now() - scrolledByHandAtRef.current < FOLLOW_PAUSE_MS) return;
    const row = list.querySelector<HTMLElement>(`[data-id="${currentId}"]`);
    if (!row) return;
    const target = row.offsetTop - list.clientHeight / 3;
    if (Math.abs(list.scrollTop - target) > 2) list.scrollTop = Math.max(0, target);
  }, [open, currentId, query]);

  if (!open) return null;

  const scrolledByHand = () => {
    scrolledByHandAtRef.current = Date.now();
  };

  return (
    <div className="es-transcript" role="complementary" aria-label="Transcript" {...STOP_PROPAGATION}>
      <div className="es-transcript__header">
        <div className="es-transcript__title">Transcript</div>
        <button className="es-transcript__close" aria-label="Close transcript" onClick={() => transcriptClosed()}>
          <CloseIcon />
        </button>
      </div>
      <div className="es-transcript__search">
        <input
          type="search"
          className="es-transcript__input"
          placeholder={hasSecond ? "Search both languages" : "Search the subtitles"}
          aria-label="Search the transcript"
          value={query}
          onChange={(event) => transcriptQueryChanged(event.target.value)}
          onKeyDown={(event) => {
            event.stopPropagation();
            if (event.key === "Escape") {
              if (query) transcriptQueryChanged("");
              else event.currentTarget.blur();
            }
            if (event.key === "Enter" && shownLines.length > 0) moveToTimeRequested(shownLines[0].start);
          }}
        />
        {query.trim() && (
          <div className="es-transcript__count">
            {shownLines.length === 1 ? "1 line" : `${shownLines.length} lines`}
          </div>
        )}
      </div>
      {error && <div className="es-transcript__error">Couldn't translate: {error}</div>}
      {lines.length === 0 && <div className="es-transcript__empty">No subtitles loaded yet.</div>}
      {lines.length > 0 && shownLines.length === 0 && <div className="es-transcript__empty">Nothing found.</div>}
      <div
        className="es-transcript__list"
        ref={listRef}
        onScroll={handleScroll}
        onWheel={scrolledByHand}
        onTouchMove={scrolledByHand}
        onMouseDown={(event) => {
          // A drag of the scrollbar
          if (event.target === event.currentTarget) scrolledByHand();
        }}
      >
        {shownLines.map((line) => (
          <TranscriptRow key={line.id} line={line} current={line.id === currentId} query={query} />
        ))}
      </div>
    </div>
  );
};

const TranscriptRow = memo<{ line: TTranscriptLine; current: boolean; query: string }>(({ line, current, query }) => (
  <div
    className={cn("es-transcript__line", { "es-transcript__line--current": current })}
    data-id={line.id}
    role="button"
    tabIndex={0}
    onClick={() => moveToTimeRequested(line.start)}
    onKeyDown={(event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        moveToTimeRequested(line.start);
      }
    }}
  >
    <div className="es-transcript__time">{formatTranscriptTime(line.start)}</div>
    <div className="es-transcript__texts">
      <div className="es-transcript__text">
        <Highlighted text={line.text} query={query} />
      </div>
      {line.second !== null && (line.second || line.pending) && (
        <div className={cn("es-transcript__second", { "es-transcript__second--pending": line.pending })}>
          {line.pending ? "…" : <Highlighted text={line.second} query={query} />}
        </div>
      )}
    </div>
  </div>
));

const Highlighted: FC<{ text: string; query: string }> = ({ text, query }) => {
  const matches = findMatches(text, query);
  if (matches.length === 0) return <>{text}</>;
  const parts = [];
  let at = 0;
  for (const [start, end] of matches) {
    if (start > at) parts.push(text.slice(at, start));
    parts.push(<mark key={start}>{text.slice(start, end)}</mark>);
    at = end;
  }
  parts.push(text.slice(at));
  return <>{parts}</>;
};
