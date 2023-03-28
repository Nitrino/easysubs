import { Component, JSX } from 'solid-js'
import { useUnit } from 'effector-solid'

import { $subsSize, updatesubsSizeFx } from '@/models/subs'
import { PlusIcon, MinusIcon } from '@/components/ui'

const FONT_SIZE_STEP = 5

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
export const SubsSize: Component = () => {
  const subsSize = useUnit($subsSize)
  return (
    <div class="es-settings-content__element">
      <div class="es-settings-content__element__left">Subtitles size:</div>
      <div class="es-settings-content__element__right">
        <SizeButton onClick={() => updatesubsSizeFx(subsSize() - FONT_SIZE_STEP)}>
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
          {subsSize()}%
        </div>
        <SizeButton onClick={() => updatesubsSizeFx(subsSize() + FONT_SIZE_STEP)}>
          <PlusIcon />
        </SizeButton>
      </div>
    </div>
  )
}
