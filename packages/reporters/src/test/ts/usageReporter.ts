import { readFileSync } from 'fs'
import { join } from 'path'

import { EDependencyType, getUsageReport, TDepsSource } from '../../main/ts'
import * as utils from '../../main/ts/utils'

const cwd = join(__dirname, 'resources')

type TReporterTestCase = {
  description: string
  packageNamePattern: string
  depType?: EDependencyType
  source: TDepsSource
  versionRange: string
  count: number
}

const testCases: TReporterTestCase[] = [
  {
    description: 'all deps when patterns are general',
    packageNamePattern: '.+',
    depType: EDependencyType.ALL,
    versionRange: '*',
    count: 152,
    source: 'package',
  },
  {
    description: 'dev deps with prefix @types/',
    packageNamePattern: '@types/',
    depType: EDependencyType.DEV,
    versionRange: '>8.0.0',
    count: 4,
    source: 'package',
  },
  {
    description: 'all peer deps starting with t in given version range',
    packageNamePattern: '^t',
    depType: EDependencyType.PEER,
    versionRange: '>=26.0.0 || <1.0.0',
    count: 4,
    source: 'package',
  },
  {
    description: '@babel/code-frame deps when source=lock',
    packageNamePattern: '^@babel/code-frame$',
    versionRange: '*',
    count: 3,
    source: 'lock',
  },
  {
    description: 'esm deps when source=auto',
    packageNamePattern: '^esm$',
    versionRange: '*',
    count: 3,
    source: 'auto',
  },
  {
    description: 'esm deps when source=auto and versionRange > 3.2.26',
    packageNamePattern: '^esm$',
    versionRange: '>3.2.26',
    count: 1,
    source: 'auto',
  },
  {
    description: 'jest deps when source=auto',
    packageNamePattern: '^jest',
    versionRange: '*',
    count: 1,
    source: 'auto',
  },
]

describe('getUsageReport', () => {
  testCases.forEach((testCase) =>
    it(`returns ${testCase.description}`, async () => {
      const data = await getUsageReport(
        testCase.packageNamePattern,
        testCase.versionRange,
        testCase.source,
        testCase.depType,
        cwd,
      )
      expect(data).toMatchObject({
        packageNamePattern: testCase.packageNamePattern,
        depType: testCase.depType,
        versionRange: testCase.versionRange,
      })
      expect(data.data.length).toEqual(testCase.count)
    }),
  )

  it('logs an error and continues processing', async () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {
      /* noop */
    })
    jest.spyOn<any, any>(utils, 'getFilesContent').mockImplementation(() => Promise.resolve([
      {
        path: 'some/path',
        body: readFileSync(
          join(__dirname, 'resources/fakePackages/package1.json'),
        ).toString(),
      },
      {
        path: 'some/other/path',
        body: 'foo',
      },
    ]))
    const data = await getUsageReport(
      '.+',
      '*',
      'package',
      EDependencyType.DEFAULT,
      cwd,
    )
    expect(data.data.length).toEqual(3)
    expect(warnSpy).toHaveBeenCalled()
  })

  it('uses process.cwd() as default value for cwd', async () => {
    const getFilesContentSpy = jest
      .spyOn<any, any>(utils, 'getFilesContent')
      .mockImplementation(() => Promise.resolve([]))
    await getUsageReport('.+', '*', 'package', EDependencyType.DEFAULT)
    expect(getFilesContentSpy).toHaveBeenCalledWith(
      `${process.cwd()}/**/*.json`,
    )
  })
})
