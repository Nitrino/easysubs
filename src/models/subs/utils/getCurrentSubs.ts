import { TSubs } from '@/models/subs/types'

export const getCurrentSubs = (subs: TSubs, time: number): TSubs => {
  return subs.filter((sub) => sub.start <= time && sub.end >= time)
}
