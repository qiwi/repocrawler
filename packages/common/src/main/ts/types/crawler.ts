import { OctokitOptions } from '@octokit/core/dist-types/types'
import { PackageJson, PackageLock } from '@qiwi/npm-types'
import { IComplexDelay } from 'push-it-to-the-limit'

export type TVcs = 'gerrit' | 'github'

export type TCommitInfo = {
  vcs: TVcs
  lastCommit: {
    hash: string
    message: string
    author: {
      name: string
      email: string
      date: string
    } | any
    committer: {
      name: string
      email: string
      date: string
    } | any
  }
}

export type TFile = {
  path: string
  body?: string
  reason?: any
}

export type TRepoCrawlerBaseResultItem = {
  name: string
  info?: TCommitInfo
}

export type TRepoCrawlerResultItem = TRepoCrawlerBaseResultItem & {
  files?: TFile[]
}

export type TRepoCrawlerReportResultItem = TRepoCrawlerBaseResultItem & {
  package?: PackageJson
  packageLock?: PackageLock
  shrinkLock?: Record<string, any>,
  yarnLock?: string
}

export type TOctokitOpts = OctokitOptions

export type TGerritkitOpts = {
  auth: {
    username: string
    password: string
  }
  baseUrl: string
}

export type TRepo = {
  org: string
  repo: string
}

export type TCommonCrawler = {
  getRepoFiles: (
    repo: TRepo,
    paths: string[]
  ) => Promise<TFile[]>
  getInfoByRepos: (
    repos: TRepo[],
    paths: string[],
  ) => Promise<Array<TRepoCrawlerResultItem>>
  getReportInfoByRepos: (
    repos: TRepo[],
  ) => Promise<Array<TRepoCrawlerReportResultItem>>
}

export type TBaseCrawler = {
  getCommit: (
    owner: string,
    repo: string,
    ref: string,
  ) => Promise<TCommitInfo>
  getRawContent: (
    owner: string,
    repo: string,
    path: string,
    ref?: string,
  ) => Promise<string>
  fetchRepoInfo: (opts: { out: string, paths?: string[], orgs?: Array<string>}) => Promise<PromiseSettledResult<void>[]>
}

export type TRepoCrawler = TCommonCrawler & TBaseCrawler

export type TCrawlerOpts = {
  ratelimit: IComplexDelay
  debug: boolean
  name?: string
}
