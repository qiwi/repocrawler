import { readFileSync } from 'fs'
import { join } from 'path'

import {
  getFilesContent,
  isVersionInRange,
  normalizeVersion,
} from '../../main/ts'

describe('getFilesContent', () => {
  it('returns contents of all txt files in resources/getFilesContent', async () => {
    const expected = [
      {
        // eslint-disable-next-line sonarjs/no-duplicate-string

        path: join(__dirname, 'resources/fakePackages/package1.json'),
        body: readFileSync(
          join(__dirname, 'resources/fakePackages/package1.json'),
        ).toString(),
      },
      {
        path: join(__dirname, 'resources/fakePackages/package2.json'),
        body: readFileSync(
          join(__dirname, 'resources/fakePackages/package2.json'),
        ).toString(),
      },
      {
        path: join(__dirname, 'resources/fakePackages/package3.json'),
        body: readFileSync(
          join(__dirname, 'resources/fakePackages/package3.json'),
        ).toString(),
      },
      {
        path: join(__dirname, 'resources/fakePackages/package4.json'),
        body: readFileSync(
          join(__dirname, 'resources/fakePackages/package4.json'),
        ).toString(),
      },
      {
        path: join(__dirname, 'resources/fakePackages/package5.json'),
        body: readFileSync(
          join(__dirname, 'resources/fakePackages/package5.json'),
        ).toString(),
      },
    ]
    const data = await getFilesContent(
      join(__dirname, 'resources/fakePackages/*.json'),
    )
    expect(data).toEqual(expected)
  })
})

describe('isVersionInRange', () => {
  type TVersionRangeTestCase = {
    version: string
    range: string
    satisfies: boolean
  }

  const testCases: TVersionRangeTestCase[] = [
    {
      version: '1.2.0',
      range: '>0.0.0',
      satisfies: true,
    },
    {
      version: '^1.2.0',
      range: '>0.0.0',
      satisfies: true,
    },
    {
      version: '^1.2.1',
      range: '>=2.0.0',
      satisfies: false,
    },
    {
      version: '1.2.1',
      range: '>=1.1.0 <=1.2.1',
      satisfies: true,
    },
    {
      version: '1.2.1',
      range: '*',
      satisfies: true,
    },
    {
      version: '^0.2.1',
      range: '*',
      satisfies: true,
    },
  ]

  testCases.forEach(({ version, satisfies, range }) => {
    it(`version ${version} is ${
      satisfies ? '' : 'not '
    }in range ${range}`, () => {
      expect(isVersionInRange(version, range)).toEqual(satisfies)
    })
  })
})

describe('normalizeVersion', () => {
  it('does not change simple version', () => {
    expect(normalizeVersion('1.2.3')).toEqual('1.2.3')
  })

  it('returns minimal value for version with caret', () => {
    expect(normalizeVersion('^1.2.3')).toEqual('1.2.3')
  })
})
