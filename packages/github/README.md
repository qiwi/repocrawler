# @qiwi/repocrawler-github
GitHub crawler
## Installation
```shell
yarn add @qiwi/repocrawler-github
npm i @qiwi/repocrawler-github
```
## Usage
```js
import { createGithubCrawler } from '@qiwi/repocrawler-github'

const crawler = createGithubCrawler(
  {
    baseUrl: 'foo',
    auth: 'token'
  },
  {
    ratelimit: {
      period: 1000,
      count: 4
    }
  }
)

crawler.fetchRepoInfo({ out: 'path/to/save/data', paths: ['src/main/ts/index.ts'], orgs: ['organization1', 'organization2'] })
  .then(() => console.log('Done.'))
```
## API
See [here](../common/README.md#TRepoCrawler)
