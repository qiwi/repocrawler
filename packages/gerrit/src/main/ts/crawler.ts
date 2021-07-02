import { GerritKit } from '@gerritkit/rest'
import {
  commonCrawlerMethodsFactory,
  rateLimitWrapper,
  TCommitInfo,
  TCrawlerOpts,
  TGerritkitOpts,
  TRepoCrawler,
  TRepoCrawlerBaseResultItem,
  writeRepoInfo
} from '@qiwi/repocrawler-common'
import { ILogger } from '@qiwi/substrate'

const splitRepoName = (data: string[]) =>
  data.map((data) => {
    const [org, repo] = data.split('/')
    return { org, repo }
  })

type TGerritCrawler = {
  getRepos: (orgs?: string[]) => Promise<Array<{ org: string; repo: string }>>
  gerritkit: InstanceType<typeof GerritKit>
}

export const createGerritCrawler = (
  { baseUrl, auth }: TGerritkitOpts,
  crawlerOpts: TCrawlerOpts,
  logger: ILogger = console,
): TRepoCrawler & TGerritCrawler => {
  const gerritkit = rateLimitWrapper(new GerritKit(baseUrl, auth), crawlerOpts.ratelimit)
  const name = crawlerOpts.name || 'gerrit'

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
  ): Promise<TCommitInfo> => {
    return gerritkit.repos
      .getCommit({ owner: org, repo, ref })
      .then((data) => ({
          vcs: 'gerrit',
          lastCommit: {
            hash: data.commit,
            message: data.message,
            author: data.author,
            committer: data.committer,
          },
      }))
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
        path: path.replace(/\//g, '%2F'),
        ref,
      })
      .then((d: any) => Buffer.from(d, 'base64').toString('utf-8'))
  }

  const { getRepoFiles, getInfoByRepos, getReportInfoByRepos } = commonCrawlerMethodsFactory(
    { getCommit, getRawContent },
    { name, debug: showLog },
    logger
  )

  const fetchRepoInfo: TRepoCrawler['fetchRepoInfo'] = async ({ out, paths, orgs }) => {
    const repos = await getRepos()
    const reposToFetch = orgs
      ? repos.filter(({ org }: { org: string }) => orgs.includes(org))
      : repos
    const repoInfo = paths
      ? await getInfoByRepos(reposToFetch, paths)
      : await getReportInfoByRepos(reposToFetch)

    return Promise.allSettled(
      repoInfo.map((data: TRepoCrawlerBaseResultItem) => writeRepoInfo(data, out))
    )
  }

  return {
    getRawContent,
    getRepoFiles,
    getRepos,
    getInfoByRepos,
    fetchRepoInfo,
    getCommit,
    gerritkit,
    getReportInfoByRepos
  }
}
