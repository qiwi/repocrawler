import { ILogger } from '@qiwi/substrate'
import { promises as fs } from 'fs'
import { dirname, resolve } from 'path'

import { TBaseCrawler, TCommonCrawler, TFile, TRepoCrawlerResultItem } from '../types'

export const commonCrawlerMethodsFactory = (
  base: Omit<TBaseCrawler, 'fetchRepoInfo'>,
  { name, debug }: {
    name: string,
    debug?: boolean
  },
  logger: ILogger,
): TCommonCrawler => {
  const { getCommit, getRawContent } = base

  const getRepoFiles: TCommonCrawler['getRepoFiles'] = ({ org, repo }, paths) => {
    return Promise.allSettled(paths.map(path => getRawContent(org, repo, path)))
      .then(promises => promises.map((promise, i) => {
        if (promise.status === 'rejected' && debug) {
          logger.error(`Could not get ${paths[i]} for ${org}/${repo}: ${promise.reason}`)
        }
        return {
          path: paths[i],
          body: promise.status === 'fulfilled' ? promise.value : undefined
        }
      }))
  }

  const getInfoByRepos: TCommonCrawler['getInfoByRepos'] = async (repos, paths) => {
    return Promise.all(
      repos.map(({ org, repo }) => {
        return Promise.allSettled([getCommit(org, repo, 'HEAD'), getRepoFiles({ org, repo }, paths)])
          .then(([commitInfoPromise, filePromise]) => {
            if (commitInfoPromise.status === 'rejected' && debug) {
              logger.error(`Could not get HEAD commit for ${org}/${repo}: ${commitInfoPromise.reason}`)
            }
            if (filePromise.status === 'rejected' && debug) {
              logger.error(`Could not get files for ${org}/${repo}: ${filePromise.reason}`)
            }

            return {
              name: `${name}-${org}-${repo}`,
              info: commitInfoPromise.status === 'fulfilled' ? commitInfoPromise.value : undefined,
              files: filePromise.status === 'fulfilled' ? filePromise.value : undefined,
            }
          })
      }),
    )
  }

  const getReportInfoByRepos: TCommonCrawler['getReportInfoByRepos'] = async (repos) => {
    const info = await getInfoByRepos(
      repos,
      ['package.json', 'yarn.lock', 'package-lock.json', 'npm-shrinkwrap.json']
    )

    return info.map(({ name, files, info }) => ({
      name,
      info,
      package: files ? findAndParseJson(files, 'package.json') : undefined,
      packageLock: files ? findAndParseJson(files, 'package-lock.json') : undefined,
      shrinkLock: files ? findAndParseJson(files, 'npm-shrinkwrap.json') : undefined,
      yarnLock: files?.find(file => file.path === 'yarn.lock')?.body,
    }))
  }

  return {
    getRepoFiles,
    getInfoByRepos,
    getReportInfoByRepos,
  }
}

export const findAndParseJson = <T = Record<string, any>>(files: TFile[], path: string): T | undefined  => {
  const file = files.find(file => file.path === path)

  if (!file || !file.body) {
    return
  }

  return JSON.parse(file.body)
}

export const writeRepoInfo = (
  data: TRepoCrawlerResultItem,
  path: string,
): Promise<void> => {
  const resolvedPath = resolve(path, `${data.name}${Math.random().toString()}.json`)
  return new Promise((resolve) => {
    fs.mkdir(dirname(resolvedPath), { recursive: true })
      .then(() => fs.writeFile(resolvedPath, JSON.stringify(data)))
      .then(resolve)
  })
}
