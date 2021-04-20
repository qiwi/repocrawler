import { ILogger } from '@qiwi/substrate'

import { EDependencyType, IVersionsReport, TDepsSource } from './interfaces'
import { getUsageReport } from './usageReporter'

export const getVersionsReport = async (
  packageNamePattern: string,
  versionRange: string,
  source: TDepsSource,
  depType?: EDependencyType,
  cwd: string = process.cwd(),
  logger: ILogger = console,
): Promise<IVersionsReport> => {
  const pattern =
    packageNamePattern.startsWith('^') && packageNamePattern.endsWith('$')
      ? packageNamePattern
      : `^${packageNamePattern}$`

  const usageReport = await getUsageReport(
    pattern,
    versionRange,
    source,
    depType,
    cwd,
    logger,
  )
  const uniqueVersions = [
    ...new Set(
      usageReport.data.reduce<string[]>(
        (acc, cur) => [...acc, ...cur.versions],
        [],
      ),
    ),
  ]
  return {
    ...usageReport,
    data: uniqueVersions,
  }
}
