import { Component, createSignal, Show } from 'solid-js'
import { Portal } from 'solid-js/web'
import { LogoColor, LogoMono } from '@/components/ui'

interface SettingsProps {
  contentContainer: HTMLElement | null
}

const SettingsContent: Component<{ onClose: () => void }> = (props) => {
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
        <div class="es-settings-content__main">CONTENT</div>
        <div class="es-settings-content__close" onClick={() => props.onClose()} />
      </div>
    </div>
  )
}

export const Settings: Component<SettingsProps> = () => {
  const [showSettings, setShowSettings] = createSignal(false)

  const handleClick = () => {
    console.log('+++++++++++++', showSettings())

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
