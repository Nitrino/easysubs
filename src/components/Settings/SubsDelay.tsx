import { Component, JSX } from 'solid-js'
import { useUnit } from 'effector-solid'

import { $subsDelay, updateSubsDelayFx } from '@/models/subs'
import { ArrowLeft, ArrowLeftDouble, ArrowRight, ArrowRightDouble } from '@/components/ui'

const DelayButton: Component<{ children: JSX.Element; onClick: () => void }> = (props) => {
  return (
    <button
      onClick={() => props.onClick()}
      style={{
        border: 'none',
        background: '#252836',
        color: '#fff',
        width: '16px',
        height: '16px',
        cursor: 'pointer',
        appearance: 'none',
        padding: '0',
        'margin-right': '4px',
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
      <div class="es-settings-content__element__left">Subtitles delay:</div>
      <div class="es-settings-content__element__right">
        <DelayButton onClick={() => updateSubsDelayFx(subsDelay() - 1)}>
          <ArrowLeftDouble />
        </DelayButton>
        <DelayButton onClick={() => updateSubsDelayFx(subsDelay() - 0.25)}>
          <ArrowLeft />
        </DelayButton>
        <div
          style={{
            'line-height': '32px',
            background: '#252836',
            'text-align': 'center',
            'min-width': '48px',
            padding: '0 8px',
          }}
        >
          {subsDelay()}s
        </div>
        <DelayButton onClick={() => updateSubsDelayFx(subsDelay() + 0.25)}>
          <ArrowRight />
        </DelayButton>
        <DelayButton onClick={() => updateSubsDelayFx(subsDelay() + 1)}>
          <ArrowRightDouble />
        </DelayButton>
      </div>
    </div>
  )
}
