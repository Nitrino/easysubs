import { Component } from 'solid-js'
import { useUnit } from 'effector-solid'
import { AriaSwitchProps } from '@solid-aria/switch'

import { Switch } from '@/components/ui'
import { $subsBackground, setSubsBackgroundFx } from '@/models/global'

export const SubsBackground: Component<AriaSwitchProps> = (props) => {
  const subsBackground = useUnit($subsBackground)

  const handleOnChange = (isSelected: boolean) => {
    setSubsBackgroundFx(isSelected)
  }

  return (
    <div class="es-settings-content__element">
      <div class="es-settings-content__element__left">Subtitles background</div>
      <div class="es-settings-content__element__right">
        <Switch {...props} defaultSelected={subsBackground()} onChange={handleOnChange} />
      </div>
    </div>
  )
}
