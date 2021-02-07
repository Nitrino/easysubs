import React from "react";

function FrequencyDots(props: { frequency: number }): any {
  if (props.frequency == 1) {
    return [
      <div key="1" className="easysubs-translate-alternative-item-frequency-dot -fill" />,
      <div key="2" className="easysubs-translate-alternative-item-frequency-dot -fill" />,
      <div key="3" className="easysubs-translate-alternative-item-frequency-dot -fill" />
    ];
  }
  if (props.frequency == 2) {
    return [
      <div key="1" className="easysubs-translate-alternative-item-frequency-dot -fill" />,
      <div key="2" className="easysubs-translate-alternative-item-frequency-dot -fill" />,
      <div key="3" className="easysubs-translate-alternative-item-frequency-dot -empty" />
    ];
  }
  return [
    <div key="1" className="easysubs-translate-alternative-item-frequency-dot -fill" />,
    <div key="2" className="easysubs-translate-alternative-item-frequency-dot -empty" />,
    <div key="3" className="easysubs-translate-alternative-item-frequency-dot -empty" />
  ];
}

export default FrequencyDots;
