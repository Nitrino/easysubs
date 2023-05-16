import { Component, JSX } from 'solid-js'
import { useUnit } from 'effector-solid'

import { $subsBackgroundOpacity, updateSubsBackgroundOpacityFx } from '@/models/subs'
import { PlusIcon, MinusIcon } from '@/components/ui'

const OPACITY_STEP = 5

const SizeButton: Component<{ children: JSX.Element; onClick: () => void }> = (props) => {
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

export const SubsBackgroundOpacity: Component = () => {
  const subsBackgroundOpacity = useUnit($subsBackgroundOpacity)

  const handleClick = (step: number) => {
    const newValue = subsBackgroundOpacity() + step
    if (newValue >= 0 && newValue <= 100) {
      updateSubsBackgroundOpacityFx(newValue)
    }
  }
  return (
    <div class="es-settings-content__element">
      <div class="es-settings-content__element__left">Backgound opacity:</div>
      <div class="es-settings-content__element__right">
        <SizeButton onClick={() => handleClick(-OPACITY_STEP)}>
          <MinusIcon />
        </SizeButton>
        <div
          style={{
            'line-height': '32px',
            background: '#252836',
            'text-align': 'center',
            'min-width': '48px',
            padding: '0 8px',
          }}
        >
          {subsBackgroundOpacity()}%
        </div>
        <SizeButton onClick={() => handleClick(OPACITY_STEP)}>
          <PlusIcon />
        </SizeButton>
      </div>
    </div>
  )
}
