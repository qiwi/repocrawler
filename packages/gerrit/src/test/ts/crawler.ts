import { readFileSync } from 'fs'
import { join } from 'path'
import nock from 'nock'

import { createGerritCrawler } from '../../main/ts'
import { opts } from '../../main/ts/default'
import { getCommit } from './stub/getCommit'
import { getContent } from './stub/getContent'
import { listProjects } from './stub/listProjects'

const packageExampleJson = readFileSync(join(__dirname, '..', 'resources', 'package.example.json'))

const commitRevision = '67ebf73496383c6777035e374d2d664009e2aa5c'
const commit = `)]}'
  {
    "ref": "HEAD",
    "revision": "${commitRevision}"
  }`

describe('gerritCrawler', () => {
  const gerritkitOpts = {
    baseUrl: 'https://gerrit.osmp.ru/a',
    auth: {
      username: 'm.username',
      password: 'password',
    },
  }
  const gerritCrawler = createGerritCrawler(gerritkitOpts, opts)
  const { gerritkit } = gerritCrawler

  beforeAll(() => {
    gerritkit.repos.listForOrg = async () => listProjects
    gerritkit.repos.getCommit = async () => getCommit
    gerritkit.repos.getContent = async () => getContent
  })

  describe('getRepos', () => {
    it('returns repos', async () => {
      const res = await gerritCrawler.getRepos(['jslab'])
      expect(res).toMatchObject([
        { org: 'jslab', repo: 'dummy-lib' },
        {
          org: 'jslab',
          repo: 'dummy-nestjs-app',
        },
        { org: 'jslab', repo: 'dummy-pijma-spa' },
        { org: 'jslab', repo: 'repocrawler' },
      ])
    })
  })

  describe('getCommit', () => {
    it('returns commit info', async () => {
      const res = await gerritCrawler.getCommit('jslab', 'repocrawler', 'HEAD')

      expect(res).toMatchObject({
        vcs: 'gerrit',
        lastCommit: {
          hash: '13da9cfb3fbe46b0e9565307f829ffaf16ecb79b',
          message:
            'feat: add gerritCrawler\n' +
            '\n' +
            'Change-Id: I2ec40e625a5abc3406448e534727ddaad21b7417\n',
          author: {
            name: 'Maxim Pismenskiy',
            email: 'm.pismenskiy@qiwi.com',
            date: '2020-09-09 10:55:48.000000000',
            tz: 180,
          },
          committer: {
            name: 'Maxim Pismenskiy',
            email: 'm.pismenskiy@qiwi.com',
            date: '2020-09-09 10:55:48.000000000',
            tz: 180,
          },
        },
      })
    })
  })

  describe('getRawContent', () => {
    it('returns commit info', async () => {
      const res = await gerritCrawler.getRawContent(
        'jslab',
        'repocrawler',
        'package.json',
      )
      expect(res).toEqual(packageExampleJson.toString())
    })
  })

  it('is throttled', async () => {
    const baseUrl = 'http://localhost:3000'
    const file = 'package.json'
    const org = 'jslab'
    const repos = ['foo', 'bar', 'baz', 'bat']
    const apiRouteMocks = repos.map(repo => [
      nock(baseUrl)
        .get(`/projects/${org}%2F${repo}/branches/HEAD`)
        .reply(200, commit),
      nock(baseUrl)
        .get(`/projects/${org}%2F${repo}/branches/${commitRevision}/files/${file}/content`)
        .reply(200, getContent)
    ])

    const crawler = createGerritCrawler(
      {
        baseUrl,
        auth: {
          username: 'username',
          password: 'password',
        }
      },
      {
        ratelimit: {
          period: 1000,
          count: 1
        },
        debug: false
      }
    )

    const startTime = Date.now()
    await Promise.all(repos.map(repo => crawler.getRawContent(org, repo, file)))
    const endTime = Date.now() - startTime
    expect(endTime).toBeGreaterThanOrEqual(3000)
    expect(apiRouteMocks.every(([commitMock, fileMock]) => commitMock.isDone() && fileMock.isDone()))
  })
})
