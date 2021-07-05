import { EDependencyType } from '@qiwi/repocrawler-reporters'
import { join } from 'path'

import { EReportType, TReporterCliArgs } from '../../../main/ts/interfaces'
import { makeReport } from '../../../main/ts/reporter/executor'

afterEach(() => jest.clearAllMocks())

const cwd = join(__dirname, '..', '..', 'resources', 'package-jsons')

describe('makeReport', () => {
  it('calls usage report maker and prints report', async () => {
    const args: TReporterCliArgs = {
      report: EReportType.USAGE,
      range: 'foo',
      package: 'bar',
      deps: EDependencyType.ALL,
      source: 'auto',
      cwd,
    }
    jest.spyOn(console, 'log').mockImplementation((data) => {
      expect(data).toMatchSnapshot()
    })
    await makeReport(args)
  })

  it('calls tree report maker and prints report', async () => {
    const args: TReporterCliArgs = {
      report: EReportType.TREE,
      package: 'bar',
      deps: EDependencyType.ALL,
      source: 'auto',
      cwd,
    }
    jest.spyOn(console, 'log').mockImplementation((data) => {
      expect(data).toMatchSnapshot()
    })
    await makeReport(args)
  })

  it('sorts report data', async () => {
    const args = {
      report: EReportType.TREE,
      package: '^@types/jest',
      deps: EDependencyType.ALL,
      cwd,
      source: 'package',
      sort: {
        field: 'usageCount',
        order: 'asc',
      },
    }
    jest.spyOn(console, 'log').mockImplementation((data) => {
      expect(data).toMatchSnapshot()
    })

    await makeReport(args as TReporterCliArgs)
  })
})
