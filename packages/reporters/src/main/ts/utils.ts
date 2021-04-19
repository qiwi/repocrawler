import { TRepoCrawlerResultItem } from '@qiwi/repocrawler-common'
import { ILogger } from '@qiwi/substrate'
import { readFile } from 'fs'
import glob from 'glob'
import semver from 'semver/preload'
import { promisify } from 'util'

import { ICommitInfo } from './interfaces'

const globAsync = promisify(glob)
const readFileAsync = promisify<string, string | Buffer>(readFile)

export const getFilesContent = async (
  filenamePattern: string,
): Promise<Array<{ path: string, body: string }>> => {
  const paths = await globAsync(filenamePattern)
  return Promise.all(paths.map((path) => readFileAsync(path).then(data => ({
    path,
    body: data.toString()
  }))))
}

export const isVersionInRange = (version: string, range: string): boolean => {
  if (range === '*') {
    return true
  }

  if (version.startsWith('^')) {
    return semver.subset(version, range)
  }

  return semver.satisfies(version, range)
}

export const normalizeVersion = (version: string): string => {
  try {
    return semver.minVersion(version)?.version || version
  } catch {
    return version
  }
}

export const getRepoName = (
  item: TRepoCrawlerResultItem,
): { vcs: string; repo: string } | undefined =>
  item.info && {
    vcs: item.info.vcs,
    repo: item.name,
  }

export const getCommitInfo = (
  info: TRepoCrawlerResultItem['info'],
): ICommitInfo => ({
  hash: info?.lastCommit?.hash,
  message: info?.lastCommit?.message,
  date: info?.lastCommit?.committer?.date,
})

export const formatOutput = (data: unknown): string => JSON.stringify(data, undefined, '\t')

// TODO: add invalid versions handling
export const findMinMaxVersions = (
  versions: string[],
  logger: ILogger = console
): {minVersion: string, maxVersion: string } => {
  return versions.reduce(
    (acc, cur) => {
      try {
        if (semver.lt(cur, acc.minVersion)) {
          acc.minVersion = cur
        }
        if (semver.gt(cur, acc.maxVersion)) {
          acc.maxVersion = cur
        }
      } catch (e) {
        logger.warn(e.message)
      }
      return acc
    },
    {
      minVersion: versions[0],
      maxVersion: versions[0],
    },
  )
}
