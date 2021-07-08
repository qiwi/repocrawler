export const splitArrayEvenly = <T>(arr: T[], numberOfParts: number): T[][] => {
  return arr.reduce(
    (acc, cur, i) => {
      acc[i % numberOfParts].push(cur)
      return acc
    },
    Array.from({ length: numberOfParts }, () => []) as T[][]
  )
}

export const flatMatrixEvenly = <T = any>(matrix: T[][]): T[] => {
  const array: T[] = []

  while(matrix.some(subArr => subArr.length > 0)) {
    matrix.forEach(subArr => subArr.length > 0 && array.push(subArr.shift() as T))
  }

  return array
}

export const workerFactory = <T = any>(
  argsList: any[],
  promiseMaker: (opts: any) => Promise<T>
) => async (): Promise<T[]> => {
  const res = []
  for (const opts of argsList) {
    res.push(await promiseMaker(opts))
  }
  return res
}

export const settledWorkerFactory = <T = any>(
  argsList: any[],
  promiseMaker: (opts: any) => Promise<T>,
) => async (): Promise<PromiseSettledResult<T>[]> => {
  const res = []
  try {
    for (const opts of argsList) {
      res.push({
        status: 'fulfilled',
        value: await promiseMaker(opts),
      } as PromiseFulfilledResult<T>)
    }
  } catch (reason) {
    res.push({
      status: 'rejected',
      reason,
    } as PromiseRejectedResult)
  }
  return res
}

export const PromisePool = {
  async all<T = any>(
    args: any[],
    promiseMaker: (...args: any[]) => Promise<T>,
    poolSize: number,
  ): Promise<T[]> {
    const results = await Promise.all(
      splitArrayEvenly(args, poolSize)
        .map(args => workerFactory(args, promiseMaker)())
    )
    return flatMatrixEvenly(results)
  },
  async allSettled<T = any>(
    args: any[],
    promiseMaker: (...args: any[]) => Promise<T>,
    poolSize: number,
  ): Promise<PromiseSettledResult<T>[]> {
    const results = await Promise.all(
      splitArrayEvenly(args, poolSize)
        .map(args => settledWorkerFactory(args, promiseMaker)())
    )
    return flatMatrixEvenly(results)
  }
}
