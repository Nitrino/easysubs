import { ChangeEvent, FC, Fragment, useMemo, useRef, useState } from "react";
import { useUnit } from "effector-react";
import cn from "classnames";
import toast from "react-hot-toast";

import {
  $ankiReviews,
  $episodeScore,
  $wordColoring,
  $wordLevel,
  $wordRanks,
  $words,
  $wordsLanguage,
  $wordsState,
  episodeWordsMarkedKnown,
  levelSampleFx,
  levelSet,
  levelSetupClosed,
  levelSetupOpened,
  savedWordsClosed,
  savedWordsOpened,
  syncAnkiFx,
  wordColoringChanged,
  wordReviewed,
  wordsImported,
  wordsRemoved,
  wordStatusChanged,
} from "@src/models/words";
import type { TSavedWord, TWordColoring } from "@src/models/types";
import {
  CEFR_LEVELS,
  estimateLevel,
  isDue,
  normalizeWord,
  parseWordsFile,
  wordKey,
  wordsToCsv,
  type TReviewGrade,
} from "@src/utils/words";
import { LEVEL_BANDS } from "@src/utils/frequency/lookup";
import { Select } from "../ui/Select";
import { Spinner } from "../ui/Spinner";
import { Segmented } from "../FoundSubs/FoundSubsSheet";
import { ChevronLeft } from "./assets/ChevronLeft";
import { CloseIcon } from "./assets/CloseIcon";
import { TrashIcon } from "./assets/TrashIcon";

// The settings' Words tab: the user's level, how much of the episode they know, how the subtitles color words, the
// Anki cards read back, and two sheets in place of the settings panel: the level check and the saved words with their
// review and CSV file (src/models/words)

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

const plural = (count: number, word: string) => `${count.toLocaleString("en")} ${word}${count === 1 ? "" : "s"}`;

const languageName = (language: string) => {
  try {
    return new Intl.DisplayNames(["en"], { type: "language" }).of(language) ?? language;
  } catch {
    return language;
  }
};

// "B1 · 2,000 words" for a level, "Marking words myself" for none
export const levelLabel = (rank: number) => {
  if (rank === 0) return "Marking words myself";
  const cefr = [...CEFR_LEVELS].reverse().find((level) => rank >= level.rank)?.level;
  return `${cefr ? `${cefr} · ` : ""}${plural(rank, "word")}`;
};

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

// Before the level is set: what it's for and the way to the check
const LevelPrompt: FC<{ language: string }> = ({ language }) => {
  const open = useUnit(levelSetupOpened);
  return (
    <div className="es-words-score es-words-level-prompt">
      <div className="es-words-score__text">
        <span>What's your level in {languageName(language)}?</span>
        <span className="es-words-score__details">
          EasySubs counts the words you know from it and colors only the ones worth learning.
        </span>
      </div>
      <button type="button" className="es-found__button es-found__button--primary" onClick={() => open()}>
        Set level
      </button>
    </div>
  );
};

const AnkiRow: FC = () => {
  const [sync, syncing] = useUnit([syncAnkiFx, syncAnkiFx.pending]);
  const read = () =>
    sync()
      .then(({ cards, changed }) =>
        toast.success(cards ? `Read ${plural(cards, "card")}: ${changed} changed` : "No Easysubs cards in Anki yet"),
      )
      .catch((error) => toast.error(String(error)));
  return (
    <div className="es-settings-content__item">
      <Row label="Anki cards">
        <button type="button" className="es-found__button" disabled={syncing} onClick={read}>
          {syncing ? "Reading…" : "Read from Anki"}
        </button>
      </Row>
      <p className="es-settings-content__status">
        Words of your Easysubs cards are learning, and known once Anki shows them three weeks apart.
      </p>
    </div>
  );
};

