# @qiwi/repocrawler
Crawlers and analyzers for Gerrit & GitHub

| Package | Description |
|---------|-------------|
| [@qiwi/repocrawler-infra](./packages/infra) | Collection of packages for development |
| [@qiwi/repocrawler-common](./packages/common) | Common types & helper functions |
| [@qiwi/repocrawler-gerrit](./packages/gerrit) | Gerrit crawler |
| [@qiwi/repocrawler-github](./packages/github) | GitHub crawler |
| [@qiwi/repocrawler-cli](./packages/cli) | CLI for crawling and making reports (last one has not been implemented) |

## Use case examples
### Fetching and processing data
Download necessary files by crawler:
```shell
npx -p @qiwi/repocrawler-cli crawler --vcs gerrit --url http://gerrit.com/a --auth.username username --auth.password password --org common --path src/main/ts/index.ts --out temp
```
Process it by your custom script:
```js
import glob from 'glob'
import { readFileSync } from 'fs'

const crawlerResultItemPaths = glob.sync('temp/*.json')

crawlerResultItemPaths.forEach(path => {
  const crawlerResultItem = JSON.parse(readFileSync(path).toString())
  const indexFile = crawlerResultItem.files.find(file => file.path === 'src/main/ts/index.ts')
  if (indexFile) {
    // do something with file content
    console.log(indexFile.body)
  }
})
```
### Making reports 

Download files for report generator:
```shell
npx -p @qiwi/repocrawler-cli crawler --vcs github --url https://api.github.com --auth token --org qiwi --out temp-qiwi
```
Make a report:
```shell
npx -p @qiwi/repocrawler-cli reporter --report usage --cwd temp-qiwi --package ^typescript$ --deps all --range ">=4.0.0" --source package > report.json
```
<details>
    <summary>report.json:</summary>

