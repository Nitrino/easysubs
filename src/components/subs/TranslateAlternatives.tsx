import React, { useState, useEffect } from "react";
import TranslateAlternativesItem from "./TranslateAlternativesItem";
import Utils from "../../utils";

function TranslateAlternatives(props: { alternativesGroups: any[]; word: string, context: string }) {
  const [currentService, setCurrentService] = useState(null);

  useEffect(() => {
    setCurrentService(Utils.getCurrentLearningService());
  }, []);

  return (
    <div className="easysubs-translate-alternative">
      <table>
        <tbody>
          {props.alternativesGroups.map((group: any, groupIndex: number) => {
            return [
              <tr key={`tr-part-of-speech-${groupIndex}`}>
                <th
                  colSpan={2}
                  id={`part-of-speech-${groupIndex}`}
                  className="easysubs-translate-alternative-part-speech part-of-speech"
                  key={groupIndex}
                >
                  {group[0]}
                </th>
              </tr>,
              group[1].slice(0, 5).map((alternative: any, altIndex: number) => {
                return (
                  <tr
                    className="easysubs-translate-alternative-item"
                    key={`tr-part-of-speech-alternatives-${groupIndex}-${altIndex}`}
                  >
                    <TranslateAlternativesItem
                      key={`${groupIndex}-${altIndex}`}
                      alternative={alternative}
                      word={props.word}
                      groupIndex={groupIndex}
                      currentService={currentService}
                      context={props.context}
                    />
                  </tr>
                );
              })
            ];
          })}
        </tbody>
      </table>
    </div>
  );
}

export default TranslateAlternatives;
