import { ILogger } from '@qiwi/substrate'
import { TRepoCrawler } from '@qiwi/repocrawler-common'
import { TCrawlerCliOpts } from '../interfaces'
import { areOptsWithConfig, validateCrawlerCliArgs } from '../utils/validators'
import { getConfig, mergeCrawlerOpts } from '../utils/config'
import { createCrawler } from '../utils'

export const launchCrawler = async (params: TCrawlerCliOpts, logger: ILogger = console): Promise<void> => {
  const validatedParams = validateCrawlerCliArgs(params)
  const configFromFile = areOptsWithConfig(validatedParams) ? getConfig(validatedParams.config) : undefined
  const config = mergeCrawlerOpts(validatedParams, configFromFile)
  const { out, org, debug, count, period} = config

  const crawlers: TRepoCrawler[] = config.crawlers.map(opts => createCrawler(
    opts,
    { debug, ratelimit: { period, count }}
  ))
  try {
    await Promise.all(crawlers.map(crawler => crawler.fetchRepoInfo(out, org)))
    logger.log(`Crawling has been finished! Results are saved in ${out}`)
  } catch (e) {
    logger.error(e)
  }
}
