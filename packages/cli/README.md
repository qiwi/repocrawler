# @qiwi/repocrawler-cli
CLI for crawling and making reports
## Crawler
### Usage
```shell
yarn add @qiwi/repocrawler-cli
crawler --vcs gerrit --url http://gerrit.com/a --auth.username username --auth.password password --org common --org internal --path package.json
```
or via npx
```shell
npx -p @qiwi/repocrawler-cli crawler --vcs gerrit --url http://gerrit.com/a --auth.username username --auth.password password --org common --path package.json --path .npmrc
```
You can also use config file:
```shell
crawler --config config.json
```
config.json (you can specify several crawlers):
```json
{
  "org": [
    "common"
  ],
  "crawlers": [
    {
      "vcs": "gerrit",
      "auth": {
        "username": "username",
        "password": "password"
      },
      "url": "https://gerrit.com/a"
    },
    {
      "vcs": "github",
      "auth": "1234567890123456789012345678901234567890",
      "url": "https://github.com/api/v3"
    }
  ]
}
```
or use config file with overriding:
```shell
# override "org" field
crawler --config config.json --org internal

# replace "crawlers" with other one
crawler --config config.json --vcs gerrit --url https://other-gerrit.com/a --auth.username foo --auth.pasword password
```
### Options
| Flag | Description | Default |
|------|-------------|---------|
| vcs | `gerrit` or `github` | mandatory |
| auth | Github API auth token (PAT) if `vcs` === `github` | mandatory if `vcs` === `github` |
| auth.username, auth.password | Gerrit API credentials if `vcs` === `gerrit` | mandatory if `vcs` === `gerrit` |
| path | list of file paths to fetch | fetch data for [@qiwi/repocrawler-reporters](../reporters) |
| org | list of organizations/spaces to fetch | all organizations/spaces |
| url | VCS API url | mandatory |
| out | path to save results for crawling | `node_modules/.cache/@qiwi%2Frepocrawler-cli` |
| config | path to config file | optional |
| limit-count | max count of requests to VCS API per period | 10 |
| limit-period | length of limit period in ms | 2000 |
| pool-size | number of workers for every operation | 2 |

