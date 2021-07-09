import { TGerritkitOpts, TVcs } from '@qiwi/repocrawler-common'
import { EDependencyType, TDepsSource, TReportSortOptions } from '@qiwi/repocrawler-reporters'

export enum EReportType {
  USAGE = 'usage',
  TREE = 'tree',
  VERSIONS = 'versions',
}

export type TReporterCliArgs = {
  package: string
  deps?: EDependencyType
  cwd?: string
  range?: string
  report: EReportType
  sort?: TReportSortOptions
  source: TDepsSource
}

export type TCrawlerBaseOpts = {
  vcs: TVcs
  auth: any
  url: string
}

export type TGithubCrawlerOpts = TCrawlerBaseOpts & {
  vcs: 'github'
  auth: string
}

export type TGerritCrawlerOpts = TCrawlerBaseOpts & {
  vcs: 'gerrit'
  auth: TGerritkitOpts['auth']
}

export type TCrawlerOptionalArgs = {
  limitPeriod?: number
  limitCount?: number
  poolSize?: number
  debug?: boolean
  out?: string
  org?: string[]
  path?: string[]
}

export type TCrawlerOptionalArgsWithConfig = TCrawlerOptionalArgs & {
  config: string
}

export type TCrawlerCliOptsWithoutConfig = TCrawlerBaseOpts & TCrawlerOptionalArgs

export type TCrawlerCliOptsWithConfig = TCrawlerOptionalArgsWithConfig |
  TCrawlerOptionalArgsWithConfig & TCrawlerBaseOpts

export type TCrawlerCliOpts = TCrawlerCliOptsWithConfig | TCrawlerCliOptsWithoutConfig

export type TCrawlerOpts = TGithubCrawlerOpts | TGerritCrawlerOpts

export type TCrawlerCliConfig = TCrawlerOptionalArgs & {
  crawlers: TCrawlerOpts[]
}
