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

---
**NOTE**

Reporter CLI is coming soon

---

Download files for report generator:
```shell
npx -p @qiwi/repocrawler-cli crawler --vcs github --url http://gihtub.com/api/v3 --auth token --org common --out temp
```
Make a report:
```shell
npx -p @qiwi/repocrawler-cli reporter --type usage --cwd temp --package ^typescript$ --deps all --range ">=4.0.0" --source package > report.json
```
report.json:
```json
{
	"packageNamePattern": "^typescript$",
	"depType": "all",
	"versionRange": ">=4.0.0",
	"source": "package",
	"usages": [
		{
			"project": "common/js-foo",
			"package": "typescript",
			"versions": ["4.0.2"],
			"commitInfo": {
				"hash": "0c24c1881a516dcebb31jhh23412f921fb60c74a9db8",
				"message": "chore(release): 1.1.0 [skip ci]"
			}
		}
	]
}
```
## License
[MIT](./LICENSE)
