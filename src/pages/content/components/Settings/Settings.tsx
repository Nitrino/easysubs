import { FC, useState, PropsWithChildren } from "react";
import { createPortal } from "react-dom";

import { $streaming } from "@src/models/streamings";

import "../../style.scss";
import { useStore } from "effector-react";
import { SettingsContent } from "./SettingsContent";

type TSettingsProps = {
  contentContainer: HTMLElement;
};

export const Settings: FC<TSettingsProps> = () => {
  const [showSettings, setShowSettings] = useState(false);
  const streaming = useStore($streaming);
  return (
    <>
      <div className="es-settings-icon">
        <svg
          onClick={() => setShowSettings(!showSettings)}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 180 120"
          fill="none"
        >
          <path
            fill="#fff"
            fill-rule="evenodd"
            d="M0 16C0 7.163 7.163 0 16 0h148c8.837 0 16 7.163 16 16v88c0 8.837-7.163 16-16 16H16c-8.837 0-16-7.163-16-16V16Zm83.632 66H58.16V47.888c0-3.157 1.003-5.696 3.008-7.616 1.365-1.28 2.901-2.112 4.608-2.496 1.707-.384 3.797-.576 6.272-.576h11.584v5.632H71.216c-4.693 0-7.04 1.963-7.04 5.888v7.296H78.96v5.632H64.176v14.72h19.456V82Zm36.34-44.8v5.632h-11.328c-4.309 0-6.464 1.75-6.464 5.248 0 1.877.939 3.477 2.816 4.8 1.92 1.28 4.501 2.517 7.744 3.712 1.451.555 2.688 1.13 3.712 1.728 1.024.555 2.048 1.301 3.072 2.24 1.024.939 1.792 2.155 2.304 3.648.512 1.45.768 3.136.768 5.056 0 2.133-.448 4.053-1.344 5.76-.896 1.664-2.048 2.987-3.456 3.968a18.877 18.877 0 0 1-4.352 2.176c-1.451.47-2.88.725-4.288.768-.597.043-1.451.064-2.56.064h-9.984v-5.632h9.792c2.901 0 5.269-.597 7.104-1.792 1.835-1.237 2.752-3.03 2.752-5.376 0-1.152-.256-2.155-.768-3.008-.512-.896-1.259-1.664-2.24-2.304a20.054 20.054 0 0 0-2.944-1.664c-.981-.47-2.176-.96-3.584-1.472a17.11 17.11 0 0 1-.896-.32c-6.699-2.56-10.048-6.741-10.048-12.544 0-3.584 1.152-6.25 3.456-8 2.304-1.792 5.312-2.688 9.024-2.688h11.712ZM21.5 16a5.5 5.5 0 1 0 0 11h55a5.5 5.5 0 1 0 0-11h-55ZM16 98.5a5.5 5.5 0 0 1 5.5-5.5h35a5.5 5.5 0 1 1 0 11h-35a5.5 5.5 0 0 1-5.5-5.5ZM83.5 93a5.5 5.5 0 1 0 0 11h13a5.5 5.5 0 1 0 0-11h-13Zm34.5 5.5a5.5 5.5 0 0 1 5.5-5.5h35a5.5 5.5 0 1 1 0 11h-35a5.5 5.5 0 0 1-5.5-5.5ZM102.5 16a5.5 5.5 0 1 0 0 11h55a5.5 5.5 0 1 0 0-11h-55Z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
      {showSettings &&
        createPortal(
          <SettingsContent onClose={() => setShowSettings(false)} />,
          streaming.getSettingsContentContainer()
        )}
    </>
  );
};
