import { FC } from "react";
import { useUnit } from "effector-react";
import { FormatOptionLabelMeta } from "react-select";

import { $found, autoSyncRequested, foundRemoved, sheetOpened } from "@src/models/foundSubs";
import { $streaming } from "@src/models/streamings";
import { describeTiming, FOUND_SOURCE_TITLES, foundName } from "@src/utils/foundSubsText";
import { serviceTitle } from "@src/utils/secondarySubsOptions";
import { pickSubtitleFile } from "@src/utils/subtitleFiles";
import { Select } from "../ui/Select";

type TSourceOption = { value: string; label: string; hint?: string; tag?: string };

const formatOption = (option: TSourceOption, { context }: FormatOptionLabelMeta<TSourceOption>) =>
  context === "value" ? (
    option.label
  ) : (
    <span className="es-option">
      <span className="es-option__label">{option.label}</span>
      {option.hint && <span className="es-option__hint">{option.hint}</span>}
      {option.tag && <span className="es-tag es-tag--found">{option.tag}</span>}
    </span>
  );

// Where the main subtitles come from: the video, a file found online, or a file of the user's. A file shows in a card
// under the row: its source, the release it was made for, and how it was moved to fit the video.
export const SubsSource: FC = () => {
  const [found, streaming] = useUnit([$found, $streaming]);
  const main = found.main;

  const groups: { label: string; options: TSourceOption[] }[] = [
    // "From Netflix", "From the playground": the service's own subtitles
    { label: "", options: [{ value: "video", label: `From ${serviceTitle(streaming.name)}` }] },
    {
      label: "Found online",
      options: [
        ...(main
          ? [{ value: "found", label: foundName(main.result), tag: FOUND_SOURCE_TITLES[main.result.source] }]
          : []),
        { value: "find", label: "Find subtitles…" },
        { value: "file", label: "Open a file…" },
      ],
    },
  ];
  const options: TSourceOption[] = groups.flatMap((group) => group.options);
  const running = main?.sync === "pending" || main?.sync === "running";
  const selected = options.find((option) => option.value === (main ? "found" : "video"));

  const handleChange = (option: TSourceOption) => {
    if (option.value === "video" && main) foundRemoved("main");
    if (option.value === "find") sheetOpened({ role: "main" });
    if (option.value === "file") pickSubtitleFile("main");
  };

  return (
    <>
      <div className="es-settings-content__element">
        <div className="es-settings-content__element__left">Subtitles from</div>
        <div className="es-settings-content__element__right">
          <Select
            options={groups}
            value={selected}
            menuWidth={230}
            formatOptionLabel={formatOption}
            onChange={(option: TSourceOption) => handleChange(option)}
          />
        </div>
      </div>
      {main && (
        <div className="es-source-card" aria-live="polite">
          <div className="es-source-card__row">
            <span className="es-tag es-tag--found">{FOUND_SOURCE_TITLES[main.result.source]}</span>
            <button type="button" className="es-found__link" onClick={() => foundRemoved("main")}>
              Remove
            </button>
          </div>
          <div className="es-source-card__release" title={main.result.release}>
            {main.result.release}
          </div>
          <div className="es-source-card__row">
            <span className="es-source-card__timing">{describeTiming(main)}</span>
            <button
              type="button"
              className="es-found__button"
              disabled={running}
              onClick={() => autoSyncRequested("main")}
            >
              {running ? "Syncing…" : "Sync"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
