import { Component, For, createSignal, Show, onMount } from 'solid-js'
import { useUnit } from 'effector-solid'

import { $currentSubs } from '@/models/subs'
import { TSub, TSubItem } from '@/models/subs/types'
import { googleTranslateFetcher, TWordTranslate } from '@/utils/googleTranslateFetcher'

const SubItemTranslation: Component<{ text: string }> = (props) => {
  const [translation, setTranslation] = createSignal<TWordTranslate | null>()
  onMount(() => {
    chrome.runtime.sendMessage(
      {
        type: 'translateWord',
        lang: 'ru',
        text: props.text,
      },
      (response: TWordTranslate) => {
        setTranslation(response)
      },
    )
  })

  return (
    <Show when={translation() !== null && translation() !== undefined}>
      <div class="es-sub-item-translation">{translation()!.main}</div>
    </Show>
  )
}

const SubItem: Component<{ subItem: TSubItem }> = (props) => {
  const [showTranslation, setShowTranslation] = createSignal(false)
  return (
    <>
      <span class="es-sub-item">
        <pre
          // eslint-disable-next-line solid/no-innerhtml
          innerHTML={props.subItem.text}
          class={props.subItem.tag}
          onMouseEnter={() => setShowTranslation(true)}
          onMouseLeave={() => setShowTranslation(false)}
        />
        <Show when={showTranslation()}>
          <SubItemTranslation text={props.subItem.cleanedText} />
        </Show>
      </span>
      <pre class="es-sub-item-space"> </pre>
    </>
  )
}

const Sub: Component<{ sub: TSub }> = (props) => {
  return (
    <div class="es-sub">
      <For each={props.sub.items}>{(subItem) => <SubItem subItem={subItem} />}</For>
    </div>
  )
}

export const Subs: Component = () => {
  const subs = useUnit($currentSubs)
  return (
    <div id="es-subs">
      <For each={subs()}>{(sub) => <Sub sub={sub} />}</For>
    </div>
  )
}
