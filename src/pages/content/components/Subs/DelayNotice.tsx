import { FC, useEffect, useState } from "react";
import { useUnit } from "effector-react";

import { $subsDelay, subsDelayKeyPressed } from "@src/models/subs";

const NOTICE_MS = 1600;

export const formatSubsDelay = (delay: number) => `${delay > 0 ? "+" : ""}${delay}s`;

// What G or H did, above the subtitles: the settings with the delay are closed while they're used
export const DelayNotice: FC = () => {
  const delay = useUnit($subsDelay);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    const unwatch = subsDelayKeyPressed.watch(() => {
      setShown(true);
      clearTimeout(timer);
      timer = setTimeout(() => setShown(false), NOTICE_MS);
    });
    return () => {
      unwatch();
      clearTimeout(timer);
    };
  }, []);

  if (!shown) return null;
  return (
    <div className="es-secondary-notice" role="status">
      Subtitles delay {formatSubsDelay(delay)}
    </div>
  );
};
