import { FC, useMemo } from "react";
import { useGate, useUnit } from "effector-react";
import toast from "react-hot-toast";

import { $learningService } from "@src/models/settings";
import {
  $currentExpressionTranslation,
  ExpressionTranslationGate,
  type TCurrentExpression,
} from "@src/models/expressions";
import { $currentWordTranslation, $wordTranslationsPendings, WordTranslationsGate } from "@src/models/translations";
import { getLearningService } from "@src/utils/getLearningService";
import { addWordFx } from "@src/models/learning";
import { PlusIcon } from "./assets/PlusIcon";
import { Popover } from "../ui/Popover";
import { Spinner } from "../ui/Spinner";
import { InLineBadge } from "./InLineBadge";

// The popover of a hovered word that belongs to a phrasal verb, an idiom or another expression: the expression, its
// translations, and the word's own translation in case the expression isn't meant here
export const ExpressionTranslation: FC<{ expression: TCurrentExpression; word: string }> = ({ expression, word }) => {
  // The same object while the expression stays, so the gate doesn't take every render for a new expression
  const gateProps = useMemo(
    () => ({ expression: expression.expression, cue: expression.cue }),
    [expression.expression, expression.cue],
  );
  useGate(ExpressionTranslationGate, gateProps);
  const [current, learningService, addWord] = useUnit([$currentExpressionTranslation, $learningService, addWordFx]);

  const service = useMemo(() => getLearningService(learningService), [learningService]);

  const handleAdd = (translation: string) => {
    if (!service) return;
    addWord({
      word: expression.expression.toLowerCase(),
      translation,
      partOfSpeech: "phrase",
      cueId: expression.id,
      indexes: expression.indexes,
    })
      .then((value) => toast.success(value))
      .catch((error) => toast.error(error));
  };

  const translation = current?.translation;
  // Google lists a word once per part of speech; each translation is shown once
  const items = translation
    ? [{ text: translation.main }, ...translation.alternatives].filter(
        (item, index, all) => all.findIndex((other) => other.text === item.text) === index,
      )
    : [];

  return (
    <Popover variant="word">
      <div className="es-title" dir="auto">
        {expression.expression}
      </div>
      <div className="es-label">
        {expression.kind}
        {current?.inContext && <InLineBadge />}
      </div>
      <div className="es-sep" />
      {current?.pending && (
        <div className="es-loading">
          <Spinner />
          <span>Translating…</span>
        </div>
      )}
      {!current?.pending && current?.error && <div className="es-note">{current.error}</div>}
      {!current?.pending && items.length > 0 && (
        <div className="es-pv-list">
          {items.map((item, index) => (
            <div
              key={item.text}
              className={["es-pv-item", index === 0 && "es-pv-main", service && "es-addable"].filter(Boolean).join(" ")}
              dir="auto"
              onClick={() => handleAdd(item.text)}
            >
              {service && (
                <span className="es-add">
                  <PlusIcon />
                </span>
              )}
              {item.text}
              {"partOfSpeech" in item && item.partOfSpeech && item.partOfSpeech !== "unknown" && (
                <span className="es-alt-pos">{item.partOfSpeech}</span>
              )}
            </div>
          ))}
        </div>
      )}
      <ExpressionWord word={word} />
    </Popover>
  );
};

const ExpressionWord: FC<{ word: string }> = ({ word }) => {
  useGate(WordTranslationsGate, word);
  const [translation, pendings] = useUnit([$currentWordTranslation, $wordTranslationsPendings]);
  const source = word.toLowerCase();
  const text = translation?.source === source ? translation.mainTranslation : pendings[source] ? "…" : null;
  if (!text) return null;

  return (
    <>
      <div className="es-sep" />
      <div className="es-pv-word" dir="auto">
        <span className="es-src-word">{source}</span>
        <span className="es-pv-word-translation">{text}</span>
      </div>
    </>
  );
};
