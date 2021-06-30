import { launchCrawler } from '../../../main/ts/crawler/executor'
import * as utils from '../../../main/ts/utils'
import * as configUtils from '../../../main/ts/utils/config'
import * as validators from '../../../main/ts/utils/validators'

describe('launchCrawler', function () {
  it('calls necessary functions', async () => {
    const validateCrawlerCliArgsSpy = jest.spyOn(validators, 'validateCrawlerCliArgs')
      .mockImplementationOnce(params => params)
    const mergeConfigSpy = jest.spyOn(configUtils, 'resolveCrawlerOpts')
      .mockImplementationOnce(params => params as any)
    const fakeCrawler1: any = {
      fetchRepoInfo: jest.fn(() => Promise.resolve())
    }
    const fakeCrawler2: any = {
      fetchRepoInfo: jest.fn(() => Promise.resolve())
    }
    const createCrawlerSpy = jest.spyOn(utils, 'createCrawler')
      .mockImplementationOnce(() => fakeCrawler1)
      .mockImplementationOnce(() => fakeCrawler2)
    const logger = {
      log: jest.fn()
    }

    await launchCrawler({ crawlers: [42, 42]} as any, logger as any)

    expect(validateCrawlerCliArgsSpy).toBeCalled()
    expect(mergeConfigSpy).toBeCalled()
    expect(createCrawlerSpy).toBeCalledTimes(2)
    expect(fakeCrawler1.fetchRepoInfo).toBeCalled()
    expect(fakeCrawler2.fetchRepoInfo).toBeCalled()
    expect(logger.log).toBeCalled()
  })

  it('loads config from file', async () => {
    jest.spyOn(validators, 'validateCrawlerCliArgs')
      .mockImplementationOnce(params => params)
    jest.spyOn(configUtils, 'resolveCrawlerOpts')
      .mockImplementationOnce(params => params as any)
    const getConfigSpy = jest.spyOn(configUtils, 'getConfig')
      .mockImplementationOnce(() => ({ foo: 'bar' }) as any)
    const fakeCrawler: any = {
      fetchRepoInfo: jest.fn(() => Promise.resolve())
    }
    jest.spyOn(utils, 'createCrawler')
      .mockImplementation(() => fakeCrawler)
    const logger = {
      log: jest.fn()
    }

    await launchCrawler({ crawlers: [42, 42], config: 'config' } as any, logger as any)

    expect(getConfigSpy).toBeCalledWith('config')
  })
})
