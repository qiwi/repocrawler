import { join } from 'path'

import {
  EDependencyType,
  getVersionsReport,
  TDepsSource,
} from '../../main/ts'
import * as utils from '../../main/ts/utils'

const cwd = join(__dirname, 'resources')

type TReporterTestCase = {
  description: string
  packageNamePattern: string
  depType?: EDependencyType
  source: TDepsSource
  versionRange: string
  versions: string[]
  outputPackageNamePattern: string
}

const testCases: TReporterTestCase[] = [
  {
    description: 'jest dependencies when pattern given without ^ and $ symbols',
    packageNamePattern: 'jest',
    depType: EDependencyType.ALL,
    versionRange: '*',
    source: 'package',
    versions: ['26.1.0', '26.4.2'],
    outputPackageNamePattern: '^jest$',
  },
  {
    description: 'jest dependencies when pattern given with ^ and $ symbols',
    packageNamePattern: '^jest$',
    depType: EDependencyType.ALL,
    versionRange: '*',
    source: 'package',
    versions: ['26.1.0', '26.4.2'],
    outputPackageNamePattern: '^jest$',
  },
  {
    description: '@babel/code-frame deps when source=lock',
    packageNamePattern: '^@babel/code-frame$',
    versionRange: '*',
    source: 'lock',
    versions: ['7.10.2', '7.10.4', '7.10.8'],
    outputPackageNamePattern: '^@babel/code-frame$',
  },
  {
    description: 'esm deps when source=auto',
    packageNamePattern: '^esm$',
    versionRange: '*',
    source: 'auto',
    versions: ['3.2.25', '3.2.26', '3.2.28'],
    outputPackageNamePattern: '^esm$',
  },
  {
    description: 'esm deps when source=auto and versionRange > 3.2.26',
    packageNamePattern: '^esm$',
    versionRange: '>3.2.26',
    source: 'auto',
    versions: ['3.2.28'],
    outputPackageNamePattern: '^esm$',
  },
]

describe('getVersionsReport', () => {
  testCases.forEach((testCase) =>
    it(`returns ${testCase.description}`, async () => {
      const data = await getVersionsReport(
        testCase.packageNamePattern,
        testCase.versionRange,
        testCase.source,
        testCase.depType,
        cwd,
      )
      expect(data).toMatchObject({
        packageNamePattern: testCase.outputPackageNamePattern,
        depType: testCase.depType,
        versionRange: testCase.versionRange,
      })
      expect(data.data.sort()).toEqual(testCase.versions)
    }),
  )

  it('uses process.cwd() as default value for cwd', () => {
    const getFilesContentSpy = jest
      .spyOn(utils, 'getFilesContent')
      .mockImplementation(() => Promise.resolve([]))
    getVersionsReport('.+', '*', 'package', EDependencyType.DEFAULT)
    expect(getFilesContentSpy).toHaveBeenCalledWith(
      `${process.cwd()}/**/*.json`,
    )
  })
})
