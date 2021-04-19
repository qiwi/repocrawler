import { TRepoCrawlerResultItem } from '@qiwi/repocrawler-common'
import { ILogger } from '@qiwi/substrate'
import { sep } from 'path'

import {
  EDependencyType,
  ITreeReport,
  TDepsSource,
  TFoldedDependency,
} from './interfaces'
import { getDepsBySource } from './parsers'
import { findMinMaxVersions, getFilesContent } from './utils'

type TDepRegistryItem = {
  name: string
  versions: string[]
  repos: Array<{ vcs: string; repo: string } | undefined>
}

const getRatio = (totalCount: number, usageCount: number) =>
  Number.parseFloat((usageCount / totalCount).toFixed(4))

const getDepsRegistry = (
  registry: TDepRegistryItem[],
  { name, versions, repo }: TFoldedDependency,
) => {
  const index = registry.findIndex((item) => item.name === name)

  if (index > -1) {
    registry[index].versions.push(...versions)
    registry[index].repos.push(repo)
    return registry
  }

  registry.push({
    name,
    versions,
    repos: [repo],
  })
  return registry
}

export const getTreeReport = async (
  packageNamePattern: string,
  source: TDepsSource,
  depType?: EDependencyType,
  cwd: string = process.cwd(),
  logger: ILogger = console,
): Promise<ITreeReport> => {
  const nameRegExp = new RegExp(packageNamePattern)
  const { deps, totalProjectsCount } = await getFilesContent(
    `${cwd}${sep}**${sep}*.json`,
  ).then(content => content.reduce(
    (acc, cur) => {
      try {
        const body: TRepoCrawlerResultItem = JSON.parse(cur.body)
        if (body.package) {
          acc.totalProjectsCount += 1
        }
        const deps = getDepsBySource(body, source, depType, logger)
        if (deps) {
          acc.deps.push(...deps.filter((item) => nameRegExp.test(item.name)))
        }
      } catch (e) {
        logger.warn(e, cur)
      }
      return acc
    },
    {
      deps: [] as TFoldedDependency[],
      totalProjectsCount: 0,
    },
  ))

  const data = deps
    .reduce<TDepRegistryItem[]>(getDepsRegistry, [])
    .map(({ name, versions, repos }) => ({
      name,
      usageCount: repos.length,
      ratio: getRatio(totalProjectsCount, repos.length),
      repos,
      ...findMinMaxVersions(versions, logger),
    }))

  return {
    packageNamePattern,
    depType,
    source,
    data,
    totalProjectsCount,
  }
}
