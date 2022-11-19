import { Component, For, createSignal, Show, onMount } from 'solid-js'
import { useUnit } from 'effector-solid'

import { $currentSubs } from '@/models/subs'
import { $video } from '@/models/videos'
import { TSub, TSubItem } from '@/models/subs/types'
import { getWordQuickTranslationFx, getWordTranslationFx } from '@/models/translations'
import { TTranslation } from '@/models/translations/types'

const SubItemTranslation: Component<{ text: string }> = (props) => {
  const [quickTranslations, setQuickTranslations] = createSignal<string[]>()

  onMount(async () => {
    const data = await getWordQuickTranslationFx({ text: props.text, lang: 'ru' })
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
  const [translation, setTranslation] = createSignal<TTranslation | null>()
  onMount(async () => {
    const data = await getWordTranslationFx({ text: props.text, lang: 'ru' })
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
    <div class="es-sub" onMouseEnter={() => props.video.pause()} onMouseLeave={() => props.video.play()}>
      <For each={props.sub.items}>{(subItem) => <SubItem subItem={subItem} />}</For>
    </div>
  )
}

export const Subs: Component = () => {
  const subs = useUnit($currentSubs)
  const video = useUnit($video)
  return (
    <div id="es-subs">
      <For each={subs()}>{(sub) => <Sub sub={sub} video={video()!} />}</For>
    </div>
  )
}
