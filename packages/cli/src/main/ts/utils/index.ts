import { TCrawlerOpts, TRepoCrawler } from '@qiwi/repocrawler-common'
import { createGerritCrawler } from '@qiwi/repocrawler-gerrit'
import { createGithubCrawler } from '@qiwi/repocrawler-github'
import { ILogger, LogLevel } from '@qiwi/substrate'
import * as console from 'console'
import findCacheDir from 'find-cache-dir'
import fse from 'fs-extra'
import { Agent } from 'https'

import { TCrawlerBaseOpts } from '../interfaces'

export const getResultsDir = (out?: string): string => {
  const path = out ||
    findCacheDir({ name: '@qiwi%2Frepocrawler-cli' }) ||
    `crawler-results-${Date.now()}`
  fse.ensureDirSync(path)
  fse.emptyDirSync(path)
  return path
}

export const getLogger = (prefix: string, logger: ILogger = console): ILogger => {
  return Object.values(LogLevel).reduce((acc, cur) => {
    acc[cur] = (...args: any[]) => logger[cur](`${prefix} ${args.join(' ')}`)
    return acc
  }, {} as ILogger)
}

export const createCrawler = (
  { vcs, url, auth }: TCrawlerBaseOpts,
  opts: TCrawlerOpts
): TRepoCrawler => {
  const logger = opts.name ? getLogger(opts.name + ':') : undefined
  if (vcs === 'github') {
    return createGithubCrawler(
      {
        baseUrl: url,
        auth,
        request: {
          agent: new Agent({
            rejectUnauthorized: false,
          }),
        },
      },
      opts,
      logger,
    )
  }
  if (vcs === 'gerrit') {
    return createGerritCrawler({ baseUrl: url, auth }, opts, logger)
  }
  throw new Error(`Unsupported vcs, ${vcs}, should be 'gerrit' or 'github'`)
}
