import { TCrawlerBaseOpts, TCrawlerOptionalArgs } from '../../../main/ts/interfaces'
import {
  authCheckers,
  validateCrawlerCliArgs,
  validateCrawlerCliConfig,
  validateCrawlerOptionalArgs,
  validateCrawlerOpts
} from '../../../main/ts/utils/validators'
import * as validators from '../../../main/ts/utils/validators'

describe('authCheckers', function () {
  test('github auth checker', () => {
    expect(() => authCheckers.github(42)).toThrow()
    expect(() => authCheckers.github('42')).not.toThrow()
  })

  test('gerrit auth checker', () => {
    expect(() => authCheckers.gerrit(42)).toThrow()
    expect(() => authCheckers.gerrit({ username: 'foo', password: 'bar' })).not.toThrow()
    expect(() => authCheckers.gerrit({ username: 'foo' })).toThrow()
    expect(() => authCheckers.gerrit({ password: 'bar' })).toThrow()
    expect(() => authCheckers.gerrit({ username: 42, password: 'bar' })).toThrow()
  })
})

describe('validateCrawlerOptionalArgs', function () {
  type TTestCase = {
    input: Partial<Record<keyof TCrawlerOptionalArgs, any>>
    error: boolean
  }

  const testCases: TTestCase[] = [
    {
      input: {
        limitCount: 42,
        limitPeriod: 21,
      },
      error: false
    },
    {
      input: {
        limitCount: 42,
        limitPeriod: 21,
        debug: true,
        org: ['foo']
      },
      error: false
    },
    {
      input: {
        limitCount: 'asd',
        limitPeriod: 21,
        debug: true,
        org: ['foo']
      },
      error: true
    },
    {
      input: {
        limitCount: 42,
        limitPeriod: 21,
        org: [42]
      },
      error: true
    },
  ]

  testCases.forEach(({ input, error }, i) => it(`testCase #${i}`, () => {
    const matcher = expect(() => validateCrawlerOptionalArgs(input))
    if (error) {
      matcher.toThrow()
      return
    }
    matcher.not.toThrow()
  }))
})

describe('validateCrawlerOpts', function () {
  type TTestCase = {
    input: Partial<Record<keyof TCrawlerBaseOpts, any>>
    error: boolean
  }

  const testCases: TTestCase[] = [
    {
      input: {
        vcs: 42,
        url: 'http://localhost',
      },
      error: true,
    },
    {
      input: {
        vcs: 'gerrit',
        url: 'http://localhost',
        auth: {
          username: 'username',
          password: 'password',
        }
      },
      error: false,
    },
    {
      input: {
        vcs: 'github',
        url: 'http://localhost:3000',
        auth: 'asd'
      },
      error: false,
    },
    {
      input: {
        vcs: 'githubddd',
        url: 'http://localhost:3001',
      },
      error: true,
    }
  ]

  testCases.forEach(({ input, error }, i) => it(`testCase #${i}`, () => {
    const matcher = expect(() => validateCrawlerOpts(input as any))
    if (error) {
      matcher.toThrow()
      return
    }
    matcher.not.toThrow()
  }))
})

describe('validateCrawlerCliConfig', function () {
  beforeEach(jest.resetModules)

  it('calls other validators', () => {
    const config = {
      crawlers: [42, 42]
    }
    const validateCrawlerOptionalArgsSpy = jest.spyOn(validators, 'validateCrawlerOptionalArgs')
      .mockImplementation(() => { /* noop */ })
    const validateCrawlerOptsSpy = jest.spyOn(validators, 'validateCrawlerOpts')
      .mockImplementation(() => { /* noop */ })

    validateCrawlerCliConfig(config as any)

    expect(validateCrawlerOptionalArgsSpy).toBeCalledWith(config)
    expect(validateCrawlerOptsSpy).toBeCalledTimes(2)
  })

  it('does not allow incorrect type of crawlers', () => {
    const config = {
      crawlers: 42
    }
    jest.spyOn(validators, 'validateCrawlerOptionalArgs')
      .mockImplementation(() => { /* noop */ })
    jest.spyOn(validators, 'validateCrawlerOpts')
      .mockImplementation(() => { /* noop */ })

    expect(() => validateCrawlerCliConfig(config as any)).toThrow()
  })
})

describe('validateCrawlerCliArgs', function () {
  it('does not allow incorrect type of config', () => {
    const config = { config: 42 }
    expect(() => validateCrawlerCliArgs(config as any)).toThrow()
  })

  it('calls validateCrawlerOptionalArgs', () => {
    const config = { config: 'str' }
    const validateCrawlerOptionalArgsSpy = jest.spyOn(validators, 'validateCrawlerOptionalArgs')
      .mockImplementation(() => { /* noop */ })

    validateCrawlerCliArgs(config as any)

    expect(validateCrawlerOptionalArgsSpy).toBeCalledWith(config)
  })

  it('calls necessary validators for non-config opts', () => {
    const config = { path: ['path']}
    const validateCrawlerOptionalArgsSpy = jest.spyOn(validators, 'validateCrawlerOptionalArgs')
      .mockImplementation(() => { /* noop */ })
    const validateCrawlerOptsSpy = jest.spyOn(validators, 'validateCrawlerOpts')
      .mockImplementation(() => { /* noop */ })

    validateCrawlerCliArgs(config as any)

    expect(validateCrawlerOptionalArgsSpy).toBeCalledWith(config)
    expect(validateCrawlerOptsSpy).toBeCalledWith(config)
  })
})
