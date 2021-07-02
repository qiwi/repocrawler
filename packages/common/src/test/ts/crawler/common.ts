import fs from 'fs'
import { join } from 'path'

import { TCommitInfo } from '../../../main/ts'
import { commonCrawlerMethodsFactory, writeRepoInfo } from '../../../main/ts/crawler'

const commitInfo: TCommitInfo = {
  vcs: 'gerrit',
  lastCommit: {
    hash: 'foo',
    message: 'bar',
    author: {
      name: 'name',
      email: 'email',
      date: new Date().toISOString(),
    },
    committer: {
      name: 'name',
      email: 'email',
      date: new Date().toISOString(),
    }
  }
}
const name = 'crawler'
const repos = [
  {
    repo: 'repo1',
    org: 'org'
  },
  {
    repo: 'repo2',
    org: 'org'
  }
]
const paths = [
  'foo/bar',
  'foo/baz'
]
const expectedFiles = [
  {
    path: paths[0],
    body: '42'
  },
  {
    path: paths[1],
    body: '42'
  }
]
const results = [
  {
    name: `${name}-${repos[0].org}-${repos[0].repo}`,
    info: commitInfo,
    files: expectedFiles
  },
  {
    name: `${name}-${repos[1].org}-${repos[1].repo}`,
    info: commitInfo,
    files: expectedFiles
  }
]

describe('commonCrawlerMethodsFactory', function () {
  describe('getRepoFiles', function () {
    it('returns files', async () => {
      const commonCrawler = commonCrawlerMethodsFactory(
        { getRawContent: () => Promise.resolve('42') } as any,
        { name: 'test' },
        console
      )

      const res = await commonCrawler.getRepoFiles({ repo: 'repo', org: 'org' }, paths)
      expect(res).toEqual(expectedFiles)
    })

    it('handles errors', async () => {
      const dummyLogger = {
        error: jest.fn()
      } as any
      const baseCrawler = commonCrawlerMethodsFactory(
        {
          getRawContent: (_: any, __: any, path: string) =>
            path === 'errorPath'
              ? Promise.reject(new Error('error'))
              : Promise.resolve('42'),
        } as any,
        { name: 'test-crawler', debug: true },
        dummyLogger
      )

      const res = await baseCrawler.getRepoFiles({ repo: 'repo', org: 'org' }, [...paths, 'errorPath'])
      expect(res).toEqual([
        ...expectedFiles,
        {
          path: 'errorPath',
        }
      ])
      expect(dummyLogger.error).toBeCalledWith(expect.stringMatching(/error$/))
    })
  })

  describe('getInfoByRepos', function () {
    it('gets commit and files', async () => {
      const name = 'crawler'
      const commonCrawler = commonCrawlerMethodsFactory(
        {
          getCommit: () => Promise.resolve(commitInfo),
          getRawContent: () => Promise.resolve('42')
        } as any,
        { name },
        console
      )

      const data = await commonCrawler.getInfoByRepos(repos, paths)

      expect(data).toEqual(results)
    })
  })

  describe('getReportInfoByRepos', function () {
    it ('returns report infos', async () => {
      const packageJsonRaw = fs.readFileSync(join(__dirname, '..', '..', '..', '..', 'package.json')).toString()
      const yarnLock = fs.readFileSync(join(__dirname, '..', '..', '..', '..', '..', '..', 'yarn.lock')).toString()
      const name = 'crawler'
      const commonCrawler = commonCrawlerMethodsFactory(
        {
          getCommit: () => Promise.resolve(commitInfo),
          getRawContent: (_: any, __: any, path: string) => {
            if (path === 'package.json') {
              return Promise.resolve(packageJsonRaw)
            }
            if (path === 'yarn.lock') {
              return Promise.resolve(yarnLock)
            }
            return Promise.resolve('42')
          }
        } as any,
        { name },
        console
      )
      const data = await commonCrawler.getReportInfoByRepos(repos)
      expect(data[0].package?.name).toEqual('@qiwi/repocrawler-common')
      expect(data[0].yarnLock).toEqual(yarnLock)
    })
  })
})

describe('writeRepoInfo', function () {
  it('writes infos', async () => {
    const mkdirSpy = jest.spyOn(fs.promises, 'mkdir')
      .mockImplementation(() => Promise.resolve('path'))
    const writeFileSpy = jest.spyOn(fs.promises, 'writeFile')
      .mockImplementation(() => Promise.resolve())
    await writeRepoInfo(results[0], 'temp')
    expect(mkdirSpy).toBeCalled()
    expect(writeFileSpy).toBeCalled()
  })
})
