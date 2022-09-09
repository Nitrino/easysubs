import type { Component } from 'solid-js'
import { useUnit } from 'effector-solid'

import { $subs } from '@/models/subs'

export const Subs: Component = () => {
  const subs = useUnit($subs)
  return <div id="es">dsdsd</div>
}
