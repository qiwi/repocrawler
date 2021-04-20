# @qiwi/repocrawler-reporters
Reporters for analyzing results of crawling ([@qiwi/repocrawler-gerrit](../gerrit) or [@qiwi/repocrawler-github](../github))
## API
All functions return reports as objects
### getTreeReport(packageNamePattern, source, depType, cwd)
Tree report
```typescript
import { getTreeReport } from '@qiwi-private/jslab-repocrawler'

const treeReport = getTreeReport('^typescript$', 'auto', 'all', 'temp')
```
```json
{
    "packageNamePattern": "^typescript$",
    "depType": "dev",
    "source": "package",
    "totalProjectsCount": 42,
    "data": [
        {
            "name": "typescript",
            "usageCount": 3,
            "ratio": 0.0714,
            "minVersion": "2.0.3",
            "maxVersion": "4.0.3",
            "repos": [
                {
                    "vcs": "gerrit",
                    "repo": "gerrit%2Ffoo%bar-admin-node"
                },
                {
                    "vcs": "gerrit",
                    "repo": "gerrit%2Fbaz%2Fbaz-api"
                },
                {
                    "vcs": "gerrit",
                    "repo": "gerrit%2Fbat%2Fbat"
                }
            ]
        }
    ]
}
```
Arguments

| Name      | Description                                                                                                                                                       | Default                                   |
|:--------------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------|:--------------------------------------------------------|
| packageNamePattern       | package name pattern                                                                                                                  | mandatory                                              |
| source        | `auto`, `package`, `lockfile`. `auto` - lockfiles are analyzed if exist or `package.json`   instead         | mandatory                                              |
| depType       | `all`, `dev`, `peer`, `optional`                                                                                                      | mandatory if `source = package`                 |
| cwd           | Path to folder with crawler metadata                                                                                                              | `node_modules/.cache/@qiwi%2Frepocrawler-reporter` |
### getUsageReport(packageNamePattern, versionRange, source, depType, cwd)
Usage report
```typescript
import { getUsageReport } from '@qiwi-private/jslab-repocrawler'

const usageReport = getUsageReport('^typescript$', '>=4.0.0', 'lock', 'all', 'temp')
```
```json
{
	"packageNamePattern": "^typescript$",
	"depType": "all",
	"versionRange": ">=4.0.0",
	"source": "package",
	"usages": [
		{
			"project": "@qiwi-foo/js-bar",
			"package": "typescript",
			"versions": ["4.0.2"],
			"commitInfo": {
				"hash": "0c24c1881a516dcebb34b24bf921fb6012345678",
				"message": "chore: update deps"
			}
		}
	]
}
```
Arguments

| Name      | Description                                                                                                                                                       | Default                                   |
|:--------------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------|:--------------------------------------------------------|
| packageNamePattern       | package name pattern                                                                                                                  | mandatory                                              |
| versionRange       | Valid semver range of package versions to analyze                                                                                                      | mandatory                   |
| source        | `auto`, `package`, `lockfile`. `auto` - lockfiles are analyzed if exist or `package.json`   instead         | mandatory                                              |
| depType       | `all`, `dev`, `peer`, `optional`                                                                                                      | mandatory if `depsSource = package`                 |
| cwd           | Path to folder with crawler metadata                                                                                                              | `node_modules/.cache/@qiwi%2Frepocrawler-reporter` |

### getVersionsReport(packageNamePattern, versionRange, source, depType, cwd)
Versions report
```typescript
import { getVersionsReport } from '@qiwi-private/jslab-repocrawler'

const versionsReport = getVersionsReport('^typescript$', '>=4.0.0', 'lock', 'all', 'temp')
```
```json
{
	"packageNamePattern": "^typescript$",
	"depType": "all",
	"source": "lock",
	"versionRange": ">4.0.0",
	"data": [
		"3.9.7",
		"4.0.3"
	]
}
```
Arguments are the same as in `getUsageReport`
