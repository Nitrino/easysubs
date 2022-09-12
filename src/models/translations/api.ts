import qs from 'qs'

import { api } from '@/api'
import { TWordTranslate } from '@/utils/googleTranslateFetcher'

type TFindResponse = {
  source: string
  source_lang: string
  target_lang: string
  translation: TWordTranslate
}

type TCreateRequest = {
  source: string
  source_lang: string
  target_lang: string
  translation: TWordTranslate
}

const find = (source: string, sourceLang: string, targetLang: string) => {
  const params = {
    source: source,
    source_lang: sourceLang,
    target_lang: targetLang,
  }
  return api.get('translations/find?' + qs.stringify(params)).json<{ data: TFindResponse | null }>()
}

const create = (body: TCreateRequest) => {
  return api.post('translations', { json: { translate: body } }).json<{ data: TFindResponse | null }>()
}

export default {
  find,
  create,
}
