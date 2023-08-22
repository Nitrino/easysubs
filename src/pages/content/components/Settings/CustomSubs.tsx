import { ChangeEvent, FC } from "react";
import { useUnit } from "effector-react";
import { parse } from "subtitle";

import { ES_CUSTOM_SUB_LABEL, esSubsChanged, updateCustomSubsFx } from "@src/models/subs";

export const CustomSubs: FC = () => {
  const [handleUpdateCustomSubsFx] = useUnit([updateCustomSubsFx]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = (e.target as HTMLInputElement).files!;
    const file = files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const data = reader.result;
      if (typeof data === "string") {
        handleUpdateCustomSubsFx(parse(data));
        esSubsChanged(ES_CUSTOM_SUB_LABEL);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="es-settings-content__element">
      <div className="es-settings-content__element__left">Custom subtitles</div>
      <div className="es-settings-content__element__right">
        <input type="file" id="file" onChange={handleFileChange} className="es-input" />
        <label htmlFor="file" className="es-input__label">
          Select file
        </label>
      </div>
    </div>
  );
};
