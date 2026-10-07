import { FC, FormEvent, KeyboardEvent, ReactNode, useState } from "react";
import { useUnit } from "effector-react";
import cn from "classnames";

import {
  $candidates,
  $found,
  $loadError,
  $loadingKey,
  $loginError,
  $query,
  $results,
  $searchError,
  $searchFailed,
  $searchMirrored,
  $searchedQuery,
  $sheet,
  $titleDetected,
  autoSyncRequested,
  candidatePicked,
  episodePicked,
  foundRemoved,
  isLimitReached,
  languagePicked,
  loadRequested,
  loginFx,
  lookupTitleFx,
  searchFx,
  sheetClosed,
  sheetRoleChanged,
  sheetViewChanged,
  shiftNudged,
  signedOut,
  syncUndone,
  titleSubmitted,
  typePicked,
  type TFoundTrack,
} from "@src/models/foundSubs";
import {
  $foundSubsAddic7ed,
  $foundSubsHideMachine,
  $foundSubsMirror,
  $foundSubsNextEpisode,
  $foundSubsStripSdh,
  $jimakuApiKey,
  $opensubtitlesQuota,
  $opensubtitlesAccount,
  $subdlApiKey,
  $subsourceApiKey,
  foundSubsAddic7edChanged,
  foundSubsHideMachineChanged,
  foundSubsMirrorChanged,
  foundSubsNextEpisodeChanged,
  foundSubsStripSdhChanged,
  jimakuApiKeyChanged,
  subdlApiKeyChanged,
  subsourceApiKeyChanged,
} from "@src/models/settings";
import { $streaming } from "@src/models/streamings";
import type { TFoundResult, TFoundRole, TNextEpisodeMode } from "@src/models/types";
import { isSameServiceRelease } from "@src/subsSources/rank";
import { FOUND_SOURCE_TITLES, describeQuota, describeSync, formatShift, foundName } from "@src/utils/foundSubsText";
import { foundFileKey } from "@src/utils/foundSubsCache";
import { LANGUAGES, languageName } from "@src/utils/languages";
import { serviceTitle } from "@src/utils/secondarySubsOptions";
import { Select } from "../ui/Select";
import { Spinner } from "../ui/Spinner";
import { Toggle } from "../ui/Toggle";
import { CloseIcon } from "../Settings/assets/CloseIcon";
import { MinusIcon } from "../Settings/assets/MinusIcon";
import { PlusIcon } from "../Settings/assets/PlusIcon";

// The search for subtitles online, in place of the settings panel: the title and episode, the language, the line to
// load on, the file loaded there with its timing, the results, and the OpenSubtitles count. Its Sources view holds
// the accounts, keys and cleanup settings.

const SHIFT_STEP = 0.25;
const TAGGED_SERVICES: Record<string, string> = { netflix: "NF", amazon: "AMZN" };

// Keys typed in the sheet stay in it: the player's shortcuts (space, F, arrows) mustn't act on them
const keepKeys = (event: KeyboardEvent) => event.stopPropagation();

const Row: FC<{ label: ReactNode; children: ReactNode; htmlFor?: string }> = ({ label, children, htmlFor }) => (
  <div className="es-settings-content__element">
    <div className="es-settings-content__element__left">
      {htmlFor ? <label htmlFor={htmlFor}>{label}</label> : label}
    </div>
    <div className="es-settings-content__element__right">{children}</div>
  </div>
);

const Segmented = <T extends string>({
  options,
  value,
  onChange,
  label,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
  label: string;
}) => (
  <div className="es-segmented" role="radiogroup" aria-label={label}>
    {options.map((option) => (
      <button
        key={option.value}
        type="button"
        role="radio"
        aria-checked={option.value === value}
        className={cn("es-segmented__item", { "es-segmented__item--selected": option.value === value })}
        onClick={() => onChange(option.value)}
      >
        {option.label}
      </button>
    ))}
  </div>
);

