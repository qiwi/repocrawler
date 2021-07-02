import fse from 'fs-extra'

import { defaultCrawlerOpts } from '../default'
import {
  TCrawlerBaseOpts,
  TCrawlerCliConfig,
  TCrawlerCliOpts,
} from '../interfaces'
import { getResultsDir } from './index'
import { validateCrawlerCliConfig } from './validators'

// all these funcs are expected to be called after all validations, so checking presence of crawler in cliOpts by vcs should be enough
export const areOptsWithCrawler = (
  opts: TCrawlerCliOpts
): opts is TCrawlerCliOpts & TCrawlerBaseOpts => !!(opts as any).vcs

export const resolveCrawlerOpts = (
  cliOpts: TCrawlerCliOpts,
  config?: TCrawlerCliConfig
): Required<Omit<TCrawlerCliConfig, 'org'>> & { org?: string[] } => {
  return {
    crawlers: areOptsWithCrawler(cliOpts)
      ? [{ vcs: cliOpts.vcs, auth: cliOpts.auth, url: cliOpts.url }]
      : (config?.crawlers || []),
    path: cliOpts.path || config?.path || [],
    org: cliOpts.org || config?.org,
    out: getResultsDir(cliOpts.out || config?.out),
    limitPeriod: cliOpts.limitPeriod || config?.limitPeriod || defaultCrawlerOpts.ratelimit.period,
    limitCount: cliOpts.limitCount || config?.limitCount || defaultCrawlerOpts.ratelimit.count,
    debug: cliOpts.debug || config?.debug || false,
  }
}

export const getConfig = (path: string): TCrawlerCliConfig => {
  const body = fse.readJsonSync(path)
  return validateCrawlerCliConfig(body)
}
