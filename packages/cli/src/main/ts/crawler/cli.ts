#!/usr/bin/env node

import meow from 'meow'

import { defaultCrawlerOpts } from '../default'
import { launchCrawler } from './executor'
import { getNonExistingTempDir } from '../utils'

const cli = meow(
  `
    Usage:
      repocrawler --vcs github --auth 1234567890123456789012345678901234567890 --url https://github.org.com/api/v3 --out temp --org jslab 
      repocrawler --vcs gerrit --auth.username username --auth.password password --url https://gerrit.org.com/api --out temp --org jslab --org common
    Options
      --config, path to config
      or you can define crawler opts via flags:
      --url, VCS API url
      --vcs, type of VCS, 'github' or 'gerrit'
      --auth, Github API token (if vcs is 'github')
      --auth.password, Gerrit credentials (if vcs is 'gerrit')
      --auth.username, Gerrit credentials (if vcs is 'gerrit')
      --org, list of organizations to fetch, defaults to all
      --out, path to save results, defaults to node_modules/.cache/@qiwi%2Frepocrawler-cli
      --count, max count of requests to VCS API per period, defaults to ${defaultCrawlerOpts.ratelimit.count}
      --period, length of period in ms, defaults to ${defaultCrawlerOpts.ratelimit.period}
`,
  {
    importMeta: import.meta,
    flags: {
      config: {
        type: 'string',
        isRequired: flags => !flags.url && !flags.auth && !flags.vcs
      },
      url: {
        type: 'string',
        isRequired: flags => !flags.config
      },
      auth: {
        type: 'string',
        isMultiple: true,
        isRequired: flags => !flags.config,
      },
      vcs: {
        type: 'string',
        isRequired: flags => !flags.config,
      },
      org: {
        type: 'string',
        isRequired: flags => !flags.config,
        isMultiple: true,
      },
      out: {
        type: 'string',
        default: getNonExistingTempDir(),
      },
      period: {
        default: defaultCrawlerOpts.ratelimit.period,
        type: 'number',
      },
      count: {
        default: defaultCrawlerOpts.ratelimit.count,
        type: 'number',
      },
      debug: {
        type: 'boolean',
        default: defaultCrawlerOpts.debug,
      }
    }
  },
)

launchCrawler(cli.flags as any)
