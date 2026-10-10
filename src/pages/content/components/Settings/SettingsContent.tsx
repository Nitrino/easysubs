import { FC, PropsWithChildren, useRef } from "react";
import cn from "classnames";
import { EnableToggle } from "./EnableToggle";
import { TranslateLanguage } from "./TranslateLanguage";
import { TranslationService } from "./TranslationService";
import { TtsService } from "./TtsService";
import { DeepLApiKeyModal } from "./DeepLApiKeyModal";
import { ChatGPTApiKeyModal } from "./ChatGPTApiKeyModal";
import { OllamaModal } from "./OllamaModal";
import { DictionaryService } from "./DictionaryService";
import { AnkiContext, LearningService } from "./LearningService";
import { SubsDelay } from "./SubsDelay";
import { SubsFontSize } from "./SubsFontSize";
import { SubsBackground } from "./SubsBackground";
import { SubsBackgroundOpacity } from "./SubsBackgroundOpacity";
import { SubsSource } from "./SubsSource";
import { EnableProgressBar } from "./EnableProgressBar";
import { MoveBySubs } from "./MoveBySubs";
import { AutoPauseBySubs } from "./AutoPauseBySubs";
import { useClickOutside } from "@src/hooks/useClickOutside";
import { useUnit } from "effector-react";
import { $activeSettingsTab, activeSettingsTabChanged } from "@src/models/settings";
// import { EnableNetflixOnFlight } from "./EnableNetflixOnFlight";
import { EnableAutoStop } from "./EnableAutoStop";
import { SpokenWord } from "./SpokenWord";
import { JellyfinSubTrack } from "./JellyfinSubTrack";
import { createPortal } from "react-dom";
import { $streaming } from "@src/models/streamings";
import { CloseIcon } from "./assets/CloseIcon";
import { $sheet } from "@src/models/foundSubs";
import { $downloadsOpen } from "@src/models/downloads";
import { FoundSubsSheet } from "../FoundSubs/FoundSubsSheet";
import { DownloadsRow, DownloadsSheet } from "./Downloads";
import {
  SecondarySubsBackground,
  SecondarySubsColor,
  SecondarySubsLanguage,
  SecondarySubsPosition,
  SecondarySubsReveal,
  SecondarySubsSize,
  SecondarySubsTranslator,
} from "./SecondarySubs";

// Tab ids are saved, so a new tab takes the next id wherever it's shown
const SECOND_LINE_TAB = 3;

interface TabProps {
  isActive: boolean;
  tabId: number;
  onClick: () => void;
}

