import React from "react";
import TranslateAlternativesItem from "./TranslateAlternativesItem";

function TranslateAlternatives(props: { alternativesGroups: any[] }) {
  return (
    <div className="easysubs-translate-alternative">
      {props.alternativesGroups.map((group: any, groupIndex: number) => {
        return [
          <p className="easysubs-translate-alternative-part-speech" key={groupIndex}>
            {group[0]}
          </p>,
          <table key={`table-${groupIndex}`}>
            {group[2].slice(0, 5).map((alternative: any, altIndex: number) => {
              return <TranslateAlternativesItem key={`${groupIndex}-${altIndex}`} alternative={alternative} />;
            })}
          </table>
        ];
      })}
    </div>
  );
}

export default TranslateAlternatives;
