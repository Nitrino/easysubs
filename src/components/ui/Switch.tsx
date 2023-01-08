import { Component } from 'solid-js'
import { createFocusRing } from '@solid-aria/focus'
import { AriaSwitchProps, createSwitch } from '@solid-aria/switch'
import { createVisuallyHidden } from '@solid-aria/visually-hidden'

export const Switch: Component<AriaSwitchProps> = (props) => {
  let ref: HTMLInputElement | undefined

  const { inputProps, state } = createSwitch(props, () => ref)
  const { isFocusVisible, focusProps } = createFocusRing()
  const { visuallyHiddenProps } = createVisuallyHidden()

  return (
    <label style={{ display: 'flex', 'align-items': 'center', cursor: 'pointer', 'user-select': 'none' }}>
      <div {...visuallyHiddenProps}>
        <input {...inputProps} {...focusProps} ref={ref} />
      </div>
      <svg width={40} height={24} aria-hidden="true" style={{ 'margin-right': '8px' }}>
        <rect x={4} y={4} width={32} height={16} rx={8} fill={state.isSelected() ? '#3A88A2' : 'gray'} />
        <circle cx={state.isSelected() ? 28 : 12} cy={12} r={5} fill="white" />
        {isFocusVisible() && (
          <rect x={1} y={1} width={38} height={22} rx={11} fill="none" stroke="#3A88A2" stroke-width={2} />
        )}
      </svg>
      {props.children}
    </label>
  )
}