`vcs`, `auth`, `auth.username`, `auth.password`, `url` should be specified in objects of `crawlers` array field of config file, see example in [Usage](#Usage).
Other flags can be given in config as top-level values. Kebab-case options should be written in camelCase in the config.
## Reporter
### Usage
```shell
yarn add @qiwi/repocrawler-cli
reporter --report tree --cwd temp --package ^typescript$ --deps dev --source package > temp-qiwi-forks-ts-report.json 
```
or via npx
```shell
npx -p @qiwi/repocrawler-cli repoter --report tree --cwd temp --package ^typescript$ --deps dev --source package > temp-qiwi-forks-ts-report.json 
```
### Options
| Name      | Description                                                                                                                                                       | Default                                   |
|:--------------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------|:--------------------------------------------------------|
| cwd           | Path to directory with results of crawling                                                                                                              | `node_modules/.cache/@qiwi%2Frepocrawler-cli` |
| package       | Regexp for dependency name                                                                                                                  | mandatory                                              |
| source        | Where to look for dependencies `auto`, `package`, `lockfile`. `auto` - lock-files will be analyzed or `package.json` in case of absence   | mandatory                                              |
| deps       | Type of dependencies, one of `all`, `dev`, `peer`, `optional`                                                                                                      | mandatory if `source === package`                 |
| range  | [Semver](https://github.com/npm/node-semver#range-grammar) version-range                                                                                                                                       | mandatory if `report === usage` or `versions`    |
| report    | Report type, one of `tree`, `usage`, `versions`                                                                                                                | mandatory                                              |
| sort.field    | Field to sort by, one of `name`, `ratio`, `usageCount`, `minVersion`, `maxVersion`, `version`, `project`, `package`, `commitDate`                          | optional                                            |
| sort.order    | Order of sorting, one of `asc`, `desc`            
### Report types
#### Tree report
This report type shows for every package satisfying given `package` pattern:
- list of repositories which use given package;
- the used min and max versions; 
- usage count;
- ratio as `usageCount`/`totalProjectsCount`.

`totalProjectsCount` is a number of repositories with `package.json`.
```shell
reporter --report tree --cwd temp --package ^@types --deps dev --source package > temp-qiwi-forks-types-tree-report.json
```
temp-qiwi-forks-types-tree-report:
```json
{
  "packageNamePattern": "^@types",
  "depType": "dev",
  "source": "package",
  "data": [
    {
      "name": "@types/node",
      "usageCount": 3,
      "ratio": 0.4286,
      "repos": [
        {
          "vcs": "github",
          "repo": "github-qiwi-forks-esm"
        },
        {
          "vcs": "github",
          "repo": "github-qiwi-forks-npm-run-all"
        },
        {
          "vcs": "github",
          "repo": "github-qiwi-forks-npm-types"
        }
      ],
      "minVersion": "14.0.24",
      "maxVersion": "15.0.2"
    }
  ],
  "totalProjectsCount": 7
}

```

#### Usage report
This report shows for every package satisfying given `package` pattern:
- name of npm-project using given package;
- the used version of the package;
- info about the latest commit in the project.
```shell
reporter --report usage --cwd temp-qiwi-forks --package ^typescript$ --range ">=4.1.0" --deps dev --source package > temp-qiwi-forks-ts-usage-report.json
```
temp-qiwi-forks-ts-usage-report.json:
```json
{
  "packageNamePattern": "^typescript$",
  "depType": "dev",
  "source": "package",
  "versionRange": ">=4.1.0",
  "data": [
    {
      "project": "@qiwi/dts-bundle",
      "package": "typescript",
      "versions": [
        "4.2.3"
      ],
      "commitInfo": {
        "hash": "d382c33590a02356ba116ce63f5e79a1ffd85795",
        "message": "chore(release): 0.7.5 [skip ci]\n\n## [0.7.5](https://github.com/qiwi-forks/dts-bundle/compare/v0.7.4...v0.7.5) (2021-03-16)\n\n### Bug Fixes\n\n* **pkg:** up deps, fix vuls ([e230e70](https://github.com/qiwi-forks/dts-bundle/commit/e230e70cc836338a628683f0e4f15f418b967a1a))",
        "date": "2021-03-16T08:17:13Z"
      }
    },
    {
      "project": "@qiwi/npm-types",
      "package": "typescript",
      "versions": [
        "4.3.5"
      ],
      "commitInfo": {
        "hash": "f20f3765f6191133b053743cfdd48db1f92f7997",
        "message": "chore(release): 1.0.3 [skip ci]\n\n## [1.0.3](https://github.com/qiwi-forks/npm-types/compare/v1.0.2...v1.0.3) (2021-07-01)\n\n### Bug Fixes\n\n* add optionalDependencies ([#3](https://github.com/qiwi-forks/npm-types/issues/3)) ([97fa744](https://github.com/qiwi-forks/npm-types/commit/97fa74483715557c320f6987c4eaeb090918af04))\n\n### Performance Improvements\n\n* update deps ([#4](https://github.com/qiwi-forks/npm-types/issues/4)) ([5d0c0f5](https://github.com/qiwi-forks/npm-types/commit/5d0c0f5243bd6c0af6e62685eb0a1cc30bf8bb53))",
        "date": "2021-07-01T16:47:02Z"
      }
    }
  ]
}

```

#### Versions report
The same as usage report, but contains used versions only
```shell
reporter --report versions --cwd temp-qiwi-forks --package ^typescript$ --range ">=4.1.0" --deps dev --source package > temp-qiwi-forks-ts-versions-report.json
```
temp-qiwi-forks-ts-versions-report.json:
```json
{
	"packageNamePattern": "^typescript$",
	"depType": "dev",
	"source": "package",
	"versionRange": ">=4.1.0",
	"data": [
		"4.2.3",
		"4.3.5"
	]
}

```
