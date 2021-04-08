import { Octokit } from '@octokit/rest'
import {
  rateLimitWrapper,
  TCommitInfo,
  TCrawlerOpts,
  TOctokitOpts,
  TRepoCrawler,
} from '@qiwi/repocrawler-common'
import { ILogger } from '@qiwi/substrate'
import { mkdir, promises as fs } from 'fs'
import { dirname,resolve } from 'path'

type TGetOrgList = {
  getOrgList: () => Promise<Array<string>>
  getReposByOrgs: (
    orgs: string[],
  ) => Promise<Array<{ org: string; repo: string }>>
}

export const createGithubCrawler = (
  opts: TOctokitOpts,
  crawlerOpts: TCrawlerOpts,
  logger: ILogger = console,
): TRepoCrawler & TGetOrgList => {
  const showLog = crawlerOpts.debug
  const octokit = rateLimitWrapper(new Octokit(opts), crawlerOpts.ratelimit)

  const getOrgList = async () => {
    return octokit
      .paginate(octokit.orgs.list)
      .then((d: any[]) => d.map((e) => e.login))
  }

  const getReposByOrgs = async (orgs: string[]) => {
    const repos = await Promise.all(
      orgs.map((org) =>
        octokit
          .paginate(octokit.repos.listForOrg, { org })
          .then((data: any) => ({
            data,
            org,
          }))
          .catch((e: any) => e),
      ),
    )

    return repos
      .filter(({ data }) => data.length > 0)
      .flatMap(({ data, org }) => {
        return data.map((repo: { name: string }) => ({ org, repo: repo.name }))
      })
  }

  const getCommit = async (
    owner: string,
    repo: string,
    ref: string,
  ): Promise<TCommitInfo | undefined> => {
    try {
      const repoCommit = await octokit.repos
        .getCommit({ owner, repo, ref })
        .then((d: { data: any }) => d.data)
        .catch((e: { message: any }) => {
          logger.warn( `[Github]: Error during getting commit for ${owner}/${repo}: ${e.message}`)
          throw e
        })

      const commit = repoCommit.sha
        ? await octokit.git
          .getCommit({
            owner,
            repo,
            commit_sha: repoCommit.sha,
          })
          .then((d: { data: any }) => d.data)
          .catch((e: any) => {
            logger.warn( `[Github]: Error during getting commit for ${owner}/${repo}: ${e.message}`)
            return {
              text: 'dont work',
            } as any
          })
        : repoCommit

      return {
        vcs: 'github',
        lastCommit: {
          hash: commit.sha,
          // @ts-ignore
          message: commit.message || repoCommit.commit.message,
          // @ts-ignore
          author: commit.author,
          // @ts-ignore
          committer: commit.committer,
        },
      }
    } catch (e) {
      showLog && logger.warn(
        `[Github]: Error during getting HEAD commit for ${owner}/${repo}: ${e.message}`,
      )
      return undefined // eslint-disable-line unicorn/no-useless-undefined
    }
  }

  const getRawContent = async (owner: string, repo: string, path: string) => {
    return octokit.repos
      .getContent({ owner, repo, path })
      .then((res: any) => {
          return Buffer.from(res.data.content, 'base64').toString('utf-8')
        }
      )
      .catch((e: Error) => showLog && logger.warn(
        `[Github]: Error during getting ${path} for ${owner}/${repo}: ${e.message}`,
      ))
  }

  const getContent = async (owner: string, repo: string, path: string) => {
    try {
      const rawContent = await getRawContent(owner, repo, path)
      if (rawContent) {
        return JSON.parse(rawContent)
      }
    } catch (e) {
      showLog && logger.warn(`[Github]: Error during parsing ${path} for ${owner}/${repo}: ${e.message}`)
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
            name: `github%2F${org}%2F${repo}`,
            info: commitInfo,
            package: data,
            packageLock,
            yarnLock,
            shrinkLock,
            npmrc,
            makefile
          }
        })
      }),
    )
  }

  const fetchRepoInfo = async (savePath: string, orgs?: Array<string>) => {
    const _orgs = orgs || (await getOrgList())
    const repos = await getReposByOrgs(_orgs)
    const repoInfo = await getInfoByRepos(repos)

    try {
      await Promise.all(
        repoInfo.map(
          // @ts-ignore
          (data: { name: string; info: Record<string, any>; package: any }) => {
            const resolvedPath = resolve(savePath, `${data.name}.json`)
            return new Promise((resolve) => {
              mkdir(dirname(resolvedPath), { recursive: true }, () => {
                fs.writeFile(resolvedPath, JSON.stringify(data)).then(resolve)
                  .catch(console.error)
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
    getOrgList,
    getReposByOrgs,
    // @ts-ignore
    getInfoByRepos,
    fetchRepoInfo,
    getCommit,
    getContent,
    // @ts-ignore
    octokit,
  }
}
