#!/usr/bin/env node

import meow from 'meow'

import { EReportType } from '../interfaces'
import { getTempDir } from '../utils'
import { makeReport } from './executor'

const cli = meow(
  `
    Usage:
      reporter --package=^typescript$ --depType=dev --reportType=tree --source=package > report.json
      or
      reporter --package=^@types/ --versionRange=">2.0.0" --depType=all --reportType=usage --source=lock > report.json
    Options
      --cwd, path to crawler's results, default to node_modules/.cache/@qiwi-private%2Fjslab-repocrawler
      --package, package name pattern
      --dep-type, one of [all, dev, peer, optional, default]
      --report, one of [usage, tree]
      --range, semver range, required if reportType === usage
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
        default: getTempDir(),
      },
      package: {
        type: 'string',
        isRequired: true,
      },
      reportType: {
        type: 'string',
        isRequired: true,
      },
      depType: {
        type: 'string',
        isRequired: (flags) => flags.source === 'package',
      },
      versionRange: {
        type: 'string',
        isRequired: (flags) => flags.reportType === EReportType.USAGE,
      },
      showChart: {
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
