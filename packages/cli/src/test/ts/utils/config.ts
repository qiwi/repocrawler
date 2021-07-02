import fs from 'fs-extra'

import { defaultCrawlerOpts } from '../../../main/ts/default'
import {
  TCrawlerCliConfig,
  TCrawlerCliOptsWithConfig,
  TGerritCrawlerOpts,
  TGithubCrawlerOpts
} from '../../../main/ts/interfaces'
import { getConfig, resolveCrawlerOpts } from '../../../main/ts/utils/config'
import * as validators from '../../../main/ts/utils/validators'

describe('mergeCrawlerOpts', function () {
  type TTestCase = {
    description: string
    cli: TCrawlerCliOptsWithConfig
    config?: TCrawlerCliConfig
    result: TCrawlerCliConfig
  }

  const defaultValues = {
    debug: false,
    limitPeriod: defaultCrawlerOpts.ratelimit.period,
    limitCount: defaultCrawlerOpts.ratelimit.count,
    out: expect.stringMatching(/.+/),
    org: undefined,
  }

  const gerritOpts: TGerritCrawlerOpts = {
    vcs: 'gerrit',
    auth: {
      username: 'username',
      password: 'password',
    },
    url: 'localhost',
  }

  const githubOpts: TGithubCrawlerOpts = {
    vcs: 'github',
    auth: 'auth',
    url: 'http://localhost:3000',
  }

  const testCases: Array<TTestCase> = [
    {
      description: 'replaces config crawlers with cli crawler',
      cli: {
        config: 'config',
        ...gerritOpts
      },
      config: {
        crawlers: [
          githubOpts,
          {
            ...gerritOpts,
            url: 'http://localhost:8080'
          }
        ],
        org: ['common'],
        path: ['path'],
      },
      result: {
        crawlers: [
          gerritOpts
        ],
        ...defaultValues,
        org: ['common'],
        path: ['path'],
      }
    },
    {
      description: 'gets crawlers from config when they are absent in cliOps',
      cli: {
        config: 'config',
      },
      config: {
        crawlers: [
          gerritOpts
        ],
        path: ['path'],
      },
      result: {
        crawlers: [
          gerritOpts
        ],
        ...defaultValues,
        path: ['path'],
      },
    },
    {
      description: 'gets all data from cliOps when config is not given',
      cli: {
        config: 'config',
        ...gerritOpts,
        path: ['foo'],
      },
      result: {
        crawlers: [
          gerritOpts
        ],
        ...defaultValues,
        path: ['foo'],
      },
    },
    {
      description: 'returns empty array of crawlers',
      cli: {
        config: 'config',
        path: ['bar'],
      },
      result: {
        crawlers: [
        ],
        ...defaultValues,
        path: ['bar'],
      },
    }
  ]

  testCases.forEach(({ description, config, cli, result }) => it(description, () => {
    expect(resolveCrawlerOpts(cli, config)).toEqual(result)
  }))
})

describe('getConfig', function () {
  it('reads config', () => {
    const path = 'path'
    const config = { foo: 'bar' }
    const readFileSpy = jest.spyOn(fs, 'readJsonSync')
      .mockImplementation(() => config)
    const validatorSpy = jest.spyOn(validators, 'validateCrawlerCliConfig')
      .mockImplementation((config) => config)

    expect(getConfig(path)).toEqual(config)
    expect(readFileSpy).toBeCalledWith(path)
    expect(validatorSpy).toBeCalledWith(config)
  })
})