const Tab: FC<PropsWithChildren<TabProps>> = ({ children, isActive, onClick }) => {
  return (
    <div
      className={cn("es-settings-content__menu__item", {
        "es-settings-content__menu__item--active": isActive,
      })}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export const SettingsContent: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [activeSettingsTab, handleActiveSettingsTabChanged, streaming, foundSheet, downloadsOpen] = useUnit([
    $activeSettingsTab,
    activeSettingsTabChanged,
    $streaming,
    $sheet,
    $downloadsOpen,
  ]);
  const sheet = foundSheet || downloadsOpen;
  const contentRef = useRef<HTMLDivElement>(null);

  useClickOutside(contentRef, onClose);

  return (
    <>
      <div
        className={cn("es-settings-content", { "es-settings-content--sheet": sheet })}
        ref={contentRef}
        onClick={(e) => e.stopPropagation()}
      >
        {/* The search for subtitles online and the list of downloads open in place of the tabs */}
        {downloadsOpen ? (
          <DownloadsSheet onClose={onClose} />
        ) : foundSheet ? (
          <FoundSubsSheet onClose={onClose} />
        ) : (
          <>
            <div className="es-settings-content__menu">
              <div className="es-settings-content__menu__items">
                <Tab
                  isActive={activeSettingsTab === 0}
                  tabId={0}
                  onClick={() => {
                    handleActiveSettingsTabChanged(0);
                  }}
                >
                  General
                </Tab>
                <Tab
                  isActive={activeSettingsTab === 1}
                  tabId={1}
                  onClick={() => {
                    handleActiveSettingsTabChanged(1);
                  }}
                >
                  Subtitles
                </Tab>
                <Tab
                  isActive={activeSettingsTab === SECOND_LINE_TAB}
                  tabId={SECOND_LINE_TAB}
                  onClick={() => {
                    handleActiveSettingsTabChanged(SECOND_LINE_TAB);
                  }}
                >
                  Second line
                </Tab>
                <Tab
                  isActive={activeSettingsTab === 2}
                  tabId={2}
                  onClick={() => {
                    handleActiveSettingsTabChanged(2);
                  }}
                >
                  Experiments
                </Tab>
              </div>
              <button className="es-settings-content__close" aria-label="Close" onClick={() => onClose()}>
                <CloseIcon />
              </button>
            </div>
            <div className="es-settings-content__main">
              {activeSettingsTab === 0 && (
                <>
                  <div className="es-settings-content__item">
                    <EnableToggle />
                  </div>
                  <div className="es-settings-content__item">
                    <AutoPauseBySubs />
                  </div>
                  <div className="es-settings-content__item">
                    <EnableProgressBar />
                  </div>
                  <div className="es-settings-content__item">
                    <MoveBySubs />
                  </div>
                  <div className="es-settings-content__item">
                    <TranslateLanguage />
                  </div>
                  <div className="es-settings-content__item">
                    <TranslationService />
                  </div>
                  <div className="es-settings-content__item">
                    <DictionaryService />
                  </div>
                  <div className="es-settings-content__item">
                    <TtsService />
                  </div>
                  <div className="es-settings-content__item">
                    <LearningService />
                  </div>
                  <AnkiContext />
                  <div className="es-settings-content__item">
                    <DownloadsRow />
                  </div>
                </>
              )}
              {activeSettingsTab === 1 && (
                <>
                  <div className="es-settings-content__item">
                    <SubsFontSize />
                  </div>
                  <div className="es-settings-content__item">
                    <SubsBackground />
                  </div>
                  <div className="es-settings-content__item">
                    <SubsBackgroundOpacity />
                  </div>
                  <div className="es-settings-content__item">
                    <SubsDelay />
                  </div>
                  {streaming.name === "jellyfin" && (
                    <div className="es-settings-content__item">
                      <JellyfinSubTrack />
                    </div>
                  )}
                  <div className="es-settings-content__item">
                    <SubsSource />
                  </div>
                </>
              )}
              {activeSettingsTab === SECOND_LINE_TAB && (
                <>
                  <div className="es-settings-content__item">
                    <SecondarySubsLanguage />
                  </div>
                  <div className="es-settings-content__item">
                    <SecondarySubsTranslator />
                  </div>
                  <div className="es-settings-content__item">
                    <SecondarySubsPosition />
                  </div>
                  <div className="es-settings-content__item">
                    <SecondarySubsSize />
                  </div>
                  <div className="es-settings-content__item">
                    <SecondarySubsColor />
                  </div>
                  <div className="es-settings-content__item">
                    <SecondarySubsBackground />
                  </div>
                  <div className="es-settings-content__item">
                    <SecondarySubsReveal />
                  </div>
                </>
              )}
              {activeSettingsTab === 2 && (
                <>
                  {/* <div className="es-settings-content__item">
              <EnableNetflixOnFlight />
            </div> */}
                  <div className="es-settings-content__item">
                    <EnableAutoStop />
                  </div>
                  <SpokenWord />
                </>
              )}
            </div>
          </>
        )}
      </div>
      {createPortal(<DeepLApiKeyModal />, document.querySelector("body"))}
      {createPortal(<ChatGPTApiKeyModal />, document.querySelector("body"))}
      {createPortal(<OllamaModal />, document.querySelector("body"))}
    </>
  );
};
