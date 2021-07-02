import { TRepoCrawlerReportResultItem } from '@qiwi/repocrawler-common'

export interface ITreeReportItem {
  name: string
  minVersion: string
  maxVersion: string
  usageCount: number
  ratio: number
  repos: Array<{ vcs: string; repo: string } | undefined>
}

export type TDepsSource = 'auto' | 'package' | 'lock'

export enum EDependencyType {
  OPTIONAL = 'optional',
  PEER = 'peer',
  DEV = 'dev',
  DEFAULT = 'default',
  ALL = 'all',
}

export interface IReport {
  packageNamePattern: string
  source: TDepsSource
  depType?: EDependencyType
  data: Array<any>
}

export interface ICommitInfo
  extends Partial<Pick<
    Required<TRepoCrawlerReportResultItem>['info']['lastCommit'],
    'hash' | 'message'
  >> {
  date: string
}

export interface ITreeReport extends IReport {
  totalProjectsCount: number
  data: ITreeReportItem[]
}

export interface IUsageReportItem {
  project?: string
  package: string
  versions: string[]
  commitInfo: ICommitInfo
}

export interface IUsageReport extends IReport {
  versionRange: string
  data: Array<IUsageReportItem>
}

export interface IVersionsReport extends IReport {
  versionRange: string
  data: string[]
}

export type TTreeReportSortFields =
  | 'name'
  | 'ratio'
  | 'usageCount'
  | 'minVersion'
  | 'maxVersion'
export type TUsageReportSortFields = 'project' | 'package' | 'commitDate'
export type TReportSortOrder = 'asc' | 'desc'

export type TReportSortOptions = {
  order: TReportSortOrder
  field: TUsageReportSortFields | TTreeReportSortFields | 'version'
}

export type TFoldedDependency = {
  name: string
  versions: string[]
  repo?: { vcs: string; repo: string }
}

export type TDependency = {
  name: string
  version: string
}
