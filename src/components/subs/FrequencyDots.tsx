import React from "react";

function FrequencyDots(props: { frequency: number }): any {
  const rate = props.frequency * 10000;

  if (rate >= 500) {
    return [
      <div key="1" className="easysubs-translate-alternative-item-frequency-dot -fill" />,
      <div key="2" className="easysubs-translate-alternative-item-frequency-dot -fill" />,
      <div key="3" className="easysubs-translate-alternative-item-frequency-dot -fill" />
    ];
  }
  if (rate < 500 && rate >= 30) {
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
