import React, { useRef } from "react";
import { toast } from "react-toastify";
import Plus from "../../images/plus.svg";
import Lingualeo from "../../learning-services/lingualeo";
import Utils from "../../utils";
import FrequencyDots from "./FrequencyDots";

function TranslateAlternativesItem(props: { alternative: any[]; word: string }) {
  const translateNode: any = useRef();
  function handleOnClick(e: any) {
    e.stopPropagation();
    Lingualeo.addWord(Utils.clearWord(props.word), translateNode.current.textContent)
      .then((text: string) => (toast as any).info(text))
      .catch((error: string) => {
        console.log("---------------------");

        (toast as any).error(error);
      });
  }

  return (
    <tr className="easysubs-translate-alternative-item">
      <td className="easysubs-translate-alternative-item-add-to-learn" onClick={handleOnClick}>
        <Plus />
      </td>
      <td className="easysubs-translate-alternative-item-translate" ref={translateNode}>
        {props.alternative[0]}
      </td>
      <td className="easysubs-translate-alternative-item-original">
        {props.alternative[1].slice(0, 3).join(", ")}
      </td>
      <td className="easysubs-translate-alternative-item-frequency">
        <FrequencyDots frequency={props.alternative[3]} />
      </td>
    </tr>
  );
}

export default TranslateAlternativesItem;
