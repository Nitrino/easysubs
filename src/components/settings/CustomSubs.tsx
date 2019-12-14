import React, { useRef, useState } from "react";
import { updateSubs } from "../../event";
import { parse } from "subtitle";
import { toast } from "react-toastify";

function CustomSubs() {
  const inputFile = useRef(null);

  function handleFileSelect(event: any) {
    event.preventDefault();
    inputFile.current.click();
  }

  function handleOnChange(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const data: string = reader.result as string;

      updateSubs(parse(data));
      (toast as any).info("🦄 Custom subtitles loaded");
    };
    reader.readAsText(file);
    inputFile.current.value = null;
  }

  return (
    <div className="easysubs-settings__custom-subs easysubs-settings__item">
      <div className="easysubs-settings__item__left">
        <span>Custom subtitles: </span>
      </div>
      <div className="easysubs-settings__item__right">
        <input
          type="file"
          accept=".vtt,.srt"
          id="file"
          ref={inputFile}
          onChange={handleOnChange}
          style={{ display: "none" }}
        />
        <div className="easysubs-settings__button" onClick={handleFileSelect}>
          Select file
        </div>
      </div>
    </div>
  );
}

export default CustomSubs;