export const WordsTab: FC = () => {
  const [coloring, coloringChanged, words, score, state, level, openSaved, openLevel, markKnown, ankiReviews] = useUnit(
    [
      $wordColoring,
      wordColoringChanged,
      $words,
      $episodeScore,
      $wordsState,
      $wordLevel,
      savedWordsOpened,
      levelSetupOpened,
      episodeWordsMarkedKnown,
      $ankiReviews,
    ],
  );
  const [confirming, setConfirming] = useState(false);
  const learning = Object.values(words).filter((word) => word.status === "learning").length;
  const unknownCount = score?.unknown.length ?? 0;
  // Languages with a frequency list need the level first
  const needsLevel = Boolean(state?.ranks) && level === null;

  return (
    <>
      {needsLevel ? <LevelPrompt language={state!.language} /> : <EpisodeScore />}
      {state?.ranks && level !== null && (
        <div className="es-settings-content__item">
          <Row label={`Level in ${languageName(state.language)}`}>
            <button type="button" className="es-downloads__open" onClick={() => openLevel()}>
              {levelLabel(level)}
              <span aria-hidden="true">›</span>
            </button>
          </Row>
        </div>
      )}
      <div className="es-settings-content__item">
        <Row label="Color words">
          <Select
            options={COLORING_OPTIONS}
            value={COLORING_OPTIONS.find((option) => option.value === coloring)}
            onChange={(option: (typeof COLORING_OPTIONS)[number]) => {
              coloringChanged(option.value);
              // Coloring starts from the level
              if (option.value !== "off" && needsLevel) openLevel();
            }}
          />
        </Row>
      </div>
      <div className="es-settings-content__item">
        <Row label="Saved words">
          <button type="button" className="es-downloads__open" onClick={() => openSaved()}>
            {learning > 0 ? `${learning} learning` : "None"}
            <span aria-hidden="true">›</span>
          </button>
        </Row>
      </div>
      {ankiReviews && <AnkiRow />}
      {!needsLevel && (
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
                Mark {plural(unknownCount, "word")} known
              </button>
            ) : (
              <button
                type="button"
                className="es-found__button"
                disabled={unknownCount === 0}
                onClick={() => setConfirming(true)}
              >
                All are known
              </button>
            )}
          </Row>
          <p className="es-settings-content__status">
            Every word you aren't learning becomes known: worth it once an episode is finished.
          </p>
        </div>
      )}
    </>
  );
};

// ---- The level check ----

type TCheckWord = { word: string; rank: number };

