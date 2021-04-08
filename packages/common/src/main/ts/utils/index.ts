import { DeepProxy } from '@qiwi/deep-proxy'
import { IComplexDelay, Limiter, ratelimit } from 'push-it-to-the-limit'

export const rateLimitWrapper = <T = any>(
  target: T,
  limit: IComplexDelay,
): T => {
  const limiter = new Limiter([limit])

  return new DeepProxy(
    target,
    ({ trapName, value, PROXY, DEFAULT }: any = {}) => {
      if (trapName === 'get') {
        if (typeof value === 'function') {
          // @ts-ignore
          return Object.assign(ratelimit(value, { limiter }), value)
        }

        if (typeof value === 'object' && value !== null) {
          return PROXY
        }
      }

      return DEFAULT
    },
  )
}
