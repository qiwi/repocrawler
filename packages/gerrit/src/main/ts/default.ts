import { TCrawlerOpts } from '@qiwi/repocrawler-common'

export const opts: TCrawlerOpts = {
  ratelimit:{
    period: 2000,
    count: 10,
  },
  debug: true,
}
