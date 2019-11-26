import React from "react";
import TranslateAlternativesItem from "./TranslateAlternativesItem";

function TranslateAlternatives(props: { alternativesGroups: any[] }) {
  return (
    <div className="easysubs-translate-alternative">
      {props.alternativesGroups.map((group: any, groupIndex: number) => {
        return [
          <p
            className="easysubs-translate-alternative-part-speech"
            key={groupIndex}
          >
            {group[0]}
          </p>,
          group[2].slice(0, 5).map((alternative: any, altIndex: number) => {
            return (
              <TranslateAlternativesItem
                key={groupIndex + "-" + altIndex}
                alternative={alternative}
              />
            );
          })
        ];
      })}
    </div>
  );
}

export default TranslateAlternatives;

// if (alternativeTranslations.length != 0) {
//   alternativeTranslations.forEach(elem => {
//     alternativeTranslationsHtml += `
//       <p class='easysubs-translate-alternative-part-speech'>
//         ${elem[0]}
//       </p>
//     `;
//     elem[2].slice(0, 5).forEach((alternative: any) => {
//       alternativeTranslationsHtml += `
//         <div class="easysubs-translate-alternative-item">
//           <div class="easysubs-translate-alternative-item-translate">
//             ${alternative[0]}
//           </div>
//           <div class="easysubs-translate-alternative-item-original">
//             ${alternative[1].slice(0, 3).join(", ")}
//           </div>
//           <div class="easysubs-translate-alternative-item-frequency">
//             ${this.frequencyToDots(alternative[3])}
//           </div>
//         </div>
//       `;
//     });
//   });
// }
