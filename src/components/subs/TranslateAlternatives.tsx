import React from "react";
import TranslateAlternativesItem from "./TranslateAlternativesItem";

function TranslateAlternatives(props: { alternativesGroups: any[]; word: string }) {
  return (
    <div className="easysubs-translate-alternative">
      {props.alternativesGroups.map((group: any, groupIndex: number) => {
        return [
          <p className="easysubs-translate-alternative-part-speech" key={groupIndex}>
            {group[0]}
          </p>,
          <table key={`table-${groupIndex}`}>
            <tbody>
              {group[2].slice(0, 5).map((alternative: any, altIndex: number) => {
                return (
                  <TranslateAlternativesItem
                    key={`${groupIndex}-${altIndex}`}
                    alternative={alternative}
                    word={props.word}
                  />
                );
              })}
            </tbody>
          </table>
        ];
      })}
    </div>
  );
}

export default TranslateAlternatives;
