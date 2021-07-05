import { TVcs } from '@qiwi/repocrawler-common'
import { EDependencyType } from '@qiwi/repocrawler-reporters'
import { check } from 'blork'

import {
  EReportType,
  TCrawlerBaseOpts,
  TCrawlerCliConfig,
  TCrawlerCliOpts,
  TCrawlerCliOptsWithConfig,
  TCrawlerOptionalArgs,
  TReporterCliArgs
} from '../interfaces'
import { areOptsWithCrawler } from './config'

export const authCheckers: { [vcs in TVcs]: (auth: any) => void } = {
  gerrit: auth => {
    check(auth.password, `'gerrit.password': str`)
    check(auth.username, `'gerrit.username': str`)
  },
  github: auth => {
    check(auth, `'github.auth': str`)
  }
}

export const validateCrawlerOptionalArgs = (args: TCrawlerOptionalArgs): void => {
  check(args.org, 'org: str[]?')
  check(args.out, 'out: str?')
  check(args.limitPeriod, 'limitPeriod: num?')
  check(args.limitCount, 'limitCount: num?')
  check(args.debug, 'debug: bool?')
  check(args.path, 'path: str[]?')
}

export const validateCrawlerOpts = (value: TCrawlerBaseOpts): void => {
  check(value.vcs, `vcs: 'gerrit' | 'github'`)
  check(value.url, `url: str`)
  authCheckers[value.vcs](value.auth)
}

export const validateCrawlerCliConfig = (
  config: TCrawlerCliConfig
): TCrawlerCliConfig => {
  validateCrawlerOptionalArgs(config)
  check(config.crawlers, 'crawlers: arr')

  config.crawlers.forEach(validateCrawlerOpts)

  return config
}

export const areOptsWithConfig = (args: TCrawlerCliOpts): args is TCrawlerCliOptsWithConfig => {
  return !!(args as any).config
}

export const validateCrawlerCliArgs = (args: TCrawlerCliOpts): TCrawlerCliOpts => {
  if (areOptsWithConfig(args)) {
    check(args.config, '--config: str')
    validateCrawlerOptionalArgs(args)
    if (areOptsWithCrawler(args)) {
      validateCrawlerOpts(args)
    }
    return args
  }
  validateCrawlerOpts(args)
  validateCrawlerOptionalArgs(args)
  return args
}

const getBlorkUnionFromEnum = (e: Record<string, any>): string =>
  Object.values(e).map(item => `'${item}'`).join(' | ')

export const validateReporterCliArgs = (args: TReporterCliArgs): TReporterCliArgs => {
  check(args.source, `source: 'package' | 'auto' | 'lock'`)
  check(args.report, `report: ${getBlorkUnionFromEnum(EReportType)}`)
  check(args.package, `package: str`)
  check(args.deps, `deps: ${getBlorkUnionFromEnum(EDependencyType)}`)
  check(args.cwd, `cwd: str?`)

  if (args.report === EReportType.USAGE || args.report === EReportType.VERSIONS) {
    check(args.range, `range: str`)
  }

  if (args.sort) {
    check(args.sort.order, `sort.order: 'asc' | 'desc' | undefined`)
    check(
      args.sort.field,
      `sort.field: 'project' | 'package' | 'commitDate' | 'name' | 'ratio' | 'usageCount' | 'minVersion' | 'maxVersion' | 'version'`
    )
  }

  return args
}
