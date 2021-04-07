import { OctokitOptions } from '@octokit/core/dist-types/types'
import { IComplexDelay } from 'push-it-to-the-limit'

export type TCommitInfo = {
  vcs: 'gerrit' | 'github'
  lastCommit: {
    hash: string
    message: string
    author: {
      name: string
      email: string
      date: string
    }
    committer: {
      name: string
      email: string
      date: string
    }
  }
}

export type TRepoCrawlerResultItem = {
  name: string
  package: any
  yarnLock?: string
  packageLock?: Record<string, any>
  shrinkLock?: Record<string, any>
  npmrc?: string
  makefile?: string
  info: TCommitInfo
}

export type TOctokitOpts = OctokitOptions

export type TGerritkitOpts = {
  auth: {
    username: string
    password: string
  }
  baseUrl: string
}

export type TRepoCrawler = {
  getInfoByRepos: (
    orgs: Array<{ org: string; repo: string }>,
  ) => Promise<Array<TRepoCrawlerResultItem>>
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

export type TCrawlerOpts = {
  ratelimit: IComplexDelay
  debug: boolean
}
