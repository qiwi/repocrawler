import {
  formatOutput,
  getTreeReport,
  getUsageReport,
  getVersionsReport,
  reportComparatorFactory
} from '@qiwi/repocrawler-reporters'
import { ILogger } from '@qiwi/substrate'

import { EReportType, TReporterCliArgs } from '../interfaces'
import { validateReporterCliArgs } from '../utils/validators'

export const makeReport = async (
  params: TReporterCliArgs,
  logger: ILogger = console
): Promise<void> => {
  if (Array.isArray(params.sort)) {
    delete params.sort
  }
  const {
    package: packageNamePattern,
    deps,
    cwd,
    report: reportType,
    range,
    sort,
    source,
  } = params

  validateReporterCliArgs(params)

  const report =
    reportType === EReportType.TREE
      ? await getTreeReport(packageNamePattern, source, deps, cwd)
      : await (reportType === EReportType.USAGE ? getUsageReport : getVersionsReport)(
        packageNamePattern,
        range as string,
        source,
        deps,
        cwd,
      )

  if (sort) {
    const { field } = sort
    const comparator = reportComparatorFactory(sort)
    if (field === 'version') {
      report.data.sort((a: any, b: any) => comparator(a, b))
    } else {
      report.data.sort((a: any, b: any) => comparator(a[field], b[field]))
    }
  }
  logger.log(formatOutput(report))
}
