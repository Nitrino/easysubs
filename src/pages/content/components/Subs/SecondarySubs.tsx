import { FC, useEffect, useRef, useState } from "react";
import { useUnit } from "effector-react";
import Draggable from "react-draggable";
import cn from "classnames";

import { $secondaryHidden, $secondaryRevealed, TSecondaryLine } from "@src/models/secondarySubs";
import {
  $secondarySubsBackground,
  $secondarySubsColor,
  $secondarySubsReveal,
  $secondarySubsSize,
  $secondarySubsTopOffset,
  $subsBackgroundOpacity,
  $subsFontSize,
  secondarySubsTopMoved,
} from "@src/models/settings";
import { $streaming } from "@src/models/streamings";
import { $video } from "@src/models/videos";
import { useHoverPause } from "./useHoverPause";

// Whether the video plays, for the second line that shows only when it's paused
function useVideoPlaying() {
  const video = useUnit($video);
  const [playing, setPlaying] = useState(() => Boolean(video && !video.paused));

  useEffect(() => {
    if (!video) return;
    const update = () => setPlaying(!video.paused);
    video.addEventListener("play", update);
    video.addEventListener("pause", update);
    return () => {
      video.removeEventListener("play", update);
      video.removeEventListener("pause", update);
    };
  }, [video]);

  return playing;
}

// The second subtitle line of one cue: plain text, no word popovers. Blurred until hover (or while the video plays)
// when the settings say so; holding R reveals it.
export const SecondaryLine: FC<{ line: TSecondaryLine | undefined }> = ({ line }) => {
  const [hidden, revealed, reveal, color, size, background, opacity] = useUnit([
    $secondaryHidden,
    $secondaryRevealed,
    $secondarySubsReveal,
    $secondarySubsColor,
    $secondarySubsSize,
    $secondarySubsBackground,
    $subsBackgroundOpacity,
  ]);
  const playing = useVideoPlaying();

  if (!line || hidden || (!line.text && !line.pending)) return null;

  const blurred = !revealed && (reveal === "hover" || (reveal === "paused" && playing));

  return (
    <div
      className={cn("es-sub es-sub--secondary", {
        "es-sub--pending": line.pending,
        "es-sub--blurred": blurred,
        "es-sub--no-background": !background,
      })}
      style={{
        color,
        fontSize: `${size / 100}em`,
        background: background ? `rgba(0, 0, 0, ${opacity / 100})` : "transparent",
      }}
      dir="auto"
    >
      {line.pending ? "…" : line.text}
    </div>
  );
};

// The second line in a block of its own at the top of the player, dragged separately; where it was dropped is kept
// per service
export const SecondarySubsTop: FC<{ lines: TSecondaryLine[] }> = ({ lines }) => {
  const [streaming, offsets, handleMoved, video, subsFontSize] = useUnit([
    $streaming,
    $secondarySubsTopOffset,
    secondarySubsTopMoved,
    $video,
    $subsFontSize,
  ]);
  const draggableRef = useRef<HTMLDivElement>(null);
  const hoverPause = useHoverPause();
  const offset = offsets[streaming.name] ?? { x: 0, y: 0 };

  return (
    <Draggable
      nodeRef={draggableRef}
      position={offset}
      onStop={(_, data) => {
        handleMoved({ service: streaming.name, x: data.x, y: data.y });
      }}
    >
      <div
        ref={draggableRef}
        id="es-top-subs"
        {...hoverPause}
        style={{ fontSize: `${(((video?.clientWidth ?? 0) / 100) * subsFontSize) / 43}px` }}
      >
        {lines.map((line, index) => (
          <SecondaryLine key={index} line={line} />
        ))}
      </div>
    </Draggable>
  );
};

const NOTICE_MS = 1600;

// A short note in the player when V hides or shows the second line: toasts live in <body>, outside a full-screen player
export const SecondaryNotice: FC = () => {
  const hidden = useUnit($secondaryHidden);
  const [notice, setNotice] = useState<string | null>(null);
  const previousRef = useRef(hidden);

  useEffect(() => {
    if (previousRef.current === hidden) return;
    previousRef.current = hidden;
    setNotice(hidden ? "Second line hidden. Press V to show it." : "Second line shown");
    const timer = setTimeout(() => setNotice(null), NOTICE_MS);
    return () => clearTimeout(timer);
  }, [hidden]);

  if (!notice) return null;
  return (
    <div className="es-secondary-notice" role="status">
      {notice}
    </div>
  );
};
