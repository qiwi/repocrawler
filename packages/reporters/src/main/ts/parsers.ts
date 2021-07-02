import { PackageJson } from '@qiwi/npm-types'
import { TRepoCrawlerReportResultItem } from '@qiwi/repocrawler-common'
import { ILogger } from '@qiwi/substrate'
import { parse } from '@yarnpkg/lockfile'

import {
  EDependencyType,
  TDependency,
  TDepsSource,
  TFoldedDependency,
} from './interfaces'
import { getRepoName, normalizeVersion } from './utils'

const dependencyTypeMap: {
  [key: string]: keyof Pick<PackageJson, 'dependencies' | 'devDependencies' | 'peerDependencies' | 'optionalDependencies'>
} = {
  [EDependencyType.DEFAULT]: 'dependencies',
  [EDependencyType.DEV]: 'devDependencies',
  [EDependencyType.PEER]: 'peerDependencies',
  [EDependencyType.OPTIONAL]: 'optionalDependencies',
}

export const dependencyRecordsToArray = (
  // eslint-disable-next-line default-param-last
  deps: Record<string, string> = {},
  crawlerResult: TRepoCrawlerReportResultItem,
): TFoldedDependency[] =>
  foldDependencies(
    Object.keys(deps).map((name) => ({
      name,
      version: deps[name],
    })),
    crawlerResult,
  )

export const getDependencies = (
  crawlerResult: TRepoCrawlerReportResultItem,
  depType: EDependencyType,
): TFoldedDependency[] | undefined => {
  const packageJson = crawlerResult.package
  if (!packageJson) {
    return
  }

  return depType === EDependencyType.ALL
    ? [
        ...dependencyRecordsToArray(
          packageJson[dependencyTypeMap[EDependencyType.DEFAULT] as keyof PackageJson['dependencies']],
          crawlerResult,
        ),
        ...dependencyRecordsToArray(
          packageJson[dependencyTypeMap[EDependencyType.DEV] as keyof PackageJson['devDependencies']],
          crawlerResult,
        ),
        ...dependencyRecordsToArray(
          packageJson[dependencyTypeMap[EDependencyType.PEER] as keyof PackageJson['peerDependencies']],
          crawlerResult,
        ),
        ...dependencyRecordsToArray(
          packageJson[dependencyTypeMap[EDependencyType.OPTIONAL] as keyof PackageJson['optionalDependencies']],
          crawlerResult,
        ),
      ]
    : dependencyRecordsToArray(
        packageJson[dependencyTypeMap[depType]],
        crawlerResult,
      ) || []
}

export const getYarnLockDependencies = (yarnLock?: string, logger: ILogger = console): any => {
  try {
    if (yarnLock) {
      return parse(yarnLock).object
    }
  } catch (e) {
    logger.warn(e)
  }
}

export const getDepsBySource = (
  crawlerResult: TRepoCrawlerReportResultItem,
  source: TDepsSource,
  depType?: EDependencyType,
  logger: ILogger = console,
): TFoldedDependency[] | undefined => {
  const { shrinkLock, yarnLock, packageLock } = crawlerResult
  switch (source) {
    case 'package':
      return getDependencies(crawlerResult, depType || EDependencyType.ALL)
    case 'auto':
      return (
        lockEntriesToDependencyArray(crawlerResult, shrinkLock?.dependencies) ||
        lockEntriesToDependencyArray(
          crawlerResult,
          getYarnLockDependencies(yarnLock, logger),
        ) ||
        lockEntriesToDependencyArray(
          crawlerResult,
          packageLock?.dependencies,
        ) ||
        getDependencies(crawlerResult, EDependencyType.ALL)
      )
    case 'lock':
      return (
        lockEntriesToDependencyArray(crawlerResult, shrinkLock?.dependencies) ||
        lockEntriesToDependencyArray(
          crawlerResult,
          getYarnLockDependencies(yarnLock),
        ) ||
        lockEntriesToDependencyArray(crawlerResult, packageLock?.dependencies)
      )
  }
}

const foldDependencies = (
  deps: TDependency[],
  crawlerResultItem: TRepoCrawlerReportResultItem,
) =>
  deps.reduce<TFoldedDependency[]>((acc, { name, version }) => {
    const dep = acc.find((item) => item.name === name)
    if (dep) {
      dep.versions.includes(version) || dep.versions.push(version)
    } else {
      acc.push({
        name,
        versions: [normalizeVersion(version)],
        repo: getRepoName(crawlerResultItem),
      })
    }
    return acc
  }, [])

export const lockEntriesToDependencyArray = (
  crawlerResult: TRepoCrawlerReportResultItem,
  entries?: Record<string, { version: string }>,
): TFoldedDependency[] | undefined => {
  if (!entries) {
    return
  }
  return foldDependencies(
    Object.keys(entries).map((name) => ({
      name: normalizeLockEntryName(name),
      version: entries[name].version,
    })),
    crawlerResult,
  )
}

export const normalizeLockEntryName = (name: string): string =>
  name.replace( /@[\d*.^x~-]+$/, '')
