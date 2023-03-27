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
        'line-height': '16px',
        'margin-right': '8px',
        'font-size': '14px',
      }}
    >
      {props.children}
    </button>
  )
}
export const SubsDelay: Component = () => {
  const subsDelay = useUnit($subsDelay)
  return (
    <div class="es-settings-content__element">
      <div class="es-settings-content__element__left">Subtitles delay</div>
      <div class="es-settings-content__element__right" style={{ 'flex-direction': 'column' }}>
        <div style={{ display: 'flex', 'justify-content': 'center' }}>
          <DelayButton onClick={() => updateSubsDelayFx(subsDelay() - 0.25)}>-0.25</DelayButton>
          <DelayButton onClick={() => updateSubsDelayFx(subsDelay() - 1)}>-1</DelayButton>
          <DelayButton onClick={() => updateSubsDelayFx(subsDelay() - 5)}>-5</DelayButton>
        </div>
        <div
          style={{
            'line-height': '32px',
            background: '#252836',
            'text-align': 'center',
          }}
        >
          {subsDelay()}s
        </div>
        <div style={{ display: 'flex', 'justify-content': 'center' }}>
          <DelayButton onClick={() => updateSubsDelayFx(subsDelay() + 0.25)}>+0.25</DelayButton>
          <DelayButton onClick={() => updateSubsDelayFx(subsDelay() + 1)}>+1</DelayButton>
          <DelayButton onClick={() => updateSubsDelayFx(subsDelay() + 5)}>+5</DelayButton>
        </div>
      </div>
    </div>
  )
}
