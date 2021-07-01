import fs from 'fs-extra'

import { defaultCrawlerOpts } from '../../../main/ts/default'
import { createCrawler, getResultsDir } from '../../../main/ts/utils'

const dirRegexp = /node_modules\/\.cache\/@qiwi%2Frepocrawler-cli$/

const dummyFunc = () => {
  /* noop */
}

describe('getResultsDir', () => {
  it('calls necessary functions', () => {
    const ensureDirSyncSpy = jest.spyOn(fs, 'ensureDirSync').mockImplementation(dummyFunc)
    const emptyDirSyncSpy = jest.spyOn(fs, 'emptyDirSync').mockImplementation(dummyFunc)
    expect(getResultsDir()).toMatch(dirRegexp)
    expect(ensureDirSyncSpy).toBeCalled()
    expect(emptyDirSyncSpy).toBeCalled()
  })

  it('uses given path', () => {
    jest.spyOn(fs, 'ensureDirSync').mockImplementation(dummyFunc)
    jest.spyOn(fs, 'emptyDirSync').mockImplementation(dummyFunc)
    expect(getResultsDir('path')).toMatch('path')
  })
})

describe('createCrawler', function () {
  it ('calls github crawler factory', () => {
    expect(typeof createCrawler(
      {
        url: 'http://localhost',
        auth: 'auth',
        vcs: 'github'
      },
      defaultCrawlerOpts
    )).toEqual('object')
  })

  it ('calls github crawler factory', () => {
    expect(typeof createCrawler(
      {
        url: 'http://localhost',
        auth: {
          username: 'foo',
          password: 'foo',
        },
        vcs: 'gerrit'
      },
      defaultCrawlerOpts
    )).toEqual('object')
  })
})
