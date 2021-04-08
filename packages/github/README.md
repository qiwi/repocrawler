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
