import { TSub } from '@/models/subs/types'

export const getCurrentSubs = (subs: TSub[], time: number): TSub[] => {
  return subs.filter((sub) => sub.start <= time && sub.end >= time)
}
