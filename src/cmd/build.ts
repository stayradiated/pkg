import { SRC_PATH, DIST_PATH } from '../shared/constants'
import { log, fmt } from '../shared/log'
import exec from '../shared/exec'

const TSC_SHIM_PATH = require.resolve('../shim/tsc')

const build = async (): Promise<void> => {
  log(fmt`Building from ${SRC_PATH} to ${DIST_PATH} directory`)

  const args = process.argv.slice(2)
  log(fmt`Running ${'tsc'} ${args}`)
  await exec('node', TSC_SHIM_PATH, ...args)
}

export default build
