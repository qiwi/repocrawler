import { createGithubCrawler } from '../../main/ts'
import { opts } from '../../main/ts/default'
import { githubCrawlerGetInfoByReposResponse } from './stub/githubCrawlerGetInfoByReposResponse'
import { octokitOrgsList } from './stub/octokitOrgsList'
import { octokitReposGetCommit } from './stub/octokitReposGetCommit'
import { octokitReposGetContent } from './stub/octokitReposGetContent'
import { octokitReposListForOrg } from './stub/octokitReposListForOrg'

describe('githubCrawler', () => {
  const githubCrawler = createGithubCrawler(
    {
      baseUrl: 'https://github.qiwi.com/api/v3',
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
  process.on('unhandledRejection', (e) => {
    console.error(e)
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
      const res = await githubCrawler.getContent(
        'jslab',
        'qorsproxy',
        'package.json',
      )

      expect(res).toMatchObject({
        name: 'qorsproxy',
        description: 'Cors proxy for Qoder/Pusher',
        keywords: ['cors', 'corsproxy', 'qors', 'qorsproxy'],
        version: '3.0.2',
        repository: { type: 'git', url: 'https://github.com/qiwi/qorsproxy' },
        author: 'Anton Golub <a.golub@qiwi.com>',
        engines: { node: '>=9.4.0 <10.0', npm: '>=5.6 <6.0' },
        dependencies: {
          '@std/esm': '^0.26.0',
          'async-middleware': '^1.2.1',
          'basic-auth': '^2.0.0',
          express: '^4.16.3',
          ip: '^1.1.5',
          jsonschema: '^1.2.4',
          'lodash-es': '^4.17.8',
          optimist: '^0.6.1',
          request: '^2.85.0',
          winston: '^2.4.1',
          'winston-daily-rotate-file': '^3.1.2',
        },
        '@std/esm': { mode: 'all', cjs: true },
        main: 'src/app',
        scripts: {
          start_pm2: 'pm2 start npm --name qorsproxy -- start',
          start: 'node -r @std/esm --use_strict src/app',
          test: 'nyc mocha --opts .mocha.opts',
          coveralls: 'npm test && nyc report --reporter=text-lcov | coveralls',
        },
        license: 'MIT',
        devDependencies: {
          chai: '^4.1.2',
          'chai-spies': '^1.0.0',
          'chai-subset': '^1.6.0',
          coveralls: '^3.0.0',
          glob: '^7.1.2',
          mocha: '^5.1.1',
          'mocha-lcov-reporter': '^1.3.0',
          nyc: '^11.7.1',
          reqresnext: '^1.3.0',
        },
      })
    })
  })
})

describe('getInfoByRepos', () => {
  const githubCrawler = createGithubCrawler(
    {
      baseUrl: 'https://github.qiwi.com/api/v3',
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
    const res = await githubCrawler.getInfoByRepos([
      { org: 'jslab', repo: 'qorsproxy' },
    ])
    expect(res).toMatchObject(githubCrawlerGetInfoByReposResponse)
  })
})

