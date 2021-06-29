import { readFileSync } from 'fs'
import {
  TCrawlerBaseOpts,
  TCrawlerCliConfig, TCrawlerCliOpts,
  TCrawlerCliOptsWithConfig,
  TCrawlerOptionalArgsWithConfig
} from '../interfaces'
import { getNonExistingTempDir } from './index'
import { defaultCrawlerOpts } from '../default'
import { areOptsWithConfig, validateCrawlerCliConfig } from './validators'

// all these funcs are expected to be called after all validations, so checking presence of crawler in cliOpts by vcs should be enough
export const areOptsWithCrawler = (
  opts: TCrawlerCliOptsWithConfig
): opts is TCrawlerOptionalArgsWithConfig & TCrawlerBaseOpts => !!(opts as any).vcs

export const mergeCrawlerOpts = (
  cliOpts: TCrawlerCliOpts,
  config?: TCrawlerCliConfig
): Required<Omit<TCrawlerCliConfig, 'org'>> & { org?: string[] } => {
  return {
    crawlers: areOptsWithConfig(cliOpts) && areOptsWithCrawler(cliOpts)
      ? [{ vcs: cliOpts.vcs, auth: cliOpts.auth, url: cliOpts.url }]
      : (config?.crawlers || []),
    org: cliOpts.org || config?.org,
    out: cliOpts.out || config?.out || getNonExistingTempDir(),
    period: cliOpts.period || config?.period || defaultCrawlerOpts.ratelimit.period,
    count: cliOpts.count || config?.count || defaultCrawlerOpts.ratelimit.count,
    debug: cliOpts.debug || config?.debug || false,
  }
}

export const getConfig = (path: string): TCrawlerCliConfig => {
  const body = readFileSync(path).toString()
  const parsed = JSON.parse(body)
  return validateCrawlerCliConfig(parsed)
}
