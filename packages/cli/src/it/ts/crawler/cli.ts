import childProcess from 'child_process'
import { promisify } from 'util'

const exec = promisify(childProcess.exec)

describe('crawler cli', () => {
  it ('returns error when no arg is specified', async () => {
    return expect(exec('yarn crawler')).rejects.toMatchObject({
      stderr: expect.stringMatching(/^Missing required flag/)
    })
  })
})

describe('reporter cli', () => {
  it ('returns error when no arg is specified', async () => {
    return expect(exec('yarn reporter')).rejects.toMatchObject({
      stderr: expect.stringMatching(/^Missing required flag/)
    })
  })
})

