import { FC, PropsWithChildren, useState } from "react";
import cn from "classnames";
import { EnableToggle } from "./EnableToggle";
import { TranslateLanguage } from "./TranslateLanguage";
import { LearningService } from "./LearningService";
import { SubsDelay } from "./SubsDelay";
import { SubsFontSize } from "./SubsFontSize";
import { SubsBackground } from "./SubsBackground";
import { SubsBackgroundOpacity } from "./SubsBackgroundOpacity";
import { CustomSubs } from "./CustomSubs";
import { EnableProgressBar } from "./EnableProgressbar";

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
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div className="es-settings-content">
      <div className="es-settings-content__menu">
        <div className="es-settings-content__menu__items">
          <Tab
            isActive={activeTab === 0}
            tabId={0}
            onClick={() => {
              setActiveTab(0);
            }}
          >
            General
          </Tab>
          <Tab
            isActive={activeTab === 1}
            tabId={1}
            onClick={() => {
              setActiveTab(1);
            }}
          >
            Subtitles
          </Tab>
        </div>
      </div>
      <div className="es-settings-content__main">
        {activeTab === 0 && (
          <>
            <div className="es-settings-content__item">
              <EnableToggle />
            </div>
            <div className="es-settings-content__item">
              <EnableProgressBar />
            </div>
            <div className="es-settings-content__item">
              <TranslateLanguage />
            </div>
            <div className="es-settings-content__item">
              <LearningService />
            </div>
          </>
        )}
        {activeTab === 1 && (
          <>
            <div className="es-settings-content__item">
              <SubsDelay />
            </div>
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
              <CustomSubs />
            </div>
          </>
        )}
      </div>
      <div className="es-settings-content__close" onClick={() => onClose()} />
    </div>
  );
};
