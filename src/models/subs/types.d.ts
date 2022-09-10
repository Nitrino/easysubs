export type TSubItem = {
  text: string
  tag: 'span' | 'b' | 'i' | 'u'
  type: 'word' | 'phrasal-verb' | 'punctuation'
}

export type TSub = {
  id: number
  start: number
  end: number
  text: string
  cleanedText: string
  items: TSubItem[]
}

export type TSubs = TSub[]
