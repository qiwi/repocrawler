import { GerritKit } from '@gerritkit/rest'
import { rateLimitWrapper, TCommitInfo, TCrawlerOpts,TGerritkitOpts, TRepoCrawler } from '@qiwi/repocrawler-common'
import { ILogger } from '@qiwi/substrate'
import { mkdir, promises as fs } from 'fs'
import { dirname,resolve } from 'path'

const splitRepoName = (data: string[]) =>
  data.map((data) => {
    const [org, repo] = data.split('/')
    return { org, repo }
  })

type getRepos = {
  getRepos: (orgs?: string[]) => Promise<Array<{ org: string; repo: string }>>
}

export const createGerritCrawler = (
  { baseUrl, auth }: TGerritkitOpts,
  crawlerOpts: TCrawlerOpts,
  logger: ILogger = console,
): TRepoCrawler & getRepos => {
  const gerritkit = rateLimitWrapper(new GerritKit(baseUrl, auth), crawlerOpts.ratelimit)

  const showLog = crawlerOpts.debug

  const getRepos = async (orgs?: string[]) => {
    if (orgs && orgs.length > 0) {
      return Promise.all(
        orgs.map((org) =>
          gerritkit.repos.listForOrg({ org }).then(splitRepoName),
        ),
      ).then((data) => data.flat())
    }

    return gerritkit.repos.listForOrg().then(splitRepoName)
  }

  const getCommit = async (
    org: string,
    repo: string,
    ref: string,
  ): Promise<TCommitInfo | undefined> => {
    return gerritkit.repos
      .getCommit({ owner: org, repo, ref })
      .then(
        // @ts-ignore
        (data) =>
          ({
            vcs: 'gerrit',
            lastCommit: {
              hash: data.commit,
              message: data.message,
              author: data.author,
              committer: data.committer,
            },
          } as TCommitInfo),
      )
      .catch((e: Error) => {
        showLog && logger.warn(
          `[Gerrit]: Error during getting HEAD commit for ${org}/${repo}: ${e.message}`,
        )
        return undefined // eslint-disable-line unicorn/no-useless-undefined
      })
  }

  const getRawContent = async (
    org: string,
    repo: string,
    path: string,
    ref?: string,
  ) => {
    return gerritkit.repos
      .getContent({
        owner: org,
        repo,
        path,
        ref,
      })
      .then((d: any) => Buffer.from(d, 'base64').toString('utf-8'))
      .catch((e: Error) => showLog && logger.warn(
        `[Gerrit]: Error during getting ${path} for ${org}/${repo}: ${e.message}`,
      ))
  }

  const getContent = async (
    org: string,
    repo: string,
    path: string,
    ref?: string,
  ) => {
    try {
      const rawContent = await getRawContent(org, repo, path, ref)
      if (rawContent) {
        return JSON.parse(rawContent)
      }
    } catch (e) {
      showLog && logger.warn(`[Github]: Error during parsing ${path} for ${org}/${repo}: ${e.message}`)
    }
  }

  const getInfoByRepos = async (
    repos: Array<{ org: string; repo: string }>,
  ) => {
    return Promise.all(
      repos.map(({ org, repo }) => {
        return Promise.all([
          getCommit(org, repo, 'HEAD'),
          getContent(org, repo, 'package.json'),
          getContent(org, repo, 'package-lock.json'),
          getRawContent(org, repo, 'yarn.lock'),
          getContent(org, repo, 'npm-shrinkwrap.json'),
          getRawContent(org, repo, '.npmrc'),
          getRawContent(org, repo, 'Makefile'),
        ]).then(([commitInfo, data, packageLock, yarnLock, shrinkLock, npmrc, makefile]) => {
          return {
            name: `gerrit%2F${org}%2F${repo}`,
            info: commitInfo,
            package: data,
            packageLock,
            yarnLock,
            shrinkLock,
            npmrc,
            makefile,
          }
        })
      }),
    )
  }

  const fetchRepoInfo = async (savePath: string, orgs?: Array<string>) => {
    const repos = await getRepos()
    const _orgs = orgs
      ? repos.filter(({ org }: { org: string }) => orgs.includes(org))
      : repos
    const repoInfo = await getInfoByRepos(_orgs)

    try {
      await Promise.all(
        repoInfo.map(
          // @ts-ignore
          (data: { name: string; info: Record<string, any>; package: any }) => {
            const resolvedPath = resolve(
              savePath,
              `${data.name}${Math.random().toString()}.json`,
            )
            return new Promise((resolve) => {
              mkdir(dirname(resolvedPath), { recursive: true }, () => {
                fs.writeFile(resolvedPath, JSON.stringify(data)).then(resolve)
              })
            })
          },
        ),
      )
      return true
    } catch (e) {
      return false
    }
  }

  return {
    getRepos,
    // @ts-ignore
    getInfoByRepos,
    fetchRepoInfo,
    getCommit,
    getContent,
    // @ts-ignore
    gerritkit,
  }
}
