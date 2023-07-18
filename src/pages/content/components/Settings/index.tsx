import { FC } from "react";

import s from "./Settings.module.scss";

type TSettingsProps = {
  contentContainer: HTMLElement;
};

export const Settings: FC<TSettingsProps> = () => {
  console.log("+++++++++++++++");

  return <div className={s.settings}>Settings</div>;
};
