import { TReportSortOptions } from '../../main/ts'
import * as sorter from '../../main/ts/sorter'
import {
  dateComparator,
  getComparator,
  invertComparator,
  numberComparator,
  reportComparatorFactory,
  stringComparator,
  TComparator,
  versionComparatorFactory,
} from '../../main/ts/sorter'

describe('reportComparatorFactory', () => {
  it('calls getComparator and returns function', () => {
    const getComparatorSpy = jest.spyOn(sorter, 'getComparator')
    reportComparatorFactory({ order: 'asc', field: 'usageCount' })
    expect(
      reportComparatorFactory({ order: 'asc', field: 'usageCount' }),
    ).toBeInstanceOf(Function)
    expect(getComparatorSpy).toHaveBeenCalledWith('usageCount')
  })

  it('calls invertComparator when order is desc', () => {
    const invertComparatorSpy = jest.spyOn(sorter, 'invertComparator')
    reportComparatorFactory({ order: 'desc', field: 'usageCount' })
    expect(invertComparatorSpy).toHaveBeenCalled()
  })
})

describe('getComparator', () => {
  type TGetComparatorTestCase = [TReportSortOptions['field'], TComparator]
  const versionComparator = versionComparatorFactory()
  const testCases: TGetComparatorTestCase[] = [
    ['usageCount', numberComparator],
    ['ratio', numberComparator],
    ['package', stringComparator],
    ['project', stringComparator],
    ['name', stringComparator],
    ['version', versionComparator],
    ['minVersion', versionComparator],
    ['maxVersion', versionComparator],
    ['commitDate', dateComparator],
  ]

  testCases.forEach(([field, comparator]) =>
    it(comparator.name, () => {
      expect(getComparator(field).name).toEqual(comparator.name)
    }),
  )
})

type TComparatorTestCase = {
  name: string
  comparator: TComparator
  data: Array<[any, any, '>' | '<' | '=']>
}

describe('comparators', () => {
  const versionComparator = versionComparatorFactory()
  const comparatorTestCases: TComparatorTestCase[] = [
    {
      name: 'numberComparator',
      comparator: numberComparator,
      data: [
        [5, 1, '>'],
        [1, 5, '<'],
        [5, 5, '='],
      ],
    },
    {
      name: 'stringComparator',
      comparator: stringComparator,
      data: [
        ['abd', 'abc', '>'],
        ['abc', 'abd', '<'],
        ['abc', 'abc', '='],
      ],
    },
    {
      name: 'versionComparator',
      comparator: versionComparator,
      data: [
        ['1.2.1', '1.1.0', '>'],
        ['1.1.0', '1.2.1', '<'],
        ['1.1.0', '1.1.0', '='],
        ['1.1.0', '^1.2.1', '<'],
      ],
    },
    {
      name: 'dateComparator',
      comparator: dateComparator,
      data: [
        ['2020-09-15 13:56:25', '2020-09-14 11:41:14', '>'],
        ['2020-09-14 11:41:12', '2020-09-15 13:56:26', '<'],
        ['2020-09-14 11:41:15', '2020-09-14 11:41:15', '='],
        ['2020-09-17T13:07:25.654Z', '2018-04-20T12:36:26Z', '>'],
        ['2018-04-20T12:36:26Z', '2020-09-17T13:07:25.656Z', '<'],
        ['2020-09-17T13:07:25.655Z', '2020-09-17T13:07:25.655Z', '='],
      ],
    },
  ]

  comparatorTestCases.forEach(({ name, comparator, data }) => {
    describe(name, () => {
      data.forEach(([a, b, op]) =>
        it(`${a} ${op} ${b}`, () => {
          if (op === '>') {
            expect(comparator(a, b)).toBeGreaterThan(0)
            return
          }

          if (op === '<') {
            expect(comparator(a, b)).toBeLessThan(0)
            return
          }

          expect(comparator(a, b)).toEqual(0)
        }),
      )
    })
  })

  test('versionComparator returns 0 when gets an error from semver', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {
      /* noop */
    })
    const versionComparator = versionComparatorFactory(console)
    expect(versionComparator('1.2.1', 'asdfghfj')).toEqual(0)
    expect(warnSpy).toHaveBeenCalled()
  })

  test('invertComparator returns inverted comparator (thanks, cap!)', () => {
    const invertedNumberComparator = invertComparator(numberComparator)
    expect(invertedNumberComparator(5, 1)).toBeLessThan(0)
    expect(invertedNumberComparator(1, 5)).toBeGreaterThan(0)
    expect(invertedNumberComparator(1, 1)).toEqual(-0)
  })
})
