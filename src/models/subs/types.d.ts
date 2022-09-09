export type SubItem = {
  text: string
  tag: 'span' | 'b' | 'i' | 'u' | 's'
  type: 'word' | 'phrasal-verb' | 'punctuation'
}

export type Sub = {
  start: number
  end: number
  text: string
  cleanedText: string
  items: SubItem[]
}

export type Subs = Sub[]
