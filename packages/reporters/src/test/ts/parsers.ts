import { TRepoCrawlerResultItem } from '@qiwi/repocrawler-common'
import { readFileSync } from 'fs'
import { join} from 'path'

import { EDependencyType } from '../../main/ts'
import {
  dependencyRecordsToArray,
  getDependencies,
  getYarnLockDependencies,
  normalizeLockEntryName,
} from '../../main/ts/parsers'

describe('getDependencies', () => {
  const data = JSON.parse(
    readFileSync(
      join(__dirname, 'resources/fakePackages/package1.json'),
    ).toString(),
  )
  const body = data.package

  it('returns all deps', () => {
    expect(getDependencies(data, EDependencyType.ALL)).toEqual([
      ...dependencyRecordsToArray(body.dependencies, data),
      ...dependencyRecordsToArray(body.devDependencies, data),
      ...dependencyRecordsToArray(body.peerDependencies, data),
      ...dependencyRecordsToArray(body.optionalDependencies, data),
    ])
  })

  it('returns deps only of given type', () => {
    expect(getDependencies(data, EDependencyType.PEER)).toEqual(
      dependencyRecordsToArray(body.peerDependencies, data),
    )
  })

  it('returns null when there are not deps of given type', () => {
    expect(
      getDependencies({} as TRepoCrawlerResultItem, EDependencyType.PEER),
    ).toBeUndefined()
  })
})

describe('normalizeLockEntryName', () => {
  const cases: Array<{ input: string; output: string }> = [
    {
      input: '@react',
      output: '@react',
    },
    {
      input: 'buildstamp@1.1.1',
      output: 'buildstamp',
    },
    {
      input: '@babel/code-frame@^7.0.0',
      output: '@babel/code-frame',
    },
    {
      input: 'buildstamp',
      output: 'buildstamp',
    },
    {
      input: '@qiwi/pijma-core@^1.x.x',
      output: '@qiwi/pijma-core',
    },
    {
      input: '@qwui/core@^1',
      output: '@qwui/core',
    },
    {
      input: 'donate-front-shared@*',
      output: 'donate-front-shared'
    },
    {
      input: 'prelude-ls@~1.1.2',
      output: 'prelude-ls'
    },
    {
      input: 'qiwi-platform@^1.5.0-15',
      output: 'qiwi-platform'
    }
  ]

  cases.forEach(({ input, output }) =>
    it(`returns ${output} on ${input}`, () => {
      expect(normalizeLockEntryName(input)).toEqual(output)
    }),
  )
})

describe('getYarnLockDependencies', () => {
  it('return null when input is not defined', () => {
    expect(getYarnLockDependencies()).toBeUndefined()
  })

  it('parses yarn.lock', () => {
    const data = JSON.parse(
      readFileSync(
        join(__dirname, 'resources/fakePackages/package1.json'),
      ).toString(),
    )
    expect(getYarnLockDependencies(data.yarnLock)).toMatchObject({
      '@babel/code-frame@^7.0.0': expect.objectContaining({
        version: '7.10.8',
      }),
      '@babel/code-frame@^7.10.4': expect.objectContaining({
        version: '7.10.8',
      }),
      '@babel/code-frame@^7.8.3': expect.objectContaining({
        version: '7.10.8',
      }),
      'istanbul-reports@^3.0.2': expect.objectContaining({ version: '3.0.2' }),
    })
  })

  it('logs error and returns null', () => {
    const consoleWarnSpy = jest
      .spyOn(console, 'warn')
      .mockImplementation(() => {
        /* noop */
      })
    expect(getYarnLockDependencies('asfgh')).toBeUndefined()
    expect(consoleWarnSpy).toHaveBeenCalled()
  })
})
