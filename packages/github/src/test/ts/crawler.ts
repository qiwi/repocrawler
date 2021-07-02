import { readFileSync } from 'fs'
import { join } from 'path'

import { createGithubCrawler } from '../../main/ts'
import { opts } from '../../main/ts/default'
import { githubCrawlerGetInfoByReposResponse } from './stub/githubCrawlerGetInfoByReposResponse'
import { octokitOrgsList } from './stub/octokitOrgsList'
import { octokitReposGetCommit } from './stub/octokitReposGetCommit'
import { octokitReposGetContent } from './stub/octokitReposGetContent'
import { octokitReposListForOrg } from './stub/octokitReposListForOrg'

const packageExampleJson = readFileSync(join(__dirname, '..', 'resources', 'package.example.json'))

describe('githubCrawler', () => {
  const githubCrawler = createGithubCrawler(
    {
      baseUrl: 'https://github.com/api/v3',
      auth: 'string',
    },
    opts,
  )
  // @ts-ignore
  const { octokit } = githubCrawler
  jest.spyOn(octokit, 'paginate').mockImplementation(async (fn, ...args) =>
    // @ts-ignore
    fn(...args).then((d) => d.data),
  )
  process.on('unhandledRejection', () => {
    // console.error(e)
  })

  // @ts-ignore
  beforeEach(() => {
    // @ts-ignore
    octokit.orgs.list = async () => octokitOrgsList
    // @ts-ignore
    octokit.repos.listForOrg = async () => octokitReposListForOrg
    // @ts-ignore
    octokit.repos.getCommit = async () => ({
      data: { sha: '51067f54f8e9b053daece0131114fd074dabc8f6' },
    })
    // @ts-ignore
    octokit.git.getCommit = async () => octokitReposGetCommit
    // @ts-ignore
    octokit.repos.getContent = async () => octokitReposGetContent
  })

  describe('getOrgList', () => {
    it('returns orgList', async () => {
      const res = await githubCrawler.getOrgList()
      expect(res).toMatchObject([
        'client-dev-ios',
        'client-dev-android',
        'client-dev-windows',
        'client-dev-j2me',
        'client-dev-commons',
        'web-dev',
        'dev-common',
        'WhatsProductSquare',
        'SuperSecretNewRestProtocol',
        'SINAP',
        'design',
        'qa',
        'front-dev',
        'client-dev-desktop',
        'client-dev-pos',
        'ssk-dev-apps',
        'givee',
        'qlimate',
        'Exchange',
        'scala',
        'Edge',
        'prc-server-side',
        'Docker',
        'WAREHOUSE',
        'ecom-rnd',
        'qw-api-backend',
        'terminals',
        'Helianto',
        'agent',
        'microservices',
      ])
    })
  })

  describe('getReposByOrgs', () => {
    it('returns repos', async () => {
      const res = await githubCrawler.getReposByOrgs(['jslab'])
      expect(res).toMatchObject([
        { org: 'jslab', repo: 'qorsproxy' },
        { org: 'jslab', repo: 'health-indicator' },
        { org: 'jslab', repo: 'redux-signal-bus' },
        { org: 'jslab', repo: 'decorator-utils' },
        { org: 'jslab', repo: 'di-container' },
        { org: 'jslab', repo: 'requirements' },
        { org: 'jslab', repo: 'interview' },
        { org: 'jslab', repo: 'card-info-api' },
        { org: 'jslab', repo: 'qiwi-ui' },
        { org: 'jslab', repo: 'edu-buildtime-microfront' },
        { org: 'jslab', repo: 'dummy-monorepo-lib' },
      ])
    })
  })

  describe('getCommit', () => {
    it('returns commit info', async () => {
      const res = await githubCrawler.getCommit('jslab', 'qorsproxy', 'HEAD')
        .catch(console.error)

      expect(res).toMatchObject({
        vcs: 'github',
        lastCommit: {
          hash: '4c9da8e57c5d431ac719877a7a7b7f586f4e2a71',
          message: 'build(npm): update deps',
          author: {
            date: '2018-04-20T12:36:26Z',
            email: 'mailbox@antongolub.ru',
            name: 'Anton Golub',
          },
          committer: {
            date: '2018-04-20T12:36:26Z',
            email: 'mailbox@antongolub.ru',
            name: 'Anton Golub',
          },
        },
      })
    })
  })

  describe('getContent', () => {
    it('returns file', async () => {
      const res = await githubCrawler.getRawContent(
        'jslab',
        'qorsproxy',
        'package.json',
      )

      expect(res).toEqual(packageExampleJson.toString())
    })
  })
})

describe('getInfoByRepos', () => {
  const githubCrawler = createGithubCrawler(
    {
      baseUrl: 'https://github.com/api/v3',
      auth: 'string',
    },
    opts,
  )
  // @ts-ignore
  const { octokit } = githubCrawler
  jest.spyOn(octokit, 'paginate').mockImplementation(async (fn, ...args) =>
    // @ts-ignore
    fn(...args).then((d) => d.data),
  )

  // @ts-ignore
  beforeEach(() => { // eslint-disable-line sonarjs/no-identical-functions
    // @ts-ignore
    octokit.orgs.list = async () => octokitOrgsList
    // @ts-ignore
    octokit.repos.listForOrg = async () => octokitReposListForOrg
    // @ts-ignore
    octokit.repos.getCommit = async () => ({
      data: { sha: '51067f54f8e9b053daece0131114fd074dabc8f6' },
    })
    // @ts-ignore
    octokit.git.getCommit = async () => octokitReposGetCommit
    // @ts-ignore
    octokit.repos.getContent = async () => octokitReposGetContent
  })

  it('returns repo info', async () => {
    const res = await githubCrawler.getInfoByRepos(
      [{ org: 'jslab', repo: 'qorsproxy' }],
      ['package.json'],
    )
    expect(res[0].info).toMatchObject(githubCrawlerGetInfoByReposResponse[0].info)
    expect(res[0].name).toEqual(githubCrawlerGetInfoByReposResponse[0].name)
    const file = res[0].files?.[0]
    expect(file?.body).toEqual(packageExampleJson.toString())
    expect(file?.path).toEqual(githubCrawlerGetInfoByReposResponse[0].files[0].path)
  })
})

