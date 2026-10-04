import { FC, useEffect, useState } from "react";
import { useUnit } from "effector-react";
import { $video } from "@src/models/videos";
import { esSubsChanged } from "@src/models/subs";
import { Select } from "../ui/Select/Select";

type TrackOption = { value: number; label: string };

const DISABLED_OPTION: TrackOption = { value: -1, label: "Disabled" };

export const JellyfinSubTrack: FC = () => {
  const video = useUnit($video);
  const [options, setOptions] = useState<TrackOption[]>([]);
  const [selected, setSelected] = useState<TrackOption>(DISABLED_OPTION);

  useEffect(() => {
    if (!video) return;

    const buildOptions = () => {
      const opts: TrackOption[] = [DISABLED_OPTION];
      let active: TrackOption = DISABLED_OPTION;
      for (let i = 0; i < video.textTracks.length; i++) {
        const t = video.textTracks[i];
        if (t.kind !== "subtitles" && t.kind !== "captions") continue;
        const label = t.label || t.language || `Track ${i}`;
        opts.push({ value: i, label });
        if (t.mode !== "disabled") active = { value: i, label };
      }
      setOptions(opts);
      setSelected(active);
    };

    buildOptions();
    video.textTracks.addEventListener("change", buildOptions);
    video.textTracks.addEventListener("addtrack", buildOptions);
    return () => {
      video.textTracks.removeEventListener("change", buildOptions);
      video.textTracks.removeEventListener("addtrack", buildOptions);
    };
  }, [video]);

  const handleChange = (opt: TrackOption | null) => {
    if (!video || !opt) return;
    for (let i = 0; i < video.textTracks.length; i++) {
      const t = video.textTracks[i];
      if (t.kind !== "subtitles" && t.kind !== "captions") continue;
      t.mode = i === opt.value ? "showing" : "disabled";
    }
    if (opt.value === -1) {
      esSubsChanged(""); // Clear the EasySubs overlay immediately
    }
    setSelected(opt);
  };

  if (options.length <= 1) return null;

  return (
    <div className="es-settings-content__element">
      <div className="es-settings-content__element__left">Subtitle track</div>
      <div className="es-settings-content__element__right">
        <Select
          options={options}
          value={selected}
          onChange={(opt) => handleChange(opt as TrackOption)}
        />
      </div>
    </div>
  );
};
