import { FC, HTMLProps } from "react";

import { TranslateSelect } from "../ui/TranslateSelect";

export const TranslateLanguage: FC<HTMLProps<HTMLSelectElement>> = (props) => {
  return (
    <div className="es-settings-content__element">
      <div className="es-settings-content__element__left">Translate to</div>
      <div className="es-settings-content__element__right">
        <div style={{ width: "100%" }}>
          <TranslateSelect />
        </div>
      </div>
    </div>
  );
};
