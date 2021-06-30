import { TCrawlerOpts, TRepoCrawler } from '@qiwi/repocrawler-common'
import { createGerritCrawler } from '@qiwi/repocrawler-gerrit'
import { createGithubCrawler } from '@qiwi/repocrawler-github'
import findCacheDir from 'find-cache-dir'
import { emptyDirSync,ensureDirSync } from 'fs-extra'
import { Agent } from 'https'

import { TCrawlerBaseOpts } from '../interfaces'

export const getResultsDir = (out?: string): string => {
  const path = out ||
    findCacheDir({ name: '@qiwi%2Frepocrawler-cli' }) ||
    `crawler-results-${Date.now()}`
  ensureDirSync(path)
  emptyDirSync(path)
  return path
}

export const createCrawler = (
  { vcs, url, auth }: TCrawlerBaseOpts,
  opts: TCrawlerOpts
): TRepoCrawler => {
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
      opts)
  }
  if (vcs === 'gerrit') {
    return createGerritCrawler({ baseUrl: url, auth }, opts)
  }
  throw new Error(`Unsupported vcs, ${vcs}, should be 'gerrit' or 'github'`)
}