```json
{
  "packageNamePattern": "^typescript$",
  "depType": "all",
  "source": "package",
  "versionRange": ">=4.3.0",
  "data": [
    {
      "project": "buildstamp-monorepo",
      "package": "typescript",
      "versions": [
        "4.3.2"
      ],
      "commitInfo": {
        "hash": "669b3f50735cb6329924fa4a13a60deb1fdac925",
        "message": "build(deps): bump glob-parent from 5.1.1 to 5.1.2\n\nBumps [glob-parent](https://github.com/gulpjs/glob-parent) from 5.1.1 to 5.1.2.\n- [Release notes](https://github.com/gulpjs/glob-parent/releases)\n- [Changelog](https://github.com/gulpjs/glob-parent/blob/main/CHANGELOG.md)\n- [Commits](https://github.com/gulpjs/glob-parent/compare/v5.1.1...v5.1.2)\n\n---\nupdated-dependencies:\n- dependency-name: glob-parent\n  dependency-type: indirect\n...\n\nSigned-off-by: dependabot[bot] <support@github.com>",
        "date": "2021-06-12T05:53:48Z"
      }
    },
    {
      "project": "@qiwi/common-formatters",
      "package": "typescript",
      "versions": [
        "4.3.5"
      ],
      "commitInfo": {
        "hash": "7f99309fbed542c41d2dfcef11974bc51c721057",
        "message": "chore(deps): update dependency typescript to v4.3.5",
        "date": "2021-07-01T03:24:13Z"
      }
    },
    {
      "project": "@qiwi/cyclone",
      "package": "typescript",
      "versions": [
        "4.3.2"
      ],
      "commitInfo": {
        "hash": "7606f5c2ff5df7b65fbbc27069941a85e7eccef3",
        "message": "chore: up deps",
        "date": "2021-06-09T10:58:31Z"
      }
    },
    {
      "project": "@qiwi/libdefkit",
      "package": "typescript",
      "versions": [
        "4.3.2"
      ],
      "commitInfo": {
        "hash": "8f1b2a876dbc85cc874b96fe3acccf7a56f51329",
        "message": "chore(release): 3.0.0 [skip ci]\n\n# [3.0.0](https://github.com/qiwi/libdefkit/compare/v2.1.8...v3.0.0) (2021-06-07)\n\n### Performance Improvements\n\n* repack as mjs ([c50df11](https://github.com/qiwi/libdefkit/commit/c50df11aed9ec88f21d81fdf15bcd4257f0ee058))\n* update deps, migrate to mjs modules ([bb40f2b](https://github.com/qiwi/libdefkit/commit/bb40f2bab2d306c1baa37ef892dc885d26154c70))\n\n### BREAKING CHANGES\n\n* require Node.js >= 14\n* repack as mjs, require Node.js >= 14",
        "date": "2021-06-07T18:24:57Z"
      }
    },
    {
      "project": "@qiwi/license",
      "package": "typescript",
      "versions": [
        "4.3.4"
      ],
      "commitInfo": {
        "hash": "4ee65837e2085f0d9a1724d8a2cccec81196e44d",
        "message": "chore(deps): bump trim-newlines from 3.0.0 to 3.0.1\n\nBumps [trim-newlines](https://github.com/sindresorhus/trim-newlines) from 3.0.0 to 3.0.1.\n- [Release notes](https://github.com/sindresorhus/trim-newlines/releases)\n- [Commits](https://github.com/sindresorhus/trim-newlines/commits)\n\n---\nupdated-dependencies:\n- dependency-name: trim-newlines\n  dependency-type: indirect\n...\n\nSigned-off-by: dependabot[bot] <support@github.com>",
        "date": "2021-06-19T08:44:02Z"
      }
    },
    {
      "project": "lint-config-qiwi",
      "package": "typescript",
      "versions": [
        "4.3.2"
      ],
      "commitInfo": {
        "hash": "a48316351ea0cf5eb8204a6d2a864f0d1516baec",
        "message": "chore(release): 1.13.1 [skip ci]\n\n## eslint-config-qiwi [1.13.1](https://github.com/qiwi/lint-config-qiwi/compare/eslint-config-qiwi@1.13.0...eslint-config-qiwi@1.13.1) (2021-06-15)\n\n### Bug Fixes\n\n* add ts as dependencty to eslint ([#96](https://github.com/qiwi/lint-config-qiwi/issues/96)) ([59ddf67](https://github.com/qiwi/lint-config-qiwi/commit/59ddf67191f1273f63843e8319bef90bcdfb56a4)), closes [#95](https://github.com/qiwi/lint-config-qiwi/issues/95)",
        "date": "2021-06-15T15:27:53Z"
      }
    },
    {
      "project": "@qiwi/mixin",
      "package": "typescript",
      "versions": [
        "4.3.5"
      ],
      "commitInfo": {
        "hash": "f219bda53ae19cbf052747c4165f31278da5a664",
        "message": "chore(deps): bump postcss from 7.0.35 to 7.0.36\n\nBumps [postcss](https://github.com/postcss/postcss) from 7.0.35 to 7.0.36.\n- [Release notes](https://github.com/postcss/postcss/releases)\n- [Changelog](https://github.com/postcss/postcss/blob/main/CHANGELOG.md)\n- [Commits](https://github.com/postcss/postcss/compare/7.0.35...7.0.36)\n\n---\nupdated-dependencies:\n- dependency-name: postcss\n  dependency-type: indirect\n...\n\nSigned-off-by: dependabot[bot] <support@github.com>",
        "date": "2021-07-04T04:54:19Z"
      }
    },
    {
      "project": "qiwi-substrate-monorepo",
      "package": "typescript",
      "versions": [
        "4.3.0"
      ],
      "commitInfo": {
        "hash": "afa9d386108fa9f272e2bbcb40ab095dfbe154bf",
        "message": "chore(deps): update dependency @types/underscore to v1.11.3",
        "date": "2021-07-03T06:30:13Z"
      }
    }
  ]
}
```
</details>

## License
[MIT](./LICENSE)
