import fs from 'fs'
import rimraf from 'rimraf'

import { createCrawler, getNonExistingTempDir } from '../../../main/ts/utils'
import { defaultCrawlerOpts } from '../../../main/ts/default'

const dirRegexp = /node_modules\/\.cache\/@qiwi%2Frepocrawler-cli$/

describe('getNonExistingTempDir', () => {
  it('returns correct value', () => {
    jest.spyOn(rimraf, 'sync').mockImplementation(() => {
      /* noop */
    })
    expect(getNonExistingTempDir()).toMatch(dirRegexp)
  })

  it('deletes existing dir', () => {
    const existSpy = jest.spyOn(fs, 'existsSync').mockImplementation(() => true)
    const rimrafSpy = jest.spyOn(rimraf, 'sync').mockImplementation(() => {
      /* noop */
    })
    expect(getNonExistingTempDir()).toMatch(dirRegexp)
    expect(existSpy).toHaveBeenCalledWith(expect.stringMatching(dirRegexp))
    expect(rimrafSpy).toHaveBeenCalledWith(expect.stringMatching(dirRegexp))
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
