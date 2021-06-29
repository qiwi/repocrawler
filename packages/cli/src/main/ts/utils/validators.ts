import { check } from 'blork'
import { TVcs } from '@qiwi/repocrawler-common'
import {
  TCrawlerBaseOpts,
  TCrawlerCliConfig,
  TCrawlerCliOpts,
  TCrawlerCliOptsWithConfig,
  TCrawlerOptionalArgs
} from '../interfaces'

export const authCheckers: { [vcs in TVcs]: (auth: any) => void } = {
  gerrit: auth => {
    check(auth.password, `'gerrit.password': str`)
    check(auth.username, `'gerrit.username': str`)
  },
  github: auth => {
    check(auth, `'github.auth': str`)
  }
}

export const validateCrawlerOptionalArgs = (args: TCrawlerOptionalArgs) => {
  check(args.org, 'org: str[]?')
  check(args.out, 'out: str?')
  check(args.period, 'period: num?')
  check(args.count, 'count: num?')
  check(args.debug, 'debug: bool?')
}

export const validateCrawlerOpts = (value: TCrawlerBaseOpts) => {
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

export const validateCrawlerCliArgs = (args: TCrawlerCliOpts) => {
  if (areOptsWithConfig(args)) {
    check(args.config, '--config: str')
    validateCrawlerOptionalArgs(args)
    return args
  }
  validateCrawlerOpts(args)
  validateCrawlerOptionalArgs(args)
  return args
}
