export const githubCrawlerGetInfoByReposResponse = [
  {
    name: 'github-jslab-qorsproxy',
    info: {
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
    },
    files: [
      {
        path: 'package.json',
        body: {
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
        },
      }
    ]
  },
]