const SearchIcon = () => (
  <svg viewBox="0 0 12 12" aria-hidden="true">
    <circle cx="5" cy="5" r="3.6" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <path d="M7.7 7.7 11 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const SourcesIcon = () => (
  <svg viewBox="0 0 14 14" aria-hidden="true">
    <path d="M2 4h10M2 10h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="5" cy="4" r="1.7" fill="var(--es-hud-strong)" stroke="currentColor" strokeWidth="1.4" />
    <circle cx="9" cy="10" r="1.7" fill="var(--es-hud-strong)" stroke="currentColor" strokeWidth="1.4" />
  </svg>
);

const ChevronLeft = () => (
  <svg viewBox="0 0 12 12" aria-hidden="true">
    <path
      d="M7.5 2.5 4 6l3.5 3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const LANGUAGE_OPTIONS = LANGUAGES.map((language) => ({ value: language.value, label: language.label }));
const ROLE_OPTIONS: { value: TFoundRole; label: string }[] = [
  { value: "main", label: "Main line" },
  { value: "second", label: "Second line" },
];
const TYPE_OPTIONS: { value: "movie" | "episode"; label: string }[] = [
  { value: "movie", label: "Film" },
  { value: "episode", label: "Series" },
];

export const FoundSubsSheet: FC<{ onClose: () => void }> = ({ onClose }) => {
  const sheet = useUnit($sheet);
  if (!sheet) return null;
  const sources = sheet.view === "sources";

  return (
    <div className="es-found" onKeyDown={keepKeys} onKeyUp={keepKeys} onKeyPress={keepKeys}>
      <div className="es-found__header">
        <button
          type="button"
          className="es-found__back"
          onClick={() => (sources ? sheetViewChanged("search") : sheetClosed())}
        >
          <ChevronLeft />
          {sources ? "Find" : "Settings"}
        </button>
        <div className="es-found__title">{sources ? "Sources" : "Find subtitles"}</div>
        <div className="es-found__actions">
          {!sources && (
            <button
              type="button"
              className="es-found__icon"
              aria-label="Sources"
              title="Sources"
              onClick={() => sheetViewChanged("sources")}
            >
              <SourcesIcon />
            </button>
          )}
          <button className="es-settings-content__close" aria-label="Close" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
      </div>
      <div className="es-found__body">{sources ? <SourcesView /> : <SearchView role={sheet.role} />}</div>
    </div>
  );
};

// ---- Search ----------------------------------------------------------------------------------------

const SearchView: FC<{ role: TFoundRole }> = ({ role }) => {
  const [query, detected, candidates, streaming, searching, looking] = useUnit([
    $query,
    $titleDetected,
    $candidates,
    $streaming,
    searchFx.pending,
    lookupTitleFx.pending,
  ]);
  const candidateOptions = candidates.map((candidate) => ({
    value: candidate.imdbId,
    label: candidate.year ? `${candidate.name} (${candidate.year})` : candidate.name,
  }));

  return (
    <>
      <TitleField key={query.title} title={query.title} busy={searching || looking} />
      <div className="es-found__meta">
        <Segmented label="Kind" options={TYPE_OPTIONS} value={query.type} onChange={typePicked} />
        {query.type === "episode" && (
          <>
            <NumberField
              label="Season"
              short="S"
              value={query.season}
              onChange={(season) => episodePicked({ season })}
            />
            <NumberField
              label="Episode"
              short="E"
              value={query.episode}
              onChange={(episode) => episodePicked({ episode })}
            />
          </>
        )}
        {detected && <span className="es-found__hint">From {serviceTitle(streaming.name)}</span>}
      </div>

      <div className="es-found__group">
        {candidateOptions.length > 1 && (
          <div className="es-settings-content__item">
            <Row label="Title">
              <Select
                options={candidateOptions}
                value={candidateOptions.find((option) => option.value === query.imdbId) ?? null}
                placeholder="Pick the title"
                menuWidth={240}
                onChange={(option: (typeof candidateOptions)[number]) => candidatePicked(option.value)}
              />
            </Row>
          </div>
        )}
        <div className="es-settings-content__item">
          <Row label="Language">
            <Select
              options={LANGUAGE_OPTIONS}
              value={
                LANGUAGE_OPTIONS.find((option) => option.value === query.language) ?? {
                  value: query.language,
                  label: languageName(query.language),
                }
              }
              onChange={(option: (typeof LANGUAGE_OPTIONS)[number]) => languagePicked(option.value)}
            />
          </Row>
        </div>
        <div className="es-settings-content__item">
          <Row label="Load as">
            <Segmented label="Load as" options={ROLE_OPTIONS} value={role} onChange={sheetRoleChanged} />
          </Row>
        </div>
      </div>

      <LoadedFile role={role} />
      <Warnings />
      <Results role={role} />
      <Quota />
    </>
  );
};

// The title to search for; typed text stays until Enter, a title read from the service replaces it
const TitleField: FC<{ title: string; busy: boolean }> = ({ title: initial, busy }) => {
  const [title, setTitle] = useState(initial);
  const submit = (event: FormEvent) => {
    event.preventDefault();
    titleSubmitted(title);
  };
  return (
    <form className="es-found__search" onSubmit={submit} role="search">
      <SearchIcon />
      <input
        className="es-found__search-input"
        type="search"
        aria-label="Title"
        placeholder="Title of the film or show"
        value={title}
        autoFocus={!initial}
        onChange={(event) => setTitle(event.target.value)}
      />
      {busy && <Spinner />}
    </form>
  );
};

const NumberField: FC<{ label: string; short: string; value?: number; onChange: (value?: number) => void }> = ({
  label,
  short,
  value,
  onChange,
}) => {
  const [text, setText] = useState(value ? String(value) : "");
  const commit = () => {
    const number = Number.parseInt(text, 10);
    const next = Number.isFinite(number) && number > 0 ? number : undefined;
    if (next !== value) onChange(next);
  };
  return (
    <label className="es-found__number">
      <span aria-hidden="true">{short}</span>
      <input
        aria-label={label}
        inputMode="numeric"
        value={text}
        onChange={(event) => setText(event.target.value.replace(/\D/g, "").slice(0, 3))}
        onBlur={commit}
        onKeyDown={(event) => event.key === "Enter" && commit()}
      />
    </label>
  );
};

// The file on the line the sheet loads to: its source and timing, Auto-sync, Undo and the shift buttons
const LoadedFile: FC<{ role: TFoundRole }> = ({ role }) => {
  const found = useUnit($found);
  const track: TFoundTrack | null = found[role];
  if (!track) return null;
  const running = track.sync === "pending" || track.sync === "running";

  return (
    <div className="es-found__loaded" aria-live="polite">
      <div className="es-found__loaded-row">
        <span className="es-found__loaded-name">
          <b>{foundName(track.result)}</b>
          <span className="es-tag es-tag--source">{FOUND_SOURCE_TITLES[track.result.source]}</span>
        </span>
        <button type="button" className="es-found__link" onClick={() => foundRemoved(role)}>
          Remove
        </button>
      </div>
      <div className="es-found__release">{track.result.release}</div>
      <p className="es-found__status">
        {track.fromCache && track.result.source !== "file" && <span>From this device, no download used.</span>}
        <span>{describeSync(track)}</span>
        {track.before && !running && (
          <button type="button" className="es-found__link" onClick={() => syncUndone(role)}>
            Undo
          </button>
        )}
      </p>
      <div className="es-found__loaded-row">
        <button
          type="button"
          className="es-found__button es-found__button--primary"
          disabled={running}
          onClick={() => autoSyncRequested(role)}
        >
          {running ? "Syncing…" : "Auto-sync"}
        </button>
        <div className="es-stepper" role="group" aria-label="Shift">
          <button
            type="button"
            className="es-stepper__button"
            aria-label="Show earlier"
            onClick={() => shiftNudged({ role, delta: -SHIFT_STEP })}
          >
            <MinusIcon />
          </button>
          <div className="es-stepper__value es-stepper__value--wide">{formatShift(track.timing.shift)}</div>
          <button
            type="button"
            className="es-stepper__button"
            aria-label="Show later"
            onClick={() => shiftNudged({ role, delta: SHIFT_STEP })}
          >
            <PlusIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

const Warnings: FC = () => {
  const [quota, mirror, session, loadError, searchError, failed, mirrored] = useUnit([
    $opensubtitlesQuota,
    $foundSubsMirror,
    $opensubtitlesAccount,
    $loadError,
    $searchError,
    $searchFailed,
    $searchMirrored,
  ]);
  const limit = isLimitReached(quota);
  const lines: { text: string; tag?: string }[] = [];

  if (limit) {
    lines.push({
      tag: "Limit",
      text: mirror
        ? `Today's OpenSubtitles downloads are used, so its files come from the Stremio mirror until the count resets.${session ? "" : " Sign in for 20 a day."}`
        : `Today's OpenSubtitles downloads are used.${session ? "" : " Sign in for 20 a day,"} or turn on the Stremio mirror under Sources.`,
    });
  } else if (mirrored) {
    lines.push({ text: "OpenSubtitles can't be reached, so its files come from the Stremio mirror." });
  }
  if (loadError) lines.push({ tag: "Error", text: loadError });
  if (searchError) lines.push({ tag: "Error", text: `The search failed: ${searchError}` });
  for (const failure of failed) lines.push({ text: `${FOUND_SOURCE_TITLES[failure.source]}: ${failure.error}` });

  if (lines.length === 0) return null;
  return (
    <div className="es-found__warnings" role="status">
      {lines.map((line) => (
        <p key={line.text} className="es-found__warning">
          {line.tag && <span className="es-tag es-tag--limit">{line.tag}</span>}
          <span>{line.text}</span>
        </p>
      ))}
    </div>
  );
};

const formatCount = (count: number) =>
  count >= 1000 ? `${(count / 1000).toFixed(count >= 10_000 ? 0 : 1)}k` : String(count);

const Results: FC<{ role: TFoundRole }> = ({ role }) => {
  const [
    results,
    hideMachine,
    searched,
    query,
    searching,
    looking,
    loadingKey,
    found,
    streaming,
    subdlKey,
    subsourceKey,
  ] = useUnit([
    $results,
    $foundSubsHideMachine,
    $searchedQuery,
    $query,
    searchFx.pending,
    lookupTitleFx.pending,
    $loadingKey,
    $found,
    $streaming,
    $subdlApiKey,
    $subsourceApiKey,
  ]);
  const machine = results.filter((result) => result.machineTranslated);
  const shown = hideMachine ? results.filter((result) => !result.machineTranslated) : results;
  const track = found[role];
  const loaded = track ? foundFileKey(track.result) : null;
  const keys = Boolean(subdlKey && subsourceKey);
  const episodeOf =
    query.type === "episode" && query.season && query.episode
      ? { title: query.title, imdbId: query.imdbId, season: query.season, episode: query.episode }
      : undefined;

  let empty = "";
  if (!query.title) empty = "Type the title of the film or show, then press Enter.";
  else if (searching || looking) empty = "Searching…";
  else if (!searched) empty = "Press Enter to search.";
  else if (shown.length === 0) {
    const episode =
      query.type === "episode" && query.season && query.episode ? ` S${query.season} E${query.episode}` : "";
    empty = `No ${languageName(query.language)} subtitles for ${query.title}${episode}.${keys ? "" : " SubDL and SubSource may have them: add your free key under Sources."}`;
  }

  return (
    <>
      <div className="es-found__section">
        <span>Results</span>
        {searched && !searching && <span>{shown.length}</span>}
      </div>
      <div className="es-found__group">
        {empty ? (
          <p className="es-found__empty">{empty}</p>
        ) : (
          <ul className="es-found__results" aria-label="Results">
            {shown.map((result) => (
              <ResultRow
                key={foundFileKey(result)}
                result={result}
                loaded={foundFileKey(result) === loaded}
                loading={foundFileKey(result) === loadingKey}
                busy={loadingKey !== null}
                service={streaming.name}
                onLoad={() => loadRequested({ result, role, episodeOf })}
              />
            ))}
          </ul>
        )}
      </div>
      {machine.length > 0 && (
        <div className="es-found__toggle">
          <span>Show machine translations ({machine.length})</span>
          <Toggle isEnabled={!hideMachine} onChange={(show) => foundSubsHideMachineChanged(!show)} />
        </div>
      )}
    </>
  );
};

const ResultRow: FC<{
  result: TFoundResult;
  loaded: boolean;
  loading: boolean;
  busy: boolean;
  service: string;
  onLoad: () => void;
}> = ({ result, loaded, loading, busy, service, onLoad }) => (
  <li className={cn("es-found__result", { "es-found__result--loaded": loaded })}>
    <div className="es-found__result-text">
      <div className="es-found__release">{result.release || "No release name"}</div>
      <div className="es-found__chips">
        <span className="es-tag es-tag--source">{FOUND_SOURCE_TITLES[result.source]}</span>
        {isSameServiceRelease(result.release, service) && (
          <span className="es-tag es-tag--track">{TAGGED_SERVICES[service] ?? serviceTitle(service)} release</span>
        )}
        {result.machineTranslated && <span className="es-tag es-tag--translate">Machine-translated</span>}
        {result.hearingImpaired && <span className="es-tag es-tag--quiet">Hearing impaired</span>}
        {result.trusted && <span className="es-tag es-tag--quiet">Trusted</span>}
        {result.fps && Math.abs(result.fps - 23.976) > 0.01 && (
          <span className="es-tag es-tag--fps">{result.fps} fps</span>
        )}
        {result.downloads ? <span>{formatCount(result.downloads)} downloads</span> : null}
      </div>
    </div>
    <button
      type="button"
      className="es-found__button"
      disabled={loaded || busy}
      aria-label={`${loaded ? "Loaded" : "Load"} ${result.release}`}
      onClick={onLoad}
    >
      {loading ? <Spinner /> : loaded ? "Loaded" : "Load"}
    </button>
  </li>
);

const Quota: FC = () => {
  const [quota, session] = useUnit([$opensubtitlesQuota, $opensubtitlesAccount]);
  const allowed = quota?.allowed ?? (session ? 20 : 5);
  const remaining = Math.max(0, quota?.remaining ?? allowed);

  return (
    <div className="es-found__quota">
      <div className="es-found__quota-row">
        <span>OpenSubtitles</span>
        <span>{describeQuota(quota, Boolean(session))}</span>
      </div>
      <div className={cn("es-found__meter", { "es-found__meter--low": remaining <= 1 })}>
        <i style={{ width: `${(remaining / allowed) * 100}%` }} />
      </div>
      <p>
        {session ? `Signed in as ${session.username}. ` : "Without an account: 5 downloads a day per IP address. "}
        <button type="button" className="es-found__link" onClick={() => sheetViewChanged("sources")}>
          {session ? "Account" : "Sign in"}
        </button>
        {session ? "" : " for 20."} Files already on this device don't count.
      </p>
    </div>
  );
};

// ---- Sources ---------------------------------------------------------------------------------------

const NEXT_EPISODE_OPTIONS: { value: TNextEpisodeMode; label: string }[] = [
  { value: "off", label: "Off" },
  { value: "ask", label: "Ask" },
  { value: "load", label: "Load" },
];

const SourcesView: FC = () => {
  const [mirror, addic7ed, hideMachine, stripSdh, nextEpisode, subdlKey, subsourceKey, jimakuKey] = useUnit([
    $foundSubsMirror,
    $foundSubsAddic7ed,
    $foundSubsHideMachine,
    $foundSubsStripSdh,
    $foundSubsNextEpisode,
    $subdlApiKey,
    $subsourceApiKey,
    $jimakuApiKey,
  ]);

  return (
    <>
      <div className="es-found__group">
        <OpenSubtitlesAccount />
        <div className="es-settings-content__item">
          <Row label="Stremio mirror">
            <Toggle isEnabled={mirror} onChange={foundSubsMirrorChanged} />
          </Row>
          <p className="es-settings-content__status">
            OpenSubtitles files without a daily limit, when the day's downloads are used or OpenSubtitles is down.
            Unofficial: it can stop working.
          </p>
        </div>
        <div className="es-settings-content__item">
          <Row label="Addic7ed">
            <Toggle isEnabled={addic7ed} onChange={foundSubsAddic7edChanged} />
          </Row>
          <p className="es-settings-content__status">TV episodes, through Gestdown. No account needed.</p>
        </div>
        <KeyRow
          key={`subdl:${subdlKey}`}
          name="SubDL"
          value={subdlKey}
          onSave={subdlApiKeyChanged}
          where="subdl.com/panel/api"
        />
        <KeyRow
          key={`subsource:${subsourceKey}`}
          name="SubSource"
          value={subsourceKey}
          onSave={subsourceApiKeyChanged}
          where="your SubSource profile"
        />
        <KeyRow
          key={`jimaku:${jimakuKey}`}
          name="Jimaku"
          value={jimakuKey}
          onSave={jimakuApiKeyChanged}
          where="jimaku.cc/account"
          note="Japanese, for anime."
        />
      </div>

      <div className="es-found__section">
        <span>Every found file</span>
      </div>
      <div className="es-found__group">
        <div className="es-settings-content__item">
          <Row label="Hide machine translations">
            <Toggle isEnabled={hideMachine} onChange={foundSubsHideMachineChanged} />
          </Row>
        </div>
        <div className="es-settings-content__item">
          <Row label="Remove [sound descriptions]">
            <Toggle isEnabled={stripSdh} onChange={foundSubsStripSdhChanged} />
          </Row>
          <p className="es-settings-content__status">Applies to files loaded from now on.</p>
        </div>
        <div className="es-settings-content__item">
          <Row label="Next episode">
            <Segmented
              label="Next episode"
              options={NEXT_EPISODE_OPTIONS}
              value={nextEpisode}
              onChange={foundSubsNextEpisodeChanged}
            />
          </Row>
          <p className="es-settings-content__status">
            When an episode starts after one with a found file: offer the top result for it, load it, or do nothing.
          </p>
        </div>
      </div>
    </>
  );
};

const OpenSubtitlesAccount: FC = () => {
  const [session, signingIn, error] = useUnit([$opensubtitlesAccount, loginFx.pending, $loginError]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  if (session) {
    return (
      <div className="es-settings-content__item">
        <Row label="OpenSubtitles">
          <button type="button" className="es-found__button" onClick={() => signedOut()}>
            Sign out
          </button>
        </Row>
        <p className="es-settings-content__status">
          Signed in as {session.username}: 20 downloads a day, 1,000 with VIP.
        </p>
      </div>
    );
  }

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (username && password) loginFx({ username, password });
  };
  return (
    <form className="es-settings-content__item es-found__login" onSubmit={submit}>
      <Row label="OpenSubtitles">
        <button
          type="submit"
          className="es-found__button es-found__button--primary"
          disabled={signingIn || !username || !password}
        >
          {signingIn ? "Signing in…" : "Sign in"}
        </button>
      </Row>
      <div className="es-found__fields">
        <input
          className="es-found__field"
          aria-label="OpenSubtitles username"
          placeholder="Username"
          autoComplete="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <input
          className="es-found__field"
          type="password"
          aria-label="OpenSubtitles password"
          placeholder="Password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      {error && <p className="es-settings-content__status es-settings-content__status--error">{error}</p>}
      <p className="es-settings-content__status">
        5 downloads a day without an account, 20 with a free one. The password stays on this device to renew the sign-in
        each day.
      </p>
    </form>
  );
};

const KeyRow: FC<{ name: string; value: string; where: string; note?: string; onSave: (key: string) => void }> = ({
  name,
  value,
  where,
  note,
  onSave,
}) => {
  const [key, setKey] = useState(value);
  const save = () => key.trim() !== value && onSave(key);

  return (
    <div className="es-settings-content__item">
      <Row label={name}>
        <input
          className="es-found__field es-found__field--key"
          type="password"
          aria-label={`${name} key`}
          placeholder="Your key"
          value={key}
          onChange={(event) => setKey(event.target.value)}
          onBlur={save}
          onKeyDown={(event) => event.key === "Enter" && save()}
        />
      </Row>
      <p className="es-settings-content__status">
        {value ? "Searched with your key." : `Off until you add your free key from ${where}.`}
        {note ? ` ${note}` : ""}
      </p>
    </div>
  );
};
