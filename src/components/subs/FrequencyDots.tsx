function FrequencyDots(props: { frequency: number }): any {
  const { frequency } = props
  return [
    <div key="1" className="easysubs-translate-alternative-item-frequency-dot -fill" />,
    <div key="2" className={'easysubs-translate-alternative-item-frequency-dot ' + (frequency < 3 ? '-fill' : '')} />,
    <div key="3" className={'easysubs-translate-alternative-item-frequency-dot ' + (frequency < 2 ? '-fill' : '')} />,
  ]
}

export default FrequencyDots
