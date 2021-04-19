import { ILogger } from '@qiwi/substrate'
import { gt, lt } from 'semver'

import { TReportSortOptions } from './interfaces'
import { normalizeVersion } from './utils'

export type TComparator = (a: any, b: any) => number

export const numberComparator = (a: number, b: number): number => a - b

export const dateComparator = (a: string, b: string): number =>
  Date.parse(a) - Date.parse(b)

const asSortResult = (gt?: boolean, lt?: boolean): number =>
  (gt && 1) || (lt && -1) || 0

export const stringComparator = (a: string, b: string): number =>
  asSortResult(a > b, a < b)

export const versionComparatorFactory = (logger: ILogger = console) => (a: string, b: string): number => {
  try {
    const na = normalizeVersion(a)
    const nb = normalizeVersion(b)
    return asSortResult(gt(na, nb), lt(na, nb))
  } catch (e) {
    logger.warn(e)
  }
  return 0
}

export const invertComparator = (comparator: TComparator): TComparator => (
  a,
  b,
) => comparator(a, b) * -1

export const getComparator = (
  field: TReportSortOptions['field'],
  logger: ILogger = console
): TComparator => {
  switch (field) {
    case 'name':
    case 'package':
    case 'project':
      return stringComparator
    case 'ratio':
    case 'usageCount':
      return numberComparator
    case 'maxVersion':
    case 'minVersion':
    case 'version':
      return versionComparatorFactory(logger)
    case 'commitDate':
      return dateComparator
  }
}

export const reportComparatorFactory = ({
  order,
  field,
}: TReportSortOptions): TComparator => {
  const desc = order === 'desc'
  const comparator = getComparator(field)
  return desc ? invertComparator(comparator) : comparator
}
