import qs from 'qs'

import { api } from '@/api'
import { Translation } from './types'

export type TCreateRequest = {
  source: string
  source_lang: string
  target_lang: string
  translation: unknown
}

const find = (source: string, sourceLang: string, targetLang: string) => {
  const params = {
    source: source,
    source_lang: sourceLang,
    target_lang: targetLang,
  }
  return api.get('translations/find?' + qs.stringify(params)).json<{ data: Translation | null }>()
}

const create = (body: TCreateRequest) => {
  return api.post('translations', { json: { translate: body } }).json<{ data: Translation | null }>()
}

export default {
  find,
  create,
}
