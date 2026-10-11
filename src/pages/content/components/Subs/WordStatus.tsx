import { FC } from "react";
import { useUnit } from "effector-react";
import cn from "classnames";

import { $wordsState, wordStatusChanged } from "@src/models/words";
import { rankBadge, viewWord, type TWordView } from "@src/utils/words";

const LABELS: Record<TWordView["status"], string> = {
  new: "New",
  learning: "Learning",
  known: "Known",
  rare: "Rare",
};

// What the word is to the user at the foot of its popover (src/models/words): its status by its dictionary form, how
// often it's said, and Learn and Know to mark it. Learn saves it like "+" does, with the meaning on top; pressed again,
// either forgets the mark. Nothing until the subtitles' language is known or for what isn't a word.
export const WordStatus: FC<{ text: string; cueId: number; onLearn: () => void }> = ({ text, cueId, onLearn }) => {
  const [state, changed] = useUnit([$wordsState, wordStatusChanged]);
  const view = state ? viewWord(state, text) : null;
  if (!view) return null;
  const badge = rankBadge(view.rank);
  const byLevel = view.status === "known" && !view.marked;
  const learning = view.status === "learning";
  const known = view.status === "known";

  return (
    <>
      <div className="es-sep" />
      <div className="es-word-status">
        <span className={`es-word-status__label es-word-status__label--${view.status}`}>
          {byLevel ? "Known by your level" : LABELS[view.status]}
        </span>
        {badge && view.status !== "rare" && (
          <span
            className={cn("es-word-status__rank", {
              // Past the user's level: why the word is new
              "es-word-status__rank--above": state?.level != null && view.rank !== null && view.rank > state.level,
            })}
          >
            {badge}
          </span>
        )}
        <span className="es-word-status__actions">
          <button
            type="button"
            className={cn("es-word-status__button", { "es-word-status__button--learning": learning })}
            aria-pressed={learning}
            onClick={() => (learning ? changed({ text, status: "new", cueId }) : onLearn())}
          >
            + Learn
          </button>
          <button
            type="button"
            className={cn("es-word-status__button", { "es-word-status__button--known": known })}
            aria-pressed={known}
            disabled={byLevel}
            title={byLevel ? "Known by your level: Learn it to see it colored again" : undefined}
            onClick={() => changed({ text, status: known ? "new" : "known", cueId })}
          >
            ✓ Know
          </button>
        </span>
      </div>
    </>
  );
};
