import { Component } from 'solid-js'

import { fetchCustomSubsFx } from '@/models/subs'
import { parse } from 'subtitle'

export const CustomSubs: Component = () => {
  const handleFileChange = (e: Event) => {
    const files = (e.target as HTMLInputElement).files!
    const file = files[0]
    const reader = new FileReader()
    reader.onload = () => {
      const data = reader.result
      if (typeof data === 'string') {
        fetchCustomSubsFx(parse(data))
      }
    }
    reader.readAsText(file)
  }

  return (
    <div class="es-settings-content__element">
      <div class="es-settings-content__element__left">Custom subtitles:</div>
      <div class="es-settings-content__element__right">
        <input type="file" id="file" onChange={handleFileChange} style={{ display: 'none' }} />
        <label
          for="file"
          style={{
            border: '1px solid #FFF',
            padding: '4px 12px',
            'border-radius': '8px',
            cursor: 'pointer',
          }}
        >
          Select file
        </label>
      </div>
    </div>
  )
}
