import { ChangeEvent, FC, Fragment, useMemo, useRef, useState } from "react";
import { useUnit } from "effector-react";
import cn from "classnames";
import toast from "react-hot-toast";

import {
  $episodeScore,
  $wordColoring,
  $words,
  $wordsLanguage,
  episodeWordsMarkedKnown,
  savedWordsClosed,
  savedWordsOpened,
  wordColoringChanged,
  wordReviewed,
  wordsImported,
  wordsRemoved,
  wordStatusChanged,
} from "@src/models/words";
import type { TSavedWord, TWordColoring } from "@src/models/types";
import { isDue, normalizeWord, parseWordsFile, wordKey, wordsToCsv, type TReviewGrade } from "@src/utils/words";
import { Select } from "../ui/Select";
import { Segmented } from "../FoundSubs/FoundSubsSheet";
import { ChevronLeft } from "./assets/ChevronLeft";
import { CloseIcon } from "./assets/CloseIcon";
import { TrashIcon } from "./assets/TrashIcon";

// The settings' Words tab: how much of the episode the user knows, how the subtitles color words, and the Saved words
// sheet in place of the settings panel with the list, its review and the CSV file (src/models/words)

const Row: FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="es-settings-content__element">
    <div className="es-settings-content__element__left">{label}</div>
    <div className="es-settings-content__element__right">{children}</div>
  </div>
);

const COLORING_OPTIONS: { value: TWordColoring; label: string }[] = [
  { value: "all", label: "New and learning" },
  { value: "learning", label: "Learning" },
  { value: "off", label: "Off" },
];

const plural = (count: number, word: string) => `${count} ${word}${count === 1 ? "" : "s"}`;

export const EpisodeScore: FC = () => {
  const score = useUnit($episodeScore);
  if (!score) {
    return (
      <div className="es-words-score es-words-score--empty">
        The score shows once the subtitles and their language are known.
      </div>
    );
  }
  return (
    <div className="es-words-score">
      <div className="es-words-score__percent">{score.percent}%</div>
      <div className="es-words-score__text">
        <span>You know {score.percent}% of this episode</span>
        <span className="es-words-score__details">
          {plural(score.newWords.length, "new word")} · {score.learning} learning
        </span>
      </div>
      <div
        className="es-words-score__meter"
        role="meter"
        aria-label="Known words"
        aria-valuenow={score.percent}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <span className="es-words-score__known" style={{ width: `${(score.known / score.total) * 100}%` }} />
        <span className="es-words-score__learning" style={{ width: `${(score.learning / score.total) * 100}%` }} />
      </div>
    </div>
  );
};

export const WordsTab: FC = () => {
  const [coloring, coloringChanged, words, score, open, markKnown] = useUnit([
    $wordColoring,
    wordColoringChanged,
    $words,
    $episodeScore,
    savedWordsOpened,
    episodeWordsMarkedKnown,
  ]);
  const [confirming, setConfirming] = useState(false);
  const learning = Object.values(words).filter((word) => word.status === "learning").length;
  const newCount = score?.newWords.length ?? 0;

  return (
    <>
      <EpisodeScore />
      <div className="es-settings-content__item">
        <Row label="Color words">
          <Select
            options={COLORING_OPTIONS}
            value={COLORING_OPTIONS.find((option) => option.value === coloring)}
            onChange={(option: (typeof COLORING_OPTIONS)[number]) => coloringChanged(option.value)}
          />
        </Row>
      </div>
      <div className="es-settings-content__item">
        <Row label="Saved words">
          <button type="button" className="es-downloads__open" onClick={() => open()}>
            {learning > 0 ? `${learning} learning` : "None"}
            <span aria-hidden="true">›</span>
          </button>
        </Row>
      </div>
      <div className="es-settings-content__item">
        <Row label="Words of this episode">
          {confirming ? (
            <button
              type="button"
              className="es-found__button es-found__button--primary"
              onClick={() => {
                setConfirming(false);
                markKnown();
              }}
            >
              Mark {plural(newCount, "word")} known
            </button>
          ) : (
            <button
              type="button"
              className="es-found__button"
              disabled={newCount === 0}
              onClick={() => setConfirming(true)}
            >
              New ones are known
            </button>
          )}
        </Row>
        <p className="es-settings-content__status">
          Every word you haven't saved becomes known: worth it once an episode is finished.
        </p>
      </div>
    </>
  );
};

