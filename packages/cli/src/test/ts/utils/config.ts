import fs from 'fs'

import { defaultCrawlerOpts } from '../../../main/ts/default'
import {
  TCrawlerCliConfig,
  TCrawlerCliOptsWithConfig,
  TGerritCrawlerOpts,
  TGithubCrawlerOpts
} from '../../../main/ts/interfaces'
import { getConfig, mergeCrawlerOpts } from '../../../main/ts/utils/config'
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
        org: ['common']
      },
      result: {
        crawlers: [
          gerritOpts
        ],
        ...defaultValues,
        org: ['common'],
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
        ]
      },
      result: {
        crawlers: [
          gerritOpts
        ],
        ...defaultValues
      },
    },
    {
      description: 'gets all data from cliOps when config is not given',
      cli: {
        config: 'config',
        ...gerritOpts
      },
      result: {
        crawlers: [
          gerritOpts
        ],
        ...defaultValues,
      },
    },
    {
      description: 'returns empty array of crawlers',
      cli: {
        config: 'config',
      },
      result: {
        crawlers: [
        ],
        ...defaultValues,
      },
    }
  ]

  testCases.forEach(({ description, config, cli, result }) => it(description, () => {
    expect(mergeCrawlerOpts(cli, config)).toEqual(result)
  }))
})

describe('getConfig', function () {
  it('', () => {
    const path = 'path'
    const config = { foo: 'bar' }
    const readFileSpy = jest.spyOn(fs, 'readFileSync')
      .mockImplementation(() => JSON.stringify(config))
    const validatorSpy = jest.spyOn(validators, 'validateCrawlerCliConfig')
      .mockImplementation((config) => config)

    expect(getConfig(path)).toEqual(config)
    expect(readFileSpy).toBeCalledWith(path)
    expect(validatorSpy).toBeCalledWith(config)
  })
})
