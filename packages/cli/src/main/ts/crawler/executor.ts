import { TRepoCrawler } from '@qiwi/repocrawler-common'
import { ILogger } from '@qiwi/substrate'

import { TCrawlerCliOpts } from '../interfaces'
import { createCrawler } from '../utils'
import { getConfig, resolveCrawlerOpts } from '../utils/config'
import { areOptsWithConfig, validateCrawlerCliArgs } from '../utils/validators'

export const launchCrawler = async (params: TCrawlerCliOpts, logger: ILogger = console): Promise<void> => {
  if (params.org?.length === 0) {
    delete params.org // meow returns empty array for undefined multiple flag
  }

  const validatedParams = validateCrawlerCliArgs(params)
  const configFromFile = areOptsWithConfig(validatedParams) ? getConfig(validatedParams.config) : undefined
  const config = resolveCrawlerOpts(validatedParams, configFromFile)
  const { out, org, debug, limitCount, limitPeriod } = config

  const crawlers: TRepoCrawler[] = config.crawlers.map(opts => createCrawler(
    opts,
    { debug, ratelimit: { period: limitPeriod, count: limitCount }}
  ))
  try {
    await Promise.all(crawlers.map(crawler => crawler.fetchRepoInfo(out, org)))
    logger.log(`Crawling has been finished! Results are saved in ${out}`)
  } catch (e) {
    logger.error(e)
  }
}
