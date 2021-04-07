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

crawler.fetchRepoInfo('path/to/save/data', ['organization1', 'organization2'])
  .then(() => console.log('Done.'))
```
## API
```typescript
type TRepoCrawler = {
  getInfoByRepos: (orgs: Array<{ org: string; repo: string }>) => Promise<Array<TRepoCrawlerResultItem>>
  fetchRepoInfo: (savePath: string, orgs?: Array<string>) => Promise<boolean>
  getCommit: (
    owner: string,
    repo: string,
    ref: string,
  ) => Promise<TCommitInfo | undefined>
  getContent: (
    owner: string,
    repo: string,
    path: string,
  ) => Promise<Record<string, any>>
}

```