// The level by CEFR, or in a minute by the words the user knows among some of each frequency band
export const LevelSheet: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [language, level, close, set, loadSample, loading] = useUnit([
    $wordsLanguage,
    $wordLevel,
    levelSetupClosed,
    levelSet,
    levelSampleFx,
    levelSampleFx.pending,
  ]);
  const [check, setCheck] = useState<TCheckWord[] | null>(null);
  const [picked, setPicked] = useState<Set<string>>(new Set());
  const [estimate, setEstimate] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const start = () => {
    if (!language) return;
    setError(null);
    loadSample(language)
      .then((words) => {
        setCheck([...words].sort(() => Math.random() - 0.5));
        setPicked(new Set());
      })
      .catch((reason) => setError(String(reason?.message ?? reason)));
  };
  const finish = () =>
    setEstimate(
      estimateLevel(
        check!.map(({ word, rank }) => ({ rank, known: picked.has(word) })),
        LEVEL_BANDS,
      ),
    );
  const toggle = (word: string) => {
    const next = new Set(picked);
    if (next.has(word)) next.delete(word);
    else next.add(word);
    setPicked(next);
  };
  const choose = (rank: number) => language && set({ language, rank });

  return (
    <div className="es-found">
      <div className="es-found__header">
        <button type="button" className="es-found__back" onClick={() => close()}>
          <ChevronLeft />
          Settings
        </button>
        <div className="es-found__title">Your level</div>
        <div className="es-found__actions">
          <button className="es-settings-content__close" aria-label="Close" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
      </div>
      <div className="es-found__body">
        {!language ? (
          <p className="es-found__empty">The level is set for the subtitles' language once it's known.</p>
        ) : estimate !== null ? (
          <div className="es-words-level__result">
            <div className="es-words-review__word">{plural(estimate, "word")}</div>
            <p className="es-found__empty">
              You know about {plural(estimate, "word")} of {languageName(language)}
              {estimate > 0 && `, ${levelLabel(estimate).split(" · ")[0]}`}. The words said more often count as known;
              you can mark any of them otherwise.
            </p>
            <div className="es-words-review__grades">
              <button type="button" className="es-found__button" onClick={() => setEstimate(null)}>
                Back
              </button>
              <button
                type="button"
                className="es-found__button es-found__button--primary"
                onClick={() => choose(estimate)}
              >
                Use this level
              </button>
            </div>
          </div>
        ) : check ? (
          <>
            <p className="es-words-level__hint">Tap the words you know. Leave the ones you aren't sure of.</p>
            <div className="es-words-level__words" role="group" aria-label="Words to check">
              {check.map(({ word }) => (
                <button
                  key={word}
                  type="button"
                  aria-pressed={picked.has(word)}
                  className={cn("es-words-level__word", { "es-words-level__word--known": picked.has(word) })}
                  onClick={() => toggle(word)}
                >
                  {word}
                </button>
              ))}
            </div>
            <div className="es-downloads__foot">
              <span>{plural(picked.size, "word")} known</span>
              <button type="button" className="es-found__button es-found__button--primary" onClick={finish}>
                Done
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="es-words-level__hint">
              Your level in {languageName(language)}
              {level !== null && level > 0 ? ` is ${levelLabel(level)}` : ""}. Words said more often than its last word
              count as known.
            </p>
            <div className="es-words-level__levels" role="group" aria-label="Levels">
              {CEFR_LEVELS.map(({ level: name, rank }) => (
                <button
                  key={name}
                  type="button"
                  className={cn("es-words-level__level", { "es-words-level__level--current": level === rank })}
                  onClick={() => choose(rank)}
                >
                  <b>{name}</b>
                  <span>{plural(rank, "word")}</span>
                </button>
              ))}
            </div>
            {error && <p className="es-settings-content__status es-settings-content__status--warning">{error}</p>}
            <div className="es-downloads__foot">
              <button type="button" className="es-found__link" onClick={() => choose(0)}>
                I'll mark words myself
              </button>
              <button
                type="button"
                className="es-found__button es-found__button--primary"
                disabled={loading}
                onClick={start}
              >
                {loading ? <Spinner /> : "Not sure? Check in a minute"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// ---- Saved words ----

// The line with the word in bold, in any of its forms
const ContextLine: FC<{ line: string; word: string; language: string }> = ({ line, word, language }) => {
  const ranks = useUnit($wordRanks);
  const isWord = (part: string) => {
    const form = normalizeWord(part, language);
    return form === word || (ranks.language === language && ranks.ranks[form ?? ""]?.[0] === word);
  };
  return (
    <>
      {line.split(/(\s+)/).map((part, index) => (
        <Fragment key={index}>{isWord(part) ? <b>{part}</b> : part}</Fragment>
      ))}
    </>
  );
};

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
  const line = word.lines?.[0];
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
        {line && (
          <span className="es-words__context" dir="auto">
            {line.url ? (
              <a href={line.url} target="_blank" rel="noreferrer" title={line.source}>
                <ContextLine line={line.line} word={word.word} language={word.language} />
              </a>
            ) : (
              <ContextLine line={line.line} word={word.word} language={word.language} />
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
      {word.lines?.[0] && (
        <p className="es-words-review__context" dir="auto">
          <ContextLine line={word.lines[0].line} word={word.word} language={word.language} />
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
  const [words, language, close, imported, ankiReviews] = useUnit([
    $words,
    $wordsLanguage,
    savedWordsClosed,
    wordsImported,
    $ankiReviews,
  ]);
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
              {ankiReviews ? (
                <span className="es-words__note">Anki reviews your words</span>
              ) : (
                <button
                  type="button"
                  className="es-found__button es-found__button--primary"
                  disabled={due.length === 0}
                  onClick={() => setReview(due.map((word) => wordKey(word.language, word.word)))}
                >
                  {due.length ? `Review ${due.length}` : "Nothing to review"}
                </button>
              )}
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
