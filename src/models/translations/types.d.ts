type FullTranslationItemDefinition = {
  meaning: string
  example: string
  synonyms: string[]
}

type FullTranslationItem = {
  word: string
  translations: string[]
  popularity: number
  definitions: FullTranslationItemDefinition[]
}

type FullTranslation = {
  part_of_speech: string
  items: FullTranslationItem[]
}

export type TTranslation = {
  source: string
  source_lang: string
  target_lang: string
  quick_translations: string[]
  full_translations: FullTranslation[]
  examples: string[]
}
export type TGoogleTranslation = unknown
