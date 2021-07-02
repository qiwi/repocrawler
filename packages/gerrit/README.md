# @qiwi/repocrawler-gerrit
Gerrit crawler
## Installation
```shell
yarn add @qiwi/repocrawler-gerrit
npm i @qiwi/repocrawler-gerrit
```
## Usage
```js
import { createGerritCrawler } from '@qiwi/repocrawler-gerrit'

const crawler = createGerritCrawler(
  {
    baseUrl: 'foo',
    auth: {
      username: 'bar',
      password: 'baz'
    }
  },
  {
    ratelimit: {
      period: 1000,
      count: 4
    }
  }
)

crawler.fetchRepoInfo('path/to/save/data', ['src/main/ts/index.ts'], ['organization1', 'organization2'])
  .then(() => console.log('Done.'))
```
## API
See [here](../common/README.md#TRepoCrawler)
