import React from "react";
import FrequencyDots from "./FrequencyDots";

function TranslateAlternativesItem(props: { alternative: any[] }) {
  return (
    <div className="easysubs-translate-alternative-item">
      <div className="easysubs-translate-alternative-item-translate">
        {props.alternative[0]}
      </div>
      <div className="easysubs-translate-alternative-item-original">
        {props.alternative[1].slice(0, 3).join(", ")}
      </div>
      <div className="easysubs-translate-alternative-item-frequency">
        <FrequencyDots frequency={props.alternative[3]} />
      </div>
    </div>
  );
}

export default TranslateAlternativesItem;
