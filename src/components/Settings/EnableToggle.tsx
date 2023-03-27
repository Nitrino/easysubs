import { Component } from 'solid-js'
import { useUnit } from 'effector-solid'
import { AriaSwitchProps } from '@solid-aria/switch'

import { Switch } from '@/components/ui'
import { $enabled, setEnabledFx } from '@/models/global'

export const EnableToggle: Component<AriaSwitchProps> = (props) => {
  const globalEnabled = useUnit($enabled)

  const updateEnabled = (isSelected: boolean) => {
    setEnabledFx(isSelected)
    if (isSelected) {
      document.body.classList.add('es-enabled')
    } else {
      document.body.classList.remove('es-enabled')
    }
  }

  return (
    <div class="es-settings-content__element">
      <div class="es-settings-content__element__left">Enable</div>
      <div class="es-settings-content__element__right">
        <Switch {...props} defaultSelected={globalEnabled()} onChange={updateEnabled} />
      </div>
    </div>
  )
}
