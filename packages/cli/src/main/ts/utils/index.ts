import { TCrawlerOpts, TRepoCrawler } from '@qiwi/repocrawler-common'
import { createGerritCrawler } from '@qiwi/repocrawler-gerrit'
import { createGithubCrawler } from '@qiwi/repocrawler-github'
import findCacheDir from 'find-cache-dir'
import { existsSync } from 'fs'
import { Agent } from 'https'
import rimraf from 'rimraf'

import { TCrawlerBaseOpts } from '../interfaces'

export const getTempDir = (): string =>
  findCacheDir({ name: '@qiwi%2Frepocrawler-cli' }) ||
  '.cache/@qiwi%2Frepocrawler-cli'

export const getNonExistingTempDir = (): string => {
  const path = getTempDir()
  if (existsSync(path)) {
    rimraf.sync(path)
  }
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
