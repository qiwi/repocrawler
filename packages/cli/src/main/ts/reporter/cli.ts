#!/usr/bin/env node

import meow from 'meow'

import { EReportType } from '../interfaces'
import { getResultsDir } from '../utils'
import { makeReport } from './executor'

const cli = meow(
  `
    Usage:
      reporter --package ^typescript$ --deps dev --report tree --source package > report.json
      or
      reporter --package ^@types/ --range ">2.0.0" --deps all --report usage --source lock > report.json
    Options
      --cwd, path to crawler's results, default to node_modules/.cache/@qiwi-private%2Fjslab-repocrawler
      --package, package name pattern
      --deps, one of [all, dev, peer, optional, default]
      --report, one of [usage, tree]
      --range, semver range, required if report === usage
      --chart, number of elements to be showed, only for treeReport 
      --sort.field, one of [name, ratio, usageCount, minVersion, maxVersion, version, project, package, commitDate]
      --sort.order, one of [asc, desc], default to asc
      --source, one of [auto, package, lock]
`,
  {
    importMeta: import.meta,
    flags: {
      cwd: {
        type: 'string',
        default: getResultsDir(),
      },
      package: {
        type: 'string',
        isRequired: true,
      },
      report: {
        type: 'string',
        isRequired: true,
      },
      deps: {
        type: 'string',
        isRequired: (flags) => flags.source === 'package',
      },
      range: {
        type: 'string',
        isRequired: (flags) => flags.report === EReportType.USAGE,
      },
      chart: {
        type: 'number',
      },
      sort: {
        type: 'string',
        isMultiple: true,
      },
      source: {
        type: 'string',
        isRequired: true,
      },
    },
  },
)

makeReport(cli.flags as any)
  .then(() => process.exit(0))
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
