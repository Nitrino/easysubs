import { TSubItem } from '@/models/subs/types'

const cleanWord = (word: string) => word.replace(/[~!@#№$%^&*()_|+\-=?;:",.<>{}[\]\\/]/gi, '')

export const textToSubItems = (text: string): TSubItem[] => {
  const words = text
    .replace(/(<\d+:\d+:\d+.\d+>)?<[/]?[c].*?>/g, '')
    .replace(/[\r\n]+/g, '\r\n ')
    .match(/[^ ]+/g)
  if (words == null) {
    return []
  }

  return (
    words.map((word) => {
      return {
        text: word,
        cleanedText: cleanWord(word),
        type: 'word',
        tag: 'span',
      }
    }) || []
  )
}
