import { FC, useState } from "react";
import { useGate, useUnit } from "effector-react";

import {
  $deletingDownloads,
  $downloadUse,
  $downloads,
  $downloadsError,
  DownloadsGate,
  downloadsClosed,
  downloadsDeleted,
  downloadsOpened,
} from "@src/models/downloads";
import {
  downloadInUse,
  downloadTitle,
  megabytes,
  usedAgo,
  type TDownload,
  type TDownloadKind,
} from "@src/utils/downloads";
import { ChevronLeft } from "./assets/ChevronLeft";
import { CloseIcon } from "./assets/CloseIcon";
import { TrashIcon } from "./assets/TrashIcon";

// What's kept on the device: a row at the end of the General tab with their total, and the sheet that lists them in
// place of the settings panel (src/models/downloads)

const total = (downloads: TDownload[]) => downloads.reduce((sum, download) => sum + download.size, 0);

export const DownloadsRow: FC = () => {
  useGate(DownloadsGate);
  const [downloads, open] = useUnit([$downloads, downloadsOpened]);
  return (
    <div className="es-settings-content__element">
      <div className="es-settings-content__element__left">Downloaded</div>
      <div className="es-settings-content__element__right">
        <button type="button" className="es-downloads__open" onClick={() => open()}>
          {downloads === null ? "…" : downloads.length > 0 ? megabytes(total(downloads)) : "Nothing"}
          <span aria-hidden="true">›</span>
        </button>
      </div>
    </div>
  );
};

// What the delete button names after the title: a dictionary and a model of the same pair have the same one
const KIND_NAMES: Record<TDownloadKind, string> = { dictionary: " dictionary", bergamot: " model", speech: "" };

const SECTIONS: { kind: TDownloadKind; title: string }[] = [
  { kind: "dictionary", title: "Dictionaries" },
  { kind: "bergamot", title: "Bergamot models" },
  { kind: "speech", title: "Speech models · experiment" },
];

const DownloadRow: FC<{ download: TDownload }> = ({ download }) => {
  const [use, deleting, deleted] = useUnit([$downloadUse, $deletingDownloads, downloadsDeleted]);
  const title = downloadTitle(download);
  const details = [
    download.kind === "dictionary" ? "Wiktionary" : download.about,
    download.used && usedAgo(download.used),
  ]
    .filter(Boolean)
    .join(" · ");
  return (
    <div className="es-downloads__file">
      <div className="es-downloads__name">
        <span>
          {title}
          {downloadInUse(download, use) && <span className="es-tag es-tag--rich">In use</span>}
        </span>
        {details && <span className="es-downloads__details">{details}</span>}
      </div>
      <span className="es-downloads__size">{megabytes(download.size)}</span>
      <button
        type="button"
        className="es-found__icon es-downloads__delete"
        aria-label={`Delete ${title}${KIND_NAMES[download.kind]}`}
        title="Delete"
        disabled={deleting}
        onClick={() => deleted([download.id])}
      >
        <TrashIcon />
      </button>
    </div>
  );
};

export const DownloadsSheet: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [downloads, error, deleting, close, deleted] = useUnit([
    $downloads,
    $downloadsError,
    $deletingDownloads,
    downloadsClosed,
    downloadsDeleted,
  ]);
  // Deleting everything asks once more
  const [confirming, setConfirming] = useState(false);
  const all = downloads ?? [];

  return (
    <div className="es-found">
      <div className="es-found__header">
        <button type="button" className="es-found__back" onClick={() => close()}>
          <ChevronLeft />
          Settings
        </button>
        <div className="es-found__title">Downloaded</div>
        <div className="es-found__actions">
          <button className="es-settings-content__close" aria-label="Close" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
      </div>
      <div className="es-found__body">
        {error && <p className="es-settings-content__status es-settings-content__status--warning">{error}</p>}
        {downloads === null && !error && <p className="es-found__empty">…</p>}
        {downloads !== null && all.length === 0 && (
          <p className="es-found__empty">
            Nothing is downloaded. Dictionaries and translation models download when an on-device translator needs them.
          </p>
        )}
        {all.length > 0 && (
          <p className="es-downloads__summary">EasySubs keeps {megabytes(total(all))} on this device.</p>
        )}
        {SECTIONS.map(({ kind, title }) => {
          const items = all.filter((download) => download.kind === kind);
          if (items.length === 0) return null;
          return (
            <section key={kind} aria-label={title}>
              <div className="es-found__section">
                <span>{title}</span>
                <span>{megabytes(total(items))}</span>
              </div>
              <div className="es-downloads__group">
                {items.map((download) => (
                  <DownloadRow key={download.id} download={download} />
                ))}
              </div>
            </section>
          );
        })}
        {all.length > 0 && (
          <div className="es-downloads__foot">
            <span>Deleted files download again when they're needed.</span>
            {confirming ? (
              <button
                type="button"
                className="es-found__button es-downloads__confirm"
                disabled={deleting}
                onClick={() => {
                  setConfirming(false);
                  deleted(all.map((download) => download.id));
                }}
              >
                Delete {megabytes(total(all))}
              </button>
            ) : (
              <button type="button" className="es-found__button" onClick={() => setConfirming(true)}>
                Delete all
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
