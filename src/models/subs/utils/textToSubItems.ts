import { TSubItem } from '@/models/subs/types'

const cleanWord = (word: string) => word.replace(/[~!@#№$%^&*()_|+\-=?;:",.<>{}[\]\\/]/gi, '')

export const textToSubItems = (text: string): TSubItem[] => {
  const tmpDiv = document.createElement('div') as HTMLDivElement
  tmpDiv.innerHTML = text.replace(/(<\d+:\d+:\d+.\d+>)?<[/]?[c].*?>/g, '').replace(/[\r\n]+/g, '\r\n ')

  const items = Array.from(tmpDiv.childNodes)

  return items.flatMap((item) => {
    const words = (item.textContent || '').match(/[^ ]+/g)

    if (!words) {
      return []
    }

    return words.map((word: string) => {
      return {
        text: word,
        cleanedText: cleanWord(word),
        type: 'word',
        tag: 'span',
      }
    })
  })
}
