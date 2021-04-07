import { rateLimitWrapper } from '../../../main/ts'

const fn = () => Promise.resolve()

describe('rateLimitWrapper', () => {
  it('limits rate', async () => {
    const target = {
      fn
    }
    const limitedTarget = rateLimitWrapper(target, { period: 1000, count: 2 })
    const startTime = Date.now()

    await Promise.all([limitedTarget.fn(), limitedTarget.fn(), limitedTarget.fn(), limitedTarget.fn()])

    const endTime = Date.now() - startTime
    expect(endTime).toBeGreaterThanOrEqual(1000)
  })

  it('limits nested methods', async () => {
    const target = {
      foo: {
        fn
      }
    }
    const limitedTarget = rateLimitWrapper(target, { period: 1000, count: 2 })
    const startTime = Date.now()

    await Promise.all([limitedTarget.foo.fn(), limitedTarget.foo.fn(), limitedTarget.foo.fn(), limitedTarget.foo.fn()])

    const endTime = Date.now() - startTime
    expect(endTime).toBeGreaterThanOrEqual(1000)
  })
})
