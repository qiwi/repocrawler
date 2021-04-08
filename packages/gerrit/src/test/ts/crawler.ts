import { createGerritCrawler } from '../../main/ts'
import { opts } from '../../main/ts/default'
import { getCommit } from './stub/getCommit'
import { getContent } from './stub/getContent'
import { listProjects } from './stub/listProjects'

describe('gerritCrowler', () => {
  const gerritkitOpts = {
    baseUrl: 'https://gerrit.osmp.ru/a',
    auth: {
      username: 'm.username',
      password: 'password',
    },
  }
  const gerritCrawler = createGerritCrawler(gerritkitOpts, opts)
  // @ts-ignore
  const { gerritkit } = gerritCrawler

  // @ts-ignore
  beforeAll(() => {
    gerritkit.repos.listForOrg = async () => listProjects
    // @ts-ignore
    gerritkit.repos.getCommit = async () => getCommit
    // @ts-ignore
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

  describe('getContent', () => {
    it('returns commit info', async () => {
      const res = await gerritCrawler.getContent(
        'jslab',
        'repocrawler',
        'package.json',
      )
      expect(res).toMatchObject({
        dependencies: {
          '@octokit/rest': '^18.0.4',
          '@types/mkdirp': '^1.0.1',
          axios: '^0.20.0',
        },
        description: 'crawler for github and gerrit',
        devDependencies: {
          '@qiwi/libdefkit': '^1.0.3',
          '@swissquote/crafty-preset-jest': '^1.12.0',
          '@types/jest': '^26.0.13',
          coveralls: '^3.1.0',
          'dts-generator': '^3.0.0',
          eslint: '^7.8.1',
          'eslint-config-qiwi': '^1.7.0',
          jest: '^26.4.2',
          microbundle: '^0.12.3',
          prettier: '^2.1.1',
          rimraf: '^3.0.2',
          terser: '^5.2.1',
          'ts-jest': '^26.3.0',
          typedoc: '^0.19.0',
          'typedoc-plugin-external-module-name': '^4.0.3',
          typescript: '^4.0.2',
        },
        files: ['README.md', 'CHANGELOG.md', 'lib'],
        main: 'lib/index.js',
        name: '@qiwi-private/jslab-repocrawler',
        scripts: {
          build:
            'yarn clean && yarn build:es5 && yarn build:es6 && yarn build:ts && yarn build:libdef && yarn docs && yarn uglify && yarn build:bundle',
          'build:bundle':
            'microbundle --tsconfig tsconfig.es5.json build src/main/ts/index.ts -o target/bundle',
          'build:es5': 'mkdirp target/es5 && tsc -p tsconfig.es5.json',
          'build:es6': 'mkdirp target/es6 && tsc -p tsconfig.es6.json',
          'build:libdef':
            'dts-generator --project ./ --out typings/index.d.ts --prefix @qiwi-private/jslab-repocrawler/target/es5 --name @qiwi-private/jslab-repocrawler --main @qiwi-private/jslab-repocrawler/target/es5/index --moduleResolution node && libdeffix --dts=./typings/index.d.ts --prefix=@qiwi-private/jslab-repocrawler/target/es5 && flowgen typings/index.d.ts --output-file flow-typed/index.flow.js',
          'build:ts': 'cp -r src/main/ts/ target/ts/',
          clean: 'rimraf target typings flow-typed buildcache',
          docs:
            'typedoc --readme README.md --tsconfig tsconfig.json src/main --ignoreCompilerErrors || exit 0',
          format: 'prettier --write "src/**/*.ts"',
          jest: 'jest -w 1 --config=jest.config.json',
          lint: 'eslint src/**/*.ts',
          postupdate: 'yarn && npx yarn-audit-fix && yarn build && yarn test',
          'push:report': 'yarn coveralls:push',
          test: 'yarn lint && yarn jest',
          'test:report': 'yarn test && yarn push:report',
          uglify:
            // eslint-disable-next-line no-template-curly-in-string
            "for f in $(find target -name '*.js'); do short=${f%.js}; terser -c -m -o $short.js -- $f; done",
        },
        version: '0.0.1',
      })
    })
  })
})
