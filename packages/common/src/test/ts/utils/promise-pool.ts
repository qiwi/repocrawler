import {
  flatMatrixEvenly,
  PromisePool,
  settledWorkerFactory,
  splitArrayEvenly,
  workerFactory
} from '../../../main/ts/utils/promise-pool'

const timeout = 500
const array = Array.from({ length: 5 },(_, i) => i)
const error = new Error('foo')
const errorIndex = 4
const promiseMaker = (arg: number) => new Promise(resolve => setTimeout(() => resolve(arg), timeout))
const promiseMakerWithError = (arg: number) => new Promise((resolve, reject) => {
  if (arg === errorIndex) {
    reject(error)
    return
  }
  setTimeout(() => resolve(arg), timeout)
})

describe('splitArrayEvenly', function () {
  it ('splits evenly', () => {
    const array = Array.from({ length: 12 },(_, i) => i)
    expect(splitArrayEvenly(array, 4)).toEqual([
      [0, 4, 8],
      [1, 5, 9],
      [2, 6, 10],
      [3, 7, 11]
    ])
  })

  it ('splits evenly when length is not multiple of numberOfParts', () => {
    const array = Array.from({ length: 10 },(_, i) => i)
    expect(splitArrayEvenly(array, 4)).toEqual([
      [0, 4, 8],
      [1, 5, 9],
      [2, 6],
      [3, 7]
    ])
  })
})

describe('joinArraysEvenly', function () {
  it ('joins square matrix', () => {
    const matrix = [
      [0, 4, 8],
      [1, 5, 9],
      [2, 6, 10],
      [3, 7, 11]
    ]
    expect(flatMatrixEvenly(matrix)).toEqual(Array.from({ length: 12 },(_, i) => i))
  })

  it ('joins non-square matrix', () => {
    const matrix = [
      [0, 4, 8],
      [1, 5, 9],
      [2, 6],
      [3, 7]
    ]
    expect(flatMatrixEvenly(matrix)).toEqual(Array.from({ length: 10 },(_, i) => i))
  })
})

describe('workers', function () {
  describe('worker', function () {
    it ('creates promises sequentially', async () => {
      const startTime = Date.now()
      const data = await workerFactory(array, promiseMaker)()
      const endTime = Date.now() - startTime
      expect(endTime).toBeGreaterThanOrEqual(timeout * array.length)
      expect(data).toEqual(array)
    })

    it ('rejects on error', () => expect(workerFactory(array, promiseMakerWithError)()).rejects.toEqual(error))

    it ('has the same output as Promise.all', async () => {
      const workerData = await workerFactory(array, promiseMaker)()
      const data = await Promise.all(array.map(promiseMaker))
      expect(workerData).toEqual(data)
    })
  })

  describe('settledWorker', function () {
    it ('creates promises sequentially', async () => {
      const startTime = Date.now()
      const data = await settledWorkerFactory(array, promiseMaker)()
      const endTime = Date.now() - startTime
      expect(endTime).toBeGreaterThanOrEqual(timeout * array.length)
      expect(data).toEqual(array.map(value => ({
        status: 'fulfilled',
        value
      })))
    })

    it ('handles error', async () => {
      const data = await settledWorkerFactory(array, promiseMakerWithError)()
      expect(data).toEqual(array.map(value => {
        if (value === errorIndex) {
          return {
            status: 'rejected',
            reason: error
          }
        }
        return  {
          status: 'fulfilled',
          value
        }
      }))
    })

    it ('has the same output as Promise.allSettled', async () => {
      const workerData = await settledWorkerFactory(array, promiseMakerWithError)()
      const data = await Promise.allSettled(array.map(promiseMakerWithError))
      expect(workerData).toEqual(data)
    })
  })
})

describe('PromisePool', function () {
  describe('all', function () {
    it ('completes task in the estimated time and returns correct output', async () => {
      const poolSize = 2
      const startTime = Date.now()
      const data = await PromisePool.all(array, promiseMaker, poolSize)
      const endTime = Date.now() - startTime

      expect(endTime).toBeGreaterThanOrEqual(Math.floor(array.length / poolSize) * timeout)
      expect(data).toEqual(array)
    })
  })

  describe('allSettled', function () {
    it ('completes task in the estimated time and returns correct output', async () => {
      const poolSize = 2
      const startTime = Date.now()
      const data = await PromisePool.allSettled(array, promiseMaker, poolSize)
      const endTime = Date.now() - startTime

      expect(endTime).toBeGreaterThanOrEqual(Math.floor(array.length / poolSize) * timeout)
      expect(data).toEqual(array.map(value => ({
        status: 'fulfilled',
        value,
      })))
    })
  })
})
