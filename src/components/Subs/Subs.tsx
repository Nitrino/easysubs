import { Component, For, createSignal, Show, onMount, createEffect } from 'solid-js'
import { useUnit } from 'effector-solid'

import { $currentSubs } from '@/models/subs'
import { $video } from '@/models/videos'
import { $subsSize } from '@/models/subs'
import { TSub, TSubItem } from '@/models/subs/types'
import { getWordQuickTranslationFx, getWordTranslationFx } from '@/models/translations'
import { TTranslation } from '@/models/translations/types'
import { $translateLanguage, $autoPause, setAutoPauseFx } from '@/models/global'

const SubItemTranslation: Component<{ text: string }> = (props) => {
  const translateLanguage = useUnit($translateLanguage)

  const [quickTranslations, setQuickTranslations] = createSignal<string[]>()

  onMount(async () => {
    const data = await getWordQuickTranslationFx({ text: props.text, lang: translateLanguage() })
    setQuickTranslations(data)
  })

  return (
    <div class="es-sub-item-translation">
      <For each={quickTranslations()}>
        {(quickTranslation) => <div class="es-sub-item-translation-item">{quickTranslation}</div>}
      </For>
    </div>
  )
}
const SubDescription: Component<{ text: string }> = (props) => {
  const translateLanguage = useUnit($translateLanguage)
  const [translation, setTranslation] = createSignal<TTranslation | null>()
  onMount(async () => {
    const data = await getWordTranslationFx({ text: props.text, lang: translateLanguage() })
    setTranslation(data)
  })

  return (
    <Show when={translation() !== null && translation() !== undefined}>
      <div class="es-sub-item-translation">DESCRIPTION</div>
    </Show>
  )
}

const SubItem: Component<{ subItem: TSubItem }> = (props) => {
  const [showTranslation, setShowTranslation] = createSignal(false)
  const [showDescription, setShowDescription] = createSignal(false)

  const handleOnMouseEnter = () => {
    setShowTranslation(true)
    setShowDescription(false)
  }

  const handleOnMouseLeave = () => {
    setShowTranslation(false)
    setShowDescription(false)
  }

  const handleClick = () => {
    setShowTranslation(false)
    setShowDescription(true)
  }

  return (
    <>
      <span class="es-sub-item">
        <pre
          // eslint-disable-next-line solid/no-innerhtml
          innerHTML={props.subItem.text}
          class={props.subItem.tag}
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}
          onClick={handleClick}
        />
        <Show when={showTranslation()}>
          <SubItemTranslation text={props.subItem.cleanedText} />
        </Show>
        <Show when={showDescription()}>
          <SubDescription text={props.subItem.cleanedText} />
        </Show>
      </span>
      <pre class="es-sub-item-space"> </pre>
    </>
  )
}

const Sub: Component<{ sub: TSub; video: HTMLVideoElement }> = (props) => {
  return (
    <div class="es-sub">
      <For each={props.sub.items}>{(subItem) => <SubItem subItem={subItem} />}</For>
    </div>
  )
}

export const Subs: Component = () => {
  const autoPause = useUnit($autoPause)
  const subs = useUnit($currentSubs)
  const video = useUnit($video)
  const subsSize = useUnit($subsSize)
  const [fontSize, setFontSize] = createSignal(38)

  createEffect(() => {
    const videoElement = video()
    if (videoElement) {
      setFontSize(((videoElement.clientWidth / 100) * subsSize()) / 43)
    }
  })

  const handleOnMouseLeave = () => {
    if (autoPause()) {
      video()!.play()
      setAutoPauseFx(false)
    }
  }

  const handleOnMouseEnter = () => {
    if (!video()!.paused) {
      setAutoPauseFx(true)
      video()!.pause()
    }
  }

  return (
    <Show when={video() !== null}>
      <div
        id="es-subs"
        style={{ 'font-size': `${fontSize()}px` }}
        onMouseLeave={handleOnMouseLeave}
        onMouseEnter={handleOnMouseEnter}
      >
        <For each={subs()}>{(sub) => <Sub sub={sub} video={video()!} />}</For>
      </div>
    </Show>
  )
}
