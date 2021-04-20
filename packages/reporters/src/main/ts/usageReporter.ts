import { TRepoCrawlerResultItem } from '@qiwi/repocrawler-common'
import { ILogger } from '@qiwi/substrate'
import { sep } from 'path'

import { EDependencyType, IUsageReport, IUsageReportItem, TDepsSource, } from './interfaces'
import { getDepsBySource } from './parsers'
import { getCommitInfo, getFilesContent, isVersionInRange } from './utils'

export const getUsageReport = async (
  packageNamePattern: string,
  versionRange: string,
  source: TDepsSource,
  depType?: EDependencyType,
  cwd: string = process.cwd(),
  logger: ILogger = console,
): Promise<IUsageReport> => {
  const nameRegExp = new RegExp(packageNamePattern)
  return getFilesContent(`${cwd}${sep}**${sep}*.json`)
    .then(contents => contents.reduce(
      (acc, cur) => {
        try {
          const data = JSON.parse(cur.body) as TRepoCrawlerResultItem
          const deps = getDepsBySource(data, source, depType, logger)
          if (!deps) {
            return acc
          }
          const filteredDeps = deps
            .filter(
              ({ name, versions }) =>
                nameRegExp.test(name) &&
                versions.some((version) =>
                  isVersionInRange(version, versionRange),
                ),
            )
            .map(({ name, versions }) => ({
              project: data.package.name,
              package: name,
              versions,
              commitInfo: getCommitInfo(data.info),
            }))
          return [...acc, ...filteredDeps]
        } catch (e) {
          logger.warn(e)
          return acc
        }
      },
      [] as Array<IUsageReportItem>,
    ))
    .then(data => ({
      packageNamePattern,
      depType,
      source,
      versionRange,
      data,
    }))
}
