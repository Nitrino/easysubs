import { Component, createSignal, Show } from 'solid-js'
import { Portal } from 'solid-js/web'
import cn from 'classnames'

import { LogoColor, LogoMono } from '@/components/ui'
import { TranslateLanguage } from './TranslateLanguage'
import { EnableToggle } from './EnableToggle'
import { SubsDelay } from './SubsDelay'

interface SettingsProps {
  contentContainer: HTMLElement | null
}

const Tab: Component<{ children: string; isActive: boolean; tabId: number; onClick: () => void }> = (props) => {
  return (
    <div
      class={cn('es-settings-content__menu__item', {
        'es-settings-content__menu__item--active': props.isActive,
      })}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  )
}

const SettingsContent: Component<{ onClose: () => void }> = (props) => {
  const [getTab, setTab] = createSignal(0)
  return (
    <div class="es-settings__overlay">
      <div class="es-settings-content">
        <div class="es-settings-content__menu">
          <div class="es-settings-content__menu__title">
            <LogoColor />
            Easysubs
          </div>
          <div class="es-settings-content__menu__items">
            <Tab
              isActive={getTab() === 0}
              tabId={0}
              onClick={() => {
                setTab(0)
              }}
            >
              General settings
            </Tab>
            <Tab
              isActive={getTab() === 1}
              tabId={1}
              onClick={() => {
                setTab(1)
              }}
            >
              Subtitless
            </Tab>
          </div>
        </div>
        <div class="es-settings-content__main">
          <Show when={getTab() === 0}>
            <div class="es-settings-content__main__title">GENERAL</div>
            <div class="es-settings-content__item">
              <EnableToggle />
            </div>
            <div class="es-settings-content__item">
              <TranslateLanguage />
            </div>
          </Show>
          <Show when={getTab() === 1}>
            <div class="es-settings-content__main__title">SUBTITLES</div>
            <div class="es-settings-content__item">
              <SubsDelay />
            </div>
          </Show>
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
