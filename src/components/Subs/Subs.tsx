import { Component, For } from 'solid-js'
import { useUnit } from 'effector-solid'

import { $currentSubs } from '@/models/subs'
import { TSub, TSubItem } from '@/models/subs/types'

const SubItem: Component<{ subItem: TSubItem }> = (props) => {
  return (
    <>
      {/* eslint-disable-next-line solid/no-innerhtml */}
      <pre innerHTML={props.subItem.text} classList={{ [props.subItem.tag]: true, 'es-sub-item': true }} />
      <pre classList={{ spaces: true, 'es-sub-item': true }}> </pre>
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