// ---- Saved words ----

// The line with the word in bold
const ContextLine: FC<{ line: string; word: string }> = ({ line, word }) => (
  <>
    {line.split(/(\s+)/).map((part, index) => (
      <Fragment key={index}>{normalizeWord(part) === word ? <b>{part}</b> : part}</Fragment>
    ))}
  </>
);

// The list shows the latest words; search finds the others
const LIST_LIMIT = 200;

type TFilter = "learning" | "known";

function downloadCsv(words: TSavedWord[]) {
  // The byte order mark tells Excel it's UTF-8
  const blob = new Blob(["\uFEFF", wordsToCsv(words)], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `easysubs-words-${new Date().toISOString().slice(0, 10)}.csv`;
  // Detached, so its click doesn't reach the page and close the settings as a click outside them
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

const SavedWordRow: FC<{ word: TSavedWord; showLanguage: boolean }> = ({ word, showLanguage }) => {
  const [removed] = useUnit([wordsRemoved]);
  const key = wordKey(word.language, word.word);
  return (
    <div className="es-words__row">
      <div className="es-words__main">
        <span className="es-words__word">
          <span dir="auto">{word.word}</span>
          {word.translation && (
            <span className="es-words__translation" dir="auto">
              {word.translation}
            </span>
          )}
          {showLanguage && <span className="es-tag es-tag--quiet">{word.language}</span>}
        </span>
        {word.context && (
          <span className="es-words__context" dir="auto">
            {word.context.url ? (
              <a href={word.context.url} target="_blank" rel="noreferrer" title={word.context.source}>
                <ContextLine line={word.context.line} word={word.word} />
              </a>
            ) : (
              <ContextLine line={word.context.line} word={word.word} />
            )}
          </span>
        )}
      </div>
      <button
        type="button"
        className="es-found__button es-words__status"
        title={word.status === "learning" ? "Mark known" : "Learn again"}
        onClick={() =>
          wordStatusChanged({
            text: word.word,
            language: word.language,
            status: word.status === "learning" ? "known" : "learning",
          })
        }
      >
        {word.status === "learning" ? "Known" : "Learn"}
      </button>
      <button
        type="button"
        className="es-found__icon es-downloads__delete"
        aria-label={`Delete ${word.word}`}
        title="Delete"
        onClick={() => removed([key])}
      >
        <TrashIcon />
      </button>
    </div>
  );
};

const GRADES: { grade: TReviewGrade; label: string }[] = [
  { grade: "again", label: "Again" },
  { grade: "good", label: "Got it" },
  { grade: "known", label: "Known" },
];

// Flashcards of the due words: the word in its line, the translation on demand, then how it went
const Review: FC<{ queue: string[]; onDone: () => void }> = ({ queue: initial, onDone }) => {
  const [words, reviewed] = useUnit([$words, wordReviewed]);
  const [queue, setQueue] = useState(initial);
  const [revealed, setRevealed] = useState(false);
  const [done, setDone] = useState(0);
  const word = words[queue[0]];

  if (!word) {
    return (
      <div className="es-words-review es-words-review--done">
        <div className="es-words-review__word">Done</div>
        <p className="es-found__empty">{plural(done, "word")} reviewed. The next ones come back in a day or more.</p>
        <button type="button" className="es-found__button es-found__button--primary" onClick={onDone}>
          Back to the list
        </button>
      </div>
    );
  }

  const grade = (value: TReviewGrade) => {
    reviewed({ key: queue[0], grade: value });
    setRevealed(false);
    setQueue(value === "again" ? [...queue.slice(1), queue[0]] : queue.slice(1));
    if (value !== "again") setDone(done + 1);
  };

  return (
    <div className="es-words-review">
      <div className="es-words-review__progress">{plural(queue.length, "word")} left</div>
      <div className="es-words-review__word" dir="auto">
        {word.word}
      </div>
      {word.context && (
        <p className="es-words-review__context" dir="auto">
          <ContextLine line={word.context.line} word={word.word} />
        </p>
      )}
      {revealed ? (
        <>
          <div className="es-words-review__translation" dir="auto">
            {word.translation || "No translation was saved"}
          </div>
          <div className="es-words-review__grades">
            {GRADES.map(({ grade: value, label }) => (
              <button
                key={value}
                type="button"
                className={cn("es-found__button", { "es-found__button--primary": value === "good" })}
                onClick={() => grade(value)}
              >
                {label}
              </button>
            ))}
          </div>
        </>
      ) : (
        <button type="button" className="es-found__button es-found__button--primary" onClick={() => setRevealed(true)}>
          Show translation
        </button>
      )}
    </div>
  );
};

export const SavedWordsSheet: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [words, language, close, imported] = useUnit([$words, $wordsLanguage, savedWordsClosed, wordsImported]);
  const [filter, setFilter] = useState<TFilter>("learning");
  const [query, setQuery] = useState("");
  const [review, setReview] = useState<string[] | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const all = useMemo(() => Object.values(words).sort((a, b) => b.added - a.added), [words]);
  const counts = { learning: 0, known: 0 };
  for (const word of all) counts[word.status] += 1;
  const due = all.filter((word) => isDue(word, Date.now())).sort((a, b) => (a.review?.due ?? 0) - (b.review?.due ?? 0));
  const search = query.trim().toLowerCase();
  const matching = all.filter(
    (word) =>
      word.status === filter &&
      (!search || word.word.includes(search) || word.translation?.toLowerCase().includes(search)),
  );
  const showLanguage = new Set(all.map((word) => word.language)).size > 1;

  const handleFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    const parsed = parseWordsFile(await file.text(), language ?? "", Date.now());
    if (parsed.some((word) => !word.language)) {
      toast.error("Open subtitles in the list's language first");
      return;
    }
    const added = parsed.filter((word) => !words[wordKey(word.language, word.word)]).length;
    imported(parsed);
    toast.success(added ? `Added ${plural(added, "word")}` : "No new words in the file");
  };

  return (
    <div className="es-found">
      <div className="es-found__header">
        <button type="button" className="es-found__back" onClick={() => (review ? setReview(null) : close())}>
          <ChevronLeft />
          {review ? "Saved words" : "Settings"}
        </button>
        <div className="es-found__title">{review ? "Review" : "Saved words"}</div>
        <div className="es-found__actions">
          <button className="es-settings-content__close" aria-label="Close" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
      </div>
      <div className="es-found__body">
        {review ? (
          <Review queue={review} onDone={() => setReview(null)} />
        ) : (
          <>
            <div className="es-words__toolbar">
              <button
                type="button"
                className="es-found__button es-found__button--primary"
                disabled={due.length === 0}
                onClick={() => setReview(due.map((word) => wordKey(word.language, word.word)))}
              >
                {due.length ? `Review ${due.length}` : "Nothing to review"}
              </button>
              <span className="es-words__spacer" />
              <button
                type="button"
                className="es-found__button"
                disabled={all.length === 0}
                onClick={() => downloadCsv(all)}
              >
                Export CSV
              </button>
              <button type="button" className="es-found__button" onClick={() => fileRef.current?.click()}>
                Import
              </button>
              <input
                ref={fileRef}
                type="file"
                accept=".csv,.txt,text/csv,text/plain"
                hidden
                aria-label="Import words"
                onChange={handleFile}
              />
            </div>
            <div className="es-words__filters">
              <Segmented<TFilter>
                label="Words"
                value={filter}
                onChange={setFilter}
                options={[
                  { value: "learning", label: `Learning ${counts.learning}` },
                  { value: "known", label: `Known ${counts.known}` },
                ]}
              />
              <input
                className="es-words__search"
                type="search"
                aria-label="Search words"
                placeholder="Search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
            {matching.length === 0 ? (
              <p className="es-found__empty">
                {search
                  ? "No words match."
                  : filter === "learning"
                    ? "Words you save with + in a word's popover, or mark Learning, show here."
                    : "Words you mark Known show here."}
              </p>
            ) : (
              <div className="es-downloads__group">
                {matching.slice(0, LIST_LIMIT).map((word) => (
                  <SavedWordRow key={wordKey(word.language, word.word)} word={word} showLanguage={showLanguage} />
                ))}
              </div>
            )}
            {matching.length > LIST_LIMIT && (
              <p className="es-downloads__summary">
                {plural(matching.length - LIST_LIMIT, "more word")}: search to find them.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};
