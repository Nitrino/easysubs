import { FC, PropsWithChildren, useRef, useState } from "react";
import cn from "classnames";
import { EnableToggle } from "./EnableToggle";
import { TranslateLanguage } from "./TranslateLanguage";
import { LearningService } from "./LearningService";
import { SubsDelay } from "./SubsDelay";
import { SubsFontSize } from "./SubsFontSize";
import { SubsBackground } from "./SubsBackground";
import { SubsBackgroundOpacity } from "./SubsBackgroundOpacity";
import { CustomSubs } from "./CustomSubs";
import { EnableProgressBar } from "./EnableProgressBar";
import { MoveBySubs } from "./MoveBySubs";
import { AutoPauseBySubs } from "./AutoPauseBySubs";
import { useClickOutside } from "@src/hooks/useClickOutside";
import { useUnit } from "effector-react";
import { $activeSettingsTab, activeSettingsTabChanged } from "@src/models/settings";
import { EnableNetflixOnFlight } from "./EnableNetflixOnFlight";
import { EnableAutoStop } from "./EnableAutoStop";

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
  const [activeSettingsTab, handleActiveSettingsTabChanged] = useUnit([$activeSettingsTab, activeSettingsTabChanged]);
  const contentRef = useRef();

  useClickOutside(contentRef, onClose);

  return (
    <div className="es-settings-content" ref={contentRef}>
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
            isActive={activeSettingsTab === 2}
            tabId={2}
            onClick={() => {
              handleActiveSettingsTabChanged(2);
            }}
          >
            Experiments
          </Tab>
        </div>
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
              <LearningService />
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
            <div className="es-settings-content__item">
              <CustomSubs />
            </div>
          </>
        )}
        {activeSettingsTab === 2 && (
          <>
            <div className="es-settings-content__item">
              <EnableNetflixOnFlight />
            </div>
            <div className="es-settings-content__item">
              <EnableAutoStop />
            </div>
          </>
        )}
      </div>
      <div className="es-settings-content__close" onClick={() => onClose()} />
    </div>
  );
};
