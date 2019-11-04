import { join } from 'path'
import fileExists from 'file-exists'

import exec from '../shared/exec'
import { log, fmt } from '../shared/log'

const withTestHelpers = async (worker: () => Promise<void>) => {
  const beforeAll = join(process.cwd(), '/testHelpers/beforeAll.js')
  const afterAll = join(process.cwd(), '/testHelpers/afterAll.js')

  if (await fileExists(beforeAll)) {
    log(fmt`Running beforeAll.js`)
    await exec('node', beforeAll)
  }
  try {
    await worker()
  } catch (err) {
    throw err
  } finally {
    if (await fileExists(afterAll)) {
      log(fmt`Running afterAll.js`)
      await exec('node', afterAll)
    }
  }
}

export default withTestHelpers
