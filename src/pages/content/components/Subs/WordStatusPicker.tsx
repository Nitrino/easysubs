import { FC } from "react";
import { useUnit } from "effector-react";
import cn from "classnames";

import { $words, $wordsLanguage, wordStatusChanged } from "@src/models/words";
import { wordStatus } from "@src/utils/words";
import type { TWordStatus } from "@src/models/types";

const STATUSES: { status: TWordStatus; label: string }[] = [
  { status: "new", label: "New" },
  { status: "learning", label: "Learning" },
  { status: "known", label: "Known" },
];

// New, learning or known, at the foot of a word's popover (src/models/words); nothing until the subtitles' language
// is known or for what isn't a word
export const WordStatusPicker: FC<{ text: string; cueId: number; translation?: string }> = ({
  text,
  cueId,
  translation,
}) => {
  const [words, language, changed] = useUnit([$words, $wordsLanguage, wordStatusChanged]);
  const current = language ? wordStatus(words, language, text) : null;
  if (!current) return null;
  return (
    <>
      <div className="es-sep" />
      <div className="es-word-status" role="radiogroup" aria-label="Word status">
        {STATUSES.map(({ status, label }) => (
          <button
            key={status}
            type="button"
            role="radio"
            aria-checked={status === current}
            className={cn("es-word-status__item", `es-word-status__item--${status}`, {
              "es-word-status__item--selected": status === current,
            })}
            onClick={() =>
              changed({ text, status, cueId, ...(status === "learning" && translation && { translation }) })
            }
          >
            {label}
          </button>
        ))}
      </div>
    </>
  );
};
