import { Octokit } from '@octokit/rest'
import {
  commonCrawlerMethodsFactory,
  rateLimitWrapper,
  TCrawlerOpts,
  TOctokitOpts,
  TRepoCrawler,
  writeRepoInfo,
} from '@qiwi/repocrawler-common'
import { ILogger } from '@qiwi/substrate'

type TGithubCrawler = {
  getOrgList: () => Promise<Array<string>>
  getReposByOrgs: (
    orgs: string[],
  ) => Promise<Array<{ org: string; repo: string }>>
  octokit: InstanceType<typeof Octokit>
}

export const createGithubCrawler = (
  opts: TOctokitOpts,
  crawlerOpts: TCrawlerOpts,
  logger: ILogger = console,
): TRepoCrawler & TGithubCrawler => {
  const name = crawlerOpts.name || 'github'
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

  const getCommit: TRepoCrawler['getCommit'] = async (owner, repo, ref) => {
      const repoCommit = await octokit.repos
        .getCommit({ owner, repo, ref })
        .then(d => d.data)

      const commit = repoCommit.sha
        ? await octokit.git
          .getCommit({
            owner,
            repo,
            commit_sha: repoCommit.sha,
          })
          .then(d => d.data)
        : repoCommit

      return {
        vcs: 'github',
        lastCommit: {
          hash: commit.sha,
          message: (commit as any).message || repoCommit.commit.message,
          author: commit.author,
          committer: commit.committer,
        },
      }
  }

  const getRawContent = async (owner: string, repo: string, path: string) => {
    return octokit.repos
      .getContent({ owner, repo, path })
      .then((res: any) => {
          return Buffer.from(res.data.content, 'base64').toString('utf-8')
        }
      )
  }

  const { getInfoByRepos, getRepoFiles, getReportInfoByRepos } = commonCrawlerMethodsFactory(
    { getCommit, getRawContent },
    ({ name, debug: showLog }),
    logger
  )

  const fetchRepoInfo: TRepoCrawler['fetchRepoInfo'] = async (savePath, paths, orgs) => {
    const _orgs = orgs || (await getOrgList())
    const repos = await getReposByOrgs(_orgs)
    const repoInfo = await getInfoByRepos(repos, paths)

    return Promise.allSettled(repoInfo.map(data => writeRepoInfo(data, savePath)))
  }

  return {
    getRawContent,
    getRepoFiles,
    getOrgList,
    getReposByOrgs,
    getInfoByRepos,
    getReportInfoByRepos,
    fetchRepoInfo,
    getCommit,
    octokit,
  }
}
