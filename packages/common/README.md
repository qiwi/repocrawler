# @qiwi/repocrawler-common
Common types & helper functions
All crawlers implement `TRepoCrawler` interface

## TRepoCrawler
### getCommit(owner: string, repo: string, ref: string): Promise<[TCommitInfo](./src/main/ts/types/crawler.ts#L6)>
Get commit by `ref` from `owner`/`repo` repository.
### getRawContent(owner: string, repo: string, path: string): Promise<string>
Get file `path` from `owner`/`repo` repository.
### fetchRepoInfo(opts: { out: string, paths?: string[], orgs?: Array<string> }): Promise<PromiseSettledResult<void>[]>
Fetch files for all repositories by list of organizations/owners. Output is a separate json-file for each repository.
- `out` - path to directory to save output files;
- `paths` - paths of files to fetch, default is [`package.json`, `yarn.lock`, `package-lock.json`, `npm-shrinkwrap.json`];
- `orgs` - list of organizations/owners, defaults to all.

If `paths` is not specified, output file format is [TRepoCrawlerReportResultItem](./src/main/ts/types/crawler.ts#L39), this can be used as input for [@qiwi/repocrawler-reporters](../reporters).
Otherwise output file format is [TRepoCrawlerResultItem](./src/main/ts/types/crawler.ts#L35).
### getRepoFiles(repo: [TRepo](./src/main/ts/types/crawler.ts#L56), paths: string[]): Promise<[TFile](./src/main/ts/types/crawler.ts#L25)[]>
Fetch files of repo `repo.org`/`repo.repo` by `paths`.
### getInfoByRepos(repo: [TRepo](./src/main/ts/types/crawler.ts#L56), paths: string[])): Promise<[TRepoCrawlerResultItem](./src/main/ts/types/crawler.ts#L35)[]>
Fetch files and last commits of given repos by `paths`
### getReportInfoByRepos(repo: [TRepo](./src/main/ts/types/crawler.ts#L56)): Promise<[TRepoCrawlerReportResultItem](./src/main/ts/types/crawler.ts#L39)[]>
Get `package.json`, `yarn.lock`, `package-lock.json`, `npm-shrinkwrap.json` and last commits if given repos. Json-files are parsed.
Output files can be used as input for [@qiwi/repocrawler-reporters](../reporters)
## commonCrawlerMethodsFactory(base: TBaseCrawler, opts: { name: string, debug?: boolean }, logger: ILogger): [TCommonCrawler](./src/main/ts/types/crawler.ts#L61)
Returns object with common crawler methods.
