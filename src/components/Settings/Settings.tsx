import { Component, createSignal, Show } from 'solid-js'
import { useUnit } from 'effector-solid'

import { Portal } from 'solid-js/web'
import { LogoColor, LogoMono, Switch } from '@/components/ui'
import { $enabled, setEnabledFx } from '@/models/global'
import { EnableToggle } from './EnableToggle'

interface SettingsProps {
  contentContainer: HTMLElement | null
}

const SettingsContent: Component<{ onClose: () => void }> = (props) => {
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
    <div class="es-settings__overlay">
      <div class="es-settings-content">
        <div class="es-settings-content__menu">
          <div class="es-settings-content__menu__title">
            <LogoColor />
            Easysubs
          </div>
          <div class="es-settings-content__menu__items">
            <div class="es-settings-content__menu__item">General settings</div>
          </div>
        </div>
        <div class="es-settings-content__main">
          <p>GENERAL</p>
          <Switch defaultSelected={globalEnabled()} onChange={updateEnabled}>
            Enable
          </Switch>
          <EnableToggle />
        </div>
        <div class="es-settings-content__close" onClick={() => props.onClose()} />
      </div>
    </div>
  )
}

export const Settings: Component<SettingsProps> = () => {
  const [showSettings, setShowSettings] = createSignal(false)

  const handleClick = () => {
    setShowSettings(!showSettings())
  }
  return (
    <>
      <div class="es-settings-icon" onClick={handleClick} onKeyPress={handleClick}>
        <LogoMono />
      </div>
      <Show when={showSettings()}>
        <Portal>
          <SettingsContent onClose={() => setShowSettings(false)} />
        </Portal>
      </Show>
    </>
  )
}
