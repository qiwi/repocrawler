import { readFileSync } from 'fs'
import { join } from 'path'

import {
  EDependencyType,
  getRepoName,
  getTreeReport,
  ITreeReport,
} from '../../main/ts'
import * as utils from '../../main/ts/utils'
import package1 from './resources/fakePackages/package1.json'
import package2 from './resources/fakePackages/package2.json'
import package3 from './resources/fakePackages/package3.json'
import package5 from './resources/fakePackages/package5.json'

const cwd = join(__dirname, 'resources')

type TTestCase = {
  description: string
  data: ITreeReport
}

describe('treeReporter', () => {
  const testCases: TTestCase[] = [
    {
      description: 'finds devDependencies starting with @types/j',
      data: {
        source: 'package',
        packageNamePattern: '^@types/j',
        depType: EDependencyType.DEV,
        totalProjectsCount: 4,
        data: [
          {
            name: '@types/jest',
            minVersion: '26.0.4',
            maxVersion: '26.0.13',
            usageCount: 4,
            // eslint-disable-next-line unicorn/no-zero-fractions
            ratio: 1.0,
            repos: [
              getRepoName(package1 as any),
              getRepoName(package2 as any),
              getRepoName(package3 as any),
              getRepoName(package5 as any),
            ],
          },
          {
            name: '@types/jest-json-schema',
            minVersion: '2.1.2',
            maxVersion: '2.1.2',
            usageCount: 3,
            ratio: 0.75,
            repos: [
              getRepoName(package2 as any),
              getRepoName(package3 as any),
              getRepoName(package5 as any),
            ],
          },
        ],
      },
    },
    {
      description: 'finds typescript occurrences in devDependencies',
      data: {
        source: 'package',
        packageNamePattern: '^typescript$',
        depType: EDependencyType.DEV,
        totalProjectsCount: 4,
        data: [
          {
            name: 'typescript',
            minVersion: '3.9.6',
            maxVersion: '4.0.2',
            usageCount: 4,
            // eslint-disable-next-line unicorn/no-zero-fractions
            ratio: 1.0,
            repos: [
              getRepoName(package1 as any),
              getRepoName(package2 as any),
              getRepoName(package3 as any),
              getRepoName(package5 as any),
            ],
          },
        ],
      },
    },
    {
      description: 'finds rimraf occurrences in peerDependencies',
      data: {
        source: 'package',
        packageNamePattern: '^rimraf$',
        depType: EDependencyType.PEER,
        totalProjectsCount: 4,
        data: [
          {
            name: 'rimraf',
            minVersion: '3.0.2',
            maxVersion: '3.0.2',
            usageCount: 2,
            ratio: 0.5,
            repos: [getRepoName(package1 as any), getRepoName(package3 as any)],
          },
        ],
      },
    },
    {
      description: 'finds coveralls occurrences in all types of dependencies',
      data: {
        source: 'package',
        packageNamePattern: '^coveralls',
        depType: EDependencyType.ALL,
        totalProjectsCount: 4,
        data: [
          {
            name: 'coveralls',
            minVersion: '2.1.0',
            maxVersion: '3.1.0',
            usageCount: 3,
            ratio: 0.75,
            repos: [
              getRepoName(package1 as any),
              getRepoName(package2 as any),
              getRepoName(package3 as any),
            ],
          },
        ],
      },
    },
    {
      description: 'finds @babel/code-frame occurrences in lockfiles',
      data: {
        source: 'lock',
        packageNamePattern: '^@babel/code-frame$',
        totalProjectsCount: 4,
        data: [
          {
            name: '@babel/code-frame',
            minVersion: '7.10.2',
            maxVersion: '7.10.8',
            usageCount: 3,
            ratio: 0.75,
            repos: [
              getRepoName(package1 as any),
              getRepoName(package2 as any),
              getRepoName(package3 as any),
            ],
          },
        ],
      },
    },
    {
      description: 'finds esm occurrences when source=auto',
      data: {
        source: 'auto',
        packageNamePattern: '^esm$',
        totalProjectsCount: 4,
        data: [
          {
            name: 'esm',
            minVersion: '3.2.25',
            maxVersion: '3.2.28',
            usageCount: 3,
            ratio: 0.75,
            repos: [
              getRepoName(package2 as any),
              getRepoName(package3 as any),
              getRepoName(package5 as any),
            ],
          },
        ],
      },
    },
    {
      description: 'does not find coveralls occurrences when source=lock',
      data: {
        source: 'lock',
        packageNamePattern: '^coveralls$',
        totalProjectsCount: 4,
        data: [],
      },
    },
    {
      description: 'finds only one jest occurrence when source=auto',
      data: {
        source: 'auto',
        packageNamePattern: '^jest$',
        totalProjectsCount: 4,
        data: [
          {
            name: 'jest',
            minVersion: '26.1.0',
            maxVersion: '26.1.0',
            usageCount: 1,
            ratio: 0.25,
            repos: [getRepoName(package5 as any)],
          },
        ],
      },
    },
  ]

  testCases.forEach((item) =>
    it(item.description, async () => {
      const data = await getTreeReport(
        item.data.packageNamePattern,
        item.data.source,
        item.data.depType,
        cwd,
      )

      expect(data).toMatchObject(item.data)
    }),
  )

  it('logs an error and continues processing', async () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {
      /* noop */
    })
    jest.spyOn(utils, 'getFilesContent').mockImplementation(() => Promise.resolve([
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
    const data = await getTreeReport('.+', 'package', EDependencyType.DEFAULT, cwd, console)
    expect(Object.keys(data.data).length).toEqual(3)
    expect(warnSpy).toHaveBeenCalled()
  })

  it('uses process.cwd() as default value for cwd', async () => {
    const getFilesContentSpy = jest
      .spyOn(utils, 'getFilesContent')
      .mockImplementation(() => Promise.resolve([]))
    await getTreeReport('.+', 'package', EDependencyType.DEFAULT)
    expect(getFilesContentSpy).toHaveBeenCalledWith(
      `${process.cwd()}/**/*.json`,
    )
  })
})
