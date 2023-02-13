import { Component } from 'solid-js'
import { useUnit } from 'effector-solid'

import { $subsDelay, updateSubsDelayFx } from '@/models/subs'

const DelayButton: Component<{ children: string; onClick: () => void }> = (props) => {
  return (
    <button
      onClick={() => props.onClick()}
      style={{
        'border-radius': '8px',
        border: '1px solid #525298',
        background: '#252836',
        color: '#fff',
        height: '24px',
        'line-height': '24px',
        'margin-right': '8px',
      }}
    >
      {props.children}
    </button>
  )
}
export const SubsDelay: Component = () => {
  const subsDelay = useUnit($subsDelay)
  return (
    <>
      <div style={{ 'margin-bottom': '4px' }}>Delay</div>
      <DelayButton onClick={() => updateSubsDelayFx(subsDelay() - 5)}>-5s</DelayButton>
      <DelayButton onClick={() => updateSubsDelayFx(subsDelay() - 1)}>-1s</DelayButton>
      <DelayButton onClick={() => updateSubsDelayFx(subsDelay() - 0.25)}>-0.25s</DelayButton>
      <div
        style={{
          display: 'inline-block',
          border: 'none',
          height: '24px',
          width: '80px',
          'line-height': '24px',
          background: '#252836',
          'text-align': 'center',
          padding: '0 16px',
        }}
      >
        {subsDelay()}s
      </div>
      <DelayButton onClick={() => updateSubsDelayFx(subsDelay() + 5)}>+5s</DelayButton>
      <DelayButton onClick={() => updateSubsDelayFx(subsDelay() + 1)}>+1s</DelayButton>
      <DelayButton onClick={() => updateSubsDelayFx(subsDelay() + 0.25)}>+0.25s</DelayButton>
    </>
  )
}
